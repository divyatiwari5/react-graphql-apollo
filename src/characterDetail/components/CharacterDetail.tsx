import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, NotFound } from '../../commons';
import { GET_CHARACTER_DETAILS } from '../../queries';
import CharacterDetailCard from './CharacterDetailCard';

const useStyles = makeStyles((theme) => ({
    loading: {
        textAlign: 'center',
        padding: '250px 0'
    }
}));

interface Character {
    name: string,
    image: string,
    status: string,
    type: string,
    location: {
        name: string
    },
    gender: string,
    species: string
}

export function CharacterDetail() {

    const classes = useStyles();
    const [detailedData, setDetails] = useState<Character|undefined>(undefined);

    let { slug } = useParams<{slug: string}>();

    const characterId = slug.split("-")[0];

    useEffect(() => {
        document.title= detailedData ? detailedData.name : "Detail Page"
    }, [detailedData]);

    /**
     * Calling GET_CHARACTER_DETAILS Query to get the character detail
     */
    const { loading, error, data  } = useQuery(
        GET_CHARACTER_DETAILS, { variables: { characterId: parseInt(characterId)}}
    );

    /**
     * It's a hack to stop re-rendering of the component in infinite loop
     * TODO: Think of a better solution
     */
    useMemo(() => {
        setDetails(data?.character);
    }, [data])

    if (loading) return <div className={classes.loading}>Loading Details...</div>
    if (error) return <NotFound message="Some error occurred!"/>
    if (!detailedData) return <NotFound message="Data not found"/>

    return (
        <div>
            <Header/>
            <CharacterDetailCard {...detailedData} />
        </div>
    )
}

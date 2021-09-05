import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import Pagination from '@material-ui/lab/Pagination';
import { GET_CHARACTERS, GET_CHARACTERS_BY_IDS } from '../../queries';
import { Header, NotFound } from '../../commons';
import { RECENT_CHARACTERS } from '../../queries/reactive';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '60px 150px'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
    },
    btn: {
        display: 'flex',
        margin: 'auto'
    },
    loading: {
        textAlign: 'center',
        padding: '250px 0'
    }
}));

interface ParamTypes {
    pageRef: string
}

function HomePage() {
    const history = useHistory();
    let errorMessage = "Some error occurred!! Try searching with different name!";
    const query = new URLSearchParams(history.location.search);
    const searchedString = query.get("q");
    const { pageRef } = useParams<ParamTypes>();
    let pageNumber = parseInt(pageRef);
    if (!pageNumber && pageRef === "recent") {
        errorMessage = "No recent characters visited."
    }
    else if (!pageNumber) {
        errorMessage = "Invalid Page Number provided."
    }

    const classes = useStyles();
    const recentCharacters: Array<number> = useReactiveVar(RECENT_CHARACTERS);

    const [showError, setShowError] = useState<boolean>(false);
    const [results, setResults] = useState([])

    const [pageInfo, setPageInfo] = useState({count: 0, pages: 0, next: 0, prev: 0})

    const [ searchCharacters, { loading, error, data }] = useLazyQuery(
        GET_CHARACTERS,
        {variables: {page: pageNumber || 1, searchString: searchedString ? searchedString : ""}}
    );

    const [ getRecentCharacters, { loading: loadingRecent, error: errorRecent, data: dataRecent }] = useLazyQuery(
        GET_CHARACTERS_BY_IDS,
        {variables: {characterIds: recentCharacters}}
    );

    /**
     * Search character
     */
    useEffect(() => {
        console.log({pageRef}, {pageNumber})
        setShowError(false);
        if (pageNumber) searchCharacters();
        else if (pageRef === "recent" && recentCharacters.length > 0) getRecentCharacters();
        else setShowError(true);
        let showData = (pageNumber && data && data.characters.results) || (dataRecent && dataRecent.charactersByIds);
        let paginationInfo = (pageNumber && data && data.characters.info);
        console.log({showData});
        if (showData) setResults(showData);
        if (paginationInfo) setPageInfo(paginationInfo);
    }, [getRecentCharacters, searchedString, recentCharacters, data, dataRecent, pageNumber, pageRef, searchCharacters])

    if (loading || loadingRecent) return <div className={classes.loading}>Loading....</div>
    if (showError || error || errorRecent) return <NotFound message={errorMessage}/>

    /**
     * Set page number
     * Update route on the basis of searchedString
     * @param event: event 
     * @param {Number} value: pageNumber
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (searchedString) history.push(`/page/${value}/search?q=${searchedString}`)
        else history.push(`/page/${value}`)
    }
    return(        
        <div>
            <Header/>
            <Grid container spacing={1}>
                <Grid 
                    container 
                    xs={12} 
                    spacing={3} 
                    className={classes.gridContainer}
                >
                    {results && results.map((value: any) => (
                        <Grid item xs={6} key={value.id}>
                            <CharacterCard 
                                id={value.id}
                                name={value.name}
                                image={value.image} 
                                status={value.status}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
            {(pageInfo && pageNumber)
                ?
                <Pagination
                    defaultPage={1}
                    page={pageNumber}
                    count={pageInfo['pages']}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    className={classes.pagination}
                />
                : ""
            }
            {
                (recentCharacters.length > 0) ?
                <Button className={classes.btn} variant="contained" onClick={() => history.push("/page/recent")}>Click here to visit last 10 visited profiles</Button>
                : ""
            }
        </div>
    )
}

export { HomePage }

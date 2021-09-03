import { useLazyQuery, useQuery } from "@apollo/client";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import Pagination from '@material-ui/lab/Pagination';
import { GET_CHARACTERS } from "../../GQueries";
import Header from "../../Components/Header";
import NotFound from "../../Components/NotFound";


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
    pageNumber: string
}

function HomePage() {
    const history = useHistory();

    const query = new URLSearchParams(history.location.search);
    const searchedString = query.get("q");
    const { pageNumber: pageParam } = useParams<ParamTypes>();

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([])


    const [ loadCharacters, {loading: loadingAllChars, error: AllCharsError, data: allChars} ]= useLazyQuery(GET_CHARACTERS(page, ""));

    const [pageInfo, setPageInfo] = useState({count: 0, pages: 0, next: 0, prev: 0})

    const [ searchCharacters, { loading, error, data }] = useLazyQuery(GET_CHARACTERS(page, searchedString ? searchedString : ""))

    /**
     * Called everytime when page number param gets updated to set the page Number
     */
    useEffect(() => {
        setPage(parseInt(pageParam));
    }, [pageParam])

    /**
     * Search character
     */
    useEffect(() => {
        if (!searchedString) return;
        if (searchedString) searchCharacters();
        if (data) {
            setResults(data.characters.results);
            setPageInfo(data.characters.info);
        }
    }, [searchedString, data, searchCharacters, page])

    /**
     * List all the characters
     */
    useEffect(() => {
        if (!searchedString) {
            loadCharacters();
        }
        if (allChars) {
            setResults(allChars.characters.results);
            setPageInfo(allChars.characters.info);
        }
    }, [allChars, loadCharacters, searchedString, page])

    if (loading || loadingAllChars) return <div className={classes.loading}>Loading....</div>
    if (error || AllCharsError) return <NotFound message="Some error occured!! Try searching with different name!"/>

    /**
     * Set page number
     * Update route on the basis of searchedString
     * @param event: event 
     * @param {Number} value: pageNumber
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
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
            {pageInfo && 
                <Pagination 
                    defaultPage={1}
                    page={page}
                    count={pageInfo['pages']}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    className={classes.pagination}
                ></Pagination>
            }
           <Button className={classes.btn} variant="contained">Click here to visit last 10 visited profiles</Button>
        </div>
    )
}

export default HomePage
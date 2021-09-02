import { useLazyQuery, useQuery } from "@apollo/client";
import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Search from "../../Components/Search";
import CharacterCard from "./CharacterCard";
import Pagination from '@material-ui/lab/Pagination';
import { GET_CHARACTERS } from "../../GQueries";
import Header from "../../Components/Header";


const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '60px 150px'
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 20
    }
}));


function HomePage(props: any) {

    const query = new URLSearchParams(props.location.search);
    const searchedString = query.get("q");
    const pageParam = parseInt(props.match.params.pageNumber);

    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([])

    const [ loadCharacters, {loading: loadingAllChars, error: AllCharsError, data: allChars} ]= useLazyQuery(GET_CHARACTERS(page, ""));

    const [pageInfo, setPageInfo] = useState({count: 0, pages: 0, next: 0, prev: 0})

    const [ searchCharacters, { loading, error, data }] = useLazyQuery(GET_CHARACTERS(page, searchedString ? searchedString : ""))

    useEffect(() => {
        setPage(pageParam);
    }, [pageParam])

    useEffect(() => {
        if (!searchedString) return;
        if (searchedString) searchCharacters();
        if (data) {
            setResults(data.characters.results);
            setPageInfo(data.characters.info);
        }
    }, [searchedString, data, searchCharacters, page])

    useEffect(() => {
        if (!searchedString) {
            loadCharacters();
        }
        if (allChars) {
            setResults(allChars.characters.results);
            setPageInfo(allChars.characters.info);
        }
    }, [allChars, loadCharacters, searchedString, page])

    if (loading || loadingAllChars) return <div>Loading....</div>
    if (error || AllCharsError) return <div>Error...</div>
    // if (!allChars) return <div>No data found!</div>

    // if (allChars && allChars?.characters?.results) finalResult = allChars.characters.results;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        if (searchedString) props.history.push(`/page/${value}/search?q=${searchedString}`)
        else props.history.push(`/page/${value}`)
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
           
            
        </div>
    )
}

export default withRouter(HomePage)
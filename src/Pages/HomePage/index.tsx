import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { Grid, makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Search from "../../Components/Search";
import CharacterCard from "./CharacterCard";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '60px 150px'
    }
}));

export const GET_CHARACTERS = (searchString: any) => gql`
  query {
      characters(page: 1, filter: { name: "${searchString}" }) {
    info {
      count
    }
    results {
        name
        id
        image
        status
    }
  }
}
`

function HomePage(props: any) {

    const query = new URLSearchParams(props.location.search);
    const searchedString = query.get("q");

    const classes = useStyles();

    const [ loadCharacters, {loading: loadingAllChars, error: AllCharsError, data: allChars} ]= useLazyQuery(GET_CHARACTERS(""));

    const [results, setResults] = useState([])

    const [ searchCharacters, { loading, error, data }] = useLazyQuery(GET_CHARACTERS(searchedString))

    useEffect(() => {
        if (!searchedString) return;
        if (searchedString) searchCharacters();
        if (data) {
            setResults(data.characters.results);
        }
    }, [searchedString, data, searchCharacters])

    useEffect(() => {
        if (!searchedString) {
            loadCharacters();
        }
        if (allChars) {
            setResults(allChars.characters.results);
        }
    }, [allChars, loadCharacters, searchedString])

    if (loading || loadingAllChars) return <div>Loading....</div>
    if (error || AllCharsError) return <div>Error...</div>
    // if (!allChars) return <div>No data found!</div>

    // if (allChars && allChars?.characters?.results) finalResult = allChars.characters.results;

    return(        
        <div>
            <Search/>
            
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
           
            
        </div>
    )
}

export default withRouter(HomePage)
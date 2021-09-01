import { gql, useQuery } from "@apollo/client";
import { Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import Search from "../../Components/Search";
import CharacterCard from "./CharacterCard";
// import { getCharacters } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '60px 150px'
    }
}));

export const GET_CHARACTERS = gql`
  query {
      characters(page: 1) {
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

function HomePage() {

    const classes = useStyles();

    useEffect(() => {
        // props.getCharacters();
    }, [])

    const { loading, data, error } = useQuery(GET_CHARACTERS);

    if (loading) return <div>Loading....</div>
    if (error) return <div>Error...</div>

    console.log({data});
    if (data) {

    }

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
                    {data.characters.results.map((value: any) => (
                        <Grid item xs={6} key={value}>
                            <CharacterCard 
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

const mapStateToProps = (state: { characters: any; }) => {
    const { characters } = state;

    return { characters }
}

// export default connect(null, getCharacters)(HomePage)

export default HomePage
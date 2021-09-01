import { Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { connect } from "react-redux";
import Search from "../../Components/Search";
import CharacterCard from "./CharacterCard";
import { getCharacters } from "./redux/actions";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        margin: '60px 150px'
    }
}));

function HomePage() {

    const classes = useStyles();

    useEffect(() => {
        props.getCharacters();
    }, [])

    return(        
        <div>
            <Search/>
            <Grid container spacing={1}>
                <Grid container xs={12} spacing={3} className={classes.gridContainer}>
                    {[0,1,2,3,4,5,6].map((value) => (
                        <Grid item xs={6} key={value}>
                            <CharacterCard/>
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

export default connect(null, getCharacters)(HomePage)

// export default HomePage
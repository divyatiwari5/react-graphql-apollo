import { Grid } from "@material-ui/core";
import Search from "../../Components/Search";
import CharacterCard from "./CharacterCard";

function HomePage() {
    return(
        <div>
            <Search/>
            <Grid container spacing={1}>
                <Grid container xs={12} spacing={3}>
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

export default HomePage
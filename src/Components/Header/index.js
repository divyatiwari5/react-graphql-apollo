/**
 * Header contains search bar and link to the home page
 */
import { makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Search from "../Search";

const useStyles = makeStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
}))

function Header() {

    const classes = useStyles();

    return (
        <div className={classes.header}>
            <Search></Search>
            <Link to="/">
                <Typography>Home</Typography>
            </Link>
        </div>
    )
}

export default Header
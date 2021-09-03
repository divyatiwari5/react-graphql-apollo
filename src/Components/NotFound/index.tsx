import { Typography } from "@material-ui/core";
import Header from "../Header";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      textAlign: 'center',
      padding: '200px 0'
    },
  }),
);

function NotFound(props: {message: string}) {
    const classes = useStyles();

    return(
        <div>
            <Header/>
            <Typography variant="h6" className={classes.root}>{props.message}</Typography>
        </div>
    )
}

export default NotFound
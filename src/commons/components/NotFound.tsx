/**
 * Call this component in case of Error or when there is no data
 */

import { Typography } from '@material-ui/core';
import { Header } from './Header';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useEffect } from 'react';

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

    useEffect(() => {
        document.title="Not Found"
    }, [])

    return(
        <div data-testid="not-found-section">
            <Header/>
            <Typography variant="h6" className={classes.root}>{props.message}</Typography>
        </div>
    )
}

export { NotFound }
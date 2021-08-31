import { CardActionArea, CardActions, CardContent, CardMedia, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 118,
        width: 500
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    status: {
        display: 'block',
        borderRadius: 10,
        height: 20,
        width: 20,
        background: 'green'
    },
    cover: {
        width: 151,
    },
    cardAction: {
        alignSelf: 'flex-end'
    }

}))

function CharacterCard(props: any) {

    const classes = useStyles();
    const theme = useTheme()

    function onClickHandle(){
        console.log("call");
        props.history.push('/profile/2');
    }
    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography>
                        Morty Smith
                    </Typography>
                    <div className={classes.status}>
                    </div>
                </CardContent>  
                <CardActions className={classes.cardAction}>
                    <IconButton onClick={onClickHandle}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                </CardActions>
            </div>
           
        </Card>
    )
}

export default withRouter(CharacterCard)
import { CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography, useTheme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { Link, withRouter } from 'react-router-dom';
import Search from '../../../../Components/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 500,
        margin: 'auto',
        marginTop: 100
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    heading: {
        background: 'cadetblue'
    },
    headingContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 40
    },
    mainHeading: {
        fontSize: 30
    },
    subHeading: {
        display: 'flex'
    },
    status: {
        display: 'block',
        borderRadius: 10,
        height: 20,
        width: 20,
        background: 'green'
    },
    cover: {
        height: 120,
        width: 120,
        backgroundSize: 'contain',
        borderRadius: 100
    },
    content: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 20
    },
    cardAction: {
        boxShadow: '0px 0px 12px lightgrey',
    }

}))

function SingleCharacter(props: any) {

    const classes = useStyles();

    function onClickHandle(){
        props.history.push('/');
    }

    return (
        <div>
            <Search/>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.heading}
                    avatar={
                        <CardMedia
                            className={classes.cover}
                            image="https://rickandmortyapi.com/api/character/avatar/2.jpeg"
                        />
                        }
                    
                    title={'Morty Smith'}
                    subheader={'Alive'}
                />
                
                <div className={classes.details}>
                    <CardContent> 
                        <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Species
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Human
                                </Typography>
                            </span>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Gender
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Female
                                </Typography>
                            </span>
                        </div>  
                        <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Type
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    -
                                </Typography>
                            </span>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Location
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Earth
                                </Typography>
                            </span>
                           
                        </div>
                        
                    </CardContent>  
                    <CardActions className={classes.cardAction}>
                        <IconButton onClick={onClickHandle}>
                            <ArrowBackIos/>
                        </IconButton>
                    </CardActions>
                </div>
           
            </Card>
        </div>
        
    )
}

export default withRouter(SingleCharacter)

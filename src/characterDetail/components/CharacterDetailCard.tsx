import { CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { addRecentCharacter } from '../../queries/reactive';


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
    statusIcon: {
        display: 'block',
        borderRadius: 10,
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 10,
        right: 6,
        border: '3px solid white'
    },
    alive: {
        background: 'green'
    },
    dead: {
        background: 'red'
    },
    unknown: {
        background: 'grey'
    },
    profileContainer: {
        position: 'relative'
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
    },
    tooLong: {
        wordSpacing: 30,
        width: 60
    },
}));

function CharacterDetailCard(props: any) {

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        addRecentCharacter(props.id);
    }, [props.id])

    function onClickHandle(){
        history.push("/");
    }

    /**
     * Returns className on the basis of character's status
     * @param {string} status: character's status
     * @returns className
     */
    function getClassName(status: string) {
        let className = classes.statusIcon + ' ';
        if(status === "Alive") {
            className += classes.alive;
        } else if(status === "Dead") {
            className += classes.dead;
        } else if(status === "unknown") {
            className += classes.unknown;
        }
        return className;
    }

    return (
        <Card className={classes.root} data-testid="CharacterCardContainer">
            <CardHeader
                className={classes.heading}
                avatar={
                    <div className={classes.profileContainer}>
                        <CardMedia
                            className={classes.cover}
                            image={props.image}
                        />
                        <div className={getClassName(props.status)} data-testid="characterStatusColor"></div>
                    </div>
                }
                title={props.name}
                subheader={props.status}
            />
            <div className={classes.details}>
                <CardContent>
                    <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Species
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {props.species}
                                </Typography>
                            </span>
                        <span>
                                <Typography component="h6" variant="h6">
                                    Gender
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {props.gender}
                                </Typography>
                            </span>
                    </div>
                    <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Type
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {props.type}
                                </Typography>
                            </span>
                        <span className={classes.tooLong}>
                                <Typography component="h6" variant="h6">
                                    Location
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" >
                                    {props.location.name}
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
    )
}

export default CharacterDetailCard
import { CardActions, CardHeader, CardMedia, IconButton, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: 118,
        width: 500,
        background: 'aliceblue',
        justifyContent: 'space-between'
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
    profileContainer: {
        position: 'relative'
    },

    content: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    status: {
        display: 'block',
        borderRadius: 10,
        height: 16,
        width: 16,
        position: 'absolute',
        bottom: 6,
        right: 0,
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
    profilePhoto: {
        height: 80,
        width: 80,
        backgroundSize: 'contain',
        borderRadius: 100,
    },
    cardAction: {
        alignSelf: 'flex-end'
    }

}))

function CharacterCard(props: any) {

    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        document.title="Rick n Morty Directory"
    })

    /**
     * Redirects user to character detail page
     */
    function onForwardClickHandle(){
        const { name, id } = props;
        const splittedName = name.toLowerCase().split(" ");
        const slug = id + "-" + splittedName.join("-");
        history.push(`/profile/${slug}`);
    }

    /**
     * Returns className on the basis of character's status
     * @param {string} status: Character's status
     * @returns classname
     */
    function getClassName(status: string) {
        let className = classes.status + ' ';
        if(status === "Alive") {
            return className += classes.alive
        } else if(status === "Dead") {
            return className += classes.dead
        } else if(status === "unknown") {
            return className += classes.unknown
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                    className={classes.heading}
                    avatar={
                        <div className={classes.profileContainer}>
                            <CardMedia
                                className={classes.profilePhoto}
                                image={props.image}
                            />
                             <div className={getClassName(props.status)}></div>
                        </div>
                        }
                    title={props.name}
            />
            <CardActions className={classes.cardAction}>
                <IconButton onClick={onForwardClickHandle}>
                    <ArrowForwardIosIcon/>
                </IconButton>
            </CardActions>
           
        </Card>
    )
}

export default CharacterCard
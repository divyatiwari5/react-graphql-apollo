import { useQuery } from '@apollo/client';
import { CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../../Components/Header';
import NotFound from '../../../../Components/NotFound';
import { GET_CHARACTER_DETAILS } from '../../../../GQueries';

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
    loading: {
        textAlign: 'center',
        padding: '250px 0'
    }
}));

function SingleCharacter() {

    const classes = useStyles();
    const history = useHistory();

    let { slug } = useParams<{slug: string}>();

    const characterId = slug.split("-")[0];

    /**
     * Calling GET_CHARACTER_DETAILS Query to get the character detail
     */
    const { loading, error, data  } = useQuery(
        GET_CHARACTER_DETAILS, { variables: { characterId: parseInt(characterId)}}
    );

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
            return className += classes.alive
        } else if(status === "Dead") {
            return className += classes.dead
        } else if(status === "unknown") {
            return className += classes.unknown
        }
    }


    let detailedData;

    if (loading) return <div className={classes.loading}>Loading Details...</div>
    if (error) return <NotFound message="Some error occurred!"/>
    if (data) detailedData = data.character;
    if (!detailedData) return <NotFound message="Data not found"/>


    return (
        <div>
            <Header/>
            <Card className={classes.root}>
                <CardHeader
                    className={classes.heading}
                    avatar={
                        <div className={classes.profileContainer}>
                            <CardMedia
                                className={classes.cover}
                                image={detailedData.image}
                            />
                            <div className={getClassName(detailedData.status)}></div>
                        </div>
                        }
                    title={detailedData.name}
                    subheader={detailedData.status}
                />
                <div className={classes.details}>
                    <CardContent> 
                        <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Species
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {detailedData.species}
                                </Typography>
                            </span>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Gender
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {detailedData.gender}
                                </Typography>
                            </span>
                        </div>  
                        <div className={classes.content}>
                            <span>
                                <Typography component="h6" variant="h6">
                                    Type
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {detailedData.type}
                                </Typography>
                            </span>
                            <span className={classes.tooLong}>
                                <Typography component="h6" variant="h6">
                                    Location
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" >
                                    {detailedData.location.name}
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

export default SingleCharacter

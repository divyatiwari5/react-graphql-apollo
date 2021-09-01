import Axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

export const getCharacters = () => async(dispatch: any, getState: () => { searchString: any; }) => {

    console.log("called");
    
    const { searchString } = getState();

    try {
        const data = await Axios({
            method: "GET",
            url: baseURL+'/characters'
        });

        console.log({data});
        dispatch({ type: 'SET_CHARACTERS', characters: data })
    } catch(error) {
        console.log('GET_PEOPLE_ERROR', error);
    }
}
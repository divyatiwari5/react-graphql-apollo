const initialState = {
    characters: [],
    searchString: '',
    character: ''

}

export default function main(state=initialState, action: { type: any; }) {
    switch(action.type) {
        case 'SET_CHARACTERS':
        case 'SEARCH_CHARACTERS':
        case 'SET_CHARACTER':
        default:
            return state
    }
}
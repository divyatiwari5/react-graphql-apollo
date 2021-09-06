/**
 * Search component enables character searching
 */
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { Autocomplete } from '@material-ui/lab';
import { useLazyQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../queries';

function SearchComponent(props: any) {

    const history = useHistory();
    const query = new URLSearchParams(props.location.search);
    const searchedString = query.get("q");

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if(searchedString) setSearchString(searchedString);
    }, [searchedString])

    const [ searchCharacters, { loading, error, data }] = useLazyQuery(
        GET_CHARACTERS,
        {variables: {page: 1, searchString: searchedString ? searchedString : ""}}
    );

    /**
     * set input value on change of search input value
     * @param event: Event
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement|any>) => {
        if (event.type === "click") {
            setSearchString(event.target.textContent)
        } else {
            setSearchString(event.target.value)
        }
        searchCharacters();
    }

    /**
     * Enable search on Enter key press
     * @param event: Keyboard event
     */
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            history.push(`/page/1/search?q=${searchString}`)
        }
    }

    return(
        <div className="search-person">
            <Autocomplete options={data ? data.characters.results.map((option: any) => option.name): []}
                  onInputChange={(event) => handleOnChange(event)}
                  inputValue={searchString}
                  className="search-input"
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  onKeyPress={(event) => handleKeyPress((event))}
                  renderInput={(params) => (
                      <TextField
                          {...params}
                          label="Search character"
                          margin="normal"
                          variant="outlined"
                          InputProps={{ ...params.InputProps, type: 'search' }}
                      />)}
            />
            <Link to={`/page/1/search?q=${searchString}`}>
                <Button variant="contained" color="primary">Search</Button>
            </Link>
        </div>
    )
}

const Search = withRouter(SearchComponent)

export { Search }
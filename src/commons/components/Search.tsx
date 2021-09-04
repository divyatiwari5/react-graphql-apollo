/**
 * Search component enables character searching
 */
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { Link, useHistory, withRouter } from 'react-router-dom';

function SearchComponent(props: any) {

    const history = useHistory();
    const query = new URLSearchParams(props.location.search);
    const searchedString = query.get("q");

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if(searchedString) setSearchString(searchedString);
    }, [searchedString])

    /**
     * set input value on change of search input value
     * @param event: Event
     */
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
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
            <SearchIcon/>
            <input 
                className="search-input"
                placeholder="Search character..."
                value={searchString}
                onChange={(event) => handleOnChange(event)}
                onKeyPress={(event) => handleKeyPress(event)}
            />
            <Link to={`/page/1/search?q=${searchString}`}>
                <Button variant="contained" color="primary">Search</Button>
            </Link>
        </div>
    )
}

const Search = withRouter(SearchComponent)

export { Search }
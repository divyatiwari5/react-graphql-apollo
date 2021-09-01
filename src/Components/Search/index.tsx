import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import * as _ from "lodash";
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../../Pages/HomePage';
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

function Search(props: any) {

    const query = new URLSearchParams(props.location.search);
    const searchedString = query.get("q");

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        if(searchedString) setSearchString(searchedString);
    }, [])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value)
    }

    const handleSearchClick = () => {
        props.history.push(`/search?q=${searchString}`)
    }

    return(
        <div className="search-person">
            <SearchIcon/>
            <input 
                className="search-input"
                placeholder="Search character..."
                value={searchString}
                onChange={(event) => handleOnChange(event)}
            />
            <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
        </div>
    )
}

export default withRouter(Search)
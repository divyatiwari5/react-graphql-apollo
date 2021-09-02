import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';
import * as _ from "lodash";
import { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';

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

    return(
        <div className="search-person">
            <SearchIcon/>
            <input 
                className="search-input"
                placeholder="Search character..."
                value={searchString}
                onChange={(event) => handleOnChange(event)}
            />
            <Link to={`/page/1/search?q=${searchString}`}>
                <Button variant="contained" color="primary">Search</Button>
            </Link>
        </div>
    )
}

export default withRouter(Search)
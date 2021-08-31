import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react';

function Search() {

    const [searchString, setSearchString] = useState("");

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
        </div>
    )
}

export default Search
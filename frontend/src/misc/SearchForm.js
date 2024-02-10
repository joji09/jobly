import React, { useState} from "react";

function SearchForm({ search }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(evt) {
        evt.preventDefault()
        search(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(evt){
        setSearchTerm(evt.target.value);
    }

    return(
        <div>
            <form>
                <input name="searchTerm" placeholder="Search.." value={searchTerm} onChange={handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
    );
}

export default SearchForm;
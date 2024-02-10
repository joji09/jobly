import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import { useParams } from "react-router-dom";
import SearchForm from "../misc/SearchForm";
import CompanyCard from "./CompanyCard";

function CompanyList() {

    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOn() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return (
        // TODO: ADD LOADING COMPONENT
        <p>Results not found</p>
    );

    return(
        <div>
            <SearchForm search={search} />
            {companies.length ? (
                <div>
                    {companies.map(c => (
                        <CompanyCard key={c.handle} handle={c.handle} name={c.name} description={c.description} logoUrl={c.logoUrl}/>
                    ))}
                    </div>
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}

export default CompanyList;
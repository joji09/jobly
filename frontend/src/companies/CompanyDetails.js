import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList";

function CompanyDetails(){
    const { handle } = useParams();

    const [company, setCompany] = useState(null);

    useEffect(function getCompanyAndJobs() {
        async function getCompany(){
            setCompany(await JoblyApi.getCompany(handle));
        }

        getCompany();
    }, [handle]);

    if(!company) return (
        // TODO: ADD LOADING COMPONENT
        <p>Results not found</p>
    )
    return (
        <div>
            <h4>{company.name}</h4>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs} />
        </div>
    );
}

export default CompanyDetails;
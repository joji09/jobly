import React, { useEffect, useState } from "react";
import SearchForm from "../misc/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";


function JobList() {

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOn() {
        search();
    }, []);

    async function search(title){
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return (
        // TODO: ADD LOADING COMPONENT
        <p>Results not found</p>
    )

    return (
        <div>
            <SearchForm search={search} />
            {jobs.length ? <JobCardList jobs={jobs}/> : <p>No results were found.</p>}
        </div>
    );
}

export default JobList;
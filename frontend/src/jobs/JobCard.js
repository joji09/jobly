import React, { useEffect, useState } from "react";

function JobCard({ id, title, salary, equity, companyName }){
    const [applied, setApplied] = useState();

    return (
        <div>
            <h5>{title}</h5>
            <p>{companyName}</p>
            {salary && <div>Salary: {salary}</div>}
            {equity !== undefined && <div>Equity: {equity}</div>}
            <button>Apply</button>
        </div>
    );
}

export default JobCard;
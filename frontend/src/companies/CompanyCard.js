import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ name, description, logoUrl, handle }){
    return (
        <Link to={`/companies/${handle}`}>
        <div>
        <h4>
        {name} {logoUrl && <img src={logoUrl} alt={name}/>}
        </h4>
        <p>{description}</p>
        </div>
        </Link>
    );
}

export default CompanyCard;
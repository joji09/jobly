import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ login }){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formError, setFormError] = useState([]);

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await login(formData);
        if(result.success){
            navigate.push("/companies");
        } else {
            setFormError(result.errors);
        }
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(log => ({ ...log, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password</label>
                    <input name="username" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;
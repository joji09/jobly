import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SingupForm({ singup }){
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const [formError, setFormError] = useState([]);

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await singup(formData);
        if(result.success){
            history.push("/companies");
        } else {
            setFormError(result.errors);
        }
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div>
            <h2>Sing Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Username</label>
                <input name="username" value={formData.username} onChange={handleChange} />
                </div>

                <div>
                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} />
                </div>

                <div>
                    <label>First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div>
                    <label>Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>

                <div>
                    <label>Email</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default SingupForm;
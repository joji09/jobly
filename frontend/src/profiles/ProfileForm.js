import React, { useContext, useState } from "react";
import JoblyApi from "../api";
import UserContext from "../auth/UserContext";

function ProfileForm(){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });

    const [formError, setFormError] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);


    async function handleSubmit(evt){
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updateUser;

        try {
            updateUser = await JoblyApi.saveProfile(username, profileData);
        } catch (err) {
            setFormError(err);
            return;
        }

        setFormData(f => ({ ...f, password: ""}));
        setFormError([]);
        setSaveConfirmed(true);
        setCurrentUser(updateUser);
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(f => ({
            ...f,
            [name]: value,
        }));
        setFormError([]);
    }

    return (
        <div>
            <h3>Profile</h3>
            <div>
                <form>
                    <div>
                        <label>Username</label>
                        <p>{formData.username}</p>
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

                    <div>
                        <label>Confirm password to save changes</label>
                        <input name="email" type="password" value={formData.password} onChange={handleChange} />
                    </div>

                    {saveConfirmed ? <p>Save completed</p> : null}

                    <button onClick={handleSubmit}>Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default ProfileForm;
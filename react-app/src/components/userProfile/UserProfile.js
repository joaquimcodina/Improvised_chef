import "./UserProfile.css"
import DeleteAccountButton from "../login/deleteAccount"
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

export default function UserProfile() {
    const [response, setResponse] = useState(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [userAPI, setUSerAPI] = useState('');

    const imageRef = useRef(null);
    const fileRef = useRef(null);
    const uploadButtonRef = useRef(null);

    useEffect(() => {
        const getInfo = async () => {
            try {
                const userBO = await axios.get('http://localhost:3000/user');
                const response = await axios.post('http://localhost:3000/user/summary', { id: userBO.data.id });
                setUSerAPI(userBO.data);
                setResponse(response);
                setName(response?.data[0].fullName);
                setUsername(response?.data[0].userName);

            } catch (error) {
                console.log(error);
            }
        }
        getInfo();
    }, []);

    const handleMouseEnter = () => {
        uploadButtonRef.current.style.display = 'block';
    };

    const handleMouseLeave = () => {
        uploadButtonRef.current.style.display = 'none';
    };

    const handleImageChange = () => {
        const chosenFile = fileRef.current.files[0];
        if (chosenFile) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                imageRef.current.setAttribute('src', reader.result);
            });
            reader.readAsDataURL(chosenFile);
        }
    };

    async function handleSaveProfile() {

        const formData = new FormData();
        formData.append('userId', userAPI.id);
        formData.append('fullName', name);
        formData.append('userName', username);
        formData.append('profilePic', fileRef.current.files[0]);

        
        try {
            const response = await axios.post('http://localhost:3000/user/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data); // Handle the response as needed
        } catch (error) {
            console.log(error);
        }

        
                    
                    /*profilePic :

                    password : 
                    confirmPassword :*/

                
        /*
        const name = document.getElementById('name-input').value;
        const username = document.getElementById('username-input').value;
        const email = document.getElementById('email-input').value;
        */

        console.log("name:" + name)
        console.log("username:" + username)
        
        

    }

    console.log("user id:" + userAPI.id)
    console.log("name:" + name)
    console.log(imageRef)
 
    return (
        <div className="profile_container">
            <div className="profile_user">
                <h1>Welcome {response?.data[0].fullName}</h1>
                <div className="profile_basic_information">
                    <div className="name_surname_email">
                        <p>Your name</p>
                        <input className="text_input" placeholder={response?.data[0].fullName} value={name} onChange={(e) => setName(e.target.value)} />
                        <p>Your username</p>
                        <input className="text_input" placeholder={response?.data[0].userName} value={username} onChange={(e) => setUsername(e.target.value)} />
                        <p>Password</p>
                        <input type="password" className="text_input" placeholder={"Password"} /> 
                        <p>Repeat password</p>
                        <input type="password" className="text_input" placeholder={"Password"} /> 

                        
                    </div>
                    <div id = "profile_right">
                        {response?.data && (
                            
                                <div id="image_change">
                                    <img ref={imageRef} id="user-image-pic" alt="" src={response.data[0].profilePic} />
                                    <input ref={fileRef} id="file" type="file" onChange={handleImageChange} />
                                    <label ref={uploadButtonRef} id="label" htmlFor="file">
                                        Change photo
                                    </label>
                                </div> 
                                            
                        )}
                        {!response?.data && (
                            <h1>Loading...</h1>
                        )}
                        <button id="save_profile_button" onClick={handleSaveProfile}>
                            Save profile
                        </button>
                        <DeleteAccountButton />
                    </div> 
                </div>
               
            </div>
        </div>
        
    )
}
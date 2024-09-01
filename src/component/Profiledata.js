import React, { useState, useEffect } from "react";
import Image from 'react-bootstrap/Image';
import { MdAddAPhoto } from "react-icons/md";
import axios from 'axios';
import { FaRegEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function Profiledata({ token, id }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
      setShowPassword((prevState) => !prevState);
    };

    const initFormData = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "", // Added password confirmation field
    };

    const [formData, setFormData] = useState({ ...initFormData });
    const [err, setErr] = useState({
        name: null,
        email: null,
        password: null,
        password_confirmation: null, // Added error state for password confirmation
    });
    const [profileImage, setProfileImage] = useState("asset/images7.png"); // state to store the profile image

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user-data`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const user = response.data.data.user; 
                setFormData({
                    name: user.name,
                    email: user.email,
                    password: "",
                    password_confirmation: "", 
                });
                if (user.profileImage) {
                    setProfileImage(user.profileImage);
                }
            } catch (error) {
                setErr((prev) => ({
                    ...prev,
                    fetch: "Error fetching user data.",
                }));
                console.error('There was an error fetching the data:', error);
            }
        };
        fetchData();
    }, [token]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        let error = null;

        if (name === "name" && value.length <= 6) {
            error = `${name} must be more than 5 characters.`;
        } else if (name === "email" && !emailRegex.test(value)) {
            error = `Valid Email :'name@email.com' `;
        } else if (name === "password" && value.length <= 6) {
            error = `${name} must be more than 6 characters.`;
        } else if (name === "password_confirmation" && value !== formData.password) {
            error = `Passwords do not match.`;
        }

        setErr({
            ...err,
            [name]: error,
        });

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const { name, email, password, password_confirmation } = formData;
        let valid = true;

        if (name.length <= 6) {
            setErr((prev) => ({
                ...prev,
                name: "Name must be more than 6 characters.",
            }));
            valid = false;
        }

        if (!emailRegex.test(email)) {
            setErr((prev) => ({
                ...prev,
                email: "Valid Email :'name@email.com' ",
            }));
            valid = false;
        }

        if (password.length > 0 && password.length <= 6) {
            setErr((prev) => ({
                ...prev,
                password: "Password must be more than 6 characters.",
            }));
            valid = false;
        }

        if (password !== password_confirmation) {
            setErr((prev) => ({
                ...prev,
                password_confirmation: "Passwords do not match.",
            }));
            valid = false;
        }

        if (valid) {
            try {
                const response = await axios.put(`http://127.0.0.1:8000/api/auth/update/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData({ ...initFormData });
                Swal.fire({
                    text: "Profile updated successfully!",
                  });
            } catch (error) {
                console.error('There was an error updating the data:', error);
                alert("Error updating profile.");
            }
        } else {
            alert("Please correct the errors and try again.");
        }
    };

    return (
        <>
            <h3 style={{ color: "#0871FF", fontSize: "30px", padding: "20px",margin:"140px 0px 0px 60px" }}>Edit Your Profile</h3>
            <div className="container" style={{ backgroundColor: "white", margin: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" ,borderRadius:"50px",padding:"30px",  border: "1px solid #cccbcb"}}>
                <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    
                    <div style={{ width: "100px", position: "relative", margin: "auto", display: "flex", justifyContent: "center" }}>
                        <Image src={profileImage} roundedCircle style={{ width: "100px", height: "100px"}} />
                        <div style={{ position: "absolute", bottom: "0", right: "0", width: "32px", height: "32px", lineHeight: "30px", textAlign: "center", overflow: "hidden" }}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ position: "absolute", transform: "scale(2)", opacity: "0" }}
                                onChange={handleImageChange}
                            />
                            <i style={{ color: "black",fontSize:"larger"}}><MdAddAPhoto /></i>
                        </div>
                    </div>
                    
                    <label style={{width:"100%",color:"gray"}}>Your Name</label>
                    <input
                        type='text'
                        name='name'
                        className='border border-gray'
                        placeholder=""
                        onChange={changeHandler}
                        value={formData.name}
                        style={{ border: "1px solid #0871FF", width: "300px", padding: "10px", borderRadius: "10px" ,marginTop:"10px"}}
                    />
                    {err.name && <p className="text-danger">{err.name}</p>}
                    <br />
                    <label style={{width:"100%",color:"gray"}}>Email</label>
                    <input
                        type='email'
                        name='email'
                        className='border border-gray'
                        placeholder=""
                        onChange={changeHandler}
                        value={formData.email}
                        style={{ border: "1px solid #0871FF", width: "300px",marginTop:"10px", padding: "10px", borderRadius: "10px" }}
                    />
                    {err.email && <p className="text-danger">{err.email}</p>}
                    <br />
                    <label style={{width:"100%",float:"left",color:"gray"}}>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className='border border-gray'
                        placeholder=""
                        onChange={changeHandler}
                        value={formData.password}
                        style={{ border: "1px solid #0871FF", width: "300px", padding: "10px", borderRadius: "10px" }}
                    /><FaRegEyeSlash 
                    onClick={toggleShowPassword}
                    style={{
                      position: "relative",
                      position: "relative",
                      cursor: "pointer",
                         top: "-33px",
                         right: "-129px",
                    }}
                  />
                    {err.password && <p className="text-danger">{err.password}</p>}
                    <br />
                    <label style={{width:"100%",float:"left",color:"gray"}}>Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password_confirmation"
                        className='border border-gray'
                        placeholder=""
                        onChange={changeHandler}
                        value={formData.password_confirmation}
                        style={{ border: "1px solid #0871FF", width: "300px", padding: "10px", borderRadius: "10px" }}
                   /><FaRegEyeSlash 
                   onClick={toggleShowPassword}
                   style={{
                     position: "relative",
                     cursor: "pointer",
                        top: "-33px",
                        right: "-129px",
                   }}
                 />
                  
                    {err.password_confirmation && <p className="text-danger">{err.password_confirmation}</p>}
                    <button type="submit" style={{ backgroundColor: "#0871FF",marginTop:"10px", color: "white", border: "1px solid #0871FF", padding: "10px", width: "100px", borderRadius: "10px", fontWeight: "bold", margin: "5px auto", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}

export default Profiledata;

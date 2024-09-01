import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

function Restpassdata({token}) {
    const initFormData = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const [formData, setFormData] = useState({ ...initFormData });
    const [err, setErr] = useState({
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
        let error = null;

        if (name === "newPassword" && value.length <= 6) {
            error = "Password must be more than 6 characters.";
        } else if (name === "confirmPassword" && value !== formData.newPassword) {
            error = "Passwords do not match.";
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

    const submitHandler = (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = formData;
        let valid = true;

        if (oldPassword.length === 0) {
            setErr((prev) => ({
                ...prev,
                oldPassword: "Please enter your old password.",
            }));
            valid = false;
        }

        if (newPassword.length <= 6) {
            setErr((prev) => ({
                ...prev,
                newPassword: "Password must be more than 6 characters.",
            }));
            valid = false;
        }

        if (newPassword !== confirmPassword) {
            setErr((prev) => ({
                ...prev,
                confirmPassword: "Passwords do not match.",
            }));
            valid = false;
        }

        if (valid) {
            setFormData({ ...initFormData });
            alert("Password successfully updated!");
        } else {
            alert("Please correct the errors and try again.");
        }
    };

    return (
        <div className="container" style={{ backgroundColor: "white", border: "1px solid #0871FF", padding: "30px", width: "100%", margin: "30px auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
            <h3 style={{ color: "#0871FF", display: "flex", justifyContent: 'center', fontSize: "30px", margin: "10px", padding: "20px" }}>Reset Password</h3>
            <Form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Image src="asset/sign2.jpg" style={{ width: "200px" }} />
                <Form.Group>
                    <Form.Control
                        type="password"
                        name="oldPassword"
                        className='border border-gray'
                        placeholder="Enter Old password"
                        onChange={changeHandler}
                        value={formData.oldPassword}
                        style={{ margin: "5px auto", width: "85%" }}
                    />
                    {err.oldPassword && <Form.Text className="text-danger">{err.oldPassword}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        name="newPassword"
                        className='border border-gray'
                        placeholder="Enter New password"
                        onChange={changeHandler}
                        value={formData.newPassword}
                        style={{ margin: "5px auto", width: "85%" }}
                    />
                    {err.newPassword && <Form.Text className="text-danger">{err.newPassword}</Form.Text>}
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        className='border border-gray'
                        placeholder="Confirm password"
                        onChange={changeHandler}
                        value={formData.confirmPassword}
                        style={{ margin: "5px auto", width: "85%" }}
                    />
                    {err.confirmPassword && <Form.Text className="text-danger">{err.confirmPassword}</Form.Text>}
                </Form.Group>
                <Button className='w-60' style={{ display: 'block', backgroundColor: "#0871FF", margin: "6px auto" }} type="submit">
                    Save Password
                </Button>
            </Form>
        </div>
    );
}

export default Restpassdata;

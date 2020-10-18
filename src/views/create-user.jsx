import { Button, Card, Checkbox, TextField, Collapse, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';





export const CreateUser = () => {

    // hooks
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [isSamePass, setSamePass] = useState(true);
    const [alertOpen, setAlertOpen] = useState(false);

    // variables & d.s
    const userData = {
        username: username,
        password: password,
        phone: phoneNumber
    }
    const userContentData = {
        username: username,
        contentData: [],
    }


    // methods n functions
    const addUser = () => {
        // add user data to database
        axios.post('http://localhost:5000/users/add', userData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))

        // add the same user to content collection with null values
        axios.post('http://localhost:5000/contents/add', userContentData)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err))

        // once user is added, notify the admin of the act & clear all fields

        setAlertOpen(true);
        setTimeout(() => {
            setAlertOpen(false);
            setUsername('');
            setPassword('');
            setPhoneNumber();
        }, 4000);

    }
    const checkboxToggle = () => {
        setSamePass(!isSamePass)
    }

    const updateUsername = (e) => {
        setUsername(e.target.value)
    }
    const updatePassword = (e) => {
        isSamePass ? setPassword(username) : setPassword(e.target.value)
    }

    // components
    const AlertDialog = () => (
        <Collapse in={alertOpen}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                Username: {username} Password: {password} phone: {phoneNumber}
            </Alert>
        </Collapse>
    )

    return (
        <div> <div>
            <h3>Add New User</h3>
            <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                <div className="d-flex flex-column p-4 justify-content-center col-md-12 align-content-stretch">
                    <Card className="form-group d-block">
                        <br />
                        <br />
                        <TextField
                            variant="outlined"
                            label="Username"
                            value={username}
                            onChange={(e) => updateUsername(e)}
                        ></TextField>
                        <br />
                        <Checkbox
                            checked={isSamePass}
                            onChange={checkboxToggle}
                            id="samePass"
                        ></Checkbox>
                        <label for="samePass">Password same as UserName?</label>
                        <br />
                        <br />

                        <TextField
                            variant="outlined"
                            label="Password"
                            type="password"
                            onChange={(e) => updatePassword(e)}
                        ></TextField>
                        <br />
                        <br />

                        <TextField
                            variant="outlined"
                            label="Phone Number"
                            type="number"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        ></TextField>
                        <br />
                        <br />

                        <Button
                            variant="contained"
                            label="Add User"
                            color="primary"
                            type="submit"
                            onClick={() => setAlertOpen(true)}
                        >Add</Button>
                        Username: {username}
                        password: {password}
                        phone: {phoneNumber}
                    </Card>
                    <AlertDialog />

                </div>
            </form>
        </div></div>)
};

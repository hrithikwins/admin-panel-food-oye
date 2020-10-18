import { Button, Card, Checkbox, TextField, Collapse, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Alert from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';





export const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSamePass, setSamePass] = useState(true);

    const [alertOpen, setAlertOpen] = React.useState(true);

    const userData = {
        username: username,
        password: password,
        phone: phoneNumber
    }

    const userContentData = {
        username: username,
        contentData: ["https://google.com"],
    }

    const addUser = () => {
        axios.post('http://localhost:5000/users/add', userData)
            .then(res => {
                console.log(res.data);
                setAlertOpen(true)
            });
        axios.post('http://localhost:5000/contents/add', userContentData)
            .then(res => {
                console.log(res.data);
            });
    }
    const checkboxToggle = () => {
        setSamePass(!isSamePass)
    }

    const UserNameField = () => (

        <TextField
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        ></TextField>
    )

    const PasswordField = () => {
        return (
            <TextField
                variant="outlined"
                label="Password"
                type="password"
                onChange={(e) => { isSamePass ? setPassword(username) : setPassword(e.target.value) }}
            ></TextField>
        )
    }
    return (
        <div> <div>
            <h3>Add New User</h3>
            <form onSubmit={(e) => { e.preventDefault(); addUser(); }}>
                <div className="d-flex flex-column p-4 justify-content-center col-md-12 align-content-stretch">
                    <Card className="form-group d-block">
                        <br />
                        <br />
                        <UserNameField />
                        <br />
                        <Checkbox
                            checked={isSamePass}
                            onChange={checkboxToggle}
                            id="samePass"
                        ></Checkbox>
                        <label for="samePass">Set Password same as UserName ?</label>
                        <br />
                        <br />
                        <PasswordField />
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
                    </Card>
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
                           Username: {username} Password: {password} & phone: {phoneNumber}
                        </Alert>
                    </Collapse>

                </div>
            </form>
        </div></div>)
};

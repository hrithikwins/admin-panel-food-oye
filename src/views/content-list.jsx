import { Button, Grid, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { CreateUser } from "./create-user";


export const ContentsList = () => {
    const [users, setUsers] = useState([]);
    const [tempContent, setTempContent] = useState([]);
    const [password, setPassword] = useState([]);

    let nameInput = "hop";

    // axios functions
    function fetchAllUser() {

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => [user.username, user.password, user.phone]));
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    function getContentByUsername() {
        axios.get(`http://localhost:5000/contents/find/${nameInput}`)
            .then(res => {
                if (res.data.length > 0) {
                    setTempContent(res.data.map(cont => cont.userData));
                    console.log(res.data.map(cont => cont.userData));
                } else { setTempContent(["No Data Available"]) }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {

    }, []);

    const UserContentDataList = () => {
        return (
            tempContent.map((temp) =>
                <div>{temp.map((results) => <div>{results}</div>)}</div>
            )
        )
    }

    const UsersList = () => {
        return (
            users.map((us) => (

                <>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Grid
                                container
                            >
                                <Grid
                                    xs={6}
                                >
                                    Username: <br />
                                    Password: <br />
                                    Phone Number: <br />
                                </Grid>
                                <Grid
                                    xs={6}
                                >
                                    {us.map((result) => (
                                        <div>{result}</div>
                                    ))}
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                        <AccordionDetails>

                            <Typography
                                variant="h5"
                            >List of Contents Provided

                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => getContentByUsername()}
                                >
                                    Refresh
                                </Button>
                            </Typography> <br />
                            <UserContentDataList />

                        </AccordionDetails>
                    </Accordion>
                </>
            )
            )
        )
    }

    return (
        <>
            <Grid
                container
            >
                <Grid
                    sm={6}>

                    <CreateUser />
                </Grid>
                <Grid
                    sm={6}><div className="date"> <br />

                        <h2>List of All Users</h2>
                        <br />
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={fetchAllUser}
                        >Refresh ⚡</Button>
                        <br />
                        <br />
                        <UsersList />

                    </div></Grid>
            </Grid>

        </>
    )
};

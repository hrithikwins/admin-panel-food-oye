import { Grid, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { CreateUser } from "./create-user";


export const ContentsList = () => {
    const [users, setUsers] = useState([]);
    const [tempContent, setTempContent] = useState([]);
    const [password, setPassword] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let nameInput = "hop";

    // axios functions
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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        // Fetching all users
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    setUsers(response.data.map(user => [user.username, user.password, user.phone]));
                }
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    const UserContentDataList = () => {
        return (
            tempContent.map((temp) =>
                <div>{temp.map((results) => <div>{results}</div>)}</div>
            )
        )
    }

    // const  = () => {
    //     return (
    //         <table border="1">
    //             <tr>
    //                 <th>Username</th>
    //                 <th>Password</th>
    //                 <th>Phone Number</th>
    //                 <th>Actions</th>
    //             </tr>

    //             {users.map((us) => (
    //                 <tr>
    //                     {us.map((userInfo) => (
    //                         <td>{userInfo}</td>
    //                     ))}
    //                     <td>Update/ Delete</td>
    //                 </tr>
    //             ))}
    //         </table>
    //     )//return
    // }

    const userColumns = [
        { id: 'name', label: 'Username', minWidth: 180 },
        { id: 'password', label: 'Password', minWidth: 100 },
        { id: 'phone', label: 'Phone Number', minWidth: 100 },
        { id: 'action', label: 'Actions', minWidth: 100 },
    ]

    const UserData = () => (

        <Paper>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {userColumns.map((columns) => (
                                <TableCell
                                // key={users.id}
                                >
                                    {columns.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((us) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1}
                                    key={us.code}
                                >
                                    {us.map((lastdata) => {
                                        // const value = row[lastdata.id];
                                        return (
                                            <TableCell
                                            //  key={lastdata.id} align={lastdata.align}
                                            >
                                                {lastdata}
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell>
                                        <Link to="user-info">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<EditOutlinedIcon />}
                                            >
                                                View
                                            </Button>
                                        </Link> |
                                        <Link to="user-content">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<EditOutlinedIcon />}
                                            >
                                                Manage
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20, 25, 50, 75, 100, 200, 1000]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )

    const UsersList = () => (
        <>
            <Grid
                container
            >
                <Grid
                    sm={6}>
                    <CreateUser />
                </Grid>
                <Grid
                    sm={6}>
                    <h3>List of All Users</h3>
                    <UserData />
                </Grid>
            </Grid>

        </>
    )


    return (
        <UsersList />
    )
};//end content list

import axios from "axios";
import React from "react";
import {Container, Button, TextField, Typography, List, ListItem, ListItemText, Divider} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useTokenStore} from "../store";
import classes from "*.module.css";


function UserProfile(){
    const [user, setUser] = React.useState<userReturnWithEmail>({
        firstName: "h"
        , lastName: ""
        , email: ""})
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();

    React.useEffect(() => {
        const getUser = () => {
            // @ts-ignore
            axios.get("http://localhost:4941/api/v1/users/"+token.userId,{headers:{'X-Authorization':token.token}})
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    console.log(response.data)
                    setUser(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getUser()
    }, [token])

    //if token is null
    if(token === null) {
        return (
            <h1>TEST</h1>
        )
    }else{
        return(
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                    <ListItemText>First Name: {user.firstName}</ListItemText>
                </ListItem>
                <Divider />

                <ListItem>
                    <ListItemText>Last Name:{user.lastName}</ListItemText>
                </ListItem>
                <Divider />

                <ListItem>
                    <ListItemText>Email:{user.email}</ListItemText>
                </ListItem>
                <Divider />
            </List>
        )
    }
}
export default UserProfile
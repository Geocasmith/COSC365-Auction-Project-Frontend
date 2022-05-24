import axios from "axios";
import React from "react";
import {Container, Button, TextField,Typography} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useTokenStore} from "../store";
import classes from "*.module.css";


function userProfile(){

    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();

    //if token is null
    if(token === null) {
        return (
            <h1>TEST</h1>
        )
    }else{
        return(
            <h1>TEST</h1>
        )
    }
}
export default userProfile
import axios from "axios";
import React from "react";
import {Container, Button, TextField,Typography} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useTokenStore} from "../store";
import classes from "*.module.css";


function Logout(){
    const [user,setUser] =  React.useState<userLogin>({
        email: ""
        , password: ""
    })
    const token = useTokenStore(state => state.token)
    const removeToken = useTokenStore(state => state.removeToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();

    React.useEffect(() => {

            axios.post("http://localhost:4941/api/v1/users/logout")
                .then((response) => {
                    removeToken()
                    console.log("GOT HERE")
                    navigate('/login')
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                    removeToken()
                })
        }, []);

    return(
        <Container>
            <Typography
                variant={'h3'}
                color={'primary'}
            >
            Cannot Log out {errorMessage}
            </Typography>
        </Container>
    )

}
export default Logout
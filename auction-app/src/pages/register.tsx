import axios from "axios";
import React from "react";
import {Container, Button, TextField,Typography} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'


function Register(){
    const [user,setUser] =  React.useState<userRegister>({
        firstName: ""
        , lastName: ""
        , email: ""
        , password: ""
    })
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();


    const registerUser = (user:userRegister)=> {
        axios.post("http://localhost:4941/api/v1/users/register",user)
            .then((response) => {
                navigate('/login')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    return(
        <Container>


        <Typography
            variant={'h3'}
            color={'primary'}

        >
            Register
        </Typography>

        <form onSubmit={registerUser}>
                <TextField
                    label="First Name"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                />

                <TextField
                    label="Last Name"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                />


                <TextField
                    label="Email"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                />
            </form>

        </Container>
    )
}
export default Register
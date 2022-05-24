import axios from "axios";
import React from "react";
import {Container, Button, TextField,Typography} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useTokenStore} from "../store";
import classes from "*.module.css";


function Login(){
    const [user,setUser] =  React.useState<userLogin>({
         email: ""
        , password: ""
    })
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();


    const loginUser = (e:any)=> {
        e.preventDefault()
        // console.log(event.target)
        // alert("Alert")
        axios.post("http://localhost:4941/api/v1/users/login",user)
            .then((response) => {
                setToken(response.data)
                navigate('/')
            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    //if token is null
    if(token === null) {
        return (
            <Container>


                <Typography
                    variant={'h3'}
                    color={'primary'}
                >
                    Login
                </Typography>

                <form onSubmit={loginUser}>
                    <TextField
                        onChange={(e) => {
                            setUser({...user, email: e.target.value})
                        }}
                        label="Email"
                        variant={'outlined'}
                        color={'secondary'}
                        fullWidth
                        required
                    />

                    <TextField
                        onChange={(e) => {
                            setUser({...user, password: e.target.value})
                        }}
                        label="Password"
                        variant={'outlined'}
                        color={'secondary'}
                        fullWidth
                        required

                        helperText={errorFlag ? errorMessage : ""}
                    />

                    <Button
                        type="submit"
                        variant={'contained'}
                        color={'primary'}>
                        Register
                    </Button>
                </form>

            </Container>
        )
    }else{
        return(
            <Container>
                <Typography
                    variant={'h3'}

                    color={'error'}

                >
                    You are already logged in
                </Typography>
                <Button
                    href={"/"}
                    variant={'contained'}
                    color={'primary'}>
                    Home
                </Button>
            </Container>
        )
    }
}
export default Login
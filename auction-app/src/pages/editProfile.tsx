import axios from "axios";
import React from "react";
import {Container, Button, TextField,Typography,InputAdornment} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import classes from "*.module.css";
import {useTokenStore} from "../store";
import ResponsiveAppBar from "../components/AppBar";


function EditProfile(){
    const [user,setUser] =  React.useState<userPatch>({
        firstName: ""
        , lastName: ""
        , email: ""
        , password: ""
        , currentPassword: ""
    })
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();


    const editUser = (e:any)=> {
        e.preventDefault()
        // console.log(event.target)
        // alert("Alert")
        // @ts-ignore
        axios.patch("http://localhost:4941/api/v1/users/"+token.userId,{headers:{'X-Authorization':token.token}})
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                navigate('/profile')

            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }

    return(
        <><ResponsiveAppBar/>
        <Container>



            <Typography
                variant={'h2'}
                color={'primary'}

            >
                Update Details
            </Typography>

            <form onSubmit={editUser}>
                <TextField
                    onChange={(e) => {setUser({...user,firstName:e.target.value})}}
                    label="First Name"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                    style={{marginBottom:10}}

                />

                <TextField
                    onChange={(e) => {setUser({...user,lastName:e.target.value})}}
                    label="Last Name"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                    style={{marginBottom:10}}

                />


                <TextField
                    onChange={(e) => {setUser({...user,email:e.target.value})}}
                    label="Email"
                    variant={'outlined'}
                    color={'secondary'}
                    fullWidth
                    required
                    style={{marginBottom:10}}

                />

                <TextField
                    onChange={(e) => {setUser({...user,password:e.target.value})}}
                    label="Password"
                    type={'password'}
                    variant={'outlined'}
                    color={'secondary'}
                    inputProps={{ minLength: 6 }}
                    fullWidth
                    required
                    style={{marginBottom:10}}


                    helperText={errorFlag ? errorMessage : ""}
                />

                <TextField
                    onChange={(e) => {setUser({...user,currentPassword:e.target.value})}}
                    label="Current Password"
                    type={'password'}
                    variant={'outlined'}
                    color={'secondary'}
                    inputProps={{ minLength: 6 }}
                    fullWidth
                    required
                    style={{marginBottom:5}}


                    helperText={errorFlag ? errorMessage : ""}
                />

                <Button
                    sx={{ m: 0.5, p:2}}
                    type="submit"
                    variant={'contained'}
                    color={'primary'}>
                    Update

                </Button>
                <Button
                    sx={{ m: 0.5, p:2 }}
                    href={'/profile'}
                    variant={'contained'}
                    color={'primary'}>
                    Cancel
                </Button>
            </form>

        </Container>
            </>
    )
}
export default EditProfile
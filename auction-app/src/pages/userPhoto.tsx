import axios from "axios";
import React from "react";
import {Container, Button, TextField, Typography, InputAdornment, Grid} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom'
import classes from "*.module.css";
import {useTokenStore} from "../store";
import ResponsiveAppBar from "../components/AppBar";
import Avatar from "@mui/material/Avatar";
import { positions } from '@mui/system';


function UserPhoto(){

    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")

    const navigate = useNavigate();
    const handleDelete = (e:any) => {
        // @ts-ignore
        axios.delete("http://localhost:4941/api/v1/users/"+token.userId,{headers:{'X-Authorization':token.token}})
            .then((response) => {
                setErrorFlag(false)
                setErrorMessage("")
                navigate('/')

            }, (error) => {
                setErrorFlag(true)
                setErrorMessage(error.toString())
            })
    }
    //Get user photo
    const getUserImage = () => {
        //Check if token null
        if (token === null) {
            return ""
        } else {
            return "http://localhost:4941/api/v1/users/" + token.userId + "/image"
        }
    }
    return(
        <><ResponsiveAppBar/>
            <Grid
                container
                alignItems="center"
                justifyContent="center"
            >


                <Grid item xs={12}>
                <Typography
                    variant={'h2'}
                    color={'primary'}

                >
                    Profile Photo
                </Typography>
                </Grid>

                <Grid item xs={12}>
                <Avatar
                    style={{ justifyContent: "center", display: "flex" }}
                    sx={{ height: '500px', width: '500px', marginX: 'auto' }}
                    src={getUserImage()}
                />
                </Grid>
                <Grid item xs={12}>
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
                        color={'error'}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default UserPhoto
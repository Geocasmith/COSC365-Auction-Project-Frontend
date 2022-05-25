import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Container, Button, TextField, Typography, List, ListItem, ListItemText, Divider, Grid, Paper} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";

function AuctionsPage(){
    // 12 Column grid system
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])

    React.useEffect(() => {
        const getAuctions = () => {
            // @ts-ignore
            axios.get("http://localhost:4941/api/v1/auctions",{headers:{'X-Authorization':token.token}})
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)


                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getAuctions()
    }, [token])

    return(
        <div>

        </div>)
}
export default AuctionsPage
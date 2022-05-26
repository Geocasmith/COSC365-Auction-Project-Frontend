import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Container, Button, TextField, Typography, List, ListItem, ListItemText, Divider, Grid, Paper} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";
import AuctionsList from "../components/auctionsList";
import SearchFilterBar from "../components/searchFilterBar";

function AuctionsPage(){
    // 12 Column grid system
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])



    return(
        <div>
            {<SearchFilterBar/>}

        </div>)
}
export default AuctionsPage
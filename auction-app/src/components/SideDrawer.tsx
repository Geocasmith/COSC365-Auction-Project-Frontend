import React, {useState, useEffect} from 'react';
import axios from "axios";
import {
    Container,
    Button,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Grid,
    Paper,
    makeStyles
} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";

const useStyles = makeStyles({
    page:{
        padding: "10px",
        background: "#f5f5f5",
        width:'100%'
    }
    })
function SideBar ({}){
    // const classes = useStyles();
    return(
        <div>
            {/*{child}*/}
        </div>
    )
}
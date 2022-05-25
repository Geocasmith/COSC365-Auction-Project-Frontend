import React from "react";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";
import {useTokenStore} from "../store";
import {Button, Card, CardActions, CardContent, CardMedia, Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import CSS from 'csstype';
interface IAuctionProps {
    auction: Auction
}
const AuctionListObject(props: IAuctionProps) => {
    return(
        <div>
            props.auction_id
        </div>
    )

}
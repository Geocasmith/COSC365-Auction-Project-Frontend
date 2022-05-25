import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Container, Button, TextField, Typography, List, ListItem, ListItemText, Divider, Grid, Paper} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";
import SearchIcon from '@mui/icons-material/Search';

function SearchFilterBar(){

    return (
        <Grid container>
            <Grid item>
                <TextField
                    // onChange={(e) => {setUser({...user,firstName:e.target.value})}}
                    label="Search"
                    variant={'outlined'}
                    fullWidth
                    required
                />
            </Grid>

            <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button color="primary" variant="contained">
                    <SearchIcon/>
                </Button>
            </Grid>
        </Grid>
    );
}
export default SearchFilterBar
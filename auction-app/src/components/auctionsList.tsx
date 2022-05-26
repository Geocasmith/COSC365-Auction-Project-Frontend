import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Container, Button, TextField, Typography, List, ListItem, ListItemText, Divider, Grid, Paper} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";
interface IAuctionProps {
    q: String
    categoryIds: Array<number>
    sortBy: String
    state: String
}
// @ts-ignore
const AuctionsList = (props: IAuctionProps) => {
    //bring in props
    const[q]= React.useState<String>(props.q)
    const[categoryIds]= React.useState<Array<number>>(props.categoryIds)
    const[sortBy]= React.useState<String>(props.sortBy)
    const[state]= React.useState<String>(props.state)

    // 12 Column grid system
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const [auctions, setAuctions] = React.useState<Array<Auctions>>([])
    const[categories, setCategories] = React.useState<Category[]>([])

    function formatCategoryIds(categoryIds: Array<number>){
        let formattedCategoryIds = ""
        for(let i = 0; i < categoryIds.length; i++){
            formattedCategoryIds += "&categoryIds="+categoryIds[i]
        }
        console.log(formattedCategoryIds)
        return formattedCategoryIds
    }
    React.useEffect(() => {
        //Formats request params for auctions to return based on the props given
        const createRequestParams = () => {
            let params = "q="+q+"&sortBy="+sortBy+formatCategoryIds(categoryIds)
            // console.log(params)
            return params
        }

        const getAuctions = () => {
            // @ts-ignore
            axios.get("http://localhost:4941/api/v1/auctions?"+createRequestParams())
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    setAuctions(response.data.auctions)

                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        const getCategories = () => {
            axios.get("http://localhost:4941/api/v1/auctions/categories")
                .then((response) => {
                    setErrorFlag(false)
                    setErrorMessage("")
                    // console.log(response.data)
                    setCategories(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getAuctions()
        getCategories()
    }, [token])

    return (
        <div>
            <Grid container alignItems="stretch" spacing={3} sx={{ flexDirection: 'row'}} >
                {auctions.map(auction => (
                    //    Pass into prop
                    <Grid item key={auction.auctionId} xs={12} sm={6} md={4} lg={3}>
                        <AuctionListObject key={auction.auctionId} auction={auction} categories={categories}/>



                    </Grid>
                ))
                }
            </Grid>
        </div>
    )
}

export default AuctionsList
import React from "react";
import axios from "axios";
import {Delete, Edit} from "@mui/icons-material";
import {useTokenStore} from "../store";
import {
    Avatar,
    Button, ButtonBase, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Container, Dialog,
    DialogActions, DialogContent, DialogContentText,
    DialogTitle, IconButton, TextField, Typography
} from "@mui/material";
import CSS from 'csstype';
import {red} from "@mui/material/colors";
interface IAuctionProps {
    auction: Auction
    categories: Array<Category>
}
const AuctionListObject = (props: IAuctionProps) => {
    const [auction] = React.useState<Auction>(props.auction)
    const[categories] = React.useState<Array<Category>>(props.categories)
    const [username, setUsername] = React.useState("")


    const userCardStyles: CSS.Properties = {
        display: "inline-block",
        height: "328px",
        width: "300px",
        margin: "10px",
        padding: "0px"
    }
    const getAuctionImage = () => {
        return "http://localhost:4941/api/v1/auctions/"+auction.auctionId.toString()+"/image"
    }
    const getUserImage = () => {
        return "http://localhost:4941/api/v1/users/"+auction.sellerId.toString()+"/image"
    }
    const getDaysTillClosing = () => {
        const diff = new Date().getTime() - new Date(auction.endDate).getTime()
        const days_till_Closing = Math.floor(diff / (1000 * 60 * 60 * 24))

        if(days_till_Closing < 0){
            return "Closed"
        }else{
            return "Closing in " + days_till_Closing.toString() + " days"
        }
    }
    const getCategoryName = () => {
        //TODO FIX categories being empty
        // console.log(categories)
        if(categories.length > 0) {
            // @ts-ignore
            return "Category"
        }else{
            return "No category"
        }
    }
    const getReserve = () => {
        if(auction.highestBid != null){
            if(auction.highestBid > auction.reserve){
                return(
                    <Container>
                        <Typography variant="body1">
                            Reserve Met:
                        </Typography>
                        <Typography variant="body1">
                            {auction.reserve}
                        </Typography>
                    </Container>
                )
            }
        }else{
            return(
                <Container>
                    <Typography variant="body1">
                        Reserve:
                    </Typography>
                    <Typography variant="body1">
                        {auction.reserve}
                    </Typography>
                </Container>
            )
        }
    }
    const highestBid = () => {
        if(auction.highestBid != null){
            return(
                <Container>
                    <Typography variant="body1">
                        Highest Bid:
                    </Typography>
                    <Typography variant="body1">
                        {auction.highestBid}
                    </Typography>
                </Container>
            )
        }else{
            return (
                <Container>
                    <Typography variant="body1">
                        No Bids
                    </Typography>
                </Container>
            )
        }
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <Card sx={{ maxWidth: 345,display: 'flex' }} >
            {/*TODO: MAKE CARD HEIGHTS SAME*/}
            {/*TODO: UPDATE THIS LINK TO POINT TO INDIVIDUAL AUCTION*/}
            <CardActionArea href={"/auctions/"+auction.auctionId}>
            <CardHeader
                avatar={
                <Avatar src={getUserImage()}/>

                }
                action={
                    <IconButton aria-label="settings">

                    </IconButton>
                }
                title={auction.sellerFirstName + " " + auction.sellerLastName}
                subheader={getDaysTillClosing()}
            />
            <CardMedia
                component="img"
                height="200"
                width="200"
                sx={{objectFit:"cover"}}
                image={getAuctionImage()}
                alt="User hero image"
            />
            <CardContent>

                <Typography variant="h6">
                    {auction.title}
                </Typography>
                <Typography variant="body1">
                    {getCategoryName()}
                </Typography>
            </CardContent>
                <Container
                // Put elements next to each other
                sx={{display: "flex", justifyContent: "space-between"}}
                >
                {getReserve()}
                {highestBid()}
                </Container>

            </CardActionArea>
        </Card>
    )
}
export default AuctionListObject
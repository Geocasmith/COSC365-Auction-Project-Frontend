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
    Card,
    CardActionArea,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    CardContent,
    Box,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem, Checkbox, FormControl, SelectChangeEvent
} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";

function AuctionPage(){
    const {id} = useParams();
    const token = useTokenStore(state => state.token)
    const setToken = useTokenStore(state => state.setToken)
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const navigate = useNavigate();
    const[categories, setCategories] = React.useState<Category[]>([])
    const[bids, setBids] = React.useState<Bid[]>([])
    const [auction,setAuction] = React.useState<Auction>(
        {
            auctionId: -1,
            categoryId: -1,
            endDate: "",
            highestBid: -1,
            numBids: -1,
            reserve: -1,
            sellerFirstName: "",
            sellerId: -1,
            sellerLastName: "",
            title: ""
        }
    )

    React.useEffect(() => {
        const getAuction = () => {
            // @ts-ignore
            axios.get("http://localhost:4941/api/v1/auctions/"+id)
                .then((response) => {
                    setAuction(response.data)
                    console.log(response.data)

                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        const getCategories = () => {
            axios.get("http://localhost:4941/api/v1/auctions/categories")
                .then((response) => {
                    setCategories(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        const getBids = () => {
            axios.get("http://localhost:4941/api/v1/auctions/"+id+"/bids")
                .then((response) => {
                    setBids(response.data)
                }, (error) => {
                    setErrorFlag(true)
                    setErrorMessage(error.toString())
                })
        }
        getAuction()
        getCategories()
        getBids()
    }, [token])

    const getAuctionImage = () => {
        return "http://localhost:4941/api/v1/auctions/"+auction.auctionId.toString()+"/image"
    }
    const getUserImage = () => {
        return "http://localhost:4941/api/v1/users/"+auction.sellerId.toString()+"/image"
    }
    const getBidderImage = (bidderId: number) => {
        return "http://localhost:4941/api/v1/users/"+bidderId.toString()+"/image"
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

    // Components

    //BIDDERS
    //For category checkboxes
    //Credit to MUI docs https://mui.com/material-ui/react-select/
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const [categoryName, setCategoryName] = React.useState<string[]>([]);
    const names = categories.map(category => category.name)
    const handleChangeCategories = (event: SelectChangeEvent<typeof categoryName>) => {
        const {
            target: { value },
        } = event;
        setCategoryName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const showBidders = () => {
        if(auction.numBids != null){
            return(
                <Container>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel>Bids</InputLabel>
                        <Select
                            multiple
                            value={categoryName}
                            onChange={handleChangeCategories}
                            input={<OutlinedInput label="Categories" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {bids.map((bid) => (
                                <MenuItem key={bid.amount} value={bid.amount}>
                                    <ListItemText>
                                        <Avatar src={getBidderImage(bid.bidderId)}/>{bid.amount} by {bid.firstName} {bid.lastName} at {bid.timestamp}
                                    </ListItemText>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

    // if(errorFlag){
    //     return(
    //         <Typography
    //             variant={'h3'}
    //             color={'error'}
    //             >404: Auction Not Found</Typography>
    //     )
    // }else {
        return (
            <Container >
                {/*TODO: MAKE CARD HEIGHTS SAME*/}
                {/*TODO: UPDATE THIS LINK TO POINT TO INDIVIDUAL AUCTION*/}


                <Avatar alt={auction.sellerFirstName + " " + auction.sellerLastName} src={getUserImage()}/>
                {auction.sellerFirstName + " " + auction.sellerLastName}
                        {getDaysTillClosing()}

                    <Box
                        component="img"
                        src={getAuctionImage()}
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
                        {showBidders()}
                    </Container>

            </Container>
        )
    // }
}
export default AuctionPage
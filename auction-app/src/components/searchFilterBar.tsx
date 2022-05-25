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
    SelectChangeEvent, FormControl, MenuItem, InputLabel, Select, OutlinedInput, Checkbox
} from "@mui/material";
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useTokenStore} from "../store";
import AuctionListObject from "../components/auctionListObject";
import SearchIcon from '@mui/icons-material/Search';

function SearchFilterBar(){
    const [auctionState, setAuctionState] = useState<string>("All")
    const[sort, setSort] = useState<string>("CLOSING_SOON")
    const[search,setSearch] = useState<string>("")
    const [errorFlag, setErrorFlag] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState("")
    const[categories, setCategories] = React.useState<Category[]>([])

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

    //For auction open and closed
    const handleChangeAuctionState = (event: SelectChangeEvent) => {
        setAuctionState(event.target.value as string);
        console.log(auctionState)
    };

    //For filter
    const handleChangeSort = (event: SelectChangeEvent) => {
        setSort(event.target.value as string);
        console.log(sort)
        console.log(categories)
    };

    //For button
    const handleClick = () => {
        console.log(categoryName)
        console.log(auctionState)
        console.log(sort)
        console.log(search)
    }

    React.useEffect(() => {
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
        getCategories()
    }, [])


    return (
        <Grid
            container
            alignItems="center"
            justifyContent="center"
        >
            {/*Search bar and button*/}
            <Grid item>
                <TextField sx={{ m: 1, width: 300 }}
                    onChange={(e) => {setSearch(e.target.value)}}
                    label="Search"
                    variant={'outlined'}
                    fullWidth

                />
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
            {/*Open,closed,all*/}
            <FormControl sx={{ m: 1, width: 150 }}>
                <InputLabel id="sort">Status</InputLabel>
                <Select
                    id="sort"
                    value={auctionState}
                    label="Sort By"
                    onChange={handleChangeAuctionState}
                >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Open"}>Open</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            {/*Sort By*/}
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="sort">Sort By</InputLabel>
                <Select
                    id="sort"
                    value={sort}
                    label="Sort By"
                    onChange={handleChangeSort}
                >
                    <MenuItem value={"ALPHABETICAL_ASC"}>Title A-Z</MenuItem>
                    <MenuItem value={"ALPHABETICAL_DESC"}>Title Z-A</MenuItem>
                    <MenuItem value={"BIDS_ASC"}>Lowest Price</MenuItem>
                    <MenuItem value={"BIDS_DESC"}>Highest Price</MenuItem>
                    <MenuItem value={"RESERVE_ASC"}>Lowest Reserve</MenuItem>
                    <MenuItem value={"RESERVE_DESC"}>Highest Reserve</MenuItem>
                    <MenuItem value={"CLOSING_SOON"}>Closing Soon</MenuItem>
                    <MenuItem value={"CLOSING_LAST"}>Closing Last</MenuItem>
                </Select>
            </FormControl>
            </Grid>
            {/*Categories*/}
            {/*Credit to https://mui.com/material-ui/react-select/*/}
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Categories</InputLabel>
                <Select
                    multiple
                    value={categoryName}
                    onChange={handleChangeCategories}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={categoryName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            </Grid>
            <Grid item alignItems="stretch" style={{ display: "flex" }}>
                <Button
                    sx={{ m: 1, height:60, width: 50 }}
                    color="primary"
                    variant="contained"
                    onClick={handleClick}
                >
                    <SearchIcon/>
                </Button>
            </Grid>
        </Grid>

    );
}
export default SearchFilterBar
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Reset from "./components/Reset";
import Register from "./pages/register";
import Login from "./pages/login";
import Logout from "./pages/logout";
import UserProfile from "./pages/userProfile";
import EditProfile from "./pages/editProfile";
import AuctionsPage from "./pages/auctionsPage";
import AuctionsList from "./components/auctionsList";
import SearchFilterBar from "./components/searchFilterBar";
import AuctionPage from "./pages/auction";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>

              <Route path="*" element={<NotFound/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>

              {/*  Profile*/}
                <Route path="/profile" element={<UserProfile/>}/>
                <Route path="/edit" element={<EditProfile/>}/>

              {/*Auctions*/}
              <Route path="/auctions" element={<AuctionsList/>}/>
              <Route path="/auctions/:id" element={<AuctionPage/>}/>
              <Route path="/search" element={<SearchFilterBar/>}/>


              {/*<Route path="/users-props" element={<SearchBar/>}/>*/}
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;
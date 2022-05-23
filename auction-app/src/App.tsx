import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound from "./components/NotFound";
import Reset from "./components/Reset";
import Register from "./pages/register";

function App() {
  return (
      <div className="App">
        <Router>
          <div>
            <Routes>

              <Route path="*" element={<NotFound/>}/>
                <Route path="/reset" element={<Reset/>}/>
                <Route path="/register" element={<Register/>}/>
              {/*<Route path="/users-props" element={<SearchBar/>}/>*/}
            </Routes>
          </div>
        </Router>
      </div>
  );
}
export default App;
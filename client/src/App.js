import React,{useEffect,useState} from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Settings from "./Settings";
import MyAuctions from "./MyAuctions";
import Auction from "./Auction";
import MyOffers from "./MyOffers";
import SearchResults from "./SearchResults";
import CreateAuctions from "./CreateAuctions";


/*function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/login")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
    </div>
  );
}

export default App
*/

function App(){

  const [data, setBackEndData] = useState([{}])

  useEffect(() => {
    fetch("/").then(
      response => response.json()
    ).then(
      data => {
        setBackEndData(data)
      }
    )
  }, []) 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="myauctions" element={<MyAuctions/>}/>
        <Route path="myoffers" element={<MyOffers/>}/>
        <Route path="/auction/:auctionId" element={<Auction />} />
        <Route path="searchresults" element={<SearchResults/>}/>
        <Route path="createauctions" element={<CreateAuctions/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
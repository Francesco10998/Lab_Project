import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/MyAuctions.css';
import golden from "./images/goldenauctions.png"
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInSeconds } from 'date-fns';

const MyAuctions = () => {
  const [username, setUsername] = useState(sessionStorage.getItem('userData'));
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
  };


  const [auctions, setAuctions] = useState('');

  const [item, setItem] = useState('');

  function getDeadline(finish){
    const options = {
        timeZone: 'Europe/Rome', 
        hour12: false,
    };
    const data = new Date().toLocaleString('en-US', options);
    
    const secondsDifference = differenceInSeconds(finish, data);
    const minutesDifference = differenceInMinutes(finish, data);
    const hoursDifference = differenceInHours(finish, data);
    const daysDifference = differenceInDays(finish, data);

    const remainingSeconds = secondsDifference % 60;
    const remainingDays = daysDifference;
    const remainingHours = hoursDifference % 24;
    const remainingMinutes = minutesDifference % 60;

    return [remainingDays, remainingHours, remainingMinutes, remainingSeconds];
  }

  //Function that asks the auctions to server
  const getAuctions = async (user) => {
    try {
      const response = await fetch('/myauctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode: "auctions",
          user: user
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result);
      setAuctions(result);
      return await(result);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  //Function that asks for the elements of a certain item to server
  const getItem = async (id) => {
    try {
      const response = await fetch('/myauctions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode: "item",
          id: id
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      //setItem(result[0].name);
      return result;
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
      setUsername(sessionStorage.getItem('userData'))
      const fetchData = async () => {
        try {
          const auctionsResult = await getAuctions(username);

          // Esegui qualcosa con la risposta di getAuctions
          console.log('Risposta di getAuctions:', auctionsResult);

          const itemPromises = auctionsResult.slice(0, auctionsResult.length).map((auction) => getItem(auction.auctionId));

          const item = await Promise.all(itemPromises);
          
          setItem(item);
        } 
        catch (error) {
          console.error('Errore durante il recupero delle aste:', error);
        }
      };

      fetchData();
  }, []); 




  function Titolo(){
    return (
      <div style={{ textAlign: 'center',backgroundColor:'#333333',height:'30px'}}>
        <img src={golden} style={{height:'70px', width:'400px', margin:'auto', marginTop:'5px'}}></img>
      </div>
    )
  }

  function NavbarLogged(){
    return (<div className="topnav">
      <a href="/" onClick={handleLogout} class="logout">Logout</a>
      <a class="username">{username}</a>
      <Link to="/settings">Settings</Link>
      <a href="MyOffers">My Offers</a>
      <a href="MyAuctions">My Auctions</a>
      <a href="/">Home</a>

      <form action="/searchresults" method="get" style={{padding:'13px'}}>
        <input type="text" id="searchText" name="searchText" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <select id="category" name="category" style={{borderRadius:'10px'}}>
          <option value="all"selected>All</option>
          <option value="tech">Tech</option>
          <option value="videogames">Videogames</option>
          <option value="books">Books</option>
        </select>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }


  function ShowAuctions() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
      const updateDeadlines = () => {        
        if (auctions && auctions.length > 0) {
          const updatedArticles = auctions.map((auction, index) => {
            const item2 = item[index];
            const deadline = getDeadline(auction.finishingTime);
            const isDeadlinePassed = (deadline[0] < 0) || (deadline[1] < 0)|| (deadline[2] < 0) || (deadline[3] < 0);
            
            //Managing of image
            const uint8Array = new Uint8Array(item2[0].image.data);
            // Convert the Uint8Array to a Blob
            const blob = new Blob([uint8Array]);
            // Create a data URL using the Blob
            const imageUrl = URL.createObjectURL(blob);
            
            return {
              title: item2[0].name,
              leadingOffer: auction.bet,
              endsIn: [deadline[0], deadline[1], deadline[2], deadline[3]],
              url: `/auction/${auction.auctionId}`,
              isPassed: isDeadlinePassed,
              image: imageUrl
            };
          });
          setArticles(updatedArticles);
        }
      };

      // Set an interval to update deadlines every second
      const updateInterval = setInterval(updateDeadlines, 1000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(updateInterval);
    }, [auctions]);

    return(
      <div id="general-container">
        {articles.map((article, index) => (
        <div id="auction-container">
            <div class="auction-item">
              <img src={article.image} class="image"></img>
              <div class="item-details">
                <h3 class="object">{article.title}</h3>
                {article.isPassed ? (
                  <p class="bet">Sold at: ${article.leadingOffer}</p>
                ) : (
                  <p class="bet">Current Bet: ${article.leadingOffer}</p>
                )}
                {article.isPassed && article.endsIn[0]==0 ? (
                  <p class="deadline"> Finished Today </p>
                ) : article.isPassed && article.endsIn[0]==-1 ? (
                  <p class="deadline"> Finished Yesterday</p>
                ) : article.isPassed ? (
                  <p class="deadline"> Finished {-article.endsIn[0]} Days Ago</p>
                ) : (
                  <p class="deadline">Ends in {article.endsIn[0]} Days, {article.endsIn[1]} Hours, {article.endsIn[2]} Minutes, {article.endsIn[3]} Seconds</p>
                )}
                <Link to={article.url}>
                  <button class="redirectButton">Go to the Auction</button>
                </Link>
              </div>
            </div>
        </div>  
        ))}
      </div>
    )
  };

  return (<div>
    <Titolo/>
    <NavbarLogged/>
    <h1 class="title">My Auctions</h1>
    <ShowAuctions/>
  </div>
  );

}
export default MyAuctions;


/*
<div id="auction-container">
            <div class="auction-item">
              <img src={iphone} class="image"></img>
              <div class="item-details">
                <h3 class="object">Iphone 14</h3>
                <p class="bet">Current Bet: $100</p>
                <p class="deadline">Ends in 7 hrs</p>
              </div>
            </div>
        </div>   
      )
*/
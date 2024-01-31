import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/Auction.css';
import trending from "./images/trending.png"
import iphone from "./images/iphone.jpg"
import time from "./images/time.png"
import { useParams } from 'react-router-dom';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInSeconds } from 'date-fns';

const Auction = () => {
  const { auctionId } = useParams();

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

  let [user, setUser] = useState(sessionStorage.getItem('userData'));

  const [auctions, setAuctions] = useState('');

  const [item, setItem] = useState('');

  const [image, setImage] = useState('');

  //Function that asks the auctions to server
  const getAuctions = async (id) => {
    try {
      const response = await fetch('/auction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode: "auction",
          id: id
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
      const response = await fetch('/', {
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
      return result;
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    setUser(sessionStorage.getItem('userData'));
    const fetchData = async () => {
      try {
        const auctionsResult = await getAuctions(auctionId);

        // Esegui qualcosa con la risposta di getAuctions
        console.log('Risposta di getAuctions:', auctionsResult);

        const itemPromises = auctionsResult.slice(0, 1).map((auction) => getItem(auction.auctionId));

        const item = await Promise.all(itemPromises);
        console.log('Risposta di getItems:', item);
        
        setItem(item);

        //Managing of image
        const uint8Array = new Uint8Array(item[0][0].image.data);
        // Convert the Uint8Array to a Blob
        const blob = new Blob([uint8Array]);
        // Create a data URL using the Blob
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } 
      catch (error) {
        console.error('Errore durante il recupero delle aste:', error);
      }
    };

    fetchData();
  }, []); 

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
  };

  if(sessionStorage.getItem('userData') != null){
    return (<div>
      <Titolo/>
      <NavbarLogged/>
      <Page/>
    </div>)
  }
  else{
    return (<div>
        <Titolo/>
        <Navbar/>
        <Page/>
    </div>
    )
  }

  function Titolo(){
    return (
      <div style={{ textAlign: 'center',backgroundColor:'#333333',height:'30px'}}>
       <img src={trending} style={{height:'100px', width:'430px', margin:'auto', marginTop:'-15px'}}></img>
      </div>
    
    )
  }

  function Navbar(){
    return (<div className="topnav">
      <Link className="active" to="/login">Login</Link>
      <Link className="register" to="/register">Register</Link>
      <a href="/">Home</a>

      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }

  function NavbarLogged(){
    return (<div className="topnav">
      <a href="/" onClick={handleLogout} class="logout">Logout</a>
      <a class="username">{user}</a>
      <Link to="/settings">Settings</Link>
      <a href="MyOffers">My Offers</a>
      <Link to="/myauctions">My Auctions</Link>
      <a href="/">Home</a>

      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }

  function Page(){
    const [times, setTimes] = useState([]);

    useEffect(() => {
      const updateDeadlines = () => {
        if (auctions && auctions.length > 0 && item && item.length > 0) {
          const updatedTimes = auctions.map((auction) => {
            const deadline = getDeadline(auction.finishingTime);
            const isDeadlinePassed = (deadline[0] < 0) || (deadline[1] < 0)|| (deadline[2] < 0) || (deadline[3] < 0);

            return {
              endsIn: [deadline[0], deadline[1], deadline[2], deadline[3]],
              isPassed: isDeadlinePassed
            };
          });
          setTimes(updatedTimes);
        };
      };

      // Set an interval to update deadlines every second
      const updateInterval = setInterval(updateDeadlines, 1000);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(updateInterval);
    }, [auctions]);

    return (<div>
      {auctions && auctions.length > 0 && auctions.map((auction) => (
        <div id="auction-container">
          <div id="item-image">
            {image && image.length > 0 && (
              <img src={image} alt="Item Image" height="300"/>
            )}
          </div>
          <div id="item-details">
              <div id="first-row">
                {item && item.length > 0 && item.map((it) => (
                    <div id="item-name">{it[0].name}</div>
                ))}
                <img src={time} id="time-image" alt="Time Image" height="40"/>
                {times && times.length > 0 && times.map((time) => {
                  if (time.isPassed && time.endsIn[0] === 0) {
                    return <p id="time-remaining">Finished Today</p>;
                  } else if (time.isPassed && time.endsIn[0] === -1) {
                    return <p id="time-remaining">Finished Yesterday</p>;
                  } else if (time.isPassed) {
                    return <p id="time-remaining">Finished {-time.endsIn[0]} Days Ago</p>;
                  } else {
                    return (
                      <p key={time.id} id="time-remaining">
                        Ends in {time.endsIn[0]} Days, {time.endsIn[1]} Hours, {time.endsIn[2]} Minutes, {time.endsIn[3]} Seconds
                      </p>
                    );
                  }
                })}
              </div>
              <div id="seller-name">Seller: {auction.creatorUsername}</div>
              {item && item.length > 0 && item.map((it) => (
                <div id="item-description">{it[0].description}</div>
              ))}
              {times && times.length > 0 && times.map((time) => {
                if (!time.isPassed){
                  return(
                    <div>
                      <div id="leading-offer">Leading Offer: ${auction.bet}</div>
                      <div id="current-winner">Current Winner: {auction.currentWinner}</div>
                      <div id="offer-row">
                        <div id="offer-label">Make an offer:</div>
                        <input type="text" id="bid-input" placeholder="00,00 $"></input>
                        <input type="submit" id="bid-button" value="Surpass" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
                      </div>
                      <div id="condition">Offer will not be accepted if it is less or equal to the leading one*</div>
                    </div>
                  )
                }
                else{
                  return <div id="leading-offer">Leading Offer: ${auction.bet}</div>
                }
              })}
          </div>
      </div>
      ))}
    </div>
    )
  }

}

export default Auction;

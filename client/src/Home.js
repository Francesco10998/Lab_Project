import { Link, Navigate,useHistory } from "react-router-dom";
import './css/Home.css';
import iphone from "./images/iphone.jpg"
import plus from "./images/plus.png"
//import logo from "./images/logo.jpg"
import trending from "./images/trending.png"
import { useEffect, useState } from 'react';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInSeconds } from 'date-fns';

function Home() {
  //Take the current Username
  let [user, setUser] = useState(sessionStorage.getItem('userData'));

  const [auctions, setAuctions] = useState('');

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


  const getAuctions = async () => {
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://localhost:8000',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          username: user,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      console.log(result)
      setAuctions(result);
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    setUser(sessionStorage.getItem('userData'));
    getAuctions();
  }, []); 

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
  };

  if(sessionStorage.getItem('userData') != null){
    return (<div>
      <Titolo/>
      <NavbarLogged/>
      <Auctions/>
    </div>)
  }
  else{
    return (<div>
        <Titolo/>
        <Navbar/>
        <Auctions/>
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
      <a href="MyAuctions">My Auctions</a>
      <a href="/">Home</a>

      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }

  function Auctions() {
    const [articles, setArticles] = useState([]);

  useEffect(() => {
    const updateDeadlines = () => {
      if (auctions && auctions.length > 0) {
        const updatedArticles = auctions.map((auction) => {
          const deadline = getDeadline(auction.finishingTime);
          return {
            title: 'Iphone 14',
            leadingOffer: auction.bet,
            endsIn: [deadline[0], deadline[1], deadline[2], deadline[3]],
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
    
  
    return (
      <div style={{ padding: '15px' }}>
        <a href="Login.html" style={{ display: 'flex', width: '170px' }}>
          <button style={{ borderRadius: '10px' }}>Create a new Auction</button>
          <img src={plus} style={{ width: '20px', height: '20px' }} alt="plus-icon" />
        </a>
        <br></br>
        <div className="grid">
          {articles.map((article, index) => (
            <article key={index}>
              <img src={iphone} alt={`Article ${index + 1}`} />
              <div className="text" style={{ textAlign: 'center' }}>
                <h3>{article.title}</h3>
                <p class="leadingHome">Leading offer = ${article.leadingOffer}</p>
                <p class="deadlineHome">Ends in {article.endsIn[0]} Days, {article.endsIn[1]} Hours, {article.endsIn[2]} Minutes, {article.endsIn[3]} Seconds</p>
                <Link to="/auction">
                  <button className="redirect">Go to the Auction</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
  

  /*function Auctions(){
    return(
      <div style={{padding:'15px'}}>
        <a href="Login.html" style={{display: 'flex', width:'170px'}}>
          <button style={{borderRadius:'10px'}}>Create a new Auction</button>
          <img src={plus} style={{ width:'20px' , height:'20px'}}></img>
        </a>
      <br></br>
      <div className="grid">
        <article>
          <img src={iphone} />
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>

          </div>
        </article>
        <article>
        <img src={iphone} ></img>
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>
          </div>
        </article>
        <article>
        <img src={iphone} ></img>
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>
          </div>
        </article>
        <article>
        <img src={iphone} ></img>
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>
          </div>
        </article>
        <article>
        <img src={iphone} ></img>
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>
          </div>
        </article>
        <article>
        <img src={iphone} ></img>
          <div className="text" style={{ textAlign: 'center' }} >
            <h3>Iphone 14</h3>
            <p> Leading offer = 500$ </p>
            <p> Ends in 14hrs </p>
            <Link to="/auction">
              <button class="redirect">Go to the Auction</button>
            </Link>
          </div>
        </article>
      </div>
      </div>
    )
  }*/

}  

export default Home;
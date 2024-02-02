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

  //const [counter, setCounter] = useState(0);

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
          mode: "auctions"
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
      //setItem(result[0].name);
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
          const auctionsResult = await getAuctions();

          // Esegui qualcosa con la risposta di getAuctions
          console.log('Risposta di getAuctions:', auctionsResult);

          /*for (let i = 0; i < 6; i++) {
            try{
              const itemResult = await getItem(auctionsResult[i].auctionId);
              if (!array.includes(itemResult)) {
                array.push(itemResult);
                array.forEach((item, index) => {
                  console.log(`AHOElemento ${index + 1}:`, item);
                });
              }            
            }
            catch (error) {
              console.error('Errore durante il recupero degli Item:', error);
            }
          }*/
          const itemPromises = auctionsResult.slice(0, 6).map((auction) => getItem(auction.auctionId));

          const item = await Promise.all(itemPromises);
          
          setItem(item);
        } 
        catch (error) {
          console.error('Errore durante il recupero delle aste:', error);
        }
      };

      fetchData();
  }, []); 

  
  /*useEffect(() => {
    setUser(sessionStorage.getItem('userData'));
    (async () => {
      const result = await getAuctions();
      console.log("IUTO"+auctions);
      setAuctions(result);
      setItem(result[0].auctionId);
      getItem();
    })();
  }, []); */
  /*useEffect(() => {
    setUser(sessionStorage.getItem('userData'));
    getAuctions();
  }, []); */


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

  function NavbarLogged(){
    return (<div className="topnav">
      <a href="/" onClick={handleLogout} class="logout">Logout</a>
      <a class="username">{user}</a>
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

  function Auctions() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
      const updateDeadlines = () => {
        /*if (itemResult && itemResult.length > 0) {
          const updatedNamess = itemResult.map((item) => {
            return {
              name: item
            };
          });
        }*/
        
        if (auctions && auctions.length > 0) {
          const updatedArticles = auctions.map((auction, index) => {
            const item2 = item[index];
            const deadline = getDeadline(auction.finishingTime);

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
    
    return (
      <div style={{ padding: '15px' }}>
        <a href="Login.html" style={{ display: 'flex', width: '170px' }}>
          <button style={{ borderRadius: '10px' }}>Create a new Auction</button>
          <img src={plus} style={{ width: '20px', height: '20px' }} alt="plus-icon" />
        </a>
        <br></br>
        <div className="grid">
          {articles.map((article, index) => (
            <article key={article.title}>
              <img src={article.image} alt={`Article ${index + 1}`} />
              <div className="text" style={{ textAlign: 'center' }}>
                <h3>{article.title}</h3>
                <p class="leadingHome">Leading offer = ${article.leadingOffer}</p>
                <p class="deadlineHome">Ends in {article.endsIn[0]} Days, {article.endsIn[1]} Hours, {article.endsIn[2]} Minutes, {article.endsIn[3]} Seconds</p>
                <Link to={article.url}>
                  <button className="redirect">Go to the Auction</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

}

export default Home;
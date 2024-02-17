import { Link } from "react-router-dom";
import './css/SearchResults.css';
import plus from "./images/plus.png"
//import logo from "./images/logo.jpg"
import golden from "./images/goldenauctions.png"
import noresults from "./images/noresults.png"
import { useEffect, useState } from 'react';
import { differenceInMinutes, differenceInHours, differenceInDays, differenceInSeconds } from 'date-fns';
import { useLocation } from 'react-router-dom';


function SearchResults() {
  //Take the parameter from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get('searchText');
  const category = searchParams.get('category');

  //Take the current Username
  let [user, setUser] = useState(sessionStorage.getItem('userData'));

  const [items, setItems] = useState('');

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
  
  //Function that asks for the elements of a certain item to server
  const getItems = async (id) => {
    try {
      const response = await fetch('/searchresults', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          mode: "items",
          searchText: searchText,
          cat: category
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
      setItems(result);
      return await result;
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
      setUser(sessionStorage.getItem('userData'));
      const fetchData = async () => {
        try {
          const itemsResult = await getItems();

          // Esegui qualcosa con la risposta di getItems
          console.log('Risposta di getItems:', itemsResult);

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
        <img src={golden} style={{height:'70px', width:'400px', margin:'auto', marginTop:'5px'}}></img>
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
            if (items && items.length > 0) {
            const updatedArticles = items.map((item) => {

                const deadline = getDeadline(item.finishingTime);

                //Managing of image
                const uint8Array = new Uint8Array(item.image.data);
                // Convert the Uint8Array to a Blob
                const blob = new Blob([uint8Array]);
                // Create a data URL using the Blob
                const imageUrl = URL.createObjectURL(blob);

                return {
                title: item.name,
                leadingOffer: item.bet,
                endsIn: [deadline[0], deadline[1], deadline[2], deadline[3]],
                url: `/auction/${item.auctionId}`,
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
    }, [items]);

    //Manage no results spawn
    const [isVisible, setIsVisible] = useState(false);
    setTimeout(() => {
      setIsVisible(true);
    }, 500); 
    
    if(items.length>0){
        return (
        <div style={{ padding: '15px' }}>
            <h1 style={{ marginLeft: '650px' }}>Results</h1>
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
    else{
        return (
        <div style={{ padding: '15px' }}>
            <br></br>
            <h1 style={{ marginLeft: '650px', display: isVisible ? 'block' : 'none'  }}>No Results</h1>
            <img src={noresults} style={{height:'400px', marginLeft: '560px', display: isVisible ? 'block' : 'none'}}></img>
        </div>
        );
    }

  }

}

export default SearchResults;
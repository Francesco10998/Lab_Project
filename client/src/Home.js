import { Link, Navigate,useHistory } from "react-router-dom";
import './css/Home.css';
import iphone from "./images/iphone.jpg"
import plus from "./images/plus.png"
//import logo from "./images/logo.jpg"
import trending from "./images/trending.png"
import { useEffect, useState } from 'react';

function Home() {
  let [user, setUser] = useState(sessionStorage.getItem('userData'));

  useEffect(() => {
    setUser(sessionStorage.getItem('userData'));
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

  function Auctions(){
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
  }

}  

export default Home;
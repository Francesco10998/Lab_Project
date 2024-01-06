import { Link, Navigate } from "react-router-dom";
import './css/Home.css';
import iphone from "./iphone.jpg"
import plus from "./plus.png"
import logo from "./logo.jpg"
import trending from "./trending.png"

function Home() {
    //const containerStyle = {
      //background: `url(${back}) no-repeat center center fixed`,
      //backgroundSize: "cover",
    //};

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
  return (<div class="topnav">
<a class="active" href="#Login">Login</a>
<a href="#Settings">Settings</a>
<a href="#MyOffers">My Offers</a>
<a href="#MyAuctions">My Auctions</a>

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
    <div class="grid">
      <article>
        <img src={iphone} />
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
      <article>
      <img src={iphone} ></img>
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
      <article>
      <img src={iphone} ></img>
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
      <article>
      <img src={iphone} ></img>
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
      <article>
      <img src={iphone} ></img>
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
      <article>
      <img src={iphone} ></img>
        <div class="text" style={{ textAlign: 'center' }} >
          <h3>Iphone 14</h3>
          <p> Leading offer = 500$ </p>
          <p> Ends in 14hrs </p>
          <button>Go to the Auction</button>
        </div>
      </article>
    </div>
    </div>
  )

}

export default Home;
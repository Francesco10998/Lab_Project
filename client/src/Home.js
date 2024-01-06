import { Link, Navigate } from "react-router-dom";
import './css/Home.css';

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
    <h1 class="titolo">
    Trending Auctions
  </h1>
  )
}

function Navbar(){
  return (<div class="topnav">
<a class="active" href="#Login">Login</a>
<a href="#Settings">Settings</a>
<a href="#MyOffers">My Offers</a>
<a href="#MyAuctions">My Auctions</a>
</div>
)
}

function Auctions(){
  return(
    <div class="grid">
      <article>
        <img src="iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Seamlessly visualize quality</h3>
          <p>Collaboratively administrate empowered markets via plug-and-play networks.</p>
          <button>Here's why</button>
        </div>
      </article>
      <article>
        <img src="iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Completely Synergize</h3>
          <p>Dramatically engage seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing.</p>
          <button>Here's how</button>
        </div>
      </article>
      <article>
        <img src="/img/iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Dynamically Procrastinate</h3>
          <p>Completely synergize resource taxing relationships via premier niche markets.</p>
          <button>Read more</button>
        </div>
      </article>
      <article>
        <img src="/img/iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Best in class</h3>
          <p>Imagine jumping into that boat, and just letting it sail wherever the wind takes you...</p>
          <button>Just do it...</button>
        </div>
      </article>
      <article>
        <img src="./img/iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Dynamically innovate supply chains</h3>
          <p>Holisticly predominate extensible testing procedures for reliable supply chains.</p>
          <button>Here's why</button>
        </div>
      </article>
      <article>
        <img src="/img/iphone.jpg" alt="Sample photo"></img>
        <div class="text">
          <h3>Sanity check</h3>
          <p>Objectively innovate empowered manufactured products whereas parallel platforms.</p>
          <button>Stop here</button>
        </div>
      </article>
    </div>
  )

}

export default Home;
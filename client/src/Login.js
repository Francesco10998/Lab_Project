import { Link, useNavigate } from "react-router-dom";
import React, {  useEffect, useState} from 'react';
import './css/Login.css';
import golden from "./images/goldenauctions.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
          <option value="tech">Clothes</option>
          <option value="videogames">Motors</option>
        </select>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }
  useEffect(() => {
    //if not logged redirect to home
    if(sessionStorage.getItem('userData') != null){
      navigate("/");
    }
  }, []); 

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if necessary
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      setData(result);
      //Check the server response for the Username
      if(result.results=="wrong password"){
        toast.error('Password inserted is wrong',{
          position: 'top-left',
        });
      }
      if(result.results=="wrong username"){
        toast.error('Username not exists',{
          position: 'top-left',
        });
      }
      if(result.results=="authenticated"){
        sessionStorage.setItem('userData',username);
        navigate('/');
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <div>
      <Titolo/>
      <Navbar/>
      <div className="title" style={{margin:'auto'}}>
      <div class="logincontainer" style={{margin:'auto'}}>
        <h2>Login</h2>
        <div id="container_login">
          <form className='loginform' onSubmit={handleSubmit}>
            <label for="username" id="username_label">Username </label>
            <input type="text" name="username"  value={username} onChange={handleUsernameChange} required />
            <label for="password" id="password_label">Password </label>
            <input type="password" name="password"  value={password} onChange={handlePasswordChange} required />
            <input type="submit" id="submit_login" value="Login" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
          </form>
          <p id="p_login">Don't have an account?</p><Link id="link_to_register" to="/register">Register</Link>
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default Login;
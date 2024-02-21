import { Link,useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/Register.css';
import golden from "./images/goldenauctions.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
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
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://localhost:8000',
            // Add other headers if necessary
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
        });
        
        console.log(username, password);
  
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
  
        const result = await response.json();
        console.log("ENTRATO "+JSON.stringify(result.results));

        //Check the server response for the Email
        if(result.results=="Email not satisfies"){
          toast.error('Email format is not correct',{
            position: 'top-left',
          });
        }
        else if(result.results=="email_already_exists"){
          toast.error("Email already exists",{
            position: 'top-left',
          });
        }

        //Check the server response for the Password
        if(result.results=="Password not satisfies"){
          toast.error('Password should consists of at least 6 characters, a special one, an upper-case one and a number ',{
            position: 'top-left',
          });
        }

        //Check the server response for the Username
        if(result.results=="username_already_exists"){
          toast.error('Username already exists',{
            position: 'top-left',
          });
        }

        if(result.results=="user_inserted"){
          sessionStorage.setItem('userData', username);
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }

  };

  return (
    <div>
      <Titolo/>
      <Navbar/>
      <div className="title" style={{margin:'auto'}}>
      <div style={{margin:'auto'}}>
        <h2>Registration</h2>
        <div id="container_register">
          <form className='loginform' onSubmit={handleSubmit}>
            <label for="username" id="username_label_register">Username</label>
            <input type="username" name="username" value={username} onChange={handleUsernameChange} required />
            <label for="email" id="email_label_register">Email</label>
            <input type="email" name="email"  value={email} onChange={handleEmailChange} required />
            <label for="password" id="password_label_register">Password </label>
            <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
            <input type="submit" id="submit_register" value="Submit" style={{ backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }} />
          </form>
          <p id="p_register">Have already an account?</p><Link id="link_to_login" to="/login">login</Link>
        </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}
export default Register;
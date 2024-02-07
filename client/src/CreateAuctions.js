import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/CreateAuctions.css';
import trending from "./images/trending.png"
import iphone from "./images/iphone.jpg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAuctions = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    finishDate: '',
    category: 'Tech',
    image:'',
    username : sessionStorage.getItem('userData'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    console.log(formData['name']);
  
    console.log(formData['image']['name']);
    
    const formDataObject = new FormData();
    formDataObject.append('name', formData.name);
    formDataObject.append('description', formData.description);
    formDataObject.append('startDate', formData.startDate);
    formDataObject.append('finishDate', formData.finishDate);
    formDataObject.append('category', formData.category);
    formDataObject.append('image', formData.image);
    formDataObject.append('username', formData.username);

    try {
      const response = await fetch('/createauctions', {
        method: 'POST',
        body: formDataObject,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const result = await response.json();
      setData(result);
      console.log(result);
      if (result && result.success === true) {
        toast.success('Auction created with success',{
          position: 'top-left',
        });
      } else {
        toast.error('Error creating the auction',{
          position: 'top-left',
        });
      }
    } 
    catch (error) {
      console.error('Error fetching data:', error);
    }
    console.log('Form data submitted:', formData);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userData');
  };

  useEffect(() => {
    setUsername(sessionStorage.getItem('userData'))
}, []); 


  function Titolo(){
    return (
      <div style={{ textAlign: 'center',backgroundColor:'#333333',height:'30px'}}>
       <img src={trending} style={{height:'100px', width:'430px', margin:'auto', marginTop:'-15px'}}></img>
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

      <form action="/search" method="get" style={{padding:'13px'}}>
        <input type="text" id="search" name="search" placeholder="Search..." style={{borderRadius:'10px'}}/>
        <input type="submit" value="Search"style={{borderRadius:'10px'}} />
      </form>

    </div>
    )
  }


  return (<div>
      <Titolo/>
      <NavbarLogged/>
      <h1 class="title">Create Auction</h1>
      <div>
      <form onSubmit={handleSubmit}style={{display:'flex', margin:'auto', flexDirection:'column', maxWidth:'30%'}}>
      <label htmlFor="name">Name of the object you want to sell :</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="description">Description of the object :</label>
      <textarea
        id="description"
        name="description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>

      <label htmlFor="startDate">Start Date of the auction :</label>
      <input
        type="datetime-local"
        id="startDate"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="finishDate">Finish Date:</label>
      <input
        type="datetime-local"
        id="finishDate"
        name="finishDate"
        value={formData.finishDate}
        onChange={handleChange}
        required
      />

      <label htmlFor="Category">Category:</label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="Tech">Tech</option>
        <option value="Food">Food</option>
        <option value="Cars">Cars</option>
        <option value="Beauty">Beauty</option>
        <option value="Furniture">Furniture</option>
      </select>

      <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
      <br></br>

      <button type="submit">Submit</button>
    </form>
    <ToastContainer />
    </div>
  </div>
  )
}
export default CreateAuctions;

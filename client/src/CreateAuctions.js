import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './css/CreateAuctions.css';
import trending from "./images/trending.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateAuctions = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
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
    console.log("prima di form data");

    console.log(formData);
    console.log(formData['name']);
  
    console.log(formData['image']['name']);
    
    const formDataObject = new FormData();
    formDataObject.append('name', formData.name);
    formDataObject.append('description', formData.description);
    formDataObject.append('finishDate', formData.finishDate);
    formDataObject.append('category', formData.category);
    formDataObject.append('image', formData.image);
    formDataObject.append('username', formData.username);

    console.log("dopo form data"+formDataObject);

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
        navigate('/');
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
    setUsername(sessionStorage.getItem('userData'));
    //if not logged redirect to home
    if(sessionStorage.getItem('userData') == null){
      navigate("/");
    }
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


  return (
  <div>
      <Titolo/>
      <NavbarLogged />
      <h1 className="title">Create Auction</h1>
    <div id="form-createAuctioniner">
      <form onSubmit={handleSubmit} className="auction-form">
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
        <option value="Videogames">Videogames</option>
        <option value="Books">Books</option>
        <option value="Motors">Motors</option>
        <option value="Clothes">Clothes</option>
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
    

  );
}
export default CreateAuctions;

const express = require("express");

const utils = require("./util");

const axios = require('axios');

const PORT = 8000;

const app = express();
app.use(express.json());

//----------------- app routing -------------------------

//------------------home page ---------------------------
app.post("/", (req, res) => {

  const postData = req.body;
  
  axios.post('http://localhost:5000/', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
  
});


//------------------login page --------------------------
app.post("/login", (req, res) => {

  const postData = req.body;
  
  axios.post('http://localhost:6000/login', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });

});

//------------------ register page ------------------------
app.post("/register", (req, res) => {

  const postData = req.body;
  
  axios.post('http://localhost:6000/register', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });  
});

//----------------- enter settings page ------------------------
app.post("/settings", (req, res) => {

  const postData = req.body;
  
  axios.post('http://localhost:6000/settings', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });

});


//----------------- myoffers page -------------------------
app.post("/myoffers", (req, res) => {
  const postData = req.body;
  
  axios.post('http://localhost:5000/myoffers', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});

//---------------- myauctions page ------------------------
app.post("/myauctions", (req, res) => {
  const postData = req.body;
  
  axios.post('http://localhost:5000/myauctions', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});


//---------------- auction page ------------------------
app.post("/auction", (req, res) => {
  const postData = req.body;
  
  axios.post('http://localhost:5000/auction', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});

//---------------- searchresults page ------------------------
app.post("/searchresults", (req, res) => {
  const postData = req.body;
  
  axios.post('http://localhost:5000/searchresults', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

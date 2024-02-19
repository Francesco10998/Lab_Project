const express = require("express");

const utils = require("./util");

const axios = require('axios');

const PORT = 8000;

const app = express();
app.use(express.json());

const multer = require('multer'); 
//const FormData = require('form-data');
const storage = multer.memoryStorage(); 
//const upload = multer({ storage: storage });
// Define multer storage and file size limit
const upload = multer({
  limits: { fieldSize:  100 * 1024 * 1024, fileSize: 100 * 1024 * 1024}, // 30 MB file size limit
  storage: storage
});



//----------------- app routing -------------------------

//------------------home page ---------------------------
app.post("/", (req, res) => {

  const postData = req.body;
  
  axios.post('http://server-auction:5000/', postData)
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
  
  axios.post('http://server-user:6000/login', postData)
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
  
  axios.post('http://server-user:6000/register', postData)
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
  
  axios.post('http://server-user:6000/settings', postData)
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
  
  axios.post('http://server-auction:5000/myoffers', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});

//---------------- myauctions page ------------------------
app.post("/myauctions", (req, res) => {
  const postData = req.body;
  
  axios.post('http://server-auction:5000/myauctions', postData)
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
  
  axios.post('http://server-auction:5000/auction', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});

//---------------- offer management ------------------------
app.post("/offer", (req, res) => {
  const postData = req.body;
  
  axios.post('http://server-auction:5000/offer', postData)
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
  
  axios.post('http://server-auction:5000/searchresults', postData)
    .then(response => {
      console.log('Server Response:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Error during POST:', error);
    });
});

//---------------- create auctions ------------------------
app.post("/createauctions", upload.single('image'), (req, res) => {
  const postData = req.body;
  const imageData = req.file.buffer;

  //const imageBlob = blobUtil.createBlob([imageData.buffer], { type: imageData.mimetype });

  // Creare un oggetto FormData
  const formData = new FormData();
  formData.append('postData', JSON.stringify(postData)); // Aggiungere i dati del post
  //formData.append('image', imageBlob, imageData.originalname);  
  formData.append('image', JSON.stringify(imageData));  

  //console.log("QQQQQQ "+JSON.stringify(formData));  


  formData.headers = {
    'Content-Type': 'multipart/form-data'
  };

  /*for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }*/
  
  axios.post('http://server-auction:5000/createauctions', formData)
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
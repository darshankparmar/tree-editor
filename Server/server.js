const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require('./controllers/authController');
const documentRoutes = require('./controllers/documentController');
const presenceRoutes = require('./controllers/presenceController');
const db = require('./config/db');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Use routes
app.use('/auth', authRoutes);
app.use('/document', documentRoutes);
app.use('/presence', presenceRoutes);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

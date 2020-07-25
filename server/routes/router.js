const express = require('express');
const router = express.Router();
const path = require('path');

express.static(path.join(__dirname, 'build'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// router.get('/', (req, res) => {
//     res.send({ response: "Server is up and running."}).status(200);
// });

module.exports = router;
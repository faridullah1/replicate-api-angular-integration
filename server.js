const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(compression());
app.use(cors({ 'origin': 'https://api.replicate.com', credentials: true }))
app.use(express.static(__dirname + '/dist/replicate-api-demo'));

app.get('/*', (req, res) => {    
	res.sendFile(path.join(__dirname+'/dist/replicate-api-demo/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
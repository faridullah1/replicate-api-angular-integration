const path = require('path');
const superAgent = require('superagent');
const express = require('express');
const compression = require('compression');
const app = express();

app.use(express.json());
app.use(compression());
app.use(express.static(__dirname + '/dist/replicate-api-demo'));

app.post('/v1/predictions', async (req, res) => {
	const input = req.body.input;

	try {
		const resp = await superAgent
		.post('https://api.replicate.com/v1/predictions')
		.send({ version: process.env.REPLICATE_API_VERSION, input })
		.set('Authorization', `Token ${process.env.REPLICATE_API_TOKEN}`);
	
		res.status(200).send(resp.body);
	}
	catch(err) {
		res.status(500).send(err);
	}
});

app.get('/v1/predictions/:id', async (req, res) => {
	try {
		const predictionId = req.params.id;

		const resp = await superAgent
			.get('https://api.replicate.com/v1/predictions/' + predictionId)
			.set('Authorization', `Token ${process.env.REPLICATE_API_TOKEN}`);
		
		res.status(200).send(resp.body);
	}
	catch(err) {
		res.status(500).send(err);
	}
});

app.get('/*', (req, res) => {    
	res.sendFile(path.join(__dirname+'/dist/replicate-api-demo/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});
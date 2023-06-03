const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = `pat-na1-3e82de44-77a4-4258-939d-1c63c195c1b5`;

app.get('/', async (req, res) => {
    const contacts = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contacts, { headers });
        res.json(response.data.results);    
    } catch (error) {
        console.error(error);
    }
});

const propertySummary = [{
    "name": "linkedinsumary",
    "label": "Linkedin Summary",
    "description": "User linkedin summar",
    "groupName": "contactinformation",
    "type": "string",
    "fieldType": "text",
    "formField": true,
    "displayOrder": 6,
    "options": [
      
    ]
  }]

app.post('/', async (req, res) => {
    const contacts = 'https://api.hubapi.com/properties/v1/contacts/properties';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contacts, { headers });
        //res.json(response.data.results);  
        res.send('New contact tab' + propertySummary)  
    } catch (error) {
        console.error(error);
    }
});

const key = '78qvfqq2pafeuw';
const secret = '7taQunRLaFO2O8vw';

// Call the API

fetch('https://www.linkedin.com/oauth/v2/accessToken', {
	method: 'POST',
	body: 'grant_type=client_credentials' + '&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});

app.post('/', async (req, res) => {
    const contacts = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contacts, { headers });
        //res.json(response.data.results);  
        res.send('New contact tab' + propertySummary)  
    } catch (error) {
        console.error(error);
    }
});

app.listen(4000, () => console.log('Listening on http://localhost:4000'));
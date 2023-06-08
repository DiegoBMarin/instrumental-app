const express = require('express');
const axios = require('axios');
const { render } = require('pug/lib');

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PRIVATE_APP_ACCESS = "pat-na1-3e82de44-77a4-4258-939d-1c63c195c1b5";

app.get('/contacts', async (req, res) => {

    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });
    } catch (error) {
        console.error(error);
    }

});

app.get('/update', async (req, res) => {

    const email = req.query.email;

    const getContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email&properties=email,linkedinsumary`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getContact, { headers });
        const data = response.data;

        //res.json(data);
        res.render('update', {userEmail: data.properties.email, linkedinSummary: data.properties.linkedinsumary});
        
    } catch(err) {
        console.error(err);
    }
});

app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "linkedinsumary": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }});

app.post('/create', async (req, res) => {
    const create = {
        "name": "newcustomproperty",
        "label": "A New Custom Property",
        "description": "A new property for you",
        "groupName": "contactinformation",
        "type": "string",
        "fieldType": "text",
        "formField": true,
        "displayOrder": 6,
        "options": [
          
        ]
      }

    const createProperty = `https://api.hubapi.com/properties/v1/contacts/properties`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(createProperty, create, { headers } );
        res.render('create')
    } catch(err) {
        console.error(err);
    }});



app.listen(3000, () => console.log('Listening on http://localhost:3000'));
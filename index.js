const express = require('express');
const axios = require('axios');
const app = express();

const PRIVATE_APP_ACCESS = `pat-na1-3e82de44-77a4-4258-939d-1c63c195c1b5`;


const propertySummary = [
{
    "name": "linkedinsummary",
    "label": "Linkedin Summary",
    "description": "User linkedin summary",
    "groupName": "contactinformation",
    "type": "string",
    "fieldType": "text",
    "formField": true,
    "displayOrder": 6,
    "options": [
      
    ]
  },
{
    "name": "linkedinrole",
    "label": "Linkedin Role",
    "description": "User linkedin Role",
    "groupName": "contactinformation",
    "type": "string",
    "fieldType": "text",
    "formField": true,
    "displayOrder": 7,
    "options": [
      
    ]
  },
  {
    "name": "linkedinLocation",
    "label": "Linkedin Location",
    "description": "User linkedin Location",
    "groupName": "contactinformation",
    "type": "string",
    "fieldType": "text",
    "formField": true,
    "displayOrder": 8,
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
        res.send(propertySummary)  
    } catch (error) {
        console.error(error);
    }
});

const key = '78qvfqq2pafeuw';
const secret = '7taQunRLaFO2O8vw';

addEventListener("fetch", (event) => {
    event.respondWith(
      handleRequest(event.request).catch(
        (err) => new Response(err.stack, { status: 500 })
      )
    );
  });
  
  
   function handleRequest(request) {
    const { pathname } = new URL(request.url);
  
    if (pathname.startsWith("/api")) {
      return new Response(JSON.stringify({ pathname }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  
    if (pathname.startsWith("/status")) {
      const httpStatusCode = Number(pathname.split("/")[2]);
  
      return Number.isInteger(httpStatusCode)
        ? fetch("https://http.cat/" + httpStatusCode)
        : new Response("That's not a valid HTTP status code.");
    }
  
    return fetch("https://linkedin-profile-data-fetch-without-api.pages.dev");
  }

const linkedinInfo = [
{
  "properties": [
    {
      "property": "linkedinsummary",
      "value": `"${linkedinSummary}"`
    },
    {
      "property": "linkedinrole",
      "value": `"${linkedinRole}"`
    },
    {
      "property": "linkedinLocation",
      "value": `"${linkedinLocation}"`
    }
  ]
}
]


app.get('/', async (req, res) => {
    const contacts = 'https://api.hubapi.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(contacts, { headers });
        res.json(response.data.results); 
        res.send(linkedinInfo)   
    } catch (error) {
        console.error(error);
    }
});


app.listen(4000, () => console.log('Listening on http://localhost:4000'));

const qs = require('querystring');
const axios = require('axios');

const Authorization = () => 
{

return encodeURI(`https://www.linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_type=code&scope=${process.env.SCOPE}&redirect_uri=${process.env.REDIRECT_URI}`);

}

const Redirect= async(code)=>
{
    const payLoad = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        client_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code',
        code: code
    }

    const {data} = await axios({
        url: `https://www.linkedin.com/oauth/v2/accessToken?${qs.stringify(payLoad)}`,
        method: 'POST',
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        }
    }).then( response => {
        return response;
    }).catch(error => {
        return error;
    });
   
    return data

    console.log('Test' + 'https://api.linkedin.com/v2/me')
}

module.exports={
    Authorization,
    Redirect
}
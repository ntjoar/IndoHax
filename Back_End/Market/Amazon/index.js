const axios = require('axios').default;

const AXESSO_AMAZON_DATA_SERVICE_URL = "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/amz/amazon-lookup-product";

const AXESSO_REQUEST_HEADERS = {
	"x-rapidapi-host": "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
	"x-rapidapi-key": "28b3733bb5msh75a33c4770c384ap1a712fjsn6032ef9f9b3f",
	"useQueryString": true
}

axios.get(AXESSO_AMAZON_DATA_SERVICE_URL)
    .then(response => {
        console.log(response.data.url);
        console.log(response.data.explanation);
    })
    .catch(error => {
        console.log(error);
    })
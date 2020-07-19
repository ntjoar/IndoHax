const https = require('https');
const { isIPv4 } = require('net');
const { stringify } = require('querystring');

var nameArr = []
var linkArr = []
var priceArr = []

https.get('https://www.walmart.com/search/?query=chicken', (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        // TODO: Edit this variable
        var ulStart = data.indexOf('<ul class="search-result-gridview-items four-items" data-automation-id="search-result-gridview-items">')
        var i = 0
        while(i < 10) {
            var objInitId = ulStart + data.substr(ulStart).indexOf('<li class="Grid-col')
            var objEndId = objInitId + data.substr(objInitId).indexOf('</li>')

            // Get name
            var prodId = objInitId + data.substr(objInitId).indexOf('Product Title')
            var nameId = prodId + data.substr(prodId).indexOf('<span>') + 6
            var nameLen = data.substr(nameId).indexOf('</span>')
            var checkNameLen = data.substr(nameId).indexOf('"')
            var minNameLen = -1
            if(checkNameLen < nameLen) {
                minNameLen = checkNameLen
            } else {
                minNameLen = nameLen
            }
            var tempName = data.substr(nameId, minNameLen)
            name = tempName.replace(/(<([^>]+)>)/ig,"")
            nameArr.push(name)

            // Get link
            var linkId = objInitId + data.substr(objInitId).indexOf('<a href="/ip/') + 9
            var linkLen = data.substr(linkId).indexOf('"')
            var tempLink = 'https://walmart.com' + data.substr(linkId, linkLen)
            var link = tempLink.replace(/(<([^>]+)>)/ig,"")
            linkArr.push(link)

            // Get Price
            var curPricePos = objInitId + data.substr(objInitId).indexOf('Current Price')
            var price = curPricePos + data.substr(curPricePos).indexOf('$') + 1
            var priceLen = data.substr(price).indexOf('"')
            var checkPriceLen = data.substr(price).indexOf('<')
            var minPriceLen = -1
            if(checkPriceLen < priceLen) {
                minPriceLen = checkPriceLen
            } else {
                minPriceLen = priceLen
            }
            var tempFinalPrice = data.substr(price, minPriceLen)
            var finalPrice = tempFinalPrice.replace(/(<([^>]+)>)/ig,"")
            priceArr.push(finalPrice)

            ulStart = objEndId
            i += 1
        }

        var jsonStr = ''

        for (i = 0; i < 10; i++) { 
            jsonStr = '{' + '"name" : "' + nameArr[i] + '" , ' + '"price" : "' + priceArr[i] + '" , ' + '"link" : "' + linkArr[i] + '"}'
            var obj =  JSON.parse(jsonStr)
        }

        // console.log(jsonStr)
    });



}).on("error", (err) => {
    console.log("Error: " + err.message);
});
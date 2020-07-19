const Market = require('../../model/Market');
const Item = require('../../model/Item');
const axios = require('axios');

async function getReq (query) {
    var itemArr = []

    const response = await axios.get('https://www.walmart.com/search/?query=' + query)
    var data = response.data
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

        // Get link
        var linkId = objInitId + data.substr(objInitId).indexOf('<a href="/ip/') + 9
        var linkLen = data.substr(linkId).indexOf('"')
        var tempLink = 'https://walmart.com' + data.substr(linkId, linkLen)
        var link = tempLink.replace(/(<([^>]+)>)/ig,"")

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

        ulStart = objEndId
        i += 1
        itemArr.push(new Item(name, link, finalPrice))
    }
    return itemArr
}

module.exports = {
    search: async function(query) {
        //TODO(ntjoar): Implement for Walmart
        let items = await getReq(query)
        return new Market('Walmart', 'www.walmart.com', items);
    }
}


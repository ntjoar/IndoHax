const Market = require('../../model/Market');

module.exports = {
    search: async function(query) {
        //TODO(ntjoar): Implement for Walmart
        return new Market('Walmart', 'www.walmart.com', []);
    }
}

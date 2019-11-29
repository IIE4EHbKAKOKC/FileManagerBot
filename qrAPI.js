const fetch = require('node-fetch');
getQrCode = (data) => {
    return 'http://api.qrserver.com/v1/create-qr-code/?data=' + data + '&size=200x200';
}

module.exports = {
    getQrCode
}
let request = require('request');

request('https://toidicode.com', function (err, res, body) {
    //nếu có lỗi
    if (err)
        throw err;
    //in ra header
    console.log(res);
    //in ra body nhận được
    console.log(body);
})
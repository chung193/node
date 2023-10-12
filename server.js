var http = require('http');
var fs = require('fs');
var url = require('url');

var website = "http://toidicode.com?a=5";
//parse chuỗi sang url
var parse = url.parse(website, true);
//hiển thị host
console.log('auth: ' + parse.auth);
console.log('hash: ' + parse.hash);
console.log('host: ' + parse.host);
console.log('hostname: ' + parse.hostname);
console.log('href: ' + parse.href);
console.log('path: ' + parse.path);
console.log('pathname: ' + parse.pathname);
console.log('port: ' + parse.port);
console.log('protocol: ' + parse.protocol);
console.log('query: ' + parse.query.a);
console.log('search: ' + parse.search);
console.log('slashes: ' + parse.slashes);

var content = 'Nội dung này tôi muốn ghi vào file writer.html';

http.createServer(function (req, res) {
    //định dang response head trả về
    res.writeHead('200', { 'content-type': 'text/html' });
    //đọc file code.html encode utf8
    fs.readFile('code.html', 'utf8', function (err, data) {
        if (err) throw err;
        // in ra nội dung đọc được
        res.write(data);
        //kết thúc response
        res.end();
    });

    fs.writeFile('write.html', content, 'utf8', (err) => {
        if (err)
            throw err;
        else
            console.log('ghi file thanh cong');
    })

}).listen(8000);


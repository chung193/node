var http = require('http');
var fs = require('fs');
var formidable = require('formidable');
var nodemailer = require('nodemailer');

//Require module event
var event = require('events');
//Khởi tạo đối tượng eventEmitter
var eventEmitter = new event.EventEmitter();
var connectionHandle = function () {
    console.log('connection successful');
}
eventEmitter.on('connection', connectionHandle);
eventEmitter.emit('connection');

http.createServer(function (req, res) {
    //code
    if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
        //Khởi tạo form
        var form = new formidable.IncomingForm();
        //Thiết lập thư mục chứa file trên server
        form.uploadDir = "uploads/";
        //xử lý upload
        form.parse(req, function (err, fields, file) {
            //path tmp trên server
            // console.log(err);
            // console.log(fields);
            // console.log(file);
            console.log(file.files[0]);
            var fileInfo = file.files[0];
            
            //thiết lập path mới cho file
            var newpath = form.uploadDir + fileInfo.originalFilename;
            fs.rename(fileInfo.filepath, newpath, function (err) {
                if (err) throw err;
                res.end('Upload Thanh cong!');
            });
        });
        return;
    }

    res.writeHead('200', {'Content-Type': 'text/html'});
    fs.readFile('index.html', 'utf8', function (err, data) {
        //nếu nỗi thì thông báo
        if (err) throw err;
        //không lỗi thì render data
        res.end(data);
    })
}).listen(8000);

const option = {
    service: 'gmail',
    auth: {
        user: 'chungvd.it@gmail.com', // email hoặc username
        pass: 'apmr mufd skot gyio' // password
    }
};
var transporter = nodemailer.createTransport(option);

transporter.verify(function(error, success) {
    // Nếu có lỗi.
    if (error) {
        console.log(error);
    } else { //Nếu thành công.
        console.log('Kết nối thành công!');
    }
});

var mail = {
    from: 'chungvd.it@gmail.com', // Địa chỉ email của người gửi
    to: 'chunghello193@gmail.com', // Địa chỉ email của người gửi
    subject: 'Thư được gửi bằng Node.js', // Tiêu đề mail
    text: 'Toidicode.com', // Nội dung mail dạng text
    html: '<h1>Toidicode.com</h1>' // Nội dung mail dạng html
};
//Tiến hành gửi email
transporter.sendMail(mail, function(error, info) {
    if (error) { // nếu có lỗi
        console.log(error);
    } else { //nếu thành công
        console.log('Email sent: ' + info.response);
    }
});
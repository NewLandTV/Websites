// 모듈 가져오기
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const url = require('url');

// 데이터베이스 구성 파일 가져오기
const db_config = require(__dirname + '/config/database.js');
const app = express();
const conn = db_config.init();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get 요청 처리
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signup.html'));
});

app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/signin.html'));
});

app.get('/accounts', (req, res) => {
    conn.query('SELECT * FROM `account`', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
        res.end();
    });
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/search.html'));
    console.log(url.parse(req.url, true).query);
});

// post 요청 처리
app.post('/signup', (req, res) => {
    console.log(req.body);
    res.send("<h1>Try Signup.</h1>");
    conn.query(`INSERT INTO account(user_id, user_pw, user_price, user_name, user_status) VALUES(\'${req.body.id}\', \'${req.body.password}\', 0, \'name\', 1);`);
});

app.post('/signin', (req, res) => {
    console.log(req.body);
    res.send("<h1>Try Signin.</h1>");
    console.log(conn.query(`SELECT user_id, user_pw FROM account WHERE user_id = \'${req.body.id}\' AND user_pw = \'${req.body.password}\'`));
});

// 404 에러 처리
app.use((req, res, next) => {
    res.status(404).send('404 Not Found...');
    res.writeHead(404, { "Content-Type" : "text/plain" });
    res.write("404 Error!");
    res.end();
});

// 서버 열기
app.listen(8002, () => {
    console.log('server started on 8002 port!');
});
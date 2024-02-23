const mysql = require('mysql');

let db_info = {
    host : '127.0.0.1',
    port : '3306',
    user : 'root',
    password : 'mysqlpassword_wodud0318!',
    database : 'newland'
}

module.exports = {
    init: function() {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if (err) console.error('mysql connection error : ' + err);
            else console.log('mysql is connected successfully!');
        });
    }
}
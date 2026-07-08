const bcrypt = require('bcrypt');
const mysqldb = require('../models/mysqldb');
const jwt = require('jsonwebtoken');
module.exports = {
    getAll: (req, res) => {
        const sql = 'SELECT * FROM t_user';

        mysqldb.query(sql, (error, results) => {
            if (error == null) {
                console.log(results);
                return res.status(200).json(results);
            } else {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    },

    getById: (req, res)=> {
        const userID = req.params.id;
        const sql = `SELECT * FROM t_user WHERE userID=${userID}`;
        mysqldb.query(sql, (error, results) => {
            if (error == null) {
                console.log(results);
                return res.status(200).json(results);
            } else {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    },

    add: (req, res) => {
        const data = req.body;
        const arr = Object.keys(data);
        let keys = '';
        let values = '';
        let sql = `SELECT * FROM t_user WHERE email='${data.email}'`;
        mysqldb.query(sql, (error, results) => {
            if (error != null) {
                console.log(error);
                return res.status(500).json(error);
            } else if (results.length > 0) {
                return res.status(200).json({ msg: 'User already exists' }); // המשתמש כבר קיים
            }

            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === 'pass') {
                    const hashPass = bcrypt.hash(data[arr[i]], 10);
                    keys += `${arr[i]},`;
                    values += `'${hashPass}',`;}
                    else {
                    keys += `${arr[i]},`;
                    values += `'${data[arr[i]]}',`;
                }
            }

            keys = keys.substring(0, keys.length - 1);
            values = values.substring(0, values.length - 1);
            sql = `INSERT INTO t_user (${keys}) VALUES (${values})`;

            mysqldb.query(sql, (error, results) => {
                if (error == null) {
                    console.log(results);
                    return res.status(200).json(results);
                } else {
                    console.log(error);
                    return res.status(500).json(error);
                }
            });
        });
    },

    update: (req, res) => {
        const userID = req.params.id;
        let sql = 'UPDATE t_user SET ';
        const data = req.body;
        const arr = Object.keys(data);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == 'pass') {
                const pass = data[arr[i]];
                const hashPass = bcrypt.hashSync(pass, 10);
                sql += `${arr[i]}='${hashPass}',`;
            }
            else {
                sql += `${arr[i]}='${data[arr[i]]}',`;
            }
        }
        sql = sql.substring(0, sql.length - 1);
        sql += ` WHERE userID=${userID}`;

        mysqldb.query(sql, (error, results) => {
            if (error == null) {
                console.log(results);
                return res.status(200).json(results);
            } else {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    },

    delete: (req, res) => {
        const userID = req.params.id;
        const sql = `DELETE FROM t_user WHERE userID=${userID}`;

        mysqldb.query(sql, (error, results) => {
            if (error == null) {
                console.log(results);
                return res.status(200).json(results);
            } else {
                console.log(error);
                return res.status(500).json(error);
            }
        });
    },

    login: (req, res) => {
        const data = req.body;

        let sql = `SELECT * FROM t_user WHERE email='${data.email}'`;
        mysqldb.query(sql, (error, results) => {
            if (error != null) {
                console.log(error);
                return res.status(500).json({ status: false, error: error.message, data: [] });
            }
            else if (results.length == 0)// המשתמש שנרשם לא קיים
            {
                return res.status(200).json({ status: false, error: null, data: [] });
            }
            else {
                let user = results[0];
                bcrypt.compare(data.pass, user.pass, (err, same) => {
                    if (err != null) {
                        console.log(err);
                        return res.status(500).json({ status: false, error: err.message, data: [] });
                    }
                    if (same == true) {
                        const token = jwt.sign({ userID: user.userID, email: user.email }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
                        return res.status(200).json({ status: true, error: null, data: user, token: token });
                    }
                    else {
                        return res.status(200).json({ status: false, error: null, data: [] });
                    }
                });
            }
        });
    }

};
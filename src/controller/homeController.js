import pool from '../config/connectDB'

let getHomePage = async (req, res) => {
    let data = [];
    // cach nay dai
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function async (err, results, fields) {
    //         results.map((row) => {`
    //             data.push({
    //                 id: row.id,
    //                 email: row.email,
    //                 address: row.address,
    //                 firstName: row.firstName,
    //                 lastName: row.lastName
    //             })
    //         });
    //         return res.render('index.ejs', { dataUser: data });
    //     })

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', { dataUser: rows });
}

let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` WHERE `id` = ?', [userId])
    return res.send(JSON.stringify(user[0]))
}

// SQL insert in w3s
// INSERT INTO table_name (column1, column2, column3, ...)
// VALUES (value1, value2, value3, ...);

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    // Cái trên là viết tắt của      let firstName = req.body.firstName ;
    await pool.execute('INSERT INTO users(firstName, lastName, email , address) VALUES(?,?,?,?)',
        [firstName, lastName, email, address])

    return res.redirect("/")     // render lại về trang chủ "/"
}


//DELETE FROM table_name WHERE condition;
let deleteUser = async (req, res) => {
    let userId = req.body.userId
    await pool.execute('DELETE FROM users WHERE id = ?', [userId])
    return res.redirect("/")
}
module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser
}
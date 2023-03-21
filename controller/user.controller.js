const db = require('../db')
class UserController {
    async createUser(req, res) {
        const {user_name, email, password} = req.body
        const newUser = await db.query(`INSERT INTO users (user_name, email, password) values ($1, $2, $3) RETURNING *`, [user_name, email, password])
        console.log(user_name, email, password)
        res.json(newUser.rows[0])
    }

    async getUser(req, res) {

    }

    async updateUser(req, res) {
        const {user_id, user_name, email, password} = req.body
        const user = await db.query(`UPDATE users set user_name = $1, email = $2, password = $3 where user_id = $4 RETURNING *`, [user_name, email, password, user_id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {

    }
}

module.exports = new UserController()
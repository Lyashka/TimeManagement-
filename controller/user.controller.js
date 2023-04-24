const db = require('../db')
class UserController {
    async createUser(req, res) {
        const {user_name, email, password} = req.body
        const newUser = await db.query(`INSERT INTO users (user_name, email, password) values ($1, $2, $3) RETURNING *`, [user_name, email, password])
        console.log(user_name, email, password)
        res.json(newUser.rows[0])
    }

    async getUser(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        const {email, password} = req.query

        const user = await db.query(`SELECT DISTINCT * FROM users
        WHERE  users.email = $1 and users.password = $2 `, [email, password])
        
        const to_do_list = await db.query(`SELECT DISTINCT to_do_list_id, date_start, list_name FROM users
        JOIN to_do_list ON users.user_id = to_do_list.user_id
        WHERE  users.email = $1 and users.password = $2`, [email, password])

        const content = await db.query(`SELECT DISTINCT case_content_id, content, completed_status, date_completed, id FROM case_content
        JOIN to_do_list ON case_content.case_content_id = to_do_list.to_do_list_id
        JOIN users ON users.user_id = to_do_list.user_id
        WHERE  users.email = $1 and users.password = $2`, [email, password])
        
    
        if (user.rows[0]) {
            user.rows[0]['to_do_list'] = to_do_list.rows;
            user.rows[0].to_do_list.forEach((e) => {
                e['content'] = []
            })
            content.rows.forEach((item) => {
                user.rows[0].to_do_list.forEach((e) => {
                    if (e.to_do_list_id == item.case_content_id) {
                        e.content.push(item)
                    }
                })
      
            })
        }
        
        
        

        
        // console.log(JSON.stringify(user.rows[0]));
        res.json(user.rows[0])

        
    }

    async updateUser(req, res) {
        const {user_id, user_name, email, password} = req.body
        const user = await db.query(`UPDATE users set user_name = $1, email = $2, password = $3 where user_id = $4 RETURNING *`, [user_name, email, password, user_id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE FROM users WHERE user_id = $1`, [id])
        res.json(user.rows[0])
    }

    async createToDoList(req, res) {
        const {date_start, list_name, user_id} = req.body
        const new_to_do_list = await db.query(`INSERT INTO to_do_list(date_start, list_name, user_id)
        VALUES($1, $2, $3 )`, [date_start, list_name, user_id])
        res.json(new_to_do_list.rows[0])
    }

    async updateToDoList(req, res) {
        const {date_start, list_name, user_id, to_do_list_id} = req.body
        const user = await db.query(`UPDATE to_do_list set date_start = $1, list_name = $2, user_id = $3 where to_do_list_id = $4 RETURNING *`, [date_start, list_name, user_id, to_do_list_id])
        res.json(user.rows[0])
    }
 
    async createContent(req, res) {
        const {case_content_id, content, completed_status, date_completed} = req.body
        const new_content = await db.query(`INSERT INTO case_content(case_content_id, content, completed_status, date_completed)
        VALUES($1, $2, $3, $4)`, [case_content_id, content, completed_status, date_completed])
        res.json(new_content.rows[0])
    }

    async updateContent(req, res) {
        const {content, completed_status, id} = req.body
        const updateContent = await db.query(`UPDATE case_content
        set content = $1, completed_status = $2 where id = $3`, [content, completed_status, id])
        res.json(updateContent.rows[0])
    }

    async createPurpose(req, res) {

    }

    async updatePurpose(req, res) {

    }
}

module.exports = new UserController()
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const userRouter = require('./routes/user.routes')
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use('/api', userRouter)



app.listen(PORT, () => console.log(`server start on PORT ${PORT}...`))


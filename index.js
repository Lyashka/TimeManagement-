const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()
const userRouter = require('./routes/user.routes')
app.use(express.json())
app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server start on PORT ${PORT}...`))
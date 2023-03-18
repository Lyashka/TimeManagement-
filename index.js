const express = require('express')

const PORT = process.env.PORT || 8080

const app = express()

app.get('/', (req, res) => {
    res.send('HELLO PG + NDJS')
})



app.listen(PORT, () => console.log(`server start on PORT ${PORT}...`))
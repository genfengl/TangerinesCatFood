const express = require('express')


const app = express()
const PORT = 3999


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})


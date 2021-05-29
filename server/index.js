import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import postRouter from './routers/posts.js'

const app = express()

app.use('/posts', postRouter)

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

app.use(cors())

const CONNECTION_URL = 'mongodb+srv://pavel:pavel123@cluster0.3gw8z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
    })
    .catch((error) => console.log(error.message))
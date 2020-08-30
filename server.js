const server = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


dotenv.config({ path: './config.env' })
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to database')
})
server.listen(7000, () => {
    console.log("Starting")
})
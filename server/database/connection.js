const mongoose = require('mongoose')
 
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.URL, {
            useNewURLParser: true,
            useUnifiedTopology: true,
        })

        console.log('connected to mongodb' + connection.connection.host)
    } catch(err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB
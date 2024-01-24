const mongoose = require('mongoose')
const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/react_razorpay')
        .then(() => console.log('MongoDB connected')).catch(
            err => console.log(err)
        )
}

module.exports = connectDB
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./db.config')
const OrderModel = require('./models/Order.model')
const Razorpay = require('razorpay')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

connectDB()


app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))





app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/payment/checkout', async (req, res) => {
    const { name, amount } = req.body

    const order = await razorpay.orders.create(
        {
            amount: Number(amount * 100),
            currency: "INR"
        }
    )

    await OrderModel.create({
        order_id: order.id,
        name: name,
        amount: amount,
    })


    console.log({ order })
    res.json({ order })

})


app.post('/payment/payment-verification', async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body_data = razorpay_order_id + ' ' + razorpay_payment_id;

    const expect = crypto.createHmac('sha256', 'l946KF9kpEW2deQS0q625rIP').update(body_data).digest('hex');

    const isValid = expect === razorpay_signature;

    try {
        const updatedDocument = await OrderModel.findOneAndUpdate(
            { order_id: razorpay_order_id },
            {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                razorpay_signature: razorpay_signature,
            },
            { new: true }
        );

        console.log('Updated Document:', updatedDocument);
        res.redirect('http://localhost:5173/success?razorpay_payment_id=' + razorpay_payment_id);
    } catch (error) {
        console.error('Error updating document:', error);
        res.redirect('http://localhost:5173/failed');
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
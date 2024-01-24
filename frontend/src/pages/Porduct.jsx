import React from 'react';
import Card from '../component/Card';
import productData from '../Api/product.json'
import axios from 'axios'

const Porduct = () => {

  const checkOutHandler = async ({ name, amount }) => {
    const { data: { order } } = await axios.post('http://localhost:3000/payment/checkout', {
      name,
      amount
    })
    var options = {
      "key": process.env.REACT_APP_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": order.currency,
      "name": "Avinash kumar",
      "description": "Test Transaction",
      "image": "https://images.unsplash.com/photo-1682687221006-b7fd60cf9dd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": "http://localhost:3000/payment/payment-verification",
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "+916239378916"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">


          {
            productData.map((c, i) => {
              return <Card key={i} image={c.image} title={c.title} price={c.price} onCheckout={checkOutHandler} />
            })
          }


        </div>
      </div>
    </section>
  );
};

export default Porduct;

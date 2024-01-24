import React from 'react';
import { useSearchParams } from 'react-router-dom';

const Success = () => {
  const [query] = useSearchParams();
  const paymentId = query.get('razorpay_payment_id');

  return (
    <div className="min-h-screen flex justify-center items-center flex-col text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-500">Payment Successful!</h1>
      {paymentId && (
        <>
          <p className="text-xl mb-4">Your payment ID: {paymentId}</p>
          <img
            src="https://i.pinimg.com/736x/7b/dd/1b/7bdd1bc7db7fd48025d4e39a0e2f0fd8.jpg" // Replace with the URL of your attractive success image
            alt="Success Image"
            className="max-w-full h-auto mb-8 img"
          />
          <p className="text-lg">
            Thank you for your payment! Your order has been successfully processed.
          </p>
        </>
      )}
    </div>
  );
};

export default Success;

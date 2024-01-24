import React from 'react';

const Failed = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl font-bold text-red-500">Payment Failed</h1>
      <img
        src="https://img.freepik.com/premium-vector/red-cross-sign-vector-icon_547110-441.jpg?w=740" // Replace with the URL of your failed image
        alt="Failed Image"
        className="max-w-full h-auto mt-8 mb-4 img"
      />
      <p className="text-lg">
        Oops! It seems like there was an issue processing your payment. Please try again later.
      </p>
    </div>
  );
};

export default Failed;

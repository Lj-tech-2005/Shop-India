export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-gray-700 mb-6">
        Your payment could not be completed. Please try again or use a different payment method.
      </p>
      <a href="/checkout" className="bg-teal-500 text-white px-6 py-3 rounded hover:bg-teal-600">
        Try Again
      </a>
    </div>
  );
}

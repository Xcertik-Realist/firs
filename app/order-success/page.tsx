export default function OrderSuccess() {
  return (
    <div className="max-w-4xl mx-auto py-32 text-center px-4">
      <h1 className="text-6xl font-bold text-green-900 mb-8">Thank You!</h1>
      <p className="text-3xl mb-8">Your order is confirmed. We’ll email you when it ships.</p>
      <a href="/" className="text-2xl text-green-700 underline">← Continue Shopping</a>
    </div>
  );
}

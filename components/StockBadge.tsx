export default function StockBadge({ inStock }: { inStock: boolean }) {
  if (inStock)
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        In Stock
      </span>
    );

  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
      Sold Out
    </span>
  );
}

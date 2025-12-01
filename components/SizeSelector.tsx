"use client";

export default function SizeSelector({ variants, selected, onSelect }: any) {
  return (
    <div>
      <label className="text-lg font-semibold text-gray-700">Select Height</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {variants.map((v: any) => (
          <button
            key={v.sku}
            onClick={() => onSelect(v)}
            disabled={!v.inStock}
            className={`py-4 px-6 rounded-lg border-2 font-medium transition ${
              selected.sku === v.sku
                ? "border-green-700 bg-green-50 text-green-900"
                : v.inStock
                ? "border-gray-300 hover:border-green-500"
                : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {v.height}
            <br />
            <span className="text-sm">£{v.price.toFixed(2)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

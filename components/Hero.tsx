import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen">
      <Image
        src="https://images.unsplash.com/photo-1543589077-855d2f72523b?w=1920&h=1080&fit=crop"
        alt="Premium real Christmas tree"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative h-full flex items-center justify-center text-center text-white px-4">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Premium Scandinavian<br />Christmas Trees
          </h1>
          <p className="text-2xl md:text-4xl mb-8 drop-shadow-lg">
            Fresh from the forest · Delivered to your door
          </p>
          <p className="text-3xl font-bold text-yellow-300 drop-shadow-lg">
            Shipping starts 1st December
          </p>
        </div>
      </div>
    </section>
  );
}

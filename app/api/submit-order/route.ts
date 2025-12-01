import { encrypt } from "@/lib/encryption";
import { useCartStore } from "@/lib/store";

export async function POST(req: Request) {
  const order = await req.json();
  order.orderId = `SF${Date.now().toString(36).toUpperCase()}`;
  order.timestamp = new Date().toISOString();

  const encrypted = encrypt(order);

  // Local encrypted backup
  try {
    require("fs").appendFileSync("private/salesman.txt", `${order.orderId} ${encrypted}\n`);
  } catch (e) {
    console.log("Local backup skipped (normal in Vercel)");
  }

  // Send to Cloudflare → Telegram
  await fetch("https://scandinavianfirs-orders.pages.dev/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": process.env.CF_AUTH!,
    },
    body: JSON.stringify({ encrypted, orderId: order.orderId }),
  });

  return Response.json({ success: true });
}

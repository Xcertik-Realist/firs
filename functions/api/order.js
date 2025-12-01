export const onRequestPost = async ({ request, env }) => {
  if (request.headers.get("X-Auth") !== env.CF_AUTH) return new Response("Forbidden", { status: 403 });

  const { encrypted, orderId } = await request.json();
  const data = Uint8Array.from(atob(encrypted), c => c.charCodeAt(0));
  const iv = data.slice(0, 12);
  const tag = data.slice(12, 28);
  const ciphertext = data.slice(28);

  const key = await crypto.subtle.importKey(
    "raw",
    Uint8Array.from(atob(env.SALES_ENCRYPT_KEY), c => c.charCodeAt(0)),
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv, tag }, key, ciphertext);
  const order = JSON.parse(new TextDecoder().decode(decrypted));

  const msg = `
*NEW ORDER* #${orderId}
${order.fullName} • ${order.email} • ${order.phone}
Delivery: ${order.deliveryDate}
${order.addressLine1}, ${order.townCity} ${order.postcode.toUpperCase()}

Trees:
${order.items.map(i => `• ${i.name} – ${i.selectedVariant.height} ×${i.quantity}`).join("\n")}

Total (on dispatch): £${order.getTotal?.toFixed(2) || "0.00"}
${order.discountCode ? `*Discount:* ${order.discountCode}` : ""}
  `.trim();

  await fetch(`https://api.telegram.org/bot${env.TG_BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TG_CHAT,
      text: msg,
      parse_mode: "Markdown"
    })
  });

  return new Response("OK");
};

export const onRequestPost = async ({ request, env }) => {
  // Security check – only your site can call this
  if (request.headers.get("X-Auth") !== env.CF_AUTH) {
    return new Response("Forbidden", { status: 403 });
  }

  const { encrypted, orderId } = await request.json();

  // Decrypt using your secret key (same as Vercel)
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

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv, tag },
    key,
    ciphertext
  );

  const order = JSON.parse(new TextDecoder().decode(decrypted));

  // Beautiful Telegram message
  const message = `
*NEW ORDER* #${orderId}

*Customer:* ${order.fullName}
*Email:* ${order.email}
*Phone:* ${order.phone}

*Delivery Address:*
${order.addressLine1}
${order.addressLine2 ? order.addressLine2 + "\n" : ""}${order.townCity}, ${order.postcode.toUpperCase()}

*Preferred Date:* ${order.deliveryDate || "Any"}

*Trees Ordered:*
${order.items.map(i => `• ${i.name} – ${i.selectedVariant.height} × ${i.quantity}`).join("\n")}

*Subtotal:* £${order.items.reduce((s, i) => s + i.selectedVariant.price * i.quantity, 0).toFixed(2)}
${order.discountCode ? `*Discount:* ${order.discountCode} applied\n` : ""}*Total (on dispatch):* £${order.getTotal?.toFixed(2) || "0.00"}

*Card ends:* ${order.cardNumber?.slice(-4) || "N/A"}
  `.trim();

  // Send to your private Telegram group/channel
  await fetch(`https://api.telegram.org/bot${env.TG_BOT}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: env.TG_CHAT,
      text: message,
      parse_mode: "Markdown",
    }),
  });

  return new Response("OK", { status: 200 });
};

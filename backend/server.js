// import express from "express";
// import fetch from "node-fetch";

// // Example: store access token securely (in production use DB or env vars)
// const SHOP_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
// const SHOP = process.env.SHOPIFY_SHOP; // e.g. "my-shop.myshopify.com"

// const app = express();
// app.use(express.json());

// // Endpoint that POS extension calls to log payout
// app.post("/api/payout", async (req, res) => {
//   try {
//     const { amount, reason, employee } = req.body;

//     // Example: store data in a metafield or a custom record system
//     const metafieldPayload = {
//       metafield: {
//         namespace: "cash_management",
//         key: `payout_${Date.now()}`,
//         type: "json",
//         value: JSON.stringify({ amount, reason, employee, createdAt: new Date() }),
//       },
//     };

//     const response = await fetch(`https://${SHOP}/admin/api/2024-07/metafields.json`, {
//       method: "POST",
//       headers: {
//         "X-Shopify-Access-Token": SHOP_ACCESS_TOKEN,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(metafieldPayload),
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to log payout: ${await response.text()}`);
//     }

//     const data = await response.json();
//     res.json({ success: true, metafield: data.metafield });
//   } catch (error) {
//     console.error("Error logging payout:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
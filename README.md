# NORIVA website starter

A responsive static storefront starter for NORIVA. It includes a product grid, shopping bag, delivery form, COD/prepaid choice, shipping calculation, and WhatsApp order handoff.

## Current configuration
- WhatsApp order number: `+91 7082207111` (configured in `app.js`)
- Shipping: ₹70
- Free shipping: orders of ₹699 or more
- Payments: COD or prepaid arranged manually on WhatsApp; no payment gateway is connected.

## Edit products
Open `products.js` and edit the `PRODUCTS` list. Each product has `id`, `name`, `description`, `price`, and optional `image`. Add image files to `assets/` and use paths such as `assets/your-product.jpg`.

## Publish free with GitHub Pages
1. Sign in to GitHub and create a new **Public** repository named `noriva-store`.
2. Upload all files in this folder (`index.html`, `style.css`, `products.js`, `app.js`, `README.md`, and `assets/`). Upload the files themselves, not the containing folder as a nested folder.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/(root)**, then click **Save**.
6. Wait for GitHub Pages to finish publishing. Your public address will look like `https://YOUR-GITHUB-USERNAME.github.io/noriva-store/`.

## Important limitations
This is a static storefront prototype. GitHub Pages does not run a private server. It does not provide a secure admin login, shared product database, or persistent admin order history. The WhatsApp handoff opens a pre-filled message; the customer must press Send. Orders are not saved to an owner dashboard by this static version.

For the production version, connect a backend/database (for example Supabase) and implement secure admin authentication, product management, and order records. Never put database service-role keys or admin passwords in frontend files.

## Before going live
- Replace sample product names, prices and descriptions with your actual catalogue.
- Add real product photographs.
- Confirm the shipping policy and free-shipping threshold are still correct.
- Add return, cancellation, privacy, shipping and contact information.
- Test the checkout flow on a phone and desktop.

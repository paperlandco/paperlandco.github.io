# Paper Land

Website for Paper Land, a design-led stationery brand: notebooks, planners and pocket notes. Designed in Adelaide, inspired by Saigon.

## Pages

| File | Page |
|---|---|
| `index.html` | Game entrance: pixel-art "Enter Paper Land" (first page visitors see) |
| `home.html` | Regular home page |
| `shop.html` | Shop all products, with filters and sorting |
| `product-<id>.html` | Product detail, one real page per product, e.g. `product-arvo.html` (old `product.html#arvo` links forward here) |
| `collections.html` | Saigon Mornings, Adelaide Arvo, Someday Studio |
| `about.html` | Our story |
| `blog.html` / `blog-<id>.html` | Blog list (category filter) and one page per post; old `journal-*.html` links redirect |
| `help.html` | FAQ, shipping, contact, stockists |

Shared files: `style.css` holds all styling. `app.js` holds the header, footer, cart and all product and journal data.

## Editing products

Products, prices and descriptions are in the `PRODUCTS` object at the top of `app.js`. Journal posts are in the `JOURNAL` object.

## SEO build

Every product and journal post has its own page so search engines and social apps can read it.
After changing `PRODUCTS` or `JOURNAL` in `app.js`, rebuild those pages:

```
pip install playwright && playwright install chromium
python3 tools/build.py            # product-*.html, journal-*.html, head tags, sitemap.xml
python3 tools/build.py --images   # also re-render the share images in img/og/
```

The build writes the description, canonical URL, Open Graph tags and structured data
(Product, Article, Breadcrumb) into each page. `sitemap.xml` lists every page; submit it in Google Search Console.

## Analytics

The Google tag in each page's `<head>` sends data to GA4. `app.js` and `play.js` send these events:
`view_item_list`, `select_item`, `view_item`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`,
`search`, `generate_lead`, `welcome_popup_view`, `welcome_popup_close`, `contact_form_submit`,
`game_start`, `game_guide_select`, `game_place_visit`, `game_quests_open`, `game_complete`, `game_skip`.
Campaign links keep their `utm_…` parameters when phones are forwarded from the game to the shop.

## Notes

This is a static site with no server. The cart is saved in the visitor's browser. The checkout, contact form and newsletter forms only show confirmation messages and do not send data.

## Shopify theme

`shopify-theme/` is the same site as a Shopify theme (Liquid). Products, prices,
stock and the cart come live from Shopify; the game is the home page (`/`).
`shopify-theme.zip` is the uploadable package (Online Store → Themes → Add theme → Upload zip).

| Shopify URL | Page |
|---|---|
| `/` | Enter Paper Land game |
| `/pages/home` | Regular home page |
| `/collections/all`, `/collections/<handle>` | Shop with filters |
| `/products/<handle>` | Product page |
| `/collections` | Collections overview |
| `/pages/about`, `/pages/journal`, `/pages/article#<post>`, `/pages/help` | Content pages |

/* ================= Paper Land — shared site script ================= */

const C = {char:'#2B2927',sand:'#E7DED2',terra:'#D49B7B',sage:'#A9B49C',dusk:'#9DADC9',blush:'#F1D7D0',cream:'#F4EEE4',olive:'#7E8466'};

const COLLECTIONS = {
  saigon:{name:'Saigon Mornings',chapter:'Chapter 1 · The Vietnam Collection',sub:'where the city wakes up early',bg:'#E9DFD3',
    blurb:'Iced coffee on a plastic stool, motorbikes humming down the alleyways, a city waking up loud and full of plans. Three hardcover notebooks named for the words that start a Saigon day.'},
  adelaide:{name:'Adelaide Arvo',chapter:'Chapter 2 · The Australian Collection',sub:'the afternoon, said the Aussie way',bg:'#DDE2D6',
    blurb:'Long light over the Hills, a cuppa gone cold beside the laptop, the to-do list quietly renegotiated. Notebooks for the slower half of the day.'},
  studio:{name:'Someday Studio',chapter:'Chapter 3 · Planners & Pocket Notes',sub:'for the plans you keep meaning to make',bg:'#E3E6EE',
    blurb:'Undated planners and pocket notebooks for the plans you keep meaning to make. Start in any month, skip a week without guilt, begin again whenever.'},
  crabit:{name:'Crabit Coffee Series',chapter:'Guest Brand · by Crabit, Vietnam',sub:'a Vietnamese stationery brand, stocked by Paper Land',bg:'#E6E1DA',
    blurb:'We are proud to stock Crabit, a stationery brand from Vietnam. Their Coffee Series names every notebook after a coffee bean or a café favourite — from Liberica and Robusta beans to iced milk coffee. A5 notebooks with 130gsm paper in dot, grid and lined.'},
};

const PRODUCTS = {
  'iced-coffee':{name:'iced coffee',ph:'[eyest kof-ee]',def:'Strong, sweet and poured over ice — enough to turn a 6am alarm into an actual plan.',bg:C.char,dark:1,col:'saigon',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',tag:'Bestseller',
    desc:'Our first notebook and still our favourite. A charcoal linen-feel hardcover for early starts, morning pages and the plans you make before the coffee kicks in.'},
  'alleyway':{name:'alleyway',ph:'[al-ee-wey]',def:'A narrow lane where the best ideas and the best noodles are hiding.',bg:C.terra,col:'saigon',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',
    desc:'A warm terracotta cover for the side-quests — sketches, lists, half-ideas and the things you notice on the way somewhere else.'},
  'street-food':{name:'street food',ph:'[street food]',def:'Proof that the best things come with crunch, chilli and a little bit of everything.',bg:C.sand,col:'saigon',price:34,fmt:'A5 hardcover · lined',ruling:'7mm lined',
    desc:'A soft sand cover with classic lined pages. Made for recipes, travel notes and anything that is better with a bit of everything in it.'},
  'arvo':{name:'arvo',ph:'[ah-voh]',def:'The part of the day when to-do lists quietly become maybe-tomorrow lists.',bg:C.sage,col:'adelaide',price:34,fmt:'A5 hardcover · dot grid',ruling:'5mm dot grid',tag:'New',
    desc:'Sage green, like the Adelaide Hills in late afternoon light. Dot grid pages for planning, journaling, or simply working out what can wait until tomorrow.'},
  'brekkie':{name:'brekkie',ph:'[brek-ee]',def:'The meal that makes a Monday negotiable.',bg:C.cream,col:'adelaide',price:34,fmt:'A5 hardcover · lined',ruling:'7mm lined',
    desc:'A bright cream cover for the first page of the week. Lined pages for morning journaling, weekly goals and the occasional brunch review.'},
  'cuppa':{name:'cuppa',ph:'[kup-uh]',def:'A small pause in a mug, best taken before replying to any email.',bg:C.olive,dark:1,col:'adelaide',price:34,fmt:'A5 hardcover · plain',ruling:'plain',
    desc:'Deep olive with plain pages — no lines, no dots, no rules. For sketching, lettering and thinking out loud between meetings.'},
  'someday':{name:'someday',ph:'[sum-day]',def:'The day all of these notes finally turn into plans. Undated, so it can start today.',bg:C.dusk,col:'studio',price:42,fmt:'A5 undated planner · 12 months',ruling:'Monthly + weekly spreads',tag:'Planner',
    desc:'An undated 12-month planner with monthly calendars, weekly spreads and dot grid notes pages. Start in any month and skip a week without wasting a page.'},
  'pocket-notes':{name:'pocket notes',spiral:1,seo:'Pocket Notes — Small Spiral Notebook, 10 × 10 cm',col:'studio',price:14,fmt:'10 × 10 cm spiral · 80 pages',ruling:'5mm dot grid',bg:C.dusk,
    desc:'A small square spiral notebook in blue gingham. Fits in a bag, a coat pocket or beside the laptop for quick lists and phone numbers.'},
  'saigon-set':{name:'Saigon Mornings Set',set:['iced-coffee','alleyway','street-food'],col:'sets',price:89,fmt:'3 × A5 notebooks · gift box',tag:'Save $13',
    desc:'All three Saigon Mornings notebooks — iced coffee, alleyway and street food — packed together in a recycled kraft gift box.'},
  'arvo-set':{name:'Adelaide Arvo Set',set:['arvo','brekkie','cuppa'],col:'sets',price:89,fmt:'3 × A5 notebooks · gift box',tag:'Save $13',
    desc:'All three Adelaide Arvo notebooks — arvo, brekkie and cuppa — packed together in a recycled kraft gift box.'},
  /* ---- Guest brand: Crabit Coffee Series (stocked by Paper Land) ---- */
  'crabit-liberica':{title:'Coffee Beans Notebook – Liberica',short:'Liberica',series:'Coffee Beans',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · grid',ruling:'Grid',paper:'130gsm',
    imgs:['img/crabit-liberica.jpg','img/crabit-liberica-journal.jpg'],bg:'#8C857A',tag:'Crabit',
    desc:'Named after Liberica, a rare and bold coffee bean grown across Southeast Asia. A calm taupe cover with an elastic closure, and grid pages for planning, lists and structured journaling.'},
  'crabit-robusta':{title:'Coffee Beans Notebook – Robusta',short:'Robusta',series:'Coffee Beans',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · dot grid',ruling:'Dot grid',paper:'130gsm',bg:'#4A3A30',dark:1,
    desc:'Named after Robusta, the strong, punchy bean behind most Vietnamese coffee. Dot grid pages for bullet journaling, layouts and sketches.'},
  'crabit-excela':{title:'Coffee Beans Notebook – Excela',short:'Excela',series:'Coffee Beans',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · lined',ruling:'Lined',paper:'130gsm',bg:'#8A6A4F',dark:1,
    desc:'Named after Excelsa, an uncommon bean known for its tart, fruity flavour. Lined pages for long-form writing, class notes and journaling.'},
  'crabit-arabica':{title:'Coffee Beans Notebook – Arabica',short:'Arabica',series:'Coffee Beans',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · lined',ruling:'Lined',paper:'130gsm',bg:'#CDB79C',
    desc:'Named after Arabica, the smooth, aromatic bean loved by cafés around the world. Lined pages for everyday writing and study notes.'},
  'crabit-white-coffee':{title:'White Coffee Notebook',short:'White Coffee',series:'Café',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · dot grid',ruling:'Dot grid',paper:'130gsm',bg:'#EFE6D8',
    desc:'Inspired by bac xiu, Saigon’s sweet, milky white coffee. Dot grid pages for journaling, planning and doodles.'},
  'crabit-iced-black':{title:'Iced Black Coffee Notebook',short:'Iced Black',series:'Café',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · dot grid',ruling:'Dot grid',paper:'130gsm',bg:'#232120',dark:1,
    desc:'Inspired by den da, Vietnam’s strong iced black coffee. Dot grid pages for focused plans and to-do lists.'},
  'crabit-coconut':{title:'Coconut Coffee Notebook',short:'Coconut Coffee',series:'Café',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · grid',ruling:'Grid',paper:'130gsm',bg:'#E9E4DA',
    desc:'Inspired by coconut coffee, a creamy café favourite from Hanoi. Grid pages for tables, trackers and neat layouts.'},
  'crabit-iced-milk':{title:'Iced Milk Coffee Notebook',short:'Iced Milk',series:'Café',brand:'Crabit',col:'crabit',price:24,fmt:'A5 · grid',ruling:'Grid',paper:'130gsm',bg:'#A57A55',dark:1,
    desc:'Inspired by nau da, Vietnamese iced coffee with condensed milk. Grid pages for planning, study and project notes.'},
  'crabit-americano':{title:'Coffeeine Notebook – Americano',short:'Americano',series:'Coffeeine',brand:'Crabit',col:'crabit',price:22,fmt:'Dotted notebook',ruling:'Dot grid',
    imgs:['img/crabit-americano.jpg','img/crabit-coffeeine-trio.jpg'],bg:'#262423',tag:'Crabit',
    desc:'From Crabit’s Coffeeine line: a black hardcover with a dictionary-style definition of the americano, an elastic closure and dotted pages.'},
  'crabit-espresso':{title:'Coffeeine Notebook – Espresso',short:'Espresso',series:'Coffeeine',brand:'Crabit',col:'crabit',price:22,fmt:'Dotted notebook',ruling:'Dot grid',
    imgs:['img/crabit-coffeeine-trio.jpg'],bg:'#D39A7B',
    desc:'From Crabit’s Coffeeine line: a warm peach hardcover with a dictionary-style definition of the espresso and dotted pages. Shown here with Latte and Americano.'},
  'crabit-latte':{title:'Coffeeine Notebook – Latte',short:'Latte',series:'Coffeeine',brand:'Crabit',col:'crabit',price:22,fmt:'Dotted notebook',ruling:'Dot grid',
    imgs:['img/crabit-latte.jpg','img/crabit-coffeeine-trio.jpg'],bg:'#E2D9CC',tag:'Crabit',
    desc:'From Crabit’s Coffeeine line: a soft beige hardcover with a dictionary-style definition of the latte, an elastic closure and dotted pages.'},
};

const JOURNAL = {
  'spiral-vs-hardcover-notebook':{alt:'A black hardcover notebook and a small blue gingham spiral notebook on a desk',title:'Spiral notebook or hardcover notebook? How to choose',date:'November 2026',cat:'Notebook Guides',glyph:'spiral',bg:'linear-gradient(135deg,#E9E2D6,#CDBFAB)',prods:['pocket-notes','iced-coffee','arvo'],
    lede:'Spiral notebooks fold back and tear out clean. Hardcovers last and travel well. Here is how to pick the right one for lectures, lists, journals and gifts.',
    body:`<p>Walk into any newsagent and the notebook wall splits in two: spiral notebooks on one side, hardcover notebooks on the other. Both hold paper. They just suit different days. Here is how to choose between notebooks with a spiral binding and notebooks with a hard cover, without overthinking it.</p>
<h2>What a spiral notebook does well</h2>
<ul><li><strong>It folds back on itself.</strong> A spiral notebook opens a full 360 degrees, so you can write on one page with the rest of the book folded behind it. Handy on a crowded lecture desk or a train.</li>
<li><strong>It lies flat every time.</strong> The coil means no fighting the spine to keep a page open.</li>
<li><strong>Pages come out easily.</strong> Good for to-do lists, shopping lists and notes you mean to hand to someone.</li>
<li><strong>It is light.</strong> A spiral notebook is usually thinner and lighter than a hardcover with the same number of pages.</li></ul>
<figure><img src="img/blog/spiral-pocket-notes-list.jpg" srcset="img/blog/spiral-pocket-notes-list-sm.jpg 750w, img/blog/spiral-pocket-notes-list.jpg 1500w" sizes="(max-width: 760px) 100vw, 720px" alt="A small square spiral notebook with a handwritten to-do list, next to a laptop" loading="lazy" width="1500" height="1000"><figcaption>A small spiral notebook earns its place as a list pad beside the laptop.</figcaption></figure>
<p>The trade-offs: the coil can catch in a bag, pages can work loose at the holes over time, and many left-handed writers find a side coil gets in the way of their hand. A spiral bound at the top avoids that last one.</p>
<h2>What a hardcover notebook does well</h2>
<ul><li><strong>A rigid cover is a desk you carry.</strong> You can write on your lap, on a bench or standing up.</li>
<li><strong>It protects the pages.</strong> Corners stay square in a bag full of keys and chargers.</li>
<li><strong>It lasts.</strong> A bound notebook keeps a year of notes together, which is why journals, planners and keepsakes are almost always hardcover.</li>
<li><strong>Lay-flat binding closes the gap.</strong> A well-bound hardcover opens flat too. It just does not fold all the way back.</li></ul>
<h2>Spiral vs hardcover at a glance</h2>
<table><thead><tr><th></th><th>Spiral notebook</th><th>Hardcover notebook</th></tr></thead><tbody>
<tr><td>Opens flat</td><td>Yes, and folds back 360°</td><td>Yes, if the binding is lay-flat</td></tr>
<tr><td>Writing without a desk</td><td>Harder if the cover is soft</td><td>Easy, the cover is rigid</td></tr>
<tr><td>Tearing pages out</td><td>Easy</td><td>Possible, but it shows</td></tr>
<tr><td>Life in a busy bag</td><td>The coil can snag or bend</td><td>Holds up well</td></tr>
<tr><td>Best for</td><td>Lectures, lists, scrap work</td><td>Journals, planners, gifts</td></tr></tbody></table>
<h2>Which one should you buy?</h2>
<ul><li><strong>For uni lectures:</strong> either works. Pick a spiral notebook if you like folding it back on a small desk, a hardcover if you want a whole term of notes to stay together.</li>
<li><strong>For a daily journal or planner:</strong> hardcover. It stays neat for the whole year.</li>
<li><strong>For quick lists and phone numbers:</strong> a small spiral notebook that lives beside the laptop or in a coat pocket.</li>
<li><strong>As a gift:</strong> hardcover. It feels like a keepsake rather than supplies.</li></ul>
<h2>What we make</h2>
<p>Most Paper Land notebooks are A5 hardcovers with lay-flat binding and 160 numbered pages of 120gsm ivory paper. We make one spiral notebook: <a href="product-pocket-notes.html">Pocket Notes</a>, a 10 × 10 cm square with 80 pages of 5mm dot grid, made for lists rather than long entries.</p>
<h2>Quick answers</h2>
<p><strong>Do spiral notebooks lie flat?</strong> Yes. The coil lets every page lie flat and fold right back.</p>
<p><strong>Are spiral notebooks good for left-handed writers?</strong> A side coil often gets in the way of a left hand. A top-bound spiral or a hardcover is usually more comfortable.</p>
<p><strong>Is a hardcover notebook worth the extra cost?</strong> If you want to keep what you write, usually yes. If the notes are throwaway, a spiral notebook does the job.</p>`},
  'notebook-paper-guide':{alt:'An open notebook with a dot grid page and a lined page, handwritten notes and a pen',title:'Notebook paper explained: gsm, dot grid, lined or plain',date:'November 2026',cat:'Notebook Guides',glyph:'gsm',bg:'linear-gradient(135deg,#E3E7DC,#BFC9B1)',prods:['iced-coffee','street-food','cuppa'],
    lede:'What the numbers on a paper notebook actually mean, and how to choose the right page for the way you write.',
    body:`<p>Two notebooks can look the same on a shelf and feel completely different the moment your pen touches the page. The difference is the paper. Here is what the numbers on a paper notebook mean, and how to choose notebook paper that suits the way you write.</p>
<h2>What gsm means</h2>
<p>GSM stands for grams per square metre: how much a sheet of that paper would weigh at one square metre. Higher numbers mean heavier, usually thicker paper.</p>
<ul><li><strong>Around 80gsm:</strong> everyday printer paper. Fine for pencil and ballpoint, but most ink shows through.</li>
<li><strong>Around 100gsm:</strong> a step up. Gel pens and fineliners behave better.</li>
<li><strong>120gsm and above:</strong> noticeably thicker. Less show-through, and more forgiving with fountain pens, highlighters and brush pens.</li></ul>
<p>Heavier paper has one cost: the same number of pages makes a thicker, heavier notebook.</p>
<h2>Show-through and bleed-through</h2>
<p><strong>Show-through</strong>, sometimes called ghosting, is when you can see writing from the other side of the page. <strong>Bleed-through</strong> is when ink soaks right through and marks the next page. Thicker, smoother paper reduces both. Test a new pen on the back page first.</p>
<h2>Lined, dot grid or plain?</h2>
<ul><li><strong>Lined:</strong> rows for writing. Best for lecture notes, letters and long journal entries.</li>
<li><strong>Dot grid:</strong> a light grid of dots, usually 5mm apart. It keeps your writing straight but stays out of the way for diagrams, tables and bullet journal layouts.</li>
<li><strong>Plain:</strong> no guides at all. Best for sketching, mind maps and anyone who finds lines distracting.</li></ul>
<figure><img src="img/blog/notebook-paper-rulings.jpg" srcset="img/blog/notebook-paper-rulings-sm.jpg 750w, img/blog/notebook-paper-rulings.jpg 1500w" sizes="(max-width: 760px) 100vw, 720px" alt="Three sheets of notebook paper side by side: dot grid, lined and plain" loading="lazy" width="1500" height="1000"><figcaption>Dot grid, lined and plain: the same paper, three different jobs.</figcaption></figure>
<p>Not sure? Dot grid is the most flexible of the three. You can write in it like a lined notebook and draw in it like a plain one.</p>
<h2>White or ivory paper?</h2>
<p>Bright white paper gives the sharpest contrast. Ivory, or cream, paper is warmer and feels softer under bright light. It is mostly a matter of taste.</p>
<h2>Which paper for which pen</h2>
<p>A notebook with paper that suits your pen saves a lot of frustration. As a rough guide:</p>
<table><thead><tr><th>Pen</th><th>Paper that works</th></tr></thead><tbody>
<tr><td>Pencil, ballpoint</td><td>Anything from 80gsm</td></tr>
<tr><td>Gel pen, fineliner</td><td>100gsm and up</td></tr>
<tr><td>Fountain pen, highlighter, brush pen</td><td>120gsm and up, and test the back page first</td></tr></tbody></table>
<h2>Looking for loose notebook paper?</h2>
<p>If you searched for notebook paper to refill a ring binder, we do not sell loose-leaf sheets. Everything we make is bound into a notebook.</p>
<h2>The paper in our notebooks</h2>
<p>Our A5 hardcover notebooks have 160 numbered pages of 120gsm ivory paper, in three rulings: dot grid (<a href="product-iced-coffee.html">Iced Coffee</a>, <a href="product-arvo.html">Arvo</a>), lined (<a href="product-street-food.html">Street Food</a>, <a href="product-brekkie.html">Brekkie</a>) and plain (<a href="product-cuppa.html">Cuppa</a>). <a href="product-pocket-notes.html">Pocket Notes</a>, our small spiral notebook, uses 100gsm paper with a 5mm dot grid.</p>`},
  'notebook-and-paper-gifts':{alt:'Three Saigon Mornings notebooks in a kraft gift box with a ribbon and a tag',title:'Notebook and paper gifts for people who love to write',date:'November 2026',cat:'Gift Guides',glyph:'gift',bg:'linear-gradient(135deg,#EFE4D6,#D9BFA3)',prods:['saigon-set','arvo-set','someday','pocket-notes'],
    lede:'A paper notebook is one of the easiest gifts to get right. Here is how to choose one by the person you are buying for.',
    body:`<p>A good notebook is personal without being risky. It needs no size, it does not go off, and most people who write by hand will use one. The trick is matching the notebook and paper to the person.</p>
<h2>For the student</h2>
<p>A lined A5 notebook for lecture notes, and something small for to-do lists. <a href="product-street-food.html">Street Food</a> and <a href="product-brekkie.html">Brekkie</a> are lined. <a href="product-pocket-notes.html">Pocket Notes</a> is a small spiral notebook that sits beside a laptop.</p>
<h2>For the planner</h2>
<p>An undated planner is safer than a dated one: they can start it the day they open it, not only in January. <a href="product-someday.html">Someday</a> covers 12 months with no dates printed.</p>
<h2>For the coffee lover</h2>
<p>The <a href="product-saigon-set.html">Saigon Mornings Set</a> brings iced coffee, alleyway and street food together in one gift box. We also stock the Crabit Coffee Series, coffee-themed notebooks from the Vietnamese stationery brand Crabit, in the <a href="shop.html#crabit">shop</a>.</p>
<h2>For someone who misses Australia</h2>
<p>The <a href="product-arvo-set.html">Adelaide Arvo Set</a> puts three Aussie words on three covers: arvo, brekkie and cuppa. It travels well in a suitcase.</p>
<figure><img src="img/blog/notebook-gifts-arvo-set.jpg" srcset="img/blog/notebook-gifts-arvo-set-sm.jpg 750w, img/blog/notebook-gifts-arvo-set.jpg 1500w" sizes="(max-width: 760px) 100vw, 720px" alt="The Arvo, Brekkie and Cuppa notebooks laid out with a gift tag" loading="lazy" width="1500" height="1000"><figcaption>The Adelaide Arvo Set: arvo, brekkie and cuppa.</figcaption></figure>
<h2>For the sketcher</h2>
<p>Plain pages and heavier paper. <a href="product-cuppa.html">Cuppa</a> has no lines and 120gsm ivory paper, so pencils and fineliners behave.</p>
<h2>Make it personal</h2>
<ul><li>Write a short note on the first page. It turns a notebook into a keepsake.</li>
<li>Choose the word on the cover for the person: <em>brekkie</em> for the early riser, <em>someday</em> for the dreamer.</li>
<li>Add a pen they will actually use. Our <a href="blog-notebook-paper-guide.html">notebook paper guide</a> explains which pens suit which paper.</li></ul>
<h2>Shipping</h2>
<p>We ship Australia-wide from Adelaide, free on orders over $60. See the <a href="help.html">help page</a> for current dispatch times before you count on a delivery date.</p>`},
  'why-saigon':{alt:'The Iced Coffee notebook on a red plastic stool beside a glass of iced coffee',title:'Why our first collection starts in Saigon',date:'October 2026',cat:'Our Story',glyph:'coffee',bg:'linear-gradient(135deg,#E8DCCD,#D7C3AE)',
    lede:'Every brand has to start somewhere. Ours started on a plastic stool, with an iced coffee and a notebook full of plans.',
    body:`<p>Paper Land is designed in Adelaide, but the idea began in Saigon — a city that wakes up early, loudly, and with a coffee in hand. Mornings there run on small rituals: the same café, the same stool, the same order, and a few minutes to write down what the day needs to become.</p>
<p>We wanted our first notebooks to hold on to that feeling. So instead of a logo on the front, each cover carries a single word and a short definition — the way you'd actually explain that word to a friend.</p>
<h2>Three words, one morning</h2>
<p><strong>Iced coffee</strong> is the start. <strong>Alleyway</strong> is the detour where the good ideas hide. <strong>Street food</strong> is the reward — a little bit of everything, with crunch. Together they make the Saigon Mornings collection.</p>
<h2>Why bring it to Australia?</h2>
<p>Because the ritual travels. An Adelaide morning looks different — a flat white instead of an iced coffee, a tram instead of a motorbike — but the habit of sitting down and writing out the day is the same. Our second collection, Adelaide Arvo, is the other half of that story.</p>`},
  'arvo-reset':{alt:'An open notebook with a Done, Next, Later, Cuppa layout beside a cup of tea and biscuits',title:'The five-minute arvo reset',date:'September 2026',cat:'How To',glyph:'arvo',bg:'linear-gradient(135deg,#D9DFD0,#B9C4AD)',
    lede:'A one-page spread for the 3pm slump: what is done, what is next, and what can honestly wait.',
    body:`<p>Around mid-afternoon, most to-do lists stop being useful. Some tasks are finished, some have changed, and a few were never going to happen today. The arvo reset is a quick way to take stock without starting a whole new list.</p>
<h2>The spread</h2>
<ol><li><strong>Done.</strong> Write down three things you finished today, however small.</li>
<li><strong>Next.</strong> Pick the one task that would make tomorrow morning easier, and do only that.</li>
<li><strong>Later.</strong> Move everything else to a "maybe-tomorrow" list — without guilt.</li>
<li><strong>Cuppa.</strong> Put the kettle on. This step is not optional.</li></ol>
<p>Dot grid pages work best because you can draw three quick boxes and fill them in. Five minutes, one page, and the rest of the afternoon feels lighter.</p>`},
  'bullet-journal':{alt:'An open dot grid notebook with an index page and a six-month future log',title:'Starting a bullet journal in ten minutes',date:'August 2026',cat:'How To',glyph:'someday',bg:'linear-gradient(135deg,#E4E7EF,#C3CCDD)',
    lede:'No stencils, no perfect lettering, no forty-page setup. A beginner layout you can copy tonight.',
    body:`<p>Bullet journaling has a reputation for being complicated. It doesn't need to be. All you need is a dotted notebook, a pen, and ten minutes.</p>
<h2>The four pages to start with</h2>
<ul><li><strong>Index</strong> — leave the first two pages blank and add page numbers as you go.</li>
<li><strong>Future log</strong> — one page split into six boxes for the next six months.</li>
<li><strong>Monthly log</strong> — dates down the left, key events beside them.</li>
<li><strong>Daily log</strong> — today's date, then short bullets: • task, ○ event, – note.</li></ul>
<h2>Keep it ugly</h2>
<p>The best journal is the one you actually use. Cross things out, change the layout next month, and let the pages be messy. That is what they are for.</p>`},
};

const NOTES=[
 ['Write it down before the coffee goes cold.','Margin note no. 01'],
 ['A blank page is just a morning that hasn’t happened yet.','Margin note no. 02'],
 ['Some plans need a deadline. Most need a cuppa.','Margin note no. 03'],
 ['Half the list, twice the care.','Margin note no. 04'],
 ['The alley is narrow; the ideas are not.','Margin note no. 05'],
 ['Someday is a perfectly good day to begin.','Margin note no. 06'],
];

const FREE_SHIP = 60;

/* ---------- Shopify checkout (cart permalink) ---------- */
const SHOPIFY = {
  domain: '2yiqce-va.myshopify.com',
  // website product id -> Shopify variant id (products share the same handle in Shopify)
  variants: {
    'iced-coffee':'50200969904387','alleyway':'50200969937155','street-food':'50200969969923',
    'arvo':'50200970002691','brekkie':'50200970035459','cuppa':'50200970068227',
    'someday':'50200970100995','pocket-notes':'50200970297603','saigon-set':'50200970330371','arvo-set':'50200970363139',
    'crabit-liberica':'50200970395907','crabit-robusta':'50200970428675','crabit-excela':'50200970461443','crabit-arabica':'50200970494211',
    'crabit-white-coffee':'50200970526979','crabit-iced-black':'50200970559747','crabit-coconut':'50200970592515','crabit-iced-milk':'50200970625283',
    'crabit-americano':'50200970658051','crabit-espresso':'50200970690819','crabit-latte':'50200970723587'
  }
};
function checkoutUrl(){
  const lines=Object.keys(cart).filter(id=>SHOPIFY.variants[id]&&cart[id]>0).map(id=>SHOPIFY.variants[id]+':'+cart[id]);
  return lines.length?`https://${SHOPIFY.domain}/cart/${lines.join(',')}`:null;
}
const $ = (s,el=document)=>el.querySelector(s);
/* every product and journal post has its own page (own URL, title and description — built by tools/build.py) */
const purl = id => 'product-'+id+'.html';
const jurl = k => 'blog-'+k+'.html';
const slug = t => t.toLowerCase().replace(/<[^>]+>/g,'').replace(/&[a-z]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const bimg = (k,alt,big) => `<img class="pimg" src="img/blog/${k}${big?'':'-sm'}.jpg" srcset="img/blog/${k}-sm.jpg 750w, img/blog/${k}.jpg 1500w" sizes="${big?'(max-width: 760px) 100vw, 720px':'(max-width: 760px) 100vw, 640px'}" alt="${alt}" ${big?'':'loading="lazy" '}width="1500" height="1000">`;
const readMins = j => Math.max(1,Math.round(j.body.replace(/<[^>]+>/g,' ').split(/\s+/).filter(Boolean).length/200));
/* ---------- analytics (GA4 through the Google tag in <head>) ---------- */
function track(name,params){try{window.dataLayer=window.dataLayer||[];(window.gtag||function(){dataLayer.push(arguments)})('event',name,params||{})}catch(e){}}
const gaItem = (id,qty) => {const p=PRODUCTS[id],c=COLLECTIONS[p.col];return {item_id:id,item_name:titleOf(id),item_brand:p.brand||'Paper Land',item_category:c?c.name:'Gift Sets',price:p.price,quantity:qty||1}};
const money = n => '$'+n.toFixed(2);
const titleOf = id => { const p=PRODUCTS[id]; if(p.title) return p.title; if(p.set) return p.name; if(p.spiral) return 'Pocket Notes'; return p.name.replace(/\b\w/g,c=>c.toUpperCase())+' Notebook'; };

/* ---------- covers ---------- */
/* product photos: real ones where we have them, otherwise the rendered shots in img/p/ (tools/render_shots.py) */
const shots = id => PRODUCTS[id].imgs ? [] : Array.from({length:PRODUCTS[id].set?2:4},(_,i)=>`img/p/${id}-${i+1}.jpg`);
const img = (src,alt) => `<img class="pimg" src="${src}" alt="${alt}" loading="lazy">`;
function cover(id){
  const p=PRODUCTS[id];
  if(p.imgs) return img(p.imgs[0],titleOf(id));
  if(p.brand) return `<div class="nb gb ${p.dark?'dark':''}" style="background:${p.bg}"><div class="gb-l">${p.brand} · ${p.series}</div><div class="w">${p.short.toLowerCase()}</div><div class="gb-f">${p.fmt}</div></div>`;
  if(p.set) return `<div class="set">${p.set.map(cover).join('')}</div>`;
  if(p.spiral) return `<div class="nb spiral gingham"><div class="w">pocket notes</div></div>`;
  return `<div class="nb ${p.dark?'dark':''}" style="background:${p.bg}"><div class="w">${p.name}</div><div class="ph"><span>${p.ph}</span><span>noun</span></div><div class="rule"></div><div class="def">${p.def}</div></div>`;
}
/* a notebook that opens: hover (desktop), scroll into view (phones) or tap (product page) and the cover swings open while the pages flip */
const canOpen = id => { const p=PRODUCTS[id]; return !p.imgs && !p.brand && !p.set; };
function book(id){
  const p=PRODUCTS[id], r=/dot/.test(p.ruling||'')?'dots':/lined/.test(p.ruling||'')?'lines':/plain/.test(p.ruling||'')?'plain':'dots';
  const c=p.spiral?'#B9C6DA':p.bg;
  const pg=[0,1,2,3].map(i=>`<i class="ob-pg p${i}"><b class="f r-${r}"></b><b class="b r-${r}"></b></i>`).join('');
  return `<div class="ob${p.spiral?' sq':''}" data-id="${id}" style="--c:${c}"><div class="ob-in"><i class="ob-block r-${r}"></i>${pg}<i class="ob-cv"><b class="f">${cover(id)}</b><b class="b"><span><small>Paper Land</small>${p.spiral?'notes':p.name}</span></b></i></div></div>`;
}
const peek = id => { window.__peeked=window.__peeked||{}; if(!__peeked[id]){__peeked[id]=1; track('notebook_peek',{item_id:id});} };
const hov = id => { if(canOpen(id)) return ''; const s=PRODUCTS[id].imgs?PRODUCTS[id].imgs[1]:shots(id)[0]; return s?`<img class="pimg hov" src="${s}" alt="" loading="lazy">`:''; };
function card(id){
  const p=PRODUCTS[id];
  return `<div class="card"><a class="stage-link" href="${purl(id)}"><div class="stage">${p.tag?`<span class="tag">${p.tag}</span>`:''}${canOpen(id)?book(id):cover(id)}${hov(id)}</div>
    <h3>${titleOf(id)}</h3></a><div class="meta">${p.brand?`by ${p.brand} · `:''}${p.fmt}${p.paper?' · '+p.paper:''}</div>
    <div class="row"><span class="price">${money(p.price)} AUD</span><button class="add" data-add="${id}">Add to Cart</button></div></div>`;
}

/* ---------- header / footer / drawer ---------- */
function chrome(){
  const page=document.body.dataset.page;
  if(document.body.dataset.bare){ chromeBare(); return; }
  const a=(href,label,key)=>`<li><a href="${href}" class="${page===key?'active':''}">${label}</a></li>`;
  $('#site-header').outerHTML = `
  <div class="announce">Free shipping Australia-wide on orders over $${FREE_SHIP} · Designed in Adelaide</div>
  <header><div class="wrap nav">
    <a href="home.html" class="logo">Paper <span>Land</span></a>
    <ul class="menu" id="menu">
      ${a('shop.html','Shop','shop')}
      <li class="dd" id="dd"><button aria-haspopup="true" aria-expanded="false" id="ddBtn" class="${page==='collections'?'active':''}">Collections <svg class="chev" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg></button>
        <div class="dd-panel">
          ${Object.entries(COLLECTIONS).map(([k,c])=>`<a href="collections.html#${k}"><small>${c.chapter.split(' · ')[0]}</small>${c.name}</a>`).join('')}
          <a href="shop.html#sets"><small>Gift Sets</small>Starter Sets</a>
        </div></li>
      ${a('about.html','About','about')}
      ${a('blog.html','Blog','journal')}
      ${a('help.html','Help','help')}
      <li><a href="index.html" class="play-link">▶ Play</a></li>
    </ul>
    <div style="display:flex;gap:22px;align-items:center">
      <button class="burger" id="burger">Menu</button>
      <button class="cart-btn" id="cartOpen">Cart <span id="cartCount">0</span></button>
    </div></div></header>`;

  $('#site-footer').outerHTML = `
  <section class="club">
    <div class="eyebrow">The Paper Club</div>
    <h2>Letters, launches &amp; 10% off.</h2>
    <p>One slow email a month. New collections first, and 10% off your first notebook.</p>
    <form id="clubForm"><input type="email" placeholder="Your email address" required aria-label="Email address"><button type="submit">Join</button></form>
    <div class="ok" id="clubOk">Thank you — welcome to the Paper Club.</div>
  </section>
  <footer><div class="wrap">
    <div class="fgrid">
      <div class="fbrand"><a href="home.html" class="logo">Paper <span>Land</span></a>
        <p>Notebooks for slow mornings — designed in Adelaide, inspired by Saigon.</p>
        <p style="margin-top:14px">hello@paperland.com.au</p></div>
      <div><h4>Shop</h4><ul><li><a href="shop.html">Shop All</a></li><li><a href="collections.html#saigon">Saigon Mornings</a></li><li><a href="collections.html#adelaide">Adelaide Arvo</a></li><li><a href="collections.html#studio">Someday Studio</a></li><li><a href="collections.html#crabit">Crabit Coffee Series</a></li><li><a href="shop.html#sets">Gift Sets</a></li></ul></div>
      <div><h4>Help</h4><ul><li><a href="help.html#shipping">Shipping &amp; Returns</a></li><li><a href="help.html#stockists">Stockists</a></li><li><a href="help.html#contact">Contact Us</a></li><li><a href="help.html#faq">FAQ</a></li></ul></div>
      <div><h4>Paper Land</h4><ul><li><a href="about.html">Our Story</a></li><li><a href="blog.html">Blog</a></li><li><a href="https://www.instagram.com/">Instagram</a></li><li><a href="https://www.tiktok.com/">TikTok</a></li></ul></div>
    </div>
    <div class="fbase"><span>© 2026 Paper Land. All rights reserved.</span><span>Privacy Policy · Terms of Use</span></div>
  </div></footer>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" aria-label="Your cart">
    <div class="dhead"><h3>Your Cart</h3><button id="cartClose">Close</button></div>
    <div class="ship" id="ship"></div><div class="items" id="items"></div>
    <div class="dfoot"><div class="tot"><span>Subtotal</span><span id="subtotal">$0.00</span></div>
      <small>Secure checkout by Shopify. Shipping and GST calculated at checkout. Prices in AUD.</small>
      <a class="btn solid" id="checkout" href="#" target="_blank" rel="noopener">Continue to Checkout</a>
      <div class="msg" id="msg">Your cart is empty — add a notebook first.</div></div>
  </aside>`;

  // dropdown
  const dd=$('#dd'), ddBtn=$('#ddBtn');
  ddBtn.addEventListener('click',e=>{e.stopPropagation();ddBtn.setAttribute('aria-expanded',dd.classList.toggle('open'))});
  document.addEventListener('click',e=>{if(!dd.contains(e.target)||e.target.closest('.dd-panel a')){dd.classList.remove('open');ddBtn.setAttribute('aria-expanded',false)}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){dd.classList.remove('open');closeCart()}});
  $('#burger').onclick=()=>$('#menu').classList.toggle('open');
  // newsletter
  $('#clubForm').addEventListener('submit',e=>{e.preventDefault();track('generate_lead',{lead_source:'footer_newsletter'});e.target.style.display='none';$('#clubOk').style.display='block'});
  // cart
  $('#cartOpen').onclick=openCart; $('#cartClose').onclick=closeCart; $('#scrim').onclick=closeCart;
  $('#checkout').onclick=e=>{const u=checkoutUrl();if(!u){e.preventDefault();$('#msg').style.display='block';return}
    const ids=Object.keys(cart).filter(id=>PRODUCTS[id]);track('begin_checkout',{currency:'AUD',value:ids.reduce((s,id)=>s+cart[id]*PRODUCTS[id].price,0),items:ids.map(id=>gaItem(id,cart[id]))})};
}

const DRAWER=`<div class="scrim" id="scrim"></div>
  <aside class="drawer" aria-label="Your cart">
    <div class="dhead"><h3>Your Cart</h3><button id="cartClose">Close</button></div>
    <div class="ship" id="ship"></div><div class="items" id="items"></div>
    <div class="dfoot"><div class="tot"><span>Subtotal</span><span id="subtotal">$0.00</span></div>
      <small>Secure checkout by Shopify. Shipping and GST calculated at checkout. Prices in AUD.</small>
      <a class="btn solid" id="checkout" href="#" target="_blank" rel="noopener">Continue to Checkout</a>
      <div class="msg" id="msg">Your cart is empty — add a notebook first.</div></div>
  </aside>`;
function chromeBare(){
  document.body.insertAdjacentHTML('beforeend',DRAWER);
  $('#cartClose').onclick=closeCart; $('#scrim').onclick=closeCart;
  $('#checkout').onclick=e=>{const u=checkoutUrl();if(!u){e.preventDefault();$('#msg').style.display='block';return}
    const ids=Object.keys(cart).filter(id=>PRODUCTS[id]);track('begin_checkout',{currency:'AUD',value:ids.reduce((s,id)=>s+cart[id]*PRODUCTS[id].price,0),items:ids.map(id=>gaItem(id,cart[id]))})};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});
}

/* ---------- cart (shared across pages via localStorage when available) ---------- */
let cart={};
try{cart=JSON.parse(localStorage.getItem('pl-cart')||'{}')||{}}catch(e){cart={}}
const saveCart=()=>{try{localStorage.setItem('pl-cart',JSON.stringify(cart))}catch(e){}};
function openCart(){document.body.classList.add('cart-open');
  const ids=Object.keys(cart).filter(id=>PRODUCTS[id]);
  track('view_cart',{currency:'AUD',value:ids.reduce((s,id)=>s+cart[id]*PRODUCTS[id].price,0),items:ids.map(id=>gaItem(id,cart[id]))})}
function closeCart(){document.body.classList.remove('cart-open')}
function addToCart(id,qty=1){cart[id]=(cart[id]||0)+qty;saveCart();drawCart();track('add_to_cart',{currency:'AUD',value:PRODUCTS[id].price*qty,items:[gaItem(id,qty)]})}
function drawCart(){
  const ids=Object.keys(cart).filter(id=>PRODUCTS[id]);
  const count=ids.reduce((s,id)=>s+cart[id],0);
  const sub=ids.reduce((s,id)=>s+cart[id]*PRODUCTS[id].price,0);
  document.querySelectorAll('#cartCount,.cartCount').forEach(el=>el.textContent=count);
  $('#subtotal').textContent=money(sub);
  {const a=$('#checkout'),u=checkoutUrl();if(a){a.href=u||'#';$('#msg').style.display='none'}}
  const left=Math.max(0,FREE_SHIP-sub);
  $('#ship').innerHTML=(left>0?`You're ${money(left)} away from free shipping.`:`You've unlocked free shipping.`)+`<div class="bar"><i style="width:${Math.min(100,sub/FREE_SHIP*100)}%"></i></div>`;
  $('#items').innerHTML=ids.length?ids.map(id=>{const p=PRODUCTS[id];const bg=p.imgs?`url(${p.imgs[0]}) center/cover`:p.set?PRODUCTS[p.set[0]].bg:p.bg;
    return `<div class="item"><a href="${purl(id)}" class="sw" style="background:${bg}"></a><div><h5><a href="${purl(id)}">${titleOf(id)}</a></h5><small>${money(p.price)}</small>
    <div class="qty"><button data-q="-1" data-id="${id}" aria-label="Decrease">−</button>${cart[id]}<button data-q="1" data-id="${id}" aria-label="Increase">+</button></div></div>
    <strong style="font-weight:400">${money(p.price*cart[id])}</strong></div>`}).join(''):'<div class="empty">Your cart is empty — for now.</div>';
}
document.addEventListener('mouseover',e=>{const o=e.target.closest&&e.target.closest('.card .ob');if(o&&matchMedia('(hover:hover)').matches)peek(o.dataset.id)});
if('IntersectionObserver' in window && matchMedia('(hover:none)').matches){
  const io=new IntersectionObserver(es=>es.forEach(en=>{en.target.classList.toggle('on',en.isIntersecting);if(en.isIntersecting)peek(en.target.dataset.id)}),{rootMargin:'-38% 0px -38% 0px'});
  const watch=()=>document.querySelectorAll('.card .ob:not([data-w])').forEach(o=>{o.dataset.w=1;io.observe(o)});
  new MutationObserver(watch).observe(document.documentElement,{childList:true,subtree:true}); watch();
}
document.addEventListener('click',e=>{
  const c=e.target.closest('.card a.stage-link, .itm a.art, .b-fan a');
  if(c){const m=(c.getAttribute('href')||'').match(/product-([a-z0-9-]+)\.html/);if(m&&PRODUCTS[m[1]])track('select_item',{item_list_id:document.body.dataset.page||'game',items:[gaItem(m[1])]})}
  const a=e.target.closest('[data-add]');
  if(a){addToCart(a.dataset.add);a.textContent='Added ✓';a.classList.add('done');setTimeout(()=>{a.textContent='Add to Cart';a.classList.remove('done')},1400)}
  const q=e.target.closest('[data-q]');
  if(q){const id=q.dataset.id;if(+q.dataset.q<0)track('remove_from_cart',{currency:'AUD',value:PRODUCTS[id].price,items:[gaItem(id,1)]});cart[id]+= +q.dataset.q;if(cart[id]<=0)delete cart[id];saveCart();drawCart()}
});

/* ---------- page: home ---------- */
function pageHome(){
  $('#bFan').innerHTML=['street-food','alleyway','iced-coffee','arvo','someday'].map(id=>`<a href="${purl(id)}" aria-label="${titleOf(id)}">${cover(id)}</a>`).join('');
  $('#featured').innerHTML=['iced-coffee','arvo','someday','alleyway'].map(card).join('');
  $('#storyVis').innerHTML=cover('iced-coffee')+cover('arvo');
}
function postCard(k,j){
  return `<article class="post" data-cat="${slug(j.cat)}"><a href="${jurl(k)}" tabindex="-1" aria-hidden="true"><div class="img" style="background:${j.bg}">${bimg(k,'')}</div></a>
    <div class="txt"><time>${j.date}</time> · <span class="cat">${j.cat}</span> · <span class="rt">${readMins(j)} min read</span><h3><a href="${jurl(k)}">${j.title}</a></h3><p>${j.lede}</p><a href="${jurl(k)}" class="link">Read More</a></div></article>`;
}

/* ---------- page: shop ---------- */
function pageShop(){
  const valid=['all','saigon','adelaide','studio','crabit','sets'];
  const draw=()=>{
    let f=location.hash.slice(1); if(!valid.includes(f)) f='all';
    document.querySelectorAll('#filters a').forEach(b=>b.classList.toggle('on',b.dataset.f===f));
    let ids=Object.keys(PRODUCTS).filter(id=>f==='all'||PRODUCTS[id].col===f);
    const s=$('#sort').value;
    if(s==='low') ids.sort((a,b)=>PRODUCTS[a].price-PRODUCTS[b].price);
    if(s==='high') ids.sort((a,b)=>PRODUCTS[b].price-PRODUCTS[a].price);
    $('#grid').innerHTML=ids.map(card).join('');
    $('#count').textContent=ids.length+' products';
    track('view_item_list',{item_list_id:f,item_list_name:f==='all'?'Shop all':f==='sets'?'Gift sets':COLLECTIONS[f].name,items:ids.map((id,i)=>Object.assign(gaItem(id),{index:i}))});
    $('#shopTitle').textContent= f==='all'?'Shop all notebooks': f==='sets'?'Gift sets': COLLECTIONS[f].name;
  };
  window.addEventListener('hashchange',draw); $('#sort').onchange=draw; draw();
}

/* ---------- page: product ---------- */
function pageProduct(){
  const draw=()=>{
    const fixed=document.body.dataset.handle;
    let id=fixed||location.hash.slice(1); if(!PRODUCTS[id]) id='iced-coffee';
    const p=PRODUCTS[id], col=COLLECTIONS[p.col];
    if(!fixed) document.title=titleOf(id)+' — Paper Land';
    track('view_item',{currency:'AUD',value:p.price,items:[gaItem(id)]});
    const ph=shots(id).map((src,i)=>img(src,`${titleOf(id)}, photo ${i+1}`));
    const views=[cover(id)];
    if(p.imgs){views.length=0;views.push(...p.imgs.map(src=>img(src,titleOf(id))));}
    else if(p.brand){views.push(`<div class="spread"><div><em>${p.short.toLowerCase()}</em></div><div></div></div>`);}
    else if(!p.set){views.push(`<div class="spread"><div><em>${p.spiral?'notes':p.name}</em></div><div></div></div>`);
      views.push(p.spiral?cover(id):`<div class="nb back ${p.dark?'dark':''}" style="background:${p.bg}"><div class="label"><b>Paper Land</b>${p.fmt.split(' · ')[0]}<br>${p.ruling}</div></div>`);}
    else views.push(...p.set.map(cover));
    if(ph.length){ /* cover first, then the photos, then the drawn views */
      const rest=views.slice(1), order=ph.length===4?[ph[0],ph[2],rest[0],ph[1],ph[3]]:[...ph,...rest];
      views.splice(1,views.length,...order.filter(Boolean)); views.splice(6); }
    const main0=canOpen(id)?book(id)+`<span class="ob-hint">${matchMedia('(hover:hover)').matches?'Hover':'Tap'} to look inside</span>`:views[0];
    let qty=1;
    $('#pdp').innerHTML=`
      <div class="gallery"><div class="main" id="main">${main0}</div>
        <div class="thumbs" style="grid-template-columns:repeat(${views.length},1fr)">${views.map((v,i)=>`<button data-v="${i}" class="${i?'':'on'}" aria-label="View ${i+1}">${v.replace('class="spread"','class="spread small"')}</button>`).join('')}</div></div>
      <div class="info">
        <div class="eyebrow">${col?`<a href="collections.html#${p.col}">${col.name}</a>`:'<a href="shop.html#sets">Gift Sets</a>'}</div>
        <h1>${titleOf(id)}</h1><div class="price">${money(p.price)} AUD</div>
        ${p.def?`<div class="defn"><small>${p.name} · ${p.ph} · noun</small>${p.def}</div>`:''}
        ${p.brand?`<div class="brandline">Made by <b>${p.brand}</b> in Vietnam · stocked by Paper Land</div>`:''}
        <p class="desc">${p.desc}</p>
        <div class="buy"><div class="stepper"><button id="minus" aria-label="Decrease">−</button><span id="qty">1</span><button id="plus" aria-label="Increase">+</button></div>
          <button class="btn solid" id="buy">Add to Cart</button></div>
        <div class="note-ship">Free shipping Australia-wide on orders over $${FREE_SHIP}. Dispatched from Adelaide in 1–2 business days.</div>
        <details open><summary>Details</summary><div class="body"><ul>
          <li>Format: ${p.fmt}</li>
          ${p.brand?(p.paper?`<li>Paper: ${p.paper}</li>`:''):`<li>Pages: ${p.set?'three notebooks, as listed':p.spiral?'80 pages, 100gsm':'160 numbered pages, 120gsm ivory paper'}</li>`}
          <li>Ruling: ${p.set?'mixed':p.ruling}</li>${p.spiral||p.set||p.brand?'':'<li>Lay-flat binding, elastic closure, ribbon marker and back pocket</li>'}
          ${p.brand?`<li>Brand: ${p.brand} (Vietnam)</li>`:''}</ul></div></details>
        <details><summary>Shipping &amp; Returns</summary><div class="body">Standard shipping $9.95 Australia-wide, free over $${FREE_SHIP}. Unused items can be returned within 30 days. <a href="help.html#shipping" style="border-bottom:1px solid">Full policy</a>.</div></details>
        <details><summary>Paper &amp; Pens</summary><div class="body">Tested with gel, ballpoint, pencil and fine fountain pens. Very wet markers may show through — try them on the last page first.</div></details>
      </div>`;
    document.querySelectorAll('.thumbs button').forEach(b=>b.onclick=()=>{$('#main').innerHTML=+b.dataset.v===0?main0:views[b.dataset.v];document.querySelectorAll('.thumbs button').forEach(x=>x.classList.toggle('on',x===b))});
    $('#main').onclick=e=>{const o=$('#main .ob');if(o){o.classList.toggle('on');peek(id);}};
    $('#main').onmouseenter=()=>{if($('#main .ob')&&matchMedia('(hover:hover)').matches)peek(id)};
    $('#minus').onclick=()=>{qty=Math.max(1,qty-1);$('#qty').textContent=qty};
    $('#plus').onclick=()=>{qty++;$('#qty').textContent=qty};
    $('#buy').onclick=()=>{addToCart(id,qty);openCart()};
    $('#crumb').innerHTML=`<a href="home.html">Home</a> / <a href="shop.html">Shop</a> / ${col?`<a href="collections.html#${p.col}">${col.name}</a> / `:''}${titleOf(id)}`;
    const rel=Object.keys(PRODUCTS).filter(x=>x!==id&&(PRODUCTS[x].col===p.col)).concat(Object.keys(PRODUCTS).filter(x=>x!==id&&PRODUCTS[x].col!==p.col)).slice(0,4);
    $('#related').innerHTML=rel.map(card).join('');
    window.scrollTo(0,0);
  };
  window.addEventListener('hashchange',draw); draw();
}

/* ---------- page: collections ---------- */
function pageCollections(){
  $('#cols').innerHTML=Object.entries(COLLECTIONS).map(([k,c])=>{
    const items=Object.keys(PRODUCTS).filter(id=>PRODUCTS[id].col===k);
    return `<section class="col-block" id="${k}"><div class="col-intro"><div><div class="eyebrow">${c.chapter}</div><h2>${c.name}</h2><div class="native">${c.sub}</div></div>
      <div><p>${c.blurb}</p><p style="margin-top:18px"><a href="shop.html#${k}" class="link">Shop ${c.name}</a></p></div></div>
      <div class="grid ${items.length===3?'three':''}">${items.map(card).join('')}</div></section>`}).join('');
  if(location.hash){const t=document.getElementById(location.hash.slice(1)); if(t) setTimeout(()=>t.scrollIntoView(),50)}
  window.addEventListener('hashchange',()=>{const t=document.getElementById(location.hash.slice(1)); if(t) t.scrollIntoView({behavior:'smooth'})});
}

/* ---------- page: about ---------- */
function pageAbout(){ $('#storyVis').innerHTML=cover('iced-coffee')+cover('arvo'); }

/* ---------- page: journal ---------- */
/* blog list (also called by tools/build.py for the static copy) */
function blogListHTML(){
  return Object.entries(JOURNAL).map(([k,j],i)=>postCard(k,j).replace('class="post"',i===0?'class="post feature"':'class="post"')).join('');
}
function pageJournal(){
  const cats=[...new Set(Object.values(JOURNAL).map(j=>j.cat))];
  $('#bchips').innerHTML=`<a href="#" data-c="">All</a>`+cats.map(c=>`<a href="#${slug(c)}" data-c="${slug(c)}">${c}</a>`).join('');
  $('#jlist').innerHTML=blogListHTML();
  const draw=()=>{const c=location.hash.slice(1);
    document.querySelectorAll('#bchips a').forEach(x=>x.classList.toggle('on',x.dataset.c===c));
    document.querySelectorAll('#jlist .post').forEach(p=>p.hidden=!!c&&p.dataset.cat!==c);
    $('#jlist').classList.toggle('filtered',!!c);};
  window.addEventListener('hashchange',draw); draw();
}
/* one blog post (also called by tools/build.py for the static copy) */
function articleHTML(k){
  const keys=Object.keys(JOURNAL), j=JOURNAL[k], next=keys[(keys.indexOf(k)+1)%keys.length];
  const heads=[...j.body.matchAll(/<h2>(.*?)<\/h2>/g)].map(m=>m[1]);
  const body=j.body.replace(/<h2>(.*?)<\/h2>/g,(m,t)=>`<h2 id="${slug(t)}">${t}</h2>`);
  const toc=heads.length>=3?`<nav class="toc" aria-label="In this post"><b>In this post</b><ol>${heads.map(t=>`<li><a href="#${slug(t)}">${t}</a></li>`).join('')}</ol></nav>`:'';
  const prods=(j.prods||[]).filter(id=>PRODUCTS[id]);
  return `<div class="crumbs"><a href="home.html">Home</a> / <a href="blog.html">Blog</a> / <a href="blog.html#${slug(j.cat)}">${j.cat}</a></div>
    <div style="margin-top:30px"><time class="cat">${j.date}</time> · <span class="cat">${j.cat}</span> · <span class="cat">${readMins(j)} min read</span></div>
    <h1>${j.title}</h1><div class="hero-img" style="background:${j.bg}">${bimg(k,j.alt||j.title,true)}</div>
    <p class="lede">${j.lede}</p>${toc}<div class="body">${body}</div>
    ${prods.length?`<section class="inpost"><h2>Notebooks in this post</h2><div class="grid">${prods.map(card).join('')}</div></section>`:''}
    <div class="end"><a href="blog.html" class="link">← All posts</a><a href="${jurl(next)}" class="link">Next: ${JOURNAL[next].title} →</a></div>`;
}
function pageArticle(){
  const draw=()=>{
    const keys=Object.keys(JOURNAL), fixed=document.body.dataset.handle; let k=fixed||location.hash.slice(1); if(!JOURNAL[k]) k=keys[0];
    if(!fixed) document.title=JOURNAL[k].title+' — Paper Land';
    $('#article').innerHTML=articleHTML(k);
    if(!location.hash||!fixed) window.scrollTo(0,0);
  };
  if(!document.body.dataset.handle) window.addEventListener('hashchange',draw);
  draw();
}

/* ---------- page: help ---------- */
function pageHelp(){
  $('#cForm').addEventListener('submit',e=>{e.preventDefault();track('contact_form_submit');e.target.querySelectorAll('input,select,textarea,button').forEach(x=>x.disabled=true);$('#cOk').style.display='block'});
  if(location.hash){const t=document.getElementById(location.hash.slice(1)); if(t){if(t.tagName==='DETAILS')t.open=true;setTimeout(()=>t.scrollIntoView(),50)}}
}

/* ---------- welcome popup (once per visitor, after a short delay) ---------- */
const WELCOME_KEY='pl-welcome-seen', WELCOME_CODE='HELLO10', WELCOME_DELAY=4000;
function seenWelcome(){try{return localStorage.getItem(WELCOME_KEY)||sessionStorage.getItem(WELCOME_KEY)}catch(e){return false}}
function markWelcome(){try{localStorage.setItem(WELCOME_KEY,'1')}catch(e){try{sessionStorage.setItem(WELCOME_KEY,'1')}catch(e2){}}}
function welcome(){
  if(seenWelcome()||document.body.dataset.nopopup) return;
  const w=document.createElement('div');
  w.className='welcome'; w.setAttribute('role','dialog'); w.setAttribute('aria-modal','true'); w.setAttribute('aria-labelledby','wTitle');
  w.innerHTML=`<div class="w-box">
    <button class="w-x" aria-label="Close">×</button>
    <div class="w-img" aria-hidden="true">
      <div class="spread w-spread"><div><em>today</em><span class="w-stick s1">plan~</span><span class="w-stick s2">☕</span></div><div><span class="w-stick s3">do not disturb</span><span class="w-photo"></span></div></div>
      ${cover('iced-coffee').replace('class="nb','class="nb w-nb')}
      <span class="w-badge">10% off</span>
    </div>
    <div class="w-copy">
      <div class="eyebrow">Welcome to Paper Land</div>
      <h2 id="wTitle">Your first notebook, <mark>10% off.</mark></h2>
      <p>Join the Paper Club for a welcome code, new collection drops and one slow email a month.</p>
      <form class="w-form"><input type="email" required placeholder="Your email address" aria-label="Email address"><button class="btn solid" type="submit">Get my 10% code</button></form>
      <div class="w-done"><p>You're in! Use this code at checkout:</p><button class="w-code" title="Copy code">${WELCOME_CODE}<small>tap to copy</small></button></div>
      <button class="w-no">No thanks, I'll pay full price</button>
      <small class="w-fine">New customers only. One use per order.</small>
    </div></div>`;
  document.body.appendChild(w);
  const close=()=>{w.classList.remove('show');markWelcome();setTimeout(()=>w.remove(),350)};
  w.addEventListener('click',e=>{if(e.target===w)close()});
  w.querySelector('.w-x').onclick=()=>{track('welcome_popup_close');close()}; w.querySelector('.w-no').onclick=()=>{track('welcome_popup_close');close()};
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.contains(w))close()});
  w.querySelector('.w-form').addEventListener('submit',e=>{e.preventDefault();track('generate_lead',{lead_source:'welcome_popup'});markWelcome();w.classList.add('joined')});
  w.querySelector('.w-code').onclick=async e=>{const b=e.currentTarget;try{await navigator.clipboard.writeText(WELCOME_CODE);b.querySelector('small').textContent='copied ✓'}catch(err){b.querySelector('small').textContent='select & copy: '+WELCOME_CODE}};
  setTimeout(()=>{track('welcome_popup_view');w.classList.add('show');w.querySelector('input').focus({preventScroll:true})},WELCOME_DELAY);
}

/* ---------- boot ---------- */
chrome(); drawCart(); welcome();
({home:pageHome,shop:pageShop,product:pageProduct,collections:pageCollections,about:pageAbout,journal:pageJournal,article:pageArticle,help:pageHelp}[document.body.dataset.page]||(()=>{}))();

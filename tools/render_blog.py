#!/usr/bin/env python3
"""Render the blog pictures: top-down desk scenes built from the real cover designs.

    python3 tools/render_blog.py            # every scene
    python3 tools/render_blog.py why-saigon # only these

Writes img/blog/<name>.jpg (1500x1000), <name>-sm.jpg (750x500) and, for post covers,
img/og/journal-<post>.jpg (1200x630 share image). These are illustrations, not photographs.

Needs: pip install playwright pillow && playwright install chromium
Fonts: Montserrat and Caveat come from Google Fonts, or from a local @fontsource folder
named in PL_FONT_DIR when you are offline.
"""
import asyncio, os, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'img', 'blog')
OG = os.path.join(ROOT, 'img', 'og')
FONT_DIR = os.environ.get('PL_FONT_DIR', '')


def fonts():
    if not FONT_DIR:
        return "@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=Montserrat:wght@400;500;600;700&display=swap');"
    f = lambda fam, pkg, w: f"@font-face{{font-family:'{fam}';font-weight:{w};src:url('file://{FONT_DIR}/{pkg}/files/{pkg}-latin-{w}-normal.woff2')}}"
    return ''.join(f('Montserrat', 'montserrat', w) for w in (400, 500, 600, 700)) + ''.join(f('Caveat', 'caveat', w) for w in (400, 500))


CSS = r'''
html,body{margin:0;width:1500px;height:1000px;overflow:hidden;background:#fff}
.sc{position:relative;width:1500px;height:1000px;overflow:hidden}
.sc>*{position:absolute}
.sc::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:50;
  background:radial-gradient(130% 100% at 18% 6%,rgba(255,250,240,.28),rgba(255,250,240,0) 52%),radial-gradient(120% 110% at 100% 100%,rgba(40,25,10,.20),rgba(40,25,10,0) 58%)}
/* surfaces */
.oak{background:#C9A57E;background-image:repeating-linear-gradient(92deg,rgba(120,80,40,.10) 0 2px,transparent 2px 23px),repeating-linear-gradient(88deg,rgba(255,240,215,.10) 0 1px,transparent 1px 61px),linear-gradient(180deg,#CDA982,#BF9a72)}
.pale{background:#E7DCCB;background-image:repeating-linear-gradient(91deg,rgba(150,120,85,.08) 0 2px,transparent 2px 29px),linear-gradient(160deg,#ECE3D4,#DCCDB7)}
.linen{background:#DCE0D2;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.12) 0 1px,transparent 1px 4px),repeating-linear-gradient(90deg,rgba(60,70,50,.06) 0 1px,transparent 1px 5px),linear-gradient(150deg,#E2E6D9,#C9D0BC)}
.stone{background:#CFC7BA;background-image:linear-gradient(rgba(90,80,65,.30) 0 3px,transparent 3px),linear-gradient(90deg,rgba(90,80,65,.30) 0 3px,transparent 3px),linear-gradient(135deg,#D6CEC1,#BDB3A4);background-size:250px 250px,250px 250px,auto}
.blush{background:#EBDDCD;background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.14) 0 1px,transparent 1px 4px),linear-gradient(150deg,#F1E5D6,#DCC4AA)}
.slate{background:#D9DCE2;background-image:repeating-linear-gradient(93deg,rgba(80,90,110,.06) 0 2px,transparent 2px 31px),linear-gradient(150deg,#E2E5EA,#C7CDD8)}
/* a closed notebook seen from above: the cover plus a block of pages peeking out */
.lay{filter:drop-shadow(16px 26px 26px rgba(45,30,15,.40))}
.lay::before{content:"";position:absolute;left:2%;right:-1.2%;top:1.5%;bottom:-1.2%;background:#ECE4D5;border-radius:3px 10px 10px 3px}
.lay .nb{position:relative;width:100%}
/* an open notebook: two pages inside the cover */
.open{display:flex;padding:16px;border-radius:12px;filter:drop-shadow(18px 28px 26px rgba(45,30,15,.38))}
.open .pg{position:relative;width:50%;background-color:#F8F3E9;overflow:hidden}
.open .pg.l{border-radius:4px 0 0 4px;box-shadow:inset -34px 0 30px -24px rgba(60,40,20,.30)}
.open .pg.r{border-radius:0 4px 4px 0;box-shadow:inset 34px 0 30px -24px rgba(60,40,20,.30)}
.dots{background-image:radial-gradient(circle,rgba(70,60,50,.38) 1.5px,transparent 1.8px);background-size:24px 24px;background-position:12px 12px}
.lines{background-image:repeating-linear-gradient(180deg,transparent 0 33px,rgba(90,115,150,.38) 33px 35px);background-position:0 40px}
.rib{position:absolute;width:12px;height:180px;background:#C77D5A;border-radius:0 0 3px 3px;z-index:3}
/* handwriting */
.hw{position:absolute;font-family:Caveat,cursive;color:#27406E;line-height:1.05;white-space:nowrap}
.hw.k{color:#2B2927}
.box{position:absolute;border:2.5px solid #27406E;border-radius:3px 6px 4px 5px}
.hl{position:absolute;height:2.5px;background:#27406E;border-radius:2px}
/* props */
.pen{width:470px;height:19px;border-radius:10px;background:linear-gradient(#3a3835,#1f1d1b 55%,#111);box-shadow:9px 15px 15px rgba(45,30,15,.32);z-index:6}
.pen::before{content:"";position:absolute;left:-36px;top:3.5px;border-style:solid;border-width:6px 38px 6px 0;border-color:transparent #B9B2A6 transparent transparent}
.pen::after{content:"";position:absolute;right:28px;top:-5px;width:130px;height:5px;border-radius:3px;background:#C9C2B6}
.pencil{width:430px;height:16px;background:linear-gradient(#F0C653,#D9A93A);box-shadow:8px 13px 13px rgba(45,30,15,.3);z-index:6}
.pencil::before{content:"";position:absolute;left:-44px;top:0;border-style:solid;border-width:8px 44px 8px 0;border-color:transparent #E9C9A0 transparent transparent}
.pencil::after{content:"";position:absolute;right:-30px;top:0;width:30px;height:16px;background:linear-gradient(90deg,#B8B8B8 0 40%,#E59AA0 40%);border-radius:0 4px 4px 0}
.clip{width:28px;height:70px;border:4px solid #B9B2A6;border-radius:15px;box-shadow:3px 5px 5px rgba(45,30,15,.25)}
.clip::after{content:"";position:absolute;left:4px;top:11px;width:8px;height:40px;border:4px solid #B9B2A6;border-radius:9px}
.note{width:170px;height:170px;background:#F6E9B8;box-shadow:7px 11px 13px rgba(45,30,15,.24)}
.cup{width:270px;height:270px;border-radius:50%;background:#F7F2E9;box-shadow:11px 18px 28px rgba(45,30,15,.32),inset 0 0 0 15px #EFE8DB,inset 0 0 28px rgba(120,95,60,.18)}
.cup i{position:absolute;inset:47px;border-radius:50%;background:#FBF8F2;box-shadow:4px 8px 12px rgba(45,30,15,.26)}
.cup b{position:absolute;inset:60px;border-radius:50%;background:radial-gradient(circle at 38% 34%,var(--drink-hi,#8A5A36) 0,var(--drink,#5A351C) 45%,var(--drink-lo,#3B2110) 100%)}
.cup b::after{content:"";position:absolute;left:18%;top:16%;width:42%;height:26%;border-radius:50%;background:rgba(255,255,255,.16);transform:rotate(-28deg);filter:blur(4px)}
.cup u{position:absolute;right:4px;top:116px;width:58px;height:36px;border-radius:0 19px 19px 0;background:#FBF8F2;box-shadow:4px 6px 8px rgba(45,30,15,.22)}
.cup.tea{--drink-hi:#C79A6C;--drink:#A87A4E;--drink-lo:#8A5E38}
.glass{width:250px;height:250px;border-radius:50%;background:radial-gradient(circle at 40% 36%,#D4A77A,#9C6A41 58%,#714828);box-shadow:0 0 0 12px rgba(255,255,255,.5),0 0 0 14px rgba(200,200,200,.35),12px 20px 26px rgba(30,20,10,.35)}
.glass i{position:absolute;width:62px;height:58px;border-radius:12px;background:rgba(255,255,255,.30);box-shadow:inset 0 0 10px rgba(255,255,255,.45)}
.glass s{position:absolute;left:118px;top:-80px;width:16px;height:220px;border-radius:8px;background:#2B2927;transform:rotate(28deg);transform-origin:50% 100%}
.phin{width:210px;height:210px;border-radius:50%;background:radial-gradient(circle,#D8D5CF 0 30px,#A9A49C 31px 36px,#C9C5BE 37px 92px,#9C978F 93px);box-shadow:10px 16px 22px rgba(30,20,10,.32)}
.stool{width:720px;height:720px;border-radius:50%;background:radial-gradient(circle,#8F2019 0 26px,#C8372D 27px 260px,#B12E25 261px 300px,#C8372D 301px);box-shadow:20px 34px 40px rgba(40,20,10,.38)}
.biscuit{width:140px;height:140px;border-radius:50%;background:#D8A86C;background-image:radial-gradient(circle,rgba(120,70,30,.45) 3px,transparent 3.5px);background-size:30px 30px;background-position:10px 10px;box-shadow:6px 10px 12px rgba(45,30,15,.3),inset 0 0 0 8px rgba(255,235,200,.25)}
.kraft{background:#C59E74;background-image:repeating-linear-gradient(15deg,rgba(255,255,255,.05) 0 2px,transparent 2px 7px),repeating-linear-gradient(-30deg,rgba(90,60,30,.06) 0 1px,transparent 1px 9px)}
.boxlid{border-radius:6px;box-shadow:inset 0 0 0 16px rgba(110,75,40,.18),22px 34px 40px rgba(45,30,15,.38)}
.ribbon{background:#C77D5A;box-shadow:0 2px 6px rgba(60,30,10,.25)}
.tag{width:150px;height:96px;clip-path:polygon(18% 0,100% 0,100% 100%,18% 100%,0 50%);box-shadow:none}
.tagw{filter:drop-shadow(6px 10px 9px rgba(45,30,15,.3));z-index:8}
.tagw::after{content:"";position:absolute;left:24px;top:41px;width:14px;height:14px;border-radius:50%;background:rgba(60,40,20,.55)}
.sheet{background-color:#F8F3E9;box-shadow:12px 20px 24px rgba(45,30,15,.30)}
.coil{position:absolute;left:0;right:0;top:-18px;height:36px;background-image:radial-gradient(ellipse 9px 18px at 50% 50%,transparent 0 5px,#9C978F 5.5px 8px,transparent 8.5px);background-size:30px 36px;z-index:4}
.laptop{background:#B9BDC3;border-radius:22px;box-shadow:18px 26px 34px rgba(30,30,40,.30)}
.laptop::before{content:"";position:absolute;left:90px;right:90px;top:70px;height:330px;border-radius:8px;background-color:#3B3E43;background-image:linear-gradient(90deg,#2A2C30 0 6px,transparent 6px),linear-gradient(#2A2C30 0 6px,transparent 6px);background-size:58px 58px}
.laptop::after{content:"";position:absolute;left:300px;width:300px;top:440px;height:150px;border-radius:12px;background:#AEB2B8;box-shadow:inset 0 0 0 2px rgba(0,0,0,.06)}
.glass.tea{background:radial-gradient(circle at 40% 36%,#E8C489,#C28A3E 58%,#9E6A27)}
'''

lay = lambda c, x, y, w, r=0, z=5: f'<div class="lay" style="left:{x}px;top:{y}px;width:{w}px;transform:rotate({r}deg);z-index:{z}">{c}</div>'


def hw(text, x, y, size=44, r=0, k=False, w=500):
    return f'<div class="hw{" k" if k else ""}" style="left:{x}px;top:{y}px;font-size:{size}px;font-weight:{w};transform:rotate({r}deg)">{text}</div>'


def scenes(cv):
    """cv: id -> cover html. Returns {name: (post or None, html)}."""
    S = {}
    # --- spiral vs hardcover: a hardcover and the spiral Pocket Notes side by side
    S['spiral-vs-hardcover-notebook'] = ('spiral-vs-hardcover-notebook', f'''<div class="sc pale">
      <div class="note" style="left:120px;top:90px;transform:rotate(-8deg)"></div>{hw('lecture 4',150,140,40,-8)}
      {lay(cv['iced-coffee'],330,150,420,-7)}
      {lay(cv['pocket-notes'],860,330,330,9)}
      <div class="pen" style="left:880px;top:180px;transform:rotate(-14deg)"></div>
      <div class="clip" style="left:1280px;top:110px;transform:rotate(30deg)"></div><div class="clip" style="left:1340px;top:150px;transform:rotate(-12deg)"></div>
      <div class="clip" style="left:230px;top:820px;transform:rotate(-40deg)"></div></div>''')
    # inline: Pocket Notes open, a list on a spiral page beside a laptop
    S['spiral-pocket-notes-list'] = (None, f'''<div class="sc slate">
      <div class="laptop" style="left:-300px;top:-170px;width:900px;height:620px;transform:rotate(-6deg)"></div>
      <div class="sheet dots" style="left:640px;top:250px;width:520px;height:520px;border-radius:6px;transform:rotate(7deg);z-index:5">
        <div class="coil"></div>
        {hw('to do',60,60,62,0)}
        {hw('☐ milk + bread',60,150,48)}{hw('☑ post the parcel',60,220,48)}{hw('☐ call Mum',60,290,48)}{hw('☐ library books',60,360,48)}</div>
      <div class="pencil" style="left:820px;top:860px;transform:rotate(-8deg)"></div></div>''')
    # --- notebook paper: an open spread, dot grid and lined pages
    S['notebook-paper-guide'] = ('notebook-paper-guide', f'''<div class="sc oak">
      <div class="open" style="left:250px;top:150px;width:1000px;height:680px;background:#2B2927;transform:rotate(-3deg);z-index:5">
        <div class="pg l dots">{hw('120gsm, ivory',70,60,58)}{hw('dot grid · 5mm',70,140,44)}
          <div class="box" style="left:72px;top:230px;width:190px;height:140px"></div><div class="box" style="left:290px;top:230px;width:120px;height:140px"></div>{hw('sketch',95,282,40)}</div>
        <div class="pg r lines">{hw('lined',60,48,58)}{hw('Notes from Tuesday —',60,118,40)}{hw('the paper takes gel pen',60,152,40)}{hw('without showing through.',60,186,40)}{hw('Fountain pen is fine too.',60,254,40)}</div>
        <div class="rib" style="left:520px;top:640px"></div></div>
      <div class="pen" style="left:1000px;top:870px;transform:rotate(-10deg)"></div>
      <div class="pencil" style="left:120px;top:60px;transform:rotate(6deg)"></div></div>''')
    # inline: three page rulings side by side
    sw = lambda cls, x, r, label: f'<div class="sheet {cls}" style="left:{x}px;top:200px;width:360px;height:500px;border-radius:4px;transform:rotate({r}deg);z-index:5">{hw(label,40,30,58)}</div>'
    S['notebook-paper-rulings'] = (None, f'''<div class="sc linen">{sw('dots',150,-4,'dot grid')}{sw('lines',570,2,'lined')}{sw('',990,5,'plain')}
      <div class="pen" style="left:540px;top:820px;transform:rotate(-4deg)"></div></div>''')
    # --- gifts: the Saigon set in a kraft box with a ribbon and a tag
    S['notebook-and-paper-gifts'] = ('notebook-and-paper-gifts', f'''<div class="sc blush">
      <div class="kraft boxlid" style="left:190px;top:110px;width:900px;height:780px;transform:rotate(-4deg)"></div>
      {lay(cv['alleyway'],250,230,290,-13,6)}{lay(cv['iced-coffee'],500,190,290,-1,7)}{lay(cv['street-food'],750,240,290,12,8)}
      <div class="ribbon" style="left:120px;top:760px;width:1060px;height:44px;transform:rotate(-9deg);z-index:9"></div>
      <div class="tagw" style="left:1080px;top:600px;transform:rotate(14deg)"><div class="tag kraft" style="background-color:#E6D3B8"></div>{hw('for you',48,22,46)}</div>
      <svg style="left:1050px;top:300px;z-index:4" width="380" height="380" viewBox="0 0 380 380" aria-hidden="true"><path d="M20 360 C 140 260, 220 160, 360 20" stroke="#6E7F5E" stroke-width="5" fill="none"/>
        <g fill="#8FA27E"><ellipse cx="90" cy="300" rx="30" ry="16" transform="rotate(-40 90 300)"/><ellipse cx="140" cy="250" rx="32" ry="17" transform="rotate(20 140 250)"/><ellipse cx="190" cy="205" rx="30" ry="16" transform="rotate(-50 190 205)"/><ellipse cx="240" cy="150" rx="31" ry="16" transform="rotate(15 240 150)"/><ellipse cx="290" cy="100" rx="28" ry="15" transform="rotate(-45 290 100)"/></g></svg></div>''')
    # inline: the Adelaide Arvo set laid out with a tag
    S['notebook-gifts-arvo-set'] = (None, f'''<div class="sc linen">
      {lay(cv['arvo'],200,180,340,-9)}{lay(cv['brekkie'],590,140,340,3)}{lay(cv['cuppa'],980,200,340,10)}
      <div class="tagw" style="left:640px;top:760px;transform:rotate(-6deg)"><div class="tag" style="background:#F4EEE4"></div>{hw('Merry Xmas x',40,24,40)}</div>
      <svg style="left:300px;top:700px;z-index:7" width="400" height="200" aria-hidden="true"><path d="M10 150 C 120 40, 240 200, 390 90" stroke="#B98B5E" stroke-width="4" fill="none"/></svg></div>''')
    # --- why Saigon: the notebook on a red plastic stool, iced coffee and a phin on the pavement
    S['why-saigon'] = ('why-saigon', f'''<div class="sc stone">
      <div class="stool" style="left:300px;top:150px"></div>
      {lay(cv['iced-coffee'],420,230,380,-10,6)}
      <div class="glass" style="left:840px;top:330px;z-index:7"><i style="left:52px;top:60px;transform:rotate(18deg)"></i><i style="left:128px;top:96px;transform:rotate(-12deg)"></i><i style="left:76px;top:140px;transform:rotate(36deg)"></i><s></s></div>
      <div class="glass tea" style="left:1120px;top:620px;width:200px;height:200px"><i style="left:44px;top:50px;transform:rotate(-14deg)"></i><i style="left:104px;top:86px;transform:rotate(22deg)"></i></div>
      <div class="clip" style="left:180px;top:760px;transform:rotate(24deg)"></div></div>''')
    # --- arvo reset: Done / Next / Later / Cuppa spread with a cuppa and a biscuit
    S['arvo-reset'] = ('arvo-reset', f'''<div class="sc linen">
      <div class="open" style="left:200px;top:170px;width:900px;height:620px;background:#A9B49C;transform:rotate(-4deg);z-index:5">
        <div class="pg l dots">{hw('3pm reset',60,40,60)}
          <div class="hl" style="left:40px;top:300px;width:360px"></div><div class="hl" style="left:220px;top:120px;width:2.5px;height:440px"></div>
          {hw('Done',60,130,48)}{hw('✓ emails',60,190,38)}{hw('✓ invoice',60,235,38)}
          {hw('Next',250,130,48)}{hw('call Sam',250,190,38)}{hw('order paper',250,235,38)}
          {hw('Later',60,330,48)}{hw('tidy desk',60,390,38)}
          {hw('Cuppa',250,330,48)}{hw('☕ yes',250,390,38)}</div>
        <div class="pg r dots">{hw('tomorrow',50,40,52)}{hw('· finish the brief',50,120,38)}{hw('· book the dentist',50,170,38)}{hw('· walk at 5',50,220,38)}{hw('one thing at a time.',50,330,40,-3)}</div><div class="rib" style="left:470px;top:590px;background:#7E8466"></div></div>
      <div class="cup tea" style="left:1120px;top:120px"><i></i><b></b><u></u></div>
      <div class="biscuit" style="left:1180px;top:560px"></div><div class="biscuit" style="left:1250px;top:690px;transform:scale(.85)"></div>
      <div class="pencil" style="left:760px;top:880px;transform:rotate(-6deg)"></div></div>''')
    # --- bullet journal: index and future log
    months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']
    fl = ''.join(f'<div class="box" style="left:{40 + (i % 2) * 200}px;top:{120 + (i // 2) * 150}px;width:180px;height:132px"></div>' + hw(m, 54 + (i % 2) * 200, 128 + (i // 2) * 150, 36) for i, m in enumerate(months))
    S['bullet-journal'] = ('bullet-journal', f'''<div class="sc pale">
      <div class="open" style="left:230px;top:150px;width:960px;height:660px;background:#9DADC9;transform:rotate(3deg);z-index:5">
        <div class="pg l dots">{hw('Index',60,40,64)}{hw('1–2 · future log',60,140,40)}{hw('3 · December',60,195,40)}{hw('4 · daily log',60,250,40)}{hw('• task  ○ event  – note',60,350,36)}</div>
        <div class="pg r dots">{hw('Future log',40,30,56)}{fl}</div><div class="rib" style="left:500px;top:630px"></div></div>
      <div class="pen" style="left:80px;top:850px;transform:rotate(-6deg)"></div>
      <div class="note" style="left:1220px;top:90px;transform:rotate(9deg)"></div>{hw('start small',1240,150,40,9)}
      <div class="clip" style="left:1300px;top:780px;transform:rotate(-28deg)"></div></div>''')
    return S


async def main():
    from playwright.async_api import async_playwright
    only = [a for a in sys.argv[1:] if not a.startswith('-')]
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        pg = await b.new_page(viewport={'width': 1500, 'height': 1000})
        await pg.goto('file://' + os.path.join(ROOT, 'shop.html'))
        await pg.add_style_tag(content=fonts() + CSS)
        cv = await pg.evaluate('Object.fromEntries(Object.keys(PRODUCTS).map(id=>[id,cover(id)]))')
        n = 0
        for name, (post, html) in scenes(cv).items():
            if only and name not in only:
                continue
            await pg.evaluate('h=>{document.body.className="";document.body.innerHTML=h}', html)
            await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(200)
            big = os.path.join(OUT, f'{name}.jpg')
            await pg.screenshot(path=big, type='jpeg', quality=82, clip={'x': 0, 'y': 0, 'width': 1500, 'height': 1000})
            im = Image.open(big)
            im.resize((750, 500), Image.LANCZOS).save(os.path.join(OUT, f'{name}-sm.jpg'), quality=80, optimize=True, progressive=True)
            if post:   # share image: centre band of the scene at 1.91:1
                im.crop((0, 107, 1500, 893)).resize((1200, 630), Image.LANCZOS).save(os.path.join(OG, f'journal-{post}.jpg'), quality=84, optimize=True)
            n += 1
        await b.close()
    print(f'rendered {n} blog pictures into img/blog/')


if __name__ == '__main__':
    asyncio.run(main())

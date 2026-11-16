#!/usr/bin/env python3
"""Render product pictures from the 3D notebook model.

    python3 tools/render_shots.py            # every product without real photos
    python3 tools/render_shots.py arvo cuppa # only these

Writes img/p/<id>-1.jpg … (1000x1000): 1 studio front, 2 back and spine, 3 flat-lay, 4 close-up.
Gift sets get two pictures. These are renders of the cover designs, not photographs.

Needs: pip install playwright && playwright install chromium
"""
import asyncio, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.environ.get('PL_FONT_DIR', '')
OUT = os.path.join(ROOT, 'img', 'p')

# wall, table, flat-lay surface per collection
TONES = {
    'saigon': ('#EBE2D6', '#DDD0BF', '#D5BFA2'),
    'adelaide': ('#E3E7DC', '#D2D9C8', '#BFC9B1'),
    'studio': ('#E5E8F0', '#D3D9E6', '#BCC6DA'),
    'crabit': ('#E9E4DC', '#DAD2C5', '#CDBFAB'),
    'sets': ('#EFE8DC', '#E0D5C3', '#D8C6AB'),
}

# the 3D notebook model (a cover on a box with spine, back and page edges), injected at render time
BOOK3D_CSS = r'''
/* ======================================================
   3D notebook model (book3d() in app.js) — used by the
   home carousel and by tools/render_shots.py
   ====================================================== */
.b3{position:relative;width:var(--w,200px);aspect-ratio:5/7;transform-style:preserve-3d;--d:calc(var(--w,200px)*.085)}
.b3.sq{aspect-ratio:1/1;--d:calc(var(--w,200px)*.05)}
.b3>i{position:absolute;display:block}
.b3 .nb{width:100%;height:100%;aspect-ratio:auto;box-shadow:inset 7px 0 0 rgba(0,0,0,.07),inset 9px 0 6px -4px rgba(0,0,0,.12)}
.b3-f{inset:0;transform:translateZ(calc(var(--d)/2));backface-visibility:hidden}
.b3-f::after{content:"";position:absolute;inset:0;border-radius:3px 12px 12px 3px;pointer-events:none;background:linear-gradient(100deg,rgba(255,255,255,.13),rgba(255,255,255,0) 38%,rgba(0,0,0,.10))}
.b3-b{inset:0;background:var(--c);border-radius:12px 3px 3px 12px;transform:rotateY(180deg) translateZ(calc(var(--d)/2));backface-visibility:hidden;overflow:hidden;
  box-shadow:inset -7px 0 0 rgba(0,0,0,.07),inset -9px 0 6px -4px rgba(0,0,0,.12)}
.b3-b::before{content:"";position:absolute;top:0;bottom:0;left:14%;width:5%;background:#1b1a19;opacity:.92}
.b3-b::after{content:"Paper Land";position:absolute;right:12%;bottom:7%;font-size:calc(var(--w,200px)*.038);font-weight:600;letter-spacing:.02em;opacity:.7;color:var(--bc,#1F1D1B)}
.b3.sq .b3-b::before{display:none}
.b3-s{left:0;top:0;bottom:0;width:var(--d);background:var(--c);transform:translateX(calc(var(--d)/-2)) rotateY(-90deg)}
.b3-s::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.28),rgba(0,0,0,.10) 45%,rgba(0,0,0,.24))}
.b3-pr{right:0;top:1.2%;bottom:1.2%;width:var(--d);transform:translateX(calc(var(--d)/2 - 2px)) rotateY(90deg);
  background:repeating-linear-gradient(90deg,#f1ebdf 0 1px,#d6cdbb 1px 2px)}
.b3-pt,.b3-pb{left:1%;right:1.5%;height:var(--d);background:repeating-linear-gradient(0deg,#f1ebdf 0 1px,#d6cdbb 1px 2px)}
.b3-pt{top:0;transform:translateY(calc(var(--d)/-2 + 2px)) rotateX(90deg)}
.b3-pb{bottom:0;transform:translateY(calc(var(--d)/2 - 2px)) rotateX(-90deg);filter:brightness(.8)}
'''
BOOK3D_JS = r'''
/* 3D notebook: the same cover on a box with a spine, a back and page edges */
function book3d(id){
  const p=PRODUCTS[id], c=p.spiral?C.dusk:p.bg;
  return `<div class="b3${p.spiral?' sq':''}" style="--c:${c};--bc:${p.dark?'#d9d2c8':'#1F1D1B'}"><i class="b3-f">${cover(id)}</i><i class="b3-b"></i><i class="b3-s"></i><i class="b3-pr"></i><i class="b3-pt"></i><i class="b3-pb"></i></div>`;
}
'''

CSS = '''
html,body{margin:0;width:1000px;height:1000px;overflow:hidden;background:#fff}
.sc{position:relative;width:1000px;height:1000px;overflow:hidden;perspective:2400px;perspective-origin:50% 42%}
.sc.wall{background:linear-gradient(var(--bg) 0 64%,var(--fl) 64% 100%)}
.sc.wall::after{content:"";position:absolute;left:0;right:0;top:64%;height:90px;background:linear-gradient(rgba(60,45,30,.10),rgba(60,45,30,0))}
.sc .b3{position:absolute}
.sc>div{z-index:2}
.sc>.sh{z-index:1}
.sh{position:absolute;border-radius:50%;background:rgba(48,34,20,.5);filter:blur(30px)}
.sc.flat{background:var(--sf)}
.sc.flat::after{content:"";position:absolute;inset:0;background:radial-gradient(120% 90% at 20% 10%,rgba(255,255,255,.22),rgba(255,255,255,0) 55%),radial-gradient(90% 80% at 100% 100%,rgba(40,25,10,.16),rgba(40,25,10,0) 60%);pointer-events:none}
.lay{position:absolute;filter:drop-shadow(14px 22px 22px rgba(45,30,15,.38))}
.lay .nb{width:100%}
.lay::before{content:"";position:absolute;left:2%;right:-1.2%;top:1.5%;bottom:-1.2%;background:#e9e1d2;border-radius:3px 10px 10px 3px}
.lay .nb{position:relative}
.cup{position:absolute;width:250px;height:250px;border-radius:50%;background:#F7F2E9;box-shadow:10px 16px 26px rgba(45,30,15,.3),inset 0 0 0 14px #EFE8DB,inset 0 0 26px rgba(120,95,60,.18)}
.cup i{position:absolute;inset:44px;border-radius:50%;background:#FBF8F2;box-shadow:4px 8px 12px rgba(45,30,15,.28)}
.cup b{position:absolute;inset:56px;border-radius:50%;background:radial-gradient(circle at 38% 34%,#8a5a36 0,#5a351c 45%,#3b2110 100%)}
.cup b::after{content:"";position:absolute;left:18%;top:16%;width:42%;height:26%;border-radius:50%;background:rgba(255,255,255,.16);transform:rotate(-28deg);filter:blur(4px)}
.cup u{position:absolute;right:6px;top:108px;width:54px;height:34px;border-radius:0 18px 18px 0;background:#FBF8F2;box-shadow:4px 6px 8px rgba(45,30,15,.22)}
.pen{position:absolute;width:430px;height:17px;border-radius:9px;background:linear-gradient(#3a3835,#1f1d1b 55%,#111);box-shadow:8px 14px 14px rgba(45,30,15,.32)}
.pen::before{content:"";position:absolute;left:-34px;top:3px;border-style:solid;border-width:5.5px 36px 5.5px 0;border-color:transparent #b9b2a6 transparent transparent}
.pen::after{content:"";position:absolute;right:26px;top:-5px;width:120px;height:5px;border-radius:3px;background:#c9c2b6}
.clip{position:absolute;width:26px;height:66px;border:4px solid #b9b2a6;border-radius:14px;box-shadow:3px 5px 5px rgba(45,30,15,.25)}
.clip::after{content:"";position:absolute;left:3px;top:10px;width:8px;height:38px;border:4px solid #b9b2a6;border-radius:9px}
.note{position:absolute;width:150px;height:150px;background:#F6E9B8;box-shadow:6px 10px 12px rgba(45,30,15,.24)}
.note::before,.note::after{content:"";position:absolute;left:22px;height:4px;border-radius:2px;background:rgba(60,50,30,.45)}
.note::before{top:40px;width:86px}.note::after{top:62px;width:58px}
'''


def fonts():
    if not FONT_DIR:
        return ''
    return ''.join(f"@font-face{{font-family:'Montserrat';font-weight:{w};src:url('file://{FONT_DIR}/montserrat/files/montserrat-latin-{w}-normal.woff2')}}" for w in (400, 500, 600, 700))


def scenes(p, pid, book, cover):
    """Return a list of scene HTML strings for one product."""
    bg, fl, sf = TONES.get(p['col'], TONES['sets'])
    tone = f'--bg:{bg};--fl:{fl};--sf:{sf}'
    sq = bool(p.get('spiral'))
    if p.get('set'):
        b = book  # dict id -> html
        ids = p['set']
        fan = ''.join(f'<div style="position:absolute;left:{x}px;top:{y}px;width:{w}px;height:{w*1.4}px;--w:{w}px;transform-style:preserve-3d;transform:rotateY({ry}deg) rotateX(4deg)">{b[i]}</div>'
                      for i, (x, y, ry, w) in zip(ids, [(70, 330, -30, 270), (350, 290, -30, 300), (660, 330, -30, 270)]))
        lay = ''.join(f'<div class="lay" style="left:{x}px;top:{y}px;width:{w}px;transform:rotate({r}deg)">{cover[i]}</div>'
                      for i, (x, y, r, w) in zip(ids, [(110, 230, -14, 330), (350, 190, 2, 330), (575, 250, 13, 330)]))
        return [
            f'<div class="sc wall" style="{tone}"><div class="sh" style="left:90px;top:694px;width:820px;height:70px"></div>{fan}</div>',
            f'<div class="sc flat" style="{tone}">{lay}<div class="pen" style="left:300px;top:850px;transform:rotate(-4deg)"></div></div>',
        ]
    w1 = 440 if sq else 420
    h1 = w1 if sq else w1 * 7 / 5
    top1 = 790 - h1
    left1 = 500 - w1 / 2
    s1 = (f'<div class="sc wall" style="{tone}"><div class="sh" style="left:{left1-50}px;top:752px;width:{w1+120}px;height:70px"></div>'
          f'<div style="position:absolute;left:{left1}px;top:{top1}px;width:{w1}px;height:{h1}px;--w:{w1}px;transform-style:preserve-3d;transform:rotateY(-30deg) rotateX(4deg)">{book}</div></div>')
    s2 = (f'<div class="sc wall" style="{tone}"><div class="sh" style="left:{left1-70}px;top:752px;width:{w1+120}px;height:70px"></div>'
          f'<div style="position:absolute;left:{left1}px;top:{top1}px;width:{w1}px;height:{h1}px;--w:{w1}px;transform-style:preserve-3d;transform:rotateY(148deg) rotateX(4deg)">{book}</div></div>')
    lw = 430 if sq else 410
    s3 = (f'<div class="sc flat" style="{tone}">'
          f'<div class="note" style="left:118px;top:120px;transform:rotate(-7deg)"></div>'
          f'<div class="lay" style="left:{250 if sq else 270}px;top:{300 if sq else 215}px;width:{lw}px;transform:rotate(-9deg)">{cover}</div>'
          f'<div class="cup" style="left:690px;top:95px"><i></i><b></b><u></u></div>'
          f'<div class="pen" style="left:520px;top:800px;transform:rotate(-58deg)"></div>'
          f'<div class="clip" style="left:150px;top:820px;transform:rotate(38deg)"></div><div class="clip" style="left:215px;top:850px;transform:rotate(-22deg)"></div></div>')
    w4 = 900
    s4 = (f'<div class="sc wall" style="{tone};perspective:2000px"><div class="sh" style="left:60px;top:880px;width:900px;height:120px"></div>'
          f'<div style="position:absolute;left:-160px;top:{260 if sq else 210}px;width:{w4}px;height:{w4 if sq else w4*1.4}px;--w:{w4}px;transform-style:preserve-3d;transform:rotateY(-40deg) rotateX(10deg)">{book}</div></div>')
    return [s1, s2, s3, s4]


async def main():
    from playwright.async_api import async_playwright
    only = [a for a in sys.argv[1:] if not a.startswith('-')]
    os.makedirs(OUT, exist_ok=True)
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        pg = await b.new_page(viewport={'width': 1000, 'height': 1000})
        await pg.goto('file://' + os.path.join(ROOT, 'shop.html'))
        await pg.add_style_tag(content=fonts() + BOOK3D_CSS + CSS)
        await pg.add_script_tag(content=BOOK3D_JS + '\nwindow.book3d=book3d;')
        P = await pg.evaluate('PRODUCTS')
        n = 0
        for pid, p in P.items():
            if p.get('imgs') or (only and pid not in only):
                continue
            if p.get('set'):
                book = {i: await pg.evaluate('id=>book3d(id)', i) for i in p['set']}
                cover = {i: await pg.evaluate('id=>cover(id)', i) for i in p['set']}
            else:
                book = await pg.evaluate('id=>book3d(id)', pid)
                cover = await pg.evaluate('id=>cover(id)', pid)
            for k, html in enumerate(scenes(p, pid, book, cover), 1):
                await pg.evaluate('h=>{document.body.className="";document.body.innerHTML=h}', html)
                await pg.evaluate('document.fonts.ready')
                await pg.wait_for_timeout(180)
                await pg.screenshot(path=os.path.join(OUT, f'{pid}-{k}.jpg'), type='jpeg', quality=82, clip={'x': 0, 'y': 0, 'width': 1000, 'height': 1000})
                n += 1
        await b.close()
    print(f'rendered {n} pictures into img/p/')


if __name__ == '__main__':
    asyncio.run(main())

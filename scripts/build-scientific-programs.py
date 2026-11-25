# Regenerates src/content/scientific-programs from the three NZUSICON 2026 .docx files.
# Usage (needs pandoc and beautifulsoup4), from a folder holding the documents as prog.docx, selected.docx, subs.docx:
#   for f in prog selected subs; do pandoc $f.docx -t html --wrap=none -o $f.html; done
#   python3 <repo>/scripts/build-scientific-programs.py <repo>
# Images (cover, participation page) live in public/images/nzusicon-2026/.
"""Convert the three NZUSICON 2026 documents into HTML sections for the
Scientific Programs & Selected Abstracts page.

Output: <repo>/src/content/scientific-programs/sections/<slug>.ts (default export: HTML string)
        <repo>/src/content/scientific-programs/index.ts (slug -> lazy import)
"""
import json, re, sys, copy, html as H
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

REPO = Path(sys.argv[1])
BASE = '/scientific-programs-and-selected-abstracts'
OUT = REPO / 'src/content/scientific-programs/sections'
OUT.mkdir(parents=True, exist_ok=True)

def soup(path):
    return BeautifulSoup(Path(path).read_text(), 'html.parser')

def top(s):
    return [k for k in s.children if isinstance(k, Tag)]

def text(t):
    return t.get_text(' ', strip=True) if isinstance(t, Tag) else str(t).strip()

def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def clean(el):
    """Strip inline styles/colgroups, wrap tables, harden links."""
    for t in el.find_all(True):
        for a in list(t.attrs):
            if a.startswith('on') or a in ('style', 'class', 'width', 'valign', 'align'):
                del t[a]
    for cg in el.find_all('colgroup'):
        cg.decompose()
    for u in el.find_all('u'):
        u.unwrap()
    for a in el.find_all('a', href=True):
        if a['href'].startswith('http'):
            a['target'] = '_blank'
            a['rel'] = 'noopener noreferrer'
    for p in el.find_all('p'):
        if not text(p) and not p.find(['img', 'span']):
            p.decompose()
    return el

def wrap_tables(html):
    """Wrap each outermost table in a horizontally scrollable box."""
    s = BeautifulSoup(html, 'html.parser')
    for t in s.find_all('table'):
        if t.find_parent('table') is None and not (t.parent and 'sp-table' in (t.parent.get('class') or [])):
            box = s.new_tag('div', attrs={'class': 'sp-table'})
            t.wrap(box)
    return str(s)

sections = {}  # slug -> html

def emit(slug, parts):
    html = ''.join(str(clean(copy.copy(p))) if isinstance(p, Tag) else p for p in parts)
    sections[slug] = wrap_tables(html)

# ───────────────────────── 1. Scientific programme ─────────────────────────
P = top(soup('prog.html'))
DATE_RE = re.compile(r'^\d{1,2} Nov 2026\s*\|', re.I)
DAYMARK_RE = re.compile(r'^(DAY \d \| \d+ Nov 2026|\d+ NOV 2026 \| DAY \d)$', re.I)
HALL_RE = re.compile(r'^Hall [A-D]$', re.I)

def idx(pred, start=0):
    for i in range(start, len(P)):
        if pred(P[i]):
            return i
    raise ValueError

i_glance = idx(lambda k: 'SCIENTIFIC PROGRAMME AT A GLANCE' in text(k))
i_msg = idx(lambda k: text(k) == 'MESSAGE FROM THE HONORARY SECRETARY')
i_toc = idx(lambda k: text(k) == 'TABLE OF CONTENTS')
i_day = [idx(lambda k, d=d: text(k).startswith(f'DAY {d} - PROGRAMME SCHEDULE')) for d in (1, 2, 3)]
i_sci = idx(lambda k: text(k) == 'SCIENTIFIC PROGRAM')
i_dayprog = [idx(lambda k, d=d: re.match(rf'^DAY {d} \| ', text(k)) is not None, i_sci) for d in (1, 2, 3)]
i_unmod_p = idx(lambda k: text(k) == 'UNMODERATED POSTERS', i_sci)
i_unmod_v = idx(lambda k: text(k) == 'UNMODERATED VIDEOS', i_sci)
i_fac = idx(lambda k: text(k) == 'CONVENOR AND FACULTY INDEX', i_sci)

COVER = ('<figure class="sp-figure"><img src="/images/nzusicon-2026/scientific-programme-cover.webp" '
         'alt="NZUSICON 2026 Scientific Programme cover – 27–29 November 2026, Amritsar" loading="lazy"/></figure>')
PARTICIPATION = ('<figure class="sp-figure"><img src="/images/nzusicon-2026/programme-designed-for-participation.webp" '
                 'alt="A scientific programme designed for participation – NZUSICON 2026" loading="lazy"/></figure>')

glance = [P[i_glance + 1]]  # theme line
emit('programme-at-a-glance',
     ['<div class="sp-intro">', COVER, '<div>', '<h2>Programme at a Glance</h2>', *glance, '</div></div>',
      *P[i_glance + 2:i_msg]])

msg = P[i_msg + 1:i_toc]
emit('message-from-hon-secretary', ['<h2>Message from the Honorary Secretary</h2>', *msg, PARTICIPATION])

def session_block(nodes, hall_prefix):
    """Turn programme nodes into session cards."""
    out, card = [], None
    k = 0
    while k < len(nodes):
        n = nodes[k]
        t = text(n)
        nxt = nodes[k + 1] if k + 1 < len(nodes) else None
        if DAYMARK_RE.match(t) or not t and not n.find(['img', 'span']):
            k += 1
            continue
        if HALL_RE.match(t):
            if card: out.append('</div>'); card = None
            out.append(f'<h2 class="sp-hall" id="{hall_prefix}{slugify(t)}">{H.escape(t)}</h2>')
            k += 1
            continue
        if n.name in ('blockquote', 'p') and nxt is not None and DATE_RE.match(text(nxt)) and not DATE_RE.match(t):
            if card: out.append('</div>')
            anchors = ''.join(f'<span id="{s["id"]}"></span>' for s in n.find_all(id=True))
            out.append(f'<div class="sp-session">{anchors}<h3>{H.escape(t)}</h3>'
                       f'<p class="sp-meta">{H.escape(text(nxt).rstrip("| ").strip())}</p>')
            card = True
            k += 2
            continue
        if n.name == 'blockquote':
            anchors = ''.join(f'<span id="{s["id"]}"></span>' for s in n.find_all(id=True))
            out.append(f'<h4>{anchors}{n.decode_contents() if n.find("p") is None else "".join(p.decode_contents() for p in n.find_all("p"))}</h4>')
            k += 1
            continue
        out.append(n)
        k += 1
    if card: out.append('</div>')
    return out

day_names = {1: 'Friday, 27 November 2026', 2: 'Saturday, 28 November 2026', 3: 'Sunday, 29 November 2026'}
ends = [i_dayprog[1], i_dayprog[2], i_unmod_p]
for d in (1, 2, 3):
    ov_start, ov_end = i_day[d - 1], (i_day[d] if d < 3 else i_sci)
    overview = [n for n in P[ov_start + 2:ov_end]]
    detail = P[i_dayprog[d - 1]:ends[d - 1]]
    halls = [text(n) for n in detail if HALL_RE.match(text(n))]
    chips = ''.join(f'<a class="sp-chip" href="#day-{d}-{slugify(h)}">{h}</a>' for h in halls)
    emit(f'day-{d}',
         [f'<h2>Day {d} — {day_names[d]}</h2>',
          '<details class="sp-overview" open><summary>Schedule overview (all halls)</summary>', *overview, '</details>',
          f'<nav class="sp-chips" aria-label="Halls">{chips}</nav>',
          *session_block(detail, f'day-{d}-')])

emit('unmoderated-posters-and-videos',
     ['<h2>Unmoderated Posters</h2>', *[n for n in P[i_unmod_p + 1:i_unmod_v]],
      '<h2>Unmoderated Videos</h2>', *[n for n in P[i_unmod_v + 1:i_fac]]])

# Faculty index: point the internal jump links at the day page holding each anchor
anchor_page = {}
for slug, html in sections.items():
    for a in re.findall(r'id="(faculty_jump_\d+)"', html):
        anchor_page[a] = slug
fac = [P[i_fac + 1], *P[i_fac + 2:]]
fac_html = ''.join(str(clean(copy.copy(n))) for n in fac)
missing = []
def fix(m):
    a = m.group(1)
    if a in anchor_page:
        return f'href="{BASE}/{anchor_page[a]}#{a}"'
    missing.append(a)
    return f'href="#{a}"'
fac_html = re.sub(r'href="#(faculty_jump_\d+)"', fix, fac_html)
sections['faculty-index'] = wrap_tables('<h2>Convenor and Faculty Index</h2>' + fac_html)
print('faculty anchors mapped:', len(anchor_page), 'unmapped links:', sorted(set(missing))[:10])

# ───────────────────────── 2. Selected abstracts ─────────────────────────
S = top(soup('selected.html'))
heads = [(i, text(k)) for i, k in enumerate(S) if k.name == 'p' and k.find('strong') and len(text(k)) < 80
         and not text(k).startswith(('Authors', 'Institute'))]
groups = [
    ('best-video-sessions', 'Agra Urological Best Video Sessions', r'^Agra Best Videos'),
    ('best-paper-sessions', 'Marudhara Jodhpur Urology Trust Best Paper Sessions', r'^Marudhara Best Paper'),
    ('best-poster-sessions', 'CMC Ludhiana Best Poster Sessions', r'^CMC Best Poster'),
    ('moderated-podium', 'Moderated Podium Presentations', r'^Moderated Podium'),
    ('moderated-video', 'Moderated Video Sessions', r'^Moderated Video'),
    ('moderated-poster', 'Moderated Posters', r'^Moderated Poster'),
    ('unmoderated', 'Unmoderated Posters & Videos', r'^Unmoderated'),
]
bounds = heads + [(len(S), None)]
for slug, title, pat in groups:
    parts, chips = [f'<h2>{title}</h2>'], []
    for (i, h), (j, _) in zip(bounds, bounds[1:]):
        if h is None or not re.match(pat, h):
            continue
        hid = slugify(h)
        chips.append(f'<a class="sp-chip" href="#{hid}">{H.escape(h)}</a>')
        parts.append(f'<h3 class="sp-group" id="{hid}">{H.escape(h)}</h3>')
        for n in S[i + 1:j]:
            if n.name == 'blockquote':
                ps = [p.decode_contents() for p in n.find_all('p')]
                parts.append('<div class="sp-byline">' + ''.join(f'<p>{x}</p>' for x in ps) + '</div>')
            else:
                parts.append(n)
    if len(chips) > 1:
        parts.insert(1, f'<nav class="sp-chips" aria-label="Sessions">{"".join(chips)}</nav>')
    emit(f'selected-{slug}', parts)

# ───────────────────────── 3. Abstract submissions ─────────────────────────
X = soup('subs.html')
intro = text(X.find('p'))
for h1 in X.find_all('h1'):
    cat = text(h1)
    name, count = re.match(r'^(.*?)\s*\((\d+)\)$', cat).groups()
    slug = 'submissions-' + slugify(name)
    cards = []
    sib = h1.find_next_sibling()
    entries = []
    while sib is not None and sib.name != 'h1':
        if sib.name == 'h2':
            entries.append([sib])
        elif entries:
            entries[-1].append(sib)
        sib = sib.find_next_sibling()
    nums = []
    for e in entries:
        label = text(e[0])
        num = re.search(r'(\d+)$', label).group(1)
        fields, cur = {}, None
        for n in e[1:]:
            if n.name == 'h3':
                cur = text(n); fields[cur] = []
            elif cur:
                fields[cur].append(n)
        title = ' '.join(text(n) for n in fields.get('Abstract Title', []))
        authors = ' '.join(text(n) for n in fields.get('Authors', []))
        inst = ' '.join(text(n) for n in fields.get('Institution', []))
        body = ''.join(str(clean(copy.copy(n))) for n in fields.get('Abstract Body', []))
        aid = f'{slugify(name)}-{num}'
        esc = lambda s: (s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))
        cards.append(
            f'<article class="sp-abstract" id="{aid}"><p class="sp-abs-no">{esc(label)}</p>'
            f'<h3>{esc(title)}</h3>'
            + (f'<p class="sp-authors">{esc(authors)}</p>' if authors else '')
            + (f'<p class="sp-inst">{esc(inst)}</p>' if inst else '')
            + (f'<details><summary>Read abstract</summary><div class="sp-abs-body">{body}</div></details>' if body else '')
            + '</article>')
    sections[slug] = (f'<h2>{name} Abstracts <span class="sp-count">{len(cards)}</span></h2>'
                      f'<p class="sp-note">{H.escape(intro)}</p>' + ''.join(cards))
    print(slug, 'declared', count, 'found', len(cards))

# ───────────────────────── write files ─────────────────────────
for old in OUT.glob('*.ts'):
    old.unlink()
for slug, html in sections.items():
    assert '<script' not in html.lower()
    (OUT / f'{slug}.ts').write_text(
        '// Generated from the NZUSICON 2026 documents. Do not edit by hand.\n'
        f'const html: string = {json.dumps(html, ensure_ascii=False)}\n\nexport default html\n')
    print(f'{slug:40s} {len(html)//1024:5d} KB')
loaders = ',\n'.join(f'    "{s}": () => import("./sections/{s}")' for s in sections)
(OUT.parent / 'index.ts').write_text(
    '// Generated: slug -> lazily imported HTML section\n'
    f'export const sectionLoaders: Record<string, () => Promise<{{ default: string }}>> = {{\n{loaders},\n}}\n')

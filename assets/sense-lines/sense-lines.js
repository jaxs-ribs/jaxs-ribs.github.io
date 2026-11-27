/* Sense lines in a post: <figure class="sense-lines"> holding a <script type="application/json">
   with the lines, [[indent, "text"], ...]. The figure is drawn as a small sheet of paper, with a
   toggle between the sentence as plain text and the sentence in sense lines, and the thin guides
   that join a phrase to the phrases that hang on it from further down. */
(function () {
  "use strict";

  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // a thin line from a phrase down to each phrase that hangs on it from two or more lines away
  function guides(block) {
    block.querySelectorAll("svg").forEach((s) => s.remove());
    const lines = [...block.querySelectorAll(".sl-line")];
    if (lines.length < 3) return;
    const base = block.getBoundingClientRect();
    const geo = lines.map((l) => {
      const range = document.createRange();
      range.selectNodeContents(l);
      const r = range.getClientRects()[0] || l.getBoundingClientRect();
      return { lv: +l.dataset.lv, x: Math.round(r.left - base.left), bottom: r.bottom - base.top,
               mid: Math.round((r.top + r.bottom) / 2 - base.top) + 0.5 };
    });
    const kids = new Map();
    geo.forEach((g, i) => {
      if (!g.lv) return;
      for (let j = i - 1; j >= 0; j--) {
        if (geo[j].lv === g.lv - 1) { if (!kids.has(j)) kids.set(j, []); kids.get(j).push(i); return; }
        if (geo[j].lv < g.lv - 1) return;
      }
    });
    let d = "";
    for (const [p, cs] of kids) {
      if (cs[cs.length - 1] === p + 1) continue;
      const x = geo[p].x + 3.5, y0 = Math.round(geo[p].bottom) + 1;
      d += `M${x} ${y0}V${geo[cs[cs.length - 1]].mid}`;
      for (const c of cs) { const end = geo[c].x - 7; if (end > x + 2) d += `M${x} ${geo[c].mid}H${end}`; }
    }
    if (!d) return;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.append(path);
    block.prepend(svg);
  }

  function build(figure) {
    const lines = JSON.parse(figure.querySelector("script").textContent);
    const sheet = el("div", "sl-sheet");
    const bar = el("div", "sl-bar");
    const label = el("span", "sl-label", figure.dataset.label || "");
    const toggle = el("span", "sl-toggle");
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", "Layout");
    const asText = el("button", "", "Text"), asLines = el("button", "on", "Sense lines");
    asText.type = asLines.type = "button";
    toggle.append(asText, asLines);
    bar.append(label, toggle);
    const body = el("div", "sl-body");
    // data-split="so": the sentence is set in two columns, the second starting at that word, so
    // that the two halves of an analogy ("As …, so …") stand side by side
    const cascade = el("div", "sl-lines");
    const at = figure.dataset.split ? lines.findIndex(([lv, t]) => lv === 0 && t === figure.dataset.split) : -1;
    const halves = at > 0 ? [lines.slice(0, at), lines.slice(at)] : [lines];
    if (halves.length > 1) cascade.classList.add("sl-split");
    const columns = halves.map((half) => {
      const col = el("div", "sl-col");
      for (const [lv, text] of half) {
        const line = el("div", "sl-line", text);
        line.dataset.lv = lv;
        line.style.setProperty("--lv", lv);
        col.append(line);
      }
      cascade.append(col);
      return col;
    });
    const prose = el("p", "sl-prose", lines.map(([, t]) => t).join(" ").replace(/— /g, "—"));
    prose.hidden = true;
    body.append(cascade, prose);
    sheet.append(bar, body);
    figure.querySelector("script").before(sheet);
    const set = (asProse) => {
      asText.classList.toggle("on", asProse);
      asLines.classList.toggle("on", !asProse);
      asText.setAttribute("aria-pressed", asProse);
      asLines.setAttribute("aria-pressed", !asProse);
      prose.hidden = !asProse;
      cascade.hidden = asProse;
      if (!asProse) columns.forEach(guides);
    };
    asText.addEventListener("click", () => set(true));
    asLines.addEventListener("click", () => set(false));
    set(false);
    const redraw = () => { if (!cascade.hidden) columns.forEach(guides); };
    addEventListener("resize", redraw);
    if (document.fonts) document.fonts.ready.then(redraw);
  }

  // the reader is drawn at the Daylight's own size and scaled to the width it is given
  function fit(device) {
    const set = () => device.style.setProperty("--k", device.clientWidth / 960);
    set();
    if (window.ResizeObserver) new ResizeObserver(set).observe(device); else addEventListener("resize", set);
  }

  function start() {
    document.querySelectorAll("figure.sense-lines").forEach(build);
    document.querySelectorAll(".sr-device").forEach(fit);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

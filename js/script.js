const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
addEventListener("load", () =>
  setTimeout(() => {
    $("#load").classList.add("go");
    setTimeout(() => $("#load").classList.add("done"), 2000);
  }, 900),
);
const g = $("#grain"),
  gx = g.getContext("2d");
g.width = g.height = 180;
(function n() {
  const d = gx.createImageData(180, 180);
  for (let i = 0; i < d.data.length; i += 4) {
    const v = Math.random() * 255;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
    d.data[i + 3] = 60;
  }
  gx.putImageData(d, 0, 0);
  setTimeout(() => requestAnimationFrame(n), 90);
})();
const roles = [
  "Aspiring Data Analyst",
  "Python · SQL · Pandas",
  "Storyteller with Data",
  "Open to Fresher Roles",
];
let ri = 0,
  ci = 0,
  dl = false;
(function t() {
  const r = roles[ri];
  ci += dl ? -1 : 1;
  $("#role").textContent = r.slice(0, ci);
  let w = dl ? 35 : 80;
  if (!dl && ci === r.length) {
    dl = true;
    w = 1500;
  } else if (dl && ci === 0) {
    dl = false;
    ri = (ri + 1) % roles.length;
    w = 400;
  }
  setTimeout(t, w);
})();
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target,
        i = [...el.parentNode.children].indexOf(el);
      el.style.transitionDelay = Math.min(i, 6) * 90 + "ms";
      el.classList.add("in");
      const c = el.querySelector("[data-n]");
      if (c) {
        const n = +c.dataset.n,
          d = +c.dataset.d || 0,
          s = performance.now();
        (function f(now) {
          const p = Math.min((now - s) / 1500, 1);
          c.textContent = (n * (1 - Math.pow(1 - p, 3))).toFixed(d);
          if (p < 1) requestAnimationFrame(f);
        })(s);
      }
      io.unobserve(el);
    }),
  { threshold: 0.15 },
);
$$(".rv").forEach((e) => io.observe(e));
const links = $$("#nav a"),
  secs = links.map((a) => $(a.getAttribute("href")));
addEventListener(
  "scroll",
  () => {
    const h = document.documentElement;
    $("#prog").style.width =
      (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
    let k = -1;
    secs.forEach((s, i) => {
      if (s.getBoundingClientRect().top < innerHeight * 0.4) k = i;
    });
    links.forEach((a, i) => a.classList.toggle("on", i === k));
    $$("[data-speed]").forEach(
      (e) => (e.style.translate = `0 ${scrollY * e.dataset.speed * -1}px`),
    );
  },
  { passive: true },
);
$("#burger").onclick = () => $("#nav").classList.toggle("open");
links.forEach((a) => (a.onclick = () => $("#nav").classList.remove("open")));
addEventListener("mousemove", (e) => {
  const m = `translate(${e.clientX}px,${e.clientY}px)`;
  $("#dot").style.transform = m;
  $("#ring").style.transform = m;
  $("#ring").classList.toggle("h", !!e.target.closest("a,button,.tilt"));
  const c = e.target.closest(".tilt");
  $$(".tilt").forEach((x) => {
    if (x !== c && x.dataset.t) {
      x.style.transform = "";
      x.dataset.t = "";
    }
  });
  if (c && (c.classList.contains("in") || !c.classList.contains("rv"))) {
    const r = c.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    c.dataset.t = 1;
    c.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  }
});
$("#f").onsubmit = (e) => {
  e.preventDefault();
  const t = `Hi Sneha, I’m ${$("#fn").value}${$("#fe").value ? " (" + $("#fe").value + ")" : ""}. ${$("#fm").value}`;
  open("https://wa.me/919165090030?text=" + encodeURIComponent(t), "_blank");
};

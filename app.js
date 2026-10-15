/* ============================================================
   至冬 · 永冬之国  —  SNEZHNAYA ARCHIVE
   ① 入场动画  ② 地图引擎  ③ 贴图档案卡  ④ 环境氛围
   原生 JS · 无外部依赖
   ============================================================ */
'use strict';

/* ------------------------------------------------------------
   资料 · 文案取自「至冬资料 / 地区介绍」
   x / y ：在总览图上的百分比坐标（已按图面建筑位置核准）
   ------------------------------------------------------------ */
const REGIONS = [
  { id:'polar-palace', num:'01', name:'极星的冰雪之宫', en:'PALACE OF THE POLAR STAR',
    cat:'宫殿 · 王座', x:44.5, y:28.5, zh:2.6, side:'right',
    img:'assets/region/polar-palace.webp',
    quote:'没人知晓那冰雪铸造的宫殿里，如今王座上的女主人的思绪。或许偶尔她也会在宫殿的高阁上，企图将整片广场甚至整个世界尽收眼底。',
    text:'极星之下，冰雪为砖、极夜为瓦。这座由寒霜亲手浇铸的宫阙，是至冬的心脏，也是全境目光最终汇聚之处。高阁之上可以俯瞰广场、城郭，乃至整片被风雪统辖的世界——而俯瞰者始终沉默。',
    tags:['王座之所','极星辉光','女皇居城'] },

  { id:'fools-acropolis', num:'02', name:'愚人们的卫城', en:'ACROPOLIS OF FOOLS',
    cat:'城塞 · 信念', x:48.0, y:41.5, zh:2.5, side:'right',
    img:'assets/region/fools-acropolis.webp',
    quote:'或许唯有真正的愚人才会想要推翻天空的统治，但也只有愚人们才拥有这样的胸怀和勇气。',
    text:'卫城矗立在高处的寒光里，像一句被刻在冰上的宣言。把「推翻天空」写进信条的人，在旁人眼中当然是愚人——可正因如此，他们才敢直视那片无人敢仰望的高处。',
    tags:['愚人众','挑战天穹','钢铁意志'] },

  { id:'rail-hub', num:'03', name:'铁路汇集的中枢', en:'THE RAILWAY NEXUS',
    cat:'交通 · 心脏', x:55.0, y:62.0, zh:2.5, side:'right',
    img:'assets/region/rail-hub.webp',
    quote:'如果将至冬比作一个钢铁身躯的巨人，那么铁路是其血管，而位于至冬堡的列车总站毫无疑问就是这巨人不断跳动的心脏。',
    text:'穹顶之下，铁轨如血管般向四面八方延伸。来自冻原、矿区与炉心的列车昼夜不息地在此交汇，汽笛与钟声轮替报时——至冬每一次呼吸，都从这里开始。',
    tags:['至冬堡站','钢铁血管','昼夜不息'] },

  { id:'eternal-furnace', num:'04', name:'永恒燃烧的炉心', en:'THE ETERNAL FURNACE',
    cat:'能源 · 工业', x:42.5, y:55.0, zh:2.6, side:'left',
    img:'assets/region/eternal-furnace.webp',
    quote:'据说克什尼克晶矿的民用权限是白沙皇下放的。对于至冬来说，他既是凛寒的风雪，又是带来温暖的旭日。',
    text:'炉火不熄，昼夜同温。克什尼克晶矿在此被熔炼、被点亮，化作严寒国度的另一种太阳。人们围着它取暖、劳作、许愿——也有人说，这里烧的不只是矿石。',
    tags:['克什尼克晶矿','白沙皇','不熄之火'] },

  { id:'slag-district', num:'05', name:'铁屑如炉灰的城区', en:'THE SLAG DISTRICT',
    cat:'城区 · 民生', x:35.5, y:48.5, zh:2.5, side:'left',
    img:'assets/region/slag-district.webp',
    quote:'即使身处炉灰之中亦可怀有锡心般的坚定之梦，或许这就是至冬堡「炉灰区」名字的由来吧。',
    text:'管道纵横、铁屑飞扬，这里是至冬堡最不被仰望的一角。可正是在灰烬与油污之间，人们依旧把梦擦得发亮——炉灰区的名字，记的从来不是灰，而是那颗锡心。',
    tags:['炉灰区','锡心之梦','市井烟火'] },

  { id:'dreamweaver-stage', num:'06', name:'舞者与歌者织梦之地', en:'WHERE DREAMS ARE WOVEN',
    cat:'剧场 · 文化', x:62.0, y:66.5, zh:2.5, side:'right',
    img:'assets/region/dreamweaver-stage.webp',
    quote:'在这里，最不值得称道的是舞台下的辛劳与汗水。能否为台下的观众带去哪怕一瞬的幻梦，才最有意义。',
    text:'灯起灯落之间，台下的汗水从不被提起。舞者与歌者只在意一件事：能否让看客在那一瞬忘记窗外风雪。于是幻梦被一针一线地织出来，又在一阵掌声里轻轻碎掉。',
    tags:['歌剧与舞剧','一瞬幻梦','台下无声'] },

  { id:'iron-whale', num:'07', name:'铁鲸之梦', en:'THE IRON WHALE',
    cat:'遗迹 · 巨构', x:66.0, y:70.5, zh:2.45, side:'left',
    img:'assets/region/iron-whale.webp',
    quote:'由巨大齿轮构成心脏早已停跳，钢铁的血管也已生锈，直到谁人将它从梦中唤醒，巨兽向着星空，呼出了一口长长的、彩缎似的气。',
    text:'锈迹顺着脊骨一路蔓延，齿轮的心脏沉默了不知多少年。可总有人会再来叩响它的胸腔——那时巨兽会抬起头，朝星空吐出极光一样的长长一口气。',
    tags:['停跳的齿轮','锈蚀血管','极光之息'] },

  { id:'silent-shallows', num:'08', name:'寂静的浅滩', en:'THE SILENT SHALLOWS',
    cat:'地貌 · 异质', x:24.0, y:74.0, zh:2.45, side:'left',
    img:'assets/region/silent-shallows.webp',
    quote:'钢铁的结构矗立在这片粉色的地质层，像一个错误的音符。没有大脑，也没有发声器官的神秘生命曾沉默地在此栖息，最终也沉默地逝去。',
    text:'粉色的地层一路铺向远方，钢铁的构架突兀地插在中间，像一段走调的旋律。这里曾有既无头脑、也无喉舌的生命安静地活着，又安静地消失——没有人听见，也不需要被听见。',
    tags:['粉色地质层','沉默生命','错位的音符'] },

  { id:'ice-quarry', num:'09', name:'甄冰发掘所', en:'THE ICE EXCAVATION SITE',
    cat:'矿场 · 遗产', x:27.5, y:68.5, zh:2.5, side:'left',
    img:'assets/region/ice-quarry.webp',
    quote:'古老的文明留下的遗产令人受惠至今。无数工匠与采掘者夜以继日在此工作，只为凝造梦中未来的基石。',
    text:'古老的文明把遗产埋进冰层，后人则用凿子与吊索把它一寸寸请回人间。工匠与采掘者轮流接替，灯火从不熄灭——他们取的是冰，砌的是梦里的未来。',
    tags:['古代遗产','夜以继日','未来基石'] }
];

const INTRO_MSGS = [
  [0,  '凝霜成核'],
  [26, '纹路自中心生长'],
  [52, '六重对称成形'],
  [76, '冰晶将凝未凝'],
  [92, '准备入场']
];
const BASE_WH = [1098, 645];
const PRELOAD = ['assets/map/overview.webp', ...REGIONS.map(function (r) { return r.img; })];

/* ---------------- 工具 ---------------- */
const $  = function (s, r) { return (r || document).querySelector(s); };
const $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
const clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
const lerp  = function (a, b, t) { return a + (b - a) * t; };
const nf = function (v, n) { return v.toFixed(n == null ? 1 : n); };
const REDUCED = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const easeIO = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

/* ============================================================
   ① 入场 —— 极简雪花：细线自中心生长出六重纹路，
      加载完成即碎裂，白光一闪交棒地图
   ============================================================ */
const Intro = (function () {
  const el = $('#intro'), canvas = $('#introCanvas'), ctx = canvas.getContext('2d');
  const bar = $('#introBar'), pctEl = $('#introPct'), msgEl = $('#introMsg'), flash = $('#introFlash');
  const wordEl = $('#introWord');

  let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, R = 0;
  let spines = [], dust = [], raf = 0, t0 = performance.now();
  let done = false, shown = 0, loaded = 0, phase = 'grow', phaseAt = 0;

  const GROW_MS = 3000;                                   // 纹路生长固定时长
  const T = { core:.06, spine:.72, branch:.64, tip:1 };   // 生长时间轴（归一化）

  /* 生成雪花骨架：6 条主脉 + 侧枝 + 末端分叉 */
  function build() {
    cx = W / 2; cy = H * .46;
    R = Math.min(W, H) * .27;
    spines = [];
    const arms = 6;
    for (let a = 0; a < arms; a++) {
      const ang = a * Math.PI / 3 - Math.PI / 2;
      const sp = { ang: ang, branches: [] };
      // 侧枝：4 对，长度随位置递减
      const bs = [.22, .40, .58, .76];
      for (let i = 0; i < bs.length; i++) {
        for (let k = 0; k < 2; k++) {
          const dir = k ? 1 : -1;
          sp.branches.push({
            at: bs[i],
            len: R * (.30 - i * .045) * (k ? .92 : 1),
            dir: dir,
            spread: Math.PI / 3 * dir,
            t0: T.core + T.spine * bs[i] * .92,
            dur: T.branch * (.34 - i * .026)
          });
        }
      }
      spines.push(sp);
    }
    // 雪尘
    dust = [];
    for (let i = 0; i < 70; i++) {
      const a2 = Math.random() * Math.PI * 2, r2 = R * (1.1 + Math.random() * 1.5);
      dust.push({ x: cx + Math.cos(a2) * r2, y: cy + Math.sin(a2) * r2 * .8,
                  vx: (Math.random() - .5) * .22, vy: (.15 + Math.random() * .5),
                  s: .4 + Math.random() * 1.4, w: Math.random() * 6.28 });
    }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    canvas.width = Math.floor(W * DPR); canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!spines.length) build();
  }

  const easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  function grow(now) {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);

    // 中心辉光
    const p = shown / 100;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * .55 * (.5 + p));
    core.addColorStop(0, 'rgba(226,244,255,' + (.10 + p * .26) + ')');
    core.addColorStop(.4, 'rgba(140,205,245,' + (.05 + p * .12) + ')');
    core.addColorStop(1, 'rgba(60,120,190,0)');
    ctx.fillStyle = core; ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // 裂纹生长：完全由固定时间轴驱动，保证「慢慢生长」始终看得见
    const g = clamp((now - t0) / GROW_MS, 0, 1);
    const grow1 = easeOut(clamp((g - T.core) / (T.spine - T.core), 0, 1));

    ctx.save();
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(150,215,255,.9)';

    for (let i = 0; i < spines.length; i++) {
      const sp = spines[i];
      const ca = Math.cos(sp.ang), sa = Math.sin(sp.ang);
      const rt = R * grow1;
      // 主脉（中心留白，给「至冬」二字）
      if (rt > 1) {
        const r0 = R * .085;
        ctx.beginPath();
        ctx.moveTo(cx + ca * r0, cy + sa * r0);
        for (let s = 0; s <= 8; s++) {
          const f = s / 8, rr = r0 + (rt - r0) * f;
          const bend = Math.sin(f * Math.PI) * R * .012;
          ctx.lineTo(cx + ca * rr - sa * bend, cy + sa * rr + ca * bend);
        }
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(226,246,255,.92)';
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + ca * rt, cy + sa * rt, 1.8 + grow1 * 1.2, 0, 6.2832);
        ctx.fillStyle = 'rgba(255,255,255,.95)'; ctx.fill();
      }
      // 侧枝
      for (let b = 0; b < sp.branches.length; b++) {
        const br = sp.branches[b];
        const bg = clamp((g - br.t0) / Math.max(br.dur, .001), 0, 1);
        if (bg <= 0) continue;
        const e2 = easeOut(bg);
        const bx = cx + ca * R * br.at, by = cy + sa * R * br.at;
        const ang2 = sp.ang + br.spread;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(ang2) * br.len * e2, by + Math.sin(ang2) * br.len * e2);
        ctx.shadowBlur = 9;
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = 'rgba(198,232,255,.8)';
        ctx.stroke();
        // 侧枝末端的小分叉
        if (bg > .7) {
          const f2 = (bg - .7) / .3;
          const ex = bx + Math.cos(ang2) * br.len, ey = by + Math.sin(ang2) * br.len;
          for (let k = -1; k <= 1; k += 2) {
            const a3 = ang2 + k * .55;
            ctx.beginPath(); ctx.moveTo(ex, ey);
            ctx.lineTo(ex + Math.cos(a3) * br.len * .3 * f2, ey + Math.sin(a3) * br.len * .3 * f2);
            ctx.lineWidth = .9; ctx.strokeStyle = 'rgba(170,215,250,.62)'; ctx.stroke();
          }
        }
      }
    }
    ctx.restore();

    // 雪尘
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < dust.length; i++) {
      const d = dust[i];
      d.x += d.vx; d.y += d.vy; d.x += Math.sin(t * .6 + d.w) * .18;
      if (d.y > H + 6) { d.y = -6; d.x = Math.random() * W; }
      ctx.fillStyle = 'rgba(214,238,255,' + (.08 + ((i * 29) % 26) / 100) + ')';
      ctx.beginPath(); ctx.arc(d.x, d.y, d.s * .8, 0, 6.2832); ctx.fill();
    }
    ctx.restore();
  }

  /* 碎裂：spines 消失，改用碎屑粒子炸开 */
  let shards = [];
  function explode() {
    shards = [];
    for (let i = 0; i < spines.length; i++) {
      const sp = spines[i];
      const ca = Math.cos(sp.ang), sa = Math.sin(sp.ang);
      const n = 26;
      for (let s = 0; s < n; s++) {
        const f = s / n, rr = R * f;
        shards.push({ x: cx + ca * rr, y: cy + sa * rr,
                      vx: ca * (2 + Math.random() * 7) + (Math.random() - .5) * 2,
                      vy: sa * (2 + Math.random() * 7) + (Math.random() - .5) * 2,
                      s: .8 + Math.random() * 2, a: 1 });
      }
      for (let b = 0; b < sp.branches.length; b++) {
        const br = sp.branches[b], ang2 = sp.ang + br.spread;
        const bx = cx + ca * R * br.at, by = cy + sa * R * br.at;
        shards.push({ x: bx, y: by,
                      vx: Math.cos(ang2) * (2 + Math.random() * 6), vy: Math.sin(ang2) * (2 + Math.random() * 6),
                      s: .8 + Math.random() * 1.8, a: 1 });
      }
    }
  }

  function shatter(now) {
    ctx.clearRect(0, 0, W, H);
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const el2 = (now - phaseAt) / 1000;
    for (let i = 0; i < shards.length; i++) {
      const s = shards[i];
      s.x += s.vx; s.y += s.vy;
      s.vx *= 1.02; s.vy = s.vy * 1.02 + .06;
      s.a *= .972;
      if (s.a < .02) continue;
      ctx.shadowBlur = 10 * s.a; ctx.shadowColor = 'rgba(160,220,255,.9)';
      ctx.fillStyle = 'rgba(232,246,255,' + s.a + ')';
      ctx.beginPath(); ctx.arc(s.x, s.y, s.s * (.4 + s.a), 0, 6.2832); ctx.fill();
    }
    ctx.restore();
    // 闪白后再亮一下
    if (el2 < .5) {
      ctx.save();
      const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.6);
      g2.addColorStop(0, 'rgba(255,255,255,' + (.35 * (1 - el2 / .5)) + ')');
      g2.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
      ctx.restore();
    }
  }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    if (phase === 'shatter') shatter(now); else grow(now);
  }

  function setPct(v) {
    shown = v;
    bar.style.width = v.toFixed(1) + '%';
    pctEl.textContent = String(Math.floor(v));
    for (let i = INTRO_MSGS.length - 1; i >= 0; i--) {
      if (v >= INTRO_MSGS[i][0]) {
        if (msgEl.textContent !== INTRO_MSGS[i][1]) msgEl.textContent = INTRO_MSGS[i][1];
        break;
      }
    }
  }

  function handoff() {
    el.classList.add('is-out');
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    window.dispatchEvent(new CustomEvent('intro:done'));
  }

  function finish() {
    if (done) return;
    done = true;
    // 纹路必须长满（GROW_MS）再碎裂，加载快也不会跳帧
    const wait = Math.max(0, GROW_MS - (performance.now() - t0));
    setTimeout(function () {
      phase = 'shatter'; phaseAt = performance.now();
      explode();
      wordEl.style.transition = 'opacity .3s ease, transform .6s cubic-bezier(.16,1,.3,1)';
      wordEl.style.opacity = '0';
      wordEl.style.transform = 'translate(-50%,-52%) scale(1.08)';
      flash.classList.add('on');
      handoff();
    }, wait + 120);
    setTimeout(function () {
      cancelAnimationFrame(raf);
      if (el.parentNode) el.remove();
    }, wait + 1400);
  }

  function skip() {
    if (done) return;
    done = true; setPct(100);
    handoff();
    cancelAnimationFrame(raf);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 900);
  }

  function init() {
    resize();
    raf = requestAnimationFrame(loop);
    PRELOAD.forEach(function (src) {
      const im = new Image();
      im.onload = im.onerror = function () { loaded++; };
      im.src = src;
    });
    const t = performance.now();
    (function tick() {
      const growPct = clamp((performance.now() - t) / GROW_MS * 100, 0, 100);
      const realPct = (loaded / PRELOAD.length) * 100;
      const v = Math.min(growPct, 8 + realPct * .94);
      if (v < 99.5 && !done) { setPct(v); requestAnimationFrame(tick); }
      else { setPct(100); finish(); }
    })();
    addEventListener('resize', resize);
    $('#introSkip').addEventListener('click', skip);
    addEventListener('keydown', function (e) { if (e.key === 'Escape') skip(); });
    if (REDUCED) setTimeout(skip, 600);
  }

  return { init: init };
})();

/* ============================================================
   ② 地图引擎 —— 拖拽 / 滚轮 / 双指 / 惯性 / 镜头飞行
   ============================================================ */
const MapEngine = (function () {
  const vp = $('#mapViewport'), stage = $('#mapStage'), hotl = $('#hotspots');
  const cName = $('#coordName'), cXY = $('#coordXY'), cZoom = $('#coordZoom'), zFill = $('#zoomFill');
  const IW = BASE_WH[0], IH = BASE_WH[1];
  const MAXZ = 3.4, MINZ = .9, FLY = 1250;
  let base = 1, s = 1, x = 0, y = 0, anim = 0, frozen = null;
  let pointers = new Map(), pinchD = 0, pinchS = 1;
  const S = { drag:false, moved:false, px:0, py:0, vx:0, vy:0, last:0, inertia:0, cur:null };
  let onChange = function () {};

  function vw() { return vp.clientWidth; }
  function vh() { return vp.clientHeight; }
  function pad(v) { return String(clamp(v, 0, 99.9).toFixed(1)).padStart(4, '0'); }

  function layout() {
    base = Math.max(vw() / IW, vh() / IH, .0001);
    stage.style.width = IW + 'px';
    stage.style.height = IH + 'px';
  }
  function clampXY() {
    const w = vw(), h = vh(), mw = IW * s, mh = IH * s;
    x = (mw <= w) ? (w - mw) / 2 : clamp(x, w - mw, 0);
    y = (mh <= h) ? (h - mh) / 2 : clamp(y, h - mh, 0);
  }
  function apply() {
    stage.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) scale(' + s + ')';
    const k = s / base;
    hotl.style.setProperty('--zs', String(clamp(1 / k, .34, 1)));
    zFill.style.height = clamp((k - MINZ) / (MAXZ - MINZ) * 100, 4, 100) + '%';
    cZoom.textContent = nf(k, 2) + '×';
    if (!frozen) cXY.textContent = pad((vw() / 2 - x) / s / IW * 100) + ' / ' + pad((vh() / 2 - y) / s / IH * 100);
    onChange();
  }
  // 图面坐标（原图百分比）→ 屏幕坐标
  function toScreen(pcx, pcy) {
    return { x: x + (pcx / 100 * IW) * s, y: y + (pcy / 100 * IH) * s };
  }

  function setScale(ns, cx, cy) {
    ns = clamp(ns, base * MINZ, base * MAXZ);
    const wx = (cx - x) / s, wy = (cy - y) / s;
    s = ns; x = cx - wx * s; y = cy - wy * s;
    clampXY(); apply();
  }

  function stopAnim() { cancelAnimationFrame(anim); cancelAnimationFrame(S.inertia); }

  /* ---- 镜头：算出目标机位 ---- */
  function targetCam(rg, opts) {
    const ax = opts.ax != null ? opts.ax : vw() / 2;
    const ay = opts.ay != null ? opts.ay : vh() / 2;
    const ts = opts.keepScale ? s : clamp(base * (rg.zh || 2.5), base * MINZ, base * MAXZ);
    const mx = rg.x / 100 * IW, my = rg.y / 100 * IH;
    const w = vw(), h = vh(), mw = IW * ts, mh = IH * ts;
    let x1 = ax - mx * ts, y1 = ay - my * ts;
    x1 = (mw <= w) ? (w - mw) / 2 : clamp(x1, w - mw, 0);
    y1 = (mh <= h) ? (h - mh) / 2 : clamp(y1, h - mh, 0);
    return { ts: ts, x1: x1, y1: y1 };
  }
  function flyCam(cam, dur) {
    stopAnim();
    const x0 = x, y0 = y, s0 = s;
    if (REDUCED) { s = cam.ts; x = cam.x1; y = cam.y1; clampXY(); apply(); return; }
    const T = dur || FLY, t0 = performance.now();
    (function run(now) {
      const p = clamp((now - t0) / T, 0, 1), e = easeIO(p);
      s = lerp(s0, cam.ts, e); x = lerp(x0, cam.x1, e); y = lerp(y0, cam.y1, e);
      apply();
      if (p < 1) anim = requestAnimationFrame(run);
      else { clampXY(); apply(); }
    })(t0);
  }

  function flyTo(rg, opts) {
    opts = opts || {};
    flyCam(targetCam(rg, opts), opts.dur || FLY);
  }
  // 预测飞行结束后该点在屏幕上的位置
  function predict(rg, opts) {
    const c = targetCam(rg, opts || {});
    return { x: c.x1 + rg.x / 100 * IW * c.ts, y: c.y1 + rg.y / 100 * IH * c.ts };
  }

  /* ---- 回到全景 ---- */
  function reset(instant) {
    stopAnim();
    layout();
    const ts = base, w = vw(), h = vh();
    const x1 = (w - IW * ts) / 2, y1 = (h - IH * ts) / 2;
    cName.textContent = '至冬 · 全景';
    if (instant || REDUCED) { s = ts; x = x1; y = y1; clampXY(); apply(); return; }
    const s0 = s, x0 = x, y0 = y, t0 = performance.now(), T = 900;
    (function run(now) {
      const p = clamp((now - t0) / T, 0, 1), e = easeIO(p);
      s = lerp(s0, ts, e); x = lerp(x0, x1, e); y = lerp(y0, y1, e);
      apply();
      if (p < 1) anim = requestAnimationFrame(run);
      else { clampXY(); apply(); }
    })(t0);
  }

  /* ---- 指针交互 ---- */
  function onDown(e) {
    if (e.target.closest && e.target.closest('.hot-btn')) return;
    stopAnim();
    if (vp.setPointerCapture) vp.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      S.drag = true; S.moved = false;
      S.px = e.clientX; S.py = e.clientY;
      S.vx = S.vy = 0; S.last = performance.now();
      vp.classList.add('dragging');
    } else if (pointers.size === 2) {
      const v = Array.from(pointers.values());
      pinchD = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
      pinchS = s; S.drag = false;
    }
  }
  function onMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size >= 2) {
      const v = Array.from(pointers.values());
      const d = Math.hypot(v[0].x - v[1].x, v[0].y - v[1].y);
      const r = vp.getBoundingClientRect();
      if (pinchD > 0) setScale(pinchS * (d / pinchD),
        (v[0].x + v[1].x) / 2 - r.left, (v[0].y + v[1].y) / 2 - r.top);
      return;
    }
    if (!S.drag) return;
    const dx = e.clientX - S.px, dy = e.clientY - S.py;
    if (Math.abs(dx) + Math.abs(dy) > 3) S.moved = true;
    const now = performance.now(), dt = Math.max(now - S.last, 1);
    S.vx = dx / dt * 16; S.vy = dy / dt * 16; S.last = now;
    x += dx; y += dy; S.px = e.clientX; S.py = e.clientY;
    clampXY(); apply();
  }
  function onUp(e) {
    const wasDrag = S.drag && S.moved;
    pointers.delete(e.pointerId);
    if (pointers.size === 0) {
      S.drag = false;
      vp.classList.remove('dragging');
      if (wasDrag) {
        (function tick() {
          S.vx *= .92; S.vy *= .92;
          if (Math.abs(S.vx) < .12 && Math.abs(S.vy) < .12) return;
          x += S.vx; y += S.vy; clampXY(); apply();
          S.inertia = requestAnimationFrame(tick);
        })();
      }
    }
  }
  function onWheel(e) {
    e.preventDefault();
    stopAnim();
    const r = vp.getBoundingClientRect();
    const f = Math.exp(-e.deltaY * (e.deltaMode === 1 ? .05 : .0015));
    setScale(s * f, e.clientX - r.left, e.clientY - r.top);
  }
  function onClick(e) {
    // 点空白处 = 返回全景（面板打开时由上层决定）
    if (e.target.closest && e.target.closest('.hot-btn')) return;
  }

  /* ---- 标记点 ---- */
  function build(onPick) {
    REGIONS.forEach(function (rg) {
      const d = document.createElement('div');
      d.className = 'hot';
      d.style.left = rg.x + '%'; d.style.top = rg.y + '%';
      d.dataset.id = rg.id;
      d.innerHTML =
        '<button class="hot-btn" type="button" aria-label="查看 ' + rg.name + '">' +
          '<span class="hot-ring"></span><span class="hot-ring r2"></span>' +
          '<span class="hot-dot"></span></button>' +
        '<span class="hot-num">' + rg.num + '</span>' +
        '<span class="hot-label">' + rg.name + '</span>';
      d.querySelector('.hot-btn').addEventListener('click', function (ev) {
        ev.stopPropagation(); onPick(rg);
      });
      hotl.appendChild(d);
    });
  }
  function markActive(id) {
    $$('.hot', hotl).forEach(function (h) {
      h.classList.toggle('is-active', h.dataset.id === id);
      h.classList.toggle('dim', !!id && h.dataset.id !== id);
    });
  }

  function init(onPick, changeCb) {
    onChange = changeCb || onChange;
    layout(); build(onPick);
    s = base; clampXY(); apply();

    if (!REDUCED) {
      s = base * 1.9;
      x = vw() / 2 - (REGIONS[2].x / 100 * IW) * s;
      y = vh() / 2 - (REGIONS[2].y / 100 * IH) * s;
      clampXY(); apply();
      window.addEventListener('intro:done', function () {
        setTimeout(function () { reset(false); }, 120);
      }, { once: true });
    }
    vp.addEventListener('pointerdown', onDown);
    vp.addEventListener('pointermove', onMove);
    vp.addEventListener('pointerup', onUp);
    vp.addEventListener('pointercancel', onUp);
    vp.addEventListener('wheel', onWheel, { passive: false });
    vp.addEventListener('dblclick', function (e) {
      const r = vp.getBoundingClientRect();
      setScale(s * 1.7, e.clientX - r.left, e.clientY - r.top);
    });
    addEventListener('resize', function () {
      const k = s / base;
      layout(); s = clamp(base * k, base * MINZ, base * MAXZ);
      clampXY(); apply();
    });
    $$('#zoom button').forEach(function (b) {
      b.addEventListener('click', function () {
        const z = b.dataset.z;
        if (z === 'in') setScale(s * 1.45, vw() / 2, vh() / 2);
        if (z === 'out') setScale(s / 1.45, vw() / 2, vh() / 2);
        if (z === 'reset') { markActive(null); onPick(null); }
      });
    });
  }

  return {
    init: init, reset: reset, flyTo: flyTo, flyCam: flyCam, targetCam: targetCam,
    predict: predict, markActive: markActive,
    toScreen: toScreen, setTitle: function (t) { cName.textContent = t; },
    setFocus: function (r) {
      if (r) { frozen = true; cName.textContent = r.name; cXY.textContent = nf(r.x, 1) + ' / ' + nf(r.y, 1); }
      else { frozen = null; cName.textContent = '至冬 · 全景'; }
    },
    get scale() { return s; }, get base() { return base; },
    get vw() { return vw(); }, get vh() { return vh(); },
    get panning() { return S.drag; }
  };
})();

/* ============================================================
   ③ 档案卡 —— 贴在地图点位旁边，随地图同步移动
   ============================================================ */
const Card = (function () {
  const el = $('#card'), arrow = $('#cardArrow'), scroller = $('#cardScroll'), rime = $('#rime');
  const link = $('#linkLayer'), linkLine = $('#linkLine'), linkShadow = $('#linkShadow'), linkNode = $('#linkNode');
  let idx = -1, open = false, rg = null, openAt = 0;

  function fill(r) {
    const hero = $('#cHero');
    if (hero.getAttribute('src') !== r.img) hero.setAttribute('src', r.img);
    hero.alt = r.name;
    $('#cNum').textContent = r.num;
    $('#cCat').textContent = r.cat;
    $('#cName').textContent = r.name;
    $('#cEn').textContent = r.en;
    $('#cQuote').textContent = '「' + r.quote + '」';
    $('#cText').textContent = r.text;
    $('#cMetaNum').textContent = r.num + ' / 09';
    $('#cMetaCat').textContent = r.cat.split(' · ')[0];
    $('#cMetaXY').textContent = nf(r.x, 1) + ' / ' + nf(r.y, 1);

    const tags = $('#cTags'); tags.innerHTML = '';
    r.tags.forEach(function (t) {
      const sp = document.createElement('span');
      sp.className = 'tag'; sp.textContent = t; tags.appendChild(sp);
    });
    hero.classList.remove('in');
    requestAnimationFrame(function () { requestAnimationFrame(function () { hero.classList.add('in'); }); });
    scroller.scrollTop = 0;

    el.classList.remove('switching'); void el.offsetWidth; el.classList.add('switching');
    setTimeout(function () { el.classList.remove('switching'); }, 700);
  }

  /* 依据标记点屏幕位置，把卡片放到不遮挡该点的一侧 */
  function place(S) {
    if (!open || !rg) return;
    const w = innerWidth, h = innerHeight;
    const GAP = 46;
    const cw = el.offsetWidth, ch = el.offsetHeight;

    // 标记点在图上的屏幕位置（不含引线偏移）
    let side = rg.side;
    if (S.x + GAP + cw > w - 14) side = 'left';
    if (side === 'left' && S.x - GAP - cw < 14) side = 'right';
    if (side === 'right' && S.x + GAP + cw > w - 14) side = 'bottom';

    // 底部带 / 顶栏安全区
    const topSafe = 88, botSafe = h - 106;
    let cx, cy;
    if (side === 'bottom') {
      cx = clamp(S.x - cw / 2, 14, w - cw - 14);
      cy = clamp(S.y + GAP, topSafe, botSafe - ch);
      side = 'bottom';
    } else {
      const dx = (side === 'right') ? GAP : -(GAP + cw);
      cx = S.x + dx;
      cy = S.y - ch / 2;
      cy = clamp(cy, topSafe, Math.max(topSafe, botSafe - ch));
      cx = clamp(cx, 14, w - cw - 14);
    }

    el.style.width = el.style.width || (cw + 'px');
    el.style.transform = 'translate3d(' + Math.round(cx) + 'px,' + Math.round(cy) + 'px,0)';
    el.classList.toggle('side-right', side === 'right');
    el.classList.toggle('side-left', side === 'left');
    el.classList.toggle('side-bottom', side === 'bottom');

    // 引线：从卡片边缘指向标记点
    const ax = (side === 'right') ? cx : (side === 'left' ? cx + cw : clamp(S.x, cx + 18, cx + cw - 18));
    const ay = (side === 'bottom') ? cy : clamp(S.y, cy + 16, cy + ch - 16);
    const path = 'M ' + ax + ' ' + ay + ' L ' + S.x + ' ' + S.y;
    linkLine.setAttribute('d', path);
    linkShadow.setAttribute('d', path);
    linkNode.setAttribute('cx', S.x); linkNode.setAttribute('cy', S.y);
    link.classList.add('on');

    // 箭头贴着卡片朝向标记点
    if (side === 'right') { arrow.style.top = clamp(S.y - cy - 6, 8, ch - 22) + 'px'; arrow.style.left = '-7px'; arrow.style.right = 'auto'; }
    else if (side === 'left') { arrow.style.top = clamp(S.y - cy - 6, 8, ch - 22) + 'px'; arrow.style.right = '-7px'; arrow.style.left = 'auto'; }
  }

  function show(r, i) {
    const changed = (i !== idx);
    const first = !open;
    idx = i; rg = r;
    fill(r);
    open = true; openAt = performance.now();
    el.classList.add('on');
    el.setAttribute('aria-hidden', 'false');
    MapEngine.markActive(r.id);
    onFrame();

    if (changed && !REDUCED && !first) {
      rime.classList.remove('on'); void rime.offsetWidth; rime.classList.add('on');
    }
    // 飞行：让标记点停在卡片反侧的锚点
    const w = innerWidth, h = innerHeight;
    const anchorX = (r.side === 'left') ? clamp(w * .72, 360, w - 180) : clamp(w * .33, 200, w - 360);
    const anchorY = clamp(h * .5, 200, h - 200);
    MapEngine.flyTo(r, { ax: anchorX, ay: anchorY });
    setTimeout(onFrame, 60);
  }

  function hide() {
    if (!open) return;
    open = false; rg = null; idx = -1;
    el.classList.remove('on');
    el.setAttribute('aria-hidden', 'true');
    link.classList.remove('on');
    MapEngine.markActive(null);
    MapEngine.reset(false);
    MapEngine.setTitle('至冬 · 全景');
    Rail.mark(null);
  }

  function step(d) {
    const n = ((idx + d) % REGIONS.length + REGIONS.length) % REGIONS.length;
    show(REGIONS[n], n);
  }

  function onFrame() {
    if (!open || !rg) return;
    const S = MapEngine.toScreen(rg.x, rg.y);
    place(S);
  }

  function init() {
    $('#cardClose').addEventListener('click', function (e) { e.stopPropagation(); hide(); });
    $('#cPrev').addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    $('#cNext').addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    $('#cAll').addEventListener('click', function (e) { e.stopPropagation(); hide(); });
    // 阻止卡片上的拖动传导到地图
    el.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    el.addEventListener('wheel', function (e) { e.stopPropagation(); }, { passive: true });
    addEventListener('keydown', function (e) {
      if (!open) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
    // 地图空白处点击 → 返回全景
    $('#mapViewport').addEventListener('click', function (e) {
      if (!open) return;
      if (e.target.closest('.hot-btn')) return;
      if (performance.now() - openAt < 400) return;
      hide();
    });
  }

  return { init: init, show: show, hide: hide, onFrame: onFrame,
           get isOpen() { return open; }, get index() { return idx; } };
})();

/* ============================================================
   ④ 环境 —— 飘雪 / 十字光标 / 底部地区带 / 序章
   ============================================================ */
const Ambience = (function () {
  const cv = $('#snowCanvas'), ctx = cv.getContext('2d');
  let W, H, DPR, flakes = [];
  function size() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = Math.floor(W * DPR); cv.height = Math.floor(H * DPR);
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    const n = W < 800 ? 44 : 88;
    flakes = [];
    for (let i = 0; i < n; i++) flakes.push({
      x: Math.random() * W, y: Math.random() * H,
      r: (.5 + Math.random() * 1.9) * DPR, vy: (.16 + Math.random() * .55) * DPR,
      sw: (.25 + Math.random() * .8) * DPR, ph: Math.random() * 6.28, a: .16 + Math.random() * .5 });
  }
  function tick() {
    requestAnimationFrame(tick);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    const t = performance.now() / 1000;
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.vy; f.x += Math.sin(t * .5 + f.ph) * f.sw;
      if (f.y > H + 8) { f.y = -8; f.x = Math.random() * W; }
      if (f.x > W + 8) f.x = -8; else if (f.x < -8) f.x = W + 8;
      ctx.fillStyle = 'rgba(222,240,255,' + f.a + ')';
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.2832); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  return { init: function () { size(); tick(); addEventListener('resize', size); } };
})();

const Cursor = (function () {
  return { init: function () {
    const el = document.createElement('div');
    el.className = 'hot-cursor';
    el.innerHTML = '<i class="hc-e t"></i><i class="hc-e b"></i><i class="hc-e l"></i><i class="hc-e r"></i>';
    document.body.appendChild(el);
    let tx = -100, ty = -100, cx = -100, cy = -100;
    addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      const t = e.target;
      const onMap = t && t.closest && t.closest('.map-viewport') &&
                    !t.closest('.hot-btn') && !t.closest('.card') && !t.closest('.hud');
      el.classList.toggle('on', !!onMap);
    });
    (function loop() {
      requestAnimationFrame(loop);
      cx = lerp(cx, tx, .2); cy = lerp(cy, ty, .2);
      el.style.transform = 'translate(' + cx + 'px,' + cy + 'px)';
    })();
  } };
})();

const Rail = (function () {
  const list = $('#stripList');
  function init(onPick) {
    REGIONS.forEach(function (rg, i) {
      const li = document.createElement('li');
      li.innerHTML =
        '<button class="strip-item" type="button" data-id="' + rg.id + '">' +
          '<img src="assets/region/' + rg.id + '-sm.webp" alt="" loading="lazy">' +
          '<span class="si-txt"><span class="si-name">' + rg.name + '</span>' +
          '<span class="si-num">NO.' + rg.num + ' · ' + rg.cat + '</span></span>' +
        '</button>';
      li.querySelector('button').addEventListener('click', function () { onPick(rg, i); });
      list.appendChild(li);
    });
  }
  function mark(id) {
    $$('.strip-item', list).forEach(function (b) { b.classList.toggle('active', b.dataset.id === id); });
    const act = list.querySelector('.strip-item.active');
    if (act && act.scrollIntoView) act.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
  return { init: init, mark: mark };
})();

const Prologue = (function () {
  const el = $('#prologue');
  return {
    init: function () {
      $('#btnPrologue').addEventListener('click', function () { el.classList.add('on'); });
      el.addEventListener('click', function (e) { if (e.target === el) el.classList.remove('on'); });
      $('#proClose').addEventListener('click', function () { el.classList.remove('on'); });
      addEventListener('keydown', function (e) { if (e.key === 'Escape') el.classList.remove('on'); });
    },
    open: function () { el.classList.add('on'); }
  };
})();

/* ============================================================
   启动
   ============================================================ */
(function boot() {
  Intro.init();
  Ambience.init();
  Cursor.init();

  function pick(rgOrNull, i) {
    if (!rgOrNull) { Card.hide(); return; }
    const k = (typeof i === 'number') ? i : REGIONS.findIndex(function (r) { return r.id === rgOrNull.id; });
    Card.show(REGIONS[k], k);
    Rail.mark(REGIONS[k].id);
  }

  MapEngine.init(pick, function () { Card.onFrame(); });
  Rail.init(pick);
  Card.init();
  Prologue.init();

  $('#btnOverview').addEventListener('click', function () { Card.hide(); });
  $('#btnFull').addEventListener('click', function () {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
    else document.exitFullscreen && document.exitFullscreen();
  });

  setTimeout(function () { $('#hint').classList.add('show'); }, 1200);
  setTimeout(function () { $('#hint').classList.add('hide'); }, 11000);

  addEventListener('keydown', function (e) {
    if (e.target && e.target.tagName === 'BUTTON') return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const d = e.key === 'ArrowDown' ? 1 : -1;
      const cur = Card.isOpen ? Card.index : -1;
      const i = ((cur + d) % REGIONS.length + REGIONS.length) % REGIONS.length;
      pick(REGIONS[i], i);
    }
    if (e.key === 'r' || e.key === 'R') Card.hide();
  });

  window.addEventListener('intro:done', function () {
    setTimeout(function () { if (!Card.isOpen) Prologue.open(); }, 1400);
  }, { once: true });
})();

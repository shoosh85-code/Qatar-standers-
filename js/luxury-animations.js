/**
 * QatarSpec Pro — ULTRA Interactive Animations v2.0
 * ✦ Magnetic cursor · Gold trails · 3D tilt · Liquid ripple
 * ✦ Scroll reveal · Particle web · Breathing glow · Typewriter
 * ✦ Counter · Progress bar · Spring modals · Scanline effect
 */
(function () {
'use strict';
const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
const isMobile = window.innerWidth < 768;
const css = txt => { const s=document.createElement('style'); s.textContent=txt; document.head.appendChild(s); };

/* ══════════════════════════════════════════════════
   § 1  CUSTOM CURSOR — DISABLED
══════════════════════════════════════════════════ */
function initCursor() {
  // disabled — default browser cursor
  // remove any leftover cursor:none
  var s = document.createElement('style');
  s.textContent = '*{cursor:auto!important}';
  document.head.appendChild(s);
  // remove orphan elements if any
  ['_lxDot','_lxRing'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.remove();
  });
}
/* ══════════════════════════════════════════════════
   § 2  LIQUID GOLD RIPPLE
══════════════════════════════════════════════════ */
function initRipple() {
  css(`
    .lx-rhost{position:relative;overflow:hidden}
    @keyframes lxRip{0%{transform:translate(-50%,-50%) scale(0);opacity:.6}
      100%{transform:translate(-50%,-50%) scale(5);opacity:0}}
    .lx-rip{position:absolute;border-radius:50%;pointer-events:none;
      background:radial-gradient(circle,rgba(201,169,110,.4) 0%,rgba(201,169,110,.1) 40%,transparent 70%);
      animation:lxRip .75s cubic-bezier(.4,0,.2,1) forwards}
  `);
  function attach(el) {
    el.classList.add('lx-rhost');
    el.addEventListener('click', e=>{
      const r=el.getBoundingClientRect();
      const size=Math.max(r.width,r.height)*2.5;
      const rip=document.createElement('span');
      rip.className='lx-rip';
      rip.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;
      el.appendChild(rip);
      setTimeout(()=>rip.remove(),780);
    });
  }
  document.querySelectorAll('button,.quick-tag,.plan-btn,.cat-card').forEach(attach);
}

/* ══════════════════════════════════════════════════
   § 3  3D TILT CARDS WITH LIGHT REFLECTION
══════════════════════════════════════════════════ */
function initTilt() {
  if (reduced || isMobile) return;
  css(`
    .cat-card{transform-style:preserve-3d;will-change:transform}
    .lx-shine{position:absolute;inset:0;pointer-events:none;border-radius:inherit;
      background:radial-gradient(circle at var(--sx,50%) var(--sy,50%),
        rgba(201,169,110,.12) 0%,transparent 65%);
      opacity:0;transition:opacity .3s}
    .cat-card:hover .lx-shine{opacity:1}
  `);
  document.querySelectorAll('.cat-card').forEach(card=>{
    // Add shine layer
    const shine=document.createElement('div');
    shine.className='lx-shine';
    card.appendChild(shine);

    card.addEventListener('mousemove', e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width;
      const y=(e.clientY-r.top)/r.height;
      const dx=(x-.5)*2, dy=(y-.5)*2;
      card.style.transform=`perspective(800px) rotateX(${-dy*7}deg) rotateY(${dx*7}deg) translateZ(6px)`;
      card.style.boxShadow=`${-dx*18}px ${-dy*18}px 50px rgba(0,0,0,.5),0 2px 20px rgba(201,169,110,${Math.abs(dx+dy)*.06})`;
      shine.style.setProperty('--sx', x*100+'%');
      shine.style.setProperty('--sy', y*100+'%');
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform='perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.boxShadow='';
      card.style.transition='transform .5s cubic-bezier(.4,0,.2,1),box-shadow .5s';
      setTimeout(()=>card.style.transition='',500);
    });
  });
}

/* ══════════════════════════════════════════════════
   § 4  ANIMATED PARTICLE NETWORK BACKGROUND
══════════════════════════════════════════════════ */
function initParticles() {
  if (reduced) return;
  const cvs=document.createElement('canvas');
  cvs.id='_lxPCV';
  cvs.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:0;';
  document.body.insertBefore(cvs,document.body.firstChild);
  const ctx=cvs.getContext('2d');
  let W,H,pts=[],mouse={x:-999,y:-999},frame=0;

  const resize=()=>{W=cvs.width=window.innerWidth;H=cvs.height=window.innerHeight};
  resize(); window.addEventListener('resize',()=>{resize();spawn()});
  document.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY});

  class Pt{
    constructor(){this.reset(true)}
    reset(init){
      this.x=init?Math.random()*W:(Math.random()<.5?0:W);
      this.y=init?Math.random()*H:Math.random()*H;
      this.vx=(Math.random()-.5)*.22; this.vy=(Math.random()-.5)*.15;
      this.r=Math.random()*.8+.2;
      this.life=Math.random()*500+200; this.age=init?Math.random()*this.life:0;
      this.gold=Math.random()>.4;
    }
    get a(){return Math.sin(this.age/this.life*Math.PI)*(this.gold?.5:.22)}
    step(){
      // Subtle mouse repulsion
      const dx=this.x-mouse.x,dy=this.y-mouse.y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){this.vx+=dx/d*.012;this.vy+=dy/d*.012}
      this.vx*=.998;this.vy*=.998;
      this.x+=this.vx;this.y+=this.vy;this.age++;
      if(this.age>this.life||this.x<-5||this.x>W+5||this.y<-5||this.y>H+5)this.reset(false);
    }
    draw(){
      ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,6.28);
      ctx.fillStyle=this.gold?`rgba(201,169,110,${this.a})`:`rgba(255,255,255,${this.a*.5})`;
      ctx.fill();
    }
  }

  function spawn(){pts=[];for(let i=0;i<100;i++)pts.push(new Pt())}
  spawn();

  function drawConns(){
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<95){
        ctx.lineWidth=.4;
        ctx.strokeStyle=`rgba(201,169,110,${(1-d/95)*.055})`;
        ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();
      }
    }
  }

  // Central glow that breathes
  function drawGlow(){
    const p=Math.sin(frame*.012)*.08+.92;
    const g=ctx.createRadialGradient(W/2,H*.38,0,W/2,H*.38,W*.48*p);
    g.addColorStop(0,`rgba(201,169,110,${.032+Math.sin(frame*.018)*.014})`);
    g.addColorStop(.5,`rgba(201,169,110,.008)`);
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }

  // Mouse proximity glow
  function drawMouseGlow(){
    if(mouse.x<0)return;
    const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,180);
    g.addColorStop(0,'rgba(201,169,110,.04)');
    g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }

  (function loop(){
    ctx.clearRect(0,0,W,H);
    drawGlow();drawMouseGlow();drawConns();
    pts.forEach(p=>{p.step();p.draw()});
    frame++;requestAnimationFrame(loop);
  })();
}

/* ══════════════════════════════════════════════════
   § 5  SCROLL REVEAL — staggered, per-element
══════════════════════════════════════════════════ */
function initScrollReveal() {
  if (reduced) return;
  css(`
    .lxR{opacity:0;transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1)}
    .lxR.up{transform:translateY(32px)}
    .lxR.left{transform:translateX(-32px)}
    .lxR.right{transform:translateX(32px)}
    .lxR.scale{transform:scale(.88)}
    .lxR.vis{opacity:1!important;transform:none!important}
  `);

  function mark(sel,dir,delayBase=0){
    document.querySelectorAll(sel).forEach((el,i)=>{
      if(el.closest('#qs-landing'))return;
      el.classList.add('lxR',dir);
      el.style.transitionDelay=(delayBase+i%5*65)+'ms';
    });
  }
  mark('.cat-card','up');
  mark('.hero h1,.section-title','left');
  mark('.hero-eyebrow,.search-label','left',80);
  mark('.hero-stat','scale',100);
  mark('.spec-row','right');
  mark('.ai-card,.upload-zone','up',120);
  mark('.plan-card','up',80);

  const io=new IntersectionObserver(entries=>
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),
    {threshold:.07}
  );
  document.querySelectorAll('.lxR').forEach(el=>io.observe(el));
}

/* ══════════════════════════════════════════════════
   § 6  GOLD SCROLL PROGRESS BAR
══════════════════════════════════════════════════ */
function initScrollProgress(){
  const bar=document.createElement('div');
  bar.style.cssText=`position:fixed;top:0;left:0;right:0;height:2px;z-index:99997;
    background:linear-gradient(to right,#C9A96E,#E8C990,#F5DFA8);
    transform-origin:left;transform:scaleX(0);pointer-events:none;
    box-shadow:0 0 10px rgba(201,169,110,.6)`;
  document.body.appendChild(bar);
  window.addEventListener('scroll',()=>{
    const p=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)||0;
    bar.style.transform=`scaleX(${p})`;
  },{passive:true});
}

/* ══════════════════════════════════════════════════
   § 7  SEARCH INPUT — live gold glow
══════════════════════════════════════════════════ */
function initSearchFX(){
  const inp=document.querySelector('.search-input');
  if(!inp)return;
  css(`
    .search-wrap::after{content:'';position:absolute;inset:-1px;pointer-events:none;
      background:linear-gradient(135deg,rgba(201,169,110,0),rgba(201,169,110,.12),rgba(201,169,110,0));
      opacity:0;transition:opacity .4s;z-index:-1}
    .search-wrap.focused::after{opacity:1}
    @keyframes lxScanLine{0%{top:0}100%{top:100%}}
    .search-wrap.focused .search-input{
      border-color:rgba(201,169,110,.5)!important;
      box-shadow:0 0 0 1px rgba(201,169,110,.25),0 0 40px rgba(201,169,110,.08)!important}
  `);
  const wrap=inp.closest('.search-wrap');
  inp.addEventListener('focus',()=>wrap&&wrap.classList.add('focused'));
  inp.addEventListener('blur', ()=>wrap&&wrap.classList.remove('focused'));

  // Typing intensity glow
  inp.addEventListener('input',()=>{
    const v=Math.min(inp.value.length/25,1);
    inp.style.boxShadow=`0 0 0 1px rgba(201,169,110,${.15+v*.35}),0 0 ${25+v*35}px rgba(201,169,110,${.04+v*.1})`;
  });
}

/* ══════════════════════════════════════════════════
   § 8  HERO STAT COUNTERS
══════════════════════════════════════════════════ */
function initCounters(){
  document.querySelectorAll('.hero-stat-num').forEach(el=>{
    const raw=el.textContent.trim();
    const num=parseInt(raw.replace(/\D/g,''));
    const suf=raw.replace(/[\d,]/g,'');
    if(!num||isNaN(num))return;
    el.textContent='0'+suf;
    const dur=1800;
    let started=false;
    const io=new IntersectionObserver(([e])=>{
      if(!e.isIntersecting||started)return;
      started=true;io.disconnect();
      let s=null;
      (function step(ts){
        if(!s)s=ts;
        const p=Math.min((ts-s)/dur,1),ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(num*ease).toLocaleString()+suf;
        if(p<1)requestAnimationFrame(step);
      })(performance.now());
    },{threshold:.5});
    io.observe(el);
  });
}

/* ══════════════════════════════════════════════════
   § 9  GOLD CORNER BRACKETS — animated draw
══════════════════════════════════════════════════ */
function initCorners(){
  css(`
    .lx-corner-wrap{position:absolute;inset:0;pointer-events:none;overflow:hidden}
    .lx-c{position:absolute;width:14px;height:14px;border-color:rgba(201,169,110,.5);border-style:solid;
      opacity:0;transition:opacity .5s,transform .5s cubic-bezier(.4,0,.2,1)}
    .lx-c.tl{top:0;right:0;border-width:1px 1px 0 0;transform:translate(-4px,4px)}
    .lx-c.br{bottom:0;left:0;border-width:0 0 1px 1px;transform:translate(4px,-4px)}
    .cat-card:hover .lx-c{opacity:1;transform:translate(0,0)!important}
    .cat-card{position:relative}
  `);
  document.querySelectorAll('.cat-card').forEach(card=>{
    const w=document.createElement('div');w.className='lx-corner-wrap';
    ['tl','br'].forEach(cls=>{const c=document.createElement('div');c.className=`lx-c ${cls}`;w.appendChild(c)});
    card.appendChild(w);
  });
}

/* ══════════════════════════════════════════════════
   § 10  SECTION TITLE UNDERLINE DRAW
══════════════════════════════════════════════════ */
function initUnderlines(){
  css(`
    .section-title{position:relative;display:inline-block;padding-bottom:6px}
    .section-title::after{content:'';position:absolute;bottom:0;right:0;
      width:0;height:1px;
      background:linear-gradient(to left,#C9A96E,rgba(201,169,110,.2));
      transition:width .8s cubic-bezier(.4,0,.2,1)}
    .section-title.lx-ul::after{width:100%}
  `);
  const io=new IntersectionObserver(entries=>
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('lx-ul');io.unobserve(e.target)}}),
    {threshold:.5}
  );
  document.querySelectorAll('.section-title').forEach(el=>io.observe(el));
}

/* ══════════════════════════════════════════════════
   § 11  MODAL SPRING ENTRANCE
══════════════════════════════════════════════════ */
function initModals(){
  css(`
    @keyframes lxSpring{
      0%{opacity:0;transform:scale(.82) translateY(28px)}
      65%{transform:scale(1.018) translateY(-3px)}
      100%{opacity:1;transform:scale(1) translateY(0)}
    }
    @keyframes lxBackdrop{from{opacity:0}to{opacity:1}}
    .modal-bg.open,.detail-modal-bg.open,.pro-modal-bg.open,.upgrade-overlay.open{
      animation:lxBackdrop .3s forwards}
    .modal-bg.open .modal-box,
    .detail-modal-bg.open .detail-modal,
    .pro-modal-bg.open .pro-modal-box,
    .upgrade-overlay.open .upgrade-box{
      animation:lxSpring .5s cubic-bezier(.34,1.56,.64,1) forwards}
  `);
}

/* ══════════════════════════════════════════════════
   § 12  SPEC ROW STAGGER REVEAL
══════════════════════════════════════════════════ */
function initSpecRows(){
  css(`
    .spec-row{
      opacity:0;transform:translateX(24px);
      transition:opacity .45s,transform .45s cubic-bezier(.4,0,.2,1),
        border-color .2s,background .2s!important}
    .spec-row.lx-in{opacity:1!important;transform:none!important}
  `);
  const io=new IntersectionObserver(entries=>
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=>e.target.classList.add('lx-in'),i*30);
        io.unobserve(e.target);
      }
    }),{threshold:.05}
  );
  document.querySelectorAll('.spec-row').forEach(el=>io.observe(el));
}

/* ══════════════════════════════════════════════════
   § 13  BUTTON PRESS + MAGNETIC SNAP
══════════════════════════════════════════════════ */
function initButtons(){
  css(`
    button{transition:transform .1s,box-shadow .2s,background .3s,color .3s,border-color .3s!important}
    button:active:not(:disabled){transform:scale(.94)!important}
    .search-icon-btn:hover{box-shadow:0 0 28px rgba(201,169,110,.35)!important}
    .upload-btn-main:hover,.plan-btn.primary:hover,.calc-btn:hover,.modal-save:hover{
      box-shadow:0 0 32px rgba(201,169,110,.3)!important}
  `);
  // Magnetic pull toward button center on hover
  if(!isMobile) document.querySelectorAll('.plan-btn,.upload-btn-main,.search-icon-btn').forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect();
      const dx=(e.clientX-r.left-r.width/2)*.12;
      const dy=(e.clientY-r.top-r.height/2)*.12;
      btn.style.transform=`translate(${dx}px,${dy}px)`;
    });
    btn.addEventListener('mouseleave',()=>btn.style.transform='');
  });
}

/* § 14 — replaced by wave-lines.js */
function initScanline(){ /* no-op */ }

/* ══════════════════════════════════════════════════
   § 15  HOVER GOLD SHIMMER SWEEP
══════════════════════════════════════════════════ */
function initShimmer(){
  css(`
    .cat-card::before{
      content:'';position:absolute;inset:0;z-index:1;pointer-events:none;
      background:linear-gradient(110deg,transparent 30%,rgba(201,169,110,.07) 50%,transparent 70%);
      transform:translateX(-100%);transition:none}
    .cat-card:hover::before{transform:translateX(100%);transition:transform .65s ease}
    .spec-row::before{
      content:'';position:absolute;inset:0;pointer-events:none;
      background:linear-gradient(90deg,transparent,rgba(201,169,110,.04),transparent);
      transform:translateX(-100%);transition:none}
    .spec-row:hover::before{transform:translateX(100%);transition:transform .5s ease}
    .spec-row{position:relative;overflow:hidden}
  `);
}

/* ══════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════ */
function boot(){
  try { initParticles();   } catch(e){}
  // initCursor() — disabled by user request
  try { initRipple();      } catch(e){}
  try { initTilt();        } catch(e){}
  try { initScrollReveal();} catch(e){}
  try { initScrollProgress();} catch(e){}
  try { initSearchFX();    } catch(e){}
  try { initCounters();    } catch(e){}
  try { initCorners();     } catch(e){}
  try { initUnderlines();  } catch(e){}
  try { initModals();      } catch(e){}
  try { initSpecRows();    } catch(e){}
  try { initButtons();     } catch(e){}
  try { initScanline();    } catch(e){}
  try { initShimmer();     } catch(e){}
  console.log('%c✦ QatarSpec Luxury Animations v2.0','color:#C9A96E;font-family:serif;font-size:13px');
}

document.readyState==='loading'
  ? document.addEventListener('DOMContentLoaded',boot)
  : boot();
})();

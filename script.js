(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Navbar scroll state ---------- */
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function(){
    if(window.scrollY > 12){ navbar.classList.add('scrolled'); }
    else{ navbar.classList.remove('scrolled'); }
  }, { passive:true });

  /* ---------- Mobile menu ---------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  var mobileClose = document.getElementById('mobileClose');

  function openMenu(){
    mobileMenu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded','true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded','false');
    document.body.style.overflow = '';
  }
  hamburger.addEventListener('click', function(){
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });
  mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', closeMenu);
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------- Telegram welcome popup ---------- */
  var STORAGE_KEY = 'ms99_tg_popup_dismissed';
  var popup = document.getElementById('tgPopup');
  var popupClose = document.getElementById('tgPopupClose');
  var popupLater = document.getElementById('tgPopupLater');

  function dismissPopup(){
    popup.classList.remove('show');
    try{ localStorage.setItem(STORAGE_KEY, '1'); }catch(e){}
  }

  try{
    if(!localStorage.getItem(STORAGE_KEY)){
      setTimeout(function(){ popup.classList.add('show'); }, 3200);
    }
  }catch(e){
    setTimeout(function(){ popup.classList.add('show'); }, 3200);
  }

  popupClose.addEventListener('click', dismissPopup);
  popupLater.addEventListener('click', function(e){ e.preventDefault(); dismissPopup(); });
  popup.addEventListener('click', function(e){
    if(e.target === popup){ dismissPopup(); }
  });

  /* ---------- Hero candlestick canvas ---------- */
  var canvas = document.getElementById('heroCanvas');
  if(canvas && canvas.getContext){
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var candles = [];
    var W, H;

    function resize(){
      var hero = document.querySelector('.hero');
      W = hero.offsetWidth; H = hero.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      buildCandles();
    }

    function buildCandles(){
      candles = [];
      var count = Math.max(24, Math.floor(W / 34));
      var gap = W / count;
      var midline = H * 0.62;
      var value = midline;
      for(var i=0;i<count;i++){
        var open = value;
        var change = (Math.random()-0.48) * 46;
        var close = open + change;
        var high = Math.max(open,close) + Math.random()*18;
        var low = Math.min(open,close) - Math.random()*18;
        candles.push({ x: i*gap + gap/2, open:open, close:close, high:high, low:low, w: gap*0.42 });
        value = close;
        if(value < H*0.25 || value > H*0.92){ value = midline; }
      }
    }

    function draw(){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<candles.length;i++){
        var c = candles[i];
        var bull = c.close < c.open; /* screen y grows downward; lower y = higher price */
        ctx.strokeStyle = bull ? 'rgba(22,245,154,0.35)' : 'rgba(255,59,71,0.35)';
        ctx.fillStyle = bull ? 'rgba(22,245,154,0.16)' : 'rgba(255,59,71,0.16)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(c.x, c.high);
        ctx.lineTo(c.x, c.low);
        ctx.stroke();
        var top = Math.min(c.open, c.close);
        var h = Math.max(2, Math.abs(c.close - c.open));
        ctx.fillRect(c.x - c.w/2, top, c.w, h);
        ctx.strokeRect(c.x - c.w/2, top, c.w, h);
      }
    }

    function animate(){
      if(!reduceMotion){
        candles.forEach(function(c){
          var drift = (Math.random()-0.5) * 0.6;
          c.open += drift; c.close += drift; c.high += drift; c.low += drift;
        });
      }
      draw();
      if(!reduceMotion){ requestAnimationFrame(animate); }
    }

    window.addEventListener('resize', resize, { passive:true });
    resize();
    animate();
  }

})();

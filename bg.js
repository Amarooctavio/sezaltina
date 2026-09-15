// Fundo de estrelas
(function(){
  const sky = document.getElementById('stars-bg');
  if(!sky) return;
  const count = 70;
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    s.className='star';
    const size = (Math.random()*2 + 1).toFixed(1);
    s.style.width = size+'px';
    s.style.height = size+'px';
    s.style.left = Math.random()*100+'vw';
    s.style.top = Math.random()*100+'vh';
    s.style.animationDelay = (Math.random()*3.5)+'s';
    sky.appendChild(s);
  }
})();

// Corações flutuantes suaves
(function(){
  const layer = document.getElementById('stars-bg');
  if(!layer) return;
  function spawn(){
    const h = document.createElement('div');
    h.className='floating-heart';
    h.textContent = ['💗','💕','♡','💖'][Math.floor(Math.random()*4)];
    h.style.left = Math.random()*100+'vw';
    h.style.fontSize = (0.8+Math.random()*1.3)+'rem';
    const dur = 10+Math.random()*10;
    h.style.animationDuration = dur+'s';
    layer.appendChild(h);
    setTimeout(()=>h.remove(), dur*1000);
  }
  setInterval(spawn, 900);
})();

// Marca o link ativo na navegação
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a').forEach(a=>{
    if(a.getAttribute('href') === here) a.classList.add('current');
  });
})();

// Desliza o menu automaticamente até mostrar a página atual (e a seguinte)
(function(){
  const nav = document.querySelector('nav.links');
  const current = document.querySelector('nav.links a.current');
  if(!nav || !current) return;
  setTimeout(()=>{
    const navRect = nav.getBoundingClientRect();
    const curRect = current.getBoundingClientRect();
    const offset = curRect.left - navRect.left + nav.scrollLeft - 20;
    nav.scrollTo({ left: Math.max(offset,0), behavior:'smooth' });
  }, 150);
})();

// Botão "Próxima página" automático no fim do conteúdo
(function(){
  const links = Array.from(document.querySelectorAll('nav.links a'));
  const idx = links.findIndex(a=>a.classList.contains('current'));
  if(idx === -1 || idx === links.length-1) return;
  const next = links[idx+1];
  const bar = document.createElement('a');
  bar.href = next.getAttribute('href');
  bar.className = 'next-page-bar';
  bar.innerHTML = 'Próxima página: ' + next.textContent.trim() + ' →';
  const main = document.querySelector('main');
  if(main) main.appendChild(bar);
})();

// Rasto de coração no cursor (só em dispositivos com rato)
(function(){
  if(window.matchMedia('(pointer: coarse)').matches) return;
  const cursor = document.createElement('div');
  cursor.className = 'cursor-heart';
  cursor.textContent = '♡';
  document.body.appendChild(cursor);
  let last = 0;
  document.addEventListener('mousemove', (e)=>{
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '.8';
    const now = Date.now();
    if(now - last > 350){
      last = now;
      const trail = document.createElement('div');
      trail.className = 'cursor-heart';
      trail.textContent = '♡';
      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = '.55';
      trail.style.transition = 'opacity .8s, transform .8s';
      document.body.appendChild(trail);
      requestAnimationFrame(()=>{
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%,-50%) translateY(-14px) scale(.6)';
      });
      setTimeout(()=>trail.remove(), 850);
    }
  });
  document.addEventListener('mouseleave', ()=> cursor.style.opacity='0');
})();
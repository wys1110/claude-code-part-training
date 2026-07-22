'use strict';
const slides=window.SLIDES||[];
const expectedMinutes=120;
const total=slides.reduce((sum,s)=>sum+s.minutes,0);
if(!slides.length||total!==expectedMinutes)throw new Error(`Invalid deck: ${slides.length} slides / ${total} minutes`);
const lastIndex=slides.length-1;
const $=s=>document.querySelector(s);
const el={slide:$('#slide'),counter:$('#counter'),section:$('#section-name'),progress:$('#progress span'),notes:$('#notes-panel'),notesBody:$('#notes-content'),overview:$('#overview'),grid:$('#overview-grid'),help:$('#help'),print:$('#print-deck'),toast:$('#toast')};
let index=0,touchX=0;
const esc=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const card=v=>{const [h,p='']=v.split('|');return `<article class="card"><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`};
function content(s){
 const items=s.items||[];let h='';
 if(s.layout==='hero')h=`<div class="hero-mark">CC</div><p class="lead">${esc(items[0])}<br><strong>${esc(items[1]||'')}</strong></p>`;
 else if(s.layout==='flow')h=`<div class="workflow">${items.map((v,i)=>`${i?'<b>→</b>':''}<span>${esc(v)}</span>`).join('')}</div>`;
 else if(s.layout==='steps')h=`<div class="steps">${items.map(v=>`<div class="step">${esc(v)}</div>`).join('')}</div>`;
 else if(s.layout==='cards'){const cls=items.length>=5?'three':items.length===4?'four':items.length===3?'three':'two';h=`<div class="grid ${cls}">${items.map(card).join('')}</div>`;}
 else if(s.layout==='check')h=`<div class="checks">${items.map(v=>`<span>${esc(v)}</span>`).join('')}</div>`;
 else if(s.layout==='quote')h=`<p class="big-quote">${esc(items[0]||'')}</p>`;
 else if(s.layout==='list')h=`<ol>${items.map(v=>`<li>${esc(v)}</li>`).join('')}</ol>`;
 if(s.code){const id=s.copy?`copy-${s.id}`:'';h+=`<div class="prompt">${s.copy?`<button class="copy-btn" data-copy-target="${id}">복사</button>`:''}<pre><code id="${id}">${esc(s.code)}</code></pre></div>`;}
 if(s.callout)h+=`<p class="callout">${esc(s.callout)}</p>`;
 if(s.danger)h+=`<p class="danger">${esc(s.danger)}</p>`;
 return h;
}
function markup(s,print=false){return `${s.kicker?`<p class="kicker">${esc(s.kicker)}</p>`:`<p class="kicker">${esc(s.section)} · ${s.minutes} min</p>`}<h1>${esc(s.title)}</h1><div class="content">${content(s)}</div>${print?`<div class="print-meta">${s.id} / ${slides.length} · ${s.minutes} min</div>`:''}`;}
function parseHash(){const m=location.hash.match(/slide=(\d+)/);index=Math.min(lastIndex,Math.max(0,(m?Number(m[1]):1)-1));}
function closeLayers(){el.notes.hidden=true;el.overview.hidden=true;el.help.hidden=true;}
function render(updateHash=true){const s=slides[index];el.slide.innerHTML=markup(s);el.counter.textContent=`${s.id} / ${slides.length}`;el.section.textContent=`${s.section} · ${s.minutes} min`;el.progress.style.width=`${((index+1)/slides.length)*100}%`;el.notesBody.innerHTML=`<h2>${s.id}. ${esc(s.title)}</h2><p><strong>예상 시간:</strong> ${s.minutes}분</p><h3>말할 핵심</h3><p>${esc(s.notes)}</p><h3>참가자 행동</h3><p>${esc(s.action)}</p><h3>전환 문장</h3><p>${esc(s.transition)}</p>`;if(updateHash)history.replaceState(null,'',`#slide=${s.id}`);document.title=`${s.id}. ${s.title} · Claude Code Training`;}
function go(i){index=Math.min(lastIndex,Math.max(0,i));closeLayers();render();}
const next=()=>go(index+1),prev=()=>go(index-1);
function toggle(target){const open=target.hidden;closeLayers();target.hidden=!open;}
function fullscreen(){if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();}
function toast(msg){el.toast.textContent=msg;el.toast.classList.add('show');setTimeout(()=>el.toast.classList.remove('show'),1200);}
async function copy(id){const text=document.getElementById(id)?.textContent||'';try{await navigator.clipboard.writeText(text);toast('프롬프트를 복사했습니다.');}catch{toast('복사할 텍스트를 직접 선택하세요.');}}
function buildOverview(){el.grid.innerHTML=slides.map(s=>`<article class="overview-card" data-slide="${s.id}"><small>${s.id} · ${esc(s.section)} · ${s.minutes}m</small><h3>${esc(s.title)}</h3></article>`).join('');}
function buildPrint(){el.print.innerHTML=slides.map(s=>`<section class="print-slide">${markup(s,true)}</section>`).join('');}
document.addEventListener('click',e=>{const copyBtn=e.target.closest('[data-copy-target]');if(copyBtn)return copy(copyBtn.dataset.copyTarget);const card=e.target.closest('[data-slide]');if(card)return go(Number(card.dataset.slide)-1);const b=e.target.closest('button');if(b){const a=b.dataset.action;if(a==='next')next();if(a==='prev')prev();if(a==='overview')toggle(el.overview);if(a==='notes')toggle(el.notes);if(a==='fullscreen')fullscreen();if(a==='print')window.print();if(a==='close')closeLayers();return;}if(!el.notes.hidden||!el.overview.hidden||!el.help.hidden)return;const x=e.clientX/innerWidth;if(x>.62)next();else if(x<.38)prev();});
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea'))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();next();}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev();}else if(e.key==='Home')go(0);else if(e.key==='End')go(lastIndex);else if(e.key.toLowerCase()==='o')toggle(el.overview);else if(e.key.toLowerCase()==='n')toggle(el.notes);else if(e.key.toLowerCase()==='f')fullscreen();else if(e.key.toLowerCase()==='p')window.print();else if(e.key==='?')toggle(el.help);else if(e.key==='Escape')closeLayers();});
document.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
document.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-touchX;if(Math.abs(d)>55)(d<0?next:prev)();},{passive:true});
window.addEventListener('hashchange',()=>{parseHash();render(false)});
setInterval(()=>{$('#clock').textContent=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit'})},1000);
parseHash();buildOverview();buildPrint();render(false);

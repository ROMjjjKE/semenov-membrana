
(function(){
'use strict';
var $=function(i){return document.getElementById(i)};
var WA='https://wa.me/375447078184?text=';
/* меню */
var DR=$('drawer'),BG=$('burger'),CL=$('drawerClose'),LF=null;
function openD(){ if(!DR)return; LF=document.activeElement; DR.classList.add('is-open');
 DR.setAttribute('aria-hidden','false'); BG.setAttribute('aria-expanded','true');
 document.body.style.overflow='hidden'; var f=DR.querySelector('a,button'); if(f)f.focus(); }
function closeD(){ if(!DR)return; DR.classList.remove('is-open'); DR.setAttribute('aria-hidden','true');
 BG.setAttribute('aria-expanded','false'); document.body.style.overflow=''; if(LF&&LF.focus)LF.focus(); }
if(BG)BG.addEventListener('click',function(){ DR.classList.contains('is-open')?closeD():openD(); });
if(CL)CL.addEventListener('click',closeD);
if(DR)DR.addEventListener('click',function(e){ if(e.target.tagName==='A')closeD(); });
document.addEventListener('keydown',function(e){
 if(!DR||!DR.classList.contains('is-open'))return;
 if(e.key==='Escape')closeD();
 if(e.key==='Tab'){ var f=DR.querySelectorAll('a,button'),a=f[0],z=f[f.length-1];
  if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus();}
  else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus();} }
});

/* ===== раскладка мембраны ===== */
function num(v,d){ var n=parseFloat(String(v).replace(',','.')); return isFinite(n)&&n>0?n:d; }
function fmt(x,d){ return (Math.round(x*Math.pow(10,d))/Math.pow(10,d)).toString().replace('.',','); }
function draw(){
 var L=num($('roofL')?$('roofL').value:0,0), W=num($('roofW')?$('roofW').value:0,0);
 if(!L||!W)return;
 L=Math.min(L,300); W=Math.min(W,300);
 var rr=document.querySelector('input[name=rollw]:checked');
 var rollW=rr?parseFloat(rr.value):1.5;
 var eff=rollW-0.1;
 var n=Math.ceil(W/eff);
 var strip=L+0.3;
 var totalLen=n*strip;
 var rolls=Math.ceil(totalLen/20);
 var rows=Math.max(1,Math.ceil(L/20));
 var seams=(n-1)*L;
 var tj=(rows-1)*n;
 var per=2*(L+W);
 var area=L*W;
 var cost=Math.round(area*30);
 var idx=W/eff;
 var px=430/Math.max(L,W*1.25), pad=34;
 var vw=L*px, vh=W*px;
 var Wtot=vw+pad*2, Htot=vh+pad*2;
 var s=['<svg viewBox="0 0 '+Wtot.toFixed(0)+' '+Htot.toFixed(0)+'" role="img" aria-label="Раскладка полос мембраны">'];
 s.push('<rect width="'+Wtot.toFixed(0)+'" height="'+Htot.toFixed(0)+'" fill="#F0F1EC"/>');
 s.push('<rect x="'+pad+'" y="'+pad+'" width="'+vw.toFixed(1)+'" height="'+vh.toFixed(1)+'" fill="#D5DAD4" stroke="#14171A" stroke-width="1.4"/>');
 for(var i=0;i<n;i++){
  var y=pad+i*eff*px, h=Math.min(eff,W-i*eff)*px;
  s.push('<rect x="'+pad+'" y="'+y.toFixed(1)+'" width="'+vw.toFixed(1)+'" height="'+h.toFixed(1)+
   '" fill="'+(i%2?'rgba(20,23,26,.05)':'rgba(255,255,255,.5)')+'" stroke="none"/>');
  if(i>0){
   s.push('<path d="M'+pad+' '+y.toFixed(1)+' H'+(pad+vw).toFixed(1)+'" stroke="#B3541E" stroke-width="2"/>');
   var k=0;
   for(var x=pad+8;x<pad+vw-6;x+=26){
    s.push('<rect x="'+x.toFixed(1)+'" y="'+(y-2.5).toFixed(1)+'" width="9" height="5" fill="#B3541E" opacity=".85"/>');
    k++;
   }
  }
  if(h>13) s.push('<text x="'+(pad+7)+'" y="'+(y+h/2+3).toFixed(1)+'" font-family="IBM Plex Mono, monospace" font-size="7" fill="#3A4146">ПОЛОСА '+(i+1)+'</text>');
 }
 for(var r=1;r<rows;r++){
  var yy=pad+(r*20)*px;
  s.push('<path d="M'+pad+' '+yy.toFixed(1)+' H'+(pad+vw).toFixed(1)+'" stroke="#14171A" stroke-width="1" stroke-dasharray="5 4" opacity=".55"/>');
 }
 s.push('<path d="M'+pad+' '+(pad-9)+' H'+(pad+vw).toFixed(1)+'" stroke="#14171A" stroke-width="1"/>');
 s.push('<text x="'+(pad+vw/2)+'" y="'+(pad-14)+'" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8" fill="#14171A">'+fmt(L,1)+' М</text>');
 s.push('<path d="M'+(pad-9)+' '+pad+' V'+(pad+vh).toFixed(1)+'" stroke="#14171A" stroke-width="1"/>');
 s.push('<text x="'+(pad-14)+'" y="'+(pad+vh/2)+'" text-anchor="middle" transform="rotate(-90 '+(pad-14)+' '+(pad+vh/2)+')" font-family="IBM Plex Mono, monospace" font-size="8" fill="#14171A">'+fmt(W,1)+' М</text>');
 s.push('<text x="'+pad+'" y="'+(Htot-10)+'" font-family="IBM Plex Mono, monospace" font-size="7.5" fill="#6B7378">РУЛОН '+fmt(rollW,1)+' М · НАХЛЁСТ НА ШОВ 100 ММ</text>');
 s.push('</svg>');
 $('calcPlan').innerHTML=s.join('');
 $('calcSum').innerHTML='<div><b>'+n+'</b><span>полос мембраны</span></div>'+
  '<div><b>'+fmt(seams,1)+' пог. м</b><span>сварных швов</span></div>'+
  '<div><b>'+rolls+'</b><span>рулонов по 20 м</span></div>'+
  '<div><b>'+fmt(per,1)+' пог. м</b><span>примыканий по периметру</span></div>';
 $('calcPrice').innerHTML='<b>от '+cost.toLocaleString('ru-RU')+' р.</b><span>работы «под ключ» · '+fmt(area,1)+' м² × '+30+' р.</span>';
 var btn=$('calcWA');
 if(btn)btn.href=WA+encodeURIComponent('Заявка с сайта: монтаж ПВХ мембраны.\nКровля: '+fmt(L,1)+' × '+fmt(W,1)+' м = '+fmt(area,1)+' м²'+
  '\nПолос: '+n+' · шов: '+fmt(seams,1)+' пог. м · рулонов 20 м: '+rolls+
  '\nПримыкания: '+fmt(per,1)+' пог. м\nОриентир по прайсу: от '+cost+' р. (работы)\nНужен замер.');
}
if($('calcPlan')){
 ['roofL','roofW'].forEach(function(id){ var el=$(id); if(el){ el.addEventListener('input',draw); el.addEventListener('change',draw);} });
 document.addEventListener('change',function(e){ if(e.target.name==='rollw')draw(); });
 draw();
}

/* форма */
var form=$('lead-form');
if(form){ form.addEventListener('submit',function(e){
  e.preventDefault();
  var g=function(i){var el=$(i);return el?el.value.trim():''};
  var n=g('lname'),p=g('lphone'),w=g('lwhat'),m=g('lmsg'),ok=$('lead-ok');
  if(!n||!p){ if(ok){ok.textContent='Укажите имя и телефон';ok.classList.add('on');} return; }
  var t='Заявка с сайта: ПВХ мембрана\nИмя: '+n+'\nТелефон: '+p+'\nИнтересует: '+w+(m?'\nДетали: '+m:'');
  if(ok){ ok.textContent='Открываем WhatsApp с готовым сообщением…'; ok.classList.add('on'); }
  window.open('https://wa.me/375447078184?text='+encodeURIComponent(t),'_blank');
});}
})();

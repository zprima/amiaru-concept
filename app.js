const items=[
{id:'oneup',title:'ONE UP 2026',image:'oneup.jpg',category:'Dogodek',tag:'ARHIV 2026',group:'events',description:'ONE UP 2026 je 14. februarja 2026 na Celjskem sejmu združil svetove japonske pop kulture. Program je povezal videoigre, družabne igre, Lego in mech razstavo, fotografijo, cosplay ter risanje. Vsako področje je svoj STAGE — prostor za odkrivanje in druženje.'},
{id:'about',title:'SVET AMIARU',image:'world.jpg',category:'Skupnost',tag:'NAŠA ZGODBA',group:'worlds',description:'AMIARU je ekipa, ki ustvarja prostor za ljubitelje japonske pop kulture v Sloveniji. Anime, manga, cosplay, glasba in igre povezujejo skupnost skozi dogodke, sejme, delavnice in druženja. Naš slogan: »Sprehod do japonske pop kulture«.'},
{id:'art',title:'OKAMI & KITSUNE',image:'art.jpg',category:'Ustvarjanje',tag:'PRIHAJA KMALU',group:'worlds',description:'Okami & Kitsune ART je področje AMIARU, posvečeno majicam z izvirnimi ilustracijami slovenskih ustvarjalcev. Z oblikovanjem, tiskom in promocijo skupina podpira domače ilustratorje in njihova dela približuje skupnosti.'},
{id:'blog',title:'ZGODBE IZ NAŠEGA SVETA',image:'blog.jpg',category:'Skupnost',tag:'PRIHAJA KMALU',group:'worlds',description:'Blog AMIARU je na izvirni strani označen kot vsebina, ki prihaja kmalu.'},
{id:'anime',title:'ANIME & MANGA',image:'anime.jpg',category:'Anime',group:'worlds',description:'Otaku oddelek AMIARU odpira prostor za raziskovanje animejev, mang, stripovske in animacijske kulture. Srečanja, predavanja in ustvarjalne delavnice povezujejo učenje, razpravo in navdih. Na ONE UP je bila predstavljena tudi zbirka animejev na VHS.'},
{id:'games',title:'PRESS START',image:'games.jpg',category:'Igre',group:'worlds',description:'Sodobne in retro videoigre, e-šport ter skupno igranje. AMIARU povezuje igralce z dogodki, predstavitvami in tekmovanji. OKAMI in KITSUNE Playroom sta prostora za igranje, odkrivanje in druženje.'},
{id:'origami',title:'USTVARI NEKAJ SVOJEGA',image:'origami.jpg',category:'Ustvarjanje',group:'worlds',description:'Od tradicionalne japonske umetnosti origamija do ilustracije in ustvarjalnih delavnic. Razstave ONE UP odpirajo pogled v ročno izdelane svetove in navdihujejo nove ustvarjalce.'},
{id:'retro',title:'NAZAJ V IGRO',image:'retro.jpg',category:'Igre',group:'worlds',description:'Ponovno odkrij retro konzole in igre. Program ONE UP je vključeval igranje na retro konzolah — priložnost za nostalgijo, nove izzive in srečanje različnih generacij igralcev.'}
];
const $=s=>document.querySelector(s);let view='all',filter='all',query='',current;let introTimer;const dialog=$('#details');
function card(item){return `<article class="card"><button class="card-cover" data-open="${item.id}" aria-label="Razišči ${item.title}"><img src="assets/${item.image}" alt="" loading="lazy"><span class="card-brand original-brand"><img class="official-logo" src="assets/logo.png" alt="AMIARU"></span>${item.tag?`<span class="badge">${item.tag}</span>`:''}<span class="card-title">${item.title}</span></button><div class="card-meta"><p><strong>${item.category}</strong> &nbsp;·&nbsp; AMIARU</p></div></article>`}
function render(){const matches=i=>(!query||`${i.title} ${i.category} ${i.description}`.toLocaleLowerCase('sl').includes(query));let list=items.filter(matches);if(view!=='all')list=list.filter(i=>i.group===view);else if(!query)list=list.slice(0,4);$('#main-row').innerHTML=list.map(card).join('');$('#browse-title').textContent=query?'Rezultati iskanja':({all:'Samo v svetu AMIARU',events:'Dogodki AMIARU',worlds:'Vstopi v svoj svet'})[view];$('#empty').hidden=list.length>0;$('#empty').textContent=query?'Ni zadetkov. Poskusi z drugo besedo.':'Ni vsebin za prikaz.';$('#world-row').innerHTML=items.slice(4).filter(i=>filter==='all'||i.category===filter).map(card).join('')||'<p class="subtle">Spoznaj skupnost prek kartice Svet AMIARU zgoraj.</p>';document.querySelectorAll('.nav').forEach(b=>{b.classList.toggle('active',b.dataset.view===view);b.setAttribute('aria-current',b.dataset.view===view?'page':'false')});}
function open(id){current=items.find(i=>i.id===id);if(!current)return;$('#modal-title').textContent=current.title;$('#modal-category').textContent=current.category.toUpperCase();$('#modal-description').textContent=current.description;$('#modal-image').style.backgroundImage=`url('assets/${current.image}')`;dialog.showModal();document.body.style.overflow='hidden'}
function close(){dialog.close();document.body.style.overflow=''}
document.addEventListener('click',e=>{const openButton=e.target.closest('[data-open]');if(openButton)open(openButton.dataset.open);const nav=e.target.closest('[data-view]');if(nav){view=nav.dataset.view;query='';$('#search').value='';render();if(view!=='all')$('#browse').scrollIntoView({block:'start',behavior:'smooth'});else window.scrollTo({top:0,behavior:'smooth'})}const chip=e.target.closest('[data-filter]');if(chip){filter=chip.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('selected',b===chip);b.setAttribute('aria-pressed',b===chip)});render()}const scroll=e.target.closest('[data-scroll]');if(scroll)$('#main-row').scrollBy({left:Number(scroll.dataset.scroll)*$('#main-row').clientWidth*.75,behavior:'smooth'});});
$('.modal-close').onclick=close;dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});dialog.addEventListener('close',()=>document.body.style.overflow='');$('#search-toggle').onclick=()=>{$('#search-panel').hidden=false;$('#search').focus()};function closeSearch(){const results=$('#page-search-results');if(results)results.innerHTML='';$('#search-panel').hidden=true;query='';$('#search').value='';render();$('#search-toggle').focus()}$('#search-close').onclick=closeSearch;$('#search').addEventListener('input',e=>{query=e.target.value.trim().toLocaleLowerCase('sl');view='all';render();$('#browse').scrollIntoView({behavior:'smooth',block:'start'})});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#search-panel').hidden)closeSearch()});
let introFocus;
function finishIntro(){clearTimeout(introTimer);$('#intro').hidden=true;$('#app').inert=false;document.body.classList.remove('intro-playing');if(introFocus?.isConnected)introFocus.focus({preventScroll:true});}
function playIntro(){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){finishIntro();return;}
  introFocus=document.activeElement;
  const intro=$('#intro');intro.hidden=false;
  intro.getAnimations({subtree:true}).forEach(animation=>{animation.cancel();animation.play()});
  $('#app').inert=true;document.body.classList.add('intro-playing');
  clearTimeout(introTimer);introTimer=setTimeout(finishIntro,4900);
}


if(matchMedia('(prefers-reduced-motion: reduce)').matches)finishIntro();else playIntro();

const slides=[{title:'ONE UP<span>2026<span class="title-dot">.</span></span>',subtitle:'En dogodek. Neskončno svetov.',description:'Anime, gaming, cosplay in ljudje, ki te razumejo.<br>Vstopi v svet ONE UP in odkrij svojo naslednjo strast.',id:'oneup',cta:'Razišči ONE UP',note:'IZ ARHIVA · 14. FEBRUAR 2026 · CELJE',image:'wolf.png'}, {title:'TVOJ<span>SVET<span class="title-dot">.</span></span>',subtitle:'Tukaj si med svojimi.',description:'Prostor za anime, mange, igre in ustvarjalnost.<br>Spoznaj skupnost AMIARU v Sloveniji.',id:'about',cta:'Spoznaj AMIARU',note:'SKUPNOST · USTVARJALNOST · JAPANSKA POP KULTURA',image:'world.jpg'}, {title:'OKAMI &<span>KITSUNE<span class="title-dot">.</span></span>',subtitle:'Umetnost, ki jo nosiš s seboj.',description:'Izvirne ilustracije slovenskih ustvarjalcev.<br>Odkrij ustvarjalno stran skupine AMIARU.',id:'art',cta:'Odkrij ilustracije',note:'OKAMI & KITSUNE ART · AMIARU',image:'art.jpg'}];let activeSlide=0,heroElapsed=0,heroFrame,lastHeroTick;
const heroDuration=6500;
const hero=$('.hero'),motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
function showSlide(n){activeSlide=n;const s=slides[n];$('#hero-title').innerHTML=s.title;$('.hero h2').textContent=s.subtitle;$('.hero-description').innerHTML=s.description;$('.hero-actions .primary').dataset.open=s.id;$('.hero-actions .primary').innerHTML=`<span>▶</span> ${s.cta}`;$('.archive-note').textContent=s.note;$('.hero-wolf').src=`assets/${s.image}`;$('.hero-wolf').alt=s.id==='oneup'?'Okami, beli volk skupine AMIARU':s.id==='about'?'Ilustracija sveta AMIARU':'Okami in Kitsune ilustracija';$('.hero-wolf').style.objectFit=n?'cover':'contain';$('.hero-wolf').style.opacity=n?'.55':'1';$('.hero-bottom b').textContent=`0${n+1}`;document.querySelectorAll('[data-slide]').forEach(x=>x.classList.toggle('active',Number(x.dataset.slide)===n));
if(!motionPreference.matches){for(const element of [$('.hero-content'),$('.hero-wolf')]){element.getAnimations().forEach(a=>a.cancel());element.animate([{opacity:0},{opacity:element===$('.hero-wolf')?(n?.55:1):1}],{duration:650,easing:'ease-out'});}}
}
function paintHeroProgress(){document.querySelectorAll('[data-slide]').forEach((marker,index)=>{marker.style.setProperty('--slide-progress',index===activeSlide?(motionPreference.matches?1:heroElapsed/heroDuration):0);marker.setAttribute('aria-current',index===activeSlide?'true':'false');});}
function tickHero(now){
  const delta=lastHeroTick===undefined?0:now-lastHeroTick;lastHeroTick=now;
  const focusedAction=hero.contains(document.activeElement)&&!document.activeElement.closest('[data-slide]');
  if(!document.hidden&&$('#intro').hidden&&!dialog.open&&!focusedAction){
    heroElapsed+=delta;
    if(heroElapsed>=heroDuration){heroElapsed=0;showSlide((activeSlide+1)%slides.length);}
    paintHeroProgress();
  }
  heroFrame=requestAnimationFrame(tickHero);
}
function startHeroClock(){cancelAnimationFrame(heroFrame);lastHeroTick=undefined;paintHeroProgress();if(!motionPreference.matches&&!document.hidden)heroFrame=requestAnimationFrame(tickHero);}
document.querySelectorAll('[data-slide]').forEach(button=>button.onclick=()=>{heroElapsed=0;lastHeroTick=undefined;showSlide(Number(button.dataset.slide));paintHeroProgress();});
document.addEventListener('visibilitychange',startHeroClock);
motionPreference.addEventListener('change',startHeroClock);
startHeroClock();render();


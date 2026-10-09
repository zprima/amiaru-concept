const sourcePages=window.AMIARU_PAGES;
const families={amiaru:'Skupina AMIARU',oneup:'ONE UP 2026',art:'Okami & Kitsune',blog:'Blog'};
const pageRoutes={oneup:'oneup/domov',about:'amiaru/o-nas',art:'art/overview',blog:'blog/overview',anime:'amiaru/tori',games:'oneup/igre',origami:'oneup/razstave',retro:'oneup/igre'};
let readerOpener;
function closeReader(){if(location.hash.slice(1) in pageRoutes){history.replaceState(null,'',location.pathname+location.search);}else if(sourcePages.some(p=>p.id===location.hash.slice(1))){history.replaceState(null,'',location.pathname+location.search);}dialog.close();document.body.style.overflow='';readerOpener?.focus?.({preventScroll:true});}
function navigateReader(route){if(location.hash==='#'+route)renderReader(route);else location.hash=route;}
function renderReader(route){
  const page=sourcePages.find(p=>p.id===route);if(!page)return;
  const wasOpen=dialog.open;
  if(!wasOpen)readerOpener=document.activeElement;
  dialog.classList.add('content-reader');
  dialog.innerHTML=`<button class="modal-close icon" aria-label="Zapri podrobnosti"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button><div class="reader-top"><div class="reader-heading"><h2 id="modal-title">${families[page.family]}</h2><span class="reader-label">${page.family==='oneup'?'ARHIV DOGODKA':'SVET AMIARU'}</span></div><nav class="reader-tabs" aria-label="Vsebine ${families[page.family]}">${sourcePages.filter(p=>p.family===page.family).map(p=>`<a href="#${p.id}" aria-current="${p.id===page.id?'page':'false'}">${p.title}</a>`).join('')}</nav></div>${page.family==='oneup'?'<div class="archive-banner"><strong>Arhiv · 14. februar 2026 · Celjski sejem</strong><br>Spodaj je ohranjena izvirna vsebina preteklega dogodka. Prijave, ponudbe in povezave za vstopnice se nanašajo na ONE UP 2026.</div>':''}<article class="page-content">${page.html}</article><div class="reader-source"><a href="https://amiaru.com/?column=${page.family==='oneup'?'oneup2026':page.family==='art'?'okami-kitsune':page.family}&${page.family==='amiaru'?'tab':'section'}=${page.id.split('/')[1]}" target="_blank" rel="noopener">Izvirna vsebina na amiaru.com ↗</a></div>`;
  dialog.querySelector('.modal-close').onclick=closeReader;
  if(!dialog.open)dialog.showModal();
  document.body.style.overflow='hidden';dialog.scrollTop=0;
  const activeTab=dialog.querySelector('[aria-current="page"]');
  activeTab?.scrollIntoView({block:'nearest',inline:'nearest'});
  if(wasOpen)activeTab?.focus({preventScroll:true});
}
// Existing hero and card actions now open the complete corresponding section.
open=function(id){navigateReader(pageRoutes[id]||id)};
dialog.addEventListener('cancel',e=>{e.preventDefault();closeReader()});
dialog.addEventListener('close',()=>{if(sourcePages.some(p=>p.id===location.hash.slice(1)))history.replaceState(null,'',location.pathname+location.search)});
window.addEventListener('hashchange',()=>{const route=location.hash.slice(1);if(sourcePages.some(p=>p.id===route))renderReader(route);else if(dialog.open)closeReader()});
if(sourcePages.some(p=>p.id===location.hash.slice(1)))renderReader(location.hash.slice(1));
const pageSearchIndex=sourcePages.map(page=>{const template=document.createElement('template');template.innerHTML=page.html;return {page,text:(page.title+' '+template.content.textContent).toLocaleLowerCase('sl')}});
function renderPageSearch(){const term=$('#search').value.trim().toLocaleLowerCase('sl');$('#page-search-results').innerHTML=term?pageSearchIndex.filter(x=>x.text.includes(term)).map(({page})=>`<a class="search-page" href="#${page.id}"><small>${families[page.family]}</small>${page.title} ↗</a>`).join(''):'';if($('#page-search-results').children.length)$('#empty').hidden=true;}
$('#search').addEventListener('input',renderPageSearch);
$('#search-close').addEventListener('click',()=>$('#page-search-results').innerHTML='');
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>$('#page-search-results').innerHTML=''));

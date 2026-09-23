/* ================== DONNEES ================== */
var GARNITURES = ['Riz', 'Pommes de terre', 'Salade verte', 'Pâtes', 'Légumes sautés', 'Boulgour', 'Haricots verts', 'Semoule'];
var ENTREES_FROIDES = ['Salade variée', 'Crudités de saison', 'Œufs durs mayonnaise'];
var ENTREES_CHAUDES = ['Potage de légumes', 'Crème de volaille', 'Soufflé', 'Mini pizza'];
var ENTREES_FROIDES_IMP = ['Salade de poulpe', 'Salade de thon', 'Blanc de seiche'];
var ENTREES_CHAUDES_IMP = ['Gratin au poulet', 'Brick tunisien', 'Boureks à la viande hachée'];
var ENTREES_CHAUDES_POISSON = ['Gratin aux fruits de mer', 'Brick au thon', 'Boureks aux crevettes'];
var VIANDES_BLANCHES = ['Cuisse de poulet rôtie', 'Escalope de dinde grillée'];
var VIANDES_ROUGES = ['Boulettes hachées à l\'italienne', 'Méchoui d\'agneau', 'Filet de veau grillé', 'Brochettes royales'];
var POISSONS = ['Daurade au four', 'Merlan en friture', 'Espadon grillé', 'Brochettes de thon'];
var DEFAULT_COFFRETS = [
  {id:'lunch', nom:'Le Lunch Bag', prix:null, img:'c-collation.jpg', d:"Le sac repas pratique : sandwich céréales, fruit et boisson.",
   compo:["Sandwich pain aux céréales, viande froide, laitue, fromage, sauce","Fruit","Soda ou jus en bouteille + eau minérale","Serviette, lingette rince-doigt","Cure-dent, dosettes sel & poivre noir"]},
  {id:'basique', nom:'Coffret Basique', prix:1000, img:'c-standard.jpg', d:"Entrée + plat de résistance (2 garnitures) + dessert.",
   compo:["Entrée froide ou chaude : salade variée, crudités, œufs mayonnaise, potage, mini pizza…","Plat de résistance : viande blanche ou rouge + 2 garnitures","Fruit de saison ou yaourt","Pain + couverts complets + serviette","Soda ou jus + eau minérale","Lingette, cure-dent, sel & poivre"],
   choices:{entryType:'choice', entryFroides:ENTREES_FROIDES, entryChaudes:ENTREES_CHAUDES,
    meatType:'choice', viandesBlanches:VIANDES_BLANCHES, viandesRouges:VIANDES_ROUGES,
    garnitures:GARNITURES, maxGarnitures:2}},
  {id:'standard', nom:'Coffret Standard', prix:1200, img:'c-confort.jpg', d:"Comme le Basique, avec plat à 3 garnitures.", flag:"Le plus commandé",
   compo:["Entrée froide ou chaude au choix","Plat de résistance : viande blanche ou rouge + 3 garnitures","Fruit de saison ou yaourt","Pain + couverts complets + serviette","Soda ou jus + eau minérale","Lingette, cure-dent, sel & poivre"],
   choices:{entryType:'choice', entryFroides:ENTREES_FROIDES, entryChaudes:ENTREES_CHAUDES,
    meatType:'choice', viandesBlanches:VIANDES_BLANCHES, viandesRouges:VIANDES_ROUGES,
    garnitures:GARNITURES, maxGarnitures:3}},
  {id:'premium', nom:'Coffret Premium', prix:2000, img:'c-prestige.jpg', d:"Deux entrées (froide + chaude) et fruit ou pâtisserie.",
   compo:["Entrée froide : salade variée, crudités de saison…","Entrée chaude : potage, crème de volaille, soufflé, mini pizza…","Plat de résistance + 3 garnitures","Fruit de saison ou pâtisserie","Pain + couverts + serviette","Soda ou jus + eau minérale + accessoires"],
   choices:{entryFroides:ENTREES_FROIDES, entryChaudes:ENTREES_CHAUDES,
    meatType:'choice', viandesBlanches:VIANDES_BLANCHES, viandesRouges:VIANDES_ROUGES,
    garnitures:GARNITURES, maxGarnitures:3,
    dessert:['Fruit de saison', 'Pâtisserie']}},
  {id:'excellence', nom:'Coffret Excellence', prix:null, img:'hero-buffet.jpg', d:"Entrées améliorées : gratin au poulet, brick tunisien, boureks…",
   compo:["Entrée froide améliorée","Entrée chaude améliorée : gratin au poulet, brick tunisien, boureks à la viande hachée…","Plat de résistance + 3 garnitures","Fruit ou pâtisserie","Soda ou jus + eau minérale + accessoires complets"],
   choices:{entryFroides:ENTREES_FROIDES_IMP, entryChaudes:ENTREES_CHAUDES_IMP,
    garnitures:GARNITURES, maxGarnitures:3,
    dessert:['Fruit de saison', 'Pâtisserie']}},
  {id:'privv', nom:'Coffret Privilège Viande', prix:3000, img:'c-vip.jpg', d:"Le VIP : méchoui d'agneau, filet de veau grillé, brochettes royales…", flag:"VIP",
   compo:["Entrée froide améliorée + entrée chaude améliorée","Plat amélioré : méchoui d'agneau, filet de veau grillé, brochettes royales… + 3 garnitures","Fruit de saison ou pâtisserie","Pain + couverts + serviette","Soda ou jus + eau minérale + accessoires"],
   choices:{entryFroides:ENTREES_FROIDES_IMP, entryChaudes:ENTREES_CHAUDES_IMP,
    meatType:'fixed_rouge', viandesRouges:['Méchoui d\'agneau', 'Filet de veau grillé', 'Brochettes royales'],
    garnitures:GARNITURES, maxGarnitures:3,
    dessert:['Fruit de saison', 'Pâtisserie']}},
  {id:'privp', nom:'Coffret Privilège Poisson', prix:3500, img:'c-poisson.jpg', d:"Le VIP mer : daurade au four, espadon grillé, brochettes de thon…", flag:"VIP",
   compo:["Entrée froide améliorée : salade de poulpe, salade de thon, blanc de seiche…","Entrée chaude : gratin de fruits de mer, brick au thon, boureks aux crevettes…","Plat au poisson : daurade au four, merlan, espadon grillé, brochettes de thon… + 3 garnitures","Fruit ou pâtisserie","Soda ou jus + eau minérale + accessoires"],
   choices:{entryFroides:ENTREES_FROIDES_IMP, entryChaudes:ENTREES_CHAUDES_POISSON,
    meatType:'fixed_poisson', viandesRouges:POISSONS,
    garnitures:GARNITURES, maxGarnitures:3,
    dessert:['Fruit de saison', 'Pâtisserie']}}
];
var TVA = 0.19;
function esc(t){return String(t).replace(/</g,'&lt;');}
function cofImg(c){ return c.imgData || ('img/' + (c.img || 'c-standard.jpg')); }
function fmt(n){return n.toLocaleString('fr-FR').replace(/ | /g,' ') + ' DA';}
function load(k,d){try{return JSON.parse(localStorage.getItem(k)) || d}catch(e){return d}}
function save(k,v){localStorage.setItem(k, JSON.stringify(v));}
var USER = load('err_user', null);
var LINES = load('err_lines', []);
var ORDERS = load('err_orders', null);
var FBS = load('err_fbs', null);
var COFFRETS = load('err_cofs', null) || DEFAULT_COFFRETS;
/* Migration : ajoute les `choices` aux coffrets déjà cachés en localStorage (anciennes visites).
   Les prix/noms modifiés par le traiteur sont conservés — seuls les choix manquants sont complétés. */
COFFRETS.forEach(function(c){
  var d = DEFAULT_COFFRETS.filter(function(x){return x.id===c.id;})[0];
  if(d && d.choices && !c.choices) c.choices = d.choices;
});
save('err_cofs', COFFRETS);
var LIVREURS = load('err_livreurs', null) || ['Rachid', 'Sofiane', 'Mounir'];
var DESSERTS = load('err_desserts', null) || ['Fruit : pomme', 'Fruit : orange', 'Fruit : banane', 'Yaourt', 'Pâtisserie du jour'];
var BOISSONS = load('err_boissons', null) || ['Soda', "Jus d'orange", 'Jus multifruits'];
if(!ORDERS){
  ORDERS = [
    {ref:'ERR-1042', client:{nom:'Amel Z.', etab:'Merinal Laboratoires', tel:'0550 11 22 33', email:'a.z@merinal.dz'},
     lignes:[{nom:'Coffret Standard', qty:45, pu:1200}], total:54000, date:'2026-09-24', heure:'12:00',
     lieu:'Siège Merinal, Zone industrielle Oued Smar', tel:'0550 11 22 33', note:'Livraison quai B', st:'confirmee', rep:null, prep:{dessert:'Fruit : orange', boisson:"Jus d'orange", livreur:'Rachid'}},
    {ref:'ERR-1043', client:{nom:'Karim H.', etab:'Colas Rail — Base vie Hassi Messaoud', tel:'0661 44 55 66', email:'k.h@colasrail.dz'},
     lignes:[{nom:'Coffret Privilège Viande', qty:12, pu:3000},{nom:'Coffret Basique', qty:30, pu:1000}], total:66000, date:'2026-09-26', heure:'11:30',
     lieu:'Aéroport Alger, fret — départ base vie', tel:'0661 44 55 66', note:'', st:'attente', rep:null, prep:{dessert:'', boisson:'', livreur:''}},
    {ref:'ERR-1044', client:{nom:'Amel Z.', etab:'Merinal Laboratoires', tel:'0550 11 22 33', email:'a.z@merinal.dz'},
     lignes:[{nom:'Coffret Basique', qty:45, pu:1000}], total:45000, date:'2026-09-24', heure:'16:30',
     lieu:'Siège Merinal, Zone industrielle Oued Smar', tel:'0550 11 22 33', note:'Collation d\'après-midi', st:'attente', rep:null, prep:{dessert:'', boisson:'', livreur:''}}
  ];
  save('err_orders', ORDERS);
}
ORDERS.forEach(function(o){
  if(!o.prep) o.prep = {dessert:'', boisson:'', livreur:''};
  /* Migration : l'ancien choix dessert/boisson par commande devient le détail par ligne */
  if(!o.detailLines && (o.prep.dessert || o.prep.boisson)){
    o.detailLines = o.lignes.map(function(){
      return {entree:'', viande:'', garnitures:'', dessert:o.prep.dessert||'', boisson:o.prep.boisson||''};
    });
  }
});
save('err_orders', ORDERS);
var PAYMENTS = load('err_pays', null);
if(!PAYMENTS){
  PAYMENTS = [{id:'P-1001', email:'a.z@merinal.dz', etab:'Merinal Laboratoires', montant:40000, type:'Virement', date:'2026-09-20', st:'enc'}];
  save('err_pays', PAYMENTS);
}
function fTTC(o){ return Math.round(o.total * (1 + TVA)); }
function dueFor(email){
  return ORDERS.filter(function(o){return o.client.email===email && o.st==='confirmee';})
    .reduce(function(t,o){return t + fTTC(o);}, 0);
}
function paidFor(email){
  return PAYMENTS.filter(function(x){return x.email===email && x.st==='enc';})
    .reduce(function(t,x){return t + x.montant;}, 0);
}
function balFor(email){ return dueFor(email) - paidFor(email); }
function clientsList(){
  var seen = {}, out = [];
  ORDERS.forEach(function(o){ if(!seen[o.client.email]){ seen[o.client.email]=1; out.push(o.client); } });
  return out;
}
var PAY_ST = {enc:'Encaissé', att:'En attente'};
if(!FBS){
  FBS = [{de:'Amel Z. (Merinal Laboratoires)', txt:"Le coffret Standard de mardi était impeccable, juste prévoir plus de pain la prochaine fois.", quand:'il y a 3 jours'}];
  save('err_fbs', FBS);
}

/* ================== SPLASH ================== */
setTimeout(function(){ document.getElementById('splash').classList.add('done'); }, 2600);

/* ================== NAVIGATION ================== */
function goV(v){
  document.querySelectorAll('.view').forEach(function(e){e.classList.remove('on');});
  document.getElementById('v-'+v).classList.add('on');
  window.scrollTo({top:0});
  if(v==='admin'){ renderAdmin(); renderCat(); renderAPay(); }
  if(v==='profil') renderProfil();
  if(v==='commandes') renderMes();
  if(v==='paiements') renderPays();
}
function goPaneA(p){
  document.querySelectorAll('#v-admin .tab').forEach(function(t){t.classList.toggle('on', t.dataset.pane===p);});
  document.querySelectorAll('#v-admin .pane').forEach(function(x){x.classList.remove('on');});
  document.getElementById('p-'+p).classList.add('on');
  if(p==='apay') renderAPay();
}
function openOv(id){
  document.querySelectorAll('.ov.open').forEach(function(o){ o.classList.remove('open'); });
  document.getElementById(id).classList.add('open');
  if(id==='ov-auth'){ authTab('login'); renderLoginList(); }
}
function closeOv(id){document.getElementById(id).classList.remove('open');}
function chipClick(){ if(USER){ goV('profil'); } else { openOv('ov-auth'); } }
function logout(){ USER = null; save('err_user', null); refreshChip(); goV('public'); }
function refreshChip(){
  var reg = document.getElementById('btn-register');
  if(USER){
    document.getElementById('userchip').textContent = '👤 ' + USER.etab;
    document.getElementById('userchip').onclick = null;
    document.getElementById('userchip').title = USER.etab;
    if(reg) reg.style.display = 'none';
  } else {
    document.getElementById('userchip').textContent = 'Se connecter';
    document.getElementById('userchip').onclick = chipClick;
    document.getElementById('userchip').title = '';
    if(reg) reg.style.display = '';
  }
  updateCartBadge();
}
refreshChip();

/* ================== COFFRETS (public) ================== */
function renderCofs(){
  var el = document.getElementById('cofs');
  el.innerHTML = '';
  COFFRETS.forEach(function(c, i){
    var d = document.createElement('div');
    d.className = 'cof';
    d.innerHTML = (c.flag?('<span class="flag">'+c.flag+'</span>'):'') +
      '<div class="dia"><img src="'+cofImg(c)+'" alt=""></div><h3>'+esc(c.nom)+'</h3>' +
      '<div class="px">'+(c.prix?fmt(c.prix):'Sur demande')+(c.prix?' <small>/ coffret</small>':'')+'</div>' +
      '<p>'+c.d+'</p>' +
      '<div class="acts"><button class="btn sm ghost" onclick="openCompo('+i+')">Composition</button>' +
      (c.prix
        ? '<button class="btn sm red" onclick="orderCof('+i+')">Commander</button>'
        : '<a class="btn sm red" href="https://wa.me/213770371909?text=' + encodeURIComponent('Bonjour Erriane Foods, je souhaite un devis pour : ' + c.nom + '.') + '" target="_blank" rel="noopener">Demander un devis</a>') +
      '</div>';
    el.appendChild(d);
  });
}
renderCofs();
function openCompo(i){
  var c = COFFRETS[i];
  document.getElementById('cp-titre').textContent = c.nom;
  document.getElementById('cp-prix').textContent = c.prix ? (fmt(c.prix) + ' par coffret') : 'Tarif sur demande selon quantités';
  var ul = document.getElementById('cp-list'); ul.innerHTML='';
  (c.compo && c.compo.length ? c.compo : ['Composition détaillée sur demande — contactez Erriane Foods.']).forEach(function(x){ var li=document.createElement('li'); li.textContent=x; ul.appendChild(li); });
  var cpBtn = document.getElementById('cp-order');
  if(c.prix){
    cpBtn.style.display = ''; cpBtn.textContent = 'Commander ce coffret';
    cpBtn.onclick = function(){ closeOv('ov-compo'); orderCof(i); };
  } else {
    cpBtn.style.display = 'none';
  }
  openOv('ov-compo');
}
function startOrder(){ orderCof(2); } /* standard par defaut */
var PENDING = null;
var ORD_COF = null;
function orderCof(i){
  ORD_COF = i;
  PENDING = (typeof i === 'number') ? i : null;
  if(!USER){ openOv('ov-auth'); return; }
  var c = COFFRETS[i];
  if(!c.prix){
    window.open('https://wa.me/213770371909?text=' + encodeURIComponent('Bonjour Erriane Foods, je souhaite un devis pour : ' + c.nom + '.'), '_blank');
    return;
  }
  openOrderForm(i);
}
function openOrderForm(i){
  var c = COFFRETS[i];
  document.getElementById('ord-title').textContent = c.nom;
  document.getElementById('ord-preview').innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div><b>' + esc(c.nom) + '</b><br><span style="color:var(--muted);font-size:.85rem">' + (c.compo ? c.compo.slice(0,2).join(' · ') : '') + '</span></div>' +
      '<div style="text-align:right"><span style="font-family:\'Anton\';font-size:1.2rem;color:var(--red)">' + fmt(c.prix) + '</span><br><span style="color:var(--muted);font-size:.8rem">/ coffret</span></div>' +
    '</div>';
  document.getElementById('c-qty').value = 10;
  document.getElementById('c-err').style.display = 'none';
  updateOrdTotal();
  openOv('ov-order');
}
function updateOrdTotal(){
  if(ORD_COF === null) return;
  var c = COFFRETS[ORD_COF];
  var qty = parseInt(document.getElementById('c-qty').value) || 0;
  document.getElementById('ord-total').textContent = fmt(qty * c.prix);
}

/* ================== AUTH ================== */
function authTab(which){
  document.getElementById('tab-login').classList.toggle('on', which==='login');
  document.getElementById('tab-reg').classList.toggle('on', which==='reg');
  document.getElementById('a-login').classList.toggle('on', which==='login');
  document.getElementById('a-reg').classList.toggle('on', which==='reg');
}
function renderLoginList(){
  var el = document.getElementById('login-list');
  var accts = clientsList();
  el.innerHTML = accts.length ? accts.map(function(c){
    return '<div class="demo-acct" onclick="loginAs(\'' + c.email.replace(/'/g,"\\'") + '\')">' +
      '<div><b>' + esc(c.etab) + '</b><span>' + esc(c.nom) + ' · ' + esc(c.email) + '</span></div></div>';
  }).join('') : '<div style="color:var(--muted);font-size:.86rem;margin-bottom:12px">Aucun compte pour l\'instant : créez le vôtre dans l\'onglet « Créer un compte ».</div>';
}
function enterAs(u){
  USER = u;
  save('err_user', USER); refreshChip(); closeOv('ov-auth');
  if(PENDING !== null){ var tmp = PENDING; PENDING = null; orderCof(tmp); }
  else { goV('profil'); }
}
function loginAs(email){
  var c = clientsList().filter(function(x){ return x.email===email; })[0];
  if(c) enterAs({nom:c.nom, tel:c.tel, etab:c.etab, email:c.email});
}
function login(){
  var email = document.getElementById('l-email').value.trim().toLowerCase();
  var c = clientsList().filter(function(x){ return x.email.toLowerCase()===email; })[0];
  if(!c){ document.getElementById('l-err').style.display='block'; return; }
  document.getElementById('l-err').style.display='none';
  enterAs({nom:c.nom, tel:c.tel, etab:c.etab, email:c.email});
}
function register(){
  var nom = document.getElementById('a-nom').value.trim(),
      tel = document.getElementById('a-tel').value.trim(),
      etab = document.getElementById('a-etab').value.trim(),
      email = document.getElementById('a-email').value.trim();
  if(!nom || tel.length < 8 || !etab || email.indexOf('@') < 1){
    document.getElementById('a-err').style.display='block'; return;
  }
  enterAs({nom:nom, tel:tel, etab:etab, email:email});
}

/* ================== CLIENT : commande ================== */
function renderProfil(){
  if(!USER) return;
  document.getElementById('cl-hello').textContent = USER.nom + ' · ' + USER.etab;
  document.getElementById('pf-etab').textContent = USER.etab;
  document.getElementById('pf-nom').textContent = USER.nom;
  document.getElementById('pf-tel').textContent = USER.tel;
  document.getElementById('pf-email').textContent = USER.email;
  renderBal();
}
function renderCommandes(){
  document.getElementById('cl-hello2').textContent = USER ? (USER.nom + ' · ' + USER.etab) : '';
  renderMes();
}
function renderBal(){
  var el = document.getElementById('cl-bal');
  if(!USER){ el.innerHTML=''; return; }
  var b = balFor(USER.email);
  if(b > 0){
    el.innerHTML = '<div class="bal red"><span>⚠️ Reste à payer sur votre compte</span><span class="amt">' + fmt(b) + '</span></div>';
  } else if(b < 0){
    el.innerHTML = '<div class="bal green"><span>✓ Avoir en votre faveur</span><span class="amt">' + fmt(-b) + '</span></div>';
  } else {
    el.innerHTML = '<div class="bal green"><span>✓ Solde : 0 DA — compte à jour</span><span class="amt">👍</span></div>';
  }
}
function renderPays(){
  if(document.getElementById('cl-hello3')) document.getElementById('cl-hello3').textContent = USER ? (USER.nom + ' · ' + USER.etab) : '';
  if(!USER) return;
  var due = dueFor(USER.email), paid = paidFor(USER.email), b = due - paid;
  document.getElementById('cl-pay-sum').innerHTML =
    '<h3>Votre compte</h3>' +
    '<div style="display:flex;gap:26px;flex-wrap:wrap;font-size:.95rem">' +
    '<span>Facturé (commandes confirmées, TTC) : <b>' + fmt(due) + '</b></span>' +
    '<span>Versements encaissés : <b>' + fmt(paid) + '</b></span>' +
    '<span>Solde : <b class="' + (b>0?'bal-neg':'bal-pos') + '">' + fmt(b) + '</b></span></div>';
  var mine = PAYMENTS.filter(function(x){return x.email===USER.email;})
    .sort(function(a,b){return b.date.localeCompare(a.date);});
  document.getElementById('cl-pays').innerHTML = mine.length ? mine.map(function(x){
    return '<tr><td>' + x.date.split('-').reverse().join('/') + '</td><td>' + x.type + '</td><td><b>' + fmt(x.montant) + '</b></td>' +
      '<td><span class="stp2 ' + x.st + '">' + PAY_ST[x.st] + '</span></td></tr>';
  }).join('') : '<tr><td colspan="4" style="padding:16px;text-align:center;color:var(--muted)">Aucun versement enregistré pour l\'instant.</td></tr>';
}
function addToCart(){
  if(ORD_COF === null) return;
  var c = COFFRETS[ORD_COF];
  var qty = parseInt(document.getElementById('c-qty').value) || 0;
  if(!qty){ document.getElementById('c-err').style.display='block'; return; }
  document.getElementById('c-err').style.display='none';
  LINES.push({cofId:c.id, nom:c.nom, qty:qty, pu:c.prix});
  saveLines();
  updateCartBadge();
  closeOv('ov-order');
  ORD_COF = null;
  toast('✓ ' + qty + ' × ' + c.nom + ' ajouté au panier');
}
var ST_LABEL = {attente:'En attente', confirmee:'Confirmée', annulee:'Annulée', reportee:'Autre date proposée'};
function ordHtml(o, admin){
  var lignes = o.lignes.map(function(l){return l.nom+' × '+l.qty;}).join(' · ');
  var h = '<div class="ord"><div class="top"><span class="ref">'+o.ref+'</span><span class="st '+o.st+'">'+ST_LABEL[o.st]+'</span></div>';
  h += '<div class="det">📅 <b>'+o.date.split('-').reverse().join('/')+' à '+o.heure+'</b> — 📍 '+o.lieu;
  if(o.tel) h += ' · 📞 '+o.tel;
  h += '<br>🍱 '+lignes+' — <b>'+fmt(o.total)+'</b>';
  if(o.note) h += '<br>📝 '+o.note;
  if(o.rep) h += '<br><span style="color:#3949ab;font-weight:600">📆 Nouvelle date proposée : '+o.rep+'</span>';
  if(admin) h += '<br>👤 <b>'+o.client.nom+'</b> — '+o.client.etab+' · '+o.client.tel+' · '+o.client.email;
  h += '</div><div class="acts">';
  if(admin){
    if(o.st==='attente' || o.st==='reportee'){
      h += '<button class="abtn ok" onclick="setSt(\''+o.ref+'\',\'confirmee\')">✓ Prendre en charge</button>';
      h += '<button class="abtn rep" onclick="openRep(\''+o.ref+'\')">📆 Autre date</button>';
      h += '<button class="abtn ko" onclick="setSt(\''+o.ref+'\',\'annulee\')">✕ Annuler</button>';
    } else {
      h += '<button class="abtn neutral" onclick="setSt(\''+o.ref+'\',\'attente\')">↩ Remettre en attente</button>';
    }
  } else {
    h += '<button class="abtn neutral" onclick="openInv(\''+o.ref+'\')">🧾 Facture</button>';
  }
  h += '</div></div>';
  return h;
}
function renderMes(){
  if(document.getElementById('cl-hello2')) document.getElementById('cl-hello2').textContent = USER ? (USER.nom + ' · ' + USER.etab) : '';
  var mine = ORDERS.filter(function(o){return USER && o.client.email === USER.email;});
  document.getElementById('mes-list').innerHTML = mine.length
    ? mine.map(function(o){return ordHtml(o, false);}).join('')
    : '<div class="panel" style="color:var(--muted)">Aucune commande pour l\'instant. <a href="#" onclick="orderCof(2);return false;" style="color:var(--red);font-weight:700">Passez votre première commande →</a></div>';
}
function sendFb(){
  var el = document.getElementById('fb-txt');
  if(!el) return;
  var t = el.value.trim();
  if(!t){ return; }
  FBS.unshift({de: USER.nom + ' (' + USER.etab + ')', txt: t, quand: "à l'instant"});
  save('err_fbs', FBS);
  document.getElementById('fb-txt').value='';
  document.getElementById('fb-ok').style.display='block';
}

/* ================== PANIER ================== */
function saveLines(){ save('err_lines', LINES); updateCartBadge(); }
function updateCartBadge(){
  var n = LINES.reduce(function(t,l){return t+l.qty;},0);
  var b = document.getElementById('cart-badge');
  var c = document.getElementById('cart-count');
  if(n > 0){ b.style.display=''; c.textContent = n; } else { b.style.display='none'; }
}
function openCart(){
  var el = document.getElementById('cart-lines');
  var ft = document.getElementById('cart-footer');
  if(!LINES.length){ el.innerHTML = '<div style="color:var(--muted);padding:20px 0;text-align:center">Votre panier est vide.</div>'; ft.style.display='none'; openOv('ov-cart'); return; }
  var total = 0;
  el.innerHTML = LINES.map(function(l, i){
    var sub = l.qty * l.pu; total += sub;
    return '<div class="ln" style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px dashed var(--line)"><div style="flex:1"><b>'+esc(l.nom)+'</b><br><span style="color:var(--muted);font-size:.82rem">'+fmt(l.pu)+' / coffret</span></div><div style="display:flex;align-items:center;gap:8px"><button class="qty-btn" onclick="cartQty('+i+',-1)">−</button><span style="font-weight:700;min-width:24px;text-align:center">'+l.qty+'</span><button class="qty-btn" onclick="cartQty('+i+',1)">+</button><span style="font-weight:700;min-width:80px;text-align:right">'+fmt(sub)+'</span><span style="color:var(--red);cursor:pointer;font-weight:800;padding:0 6px;font-size:1.1rem" onclick="rmCartLine('+i+')" title="Retirer">✕</span></div></div>';
  }).join('');
  el.innerHTML += '<div style="text-align:right;margin-top:12px"><button class="btn sm ghost" style="color:var(--red);border-color:var(--red)" onclick="clearCart()">🗑 Vider le panier</button></div>';
  document.getElementById('cart-total').textContent = fmt(total);
  ft.style.display = '';
  openOv('ov-cart');
}
function cartQty(i, d){
  LINES[i].qty = Math.max(1, LINES[i].qty + d);
  saveLines(); openCart();
}
function rmCartLine(i){ LINES.splice(i, 1); saveLines(); openCart(); }
function clearCart(){ if(confirm('Vider votre panier ?')){ LINES = []; saveLines(); openCart(); } }
function openCheckout(){
  if(!USER){ closeOv('ov-cart'); openOv('ov-auth'); return; }
  closeOv('ov-cart');
  var total = LINES.reduce(function(t,l){return t+l.qty*l.pu;},0);
  var summary = LINES.map(function(l){ return l.qty + ' × ' + l.nom + ' — <b>' + fmt(l.qty*l.pu) + '</b>'; }).join('<br>');
  document.getElementById('ck-summary').innerHTML = summary;
  document.getElementById('ck-total').textContent = fmt(total);
  document.getElementById('ck-date').min = new Date().toISOString().split('T')[0];
  document.getElementById('ck-err').style.display = 'none';
  openOv('ov-checkout');
}
function submitCartOrder(){
  if(!LINES.length || !USER) return;
  var date = document.getElementById('ck-date').value,
      heure = document.getElementById('ck-heure').value,
      lieu = document.getElementById('ck-lieu').value.trim(),
      tel = document.getElementById('ck-tel').value.trim();
  if(!date || !heure || !lieu || !tel){ document.getElementById('ck-err').style.display='block'; return; }
  document.getElementById('ck-err').style.display='none';
  var o = {
    ref: 'ERR-' + Math.floor(1000 + Math.random()*9000),
    client: USER,
    lignes: LINES.map(function(l){ return {nom:l.nom, qty:l.qty, pu:l.pu}; }),
    total: LINES.reduce(function(t,l){return t+l.qty*l.pu;},0),
    date: date, heure: heure, lieu: lieu, tel: tel,
    note: document.getElementById('ck-note').value.trim(),
    st: 'attente', rep: null, prep: {dessert:'', boisson:'', livreur:''}
  };
  ORDERS.unshift(o); save('err_orders', ORDERS);
  LINES = []; saveLines(); updateCartBadge();
  closeOv('ov-checkout');
  toast('✓ Commande ' + o.ref + ' envoyée !<br><a href="#" onclick="goV(\'commandes\');return false" style="color:#FF9C6B;font-weight:700">Voir ma commande</a>');
  goV('commandes');
}

/* ================== MESSAGE ================== */
function openMsg(){
  document.getElementById('msg-txt').value = '';
  document.getElementById('msg-ok').style.display = 'none';
  openOv('ov-msg');
}
function sendMsg(){
  var t = document.getElementById('msg-txt').value.trim();
  if(!t) return;
  FBS.unshift({de: USER ? (USER.nom + ' (' + USER.etab + ')') : 'Anonyme', txt: t, quand: "à l'instant"});
  save('err_fbs', FBS);
  document.getElementById('msg-txt').value = '';
  document.getElementById('msg-ok').style.display = 'block';
}

/* ================== PROFIL ================== */
var profileEditing = false;
function toggleProfileEdit(){
  profileEditing = !profileEditing;
  var view = document.getElementById('profile-fields');
  var edit = document.getElementById('profile-fields-edit');
  var btn = document.getElementById('btn-edit-profile');
  if(profileEditing){
    document.getElementById('pfe-etab').value = USER.etab;
    document.getElementById('pfe-nom').value = USER.nom;
    document.getElementById('pfe-tel').value = USER.tel;
    document.getElementById('pfe-email').value = USER.email;
    view.style.display = 'none'; edit.style.display = '';
    btn.textContent = '✓ Mettre à jour';
  } else {
    USER.etab = document.getElementById('pfe-etab').value.trim() || USER.etab;
    USER.nom = document.getElementById('pfe-nom').value.trim() || USER.nom;
    USER.tel = document.getElementById('pfe-tel').value.trim() || USER.tel;
    USER.email = document.getElementById('pfe-email').value.trim() || USER.email;
    save('err_user', USER); refreshChip(); renderProfil();
    edit.style.display = 'none'; view.style.display = '';
    btn.textContent = '✏️ Éditer';
  }
}

/* ================== ADMIN ================== */
var F = {t:'all', liv:'all'};
function setFT(t){
  F.t = t;
  document.querySelectorAll('.filters .fbtn').forEach(function(b){b.classList.toggle('on', b.dataset.ft===t);});
  renderAdmin();
}
function isoShift(days){ var d=new Date(); d.setDate(d.getDate()+days); return d.toISOString().split('T')[0]; }
function filtered(){
  return ORDERS.filter(function(o){
    if(F.t==='today' && o.date !== isoShift(0)) return false;
    if(F.t==='tomorrow' && o.date !== isoShift(1)) return false;
    if(F.t==='date' && o.date !== document.getElementById('f-date').value) return false;
    if(F.t==='attente' && o.st !== 'attente') return false;
    if(F.t==='confirmee' && o.st !== 'confirmee') return false;
    if(F.t==='annulee' && o.st !== 'annulee') return false;
    if(F.liv !== 'all'){
      if(F.liv==='none' && o.prep.livreur) return false;
      if(F.liv!=='none' && o.prep.livreur !== F.liv) return false;
    }
    return true;
  });
}
function selHtml(ref, field, options, val){
  var h = '<select class="'+(val?'':'todo')+'" onchange="setPrep(\''+ref+'\', \''+field+'\', this.value)">';
  h += '<option value="">— à définir —</option>';
  options.forEach(function(x){ h += '<option'+(x===val?' selected':'')+'>'+x+'</option>'; });
  return h + '</select>';
}
function renderAdmin(){
  var att = ORDERS.filter(function(o){return o.st==='attente';}).length;
  var conf = ORDERS.filter(function(o){return o.st==='confirmee';}).length;
  var ca = ORDERS.filter(function(o){return o.st==='confirmee';}).reduce(function(s,o){return s+o.total;},0);
  var reste = clientsList().reduce(function(t,c){ var b = balFor(c.email); return t + (b>0 ? b : 0); }, 0);
  document.getElementById('kpis').innerHTML =
    '<div class="kpi"><b>'+att+'</b><span>commande(s) en attente</span></div>' +
    '<div class="kpi"><b>'+conf+'</b><span>confirmée(s)</span></div>' +
    '<div class="kpi"><b>'+fmt(ca)+'</b><span>chiffre confirmé (HT)</span></div>' +
    '<div class="kpi"><b class="'+(reste>0?'bal-neg':'bal-pos')+'" style="color:inherit">'+fmt(reste)+'</b><span>reste à encaisser (TTC)</span></div>';
  var fl = document.getElementById('f-liv');
  var cur = F.liv;
  fl.innerHTML = '<option value="all">Tous</option><option value="none">Non affecté</option>' +
    LIVREURS.map(function(l){return '<option'+(l===cur?' selected':'')+'>'+l+'</option>';}).join('');
  fl.value = cur;
  var rows = filtered().map(function(o){
    var lignes = o.lignes.map(function(l){return l.nom.replace('Coffret ','')+' × <b>'+l.qty+'</b>';}).join('<br>');
    var acts = '';
    if(o.st==='attente' || o.st==='reportee'){
      acts += '<button class="abtn ok xs" title="Prendre en charge" onclick="setSt(\''+o.ref+'\',\'confirmee\')">✓</button>';
      acts += '<button class="abtn rep xs" title="Proposer une autre date" onclick="openRep(\''+o.ref+'\')">📆</button>';
      acts += '<button class="abtn ko xs" title="Annuler" onclick="setSt(\''+o.ref+'\',\'annulee\')">✕</button>';
    } else {
      acts += '<button class="abtn neutral xs" title="Remettre en attente" onclick="setSt(\''+o.ref+'\',\'attente\')">↩</button>';
    }
    var dst = detailStatus(o);
    var detailCell = '<button class="abtn ' + (dst.done ? 'ok' : 'neutral') + ' xs" style="width:100%;text-align:center" onclick="openDetail(\''+o.ref+'\')">' +
      (dst.done ? '✓ Détaillé' : '⚠ À détailler') + '</button>' + histLineDetail(o);
    return '<tr>' +
      '<td><b>'+o.ref+'</b><br><span class="st '+o.st+'">'+ST_LABEL[o.st]+'</span>'+(o.rep?'<div class="mini">📆 '+o.rep+'</div>':'')+'</td>' +
      '<td><b>'+o.date.split('-').reverse().join('/')+'</b><br>'+o.heure+'<div class="mini">'+o.lieu+'</div>'+(o.tel?'<div class="mini">📞 '+o.tel+'</div>':'')+'</td>' +
      '<td class="cl"><b>'+o.client.nom+'</b><small>'+o.client.etab+'<br>'+o.client.tel+'</small></td>' +
      '<td>'+lignes+'<div class="mini">'+fmt(o.total)+' HT</div></td>' +
      '<td>'+detailCell+'</td>' +
      '<td>'+selHtml(o.ref,'livreur',LIVREURS,o.prep.livreur)+'</td>' +
      '<td><div class="aact">'+acts+'</div></td></tr>';
  }).join('');
  document.getElementById('adm-rows').innerHTML = rows || '<tr><td colspan="7" style="padding:22px;text-align:center;color:var(--muted)">Aucune commande pour ce filtre.</td></tr>';
  document.getElementById('afb-list').innerHTML = FBS.length
    ? FBS.map(function(f){return '<div class="fbk">« '+f.txt.replace(/</g,'&lt;')+' »<small>'+f.de+' · '+f.quand+'</small></div>';}).join('')
    : '<div class="panel" style="color:var(--muted)">Aucun message privé.</div>';
}
function sameClientOrders(o){
  return ORDERS.filter(function(x){ return x !== o && x.client.email === o.client.email && x.st !== 'annulee'; });
}
function histSameDay(o, field){
  return sameClientOrders(o).filter(function(x){ return x.date === o.date && x.prep[field]; })
    .map(function(x){ return {val:x.prep[field], heure:x.heure, ref:x.ref}; });
}
function histLine(o, field){
  var today = histSameDay(o, field);
  if(today.length){
    return '<div class="hist">\uD83D\uDD52 D\u00e9j\u00e0 envoy\u00e9 ce jour : <b>' + today.map(function(h){return h.val + ' (' + h.heure + ')';}).join(', ') + '</b></div>';
  }
  var prev = sameClientOrders(o).filter(function(x){ return x.prep[field]; })
    .sort(function(a,b){ return (b.date+b.heure).localeCompare(a.date+a.heure); })[0];
  if(prev) return '<div class="hist">Dernier envoi : ' + prev.prep[field] + ' (' + prev.date.split('-').reverse().join('/') + ')</div>';
  return '';
}
var TOAST_T = null;
function toast(msg){
  var t = document.getElementById('toast');
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(TOAST_T);
  TOAST_T = setTimeout(function(){ t.classList.remove('show'); }, 6500);
}
function setPrep(ref, field, val){
  var o = ORDERS.find(function(x){return x.ref===ref;});
  if(!o) return;
  if(val && (field === 'boisson' || field === 'dessert')){
    var dup = histSameDay(o, field).filter(function(h){ return h.val === val; });
    if(dup.length){
      toast('\u26A0\uFE0F <b>' + val + '</b> a d\u00e9j\u00e0 \u00e9t\u00e9 envoy\u00e9 \u00e0 <b>' + o.client.etab + '</b> aujourd\u2019hui \u00e0 ' + dup[0].heure + ' (' + dup[0].ref + '). Pensez \u00e0 varier \u2014 par exemple un soda l\u2019apr\u00e8s-midi si un jus est parti le matin.');
    }
  }
  o.prep[field] = val;
  save('err_orders', ORDERS);
  renderAdmin();
}
function filterLabel(){
  var t = {all:'Toutes les commandes', today:"Aujourd'hui (" + isoShift(0).split('-').reverse().join('/') + ')', tomorrow:'Demain (' + isoShift(1).split('-').reverse().join('/') + ')'}[F.t];
  if(F.t==='date'){ var d = document.getElementById('f-date').value; t = d ? d.split('-').reverse().join('/') : 'Date non choisie'; }
  if(F.liv !== 'all') t += ' · Livreur : ' + (F.liv==='none' ? 'non affecté' : F.liv);
  return t;
}
function getDetailForLine(o, i){
  if(!o.detailLines || !o.detailLines[i]) return null;
  return o.detailLines[i];
}
function detailStatus(o){
  if(!o.detailLines || o.detailLines.length !== o.lignes.length) return {done:false};
  var done = o.detailLines.every(function(d){
    if(!d) return false;
    return d.entree && d.viande && d.garnitures && d.dessert && d.boisson;
  });
  return {done:!!done};
}
function histLineDetail(o){
  var vals = [];
  sameClientOrders(o).forEach(function(x){
    if(x.date !== o.date) return;
    (x.detailLines || []).forEach(function(d){
      if(d && d.dessert) vals.push(d.dessert);
      if(d && d.boisson) vals.push(d.boisson);
    });
  });
  if(vals.length){
    return '<div class="hist">Déjà envoyé ce jour : <b>' + esc(vals.join(', ')) + '</b></div>';
  }
  return '';
}
function findCof(nom){
  return COFFRETS.find(function(c){return c.nom === nom;}) || null;
}
function openDetail(ref){
  var o = ORDERS.find(function(x){return x.ref===ref;});
  if(!o) return;
  document.getElementById('d-title').textContent = 'Détails — ' + o.ref;
  document.getElementById('d-sub').textContent = o.client.etab + ' · ' + o.date.split('-').reverse().join('/') + ' à ' + o.heure;
  var html = '';
  o.lignes.forEach(function(l, i){
    var cof = findCof(l.nom);
    var ch = cof ? cof.choices : null;
    var existing = getDetailForLine(o, i);
    var name = 'd_' + i + '_';
    html += '<div class="detail-section">';
    html += '<h4>' + esc(l.nom) + ' — ' + l.qty + ' ×</h4>';
    /* Entrée */
    html += '<label style="font-size:.78rem;font-weight:700;margin-bottom:5px;display:block">Entrée</label>';
    var entryTypes = [];
    if(ch){
      if(ch.entryFroides) entryTypes.push('froide');
      if(ch.entryChaudes) entryTypes.push('chaude');
      if(ch.entryFroides && ch.entryChaudes) entryTypes.push('froide', 'chaude');
      entryTypes = entryTypes.filter(function(v,i,a){return a.indexOf(v)===i;});
    }
    if(!entryTypes.length) entryTypes = ['froide','chaude'];
    var prevEntType = '';
    if(existing && existing.entree){
      if(ch && ch.entryFroides && ch.entryFroides.indexOf(existing.entree)>=0) prevEntType = 'froide';
      else if(ch && ch.entryChaudes && ch.entryChaudes.indexOf(existing.entree)>=0) prevEntType = 'chaude';
    }
    html += '<div class="detail-radio">';
    entryTypes.forEach(function(t){
      html += '<label><input type="radio" name="'+name+'ent" value="'+t+'"'+(t===prevEntType?' checked':'')+' onchange="toggleEntType(\''+name+'\',\''+t+'\')"> '+esc(t==='froide'?'Froide':'Chaude')+'</label>';
    });
    html += '</div>';
    var entryOptions = [];
    if(prevEntType==='froide' && ch && ch.entryFroides) entryOptions = ch.entryFroides;
    else if(prevEntType==='chaude' && ch && ch.entryChaudes) entryOptions = ch.entryChaudes;
    else if(ch){
      entryOptions = (ch.entryFroides||[]).concat(ch.entryChaudes||[]);
    }
    html += '<div class="detail-radio" id="'+name+'entries">';
    entryOptions.forEach(function(e){
      html += '<label><input type="radio" name="'+name+'entv" value="'+esc(e)+'"'+((existing && existing.entree===e)?' checked':'')+' onchange="clearField(\''+name+'ent\')"> '+esc(e)+'</label>';
    });
    html += '</div>';
    if(!entryOptions.length){
      html += '<div style="font-size:.76rem;color:var(--muted)">Ce coffret n\'a pas d\'entrées spécifiques à définir.</div>';
    }
    /* Viande */
    html += '<label style="font-size:.78rem;font-weight:700;margin-bottom:5px;display:block;margin-top:10px">Viande</label>';
    if(ch){
      var meatTypes = [];
      if(ch.meatType){
        if(ch.meatType==='choice') meatTypes = ['blanche','rouge'];
        else if(ch.meatType==='fixed_rouge') meatTypes = ['rouge'];
        else if(ch.meatType==='fixed_poisson') meatTypes = ['poisson'];
      }
      var prevMeatType = '';
      if(existing && existing.viande){
        if(ch.viandesBlanches && ch.viandesBlanches.indexOf(existing.viande)>=0) prevMeatType = 'blanche';
        else if(ch.viandesRouges && ch.viandesRouges.indexOf(existing.viande)>=0) prevMeatType = meatTypes.length && meatTypes[0]==='poisson'?'poisson':'rouge';
        else prevMeatType = 'rouge';
      }
      html += '<div class="detail-radio">';
      meatTypes.forEach(function(t){
        html += '<label><input type="radio" name="'+name+'meat" value="'+t+'"'+(t===prevMeatType?' checked':'')+' onchange="toggleMeatType(\''+name+'\',\''+t+'\')"> '+esc(t)+'</label>';
      });
      html += '</div>';
      var meatOptions = [];
      if(prevMeatType==='blanche') meatOptions = ch.viandesBlanches||[];
      else if(prevMeatType==='rouge') meatOptions = ch.viandesRouges||[];
      else if(prevMeatType==='poisson') meatOptions = ch.viandesRouges||[];
      else if(ch.viandesRouges) meatOptions = ch.viandesRouges;
      else if(ch.viandesBlanches) meatOptions = ch.viandesBlanches;
      html += '<div class="detail-radio" id="'+name+'meats">';
      meatOptions.forEach(function(m){
        html += '<label><input type="radio" name="'+name+'meatv" value="'+esc(m)+'"'+((existing && existing.viande===m)?' checked':'')+' onchange="clearField(\''+name+'meat\')"> '+esc(m)+'</label>';
      });
      html += '</div>';
    } else {
      html += '<div style="font-size:.76rem;color:var(--muted)">Ce coffret n\'a pas de viande spécifique à définir.</div>';
    }
    /* Garnitures */
    if(ch && ch.garnitures){
      var maxG = ch.maxGarnitures || 3;
      var prevG = (existing && existing.garnitures) ? existing.garnitures.split(', ').filter(function(g){return g;}) : [];
      html += '<label style="font-size:.78rem;font-weight:700;margin-bottom:5px;display:block;margin-top:10px">Garnitures (max. '+maxG+')</label>';
      html += '<div class="detail-chips" id="'+name+'garn">';
      ch.garnitures.forEach(function(g){
        html += '<span class="detail-chip'+(prevG.indexOf(g)>=0?' on':'')+'" onclick="toggleGarn(this,\''+name+'garn\','+maxG+')">'+esc(g)+'<input type="hidden" value="'+esc(g)+'"></span>';
      });
      html += '</div>';
      html += '<div class="detail-chip-count" id="'+name+'garn-c" style="font-size:.74rem;color:var(--muted);margin-top:4px">'+prevG.length+' / '+maxG+'</div>';
    }
    /* Dessert */
    html += '<label style="font-size:.78rem;font-weight:700;margin-bottom:5px;display:block;margin-top:10px">Dessert</label>';
    html += '<div class="detail-radio">';
    DESSERTS.forEach(function(d){
      html += '<label><input type="radio" name="'+name+'des" value="'+esc(d)+'"'+((existing && existing.dessert===d)?' checked':'')+'>'+esc(d)+'</label>';
    });
    html += '</div>';
    /* Boisson */
    html += '<label style="font-size:.78rem;font-weight:700;margin-bottom:5px;display:block;margin-top:10px">Boisson</label>';
    html += '<div class="detail-radio">';
    BOISSONS.forEach(function(b){
      html += '<label><input type="radio" name="'+name+'boi" value="'+esc(b)+'"'+((existing && existing.boisson===b)?' checked':'')+'>'+esc(b)+'</label>';
    });
    html += '</div>';
    html += '</div>';
  });
  document.getElementById('d-lines').innerHTML = html;
  document.getElementById('d-save').onclick = function(){ saveDetail(ref); };
  openOv('ov-detail');
}
function toggleEntType(name, type){
  var ch = null;
  document.getElementById(name+'entries').innerHTML = '';
  var o = ORDERS.find(function(x){return x.ref===document.getElementById('d-title').textContent.replace('Détails — ','');});
  if(!o) return;
  var idx = parseInt(name.split('_')[1]);
  var cof = findCof(o.lignes[idx].nom);
  ch = cof ? cof.choices : null;
  var options = [];
  if(type==='froide' && ch && ch.entryFroides) options = ch.entryFroides;
  else if(type==='chaude' && ch && ch.entryChaudes) options = ch.entryChaudes;
  var el = document.getElementById(name+'entries');
  el.innerHTML = options.map(function(e){
    return '<label><input type="radio" name="'+name+'entv" value="'+esc(e)+'" onchange="clearField(\''+name+'ent\')"> '+esc(e)+'</label>';
  }).join('');
}
function toggleMeatType(name, type){
  var o = ORDERS.find(function(x){return x.ref===document.getElementById('d-title').textContent.replace('Détails — ','');});
  if(!o) return;
  var idx = parseInt(name.split('_')[1]);
  var cof = findCof(o.lignes[idx].nom);
  var ch = cof ? cof.choices : null;
  var options = [];
  if(type==='blanche' && ch && ch.viandesBlanches) options = ch.viandesBlanches;
  else if(type==='rouge' && ch && ch.viandesRouges) options = ch.viandesRouges;
  else if(type==='poisson' && ch && ch.viandesRouges) options = ch.viandesRouges;
  document.getElementById(name+'meats').innerHTML = options.map(function(m){
    return '<label><input type="radio" name="'+name+'meatv" value="'+esc(m)+'" onchange="clearField(\''+name+'meat\')"> '+esc(m)+'</label>';
  }).join('');
}
function clearField(name){ /* just to trigger re-render if needed */ }
function toggleGarn(el, containerId, max){
  var container = document.getElementById(containerId);
  var on = container.querySelectorAll('.detail-chip.on');
  if(el.classList.contains('on')){
    el.classList.remove('on');
  } else {
    if(on.length >= max) return;
    el.classList.add('on');
  }
  var count = container.querySelectorAll('.detail-chip.on').length;
  var counter = document.getElementById(containerId + '-c');
  if(counter) counter.textContent = count + ' / ' + max;
}
function saveDetail(ref){
  var o = ORDERS.find(function(x){return x.ref===ref;});
  if(!o) return;
  o.detailLines = o.lignes.map(function(l, i){
    var name = 'd_' + i + '_';
    var ent = '';
    var entEl = document.querySelector('input[name="'+name+'entv"]:checked');
    if(entEl) ent = entEl.value;
    else {
      var entTypeEl = document.querySelector('input[name="'+name+'ent"]:checked');
      if(entTypeEl && !ent){
        /* nothing selected yet */
      }
    }
    var meat = '';
    var meatEl = document.querySelector('input[name="'+name+'meatv"]:checked');
    if(meatEl) meat = meatEl.value;
    var garn = [];
    var garnContainer = document.getElementById(name+'garn');
    if(garnContainer){
      garnContainer.querySelectorAll('.detail-chip.on').forEach(function(c){
        var val = c.querySelector('input');
        if(val) garn.push(val.value);
      });
    }
    var des = '';
    var desEl = document.querySelector('input[name="'+name+'des"]:checked');
    if(desEl) des = desEl.value;
    var boi = '';
    var boiEl = document.querySelector('input[name="'+name+'boi"]:checked');
    if(boiEl) boi = boiEl.value;
    return {
      cofRef: i,
      entree: ent,
      viande: meat,
      garnitures: garn.join(', '),
      dessert: des,
      boisson: boi
    };
  });
  /* Sync first detail's dessert/boisson to prep for backwards compat */
  if(o.detailLines.length && o.detailLines[0]){
    o.prep.dessert = o.detailLines[0].dessert || '';
    o.prep.boisson = o.detailLines[0].boisson || '';
  }
  save('err_orders', ORDERS);
  closeOv('ov-detail');
  toast('✓ Détails enregistrés pour ' + o.ref);
  renderAdmin();
}
function openSheet(){
  var list = filtered().slice().sort(function(a,b){ return (a.date+a.heure).localeCompare(b.date+b.heure); });
  document.getElementById('s-sub').textContent = filterLabel() + ' — ' + list.length + ' commande(s)';
  document.getElementById('s-emis').textContent = 'Émise le ' + new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toTimeString().slice(0,5);
  document.getElementById('s-rows').innerHTML = list.length ? list.map(function(o){
    var cofs = o.lignes.map(function(l){return esc(l.nom) + ' × ' + l.qty;}).join('<br>');
    function cell(v){ return v ? '<td>' + esc(v) + '</td>' : '<td class="todo-cell">à définir</td>'; }
    var contenus = o.lignes.map(function(l, i){
      var d = getDetailForLine(o, i);
      if(!d || (!d.entree && !d.viande && !d.garnitures)) return '';
      return [d.entree, d.viande, d.garnitures].filter(function(x){return x;}).join(' · ');
    });
    var desserts = o.lignes.map(function(l, i){
      var d = getDetailForLine(o, i);
      return (d && d.dessert) ? d.dessert : '';
    });
    var boissons = o.lignes.map(function(l, i){
      var d = getDetailForLine(o, i);
      return (d && d.boisson) ? d.boisson : '';
    });
    function cells(arr){
      if(!arr.length) return '<td class="todo-cell">à définir</td>';
      if(arr.every(function(v){return !v;})) return '<td class="todo-cell">à définir</td>';
      return '<td>' + arr.map(function(v){return esc(v || 'à définir');}).join('<br>') + '</td>';
    }
    return '<tr><td><b>' + o.date.split('-').reverse().join('/') + '</b><br>' + o.heure + '</td>' +
      '<td><b>' + esc(o.client.etab) + '</b></td>' +
      '<td>' + esc(o.lieu) + '</td>' +
      '<td>' + cofs + '</td>' +
      cells(contenus) + cells(desserts) + cells(boissons) + cell(o.prep.livreur) +
      '<td>' + esc(o.note || '—') + '</td></tr>';
  }).join('') : '<tr><td colspan="9" style="text-align:center;padding:18px;color:#999">Aucune commande pour ce filtre.</td></tr>';
  openOv('ov-sheet');
}
function doPrintSheet(){
  var st = document.createElement('style');
  st.id = 'landscape';
  st.textContent = '@page{size:A4 landscape;margin:10mm}';
  document.head.appendChild(st);
  window.onafterprint = function(){ var e = document.getElementById('landscape'); if(e) e.remove(); window.onafterprint = null; };
  window.print();
}
/* ===== PAIEMENTS (traiteur) ===== */
function renderAPay(){
  var sel = document.getElementById('pay-cl');
  var cur = sel.value;
  sel.innerHTML = clientsList().map(function(c){
    return '<option value="' + c.email + '">' + esc(c.etab) + '</option>';
  }).join('');
  if(cur) sel.value = cur;
  var dt = document.getElementById('pay-dt');
  if(!dt.value) dt.value = new Date().toISOString().split('T')[0];
  document.getElementById('adm-bals').innerHTML = clientsList().map(function(c){
    var due = dueFor(c.email), paid = paidFor(c.email), b = due - paid;
    var lbl = b > 0 ? '<span class="bal-neg">' + fmt(b) + ' à encaisser</span>'
            : (b < 0 ? '<span class="bal-pos">Avoir ' + fmt(-b) + '</span>' : '<span class="bal-pos">Solde : 0 ✓</span>');
    return '<tr><td><b>' + esc(c.etab) + '</b><br><span class="mini">' + esc(c.nom) + ' · ' + esc(c.tel) + '</span></td>' +
      '<td>' + fmt(due) + '</td><td>' + fmt(paid) + '</td><td>' + lbl + '</td></tr>';
  }).join('');
  var rows = PAYMENTS.slice().sort(function(a,b){return b.date.localeCompare(a.date);}).map(function(x){
    var i = PAYMENTS.indexOf(x);
    return '<tr><td><b>' + esc(x.etab) + '</b></td><td>' + x.type + '</td><td>' + x.date.split('-').reverse().join('/') + '</td>' +
      '<td><b>' + fmt(x.montant) + '</b></td>' +
      '<td><span class="stp2 ' + x.st + '">' + PAY_ST[x.st] + '</span></td>' +
      '<td><div class="aact">' +
      (x.st==='att' ? '<button class="abtn ok xs" title="Marquer encaissé" onclick="payEnc(' + i + ')">✓ Encaissé</button>' : '') +
      '<button class="abtn ko xs" title="Supprimer" onclick="payDel(' + i + ')">🗑</button></div></td></tr>';
  }).join('');
  document.getElementById('adm-pays').innerHTML = rows || '<tr><td colspan="6" style="padding:16px;text-align:center;color:var(--muted)">Aucun versement.</td></tr>';
}
function addPay(){
  var email = document.getElementById('pay-cl').value;
  var mt = parseInt(document.getElementById('pay-mt').value || 0);
  if(!email || !mt || mt < 1){ document.getElementById('pay-err').style.display='block'; return; }
  document.getElementById('pay-err').style.display='none';
  var c = clientsList().find(function(x){return x.email===email;});
  PAYMENTS.push({id:'P-' + Date.now(), email:email, etab:c.etab,
    montant:mt, type:document.getElementById('pay-ty').value,
    date:document.getElementById('pay-dt').value || new Date().toISOString().split('T')[0],
    st:document.getElementById('pay-st').value});
  save('err_pays', PAYMENTS);
  document.getElementById('pay-mt').value='';
  renderAdmin(); renderAPay();
}
function payEnc(i){ PAYMENTS[i].st = 'enc'; save('err_pays', PAYMENTS); renderAdmin(); renderAPay(); }
function payDel(i){ if(confirm('Supprimer ce versement ?')){ PAYMENTS.splice(i,1); save('err_pays', PAYMENTS); renderAdmin(); renderAPay(); } }
/* ===== CATALOGUE ===== */
function renderCat(){
  document.getElementById('cat-cofs').innerHTML = COFFRETS.map(function(c, i){
    return '<tr>' +
      '<td><img class="cimg" src="' + cofImg(c) + '" alt="">' +
        '<div class="imgbtns"><button class="abtn neutral xs" title="Changer l\'image" onclick="imgPick(' + i + ')">📤</button>' +
        (c.imgData ? '<button class="abtn ko xs" title="Supprimer l\'image (retour au visuel par défaut)" onclick="imgDel(' + i + ')">🗑</button>' : '') + '</div></td>' +
      '<td><input value="' + esc(c.nom).replace(/"/g,'&quot;') + '" onchange="updCof(' + i + ', \'nom\', this.value)"></td>' +
      '<td><input type="number" min="0" value="' + (c.prix || '') + '" placeholder="sur demande" onchange="updCof(' + i + ', \'prix\', this.value)"></td>' +
      '<td><input value="' + esc(c.d).replace(/"/g,'&quot;') + '" onchange="updCof(' + i + ', \'d\', this.value)"></td>' +
      '<td><div class="aact">' +
        (i > 0 ? '<button class="abtn neutral xs" title="Monter" onclick="moveCof(' + i + ',-1)">↑</button>' : '') +
        (i < COFFRETS.length-1 ? '<button class="abtn neutral xs" title="Descendre" onclick="moveCof(' + i + ',1)">↓</button>' : '') + '</div></td>' +
      '<td><button class="abtn ko xs" title="Supprimer le pack" onclick="delCof(' + i + ')">🗑</button></td></tr>';
  }).join('');
  function chips(id, arr, kind){
    document.getElementById(id).innerHTML = arr.map(function(x, i){
      return '<span class="chip2">' + esc(x) + '<i title="Supprimer" onclick="delItem(\'' + kind + '\',' + i + ')">✕</i></span>';
    }).join('') || '<span style="color:var(--muted);font-size:.82rem">Liste vide</span>';
  }
  chips('chips-des', DESSERTS, 'des');
  chips('chips-boi', BOISSONS, 'boi');
  chips('chips-liv', LIVREURS, 'liv');
}
function saveCofs(){
  try{ save('err_cofs', COFFRETS); }
  catch(e){ alert('Image trop lourde pour le stockage de démo — réessayez avec une photo plus légère.'); }
  renderCofs(); renderCat(); renderAdmin();
}
var IMG_I = null;
function imgPick(i){ IMG_I = i; document.getElementById('cof-img-input').click(); }
document.getElementById('cof-img-input').addEventListener('change', function(e){
  var f = e.target.files[0];
  if(!f || IMG_I === null) return;
  var img = new Image();
  var rd = new FileReader();
  rd.onload = function(){ img.src = rd.result; };
  img.onload = function(){
    var MAX = 700;
    var sc = Math.min(1, MAX / img.width);
    var cv = document.createElement('canvas');
    cv.width = Math.round(img.width * sc); cv.height = Math.round(img.height * sc);
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    COFFRETS[IMG_I].imgData = cv.toDataURL('image/jpeg', 0.8);
    IMG_I = null;
    e.target.value = '';
    saveCofs();
  };
  rd.readAsDataURL(f);
});
function imgDel(i){ delete COFFRETS[i].imgData; saveCofs(); }
function moveCof(i, dir){
  var j = i + dir;
  if(j < 0 || j >= COFFRETS.length) return;
  var t = COFFRETS[i]; COFFRETS[i] = COFFRETS[j]; COFFRETS[j] = t;
  saveCofs();
}
function updCof(i, f, v){
  if(f === 'prix'){ COFFRETS[i].prix = v ? parseInt(v) : null; }
  else { COFFRETS[i][f] = v; }
  saveCofs();
}
function addCof(){
  COFFRETS.push({id:'pack' + Date.now(), nom:'Nouveau pack', prix:null, img:'c-standard.jpg', d:'Description du pack.', compo:[]});
  saveCofs();
}
function delCof(i){
  if(confirm('Supprimer « ' + COFFRETS[i].nom + ' » du catalogue ? (les commandes passées ne sont pas modifiées)')){
    COFFRETS.splice(i, 1); saveCofs();
  }
}
var KIND = {des:{arr:function(){return DESSERTS;}, key:'err_desserts', inp:'new-des'},
            boi:{arr:function(){return BOISSONS;}, key:'err_boissons', inp:'new-boi'},
            liv:{arr:function(){return LIVREURS;}, key:'err_livreurs', inp:'new-liv'}};
function addItem(k){
  var inp = document.getElementById(KIND[k].inp);
  var v = inp.value.trim();
  if(!v) return;
  KIND[k].arr().push(v);
  save(KIND[k].key, KIND[k].arr());
  inp.value = '';
  renderCat(); renderAdmin();
}
function delItem(k, i){
  KIND[k].arr().splice(i, 1);
  save(KIND[k].key, KIND[k].arr());
  renderCat(); renderAdmin();
}
function setSt(ref, st){
  var o = ORDERS.find(function(x){return x.ref===ref;});
  if(o){ o.st = st; if(st!=='reportee') o.rep = null; save('err_orders', ORDERS); renderAdmin(); }
}
var REP_REF = null;
function openRep(ref){ REP_REF = ref; openOv('ov-rep'); }
function confirmRep(){
  var o = ORDERS.find(function(x){return x.ref===REP_REF;});
  var d = document.getElementById('r-date').value, h = document.getElementById('r-heure').value;
  if(o && d){ o.st='reportee'; o.rep = d.split('-').reverse().join('/') + ' à ' + h; save('err_orders', ORDERS); renderAdmin(); }
  closeOv('ov-rep');
}

/* ================== FACTURE ================== */
function openInv(ref){
  var o = ORDERS.find(function(x){return x.ref===ref;});
  if(!o) return;
  document.getElementById('i-ref').textContent = 'N° ' + o.ref;
  document.getElementById('i-date').textContent = 'Émise le ' + new Date().toLocaleDateString('fr-FR');
  document.getElementById('i-client').innerHTML = o.client.etab + '<br>' + o.client.nom + '<br>' + o.client.tel + '<br>' + o.client.email;
  document.getElementById('i-liv').innerHTML = '<b>Livraison :</b> ' + o.date.split('-').reverse().join('/') + ' à ' + o.heure + ' — ' + o.lieu;
  document.getElementById('i-lines').innerHTML = o.lignes.map(function(l){
    return '<tr><td>'+l.nom+'</td><td>'+l.qty+'</td><td>'+fmt(l.pu)+'</td><td style="text-align:right">'+fmt(l.qty*l.pu)+'</td></tr>';
  }).join('');
  var tva = Math.round(o.total * TVA);
  document.getElementById('i-ht').textContent = fmt(o.total);
  document.getElementById('i-tva').textContent = fmt(tva);
  document.getElementById('i-total').textContent = fmt(o.total + tva);
  var body = 'Bonjour,%0D%0AVeuillez trouver la facture ' + o.ref + ' — total TTC ' + fmt(Math.round(o.total*(1+TVA))) + '.%0D%0AErriane Foods';
  document.getElementById('i-mail').href = 'mailto:' + o.client.email + '?subject=Facture ' + o.ref + ' — Erriane Foods&body=' + body;
  openOv('ov-inv');
}

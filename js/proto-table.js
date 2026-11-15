/* Prototype 01 · réserver une table, côté client. Trois étapes : quand, quelle table, c'est réservé.
   Les dates sont celles du jour où l'on regarde ; les tables prises et les heures complètes sont
   tirées du jour et de l'heure, pour que le plan change quand on change d'avis. */

(function () {
  var ecran = document.getElementById('table-ecran');
  if (!ecran) return;
  window.protos = window.protos || {};

  var HEURES = ['19 h 00', '19 h 30', '20 h 00', '20 h 30', '21 h 00', '21 h 30'];
  var TABLES = [
    { n: 1, p: 2, x: 20, y: 44, w: 80, h: 80 },
    { n: 2, p: 2, x: 120, y: 44, w: 80, h: 80 },
    { n: 3, p: 4, x: 220, y: 44, w: 140, h: 80 },
    { n: 4, p: 6, x: 20, y: 168, w: 160, h: 92 },
    { n: 5, p: 4, x: 210, y: 168, w: 150, h: 92 },
    { n: 6, p: 2, x: 20, y: 304, w: 80, h: 80 },
    { n: 7, p: 4, x: 120, y: 304, w: 130, h: 80 },
    { n: 8, p: 2, x: 280, y: 304, w: 80, h: 80 }
  ];
  var MAX = 6;
  var e;

  function jours() {
    var liste = [];
    for (var i = 0; i < 5; i++) {
      var d = new Date();
      d.setDate(d.getDate() + i);
      var court = d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' });
      var long = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
      liste.push({ court: i === 0 ? 'Aujourd\'hui' : i === 1 ? 'Demain' : court, long: i === 0 ? 'aujourd\'hui' : i === 1 ? 'demain' : long });
    }
    return liste;
  }
  var JOURS = jours();

  function complete(h) { return h === (e.jour + 1) % 6 || h === (e.jour + 4) % 6; }
  function prise(t) { return ((t.n * 37 + (e.jour * 6 + e.heure) * 11) % 8) < 3; }
  function personnes(n) { return n + (n > 1 ? ' personnes' : ' personne'); }
  function resume() { return JOURS[e.jour].court + ' · ' + HEURES[e.heure] + ' · ' + personnes(e.couverts); }

  function tete() {
    var noms = ['Quand', 'Table', 'C\'est réservé'];
    return '<header class="rt-tete"><span class="rt-marque">Votre restaurant</span>' +
      '<ol class="rt-etapes">' + noms.map(function (nom, i) {
        return '<li' + (i + 1 === e.etape ? ' aria-current="step"' : '') + '>' + (i + 1) + ' · ' + nom + '</li>';
      }).join('') + '</ol></header>';
  }

  function etape1() {
    var h = '<div class="rt-corps"><h3 class="rt-titre">Réserver une table</h3>';
    h += '<p class="rt-label">Le jour</p><div class="rt-puces">' + JOURS.map(function (j, i) {
      return '<button type="button" data-jour="' + i + '" aria-pressed="' + (i === e.jour) + '">' + j.court + '</button>';
    }).join('') + '</div>';
    h += '<p class="rt-label">Nombre de personnes</p><div class="rt-compteur">' +
      '<button type="button" data-moins aria-label="Une personne de moins"' + (e.couverts <= 1 ? ' disabled' : '') + '>−</button>' +
      '<output aria-live="polite">' + personnes(e.couverts) + '</output>' +
      '<button type="button" data-plus aria-label="Une personne de plus"' + (e.couverts >= MAX ? ' disabled' : '') + '>+</button></div>';
    if (e.couverts >= MAX) h += '<p class="rt-aide">Au-delà de 6 personnes, le restaurant vous répond sur WhatsApp.</p>';
    h += '<p class="rt-label">L\'heure</p><div class="rt-puces rt-puces--heures">' + HEURES.map(function (heure, i) {
      var c = complete(i);
      return '<button type="button" data-heure="' + i + '" aria-pressed="' + (i === e.heure) + '"' + (c ? ' disabled' : '') + '>' + heure + (c ? '<small>Complet</small>' : '') + '</button>';
    }).join('') + '</div>';
    h += '<button type="button" class="rt-bouton" data-aller="2"' + (e.heure === null ? ' disabled' : '') + '>' +
      (e.heure === null ? 'Choisissez une heure' : 'Choisir ma table') + '</button></div>';
    return h;
  }

  function plan() {
    var s = '<svg class="rt-plan" viewBox="0 0 380 486" role="group" aria-label="Plan de la salle">' +
      '<text class="rt-repere" x="190" y="22">Fenêtres sur rue</text><line class="rt-fenetre" x1="20" y1="32" x2="360" y2="32"/>' +
      '<rect class="rt-bar" x="20" y="420" width="190" height="44"/><text class="rt-repere" x="115" y="442">Bar</text>' +
      '<text class="rt-repere" x="310" y="442">Entrée ↓</text>';
    TABLES.forEach(function (t) {
      var etat = prise(t) ? 'prise' : t.p < e.couverts ? 'petite' : t.n === e.table ? 'choisie' : 'libre';
      var ok = etat === 'libre' || etat === 'choisie';
      s += '<g class="rt-table" data-table="' + t.n + '" data-etat="' + etat + '"' + (ok ? ' role="button" tabindex="0"' : '') +
        ' aria-label="Table ' + t.n + ', ' + t.p + ' places' + (etat === 'prise' ? ', déjà prise' : etat === 'petite' ? ', trop petite' : '') + '">' +
        '<rect x="' + t.x + '" y="' + t.y + '" width="' + t.w + '" height="' + t.h + '" rx="3"/>' +
        '<text x="' + (t.x + t.w / 2) + '" y="' + (t.y + t.h / 2 - 8) + '">' + t.n + '</text>' +
        '<text class="rt-places" x="' + (t.x + t.w / 2) + '" y="' + (t.y + t.h / 2 + 16) + '">' + t.p + ' pl.</text></g>';
    });
    return s + '</svg>';
  }

  function etape2() {
    var libres = TABLES.filter(function (t) { return !prise(t) && t.p >= e.couverts; }).length;
    var h = '<div class="rt-rappel"><span>' + resume() + '</span><button type="button" data-aller="1">Modifier</button></div>';
    h += '<div class="rt-corps"><h3 class="rt-titre">Choisissez votre table</h3>';
    h += libres
      ? '<p class="rt-aide">Les tables déjà prises, ou trop petites pour ' + personnes(e.couverts) + ', sont grisées.</p>'
      : '<p class="rt-aide rt-aide--alerte">Plus de table pour ' + personnes(e.couverts) + ' à cette heure. Essayez une autre heure.</p>';
    h += plan();
    h += '<p class="rt-legende"><span><i></i>Libre</span><span><i class="rt-l-choisie"></i>Votre table</span><span><i class="rt-l-prise"></i>Indisponible</span></p>';
    h += '<button type="button" class="rt-bouton" data-reserver' + (e.table ? '' : ' disabled') + '>' +
      (e.table ? 'Réserver la table ' + e.table : 'Touchez une table libre') + '</button></div>';
    return h;
  }

  function etape3() {
    var t = TABLES.filter(function (x) { return x.n === e.table; })[0];
    return '<div class="rt-corps rt-fin"><p class="rt-sur">Réservation confirmée</p><h3 class="rt-titre">' + JOURS[e.jour].long.charAt(0).toUpperCase() + JOURS[e.jour].long.slice(1) + ', ' + HEURES[e.heure] + '.</h3>' +
      '<dl class="rt-ticket"><dt>Table</dt><dd>n° ' + t.n + ', ' + t.p + ' places</dd><dt>Personnes</dt><dd>' + e.couverts + '</dd></dl>' +
      '<p class="rt-aide">Un rappel vous est envoyé par WhatsApp deux heures avant. Le restaurant voit déjà votre table dans son espace de gestion.</p>' +
      '<button type="button" class="rt-bouton rt-bouton--clair" data-recommencer>Faire une autre réservation</button></div>';
  }

  function dessiner() {
    ecran.innerHTML = '<div class="rt">' + tete() + (e.etape === 1 ? etape1() : e.etape === 2 ? etape2() : etape3()) + '</div>';
  }

  function choisirTable(g) {
    var etat = g.getAttribute('data-etat');
    if (etat !== 'libre' && etat !== 'choisie') return;
    var n = Number(g.getAttribute('data-table'));
    e.table = e.table === n ? null : n;
    dessiner();
  }

  ecran.addEventListener('click', function (ev) {
    var b = ev.target.closest('button, .rt-table');
    if (!b || b.disabled) return;
    if (b.hasAttribute('data-jour')) { e.jour = Number(b.getAttribute('data-jour')); if (e.heure !== null && complete(e.heure)) e.heure = null; }
    else if (b.hasAttribute('data-heure')) e.heure = Number(b.getAttribute('data-heure'));
    else if (b.hasAttribute('data-moins')) e.couverts -= 1;
    else if (b.hasAttribute('data-plus')) e.couverts += 1;
    else if (b.hasAttribute('data-aller')) { e.etape = Number(b.getAttribute('data-aller')); e.table = null; ecran.scrollTop = 0; }
    else if (b.hasAttribute('data-reserver')) { e.etape = 3; ecran.scrollTop = 0; }
    else if (b.hasAttribute('data-recommencer')) { depart(); return; }
    else if (b.classList.contains('rt-table')) { choisirTable(b); return; }
    dessiner();
  });
  ecran.addEventListener('keydown', function (ev) {
    var g = ev.target.closest('.rt-table');
    if (g && (ev.key === 'Enter' || ev.key === ' ')) { ev.preventDefault(); choisirTable(g); }
  });

  /* Le prototype s'ouvre rempli : aujourd'hui, 2 personnes, 20 h 30. Un geste suffit. */
  function depart() {
    e = { etape: 1, jour: 0, couverts: 2, heure: 3, table: null };
    ecran.scrollTop = 0;
    dessiner();
  }
  window.protos.table = depart;
  depart();
})();

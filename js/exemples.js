/* Fennec Web · tableau de bord d'exemple : onglets, réservations, commandes, paiements.
   Toutes les données sont fictives et marquées comme telles dans la page. */

function da(n) { return n.toLocaleString('fr-FR') + ' DA'; }

/* Onglets : un seul panneau visible, caché par le style en ligne (hidden perd devant display). */
(function () {
  var onglets = document.querySelectorAll('.onglets button');
  function montrer(nom) {
    onglets.forEach(function (o) { o.setAttribute('aria-selected', o.getAttribute('data-onglet') === nom ? 'true' : 'false'); });
    document.querySelectorAll('.panneau').forEach(function (p) { p.style.display = p.id === 'panneau-' + nom ? '' : 'none'; });
  }
  onglets.forEach(function (o) { o.addEventListener('click', function () { montrer(o.getAttribute('data-onglet')); }); });
  if (onglets.length) montrer('reservations');
})();

/* Réservations : on touche une table libre, on confirme, elle rejoint la liste du soir. */
(function () {
  var plan = document.getElementById('plan');
  if (!plan) return;
  var DEPART = [
    { heure: '19 h 30', table: 3, places: 4 },
    { heure: '20 h 00', table: 5, places: 6 },
    { heure: '21 h 00', table: 9, places: 4 }
  ];
  var prises, reservations, choisie;
  var selection = document.getElementById('resa-selection');
  var bouton = document.getElementById('resa-confirmer');

  function dessiner() {
    plan.querySelectorAll('.table').forEach(function (t) {
      var n = Number(t.getAttribute('data-table'));
      var prise = prises.indexOf(n) !== -1;
      t.setAttribute('data-etat', prise ? 'prise' : (n === choisie ? 'choisie' : 'libre'));
      t.setAttribute('aria-disabled', prise ? 'true' : 'false');
      t.setAttribute('aria-label', 'Table ' + n + ', ' + t.getAttribute('data-places') + ' places, ' + (prise ? 'déjà prise' : 'libre'));
    });
    if (choisie) {
      var p = plan.querySelector('[data-table="' + choisie + '"]').getAttribute('data-places');
      selection.textContent = 'Table ' + choisie + ' · ' + p + ' places · ce soir, 20 h 30';
    } else {
      selection.textContent = 'Touchez une table libre.';
    }
    bouton.disabled = !choisie;

    var liste = document.getElementById('resa-liste');
    liste.innerHTML = '';
    var couverts = 0;
    reservations.forEach(function (r) {
      couverts += r.places;
      var li = document.createElement('li');
      li.className = 'rang' + (r.neuve ? ' rang--neuf' : '');
      li.innerHTML = '<b>' + r.heure + '</b><span>Table ' + r.table + ' · ' + r.places + ' personnes</span><span class="etat etat--ok">Acompte reçu</span>';
      liste.appendChild(li);
    });
    document.getElementById('resa-total').textContent = reservations.length + ' tables · ' + couverts + ' couverts';
  }

  function choisir(t) {
    var n = Number(t.getAttribute('data-table'));
    if (prises.indexOf(n) !== -1) return;
    choisie = n === choisie ? null : n;
    dessiner();
  }

  plan.addEventListener('click', function (e) { var t = e.target.closest('.table'); if (t) choisir(t); });
  plan.addEventListener('keydown', function (e) {
    var t = e.target.closest('.table');
    if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); choisir(t); }
  });

  bouton.addEventListener('click', function () {
    if (!choisie) return;
    var t = plan.querySelector('[data-table="' + choisie + '"]');
    reservations.forEach(function (r) { r.neuve = false; });
    reservations.unshift({ heure: '20 h 30', table: choisie, places: Number(t.getAttribute('data-places')), neuve: true });
    prises.push(choisie);
    choisie = null;
    dessiner();
  });

  function recommencer() {
    prises = [2, 3, 5, 9];
    reservations = DEPART.map(function (r) { return { heure: r.heure, table: r.table, places: r.places }; });
    choisie = null;
    dessiner();
  }
  document.getElementById('resa-recommencer').addEventListener('click', recommencer);
  recommencer();
})();

/* Commandes : chaque commande avance d'un état à chaque clic, et reste dans l'historique. */
(function () {
  var liste = document.getElementById('cmd-liste');
  if (!liste) return;
  var ETATS = ['À préparer', 'Prête', 'Livrée'];
  var ACTIONS = ['Marquer prête', 'Marquer livrée'];
  var DEPART = [
    { ref: 'n° 104', quoi: '12 plateaux repas', quand: 'pour 12 h 30', montant: 18000, etat: 0 },
    { ref: 'n° 105', quoi: '40 pièces salées', quand: 'pour 16 h 00', montant: 9500, etat: 0 },
    { ref: 'n° 103', quoi: '6 plateaux repas', quand: 'pour 12 h 00', montant: 9000, etat: 1 },
    { ref: 'n° 102', quoi: '25 plateaux repas', quand: 'hier', montant: 37500, etat: 2 }
  ];
  var commandes;

  function dessiner() {
    liste.innerHTML = '';
    var aFaire = 0;
    commandes.forEach(function (c, i) {
      if (c.etat === 0) aFaire += 1;
      var li = document.createElement('li');
      li.className = 'rang rang--commande';
      li.innerHTML =
        '<b>' + c.ref + '</b>' +
        '<span>' + c.quoi + '<small>' + c.quand + ' · ' + da(c.montant) + '</small></span>' +
        '<span class="rang__fin"><span class="etat' + (c.etat === 2 ? ' etat--ok' : '') + '">' + ETATS[c.etat] + '</span>' +
        (c.etat < 2 ? '<button type="button" class="bouton bouton--petit bouton--clair" data-i="' + i + '">' + ACTIONS[c.etat] + '</button>' : '') +
        '</span>';
      liste.appendChild(li);
    });
    var bande = document.getElementById('cmd-bande');
    bande.setAttribute('data-etat', aFaire ? 'du' : 'ok');
    bande.textContent = aFaire ? aFaire + (aFaire > 1 ? ' commandes à préparer' : ' commande à préparer') : 'Rien à préparer pour l\'instant';
  }

  liste.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-i]');
    if (!b) return;
    commandes[Number(b.getAttribute('data-i'))].etat += 1;
    dessiner();
  });

  function recommencer() {
    commandes = DEPART.map(function (c) { return { ref: c.ref, quoi: c.quoi, quand: c.quand, montant: c.montant, etat: c.etat }; });
    dessiner();
  }
  document.getElementById('cmd-recommencer').addEventListener('click', recommencer);
  recommencer();
})();

/* Paiements : un clic encaisse ce qui reste dû, la bande passe du rouge au vert. */
(function () {
  var boite = document.getElementById('solde');
  if (!boite) return;
  var DEPART = [
    { client: 'Société A', commande: 64000, verse: 40000 },
    { client: 'Société B', commande: 30000, verse: 30000 },
    { client: 'Société C', commande: 18500, verse: 0 }
  ];
  var lignes;

  function dessiner() {
    var du = 0, clients = 0;
    var liste = boite.querySelector('.solde__liste');
    liste.innerHTML = '';
    lignes.forEach(function (l, i) {
      var reste = l.commande - l.verse;
      if (reste > 0) { du += reste; clients += 1; }
      var li = document.createElement('li');
      li.className = 'rang rang--commande';
      li.innerHTML =
        '<b>' + l.client + '</b>' +
        '<span><small>Commandé ' + da(l.commande) + ' · versé ' + da(l.verse) + '</small></span>' +
        '<span class="rang__fin">' + (reste > 0
          ? '<button type="button" class="bouton bouton--petit" data-i="' + i + '">Encaisser ' + da(reste) + '</button>'
          : '<span class="etat etat--ok">À jour</span>') + '</span>';
      liste.appendChild(li);
    });
    var bande = boite.querySelector('.bande');
    bande.setAttribute('data-etat', du > 0 ? 'du' : 'ok');
    bande.textContent = du > 0
      ? da(du) + (clients > 1 ? ' restent à encaisser sur ' + clients + ' clients' : ' restent à encaisser sur 1 client')
      : 'Tout est encaissé';
  }

  function recommencer() {
    lignes = DEPART.map(function (l) { return { client: l.client, commande: l.commande, verse: l.verse }; });
    dessiner();
  }

  boite.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b) return;
    if (b.hasAttribute('data-i')) { var l = lignes[Number(b.getAttribute('data-i'))]; l.verse = l.commande; dessiner(); }
    else if (b.id === 'solde-recommencer') recommencer();
  });

  recommencer();
})();

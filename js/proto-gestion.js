/* Prototype 02 · espace de gestion d'une pâtisserie, côté commerçant.
   Commandes qui avancent d'un clic, encaissements notés, chiffres du haut recalculés, et
   commande reçue deux fois signalée avant d'être ajoutée. Données fictives. */

(function () {
  var ecran = document.getElementById('gestion-ecran');
  if (!ecran) return;
  window.protos = window.protos || {};

  var ETATS = ['À préparer', 'Prête', 'Livrée'];
  var ACTIONS = ['Marquer prête', 'Marquer livrée'];
  var DEPART = [
    { ref: 214, client: 'Client A', quoi: 'Gâteau d\'anniversaire, 12 parts', pour: 'aujourd\'hui, 17 h', montant: 6500, paye: 3000, etat: 0 },
    { ref: 215, client: 'Client B', quoi: '40 tartelettes aux fruits', pour: 'aujourd\'hui, 18 h', montant: 8000, paye: 8000, etat: 0 },
    { ref: 213, client: 'Client C', quoi: 'Pièce montée, 60 choux', pour: 'demain, 11 h', montant: 24000, paye: 10000, etat: 0 },
    { ref: 212, client: 'Client D', quoi: 'Plateau de mignardises', pour: 'aujourd\'hui, 10 h', montant: 4500, paye: 4500, etat: 2 }
  ];
  var VERSEMENTS = [
    { ref: 212, client: 'Client D', montant: 4500, quand: 'Aujourd\'hui, 9 h 40', jour: true },
    { ref: 215, client: 'Client B', montant: 8000, quand: 'Hier, 16 h 05', jour: false },
    { ref: 213, client: 'Client C', montant: 10000, quand: 'Hier, 11 h 20 · acompte', jour: false },
    { ref: 214, client: 'Client A', montant: 3000, quand: 'Avant-hier · acompte', jour: false }
  ];
  /* Ce que « le site » envoie quand on clique : la deuxième est la même que la première. */
  var ARRIVEES = [
    { client: 'Client E', quoi: 'Boîte de 24 macarons', pour: 'demain, 15 h', montant: 4800 },
    { client: 'Client E', quoi: 'Boîte de 24 macarons', pour: 'demain, 15 h', montant: 4800 },
    { client: 'Client F', quoi: 'Tarte aux fraises, 8 parts', pour: 'demain, 12 h', montant: 3600 },
    { client: 'Client G', quoi: 'Gâteau au chocolat, 20 parts', pour: 'dans deux jours, 16 h', montant: 9500 }
  ];
  var e;

  function copie(l) { return l.map(function (o) { return Object.assign({}, o); }); }
  function heure() { var d = new Date(); return 'Aujourd\'hui, ' + d.getHours() + ' h ' + String(d.getMinutes()).padStart(2, '0'); }

  function chiffres() {
    var aFaire = 0, du = 0, nDu = 0, jour = 0;
    e.commandes.forEach(function (c) { if (c.etat === 0) aFaire += 1; if (c.montant > c.paye) { du += c.montant - c.paye; nDu += 1; } });
    var nbJour = 0;
    e.versements.forEach(function (v) { if (v.jour) { jour += v.montant; nbJour += 1; } });
    return '<div class="pg-chiffres">' +
      '<div><span>À préparer</span><b>' + aFaire + '</b><small>' + (aFaire > 1 ? 'commandes' : 'commande') + '</small></div>' +
      '<div><span>Encaissé aujourd\'hui</span><b>' + da(jour) + '</b><small>' + nbJour + (nbJour > 1 ? ' versements' : ' versement') + '</small></div>' +
      '<div class="' + (du ? 'pg-du' : 'pg-ajour') + '"><span>Reste à encaisser</span><b>' + (du ? da(du) : 'Rien') + '</b><small>' + (du ? 'sur ' + nDu + ' commande' + (nDu > 1 ? 's' : '') : 'Tout est encaissé') + '</small></div></div>';
  }

  function avis() {
    if (!e.avis) return '';
    if (e.avis.type === 'doublon') {
      var a = e.avis.commande;
      return '<div class="pg-avis pg-avis--doublon" role="alert"><p><b>Commande peut-être reçue deux fois.</b> ' + a.client + ' vient de repasser la même commande : ' +
        a.quoi.toLowerCase() + ', pour ' + a.pour + '.</p><div><button type="button" class="pg-bouton" data-ecarter>Ne pas l\'ajouter</button>' +
        '<button type="button" class="pg-bouton pg-bouton--clair" data-garder>Garder les deux</button></div></div>';
    }
    return '<div class="pg-avis" role="status"><p>' + e.avis.texte + '</p></div>';
  }

  function filtrees() {
    return e.commandes.filter(function (c) { return e.filtre === -1 || c.etat === e.filtre; });
  }

  function vueCommandes() {
    var noms = [['Toutes', -1], ['À préparer', 0], ['Prêtes', 1], ['Livrées', 2]];
    var h = '<div class="pg-outils"><div class="pg-filtres" role="group" aria-label="Filtrer les commandes">' + noms.map(function (f) {
      var n = f[1] === -1 ? e.commandes.length : e.commandes.filter(function (c) { return c.etat === f[1]; }).length;
      return '<button type="button" data-filtre="' + f[1] + '" aria-pressed="' + (e.filtre === f[1]) + '">' + f[0] + ' <span>' + n + '</span></button>';
    }).join('') + '</div>';
    var reste = e.arrivee < ARRIVEES.length;
    h += '<button type="button" class="pg-bouton" data-simuler' + (reste && !(e.avis && e.avis.type === 'doublon') ? '' : ' disabled') + '>' +
      (reste ? 'Recevoir une commande du site' : 'Plus de commande dans l\'exemple') + '</button></div>';
    h += '<table class="pg-table"><thead><tr><th>N°</th><th>Client</th><th>Commande</th><th>Montant</th><th>Paiement</th><th>État</th><th><span class="pg-sr">Action</span></th></tr></thead><tbody>';
    var lignes = filtrees();
    if (!lignes.length) h += '<tr><td colspan="7" class="pg-vide">Aucune commande dans ce filtre.</td></tr>';
    lignes.forEach(function (c) {
      var i = e.commandes.indexOf(c);
      var reste = c.montant - c.paye;
      var etat = c.etat === 2 && reste > 0 ? '<span class="pg-etat pg-etat--du">Livrée · solde dû</span>' : '<span class="pg-etat pg-etat--' + c.etat + '">' + ETATS[c.etat] + '</span>';
      h += '<tr' + (c.neuve ? ' class="pg-neuve"' : '') + '><td data-l="N°" class="pg-ref">n° ' + c.ref + '</td><td data-l="Client" class="pg-client">' + c.client + '</td>' +
        '<td data-l="Commande" class="pg-quoi">' + c.quoi + '<small>pour ' + c.pour + '</small></td><td data-l="Montant" class="pg-nb">' + da(c.montant) + '</td>' +
        '<td data-l="Paiement">' + (reste > 0 ? '<span class="pg-reste">Reste ' + da(reste) + '</span><button type="button" class="pg-lien" data-encaisser="' + i + '">Encaisser</button>' : '<span class="pg-paye">Payé</span>') + '</td>' +
        '<td data-l="État">' + etat + '</td><td class="pg-action">' + (c.etat < 2 ? '<button type="button" class="pg-bouton pg-bouton--clair" data-avancer="' + i + '">' + ACTIONS[c.etat] + '</button>' : '') + '</td></tr>';
    });
    return h + '</tbody></table>';
  }

  function vueVersements() {
    var h = '<p class="pg-intro">Chaque versement est noté avec sa commande. Rien ne se perd dans un cahier.</p>';
    h += '<table class="pg-table pg-table--versements"><thead><tr><th>Quand</th><th>Commande</th><th>Client</th><th>Montant</th></tr></thead><tbody>';
    e.versements.forEach(function (v) {
      h += '<tr' + (v.neuf ? ' class="pg-neuve"' : '') + '><td data-l="Quand">' + v.quand + '</td><td data-l="Commande" class="pg-ref">n° ' + v.ref + '</td><td data-l="Client">' + v.client + '</td><td data-l="Montant" class="pg-nb">' + da(v.montant) + '</td></tr>';
    });
    return h + '</tbody></table>';
  }

  function dessiner() {
    var date = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    ecran.innerHTML = '<div class="pg"><aside class="pg-cote"><span class="pg-marque">Votre pâtisserie</span>' +
      '<nav aria-label="Espace de gestion"><button type="button" data-vue="commandes"' + (e.vue === 'commandes' ? ' aria-current="page"' : '') + '>Commandes</button>' +
      '<button type="button" data-vue="versements"' + (e.vue === 'versements' ? ' aria-current="page"' : '') + '>Encaissements</button></nav>' +
      '<p class="pg-date">' + date + '</p></aside><div class="pg-main">' + chiffres() + avis() +
      (e.vue === 'commandes' ? vueCommandes() : vueVersements()) + '</div></div>';
  }

  function ajouter(a) {
    e.commandes.forEach(function (c) { c.neuve = false; });
    e.commandes.unshift({ ref: e.prochain++, client: a.client, quoi: a.quoi, pour: a.pour, montant: a.montant, paye: 0, etat: 0, neuve: true });
    e.filtre = -1;
  }

  ecran.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b || b.disabled) return;
    if (b.hasAttribute('data-vue')) { e.vue = b.getAttribute('data-vue'); e.avis = null; }
    else if (b.hasAttribute('data-filtre')) e.filtre = Number(b.getAttribute('data-filtre'));
    else if (b.hasAttribute('data-avancer')) { var c = e.commandes[Number(b.getAttribute('data-avancer'))]; c.etat += 1; e.avis = null; }
    else if (b.hasAttribute('data-encaisser')) {
      var k = e.commandes[Number(b.getAttribute('data-encaisser'))];
      e.versements.forEach(function (v) { v.neuf = false; });
      e.versements.unshift({ ref: k.ref, client: k.client, montant: k.montant - k.paye, quand: heure(), jour: true, neuf: true });
      e.avis = { type: 'info', texte: da(k.montant - k.paye) + ' encaissés pour la commande n° ' + k.ref + '. Le versement est noté dans Encaissements.' };
      k.paye = k.montant;
    }
    else if (b.hasAttribute('data-simuler')) {
      var a = ARRIVEES[e.arrivee++];
      var meme = e.commandes.some(function (c) { return c.etat === 0 && c.client === a.client && c.quoi === a.quoi && c.pour === a.pour; });
      if (meme) e.avis = { type: 'doublon', commande: a };
      else { ajouter(a); e.avis = { type: 'info', texte: 'Nouvelle commande reçue du site : ' + a.client + ', ' + a.quoi.toLowerCase() + '.' }; }
    }
    else if (b.hasAttribute('data-ecarter')) e.avis = { type: 'info', texte: 'Doublon écarté. La commande ne sera pas préparée deux fois.' };
    else if (b.hasAttribute('data-garder')) { ajouter(e.avis.commande); e.avis = { type: 'info', texte: 'Les deux commandes sont gardées.' }; }
    dessiner();
  });

  function depart() {
    e = { commandes: copie(DEPART), versements: copie(VERSEMENTS), vue: 'commandes', filtre: -1, avis: null, arrivee: 0, prochain: 216 };
    dessiner();
  }
  window.protos.gestion = depart;
  depart();
})();

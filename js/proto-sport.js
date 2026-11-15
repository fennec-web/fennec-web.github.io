/* Prototype 03 · abonnement à une salle de sport, côté client. La formule choisie ouvre
   directement l'étape suivante (pas de redite), puis le créneau femmes ou hommes, le paiement
   en ligne (marqué DÉMO) ou à l'accueil, et la carte de membre. Prix d'exemple. */

(function () {
  var ecran = document.getElementById('sport-ecran');
  if (!ecran) return;
  window.protos = window.protos || {};

  var FORMULES = [
    { id: 1, nom: '1 mois', prix: 3500, mois: 1, inclus: ['Accès à la salle', 'Vestiaires et douches'] },
    { id: 3, nom: '3 mois', prix: 9000, mois: 3, inclus: ['Accès à la salle', 'Vestiaires et douches', 'Une séance avec un coach'] },
    { id: 12, nom: '12 mois', prix: 30000, mois: 12, inclus: ['Accès à la salle', 'Vestiaires et douches', 'Quatre séances avec un coach'] }
  ];
  var CRENEAUX = {
    femmes: { nom: 'Femmes', heures: 'Tous les jours, 8 h à 14 h' },
    hommes: { nom: 'Hommes', heures: 'Tous les jours, 14 h à 22 h' }
  };
  var e;

  function formule() { return FORMULES.filter(function (f) { return f.id === e.formule; })[0]; }
  function auMois(f) { return da(Math.round(f.prix / f.mois / 50) * 50) + ' par mois'; }

  function tete() {
    return '<header class="sp-tete"><span class="sp-marque">Votre salle</span><span class="sp-pas">' + e.etape + ' / 3</span></header>';
  }

  function etape1() {
    var h = '<div class="sp-corps"><p class="sp-sur">Abonnement</p><h3 class="sp-titre">Choisissez votre formule</h3><div class="sp-formules">';
    FORMULES.forEach(function (f) {
      h += '<button type="button" class="sp-formule" data-formule="' + f.id + '"' + (f.id === e.formule ? ' aria-pressed="true"' : '') + '>' +
        '<span class="sp-formule__nom">' + f.nom + '</span><span class="sp-formule__prix">' + da(f.prix) + '</span>' +
        '<span class="sp-formule__mois">' + (f.mois > 1 ? auMois(f) : 'Sans engagement') + '</span>' +
        '<span class="sp-formule__inclus">' + f.inclus.join(' · ') + '</span><span class="sp-formule__aller">Choisir</span></button>';
    });
    return h + '</div><p class="sp-aide">Prix d\'exemple.</p></div>';
  }

  function etape2() {
    var f = formule();
    var h = '<div class="sp-rappel"><span>' + f.nom + ' · ' + da(f.prix) + '</span><button type="button" data-aller="1">Modifier</button></div>';
    h += '<div class="sp-corps"><p class="sp-label">Votre créneau</p><div class="sp-creneaux">';
    Object.keys(CRENEAUX).forEach(function (k) {
      h += '<button type="button" data-creneau="' + k + '" aria-pressed="' + (e.creneau === k) + '"><b>' + CRENEAUX[k].nom + '</b><small>' + CRENEAUX[k].heures + '</small></button>';
    });
    h += '</div><p class="sp-label">Paiement</p><div class="sp-paiements">' +
      '<button type="button" data-paiement="ligne" aria-pressed="' + (e.paiement === 'ligne') + '"><b>En ligne</b><small>Carte CIB ou Edahabia</small></button>' +
      '<button type="button" data-paiement="accueil" aria-pressed="' + (e.paiement === 'accueil') + '"><b>À l\'accueil</b><small>À votre première visite</small></button></div>';
    if (e.paiement === 'ligne') h += '<p class="sp-demo"><b>DÉMO</b> Aucun paiement réel, aucune carte demandée. Le vrai site passe par une page de paiement sécurisée.</p>';
    var pret = e.creneau && e.paiement;
    h += '<button type="button" class="sp-bouton" data-valider' + (pret ? '' : ' disabled') + '>' +
      (!e.creneau ? 'Choisissez un créneau' : !e.paiement ? 'Choisissez le paiement' : e.paiement === 'ligne' ? 'Payer ' + da(f.prix) + ' (démo)' : 'Réserver mon abonnement') + '</button></div>';
    return h;
  }

  /* Un code dessiné à partir d'un nombre : il a l'air d'un vrai, il ne contient rien. */
  function code(graine) {
    var n = 25, t = 6, s = '', x = graine;
    function oeil(cx, cy) {
      return '<rect x="' + cx * t + '" y="' + cy * t + '" width="' + 7 * t + '" height="' + 7 * t + '"/>' +
        '<rect x="' + (cx + 1) * t + '" y="' + (cy + 1) * t + '" width="' + 5 * t + '" height="' + 5 * t + '" fill="#fff"/>' +
        '<rect x="' + (cx + 2) * t + '" y="' + (cy + 2) * t + '" width="' + 3 * t + '" height="' + 3 * t + '"/>';
    }
    for (var i = 0; i < n; i++) for (var j = 0; j < n; j++) {
      var coin = (i < 8 && j < 8) || (i < 8 && j > n - 9) || (i > n - 9 && j < 8);
      x = (x * 16807) % 2147483647;
      if (!coin && x % 3 === 0 || !coin && x % 3 === 1 && (i + j) % 2) s += '<rect x="' + j * t + '" y="' + i * t + '" width="' + t + '" height="' + t + '"/>';
    }
    return '<svg class="sp-code" viewBox="-12 -12 ' + (n * t + 24) + ' ' + (n * t + 24) + '" role="img" aria-label="Code d\'entrée"><rect x="-12" y="-12" width="' + (n * t + 24) + '" height="' + (n * t + 24) + '" fill="#fff"/>' +
      s + oeil(0, 0) + oeil(n - 7, 0) + oeil(0, n - 7) + '</svg>';
  }

  function etape3() {
    var f = formule();
    var fin = new Date();
    fin.setMonth(fin.getMonth() + f.mois);
    var c = CRENEAUX[e.creneau];
    return '<div class="sp-corps"><p class="sp-sur">C\'est fait</p><h3 class="sp-titre">Bienvenue.</h3>' +
      '<div class="sp-carte"><div class="sp-carte__haut"><span>Votre salle</span><span>Membre</span></div>' +
      '<p class="sp-carte__formule">Abonnement ' + f.nom + '</p>' +
      '<p class="sp-carte__fin">Valable jusqu\'au ' + fin.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) + '</p>' +
      '<p class="sp-carte__creneau">Créneau ' + c.nom.toLowerCase() + ' · ' + c.heures.charAt(0).toLowerCase() + c.heures.slice(1) + '</p>' +
      code(e.formule * 7919 + (e.creneau === 'femmes' ? 3 : 5)) +
      '<p class="sp-carte__etat' + (e.paiement === 'ligne' ? '' : ' sp-carte__etat--du') + '">' +
      (e.paiement === 'ligne' ? 'Payé en ligne (démo)' : 'À régler à l\'accueil : ' + da(f.prix)) + '</p></div>' +
      '<p class="sp-aide">Présentez ce code à l\'entrée. Un rappel WhatsApp arrive trois jours avant la fin de l\'abonnement.</p>' +
      '<button type="button" class="sp-bouton sp-bouton--clair" data-recommencer>Recommencer</button></div>';
  }

  function dessiner() {
    ecran.innerHTML = '<div class="sp">' + tete() + (e.etape === 1 ? etape1() : e.etape === 2 ? etape2() : etape3()) + '</div>';
  }

  ecran.addEventListener('click', function (ev) {
    var b = ev.target.closest('button');
    if (!b || b.disabled) return;
    if (b.hasAttribute('data-formule')) { e.formule = Number(b.getAttribute('data-formule')); e.etape = 2; ecran.scrollTop = 0; }
    else if (b.hasAttribute('data-aller')) e.etape = 1;
    else if (b.hasAttribute('data-creneau')) e.creneau = b.getAttribute('data-creneau');
    else if (b.hasAttribute('data-paiement')) e.paiement = b.getAttribute('data-paiement');
    else if (b.hasAttribute('data-valider')) { e.etape = 3; ecran.scrollTop = 0; }
    else if (b.hasAttribute('data-recommencer')) { depart(); return; }
    dessiner();
  });

  function depart() {
    e = { etape: 1, formule: null, creneau: null, paiement: null };
    ecran.scrollTop = 0;
    dessiner();
  }
  window.protos.sport = depart;
  depart();
})();

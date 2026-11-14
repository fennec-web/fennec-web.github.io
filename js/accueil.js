/* Fennec Web · accueil : menu, planche du fennec, exemple de solde */

/* Menu sur téléphone : la valeur "true" est écrite, le CSS teste cette valeur. */
function basculerMenu() {
  var entete = document.querySelector('.entete');
  var ouvert = entete.getAttribute('data-ouvert') === 'true';
  entete.setAttribute('data-ouvert', ouvert ? 'false' : 'true');
  document.querySelector('.entete__menu-bouton').setAttribute('aria-expanded', ouvert ? 'false' : 'true');
}

document.querySelectorAll('.nav a').forEach(function (lien) {
  lien.addEventListener('click', function () {
    document.querySelector('.entete').setAttribute('data-ouvert', 'false');
    document.querySelector('.entete__menu-bouton').setAttribute('aria-expanded', 'false');
  });
});

/* Planche : un repère survolé ou atteint au clavier allume son trait et son point. */
(function () {
  var planche = document.getElementById('planche');
  if (!planche) return;

  planche.querySelectorAll('[data-n]').forEach(function (el) {
    var n = el.getAttribute('data-n');
    function allumer() { planche.setAttribute('data-actif', n); }
    function eteindre() { planche.setAttribute('data-actif', ''); }
    el.addEventListener('mouseenter', allumer);
    el.addEventListener('mouseleave', eteindre);
    el.addEventListener('focusin', allumer);
    el.addEventListener('focusout', eteindre);
  });

  /* La tête suit légèrement la souris. Jamais au doigt, jamais si l'on a demandé moins d'animation. */
  var souris = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!souris || calme) return;

  var dessin = planche.querySelector('.planche__dessin');
  planche.addEventListener('pointermove', function (e) {
    var r = planche.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    dessin.style.transform = 'translate(' + (x * 12).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px) rotate(' + (x * 2.4).toFixed(2) + 'deg)';
  });
  planche.addEventListener('pointerleave', function () { dessin.style.transform = ''; });
})();

/* Exemple de solde : chiffres fictifs, un clic encaisse ce qui reste dû. */
(function () {
  var boite = document.getElementById('solde');
  if (!boite) return;

  var DEPART = [
    { client: 'Société A', commande: 64000, verse: 40000 },
    { client: 'Société B', commande: 30000, verse: 30000 },
    { client: 'Société C', commande: 18500, verse: 0 }
  ];
  var lignes;

  function da(n) { return n.toLocaleString('fr-FR') + ' DA'; }

  function dessiner() {
    var du = 0, clients = 0;
    var liste = boite.querySelector('.solde__liste');
    liste.innerHTML = '';

    lignes.forEach(function (l, i) {
      var reste = l.commande - l.verse;
      if (reste > 0) { du += reste; clients += 1; }
      var li = document.createElement('li');
      li.className = 'solde__ligne';
      li.innerHTML =
        '<span class="solde__client">' + l.client + '</span>' +
        '<span class="solde__detail">Commandé ' + da(l.commande) + ' · versé ' + da(l.verse) + '</span>' +
        '<span class="solde__action">' +
          (reste > 0
            ? '<button type="button" class="bouton bouton--petit" data-i="' + i + '">Encaisser ' + da(reste) + '</button>'
            : '<span class="solde__ajour">À jour</span>') +
        '</span>';
      liste.appendChild(li);
    });

    var bande = boite.querySelector('.solde__bande');
    if (du > 0) {
      bande.setAttribute('data-etat', 'du');
      bande.textContent = da(du) + (clients > 1 ? ' restent à encaisser sur ' + clients + ' clients' : ' restent à encaisser sur 1 client');
    } else {
      bande.setAttribute('data-etat', 'ok');
      bande.textContent = 'Tout est encaissé';
    }
  }

  function recommencer() {
    lignes = DEPART.map(function (l) { return { client: l.client, commande: l.commande, verse: l.verse }; });
    dessiner();
  }

  boite.addEventListener('click', function (e) {
    var bouton = e.target.closest('button');
    if (!bouton) return;
    if (bouton.hasAttribute('data-i')) {
      var l = lignes[Number(bouton.getAttribute('data-i'))];
      l.verse = l.commande;
      dessiner();
    } else if (bouton.id === 'solde-recommencer') {
      recommencer();
    }
  });

  recommencer();
})();

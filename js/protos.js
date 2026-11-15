/* Fennec Web · section Exemples : choix du prototype et remise à zéro.
   Chaque prototype s'inscrit dans window.protos avec sa fonction de départ. */

window.protos = window.protos || {};

function da(n) { return n.toLocaleString('fr-FR').replace(/\s/g, ' ') + ' DA'; }

(function () {
  var choix = document.querySelectorAll('.protos__choix button');
  if (!choix.length) return;

  /* Une seule scène visible, cachée par le style en ligne (hidden perd devant display). */
  function montrer(nom) {
    choix.forEach(function (b) { b.setAttribute('aria-selected', b.getAttribute('data-proto') === nom ? 'true' : 'false'); });
    document.querySelectorAll('.scene').forEach(function (s) { s.style.display = s.id === 'scene-' + nom ? '' : 'none'; });
  }
  choix.forEach(function (b) { b.addEventListener('click', function () { montrer(b.getAttribute('data-proto')); }); });

  document.querySelectorAll('[data-zero]').forEach(function (b) {
    b.addEventListener('click', function () {
      var depart = window.protos[b.getAttribute('data-zero')];
      if (depart) depart();
    });
  });
})();

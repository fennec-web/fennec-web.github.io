/* Fennec Web · accueil : menu et planche du fennec. Les exemples sont dans exemples.js */

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

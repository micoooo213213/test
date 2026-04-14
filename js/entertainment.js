/* =====================================================
   HOTEL — Entertainment  /  js/entertainment.js

   HOW TO ADD A GAME — two steps only:

   STEP 1 — Open tools/base64.html, generate the card,
            save the output as  subway-surfers.html,
            upload to  micoooo213213/boxart → cards/

   STEP 2 — Add ONE line to the games-grid:
            <div data-src="https://cdn.jsdelivr.net/gh/micoooo213213/boxart@main/cards/subway-surfers.html"></div>

   That's it. Name, tag, desc, boxart — all read
   automatically from the jsDelivr file. No repetition.
   ===================================================== */

var cardCache = {};

/* ── BUILD CARDS ON PAGE LOAD ───────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  var slots = document.querySelectorAll('#gamesGrid [data-src]');
  slots.forEach(function(slot) {
    loadCard(slot);
  });
});

function loadCard(slot) {
  var src = slot.dataset.src;
  if (!src) return;

  fetch(src)
    .then(function(res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function(cardHtml) {
      /* Parse everything from the fetched card file */
      var b64Match   = cardHtml.match(/data-base64="([^"]+)"/);
      var baseMatch  = cardHtml.match(/data-base="([^"]+)"/);
      var nameMatch  = cardHtml.match(/data-name="([^"]+)"/);
      var imgMatch   = cardHtml.match(/<img[^>]+src="([^"]+)"/);
      var tagMatch   = cardHtml.match(/class="game-tag">([^<]+)</);
      var descMatch  = cardHtml.match(/class="game-desc">([^<]+)</);
      var labelMatch = cardHtml.match(/class="game-label">([^<]+)</);

      if (!b64Match) {
        console.warn('No data-base64 found in', src);
        slot.remove();
        return;
      }

      var b64    = b64Match[1];
      var base   = baseMatch  ? baseMatch[1]  : '';
      var name   = nameMatch  ? nameMatch[1]  : (labelMatch ? labelMatch[1] : 'Game');
      var imgSrc = imgMatch   ? imgMatch[1]   : '';
      var tag    = tagMatch   ? tagMatch[1]   : 'Game';
      var desc   = descMatch  ? descMatch[1]  : '';
      var label  = labelMatch ? labelMatch[1] : name;

      /* Cache for instant launch on click */
      cardCache[src] = { b64: b64, base: base };

      /* Build the visible card element */
      var article = document.createElement('article');
      article.className       = 'game-card';
      article.dataset.src     = src;
      article.dataset.name    = name;

      article.innerHTML =
        '<div class="game-thumb">' +
          '<img src="' + imgSrc + '" alt="' + escAttr(name) + '" ' +
            'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
          '<div class="no-art">' +
            '<div class="no-art-icon">&#127918;</div>' +
            '<div class="no-art-text">No Art</div>' +
          '</div>' +
        '</div>' +
        '<div class="game-tag">'  + tag   + '</div>' +
        '<div class="game-desc">' + desc  + '</div>' +
        '<div class="game-label">'+ label + '</div>';

      article.onclick = function() { launch(src); };

      /* Replace the placeholder div with the real card */
      slot.parentNode.replaceChild(article, slot);

      /* Re-run cursor hover setup for new element */
      if (typeof setupCursorHover === 'function') setupCursorHover(article);
    })
    .catch(function(err) {
      console.warn('Could not load card:', src, err.message);
      slot.remove();
    });
}


/* ── LAUNCH GAME ────────────────────────────────────── */
function launch(src) {
  var cached = cardCache[src];
  if (!cached) {
    alert('Game not loaded yet — please wait a moment and try again.');
    return;
  }
  openAsBlob(cached.b64, cached.base);
}


/* ── DECODE BASE64 + OPEN AS BLOB ───────────────────── */
function openAsBlob(b64, baseHref) {
  var html;
  try {
    var bytes = atob(b64);
    var arr   = new Uint8Array(bytes.length);
    for (var i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    html = new TextDecoder('utf-8').decode(arr);
  } catch(e) {
    html = atob(b64);
  }

  if (baseHref && html.indexOf('<base') === -1) {
    html = html.replace(/(<head[^>]*>)/i, '$1\n<base href="' + baseHref + '">');
    if (html.indexOf('<base') === -1) html = '<base href="' + baseHref + '">' + html;
  }

  var blob = new Blob([html], { type: 'text/html' });
  var url  = URL.createObjectURL(blob);
  var win  = window.open(url, '_blank');
  setTimeout(function() { URL.revokeObjectURL(url); }, 60000);
  if (!win) alert('Pop-up blocked.\nAllow pop-ups for this site and try again.');
}


/* ── SEARCH ─────────────────────────────────────────── */
function filterGames(query) {
  var q     = query.toLowerCase().trim();
  var cards = document.querySelectorAll('#gamesGrid .game-card');
  var shown = 0;
  cards.forEach(function(card) {
    var name = (card.dataset.name || '').toLowerCase();
    var tag  = ((card.querySelector('.game-tag')  || {}).textContent || '').toLowerCase();
    var desc = ((card.querySelector('.game-desc') || {}).textContent || '').toLowerCase();
    var hit  = !q || name.indexOf(q)!==-1 || tag.indexOf(q)!==-1 || desc.indexOf(q)!==-1;
    card.classList.toggle('g-hidden', !hit);
    if (hit) shown++;
  });
  var nr = document.getElementById('noResults');
  if (nr) nr.classList.toggle('show', shown === 0 && q !== '');
}


/* ── HELPER ─────────────────────────────────────────── */
function escAttr(s) {
  return String(s).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

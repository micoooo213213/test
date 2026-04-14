/* ============================================================
   EXAMPLE GAME FILE — games/subway-surfers.js
   ============================================================

   UPLOAD THIS FILE to your GitHub repo at:
   micoooo213213/boxart  →  games/subway-surfers.js

   Then add this card to entertainment.html:

   <article class="game-card"
            data-key="subway-surfers"
            data-base="https://cdn.jsdelivr.net/gh/micoooo213213/boxart@main/subway-surfers/"
            data-name="Subway Surfers"
            onclick="openGame(this)">
     <div class="game-thumb">
       <img src="https://cdn.jsdelivr.net/gh/micoooo213213/boxart@main/subway-surfers/boxart.png"
            alt="Subway Surfers"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="no-art"><div class="no-art-icon">&#127918;</div><div class="no-art-text">No Art</div></div>
     </div>
     <div class="game-tag">Arcade</div>
     <div class="game-desc">Run, dodge and surf through the subway.</div>
     <div class="game-label">Subway Surfers</div>
   </article>

   ============================================================
   HOW TO GET THE BASE64 STRING
   ============================================================

   Option A — Online tool (easiest, no console needed):
     1. Open the game's index.html file in a text editor
     2. Select all, copy
     3. Go to  https://www.base64encode.org/
     4. Paste in the box, click ENCODE
     5. Copy the output — replace PASTE_BASE64_HERE below

   Option B — From a jsDelivr URL (if game is already online):
     1. Go to  https://jsconsole.com/
     2. Paste this (replace the URL with your game's URL):
        fetch('https://cdn.jsdelivr.net/gh/USER/REPO@main/game/index.html').then(r=>r.text()).then(t=>console.log(btoa(unescape(encodeURIComponent(t)))))
     3. Copy the output — replace PASTE_BASE64_HERE below

   ============================================================
   THE ACTUAL FILE FORMAT — this one line is all you need:
   ============================================================ */

window.GAMES["subway-surfers"] = "PASTE_BASE64_HERE";

/* ═══════════════════════════════════════════
   HOTEL — Stay Page JavaScript
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // Pre-select room if passed via URL param ?room=0/1/2
  const params = new URLSearchParams(window.location.search);
  const roomIdx = parseInt(params.get('room'));
  const sel = document.getElementById('roomSel');
  if (!isNaN(roomIdx) && sel && roomIdx < sel.options.length) {
    sel.selectedIndex = roomIdx;
    setTimeout(() => {
      document.getElementById('bookSec')?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  }

});

function scrollToBook(roomIndex) {
  const sel = document.getElementById('roomSel');
  if (sel && roomIndex !== undefined) sel.selectedIndex = roomIndex;
  document.getElementById('bookSec')?.scrollIntoView({ behavior: 'smooth' });
}

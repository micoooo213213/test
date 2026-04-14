# HOTEL — Games Folder

## How to add a game

### 1. Create a subfolder with the game's name (use hyphens, no spaces)
```
games/
  dinosaur-game/
  suika-game/
  basket-bros/
```

### 2. Inside each game folder, add two files:

#### `boxart.png`
The game's box art image — shown as the card thumbnail.
- Recommended size: 400 × 300 px (4:3 ratio)
- Any size works; it will be cropped to fill the card

#### `game.json`
A small config file describing the game:
```json
{
  "name": "Dinosaur Game",
  "tag":  "Arcade",
  "desc": "The classic Google Chrome offline runner. Jump over cacti, dodge birds, survive as long as you can.",
  "url":  "https://chromedino.com"
}
```

Fields:
| Field  | Required | Description                              |
|--------|----------|------------------------------------------|
| `name` | ✅       | Display name shown on the card           |
| `tag`  | ✅       | Genre label (Arcade, Puzzle, Strategy…)  |
| `desc` | ✅       | Short description (1–2 sentences)        |
| `url`  | ✅       | Full URL of the game (must allow iframes)|

### 3. Register the folder in `js/entertainment.js`

Open `js/entertainment.js` and add your folder name to the `GAME_FOLDERS` array:

```js
const GAME_FOLDERS = [
  "dinosaur-game",
  "suika-game",
  "basket-bros",
];
```

### 4. Reload `entertainment.html`

Your game cards will appear automatically.

---

## Notes on URLs

Not every website allows embedding in iframes.  
Games that work well in iframes include:
- `https://chromedino.com` — Dinosaur Game
- `https://play2048.co` — 2048
- `https://minesweeperonline.com` — Minesweeper
- `https://wordleunlimited.org` — Wordle
- `https://sudoku.com` — Sudoku
- Sites hosted on `itch.io` (many indie games)
- Your own self-hosted HTML5 games (best option — no iframe restrictions)

Sites like `chess.com`, `basketbros.io`, and most commercial gaming sites block iframe embedding.
For those, you can link directly by modifying the `openGame()` function in `js/entertainment.js`
to open a new tab instead: `window.open(url, '_blank')`.

# Row Flag — Bike Outliner Extension

Toggle a row's highlight with one keystroke. Press **⌘⇧F** anywhere in a row to highlight (flag) its entire text; press again to unflag. Works on multiple rows at once with a block selection.

## Behavior

- ⌘⇧F toggles the `mark` (highlight) attribute over the full text of each selected row.
- Smart toggle: if every selected row is already flagged, they all unflag; otherwise they all flag.
- Only the selected rows are affected — child rows are left alone.
- A single toggle is one undo step.

## Install

1. Download `row-flag.bkext.zip` from the [latest release](https://github.com/dougwyu/bike-row-flag/releases/latest) and unzip it.
2. Quit Bike.
3. In Finder, press ⌘⇧G and go to `~/Library/Containers/com.hogbaysoftware.Bike/Data/Library/Application Support/Bike/Extensions/`.
4. Move `row-flag.bkext` into that folder, replacing any older copy.
5. Reopen Bike.

Use Finder rather than `cp` in a shell: macOS protects Bike's container, and a shell without Full Disk Access gets `Operation not permitted`.

To install your own build instead, run `npm test` (see below), which builds and installs it in one step.

## Development

```bash
npm install
npm run build
npm test        # run unit tests (Bike must be closed)
```

The build system is [`bike-ext`](https://github.com/bike-outliner/extension-kit).

`npm test` installs the build into Bike's sandboxed container (`~/Library/Containers/com.hogbaysoftware.Bike/...`), which macOS protects. Run it from Terminal with Full Disk Access granted (System Settings > Privacy & Security > Full Disk Access). From any other shell the install fails with `EPERM` and the tests silently run against whatever copy is already installed.

### Note on editing row text

`row.text` returns a *live* `AttributedString`. Mutate it in place with
`addAttribute` / `removeAttribute`. Do **not** assign `row.text = text` —
reassigning the row's own text object back through the setter triggers a
Swift exclusive-access crash (SIGABRT).

## Project structure

```
src/row-flag.bkext/
├── manifest.json      no permissions
├── app/
│   ├── main.ts        command + keybindings + row mutation
│   └── util.ts        shouldUnmark decision helper
└── tests/
    └── util.test.ts   unit tests for shouldUnmark
```

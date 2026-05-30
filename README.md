# Row Flag — Bike Outliner Extension

Toggle a row's highlight with one keystroke. Press **⌘⇧F** anywhere in a row to highlight (flag) its entire text; press again to unflag. Works on multiple rows at once with a block selection.

## Behavior

- ⌘⇧F toggles the `mark` (highlight) attribute over the full text of each selected row.
- Smart toggle: if every selected row is already flagged, they all unflag; otherwise they all flag.
- Only the selected rows are affected — child rows are left alone.
- A single toggle is one undo step.

## Install

```bash
cp -r out/extensions/row-flag.bkext/ \
  ~/Library/Containers/com.hogbaysoftware.Bike/Data/Library/Application\ Support/Bike/Extensions/row-flag.bkext/
```

Then reload extensions in Bike (or restart it).

## Development

```bash
npm install
touch node_modules/@bike-outliner/extension-kit/api/core/globals.d.ts  # recreate missing stub
npm run build
npm test        # run unit tests (Bike must be closed)
```

The build system is [`bike-ext`](https://github.com/bike-outliner/extension-kit).

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

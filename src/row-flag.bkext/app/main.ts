import { AppExtensionContext, CommandContext } from 'bike/app'
import { shouldUnmark } from './util'

const MARK = 'mark'

export async function activate(context: AppExtensionContext) {
  bike.commands.addCommands({
    commands: {
      'flag:toggle-row': toggleRowFlag,
    },
  })

  for (const keymap of ['text-mode', 'block-mode'] as const) {
    bike.keybindings.addKeybindings({
      keymap,
      keybindings: {
        'cmd-shift-f': 'flag:toggle-row',
      },
    })
  }
}

function toggleRowFlag(context: CommandContext): boolean {
  const editor = context.editor
  const selectionRows = context.selection?.rows
  if (!editor || !selectionRows || selectionRows.length === 0) return false

  // Only rows with text can be marked.
  const rows = selectionRows.filter((row) => row.text.count > 0)
  if (rows.length === 0) return false

  const states = rows.map((row) => row.text.attributeAt(MARK, 0) !== undefined)
  const unmark = shouldUnmark(states)

  editor.transaction('default', () => {
    for (const row of rows) {
      const text = row.text
      const range: [number, number] = [0, text.count]
      if (unmark) {
        text.removeAttribute(MARK, range)
      } else {
        text.addAttribute(MARK, '', range)
      }
      // Reassign to commit the mutated AttributedString back to the row.
      row.text = text
    }
  })

  return true
}

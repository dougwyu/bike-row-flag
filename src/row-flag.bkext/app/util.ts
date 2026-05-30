/**
 * Decide the toggle direction for the row-flag command.
 *
 * @param markedStates - The current marked-state of each actionable row.
 * @returns `true` if all rows are already marked (so the action should
 *   remove marks); `false` otherwise (so the action should add marks).
 *   Returns `false` for an empty array.
 */
export function shouldUnmark(markedStates: boolean[]): boolean {
  return markedStates.length > 0 && markedStates.every((marked) => marked)
}

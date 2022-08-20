export const
  getRowIndex = (itemIdx: number, itemsPerRow: number): number =>
    Math.round((itemIdx - (itemIdx % itemsPerRow)) / itemsPerRow),

  getColumnIndex = (itemIdx: number, itemsPerRow: number): number =>
    itemIdx % itemsPerRow
;

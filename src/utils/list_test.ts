import {getColumnIndex, getRowIndex} from "./list";

type Index = number;
type ItemsPerRow = number;

describe ('#getRowIndex', () => {
  (<[Index, ItemsPerRow, Index][]>[
    [0, 5, 0],
    [24, 5, 4],
    [1, 5, 0],
    [23, 5, 4],
    [12, 5, 2],
  ]).forEach(([itemIdx, itemsPerRow, expectedRowIndex]) => {
    it(`getRowIndex(${itemIdx}, ${itemsPerRow}) === ${expectedRowIndex}`, function () {
      const rslt = getRowIndex(itemIdx, itemsPerRow);
      expect(rslt).toEqual(expectedRowIndex);
    });
  });
});

describe('#getColumnIndex', () => {
  (<[Index, ItemsPerRow, Index][]>[
    [0, 5, 0],
    [24, 5, 4],
    [1, 5, 1],
    [23, 5, 3],
    [12, 5, 2],
  ]).forEach(([itemIdx, itemsPerRow, expectedRowIndex]) => {
    it(`getColumnIndex(${itemIdx}, ${itemsPerRow}) === ${expectedRowIndex}`, function () {
      const rslt = getColumnIndex(itemIdx, itemsPerRow);
      expect(rslt).toEqual(expectedRowIndex);
    });
  });
});

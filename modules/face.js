export default class Face {
  constructor(color) {
    this.items = [
      [color, color, color],
      [color, color, color],
      [color, color, color],
    ];
  }

  // clockwise: dir = 1
  // anti-clockwise: dir = -1
  rotate(dir) {
    let oldItems = [[...this.items[0]], [...this.items[1]], [...this.items[2]]];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.items[i][j] = dir == 1 ? oldItems[2 - j][i] : oldItems[j][2 - i];
      }
    }
  }

  getRow(rowIndex) {
    return [...this.items[rowIndex]];
  }

  getColumn(columnIndex) {
    return [
      this.items[0][columnIndex],
      this.items[1][columnIndex],
      this.items[2][columnIndex],
    ];
  }

  setRow(rowIndex, newRow) {
    this.items[rowIndex] = [...newRow];
  }

  setColumn(columnIndex, newColumn) {
    [
      this.items[0][columnIndex],
      this.items[1][columnIndex],
      this.items[2][columnIndex],
    ] = [...newColumn];
  }
}
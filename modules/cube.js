import Face from "./face.js";

export class Cube {
  constructor() {
    this.faces = {
      front: new Face("green"),
      right: new Face("red"),
      up: new Face("white"),
      back: new Face("blue"),
      left: new Face("orange"),
      down: new Face("yellow"),
    };
  }

  reset() {
    this.faces = {
      front: new Face("green"),
      right: new Face("red"),
      up: new Face("white"),
      back: new Face("blue"),
      left: new Face("orange"),
      down: new Face("yellow"),
    };
  }

  // clockwise: dir = 1
  // anti-clockwise: dir = -1;
  rotateFace(face, dir) {
    this.faces[face].rotate(dir);
    this.updateNeighbours(face, dir);
  }

  updateNeighbours(face, dir) {
    let facesCopy = _.cloneDeep(this.faces);
    let invert = dir === -1;

    switch (face) {
      case "front":
        this.setRowToColumn(facesCopy, "down", 0, "right", 0, invert, true);
        this.setColumnToRow(facesCopy, "right", 0, "up", 2, invert);
        this.setRowToColumn(facesCopy, "up", 2, "left", 2, invert);
        this.setColumnToRow(facesCopy, "left", 2, "down", 0, invert);
        break;
      case "right":
        this.setColumnToColumn(facesCopy, "down", 2, "back", 0, invert, true);
        this.setColumnToColumn(facesCopy, "back", 0, "up", 2, invert, true);
        this.setColumnToColumn(facesCopy, "up", 2, "front", 2, invert);
        this.setColumnToColumn(facesCopy, "front", 2, "down", 2, invert);
        break;
      case "up":
        this.setRowToRow(facesCopy, "left", 0, "front", 0, invert);
        this.setRowToRow(facesCopy, "front", 0, "right", 0, invert);
        this.setRowToRow(facesCopy, "right", 0, "back", 0, invert);
        this.setRowToRow(facesCopy, "back", 0, "left", 0, invert);
        break;
      case "back":
        this.setColumnToRow(facesCopy, "left", 0, "up", 0, invert, true);
        this.setRowToColumn(facesCopy, "up", 0, "right", 2, invert);
        this.setColumnToRow(facesCopy, "right", 2, "down", 2, invert, true);
        this.setRowToColumn(facesCopy, "down", 2, "left", 0, invert);
        break;
      case "left":
        this.setColumnToColumn(facesCopy, "front", 0, "up", 0, invert);
        this.setColumnToColumn(facesCopy, "up", 0, "back", 2, invert, true);
        this.setColumnToColumn(facesCopy, "back", 2, "down", 0, invert, true);
        this.setColumnToColumn(facesCopy, "down", 0, "front", 0, invert);
        break;
      case "down":
        this.setRowToRow(facesCopy, "left", 2, "back", 2, invert);
        this.setRowToRow(facesCopy, "back", 2, "right", 2, invert);
        this.setRowToRow(facesCopy, "right", 2, "front", 2, invert);
        this.setRowToRow(facesCopy, "front", 2, "left", 2, invert);
        break;
    }
  }

  setRowToColumn(
    facesCopy,
    face1,
    row,
    face2,
    col,
    invert = false,
    reverseColumn = false
  ) {
    let newRow = invert
      ? facesCopy[face1].getRow(row)
      : facesCopy[face2].getColumn(col);

    if (reverseColumn) newRow.reverse();

    if (!invert) {
      this.faces[face1].setRow(row, newRow);
    } else {
      this.faces[face2].setColumn(col, newRow);
    }
  }

  setColumnToRow(
    facesCopy,
    face1,
    col,
    face2,
    row,
    invert = false,
    reverseRow = false
  ) {
    let newColumn = invert
      ? facesCopy[face1].getColumn(col)
      : facesCopy[face2].getRow(row);

    if (reverseRow) newColumn.reverse();

    if (!invert) {
      this.faces[face1].setColumn(col, newColumn);
    } else {
      this.faces[face2].setRow(row, newColumn);
    }
  }

  setRowToRow(
    facesCopy,
    face1,
    row1,
    face2,
    row2,
    invert = false,
    reverseRow = false
  ) {
    let newRow = invert
      ? facesCopy[face1].getRow(row1)
      : facesCopy[face2].getRow(row2);

    if (reverseRow) newRow.reverse();

    if (!invert) {
      this.faces[face1].setRow(row1, newRow);
    } else {
      this.faces[face2].setRow(row2, newRow);
    }
  }

  setColumnToColumn(
    facesCopy,
    face1,
    col1,
    face2,
    col2,
    invert = false,
    reverseColumn = false
  ) {
    let newColumn = invert
      ? facesCopy[face1].getColumn(col1)
      : facesCopy[face2].getColumn(col2);

    if (reverseColumn) newColumn.reverse();

    if (!invert) {
      this.faces[face1].setColumn(col1, newColumn);
    } else {
      this.faces[face2].setColumn(col2, newColumn);
    }
  }
}

export function drawCube(cube, faceElementsObj) {
  for (let face in faceElementsObj) {
    let faceElement = faceElementsObj[face];
    let faceItems = cube.faces[face].items.flat();

    for (let i = 0; i < 9; i++) {
      faceElement.children[i].style.backgroundColor = faceItems[i];
    }
  }
}

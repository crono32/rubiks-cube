"use strict";
import { Cube, drawCube } from "./modules/cube.js";

let faceElements = {
  front: document.querySelector(".front"),
  up: document.querySelector(".up"),
  down: document.querySelector(".down"),
  left: document.querySelector(".left"),
  right: document.querySelector(".right"),
  back: document.querySelector(".back"),
};
const rotateButtons = document.querySelector(".rotate-buttons").children;
const resetButton = document.querySelector("#reset");

let cube = new Cube();
drawCube(cube, faceElements);

for (const button of rotateButtons) {
  let [face, dir] = button.id.split("_");
  dir = Number(dir);

  button.addEventListener("click", () => {
    cube.rotateFace(face, dir);
    drawCube(cube, faceElements);
  });
}

resetButton.addEventListener("click", () => {
  cube.reset();
  drawCube(cube, faceElements);
});

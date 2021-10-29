import useKeypress from "react-use-keypress";

const width = 28;
const pacDot = document.getElementById("pac-dot");

function swapPosition(setPacman, oldPosition, newPosition) {
  //grabbing divs for old and new positions
  const squareAtOldPosition = document.getElementById(oldPosition);
  const squareAtNewPosition = document.getElementById(newPosition);

  //remove pacman class and add to new position
  squareAtOldPosition.classList.remove("pac-man");
  squareAtNewPosition.classList.add("pac-man");

  //save new position to state
  setPacman(newPosition);
}

export function moveLeft(setPacman, pacman) {
  if (
    pacman % width !== 0 &&
    !document.getElementById(pacman - 1).classList.contains("wall")
  ) {
    //setting the old and new positions
    const oldPosition = pacman;
    const newPosition = pacman - 1 === 364 ? 390 : pacman - 1;

    swapPosition(setPacman, oldPosition, newPosition);
  }
}

export function moveRight(setPacman, pacman) {
  if (
    pacman % width < width - 1 &&
    !document.getElementById(pacman + 1).classList.contains("wall")
  ) {
    //setting the old and new positions
    const oldPosition = pacman;
    const newPosition = pacman + 1 === 390 ? 365 : pacman + 1;

    swapPosition(setPacman, oldPosition, newPosition);
  }
}

export function moveUp(setPacman, pacman) {
  if (
    pacman - width >= 0 &&
    !document.getElementById(pacman - width).classList.contains("wall")
  ) {
    //setting the old and new positions
    const oldPosition = pacman;
    const newPosition = pacman - width;

    swapPosition(setPacman, oldPosition, newPosition);
  }
}

export function moveDown(setPacman, pacman) {
  if (
    pacman + width < width * width &&
    !document.getElementById(pacman + width).classList.contains("wall") &&
    !document.getElementById(pacman + width).classList.contains("ghost-lair")
  ) {
    //setting the old and new positions
    const oldPosition = pacman;
    const newPosition = pacman + width;

    swapPosition(setPacman, oldPosition, newPosition);
  }
}

// what happens when pac-man eats a pac-dot
export function pacDotEaten(pacman, score, setScore) {
  const squareHoldingPacman = document.getElementById(pacman);
  const currentScore = score;

  if (squareHoldingPacman.classList.contains("pac-dot")) {
    setScore(currentScore + 1);

    squareHoldingPacman.classList.remove("pac-dot");
  }
}

//what happens when you eat a power-pellet
export function powerPelletEaten(pacman, score, setScore) {
  const squareHoldingPacman = document.getElementById(pacman);
  const currentScore = score;

  if (squareHoldingPacman.classList.contains("power-pellet")) {
    setScore(currentScore + 10);

    squareHoldingPacman.classList.remove("power-pellet");
    return true;
  }
  return false;
}

export function ghostCollision(pacman, ghosts, score, setScore) {
  const squareHoldingPacman = document.getElementById(pacman);
  const matchingGhost = ghosts.find((ghost) =>
    squareHoldingPacman.classList.contains(ghost.className)
  );
  const currentScore = score;
  //    if the ghost is scared and pacman runs into it
  if (matchingGhost && matchingGhost.isScared) {
    squareHoldingPacman.classList.remove(
      "ghost",
      "scared-ghost",
      matchingGhost.className
    );
    matchingGhost.resetGhostPosition();
    setScore(currentScore + 100);
  } else if (matchingGhost && !matchingGhost.isScared) {
    return true;
  }
}

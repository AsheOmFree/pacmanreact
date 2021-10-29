import React from "react";
import "./pacman.css";
import Ghost from "./ghosts";
import useKeyPress from "react-use-keypress";
import {
  ghostCollision,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  pacDotEaten,
  powerPelletEaten,
} from "./MovePacman";

//layout of grid and what is in the squares
const layout = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0,
  1, 1, 1, 1, 0, 1, 1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 1, 3, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
  4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4,
  4, 4, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4,
  4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1,
  1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
  0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1,
];

const width = 28;

// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty

function createGhosts() {
  const ghosts = [
    new Ghost("blinky", 348, 250),
    new Ghost("pinky", 376, 400),
    new Ghost("inky", 351, 300),
    new Ghost("clyde", 379, 500),
  ];
  return ghosts;
}
const GAME_STATUS = { NOT_STARTED: 0, STARTED: 1, GAME_OVER: 2 };

const PacmanBoard = () => {
  const [ghosts, setGhosts] = React.useState([]);
  const [pacman, setPacman] = React.useState(490);
  const [score, setScore] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState(GAME_STATUS.NOT_STARTED);
  const [allGhostPositions, setAllGhostPositions] = React.useState();

  // Run this when component loads
  React.useEffect(() => {
    const ghosts = createGhosts();
    setGhosts(ghosts);
    ghosts.forEach((ghost) => {
      document
        .getElementById(ghost.currentIndex)
        .classList.add(ghost.className);
      document.getElementById(ghost.currentIndex).classList.add("ghost");
      startGhostMovement(ghost);
    });

    const square = document.getElementById(pacman);
    square.classList.add("pac-man");
  }, []);

  //Every time pacman's position changes, run this function
  React.useEffect(() => {
    pacDotEaten(pacman, score, setScore);

    const isEaten = powerPelletEaten(pacman, score, setScore);
    if (isEaten) {
      ghosts.forEach((ghost) => {
        ghost.ghostScared(true);
      });
    }
    const isGameOver = ghostCollision(pacman, ghosts, score, setScore);
    if (isGameOver) {
      setGameStatus(GAME_STATUS.GAME_OVER);
    }
  }, [pacman, allGhostPositions]);

  React.useEffect(() => {
    if (gameStatus == GAME_STATUS.GAME_OVER) {
      alert("YOU LOSE!");
    }
  }, [gameStatus]);

  //move ghosts according to their speed
  function startGhostMovement(ghost) {
    const timerId = setInterval(function () {
      ghost.moveGhost(setAllGhostPositions);
    }, ghost.speed);
  }

  useKeyPress(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"], (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft(setPacman, pacman);
    } else if (event.key === "ArrowRight") {
      moveRight(setPacman, pacman);
    } else if (event.key === "ArrowUp") {
      moveUp(setPacman, pacman);
    } else if (event.key === "ArrowDown") {
      moveDown(setPacman, pacman);
    }
  });

  // // pac-dots/power pellets eaten
  // pacDotEaten();

  function createBoard() {
    const squares = [];

    for (let i = 0; i < layout.length; i++) {
      let squareClass;

      //add layout to the board
      if (layout[i] === 0) {
        squareClass = "pac-dot grid-square";
      } else if (layout[i] === 1) {
        squareClass = "wall grid-square";
      } else if (layout[i] === 2) {
        squareClass = "ghost-lair grid-square";
      } else if (layout[i] === 3) {
        squareClass = "power-pellet grid-square";
      }

      squares.push(<div className={squareClass} id={i}></div>);
    }
    return squares;
  }

  return (
    <div id="container">
      <div id="banner">
        <div>
          <h3>Pac-Man</h3>
        </div>
        <div>{score}</div>
      </div>
      <div id="game-container">
        <div className="grid"> {createBoard()}</div>
      </div>
    </div>
  );
};

export default PacmanBoard;

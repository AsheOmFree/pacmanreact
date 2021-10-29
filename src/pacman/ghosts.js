// //create our Ghost template
export default class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.timerId = NaN;
    this.isScared = false;
  }
  //   if the next square your ghost is going to go in does NOT contain a wall and a ghost, you can go there
  moveGhost(setAllGhostPositions) {
    const width = 28;
    const directions = [-1, +1, width, -width];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    if (
      !document
        .getElementById(this.currentIndex + direction)
        .classList.contains("wall") &&
      !document
        .getElementById(this.currentIndex + direction)
        .classList.contains("ghost")
    ) {
      //you can go here
      //remove all ghost related classes
      document
        .getElementById(this.currentIndex)
        .classList.remove(this.className, "ghost", "scared-ghost");
      //change the currentIndex to the new safe square
      this.currentIndex += direction;
      //redraw the ghost in the new safe space
      const scaredClassString = this.isScared ? "scared-ghost" : "never-scared";
      document
        .getElementById(this.currentIndex)
        .classList.add(this.className, "ghost", scaredClassString);
    } else
      direction = directions[Math.floor(Math.random() * directions.length)];

    const allGhosts = document.querySelectorAll(".ghost");
    const ghostPositions = [...allGhosts]
      .map((ghost) => {
        return ghost.id;
      })
      .join(",");
    setAllGhostPositions(ghostPositions);
  }

  ghostScared(isScared) {
    this.isScared = isScared;
    if (isScared) {
      document.getElementById(this.currentIndex).classList.add("scared-ghost");
    } else {
      document
        .getElementById(this.currentIndex)
        .classList.remove("scared-ghost");
    }
    setTimeout(() => {
      if (isScared) {
        this.isScared = false;
      }
    }, 10000);
  }

  resetGhostPosition() {
    this.currentIndex = this.startIndex;
    document.getElementById(this.startIndex).classList.add("ghost");
  }
}

class Bishop extends Piece {
  canMove(x, y) {
    return false;
  }

  canTake() {
    return false;
  }

  move(x, y) {
    this.hasMoved = true;
    return false;
  }
}
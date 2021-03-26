class Pawn extends Piece {
  /**
   * @argument x position pawn wants to go to
   * @argument y position pawn wants to go to
   * @returns if pawn can take something
   */
  canMove(x, y) {
    return false;
  }

  /**
   * @returns if pawn can take
   */
  canTake() {
    return false;
  }

  move(x, y) {
    return false;
  }
}
class Knight extends Piece {
  /**
   * @argument x position pawn wants to go to
   * @argument y position pawn wants to go to
   * @returns if pawn can take something
   */
  canMove(x, y) {

    if (this.side == "w") {
      // rules for white
      if (this.hasMoved) {

        return false;
        // check if square is occupied

      }
    
    } else {
      // rules for black
      return false;

    }

    return false;
  }

  /**
   * @returns if pawn can take
   */
  canTake() {
    return false;
  }


  /**
  * @argument x position pawn wants to go to
  * @argument y position pawn wants to go to
  * @returns if pawn can take something
  */
  move(x, y) {
    this.hasMoved = true;
    return false;
  }
}
import Piece from './Piece';

class Pawn extends Piece {
  /**
   * @argument x position pawn wants to go to
   * @argument y position pawn wants to go to
   * @returns if pawn can take something
   */
  canMove(x, y) {
    return x, y;
  }

  /**
   * @returns if pawn can take
   */
  canTake() {
    return false;
  }

  move(x, y) {
    return x, y;
  }
}

export default Pawn;
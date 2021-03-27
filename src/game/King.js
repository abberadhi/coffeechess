import Piece from './Piece'

class King extends Piece {
  canMove(x, y) {
    return x, y;
  }

  canTake() {
    return false;
  }

  move(x, y) {
    return x, y;
  }
}

export default King;
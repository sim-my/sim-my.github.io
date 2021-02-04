import Element from '../../../../core/js/classes/element.js';

export default class GoalPost extends Element {
  constructor(canvas, context, image, x, y, width, height) {
    super(canvas, context, image, x, y, width, height);
  }

  update() {
    this.draw();
  }
}

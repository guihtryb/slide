export default class Slide {
  constructor(_slide, _wrapper) {
    this.slide = document.querySelector(_slide);
    this.wrapper = document.querySelector(_wrapper);
    this.distances = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    }
  }

  moveSlide(distX) {
    this.distances.movedPosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`
  }

  updatePosition(clientX) {
    this.distances.movement = (this.distances.startX - clientX) * 1.6;
    return this.distances.finalPosition - this.distances.movement;
  }

  onMove(event) {
    const finalPosition = this.updatePosition(event.clientX);
    this.moveSlide(finalPosition);
  }

  onStart(event) {
    event.preventDefault();

    this.distances.startX = event.clientX;

    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.distances.finalPosition = this.distances.movedPosition;
  }

  addSlideEvent() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.addSlideEvent = this.addSlideEvent.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onMove.bind(this);
  }

  init() {
    this.bindEvents();
    if (this.slide && this.wrapper) {
      this.addSlideEvent();
    }
    return this;
  }
}
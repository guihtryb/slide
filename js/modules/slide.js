export default class Slide {
  constructor(_slide, _wrapper) {
    this.slide = document.querySelector(_slide);
    this.wrapper = document.querySelector(_wrapper);
  }

  onMove(event) { }

  onStart(event) {
    event.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove)
  }

  addSlideEvent() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  bindEvents() {
    this.addSlideEvent = this.addSlideEvent.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onMove = this.onStart.bind(this);
  }

  init() {
    this.bindEvents();
    if (this.slide && this.wrapper) {
      this.addSlideEvent();
    }
    return this;
  }
}
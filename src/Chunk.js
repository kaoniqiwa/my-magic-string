export default class Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.content = content;

    this.intro = '';
    this.outro = '';

    if (DEBUG) {
    } else {
      this.previous = null;
      this.next = null;
    }
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
}

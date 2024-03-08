import Chunk from './Chunk.js';
import Stats from './utils/Stats.js';

export default class MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);

    /**class 中的属性默认描述符都为 true */
    Object.defineProperties(this, {
      original: {
        writable: true,
        value: string,
      },
      intro: {
        writable: true,
        value: '',
      },
      outro: {
        writable: true,
        value: '',
      },
      firstChunk: {
        writable: true,
        value: chunk,
      },
      lastSearchedChunk: {
        writable: true,
        value: chunk,
      },
      byStart: {
        writable: true,
        value: {},
      },
      byEnd: {
        writable: true,
        value: {},
      },
    });

    if (DEBUG) {
      Object.defineProperty(this, 'stats', {
        value: new Stats(),
      });
    }
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  toString() {
    let str = this.intro;

    let chunk = this.firstChunk;

    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }

    return str + this.outro;
  }
  append(content) {
    if (typeof content !== 'string')
      throw new TypeError('outro content must be a string');
    this.outro += content;

    return this;
  }
  update(start, end, content, options) {
    if (typeof content != 'string')
      throw new TypeError('replacement content must be a string');
    if (start < 0) start += this.original.length;
    if (end < 0) end += this.original.length;
    if (end > this.original.length) throw new Error('end is out of bounds');
    if (start == end)
      throw new Error(
        'Cannot overwrite a zero-length range – use appendLeft or prependRight instead'
      );
    if (DEBUG) this.stats.time('overwrite');

    this._split(start);
    this._split(end);
  }
  prepend(content) {
    if (typeof content !== 'string')
      throw new TypeError('outro content must be a string');
    this.intro = content + this.intro;
    return this;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index]) return;
    if (DEBUG) this.stats.time('_split');
    let chunk = this.lastSearchedChunk;
    const searchForward = index > chunk.end;

    while (chunk) {
      if (chunk.contains(index)) return this._splitChunk(chunk, index);

      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
    }
  }
  _splitChunk(chunk, index) {}
}

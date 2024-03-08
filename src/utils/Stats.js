export default class Stats {
  constructor() {
    Object.defineProperties(this, {
      startTimes: {
        value: {},
      },
    });
  }
  time(label) {
    /**返回进程启动至今的[seconds,nanoseconds] */
    this.startTimes[label] = process.hrtime();
  }
  timeEnd(label) {
    /**若有参数，必须为[number,number] */
    const ellapsed = process.hrtime(this.startTimes[label]);
    if (!this.label) this.label = 0;

    /**转为 milliseconds */
    this.label = ellapsed[0] * 1e3 + ellapsed[1] * 1e-6;
  }
}

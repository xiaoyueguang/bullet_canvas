const rand = max => Math.random() * max;

const now = () => new Date().getTime();

class Text {
  constructor ({
    text,
    speed = 1,
    time,
    top,
    color,
    size,
    zIndex
  }) {
    this.text = text;
    this.speed = speed;
    this.time = time;
    this.top = top;
    this.color = color;
    this.size = size;
    this.zIndex = zIndex;
  }

  getLeft (time, scale) {
    return time * scale
  }
}

var stats = new Stats();
document.body.appendChild(stats.domElement);

class Bullet$1 {
  constructor ({el, width, height, speed, seconds = 4000, maxTime = 50000}) {
    this.el = el;
    this.width = width;
    this.height = height;
    this.speed = speed;

    this.seconds = seconds;
    this.maxTime = maxTime;

    this.beforeTime = now();

    this.texts = [];
    this.time = 0;
    this.x = 400;
    this.createStage();
    this.render();

  }

  createStage () {
    const stage = document.createElement('canvas');
    stage.width = this.width;
    stage.height = this.height;

    this.stage = stage;
    this.ctx = stage.getContext('2d');

    this.curtainEl = document.createElement('canvas');
    this.curtainEl.width = this.width * this.maxTime / this.seconds;
    this.curtainEl.height = this.height;
    this.curtain = this.curtainEl.getContext('2d');
    this.curtainRender();
    this.el.appendChild(stage);
  }

  curtainRender () {
    const ctx = this.curtain;
    ctx.font = '24px serif';
    ctx.textAlign = 'left';
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.fillStyle = 'green';
    this.texts.forEach(text => {
      const left = text.getLeft(text.time, this.width / this.seconds);
      ctx.fillText(text.text, ~~(left), text.top);
    });
  }

  render (time = 0) {
    // this.time = time
    // if (this.time > 1000) return false
    const {ctx} = this;
    ctx.font = '16px serif';
    ctx.textAlign = 'left';
    stats.begin();
    ctx.clearRect(0, 0, this.width, this.height);
    this.time = now() - this.beforeTime + this.time;

    requestAnimationFrame(this.render.bind(this));

    this.beforeTime = now();
    ctx.save();

    ctx.translate((-this.width / this.seconds * this.time) >> 0, 0);
    ctx.drawImage(this.curtainEl, this.width, 0);
    ctx.restore();
    ctx.fillText(this.time, 700, 400);
    stats.end();
  }

  addText ({text = '', time}) {
    this.texts.push(new Text({
      text,
      time: time || this.time,
      top: ~~rand(this.height)
      // speed,
    }));
  }

}

function observe (raw) {
  return new Proxy(raw, {
    get (target, key, receiver) {
      return target[key]
    },
    set (target, key, value, receiver) {
      target[key] = value;
      return value
    }
  })
}

window.ob = observe;

export default Bullet$1;

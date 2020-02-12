export default class Swipe {
  constructor(_options) {
    this.options = Swipe.mergeOptions(_options);
    this.selector = _options.selector;

    this.update = this.update.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);

    this.init();
    this.update(this.options.availableWidth);
  }

  static mergeOptions(userOptions) {
    const options = {
      // wrapper: null,
      // handler: null,
      mobile: 640,
      count: 0,
      availableWidth: 0,
      diff: 0,
      min: 0,
      duration: 200,
      touchingTpl: `
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
        -webkit-transform: translate3d(-{{val}}px, 0, 0);
        -ms-transform: translate3d(-{{val}}px, 0, 0);`,
      template: "-{{val}}",
      touching: false,
      posX: 0,
      dir: 0,
      x: null
      // goto: () => {},
      // onClick: () => {}
    };

    for (const name in userOptions) {
      options[name] = userOptions[name];
    }

    options.non_touchingTpl = `
      -webkit-transition-duration: ${options.duration}ms;
      transition-duration: ${options.duration}ms;
      -webkit-transform: translate3d(-{{val}}px, 0, 0);
      -ms-transform: translate3d(-{{val}}px, 0, 0);`;

    return options;
  }

  init() {
    const items = this.selector.querySelectorAll(".swipeable-item");
    this.options.count = items.length;
  }

  update(width) {
    this.options.availableWidth = width;
    this.selector.style.transform = "translate3d(0, 0, 0)";
    this.options.diff = 0;

    if (this.options.availableWidth > this.options.mobile) {
      this.detachEvents();
    } else {
      this.attachEvents();
    }
  }

  attachEvents() {
    this.selector.addEventListener("click", this.clickHandler);
    this.selector.addEventListener("mousemove", this.moveHandler);
    this.selector.addEventListener("mouseup", this.endHandler);
    this.selector.addEventListener("touchmove", this.moveHandler);
    this.selector.addEventListener("touchend", this.endHandler);
    console.log("attached");
  }
  detachEvents() {
    this.selector.removeEventListener("click", this.clickHandler);
    this.selector.removeEventListener("mousemove", this.moveHandler);
    this.selector.removeEventListener("mouseup", this.endHandler);
    this.selector.removeEventListener("touchmove", this.moveHandler);
    this.selector.removeEventListener("touchend", this.endHandler);
    console.log("detached");
  }

  clickHandler(e) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();

    window.goto(e.target.dataset.link);
    this.detachEvents();
  }

  moveHandler(e) {
    if (this.options.touching) {
      e.stopImmediatePropagation();
      e.stopPropagation();

      let _x = e.touches ? e.touches[0].pageX : e.pageX;
      let _diff = this.options.x - _x + this.options.posX;
      this.options.dir = _x > this.options.x ? 0 : 1;

      let offset = this.options.availableWidth * 0.1;
      let max =
        this.options.availableWidth * (this.options.count - 1) * 0.8 - offset;

      // Limit swipe for first item
      if (!this.options.dir && this.options.posX <= offset) {
        max = offset;
      }

      if (Math.abs(_diff) <= max && Math.abs(_diff) >= this.options.min) {
        let _value = -_diff;
        this.selector.style.cssText = this.options.touchingTpl.replace(
          this.options.template,
          _value
        );
        this.options.diff = _diff;
      }
    }
  }

  endHandler(e) {
    e && e.stopImmediatePropagation();
    e && e.stopPropagation();
    e && e.preventDefault();

    // detect click event
    if (this.options.diff == this.options.posX) {
      this.clickHandler(e);
      return;
    }

    let max = Math.floor(
      this.options.availableWidth * (this.options.count - 1) * 0.8 -
        this.options.availableWidth * 0.2
    );
    this.options.touching = false;
    this.options.x = null;
    // let swipe_threshold = 0.25;
    // let d_max = this.options.diff / max;

    // let swipe_threshold = 0.85;
    // let d_max = (diff / max);
    // let _target = Math.round(d_max);
    // if(Math.abs(_target - d_max) < swipe_threshold ){
    //   diff = _target * max;
    // }else{
    //   diff = (dir ? (_target - 1) : (_target + 1)) * max;
    // }
    // posX = diff;
    // activeIndicator = (diff / max);
    // for (let i = 0; i < items; i++) {
    //   let template = i < 0 ? '{{val}}' : '-{{val}}';
    //   let _value = (max * i) - posX;
    //   elems[i].style.cssText = non_touchingTpl.replace(template, _value).replace(template, _value);
    // }

    let leftOffset = this.options.availableWidth * 0.1;
    let rightOffset = Math.floor(
      this.options.availableWidth * (this.options.count - 1) * 0.8 -
        this.options.availableWidth * 0.1
    );
    // slide back for first item
    if (this.options.diff <= leftOffset) {
      this.options.diff = 0;
      this.selector.style.cssText = this.options.non_touchingTpl.replace(
        this.options.template,
        this.options.diff
      );
    }

    // slide back for last item
    if (this.options.diff >= max && this.options.diff <= rightOffset) {
      this.options.diff = max;
      this.selector.style.cssText = this.options.non_touchingTpl.replace(
        this.options.template,
        -this.options.diff
      );
    }
    this.options.posX = this.options.diff;

    this.detachEvents();
  }

  moveStart(e) {
    if (this.options.availableWidth < this.options.mobile) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      this.options.touching = true;
      this.options.x = e.touches ? e.touches[0].pageX : e.pageX;
      this.attachEvents();
    }
  }

  destroy() {
    console.log("destroy");
    this.detachEvents();
  }
}

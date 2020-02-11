export default class Swipe {
  constructor(_options) {
    this.options = Swipe.mergeOptions(_options);

    this.update = this.update.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);

    this.init();
  }

  static mergeOptions(userOptions) {
    const options = {
      wrapper: null,
      handler: null,
      mobile: 640,
      items: 0,
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
    const elems = this.options.wrapper.querySelectorAll(".swipeable-item");
    this.options.items = elems.length;
    this.update(this.options.availableWidth);
  }

  update(width) {
    this.options.availableWidth = width;
    this.options.wrapper.style.transform = "translate3d(0, 0, 0)";
    this.options.diff = 0;

    if (width > this.options.mobile) {
      this.detachEvents();
      return;
    }
    console.log("update ", this.options.availableWidth);
  }
  attachEvents() {
    // window.addEventListener("resize", this.update);
    console.log("attached");
    window.addEventListener("mousemove", this.moveHandler);
    window.addEventListener("mouseup", this.endHandler);
    window.addEventListener("touchmove", this.moveHandler);
    window.addEventListener("touchend", this.endHandler);
  }
  detachEvents() {
    // window.removeEventListener("resize", this.update);
    window.removeEventListener("mousemove", this.moveHandler);
    window.removeEventListener("mouseup", this.endHandler);
    window.removeEventListener("touchmove", this.moveHandler);
    window.removeEventListener("touchend", this.endHandler);
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
        this.options.availableWidth * (this.options.items - 1) * 0.8 - offset;

      if (!this.options.dir && this.options.posX <= offset) {
        // limit swipe for first item
        max = offset;
      }

      if (Math.abs(_diff) <= max && Math.abs(_diff) >= this.options.min) {
        let _value = -_diff;
        this.options.wrapper.style.cssText = this.options.touchingTpl.replace(
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

    let max = Math.floor(
      this.options.availableWidth * (this.options.items - 1) * 0.8 -
        this.options.availableWidth * 0.2
    );
    this.options.touching = false;
    this.options.x = null;
    // let swipe_threshold = 0.25;
    // let d_max = this.options.diff / max;

    if (this.options.diff <= 5) {
      console.log("click");
    }

    let leftOffset = this.options.availableWidth * 0.1;
    let rightOffset = Math.floor(
      this.options.availableWidth * (this.options.items - 1) * 0.8 -
        this.options.availableWidth * 0.1
    );
    // slide back for first item
    if (this.options.diff <= leftOffset) {
      this.options.diff = 0;
      let _value = this.options.diff;
      this.options.wrapper.style.cssText = this.options.non_touchingTpl.replace(
        this.options.template,
        _value
      );
    }

    // slide back for last item
    if (this.options.diff >= max && this.options.diff <= rightOffset) {
      this.options.diff = max;
      let _value = -this.options.diff;
      this.options.wrapper.style.cssText = this.options.non_touchingTpl.replace(
        this.options.template,
        _value
      );
    }
    this.options.posX = this.options.diff;

    this.detachEvents();
  }
  onMoveStart(e) {
    if (this.options.availableWidth > this.options.mobile) return;

    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    this.options.touching = true;
    this.options.x = e.touches ? e.touches[0].pageX : e.pageX;
    this.attachEvents();
  }

  destroy() {
    this.detachEvents();
    console.log("destroy");
  }
}

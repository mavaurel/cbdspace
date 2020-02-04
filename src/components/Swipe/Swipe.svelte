<script>
	import { onMount, onDestroy } from 'svelte';

  const transitionDuration = 200;

  const mobileWidth = 640;
  let windowWidth;

  let swipeWrapper;
  let swipeHandler;
  let elems;

  let items = 0;
  let availableWidth = 0;
  let diff = 0;	
  let min = 0;
  
  let touchingTpl = `
    -webkit-transition-duration: 0s;
    transition-duration: 0s;
    -webkit-transform: translate3d(-{{val}}px, 0, 0);
    -ms-transform: translate3d(-{{val}}px, 0, 0);`;
  let non_touchingTpl = `
    -webkit-transition-duration: ${transitionDuration}ms;
    transition-duration: ${transitionDuration}ms;
    -webkit-transform: translate3d(-{{val}}px, 0, 0);
    -ms-transform: translate3d(-{{val}}px, 0, 0);`;
  let template = '-{{val}}';
  let touching = false;
  let posX = 0;
  let dir = 0;
  let x;

  function update(){
    availableWidth = swipeWrapper.offsetWidth;
    swipeWrapper.style.transform = 'translate3d(0, 0, 0)';
    diff = 0;
  }

  function init(){  
    if (windowWidth > mobileWidth) return;
    elems = swipeWrapper.querySelectorAll('.swipeable-item');
    items = elems.length;
    update();
  }

  onMount(() => {
    init();
    window.addEventListener('resize', update);
  });

  onDestroy(()=>{
    window.removeEventListener('resize', update);
	})

  function moveHandler(e){
    if (touching) {
      e.stopImmediatePropagation();
      e.stopPropagation();

      let _x = e.touches ? e.touches[0].pageX : e.pageX;
      let _diff = (x - _x) + posX;
      let dir = _x > x ? 0 : 1;
     
      let offset = availableWidth * 0.1; 
      let max = availableWidth * (items - 1) * 0.8 - offset;
      if (!dir && posX <= offset) {  // limit swipe for first item    
        max = offset; 
      };

      if (Math.abs(_diff) <= max && Math.abs(_diff) >= min) {
        let _value = -_diff;
        swipeWrapper.style.cssText = touchingTpl.replace(template, _value);
        diff = _diff;
      }
    }
  }

  function endHandler(e) {
    e && e.stopImmediatePropagation();
    e && e.stopPropagation();
    e && e.preventDefault();
    let max = availableWidth * (items - 1) * 0.8 - availableWidth * 0.18;
    touching = false;
    x = null;
    let swipe_threshold = 0.25;
    let d_max = (diff / max);

    let leftOffset = availableWidth * 0.1;
    let rightOffset = availableWidth * (items - 1) * 0.8 - availableWidth * 0.1;

    // slide back for first item 
    if (diff <= leftOffset) {
      diff = 0;
      let _value = diff;
      swipeWrapper.style.cssText = non_touchingTpl.replace(template, _value);    
    }

    // slide back for last item
    if (diff >= max && diff <= rightOffset) {
      diff = max;
      let _value = -diff;
      swipeWrapper.style.cssText = non_touchingTpl.replace(template, _value);    
    }

    posX = diff;
    window.removeEventListener('mousemove', moveHandler);
    window.removeEventListener('mouseup', endHandler);
    window.removeEventListener('touchmove', moveHandler);
    window.removeEventListener('touchend', endHandler);
  }
	
	function moveStart(e){  
    if (windowWidth > mobileWidth) return;

    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    touching = true;
    x = e.touches ? e.touches[0].pageX : e.pageX;
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', endHandler);
  }
	 
</script>
<!-- style="width:{wrapperWidth}px;" -->

<svelte:window bind:innerWidth={windowWidth}/>

<div class="swipe-panel">
  <div class="swipe-item-wrapper" bind:this={swipeWrapper}>
    <div class="swipeable-items">
      <slot />
    </div>
  </div>
	<div class="swipe-handler" bind:this={swipeHandler} on:touchstart={moveStart} on:mousedown={moveStart}></div>
</div>
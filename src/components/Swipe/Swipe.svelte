<script>
  import { onMount, onDestroy } from 'svelte';
  import Swipe from './swipe.js';

  let windowWidth;
  let swipe;
  let wrapper;
  let handler;

  onMount(() => {
    swipe = new Swipe({ 
      wrapper, 
      handler,
      availableWidth: windowWidth
    }); 

    return () => {
			swipe.destroy()
		}   
  });

  function resizeHandler(){
    swipe.update(windowWidth);
  }
	
	function moveStart(e){  
    swipe.onMoveStart(e);
  }
</script>

<svelte:window on:resize={resizeHandler} bind:innerWidth={windowWidth}/>

<div class="swipe-panel">
  <div class="swipe-item-wrapper" bind:this={wrapper}>
    <div class="swipeable-items">
      <slot />
    </div>
  </div>
	<div class="swipe-handler" bind:this={handler} on:touchstart={moveStart} on:mousedown={moveStart}></div>
</div>
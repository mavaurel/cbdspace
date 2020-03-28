<script>
  import { onMount, onDestroy } from 'svelte';
  import Swipe from './swipe.js';

  let windowWidth;
  let swipe;
  let selector;

  $: swipe && swipe.update(windowWidth);

  onMount(() => {
    swipe = new Swipe({ 
      selector,
      availableWidth: windowWidth
    }); 

    return () => {
			swipe.destroy()
		}   
  });

	function moveStart(e){  
    swipe.moveStart(e);
  }
</script>

<svelte:window bind:innerWidth={windowWidth}/>

<div class="swipe__wrapper">
  <div class="swipe-item-wrapper" bind:this={selector} on:touchstart={moveStart} on:mousedown={moveStart}>
    <div class="swipeable-items">
      <slot />
    </div>
  </div>
	<!-- <div class="swipe-handler" bind:this={handler} on:touchstart={moveStart} on:mousedown={moveStart}></div> -->
</div>
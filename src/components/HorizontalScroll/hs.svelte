<script>
  import { onMount } from 'svelte';
 
  const mobileView = 640;
  let windowWidth;
  let hs;
  let mx = 0;
  let mx2;

  onMount(() => {
    if (windowWidth > mobileView) return;

    addHandlers();

    return () => {
      removeHandlers();
    }
  });

  function addHandlers(){   
    hs.addEventListener("mousedown", startMoveHandler);
    hs.addEventListener("mousemove", moveHandler);    
    document.addEventListener("mouseup", endMoveHandler);
  }

  function removeHandlers(){
    hs.removeEventListener("mousedown", startMoveHandler);
    hs.removeEventListener("mousemove", moveHandler);
    document.removeEventListener("mouseup", endMoveHandler);
  }

  function moveHandler(e){
    mx2 = e.pageX - this.offsetLeft;      
    if (mx) this.scrollLeft = this.sx + mx - mx2;
  }

  function startMoveHandler(e){
    this.sx = this.scrollLeft;
    mx = e.pageX - this.offsetLeft;
  }

  function endMoveHandler(e){    
    e.preventDefault();
    e.stopPropagation();

    if (mx === mx2) {
      clickHandler(e);
    }
    mx = 0;
  }

  function clickHandler(e){
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();   
    window.goto(e.target.dataset.link);
  }
</script>

<svelte:window bind:innerWidth={windowWidth}/>

<div class="hs__wrapper">
  <ul class="hs" bind:this={hs}>
    <slot />
  </ul>	
</div>
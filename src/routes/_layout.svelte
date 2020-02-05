<script>
	import Nav from '../components/Nav.svelte';
  export let segment;
</script>

{#if segment !== "Basics"}
	<Nav {segment}/>
{/if}

<main>
	<slot></slot>
</main>
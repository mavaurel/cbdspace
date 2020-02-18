<script>
	import Nav from '../components/Nav.svelte';
	import { slide } from "svelte/transition";
	export let segment;
</script>

{#if segment === undefined}
  <div class="nav-transitioned" transition:slide>
		<Nav />
	</div>
{/if}

<main>
	<slot></slot>
</main>
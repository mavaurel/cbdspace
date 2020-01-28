<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		/* @apply relative bg-white py-8 max-w-4xl my-0; */
		@apply relative;
		box-sizing: border-box;
	}
</style>

<Nav/>

<main>
	<slot></slot>
</main>
<script context="module">
	export function preload({ params, query }) {
		return this.fetch(`index.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	export let posts;
	//import { Swipe, SwipeItem } from "../components/Swipe";

	let Swipe;
	let SwipeItem;
	
	onMount(async () => {
		const module = await import("../components/Swipe/module");
	  ({Swipe, SwipeItem} = module);
	});

//   const posts = [
// 	{
// 		title: "What is CBD? </br> Getting Started with Basics",
// 		category: "Basics",
// 		date: "23 January",
// 		slug:	"what-is-sapper",
// 		img: "images/what_is_cbd-dark.jpg"
// 	},
// 	{
// 		title: "Methods Of Using CBD </br> How Do I Take CBD?",
// 		category: "Basics",
// 		date: "23 January",
// 		slug:	"what-is-sapper",
// 		img: "images/what_is_cbd-light.jpg"
// 	},
// 	{
// 		title: "Full Spectrum vs Isolated CBD? </br> What's The Difference",
// 		category: "Basics",
// 		date: "23 January",
// 		slug:	"what-is-sapper",
// 		img: "images/what_is_cbd-dark.jpg"
// 	}
//  ];
</script>

<svelte:head>
	<title>CBD Space Blog</title>
</svelte:head>

<!-- Featured Posts -->
<section class="featured">
  <div class="container px-4 py-8">
	  <h2 class="title title-large text-white">Featured Posts</h2>
		<svelte:component this={Swipe}>
			{#each posts as post}
			  {#if post.featured}				
					<svelte:component this={SwipeItem}>
						<a class="featured-post" href="{post.category}/{post.slug}" rel=prefetch>
							<figure class="featured-image image overlay">
								<img src="{post.image}" alt="">
							</figure>
							<div class="featured-content">
								<div class="text-sm text-grey-light uppercase">{post.category}</div>
								<div class="title text-base sm:text-xl text-white">{@html post.title}</div>
								<div class="text-sm text-grey-light">
									{post.printDate} &middot; {post.printReadingTime}
								</div>
							</div>					
						</a>
					</svelte:component>
			  {/if}
			{/each}
		</svelte:component>
	</div>
</section>

<!-- Latest Posts -->
<section class="latest">
	<div class="container px-4 py-8">
		<h2 class="title title-large text-primary">Latest Posts</h2>
		<div class="posts">
		  {#each posts as post}
				<div class="flex-100 mb-6">
					<div class="flex">
					  <div class="flex-4 mr-4 max-w-1/4 self-center">
						  <a href="{post.category}/{post.slug}" rel=prefetch>
							  <figure class="image is-square">
                  <img src={post.image} alt="">
						    </figure>
							</a>						  
						</div>						
						<div class="flex flex-col justify-between sm:justify-start">
							<div class="text-sm text-grey-dark uppercase">{post.category}</div>
							<a href="{post.category}/{post.slug}" class="title text-black md:text-2xl" rel=prefetch>{@html post.title}</a>
							<div class="text-sm text-grey-dark">
								{post.printDate} &middot; {post.printReadingTime}
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
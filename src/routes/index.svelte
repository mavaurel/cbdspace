<style>
	/* h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	} */
</style>

<script>
  import { Swipe, SwipeItem } from "../components/Swipe";
 const posts = [
	{
		title: "What is CBD? </br> Getting Started with Basics",
		category: "Basics",
		date: "23 January",
		img: "images/what_is_cbd-dark.jpg"
	},
	{
		title: "Methods Of Using CBD </br> How Do I Take CBD?",
		category: "Basics",
		date: "23 January",
		img: "images/what_is_cbd-light.jpg"
	},
	{
		title: "Full Spectrum vs Isolated CBD? </br> What's The Difference",
		category: "Basics",
		date: "23 January",
		img: "images/what_is_cbd-dark.jpg"
	}
 ];
</script>

<svelte:head>
	<title>CBD Space Blog</title>
</svelte:head>

<!-- Featured Posts -->
<section class="featured">
  <div class="container px-4 py-8">
	  <h2 class="title title-large text-white">Featured Posts</h2>
		<Swipe>
			{#each posts as post}
				<SwipeItem>
					<a class="featured-post" href="/">
						<figure class="featured-image image">
							<img src={post.img} alt="">
						</figure>
						<div class="featured-content">
							<div class="meta uppercase">{post.category}</div>
							<div class="title text-xl text-white">{@html post.title}</div>
							<div class="meta">
								<span class="date">{post.date}</span>
								<span>&middot;</span>
								<span class="read">5 min</span>
							</div>
						</div>					
					</a>
				</SwipeItem>
			{/each}
		</Swipe>
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
						  <a href="/">
							  <figure class="image is-square">
                  <img src={post.img} alt="">
						    </figure>
							</a>						  
						</div>						
						<div class="flex flex-col justify-between sm:justify-start">
							<div class="text-sm text-grey-dark uppercase">{post.category}</div>
							<a href="/" class="title text-black md:text-2xl">{@html post.title}</a>
							<div class="text-sm text-grey-dark">
								{post.date} &middot; 12 min
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
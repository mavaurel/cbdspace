<script context="module">
	export function preload({ params, query }) {
		return this.fetch("index.json").then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script>

<script>
	import { onMount } from 'svelte';
	// import { Swipe, SwipeItem } from "../components/Swipe";
	import { HorizontalScroll, HorizontalScrollItem } from "../components/HorizontalScroll";
	export let posts;
  
	// Meta tags
	const URL = "https://cbdspace.io";
	const title = "CBD Space Blog"
	const description = "description";
	const keywords = "keywords";
	const image = "/images/";
</script>

<svelte:head>
	<title>{title}</title>
  <meta name="description" content={description}>
  <meta name="keywords" content={keywords}>
	<!-- Open Graph | Facebook-->
	<meta property="og:type" content="website">
	<meta property="og:title" content={title}>
	<meta property="og:url" content={URL}>
	<meta property="og:image" content={URL}{image}>
	<meta property="og:description" content={description}>
	<meta itemprop="name" content={title}>
	<meta itemprop="thumbnailUrl" content={URL}{image}>
	<meta itemproperty="description" content={description}>
	<!-- Twitter-->
	<meta property="twitter:card" content="summary">
	<meta property="twitter:url" content={URL}>
	<meta property="twitter:title" content={title}>
	<meta property="twitter:description" content={description}>
	<meta property="twitter:image" content={URL}{image}>
</svelte:head>

<!-- Featured Posts -->
<section class="featured">
  <div class="container px-4 py-8">
	  <h2 class="title title-large text-white">Featured Posts</h2>
		<HorizontalScroll>
			{#each posts.filter(p => p.featured) as post}
				<HorizontalScrollItem link="{post.slug}/">
					<a href="{post.slug}/" rel=prefetch class="w-full">
						<div class="hs__item__image__wrapper overlay">
							<img class="hs__item__image" src="{post.thumbnail}" alt="">
						</div>
						<div class="hs__item__description">
							<div class="title text-base sm:text-xl text-white">{@html post.title}</div>
							<div class="text-sm text-grey-light">
								{post.printDate} &middot; {post.printReadingTime}
							</div>
						</div>
					</a>
				</HorizontalScrollItem>
			{/each}
		</HorizontalScroll>
	</div>
</section>

<!-- Latest Posts -->
<section class="latest">
	<div class="container px-4 py-8">
		<h2 class="title title-large text-primary">Latest Posts</h2>		
		<div class="posts">
		  {#each posts.filter(p => !p.featured) as post}
					<div class="flex-100 mb-6" >
						<div class="flex">
							<div class="flex-4 mr-4 max-w-1/4 self-center">
								<a href="{post.slug}/" rel=prefetch>
									<figure class="image is-square">							
										<img src={post.thumbnail} alt="">
									</figure>
								</a>						  
							</div>						
							<div class="flex flex-2 flex-col">
								<!-- <div class="text-sm text-grey-dark uppercase">{post.category}</div> -->
								<a href="{post.slug}/" class="title text-black md:text-2xl" rel=prefetch>{@html post.title}</a>
								<div class="hidden lg:block my-4" >{@html post.snippet}</div>
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
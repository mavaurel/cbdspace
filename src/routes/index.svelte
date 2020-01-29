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
		title: "What is CBD? </br> Getting Started with Basics",
		category: "Basics",
		date: "23 January",
		img: "images/what_is_cbd-light.jpg"
	},
	{
		title: "What is CBD? </br> Getting Started with Basics",
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
<div class="featured">
  <div class="container px-4 py-8">
	  <h2 class="featured-title title">Featured Posts</h2>
		<Swipe>
			{#each posts as post}
				<SwipeItem>
					<a class="featured-post" href="/">
						<figure class="featured-image">
							<img src={post.img} alt="">
						</figure>
						<div class="featured-content">
							<div class="category">{post.category}</div>
							<div class="title text-xl text-white">{@html post.title}</div>
							<div class="meta">
								<span class="date">{post.date}</span>
								<span>&middot;</span>
								<span class="time">5 min</span>
							</div>
						</div>					
					</a>
				</SwipeItem>
			{/each}
		</Swipe>
		<!-- <div class="featured-carousel">	
			<div class="flex justify-between overflow-hidden">
				<div class="flex-100 sm:flex-2 lg:flex-1 px-2">
					<a class="featured-post" href="/">
						<figure class="featured-image">
							<img src="images/what_is_cbd-dark.jpg" alt="">
						</figure>
						<div class="featured-content">
							<div class="category">Basics</div>
							<div class="title text-xl text-white">What is CBD? <br/> Getting Started with Basics</div>
							<div class="meta">
								<span class="date">23 January</span>
								<span>&middot;</span>
								<span class="time">5 min</span>
							</div>
						</div>					
					</a>
				</div>
				<div class="flex-100 sm:flex-2 lg:flex-1 px-2">
					<a class="featured-post" href="/">
						<figure class="featured-image">
							<img src="images/what_is_cbd-light.jpg" alt="">
						</figure>
						<div class="featured-content">
							<div class="category">Basics</div>
							<div class="title text-xl text-white">What is CBD? <br/> Getting Started with Basics</div>
							<div class="meta">
								<span class="date">23 January</span>
								<span>&middot;</span>
								<span class="time">5 min</span>
							</div>
						</div>					
					</a>
				</div>
				<div class="flex-100 sm:flex-2 lg:flex-1 px-2">
					<a class="featured-post" href="/">
						<figure class="featured-image">
							<img src="images/what_is_cbd-dark.jpg" alt="">
						</figure>
						<div class="featured-content">
							<div class="category">Basics</div>
							<div class="title text-xl text-white">What is CBD? <br/> Getting Started with Basics</div>
							<div class="meta">
								<span class="date">23 January</span>
								<span>&middot;</span>
								<span class="time">5 min</span>
							</div>
						</div>					
					</a>
				</div>
			</div>	
		</div>	 -->
	</div>
</div>

<!-- Latest Posts -->
<div class="latest">
	<div class="container px-4 py-8">
		<h2 class="title text-primary">Latest Posts</h2>
		<div class="flex">
			<div class="post">
				<div class="image"></div>
				<div class="content">
					<div class="category">Basics</div>
					<div class="title text-black">Benefits and Side Effects of Using CBD</div>
					<div class="meta">
						<span class="date">20 January</span> 
						<span>&middot;</span>
						<span class="read">12 min</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
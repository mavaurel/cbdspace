<style>
.header {
  position: relative;
  background-position: center center;
  background-size: cover;
	background-repeat: no-repeat;	
	/* min-height: 35vh; */
	height: 35vh;
	min-height: 200px;
  /* 1:1 Aspect Ratio on sm screen ( < 640px )*/
  padding-bottom: 100%;
  @screen sm {
    padding-bottom: 0;
  }
}
.header-inner {
  position: absolute;
  bottom: 0;
  left: 0;
	width: 100%;
}
.content {
	position: relative;	
	z-index: 2;
	background-color:	#fff;
	border-radius: 20px 20px 0px 0px;
	margin-top: -1rem;	
	line-height: 1.9;
	@apply font-secondary;
	@screen sm {
		border-radius: unset;
  }
}
.content :global(h2) {
	@apply text-black text-2xl py-4 font-bold leading-normal;
}

.content :global(h3) {
	@apply text-black text-xl py-2 font-bold leading-normal;
}
.content :global(pre) {
	background-color: #f9f9f9;
	box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
	padding: 0.5em;
	border-radius: 2px;
	overflow-x: auto;
}
.content :global(pre) :global(code) {
	background-color: transparent;
	padding: 0;
}
.content :global(ul:not([class])) {
	line-height: 1.5;
	@apply list-inside list-disc py-4;
}
.content :global(li) {
	margin: 0 0 0.5em 0;
}
.content :global(a.inner) {
	@apply text-primary;
}

ul.breadcrumb {
	display: flex;
	@apply text-sm pb-6;
}

ul.breadcrumb li {
	display: inline-flex;
}

ul.breadcrumb li:not(:last-child):after {
	content: "/";
	@apply px-2;
}
ul.breadcrumb li:not(:last-child) a {
	@apply text-grey-light;
}
ul.breadcrumb li:last-child a {
	pointer-events: none;
}

.icon-close-position {
	position: absolute;
	top: 6px;
	right: 6px;
}
</style>

<script context="module">
	export async function preload({ params, query }) {
		const res = await this.fetch(`${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	// import { send, receive } from '../../helpers/crossfade.js';
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	export let post;
	const URL = "https://cbdspace.io";
	const postfix = " | CBD Space Blog";

	// Tooltip
	let desktop = 1380;
	let windowWidth;
	let tooltipAnchors;
	let tooltipText;
	let posTop;
	let posLeft;
	let isTooltip = false;
	// Tooltip animation
	let transitionIn;
	let duration = 200;

	$: if (windowWidth < desktop) {
		transitionIn = {y: 25, delay: duration, duration};
	} else {
		transitionIn = {x: 25, duration};
	}

	onMount(() => {
		tooltipAnchors = document.querySelectorAll(".tooltip__anchor");
		tooltipAnchors.forEach((el, idx) => el.addEventListener("click", (e) => showTooltip(e, idx)));

		return () => {
			tooltipAnchors.forEach(el => el.removeEventListener("click", showTooltip));
		}
	});

	function showTooltip(e,idx){
		tooltipText = post.tooltips.filter((item, itemIdx) => idx === itemIdx)[0].tip;
		
		if (windowWidth >= desktop) {
			posTop = e.target.getBoundingClientRect().top;
			posLeft = windowWidth/2 + 736/2; // 736 - container width
		}
		
		isTooltip = true;		
	}

	function hideTooltip(){
		isTooltip = false;
	}
</script>

<svelte:window on:scroll={hideTooltip} bind:innerWidth={windowWidth}/>

<svelte:head>
	<title>{post.title}</title>
  <meta name="description" content={post.seo.description}>
  <meta name="keywords" content={post.seo.keywords}>
	<!-- Open Graph | Facebook-->
	<meta property="og:title" content={post.title}>
	<meta property="og:type" content="article">
	<meta property="og:url" content="{URL}/{post.slug}/">
	<meta property="og:image" content="{URL}{post.image}">
	<meta property="og:description" content={post.seo.description}>
	<meta itemprop="name" content={post.title}>
	<meta itemprop="thumbnailUrl" content="{URL}{post.image}">
	<meta itemproperty="description" content={post.seo.description}>
	<!-- Twitter-->
	<meta property="twitter:card" content="summary">
	<meta property="twitter:url" content="{URL}/{post.slug}/">
	<meta property="twitter:title" content="{post.title}{postfix}">
	<meta property="twitter:description" content={post.seo.description}>
	<meta property="twitter:image" content="{URL}{post.image}">
</svelte:head>

<section class="header" style="background-image: 	linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 80%), url({post.image})">
	<div class="header-inner">
	  <div class="container px-4 pt-8 pb-12">
			<!-- <div class="text-sm font-bold text-primary uppercase">{post.category}</div> -->
			<h1 class="title text-4xl text-white" >{@html post.title}</h1>
			<div class="text-sm text-grey-light">
					{post.printDate} &middot; {post.printReadingTime}
			</div> 
		</div>
	</div> 
</section>

<section class="content">
  <div class="container lg:max-w-3xl px-4 py-8">
		<!-- Schema Breadcrumb -->
		<ul class="breadcrumb" itemscope itemtype="http://schema.org/BreadcrumbList">
			<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a href="{URL}" itemprop="item">
					<span itemprop="name">Home</span>
				</a>
				<meta itemprop="position" content="1">
			</li>
			<li itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
				<a href="{URL}/{post.slug}/" itemprop="item">
					<span itemprop="name">{post.title}</span>
				</a>
				<meta itemprop="position" content="2">
			</li>
		</ul>
	  <div class="post">
		  {@html post.html}
			<!-- References -->
		 	{#if post.references}
		 		<h2>References</h2> 
				<ul class="references">
				{#each post.references as ref, i}
					<li>
					  <span id="note_{i+1}">{i+1}.</span>					
						<a class="outer underline" target="_blank" rel="nofollow" href={ref.link}>{ref.name}</a>
						<a class="inner" href="{post.slug}#ref_{i+1}">&uarr;</a>
					</li>
				{/each}
				</ul>	
		 {/if}
		</div>	
	</div>
</section>

{#if isTooltip}
	<div class="tooltip__text" in:fly={transitionIn} out:fly={{duration}} style="top:{posTop}px; left:{posLeft}px">
		<i class="icon icon-close icon-close-position" on:click={hideTooltip}></i>
		{tooltipText}
	</div>
{/if}

{#if isTooltip && windowWidth < desktop}
	<div class="tooltip__overlay" in:fade={{duration}} out:fade={{delay: duration, duration: duration}} on:click={hideTooltip}>
	</div>
{/if}
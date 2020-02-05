<script context="module">
	export async function preload({ params, query }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`blog/${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	export let post;
</script>

<style>
.header {
  position: relative;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 30vh;
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
	@apply .font-secondary;
	@screen sm {
		border-radius: unset;
  }
}
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<section class="header" style="background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 50%), url({post.img})">
	<div class="header-inner">
	  <div class="container px-4 pt-8 pb-12">
			<div class="text-sm font-bold text-primary uppercase">{post.category}</div>
			<h1 class="title text-4xl text-white">{@html post.title}</h1>
			<div class="text-sm text-grey-light">
				{post.date} &middot; 12 min
			</div> 
		</div>
	</div> 
</section>

<section class="content">
  <div class="container px-4 py-8">
  	{@html post.html}
	</div>
</section>






<script>
	import Logo from './Logo.svelte';
</script>

<header>
	<nav>
		<a href="/"><Logo /></a>
		<span />
		<a id="about" href="/about">About</a>
	</nav>
</header>

<style>
	nav {
		display: grid;
		grid-template-columns: 1fr 99fr 1fr;
	}
	#about {
		justify-self: end;
		align-self: center;
		margin-inline-end: 1em;
	}
	span {
		width: auto;
	}
</style>

<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import '../lib/style.css';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

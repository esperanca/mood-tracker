<script>
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import BottomNav from '$lib/components/BottomNav.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Mood Tracker</title>
  <meta name="description" content="Rastreie seu humor com privacidade total. Dados 100% locais." />
  <meta name="theme-color" content="#f5f5f0" />
</svelte:head>

<main>
  {@render children()}
</main>

<BottomNav />

<style>
  main {
    min-height: 100vh;
    padding-bottom: 70px;
  }
</style>

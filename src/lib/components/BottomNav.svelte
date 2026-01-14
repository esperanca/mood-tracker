<script>
  import { page } from '$app/stores';

  const navItems = [
    { path: '/', label: 'Início', emoji: '🏠' },
    { path: '/meus-humores', label: 'Meus Humores', emoji: '📊' }
  ];
</script>

<nav class="bottom-nav">
  {#each navItems as item}
    <a
      href={item.path}
      class="nav-item"
      class:active={$page.url.pathname === item.path}
    >
      <span class="nav-emoji">{item.emoji}</span>
      <span class="nav-label">{item.label}</span>
    </a>
  {/each}
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-color);
    padding: 8px 0;
    padding-bottom: max(8px, env(safe-area-inset-bottom));
    z-index: 100;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 16px;
    min-width: 80px;
    min-height: 44px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .nav-item:hover {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .nav-item.active {
    color: var(--text-primary);
  }

  .nav-emoji {
    font-size: 1.5rem;
  }

  .nav-label {
    font-size: 0.75rem;
    font-weight: 500;
  }
</style>

<script>
  import { page } from '$app/stores';

  const navItems = [
    { path: '/', label: 'Registrar', icon: '+' },
    { path: '/meus-humores', label: 'Histórico', icon: '◐' }
  ];
</script>

<nav class="bottom-nav">
  <div class="nav-inner">
    {#each navItems as item}
      <a
        href={item.path}
        class="nav-item"
        class:active={$page.url.pathname === item.path}
      >
        <span class="nav-icon">{item.icon}</span>
        <span class="nav-label">{item.label}</span>
      </a>
    {/each}
  </div>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border-top: 1px solid var(--border-color);
    z-index: 100;
  }

  .nav-inner {
    max-width: 480px;
    margin: 0 auto;
    display: flex;
    padding: 8px 20px;
    padding-bottom: max(8px, env(safe-area-inset-bottom));
  }

  .nav-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 16px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.15s ease;
    border-radius: var(--radius-md);
  }

  .nav-item:hover {
    color: var(--text-secondary);
    text-decoration: none;
  }

  .nav-item.active {
    color: var(--text-primary);
    background: var(--bg-muted);
  }

  .nav-icon {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
  }

  .nav-label {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
</style>

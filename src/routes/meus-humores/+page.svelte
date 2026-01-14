<script>
  import { moodStore } from '$lib/stores/mood.js';
  import MoodCard from '$lib/components/MoodCard.svelte';
  import TrendChart from '$lib/components/TrendChart.svelte';
  import DistributionChart from '$lib/components/DistributionChart.svelte';

  let showClearConfirm = $state(false);

  let moods = $derived($moodStore);
  let recentMoods = $derived(moodStore.getRecentMoods(moods, 10));
  let weeklyMoods = $derived(moodStore.getWeeklyMoods(moods));
  let averageMood = $derived(moodStore.getAverageMood(weeklyMoods));
  let distribution = $derived(moodStore.getMoodDistribution(moods));
  let dailyAverages = $derived(moodStore.getDailyAverages(moods, 7));

  function handleExportJSON() {
    moodStore.exportJSON(moods);
  }

  function handleExportCSV() {
    moodStore.exportCSV(moods);
  }

  function handleClearAll() {
    moodStore.clearAll();
    showClearConfirm = false;
  }
</script>

<div class="container">
  <header class="page-header">
    <span class="label">ANALYTICS</span>
    <h1 class="title-lg">Meus Humores</h1>
  </header>

  {#if moods.length === 0}
    <div class="empty-state">
      <div class="empty-icon">◐</div>
      <h2 class="title-sm">Nenhum registro</h2>
      <p class="text-secondary text-center">
        Comece a registrar seus humores para ver estatísticas.
      </p>
      <a href="/" class="btn btn-primary mt-24">Registrar humor</a>
    </div>
  {:else}
    <div class="stats-row">
      <div class="stat-card">
        <span class="label">TOTAL</span>
        <div class="stat-value mono">{moods.length}</div>
      </div>
      <div class="stat-card">
        <span class="label">7 DIAS</span>
        <div class="stat-value mono">{weeklyMoods.length}</div>
      </div>
      <div class="stat-card">
        <span class="label">MÉDIA</span>
        <div class="stat-value mono">{averageMood > 0 ? averageMood.toFixed(1) : '—'}</div>
      </div>
    </div>

    <section class="section">
      <div class="section-header">
        <span class="label">TENDÊNCIA SEMANAL</span>
      </div>
      <div class="chart-card">
        <TrendChart data={dailyAverages} />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <span class="label">DISTRIBUIÇÃO</span>
      </div>
      <div class="chart-card">
        <DistributionChart {distribution} />
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <span class="label">HISTÓRICO</span>
        <span class="label text-muted">Últimos 10</span>
      </div>
      <div class="moods-list">
        {#each recentMoods as entry (entry.id)}
          <MoodCard {entry} />
        {/each}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <span class="label">EXPORTAR</span>
      </div>
      <div class="export-row">
        <button class="btn btn-secondary" onclick={handleExportJSON}>
          JSON
        </button>
        <button class="btn btn-secondary" onclick={handleExportCSV}>
          CSV
        </button>
      </div>
    </section>

    <section class="section danger-section">
      <div class="section-header">
        <span class="label">DADOS</span>
      </div>
      {#if showClearConfirm}
        <div class="confirm-box">
          <p class="confirm-text">Tem certeza? Esta ação não pode ser desfeita.</p>
          <div class="confirm-actions">
            <button class="btn btn-secondary" onclick={() => showClearConfirm = false}>
              Cancelar
            </button>
            <button class="btn btn-danger" onclick={handleClearAll}>
              Excluir tudo
            </button>
          </div>
        </div>
      {:else}
        <button class="btn btn-ghost btn-full" onclick={() => showClearConfirm = true}>
          Limpar todos os dados
        </button>
      {/if}
    </section>
  {/if}
</div>

<style>
  .page-header {
    margin-bottom: 32px;
  }

  .page-header .label {
    display: block;
    margin-bottom: 8px;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 24px;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    color: var(--text-muted);
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 32px;
  }

  .stat-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 16px;
    text-align: center;
  }

  .stat-card .label {
    display: block;
    margin-bottom: 8px;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -1px;
  }

  .section {
    margin-bottom: 32px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .chart-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px;
  }

  .moods-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .export-row {
    display: flex;
    gap: 12px;
  }

  .export-row .btn {
    flex: 1;
  }

  .danger-section {
    padding-top: 24px;
    border-top: 1px solid var(--border-light);
  }

  .confirm-box {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 20px;
  }

  .confirm-text {
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .confirm-actions {
    display: flex;
    gap: 12px;
  }

  .confirm-actions .btn {
    flex: 1;
  }

  .btn-danger {
    background: transparent;
    color: #c0392b;
    border: 2px solid #c0392b;
  }

  .btn-danger:hover {
    background: #c0392b;
    color: var(--bg-primary);
  }
</style>

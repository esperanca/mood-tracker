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
  <header class="header">
    <h1>Meus Humores</h1>
    <p class="subtitle">Seu histórico pessoal</p>
  </header>

  {#if moods.length === 0}
    <div class="empty-state">
      <span class="empty-emoji">📊</span>
      <h2>Nenhum registro ainda</h2>
      <p>Comece a registrar seus humores para ver as estatísticas aqui.</p>
      <a href="/" class="btn btn-primary">Registrar humor</a>
    </div>
  {:else}
    <section class="stats-grid">
      <div class="stat-card">
        <span class="stat-value">{moods.length}</span>
        <span class="stat-label">Total de registros</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{weeklyMoods.length}</span>
        <span class="stat-label">Últimos 7 dias</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{averageMood > 0 ? averageMood.toFixed(1) : '-'}</span>
        <span class="stat-label">Média semanal</span>
      </div>
    </section>

    <section class="card">
      <h2 class="section-title">Tendência Semanal</h2>
      <TrendChart data={dailyAverages} />
    </section>

    <section class="card">
      <h2 class="section-title">Distribuição</h2>
      <DistributionChart {distribution} />
    </section>

    <section class="card">
      <h2 class="section-title">Últimos Registros</h2>
      <div class="moods-list">
        {#each recentMoods as entry (entry.id)}
          <MoodCard {entry} />
        {/each}
      </div>
    </section>

    <section class="actions">
      <h2 class="section-title">Exportar Dados</h2>
      <div class="export-buttons">
        <button class="btn btn-secondary" onclick={handleExportJSON}>
          Exportar JSON
        </button>
        <button class="btn btn-secondary" onclick={handleExportCSV}>
          Exportar CSV
        </button>
      </div>
    </section>

    <section class="danger-zone">
      <h2 class="section-title">Zona de Perigo</h2>
      {#if showClearConfirm}
        <div class="confirm-delete">
          <p>Tem certeza? Esta ação não pode ser desfeita.</p>
          <div class="confirm-buttons">
            <button class="btn btn-secondary" onclick={() => showClearConfirm = false}>
              Cancelar
            </button>
            <button class="btn btn-danger" onclick={handleClearAll}>
              Confirmar exclusão
            </button>
          </div>
        </div>
      {:else}
        <button class="btn btn-danger btn-full" onclick={() => showClearConfirm = true}>
          Limpar todos os dados
        </button>
      {/if}
    </section>
  {/if}
</div>

<style>
  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .header h1 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .subtitle {
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .empty-state {
    text-align: center;
    padding: 48px 16px;
  }

  .empty-emoji {
    font-size: 4rem;
    display: block;
    margin-bottom: 16px;
  }

  .empty-state h2 {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: 24px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 16px 12px;
    text-align: center;
  }

  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 0.625rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 16px;
  }

  .moods-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .actions {
    margin-top: 24px;
  }

  .export-buttons {
    display: flex;
    gap: 12px;
  }

  .export-buttons .btn {
    flex: 1;
  }

  .danger-zone {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--border-color);
  }

  .confirm-delete {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 16px;
    text-align: center;
  }

  .confirm-delete p {
    color: var(--text-secondary);
    margin-bottom: 16px;
  }

  .confirm-buttons {
    display: flex;
    gap: 12px;
  }

  .confirm-buttons .btn {
    flex: 1;
  }
</style>

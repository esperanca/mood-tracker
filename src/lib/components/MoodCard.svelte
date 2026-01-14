<script>
  import { MOODS, GROUPS } from '$lib/constants.js';

  let { entry } = $props();

  function getMoodData(value) {
    return MOODS.find(m => m.value === value) || MOODS[2];
  }

  function getGroupData(id) {
    return GROUPS.find(g => g.id === id);
  }

  function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}min`;
    if (hours < 24) return `${hours}h`;
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days}d`;
    return new Date(timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }

  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  let mood = $derived(getMoodData(entry.mood));
</script>

<div class="mood-card">
  <div class="card-main">
    <div class="card-left">
      <span class="card-emoji">{mood.emoji}</span>
    </div>

    <div class="card-content">
      <div class="card-header">
        <span class="mood-label">{mood.label}</span>
        <span class="time-info mono">
          {formatTimeAgo(entry.timestamp)}
        </span>
      </div>

      {#if entry.groups && entry.groups.length > 0}
        <div class="groups-row">
          {#each entry.groups as groupId}
            {@const group = getGroupData(groupId)}
            {#if group}
              <span class="group-tag">{group.emoji} {group.label}</span>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
  </div>

  {#if entry.comment}
    <div class="card-comment">
      <p class="comment-text">{entry.comment}</p>
    </div>
  {/if}
</div>

<style>
  .mood-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .card-main {
    display: flex;
    gap: 16px;
    padding: 16px;
  }

  .card-left {
    flex-shrink: 0;
  }

  .card-emoji {
    font-size: 2.5rem;
    line-height: 1;
  }

  .card-content {
    flex: 1;
    min-width: 0;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .mood-label {
    font-weight: 600;
    font-size: 1rem;
  }

  .time-info {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
  }

  .groups-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .group-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: var(--bg-muted);
    border-radius: 100px;
    font-size: 0.6875rem;
    color: var(--text-secondary);
  }

  .card-comment {
    padding: 12px 16px;
    border-top: 1px solid var(--border-light);
    background: var(--bg-muted);
  }

  .comment-text {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.5;
  }
</style>

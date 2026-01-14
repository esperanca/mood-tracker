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
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    if (days === 1) return 'Ontem';
    if (days < 7) return `${days} dias atrás`;
    return new Date(timestamp).toLocaleDateString('pt-BR');
  }

  let mood = $derived(getMoodData(entry.mood));
</script>

<div class="mood-card" style="--mood-color: {mood.color}">
  <div class="card-header">
    <span class="mood-emoji">{mood.emoji}</span>
    <div class="card-info">
      <span class="mood-label">{mood.label}</span>
      <span class="time-ago">{formatTimeAgo(entry.timestamp)}</span>
    </div>
  </div>

  {#if entry.groups && entry.groups.length > 0}
    <div class="groups-row">
      {#each entry.groups as groupId}
        {@const group = getGroupData(groupId)}
        {#if group}
          <span class="group-tag">
            {group.emoji} {group.label}
          </span>
        {/if}
      {/each}
    </div>
  {/if}

  {#if entry.comment}
    <p class="comment">{entry.comment}</p>
  {/if}
</div>

<style>
  .mood-card {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 16px;
    border-left: 4px solid var(--mood-color);
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .mood-emoji {
    font-size: 2rem;
  }

  .card-info {
    display: flex;
    flex-direction: column;
  }

  .mood-label {
    font-weight: 500;
    color: var(--mood-color);
  }

  .time-ago {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .groups-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }

  .group-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: var(--bg-tertiary);
    border-radius: 16px;
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .comment {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
  }
</style>

<script>
  import { GROUPS, MAX_GROUPS_PER_ENTRY } from '$lib/constants.js';

  let { selected = $bindable([]), onSelect = () => {} } = $props();

  function toggleGroup(groupId) {
    if (selected.includes(groupId)) {
      selected = selected.filter(id => id !== groupId);
    } else if (selected.length < MAX_GROUPS_PER_ENTRY) {
      selected = [...selected, groupId];
    }
    onSelect(selected);
  }

  function isSelected(groupId) {
    return selected.includes(groupId);
  }

  function isDisabled(groupId) {
    return !isSelected(groupId) && selected.length >= MAX_GROUPS_PER_ENTRY;
  }
</script>

<div class="group-selector">
  <p class="hint">Selecione até {MAX_GROUPS_PER_ENTRY} grupos ({selected.length}/{MAX_GROUPS_PER_ENTRY})</p>
  <div class="groups-grid">
    {#each GROUPS as group}
      <button
        type="button"
        class="group-btn"
        class:selected={isSelected(group.id)}
        class:disabled={isDisabled(group.id)}
        onclick={() => toggleGroup(group.id)}
        disabled={isDisabled(group.id)}
      >
        <span class="group-emoji">{group.emoji}</span>
        <span class="group-label">{group.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .group-selector {
    width: 100%;
  }

  .hint {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 16px;
    text-align: center;
  }

  .groups-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .group-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 8px;
    min-height: 70px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .group-btn:hover:not(.disabled) {
    border-color: var(--text-muted);
  }

  .group-btn.selected {
    background: var(--bg-tertiary);
    border-color: var(--accent);
  }

  .group-btn.disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .group-emoji {
    font-size: 1.5rem;
  }

  .group-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .group-btn.selected .group-label {
    color: var(--text-primary);
  }
</style>

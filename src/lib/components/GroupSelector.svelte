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
  <div class="selector-header">
    <span class="label">CONTEXTO</span>
    <span class="counter">{selected.length}/{MAX_GROUPS_PER_ENTRY}</span>
  </div>

  <div class="groups-wrap">
    {#each GROUPS as group}
      <button
        type="button"
        class="group-pill"
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

  .selector-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .counter {
    font-family: 'Space Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .groups-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .group-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 100px;
    font-size: 0.8125rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .group-pill:hover:not(.disabled):not(.selected) {
    background: var(--bg-muted);
  }

  .group-pill.selected {
    background: var(--text-primary);
    color: var(--bg-primary);
    border-color: var(--text-primary);
  }

  .group-pill.disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .group-emoji {
    font-size: 1rem;
  }

  .group-label {
    white-space: nowrap;
  }
</style>

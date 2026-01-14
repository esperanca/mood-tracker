<script>
  import { MOODS } from '$lib/constants.js';

  let { selected = $bindable(null), onSelect = () => {} } = $props();

  function selectMood(value) {
    selected = value;
    onSelect(value);
  }
</script>

<div class="mood-selector">
  <p class="hint">Como você está se sentindo?</p>
  <div class="moods-row">
    {#each MOODS as mood}
      <button
        type="button"
        class="mood-btn"
        class:selected={selected === mood.value}
        onclick={() => selectMood(mood.value)}
        style="--mood-color: {mood.color}"
      >
        <span class="mood-emoji">{mood.emoji}</span>
        <span class="mood-label">{mood.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .mood-selector {
    width: 100%;
  }

  .hint {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 16px;
    text-align: center;
  }

  .moods-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
  }

  .mood-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 12px 4px;
    min-height: 80px;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .mood-btn:hover {
    border-color: var(--mood-color);
    transform: scale(1.05);
  }

  .mood-btn.selected {
    background: var(--bg-tertiary);
    border-color: var(--mood-color);
    box-shadow: 0 0 20px color-mix(in srgb, var(--mood-color) 30%, transparent);
  }

  .mood-emoji {
    font-size: 2rem;
    transition: transform 0.2s ease;
  }

  .mood-btn.selected .mood-emoji {
    transform: scale(1.2);
  }

  .mood-label {
    font-size: 0.625rem;
    color: var(--text-muted);
    white-space: nowrap;
  }

  .mood-btn.selected .mood-label {
    color: var(--mood-color);
    font-weight: 500;
  }
</style>

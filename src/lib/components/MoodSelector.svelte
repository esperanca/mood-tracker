<script>
  import { MOODS } from '$lib/constants.js';

  let { selected = $bindable(null), onSelect = () => {} } = $props();

  function selectMood(value) {
    selected = value;
    onSelect(value);
  }

  let selectedMood = $derived(MOODS.find(m => m.value === selected));

  // Generate tick positions for the dial
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);
</script>

<div class="mood-selector">
  <span class="label">HUMOR</span>

  <div class="dial-wrapper">
    <div class="dial">
      <div class="dial-ring"></div>

      <div class="dial-ticks">
        {#each ticks as angle}
          <div
            class="tick"
            style="transform: rotate({angle}deg)"
            class:highlight={selected && Math.abs(angle - ((selected - 1) * 72 - 90)) < 20}
          ></div>
        {/each}
      </div>

      <div class="dial-center">
        {#if selected}
          <span class="mood-emoji">{selectedMood?.emoji}</span>
          <span class="mood-label">{selectedMood?.label}</span>
        {:else}
          <span class="mood-placeholder">?</span>
          <span class="mood-label text-muted">Selecione</span>
        {/if}
      </div>

      <div class="dial-pointer" style="--rotation: {selected ? (selected - 1) * 72 - 90 : -90}deg"></div>
    </div>
  </div>

  <div class="mood-options">
    {#each MOODS as mood}
      <button
        type="button"
        class="mood-btn"
        class:selected={selected === mood.value}
        onclick={() => selectMood(mood.value)}
      >
        <span class="btn-emoji">{mood.emoji}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .mood-selector {
    width: 100%;
    text-align: center;
  }

  .dial-wrapper {
    padding: 32px 0;
  }

  .dial {
    position: relative;
    width: 220px;
    height: 220px;
    margin: 0 auto;
  }

  .dial-ring {
    position: absolute;
    inset: 0;
    border: 2px solid var(--border-color);
    border-radius: 50%;
  }

  .dial-ticks {
    position: absolute;
    inset: 0;
  }

  .tick {
    position: absolute;
    width: 2px;
    height: 10px;
    background: var(--border-light);
    left: calc(50% - 1px);
    top: 6px;
    transform-origin: center 104px;
    transition: all 0.2s ease;
  }

  .tick.highlight {
    background: var(--text-primary);
    height: 14px;
  }

  .dial-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .mood-emoji {
    font-size: 4rem;
    line-height: 1;
  }

  .mood-placeholder {
    font-family: 'Space Mono', monospace;
    font-size: 3rem;
    color: var(--text-muted);
  }

  .mood-label {
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--text-secondary);
  }

  .dial-pointer {
    position: absolute;
    width: 12px;
    height: 12px;
    background: var(--text-primary);
    border-radius: 50%;
    top: 0;
    left: calc(50% - 6px);
    transform-origin: center 110px;
    transform: rotate(var(--rotation));
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .mood-options {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 8px;
  }

  .mood-btn {
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-light);
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .mood-btn:hover {
    border-color: var(--border-color);
    transform: scale(1.1);
  }

  .mood-btn.selected {
    background: var(--text-primary);
    border-color: var(--text-primary);
  }

  .btn-emoji {
    font-size: 1.5rem;
    transition: filter 0.15s ease;
  }

  .mood-btn.selected .btn-emoji {
    filter: grayscale(1) brightness(10);
  }
</style>

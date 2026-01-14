<script>
  import GroupSelector from '$lib/components/GroupSelector.svelte';
  import MoodSelector from '$lib/components/MoodSelector.svelte';
  import CommentInput from '$lib/components/CommentInput.svelte';
  import { moodStore } from '$lib/stores/mood.js';
  import { MOODS, GROUPS } from '$lib/constants.js';

  let step = $state(1);
  let selectedGroups = $state([]);
  let selectedMood = $state(null);
  let comment = $state('');
  let showSuccess = $state(false);

  const totalSteps = 4;

  function canProceed() {
    if (step === 1) return selectedGroups.length > 0;
    if (step === 2) return selectedMood !== null;
    if (step === 3) return true;
    return false;
  }

  function nextStep() {
    if (step < totalSteps && canProceed()) {
      step++;
    }
  }

  function prevStep() {
    if (step > 1) {
      step--;
    }
  }

  function submit() {
    if (selectedGroups.length > 0 && selectedMood !== null) {
      moodStore.addMood(selectedMood, selectedGroups, comment);
      showSuccess = true;
      setTimeout(() => {
        reset();
      }, 2000);
    }
  }

  function reset() {
    step = 1;
    selectedGroups = [];
    selectedMood = null;
    comment = '';
    showSuccess = false;
  }

  function getMoodEmoji(value) {
    return MOODS.find(m => m.value === value)?.emoji || '';
  }

  function getGroupLabel(id) {
    const group = GROUPS.find(g => g.id === id);
    return group ? `${group.emoji} ${group.label}` : '';
  }
</script>

<div class="container">
  <header class="header">
    <h1>Mood Tracker</h1>
    <p class="subtitle">Como você está se sentindo?</p>
  </header>

  {#if showSuccess}
    <div class="success-message fade-in">
      <span class="success-emoji">✅</span>
      <h2>Registrado!</h2>
      <p>Seu humor foi salvo com sucesso.</p>
    </div>
  {:else}
    <div class="progress-bar">
      <div class="progress-fill" style="width: {(step / totalSteps) * 100}%"></div>
    </div>
    <p class="step-indicator">Passo {step} de {totalSteps}</p>

    <div class="step-content fade-in" style="--step: {step}">
      {#if step === 1}
        <GroupSelector bind:selected={selectedGroups} />
      {:else if step === 2}
        <MoodSelector bind:selected={selectedMood} />
      {:else if step === 3}
        <CommentInput bind:value={comment} />
      {:else if step === 4}
        <div class="confirmation">
          <h2>Confirmar registro</h2>

          <div class="summary-card">
            <div class="summary-item">
              <span class="summary-label">Humor</span>
              <span class="summary-value mood-display">
                {getMoodEmoji(selectedMood)}
              </span>
            </div>

            <div class="summary-item">
              <span class="summary-label">Grupos</span>
              <div class="summary-groups">
                {#each selectedGroups as groupId}
                  <span class="group-tag">{getGroupLabel(groupId)}</span>
                {/each}
              </div>
            </div>

            {#if comment}
              <div class="summary-item">
                <span class="summary-label">Comentário</span>
                <p class="summary-comment">{comment}</p>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <div class="nav-buttons">
      {#if step > 1}
        <button class="btn btn-secondary" onclick={prevStep}>
          Voltar
        </button>
      {:else}
        <div></div>
      {/if}

      {#if step < totalSteps}
        <button
          class="btn btn-primary"
          onclick={nextStep}
          disabled={!canProceed()}
        >
          Avançar
        </button>
      {:else}
        <button class="btn btn-primary" onclick={submit}>
          Registrar
        </button>
      {/if}
    </div>
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

  .progress-bar {
    height: 4px;
    background: var(--bg-secondary);
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 8px;
  }

  .progress-fill {
    height: 100%;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .step-indicator {
    text-align: center;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-bottom: 24px;
  }

  .step-content {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-top: 24px;
  }

  .nav-buttons .btn {
    flex: 1;
  }

  .success-message {
    text-align: center;
    padding: 48px 16px;
  }

  .success-emoji {
    font-size: 4rem;
    display: block;
    margin-bottom: 16px;
  }

  .success-message h2 {
    font-size: 1.5rem;
    margin-bottom: 8px;
  }

  .success-message p {
    color: var(--text-secondary);
  }

  .confirmation h2 {
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: 24px;
  }

  .summary-card {
    background: var(--bg-secondary);
    border-radius: 12px;
    padding: 20px;
  }

  .summary-item {
    margin-bottom: 16px;
  }

  .summary-item:last-child {
    margin-bottom: 0;
  }

  .summary-label {
    display: block;
    font-size: 0.75rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
  }

  .summary-value {
    font-size: 1rem;
    color: var(--text-primary);
  }

  .mood-display {
    font-size: 3rem;
  }

  .summary-groups {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .group-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    background: var(--bg-tertiary);
    border-radius: 16px;
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .summary-comment {
    color: var(--text-secondary);
    font-size: 0.875rem;
    line-height: 1.5;
  }
</style>

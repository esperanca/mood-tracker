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
      }, 2500);
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

  function getMoodLabel(value) {
    return MOODS.find(m => m.value === value)?.label || '';
  }

  function getGroupLabel(id) {
    const group = GROUPS.find(g => g.id === id);
    return group ? `${group.emoji} ${group.label}` : '';
  }
</script>

<div class="container">
  {#if showSuccess}
    <div class="success-screen fade-in">
      <div class="success-content">
        <span class="success-emoji">{getMoodEmoji(selectedMood)}</span>
        <h1 class="title-md">Registrado</h1>
        <p class="text-secondary">Seu humor foi salvo com sucesso.</p>
      </div>
    </div>
  {:else}
    <header class="page-header">
      <div class="header-top">
        <span class="label">NOVO REGISTRO</span>
        <span class="step-counter mono">{step}/{totalSteps}</span>
      </div>
      <h1 class="title-lg">
        {#if step === 1}
          O que mais influenciou seu humor hoje?
        {:else if step === 2}
          Como você está se sentindo?
        {:else if step === 3}
          Quer adicionar um comentário?
        {:else}
          Confirmar registro
        {/if}
      </h1>
    </header>

    <div class="progress-dots mb-32">
      {#each Array(totalSteps) as _, i}
        <span
          class="progress-dot"
          class:active={step === i + 1}
          class:completed={step > i + 1}
        ></span>
      {/each}
    </div>

    <div class="step-content fade-in" key={step}>
      {#if step === 1}
        <GroupSelector bind:selected={selectedGroups} />
      {:else if step === 2}
        <MoodSelector bind:selected={selectedMood} />
      {:else if step === 3}
        <CommentInput bind:value={comment} />
      {:else if step === 4}
        <div class="confirmation">
          <div class="confirm-card">
            <div class="confirm-mood">
              <span class="confirm-emoji">{getMoodEmoji(selectedMood)}</span>
              <span class="confirm-mood-label">{getMoodLabel(selectedMood)}</span>
            </div>

            <div class="divider"></div>

            <div class="confirm-section">
              <span class="label">CONTEXTO</span>
              <div class="confirm-groups">
                {#each selectedGroups as groupId}
                  <span class="confirm-group-tag">{getGroupLabel(groupId)}</span>
                {/each}
              </div>
            </div>

            {#if comment}
              <div class="confirm-section">
                <span class="label">COMENTÁRIO</span>
                <p class="confirm-comment">{comment}</p>
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
          Continuar
        </button>
      {:else}
        <button class="btn btn-primary" onclick={submit}>
          Confirmar
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .page-header {
    margin-bottom: 24px;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .step-counter {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .step-content {
    min-height: 320px;
    display: flex;
    flex-direction: column;
  }

  .nav-buttons {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: auto;
    padding-top: 24px;
  }

  .nav-buttons .btn {
    flex: 1;
  }

  .success-screen {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .success-content {
    text-align: center;
  }

  .success-emoji {
    font-size: 5rem;
    display: block;
    margin-bottom: 16px;
  }

  .confirmation {
    width: 100%;
  }

  .confirm-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 24px;
  }

  .confirm-mood {
    text-align: center;
    padding: 16px 0;
  }

  .confirm-emoji {
    font-size: 4rem;
    display: block;
    margin-bottom: 8px;
  }

  .confirm-mood-label {
    font-size: 1rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .confirm-section {
    margin-top: 16px;
  }

  .confirm-section .label {
    display: block;
    margin-bottom: 10px;
  }

  .confirm-groups {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .confirm-group-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: var(--bg-muted);
    border-radius: 100px;
    font-size: 0.8125rem;
  }

  .confirm-comment {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }
</style>

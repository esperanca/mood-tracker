<script>
  import { MAX_COMMENT_LENGTH } from '$lib/constants.js';

  let { value = $bindable(''), onInput = () => {} } = $props();

  function handleInput(e) {
    const newValue = e.target.value.slice(0, MAX_COMMENT_LENGTH);
    value = newValue;
    onInput(newValue);
  }

  let charCount = $derived(value.length);
</script>

<div class="comment-input">
  <div class="input-header">
    <span class="label">COMENTÁRIO</span>
    <span class="optional">opcional</span>
  </div>

  <div class="textarea-wrapper">
    <textarea
      class="textarea"
      placeholder="O que aconteceu hoje?"
      rows="4"
      maxlength={MAX_COMMENT_LENGTH}
      bind:value
      oninput={handleInput}
    ></textarea>
  </div>

  <div class="input-footer">
    <span class="char-count mono" class:warning={charCount > MAX_COMMENT_LENGTH * 0.9}>
      {charCount}<span class="char-max">/{MAX_COMMENT_LENGTH}</span>
    </span>
  </div>
</div>

<style>
  .comment-input {
    width: 100%;
  }

  .input-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .optional {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .textarea-wrapper {
    position: relative;
  }

  .textarea {
    width: 100%;
    min-height: 120px;
    resize: none;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: 16px;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-primary);
  }

  .textarea:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--border-color);
  }

  .textarea::placeholder {
    color: var(--text-muted);
  }

  .input-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  .char-count {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .char-max {
    color: var(--border-light);
  }

  .char-count.warning {
    color: var(--text-primary);
  }
</style>

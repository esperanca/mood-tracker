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
  <p class="hint">Quer adicionar um comentário? (opcional)</p>
  <textarea
    class="textarea"
    placeholder="Como foi seu dia? O que aconteceu?"
    rows="4"
    maxlength={MAX_COMMENT_LENGTH}
    bind:value
    oninput={handleInput}
  ></textarea>
  <p class="char-count" class:warning={charCount > MAX_COMMENT_LENGTH * 0.9}>
    {charCount}/{MAX_COMMENT_LENGTH}
  </p>
</div>

<style>
  .comment-input {
    width: 100%;
  }

  .hint {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 12px;
    text-align: center;
  }

  .textarea {
    width: 100%;
    resize: none;
    background: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 12px 16px;
    color: var(--text-primary);
    font-size: 1rem;
    line-height: 1.5;
  }

  .textarea:focus {
    outline: none;
    border-color: var(--accent);
  }

  .textarea::placeholder {
    color: var(--text-muted);
  }

  .char-count {
    text-align: right;
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-top: 8px;
  }

  .char-count.warning {
    color: var(--mood-2);
  }
</style>

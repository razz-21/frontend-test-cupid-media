<script lang="ts" context="module">
  export interface SelectItem {
    id: number;
    value: string;
  }
</script>

<script lang="ts">
  export let id: any = null;
  export let label = '';
  export let items: SelectItem[] = [];
  export let placeholder = 'Select state';
  export let value = '';
  export let disabled = false;
</script>

<label for={id}>{label}</label>
<div class="select-wrapper">
  <select bind:value {id} {placeholder} {disabled} on:change>
    <option value="" disabled selected>{placeholder}</option>
    {#each items as item}
      <option value={item.id}>{item.value}</option>
    {/each}
  </select>
  <svg class="caret" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/></svg>
</div>

<style>
  .select-wrapper {
    --select-bg-color: #fff;
    --select-border-color: #edf1f4;
    --select-max-width: 100%;

    position: relative;
    width: 100%;
    max-width: var(--select-max-width, 100%);
    margin-bottom: 1rem;
  }

  select {
    font-size: 1rem;
    padding: 0.75rem 2rem 0.75rem 0.75rem;
    width: 100%;
    min-width: 6rem;
    max-width: var(--select-max-width, 100%);
    outline: 0;
    border-color: var(--select-border-color);
    border-width: 1px;
    border-radius: 6px;
    font-size: 14px;
    appearance: none;
    transition: border-color 300ms ease-out;
  }

  select:focus,
  select:hover {
    --select-border-color: var(--primary-100);
  }

  select[value=""] {
    color: red;
  }

  select:disabled,
  select:disabled ~ .caret {
    opacity: 0.3;
    pointer-events: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: 600;
  }

  .caret {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
  }

  option:disabled {
    color: red;
  }
</style>
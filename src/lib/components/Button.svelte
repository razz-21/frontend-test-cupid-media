<script lang="ts" context="module">
  type ButtonType = "button" | "submit" | "reset" | null | undefined;
</script>

<script lang="ts">
  export let type: ButtonType = 'button';
  export let label = '';
  export let disabled = false;
  export let block = true;
</script>

<button {type} {disabled} class:block on:click>
  {label}
</button>

<style>
  button {
    --button-bg-color: var(--primary);
    --button-border-color: var(--primary); 

    min-width: 6rem;
    padding: 0.75rem 0.5rem;
    margin: 1rem 0;
    background-color: var(--button-bg-color);
    border: 1px solid var(--button-border-color);
    border-radius: 25px;
    color: #fff;
    outline: 0;
    font-weight: 600;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  button:hover,
  button:focus {
    --button-bg-color: #3452C9;
    --button-border-color: #3452C9; 
  }

  button.block {
    width: 100%;
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
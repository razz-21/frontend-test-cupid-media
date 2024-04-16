<script lang="ts" context="module">
  type ButtonType = "button" | "submit" | "reset" | null | undefined;
</script>

<script lang="ts">
  export let type: ButtonType = 'button';
  export let label = '';
  export let disabled = false;
</script>

<button {type} {disabled} on:click>
  {label}
</button>

<style>
  button {
    --button-bg-color: #459DB6;
    --button-border-color: #459DB6; 

    min-width: 6rem;
    padding: 0.5rem;
    margin: 1rem 0;
    background-color: var(--button-bg-color);
    border: 1px solid var(--button-border-color);
    border-radius: 25px;
    color: #fff;
    outline: 0;
    cursor: pointer;
    transition: all 300ms ease-in-out;
  }

  button:hover,
  button:focus {
    --button-bg-color: #55C2E0;
    --button-border-color: #55C2E0; 
  }

  button:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
</style>
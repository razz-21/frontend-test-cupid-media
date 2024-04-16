<script lang="ts" context="module">
  enum ScreenMode {
    FORM,
    SELECTED_INPUTS
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { requestFetch } from "$api/request-fetch";
  import Button from "$lib/components/Button.svelte";
  import Select, { type SelectItem } from "$lib/components/Select.svelte";

  let screenMode: ScreenMode = ScreenMode.FORM;
  let countriesItems: SelectItem[] = [];
  let statesItems: SelectItem[] = [];

  const DEFAULT_SELECTED_VALUE = {
    id: '',
    name: ''
  };

  let selectedCountry = {...DEFAULT_SELECTED_VALUE};
  let selectedState = {...DEFAULT_SELECTED_VALUE};

  $: {
    console.log(selectedCountry);
    console.log(selectedState);
  }

  onMount(async () => {
    await getCountries();
  });

  async function getCountries(): Promise<void> {
    try {
      countriesItems = await requestFetch('/countries');
    } catch (e) {
      console.error(e);
    }
  }

  async function getCountryStates(countryId: number) {
    try {
      statesItems = await requestFetch(`/countries/${countryId}/states`);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSelectCountryChange(): Promise<void> {
    try {
      selectedState = {...DEFAULT_SELECTED_VALUE};
      selectedCountry.name = countriesItems.find((country) => country.id === +selectedCountry.id)?.value ?? '';
      await getCountryStates(+selectedCountry.id);
    } catch (e) {
      console.error(e);
    }
  }

  function handleSelectStateChange(): void {
    selectedState.name = statesItems.find((state) => state.id === +selectedState.id)?.value ?? '';
  }

  function handleSubmit(): void {
    screenMode = ScreenMode.SELECTED_INPUTS;
  }

  function handleBackToFrom(): void {
    screenMode = ScreenMode.FORM;
  }
</script>

{#if screenMode === ScreenMode.FORM}
  <section>
    <form novalidate on:submit|preventDefault={handleSubmit}>
      <Select items={countriesItems} bind:value={selectedCountry.id} label="Country" placeholder="Select country" on:change={handleSelectCountryChange} />
      <Select items={statesItems} bind:value={selectedState.id} label="State" placeholder="Select state" on:change={handleSelectStateChange} />

      <Button label="Submit" type="submit"/>
    </form>
  </section>
{/if}

{#if screenMode === ScreenMode.SELECTED_INPUTS}
  <section>
    <p><strong>Country: </strong>{selectedCountry.name}</p>
    <p><strong>State: </strong>{selectedState.name}</p>

    <Button label="Back" type="button" on:click={handleBackToFrom} />
  </section>
{/if}

<style>
  section {
    margin-top: 3rem;
  }

  form {
    width: 100%;
    max-width: 560px;
    padding: 1.25rem;
    border: 1px solid #56bfddca;
    border-radius: 6px;
  }
</style>
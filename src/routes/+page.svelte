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
      statesItems = [];
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

<div class="page-container">
  <div class="sections">
    <div class="image-asset">
      {#if screenMode === ScreenMode.FORM}
        <img src="/images/undraw-form.svg" alt="Person Form">
      {:else}
        <img src="/images/undraw-details.svg" alt="Person Details">
      {/if}
    </div>
    <div class="form-section">
      {#if screenMode === ScreenMode.FORM}
        <section>
          <h2 class="title-text">Frontend Test (Cupid Media)</h2>
          <form novalidate on:submit|preventDefault={handleSubmit}>
            <Select
              bind:value={selectedCountry.id}
              items={countriesItems}
              label="Country"
              placeholder="Select country"
              on:change={handleSelectCountryChange}
            />
            <Select
              bind:value={selectedState.id}
              items={statesItems}
              disabled={statesItems.length === 0}
              label="State"
              placeholder="Select state"
              on:change={handleSelectStateChange}
            />
      
            <Button disabled={selectedCountry.id === '' || selectedState.id === ''} label="Submit" type="submit"/>
          </form>
        </section>
      {/if}
      
      {#if screenMode === ScreenMode.SELECTED_INPUTS}
        <section>
          <h2 class="title-text">Selected Address</h2>
          <p>You selected the following address:</p>
          <p><strong>Country: </strong>{selectedCountry.name}</p>
          <p><strong>State: </strong>{selectedState.name}</p>
      
          <Button label="Back" type="button" on:click={handleBackToFrom} />
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .page-container {
    display: grid;
    place-items: center;
    height: 92vh;
  }

  .sections {
    display: flex;
    align-items: center;
  }

  .image-asset,
  .form-section {
    flex: 1;
  }

  .image-asset > img {
    height: 18rem;
    width: auto;
    margin-right: 5rem;
  }

  .title-text {
    margin-top: 0;
    margin-bottom: 2rem;
  }

  section {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 1.75rem;
    border: 1px solid #edf1f4;
    border-radius: 6px;
    box-shadow: 0px 3px 6px #0000001A;
  }

  @media (max-width: 467px) {
    .page-container {
      place-items: baseline;
    }

    .sections {
      flex-direction: column;
      row-gap: 2rem;
    }

    .image-asset > img {
      height: 10rem;
      margin-right: 0;
    }
  }
</style>
import {describe, expect, it} from 'vitest';
import { render, screen, fireEvent} from "@testing-library/svelte";
import Select from './Select.svelte';

describe("Select Component", () => {
  it("should show label text", () => {
    const label = "Label text";
    render(Select, { props: { label } });

    expect(screen.getByText(label)).exist;
  });

  it("should show placeholder text", () => {
    const placeholder = "Placeholder text";
    render(Select, { props: { placeholder } });

    expect(screen.getByText(placeholder)).exist;
  });

  it("should set 'id' select element and 'for' in label element", () => {
    const id = "select-id-1";
    const component = render(Select, { props: { id } });

    const selectEl = component.container.querySelector(`select#${id}`);
    const labelEl = component.container.querySelector(`label[for="${id}"]`);

    expect(selectEl).exist;
    expect(labelEl).exist;
  });

  it("should display option items", () => {
    const items = [
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' }
    ];

    const component = render(Select, { props: { items } });
    const selectEl = component.container.querySelector(`select`);

    expect(selectEl?.options.length).eq(items.length + 1); // Addition 1 item for placeholder
  });

  it("should select option reflect value", async () => {
    const items = [
      { id: 1, value: 'Option 1' },
      { id: 2, value: 'Option 2' }
    ];
    const selectedItem = items[1];

    const component = render(Select, { props: { items } });
    const selectEl = component.container.querySelector(`select`);

    await fireEvent.select(selectEl as Element, {target: { value: selectedItem.id } });
    expect(selectedItem.id.toString()).eq(selectEl?.value);
  });

  it("should disabled select if property is true", () => {
    const disabled = true;
    const component = render(Select, { props: { disabled } });
    const selectEl = component.container.querySelector(`select`);

    expect(selectEl?.disabled).toBeTruthy();
  })
});
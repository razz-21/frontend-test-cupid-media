import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Button from './Button.svelte';

describe("Button Component", () => {
  it("should display label", () => {
    const label = "Button label";
    const component = render(Button, { props: { label } });

    expect(component.getByText(label)).exist;
  });

  it("should set button type", () => {
    const type = "submit";
    const component = render(Button, { props: { type } });

    const buttonEl = component.container.querySelector('button');
    expect(buttonEl?.type).eq(type);
  });

  it("should button be disabled if disabled set to true", () => {
    const disabled = true;
    const component = render(Button, { props: { disabled } });

    const buttonEl = component.container.querySelector('button');
    expect(buttonEl?.disabled).toBeTruthy();
  });

  it("should button has 'block' class if prop is true", () => {
    const block = true;
    const component = render(Button, { props: { block } });

    const buttonEl = component.container.querySelector('button');
    expect(buttonEl?.classList.contains('block')).toBeTruthy();
  })
});
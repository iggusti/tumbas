import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// Mock window.scrollTo
const scrollToSpy = vi.fn();
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: scrollToSpy,
});

describe("ScrollToTop", () => {
  beforeEach(() => {
    scrollToSpy.mockClear();
  });

  it("should scroll to top on initial render", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it("should not render any visible content", () => {
    const { container } = render(
      <MemoryRouter>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeNull();
  });

  it("should call scrollTo at least once", () => {
    render(
      <MemoryRouter initialEntries={["/page1"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledTimes(1);
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});

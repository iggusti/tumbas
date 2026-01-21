import { beforeEach, describe, expect, it, vi } from "vitest";

import { MemoryRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import { render } from "@testing-library/react";

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

  it("should scroll to top when pathname changes", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    // Change route
    rerender(
      <MemoryRouter initialEntries={["/about"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledTimes(2);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 0);
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

  it("should handle multiple route changes", () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={["/page1"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledTimes(1);

    rerender(
      <MemoryRouter initialEntries={["/page2"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledTimes(2);

    rerender(
      <MemoryRouter initialEntries={["/page3"]}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(scrollToSpy).toHaveBeenCalledTimes(3);
  });
});

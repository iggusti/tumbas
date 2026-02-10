import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "./NotFound";

// Mock console.error
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

describe("NotFound", () => {
  it("should render 404 error page", () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Oops! Page not found")).toBeInTheDocument();
    expect(screen.getByText("Return to Home")).toBeInTheDocument();
  });

  it("should log 404 error to console", () => {
    render(
      <MemoryRouter initialEntries={["/invalid-path"]}>
        <NotFound />
      </MemoryRouter>,
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "404 Error: User attempted to access non-existent route:",
      "/invalid-path",
    );
  });

  it("should have correct styling classes", () => {
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    // The outermost div has these classes
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("flex", "min-h-screen", "items-center", "justify-center", "bg-muted");
  });

  it("should have a link to home page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const link = screen.getByText("Return to Home");
    expect(link).toHaveAttribute("href", "/");
  });
});

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SplashScreen from "./SplashScreen";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
}));

describe("SplashScreen", () => {
  it("should render splash screen when isVisible is true", () => {
    render(<SplashScreen isVisible={true} />);

    expect(screen.getByText("tumbas.")).toBeInTheDocument();
  });

  it("should not render splash screen when isVisible is false", () => {
    render(<SplashScreen isVisible={false} />);

    expect(screen.queryByText("tumbas.")).not.toBeInTheDocument();
  });

  it("should render the logo SVG", () => {
    render(<SplashScreen isVisible={true} />);

    const svg = document.querySelector('svg[width="80"]');
    expect(svg).toBeInTheDocument();
  });

  it("should render the decorative star/flower SVG", () => {
    render(<SplashScreen isVisible={true} />);

    const decorativeSvg = document.querySelector('svg[width="24"]');
    expect(decorativeSvg).toBeInTheDocument();
  });

  it("should have correct container styling", () => {
    const { container } = render(<SplashScreen isVisible={true} />);

    const splashContainer = container.firstChild as HTMLElement;
    expect(splashContainer).toHaveClass(
      "fixed",
      "inset-0",
      "z-[100]",
      "bg-background",
      "flex",
      "items-center",
      "justify-center",
    );
  });

  it("should have correct brand name styling", () => {
    render(<SplashScreen isVisible={true} />);

    const brandName = screen.getByText("tumbas.");
    expect(brandName).toHaveClass(
      "mt-6",
      "font-display",
      "text-2xl",
      "font-semibold",
      "text-foreground",
      "tracking-wide",
    );
  });

  it("should render decorative elements around the logo", () => {
    render(<SplashScreen isVisible={true} />);

    // Should have multiple decorative circles
    const circles = document.querySelectorAll("circle");
    expect(circles.length).toBeGreaterThan(5); // Main circle + 8 decorative circles
  });

  it("should have proper SVG paths for the T logo", () => {
    render(<SplashScreen isVisible={true} />);

    const paths = document.querySelectorAll("path");
    expect(paths.length).toBe(2); // Main T shape and decorative curl
  });
});

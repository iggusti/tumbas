import "@testing-library/jest-dom";

import { vi } from "vitest";

// Mock html-encoding-sniffer to avoid ES module compatibility issues
vi.mock("html-encoding-sniffer", () => ({
  default: vi.fn(() => "utf-8"),
  sniffEncoding: vi.fn(() => "utf-8"),
}));

// Mock @exodus/bytes to avoid ES module compatibility issues
vi.mock("@exodus/bytes", () => ({
  default: vi.fn(),
  encoding: {
    lite: vi.fn(),
  },
}));

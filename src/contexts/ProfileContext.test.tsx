import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileProvider, useProfile } from "./ProfileContext";

// Test component that uses the context
const TestComponent = () => {
  const { profile, updateProfile } = useProfile();

  return (
    <div>
      <div data-testid="profile-name">{profile.fullName}</div>
      <button
        onClick={() => updateProfile({ fullName: "Updated Name" })}
        data-testid="update-profile"
      >
        Update Profile
      </button>
    </div>
  );
};

describe("ProfileContext", () => {
  it("should provide profile data", () => {
    render(
      <ProfileProvider>
        <TestComponent />
      </ProfileProvider>,
    );

    expect(screen.getByTestId("profile-name")).toHaveTextContent(
      "Fatiha Barkah Mubyara",
    );
  });

  it("should update profile", () => {
    render(
      <ProfileProvider>
        <TestComponent />
      </ProfileProvider>,
    );

    expect(screen.getByTestId("profile-name")).toHaveTextContent(
      "Fatiha Barkah Mubyara",
    );

    const updateButton = screen.getByTestId("update-profile");
    updateButton.click();

    expect(screen.getByTestId("profile-name")).toHaveTextContent(
      "Updated Name",
    );
  });

  it("should throw error when useProfile is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useProfile must be used within a ProfileProvider");

    consoleSpy.mockRestore();
  });
});

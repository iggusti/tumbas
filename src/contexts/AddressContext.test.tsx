import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AddressProvider, useAddress, getAddressIcon } from "./AddressContext";

// Test component that uses the context
const TestComponent = () => {
  const {
    addresses,
    selectedAddressId,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    selectAddress,
    getSelectedAddress,
  } = useAddress();

  const selectedAddress = getSelectedAddress();

  return (
    <div>
      <div data-testid="addresses-count">{addresses.length}</div>
      <div data-testid="selected-address-id">{selectedAddressId}</div>
      <div data-testid="selected-address-label">
        {selectedAddress?.label || "none"}
      </div>
      <button
        onClick={() =>
          addAddress({
            label: "Test Address",
            name: "Test Name",
            phone: "+62123456789",
            address: "Test Address",
            isDefault: false,
            icon: "other",
          })
        }
        data-testid="add-address"
      >
        Add Address
      </button>
      <button
        onClick={() => updateAddress("1", { label: "Updated Home" })}
        data-testid="update-address"
      >
        Update Address
      </button>
      <button onClick={() => deleteAddress("2")} data-testid="delete-address">
        Delete Address
      </button>
      <button onClick={() => setDefaultAddress("2")} data-testid="set-default">
        Set Default
      </button>
      <button onClick={() => selectAddress("2")} data-testid="select-address">
        Select Address
      </button>
    </div>
  );
};

describe("AddressContext", () => {
  it("should provide initial addresses", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("addresses-count")).toHaveTextContent("2");
    expect(screen.getByTestId("selected-address-id")).toHaveTextContent("1"); // Default address
    expect(screen.getByTestId("selected-address-label")).toHaveTextContent(
      "Rumah",
    );
  });

  it("should add new address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("addresses-count")).toHaveTextContent("2");

    const addButton = screen.getByTestId("add-address");
    addButton.click();

    expect(screen.getByTestId("addresses-count")).toHaveTextContent("3");
  });

  it("should update address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("selected-address-label")).toHaveTextContent(
      "Rumah",
    );

    const updateButton = screen.getByTestId("update-address");
    updateButton.click();

    expect(screen.getByTestId("selected-address-label")).toHaveTextContent(
      "Updated Home",
    );
  });

  it("should delete address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("addresses-count")).toHaveTextContent("2");

    const deleteButton = screen.getByTestId("delete-address");
    deleteButton.click();

    expect(screen.getByTestId("addresses-count")).toHaveTextContent("1");
  });

  it("should set default address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("selected-address-id")).toHaveTextContent("1");

    const setDefaultButton = screen.getByTestId("set-default");
    setDefaultButton.click();

    expect(screen.getByTestId("selected-address-id")).toHaveTextContent("2");
  });

  it("should select address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("selected-address-id")).toHaveTextContent("1");

    const selectButton = screen.getByTestId("select-address");
    selectButton.click();

    expect(screen.getByTestId("selected-address-id")).toHaveTextContent("2");
  });

  it("should get selected address", () => {
    render(
      <AddressProvider>
        <TestComponent />
      </AddressProvider>,
    );

    expect(screen.getByTestId("selected-address-label")).toHaveTextContent(
      "Rumah",
    );
  });

  it("should return correct icon for address type", () => {
    const HomeIcon = getAddressIcon("home");
    const OfficeIcon = getAddressIcon("office");
    const OtherIcon = getAddressIcon("other");

    // These should be the imported icon components
    expect(HomeIcon).toBeDefined();
    expect(OfficeIcon).toBeDefined();
    expect(OtherIcon).toBeDefined();
  });

  it("should throw error when useAddress is used outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAddress must be used within an AddressProvider");

    consoleSpy.mockRestore();
  });
});

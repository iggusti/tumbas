import { Briefcase, Home, MapPin } from "lucide-react";
import { ReactNode, createContext, useContext, useState } from "react";

export interface Address {
  id: string;
  label: string;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
  icon: "home" | "office" | "other";
}

interface AddressContextType {
  addresses: Address[];
  selectedAddressId: string;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  selectAddress: (id: string) => void;
  getSelectedAddress: () => Address | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const initialAddresses: Address[] = [
  {
    id: "1",
    label: "Rumah",
    name: "Fatiha Barkah Mubyara",
    phone: "+62 812-3456-7890",
    address:
      "Jln. Siliwangi, Blok Kluwut, No.50, RT 03, RW 01, Desa Haurkolot, Kec. Haurgeulis, Kab. Indramayu",
    isDefault: true,
    icon: "home",
  },
  {
    id: "2",
    label: "Kantor",
    name: "Fatiha Barkah Mubyara",
    phone: "+62 812-3456-7890",
    address:
      "Jln. Sudirman No. 123, Lantai 5, Gedung Graha Mandiri, Kel. Karet Tengsin, Kec. Tanah Abang, Jakarta Pusat",
    isDefault: false,
    icon: "office",
  },
];

export const AddressProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    initialAddresses.find((a) => a.isDefault)?.id || "1"
  );

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString(),
    };

    if (address.isDefault) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: false })).concat(newAddress)
      );
      setSelectedAddressId(newAddress.id);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
  };

  const updateAddress = (id: string, updatedFields: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      const defaultAddr = addresses.find((a) => a.isDefault && a.id !== id);
      if (defaultAddr) {
        setSelectedAddressId(defaultAddr.id);
      }
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    setSelectedAddressId(id);
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const getSelectedAddress = () => {
    return addresses.find((a) => a.id === selectedAddressId);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        selectAddress,
        getSelectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return context;
};

export const getAddressIcon = (iconType: "home" | "office" | "other") => {
  switch (iconType) {
    case "home":
      return Home;
    case "office":
      return Briefcase;
    default:
      return MapPin;
  }
};

import { Address, getAddressIcon, useAddress } from "@/contexts/AddressContext";
import {
  ArrowLeft,
  Briefcase,
  Check,
  Home,
  MapPin,
  Plus,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { useState } from "react";

const MyAddressPage = () => {
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useAddress();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    name: "",
    phone: "",
    address: "",
    icon: "home" as "home" | "office" | "other",
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      label: "",
      name: "",
      phone: "",
      address: "",
      icon: "home",
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const handleOpenForm = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData({
        label: address.label,
        name: address.name,
        phone: address.phone,
        address: address.address,
        icon: address.icon,
        isDefault: address.isDefault,
      });
    } else {
      resetForm();
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAddress) {
      updateAddress(editingAddress.id, formData);
      if (formData.isDefault) {
        setDefaultAddress(editingAddress.id);
      }
    } else {
      addAddress(formData);
    }
    handleCloseForm();
  };

  const iconOptions = [
    { value: "home", label: "Rumah", Icon: Home },
    { value: "office", label: "Kantor", Icon: Briefcase },
    { value: "other", label: "Lainnya", Icon: MapPin },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background px-4 py-3 flex items-center gap-3"
      >
        <Link to="/profile" className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <div>
          <span className="text-muted-foreground text-sm">tumbas.</span>
          <h1 className="font-display text-lg font-semibold text-foreground -mt-1">
            My Address
          </h1>
        </div>
      </motion.header>

      <main className="px-4 pb-24">
        {/* Add New Address Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOpenForm()}
          className="w-full flex items-center justify-center gap-2 py-4 mb-4 border-2 border-dashed border-primary/30 rounded-xl text-primary hover:bg-primary/5 transition-colors"
        >
          <Plus size={20} />
          <span className="font-medium">Tambah Alamat Baru</span>
        </motion.button>

        {/* Address List */}
        <div className="space-y-3">
          {addresses.map((address, index) => {
            const Icon = getAddressIcon(address.icon);

            return (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`bg-card rounded-xl p-4 border ${
                  address.isDefault
                    ? "border-primary/50 shadow-sm"
                    : "border-border/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      address.isDefault ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        address.isDefault
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {address.label}
                      </span>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-foreground text-sm">
                      {address.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {address.phone}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {address.address}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50">
                      <button
                        onClick={() => handleOpenForm(address)}
                        className="text-xs text-primary font-medium hover:underline"
                      >
                        Edit
                      </button>
                      {!address.isDefault && (
                        <>
                          <button
                            onClick={() => setDefaultAddress(address.id)}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Jadikan Default
                          </button>
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {address.isDefault && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check size={14} className="text-primary-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {addresses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MapPin size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">
              Belum Ada Alamat
            </h3>
            <p className="text-sm text-muted-foreground">
              Tambahkan alamat pengiriman untuk memudahkan checkout
            </p>
          </motion.div>
        )}
      </main>

      {/* Address Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {editingAddress ? "Edit Alamat" : "Tambah Alamat Baru"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Tipe Alamat</Label>
              <div className="flex gap-2">
                {iconOptions.map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: value })}
                    className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors ${
                      formData.icon === value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="label">Label Alamat</Label>
              <Input
                id="label"
                placeholder="cth: Rumah, Kantor"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Penerima</Label>
              <Input
                id="name"
                placeholder="Nama lengkap penerima"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                placeholder="+62 xxx-xxxx-xxxx"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <textarea
                id="address"
                placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-md border border-input bg-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground">
                Jadikan alamat default
              </span>
            </label>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseForm}
                className="flex-1"
              >
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                {editingAddress ? "Simpan" : "Tambah"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <NavLink />
    </div>
  );
};

export default MyAddressPage;

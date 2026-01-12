import {
  ArrowLeft,
  Camera,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavLink from "@/components/NavLink";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useProfile } from "@/contexts/ProfileContext";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, updatePhoto } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dialogs state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Form states
  const [editFormData, setEditFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const accountDetails = [
    {
      icon: User,
      label: "Nama Lengkap",
      value: profile.fullName,
      key: "fullName",
    },
    { icon: Mail, label: "Email", value: profile.email, key: "email" },
    { icon: Phone, label: "No. Telepon", value: profile.phone, key: "phone" },
  ];

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updatePhoto(reader.result as string);
        toast.success("Foto profil berhasil diubah");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEditProfile = () => {
    setEditFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
    });
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editFormData);
    setIsEditProfileOpen(false);
    toast.success("Profil berhasil diperbarui");
  };

  const handleOpenChangePassword = () => {
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangePasswordOpen(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 8) {
      toast.error("Password baru minimal 8 karakter");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Konfirmasi password tidak cocok");
      return;
    }

    // Simulate password change
    setIsChangePasswordOpen(false);
    toast.success("Password berhasil diubah");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3 border-b border-border"
      >
        <Link
          to=""
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          className="p-1"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </Link>
        <h1 className="font-display text-lg font-semibold text-foreground">
          My Account
        </h1>
      </motion.header>

      <main className="px-4 py-6 pb-24">
        {/* Profile Photo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-muted overflow-hidden">
              <img
                src={profile.photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handlePhotoClick}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md"
            >
              <Camera size={16} className="text-primary-foreground" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Tap untuk ganti foto
          </p>
        </motion.div>

        {/* Account Details */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Informasi Akun</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {accountDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={handleOpenEditProfile}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-accent/5 transition-colors ${
                    index !== accountDetails.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {item.value}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground" />
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Security Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="font-semibold text-foreground mb-3">Keamanan</h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <button
              onClick={handleOpenChangePassword}
              className="w-full flex items-center gap-3 p-4 hover:bg-accent/5 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Lock size={18} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-foreground">
                  Ubah Password
                </p>
                <p className="text-xs text-muted-foreground">
                  Terakhir diubah 3 bulan lalu
                </p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </button>
          </div>
        </motion.section>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Keluar
          </Button>
        </motion.div>
      </main>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="max-w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Biodata</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nama Lengkap</Label>
              <Input
                id="fullName"
                value={editFormData.fullName}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, fullName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input
                id="phone"
                value={editFormData.phone}
                onChange={(e) =>
                  setEditFormData({ ...editFormData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditProfileOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      >
        <DialogContent className="max-w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle>Ubah Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Password Saat Ini</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPasswords.current ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Password Baru</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimal 8 karakter
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsChangePasswordOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button type="submit" className="flex-1">
                Ubah Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <NavLink />
    </div>
  );
};

export default MyAccountPage;

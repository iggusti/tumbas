import React, { createContext, useContext, useState, ReactNode } from "react";
import profilePhoto from "@/assets/profile-photo.jpg";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  photo: string;
}

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePhoto: (photoUrl: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const initialProfile: UserProfile = {
  fullName: "Fatiha Barkah Mubyara",
  email: "fbmubyara@gmail.com",
  phone: "+62 812 3456 7890",
  photo: profilePhoto,
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const updatePhoto = (photoUrl: string) => {
    setProfile((prev) => ({ ...prev, photo: photoUrl }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, updatePhoto }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";


type ProfileContextType = {
    editProfile: boolean,
    setEditProfile: Dispatch<SetStateAction<boolean>>;
    updateDesignation: boolean,
    setUpdateDesignation: Dispatch<SetStateAction<boolean>>;
    updateAcademic: boolean,
    setUpdateAcademic: Dispatch<SetStateAction<boolean>>;
    updateUrologyTrainings: boolean,
    setUpdateUrologyTrainings: Dispatch<SetStateAction<boolean>>;
    updateAddress: boolean,
    setUpdateAddress: Dispatch<SetStateAction<boolean>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export default function ProfileContextProvider({ children }: { children: ReactNode }) {
    const [editProfile, setEditProfile] = useState<boolean>(false);
    const [updateDesignation, setUpdateDesignation] = useState<boolean>(false);
    const [updateAcademic, setUpdateAcademic] = useState<boolean>(false);
    const [updateUrologyTrainings, setUpdateUrologyTrainings] = useState<boolean>(false);
    const [updateAddress, setUpdateAddress] = useState<boolean>(false);

    const value = {
        editProfile,
        setEditProfile,
        updateDesignation,
        setUpdateDesignation,
        updateAcademic,
        setUpdateAcademic,
        updateUrologyTrainings,
        setUpdateUrologyTrainings,
        updateAddress,
        setUpdateAddress,
    }

    return (
        <ProfileContext.Provider
            value={value}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) throw new Error("useProfileContext must be used within ProfileContextProvider");
    return context;
};


// src/core/auth/authStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Departamento =
    | "ADMINISTRACION"
    | "MARKETING"
    | "DIGITAL"
    | "RRHH"
    | "AUDIOVISUAL"
    | "COMERCIAL";

export type Role = "ADMIN" | "TRABAJADOR";

export type AuthUser = {
    id: number;
    nombre: string;
    apellido: string;
    correo: string;
    role: Role;
    departamento: Departamento;
};

export type MinimalAuthState = {
    token?: string;
    user?: AuthUser;
    isAuthenticated: boolean;
};

export type MinimalAuthActions = {
    setAuth: (token: string, user: AuthUser) => void;
    logout: () => void;
};

export type MinimalAuthStore = MinimalAuthState & MinimalAuthActions;

export const useAuthStore = create<MinimalAuthStore>()(
    persist(
        (set) => ({
            token: undefined,
            user: undefined,
            isAuthenticated: false,

            setAuth: (token, user) =>
                set({
                    token,
                    user,
                    isAuthenticated: true,
                }),

            logout: () =>
                set({
                    token: undefined,
                    user: undefined,
                    isAuthenticated: false,
                }),
        }),
        {
            name: "authStore",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);

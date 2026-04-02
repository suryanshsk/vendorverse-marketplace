import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserRole = "customer" | "vendor" | "admin";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

interface SignInInput {
  email: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  currentUser: User | null;
  signUp: (payload: SignUpInput) => { ok: boolean; message: string };
  signIn: (payload: SignInInput) => { ok: boolean; message: string };
  signOut: () => void;
}

interface StoredUser extends User {
  password: string;
}

const seedUsers: StoredUser[] = [
  {
    id: 1,
    firstName: "Avanish",
    lastName: "Singh",
    email: "vendor@vendorverse.in",
    password: "vendor123",
    role: "vendor",
  },
  {
    id: 2,
    firstName: "Aarav",
    lastName: "Sharma",
    email: "customer@vendorverse.in",
    password: "customer123",
    role: "customer",
  },
  {
    id: 3,
    firstName: "Admin",
    lastName: "NIET",
    email: "admin@vendorverse.in",
    password: "admin123",
    role: "admin",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>(seedUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const signUp = (payload: SignUpInput) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const exists = users.some((u) => u.email === normalizedEmail && u.role === payload.role);

    if (exists) {
      return { ok: false, message: "Account already exists for this role. Please sign in." };
    }

    if (payload.password.length < 6) {
      return { ok: false, message: "Password must be at least 6 characters." };
    }

    const nextUser: StoredUser = {
      id: Date.now(),
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      email: normalizedEmail,
      password: payload.password,
      role: payload.role,
    };

    setUsers((prev) => [...prev, nextUser]);
    const { password: _password, ...safeUser } = nextUser;
    void _password;
    setCurrentUser(safeUser);

    return { ok: true, message: "Account created successfully." };
  };

  const signIn = (payload: SignInInput) => {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const match = users.find(
      (u) => u.email === normalizedEmail && u.password === payload.password && u.role === payload.role
    );

    if (!match) {
      return { ok: false, message: "Invalid credentials or role mismatch." };
    }

    const { password: _password, ...safeUser } = match;
    void _password;
    setCurrentUser(safeUser);
    return { ok: true, message: "Signed in successfully." };
  };

  const signOut = () => setCurrentUser(null);

  const value = useMemo(
    () => ({ currentUser, signUp, signIn, signOut }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

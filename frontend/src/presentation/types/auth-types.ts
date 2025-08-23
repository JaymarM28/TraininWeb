// Roles específicos del backend
export type UserRole = 'ADMIN' | 'COACH' | 'USER';

// Interfaz de usuario para autenticación (estructura que viene del backend)
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  cedula: string;
  isActive: boolean;
  coachId?: string;
  coach?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Estados de autenticación
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Contexto de autenticación
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  getDashboardRoute: () => string;
  canCreateUsers: () => boolean;
  canManageUsers: () => boolean;
  canViewUsers: () => boolean;
}

// Tokens de autenticación
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// Respuesta del login
export interface LoginResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

// Request de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Request de registro
export interface RegisterRequest {
  email: string;
  cedula: string;
  name: string;
  password: string;
  role?: UserRole;
  coachId?: string;
}
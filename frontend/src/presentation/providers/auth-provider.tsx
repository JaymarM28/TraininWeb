// frontend/src/presentation/providers/auth-provider.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from '@/infrastructure/http/api-client';
import { User, UserRole } from '@/shared/types/shared-types';

// Tipo específico para la autenticación que coincide con el backend
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

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  getDashboardRoute: () => string;
  canCreateUsers: () => boolean;
  canManageUsers: () => boolean;
  canViewUsers: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Función para convertir User (shared-types) a AuthUser (auth)
function mapUserToAuthUser(user: any): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as UserRole,
    cedula: user.cedula,
    isActive: user.isActive,
    coachId: user.coachId,
    coach: user.coach,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('traininweb_auth_token');
      if (!token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      // Verificar token con el backend
      const response = await apiClient.verifyToken(token);
      if (response.success && response.data?.valid) {
        // Obtener datos del usuario
        const userData = localStorage.getItem('traininweb_user_data');
        if (userData) {
          const userFromStorage = JSON.parse(userData);
          const user = mapUserToAuthUser(userFromStorage);
          
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          apiClient.setAuthToken(token);
        }
      } else {
        // Token inválido, limpiar storage
        localStorage.removeItem('traininweb_auth_token');
        localStorage.removeItem('traininweb_user_data');
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      const response = await apiClient.login({ email, password });
      
      if (response.success && response.data) {
        const { user: backendUser, tokens } = response.data;
        
        // Mapear el usuario del backend a AuthUser
        const user = mapUserToAuthUser(backendUser);
        
        // Guardar en localStorage
        localStorage.setItem('traininweb_auth_token', tokens.accessToken);
        localStorage.setItem('traininweb_user_data', JSON.stringify(backendUser));
        
        // Configurar token en apiClient
        apiClient.setAuthToken(tokens.accessToken);
        
        // Actualizar estado
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
        return { success: false, error: response.error || 'Error de autenticación' };
      }
    } catch (error) {
      setState(prev => ({ ...prev, isLoading: false }));
      return { success: false, error: 'Error de conexión' };
    }
  };

  const logout = () => {
    // Limpiar storage
    localStorage.removeItem('traininweb_auth_token');
    localStorage.removeItem('traininweb_user_data');
    
    // Remover token del apiClient
    apiClient.removeAuthToken();
    
    // Actualizar estado
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    
    // Redirigir al home
    window.location.href = '/';
  };

  // Función para obtener la ruta del dashboard según el rol
  const getDashboardRoute = () => {
    if (!state.user) return '/login';
    
    switch (state.user.role) {
      case 'ADMIN':
        return '/admin';
      case 'COACH':
        return '/coach';
      case 'USER':
        return '/dashboard';
      default:
        return '/dashboard';
    }
  };

  // Funciones de permisos
  const canCreateUsers = () => {
    return state.user?.role === 'ADMIN' || state.user?.role === 'COACH';
  };

  const canManageUsers = () => {
    return state.user?.role === 'ADMIN' || state.user?.role === 'COACH';
  };

  const canViewUsers = () => {
    return state.user?.role === 'ADMIN' || state.user?.role === 'COACH';
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth,
    getDashboardRoute,
    canCreateUsers,
    canManageUsers,
    canViewUsers,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
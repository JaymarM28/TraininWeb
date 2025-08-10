"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from '@/infrastructure/http/api-client';
import { User } from '@/shared/types/shared-types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
          const user = JSON.parse(userData);
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
        const { user, tokens } = response.data;
        
        // Guardar en localStorage
        localStorage.setItem('traininweb_auth_token', tokens.accessToken);
        localStorage.setItem('traininweb_user_data', JSON.stringify(user));
        
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

  const value: AuthContextType = {
    ...state,
    login,
    logout,
    checkAuth,
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
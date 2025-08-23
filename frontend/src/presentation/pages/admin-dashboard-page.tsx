// frontend/src/presentation/pages/admin-dashboard-page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/presentation/providers/auth-provider';
import { LoadingSpinner } from '@/presentation/components/ui/loading-spinner';
import { Button } from '@/presentation/components/ui/button';
import { StatsCard, StatsGrid } from '@/presentation/components/ui/stats-card';
import { apiClient } from '@/infrastructure/http/api-client';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Target, 
  TrendingUp, 
  Dumbbell, 
  Calendar,
  MoreVertical,
  Shield,
  UserCheck,
  UserX,
  Eye,
  Edit
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COACH' | 'USER';
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

export function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [coaches, setCoaches] = useState<UserData[]>([]);
  const [clients, setClients] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'COACH' | 'USER'>('USER');

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Cargar todos los usuarios
      const usersResponse = await apiClient.getUsers();
      if (usersResponse.success && usersResponse.data) {
        const allUsers = usersResponse.data;
        setUsers(allUsers);
        setCoaches(allUsers.filter((u: { role: string; }) => u.role === 'COACH'));
        setClients(allUsers.filter((u: { role: string; }) => u.role === 'USER'));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const response = await apiClient.toggleUserStatus(userId);
      if (response.success) {
        await loadDashboardData(); // Recargar datos
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.isActive).length,
    totalCoaches: coaches.length,
    totalClients: clients.length,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando panel de administración..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Panel de Administración
                </h1>
                <p className="text-sm text-zinc-400">
                  Bienvenido, {user?.name} (Administrador)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="primary"
                onClick={() => setShowCreateUserModal(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Crear Usuario
              </Button>
              <Button 
                variant="outline" 
                onClick={logout}
                className="flex items-center gap-2"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Overview */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Resumen General</h2>
          <StatsGrid>
            <StatsCard
              title="Total Usuarios"
              value={stats.totalUsers}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title="Usuarios Activos"
              value={stats.activeUsers}
              trend={{ value: 12, isPositive: true }}
              icon={UserCheck}
              variant="success"
            />
            <StatsCard
              title="Entrenadores"
              value={stats.totalCoaches}
              icon={Shield}
              variant="warning"
            />
            <StatsCard
              title="Clientes"
              value={stats.totalClients}
              icon={Target}
              variant="danger"
            />
          </StatsGrid>
        </section>

        {/* Coaches Management */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Entrenadores</h3>
            </div>
            <Button 
              size="sm"
              onClick={() => {
                setSelectedRole('COACH');
                setShowCreateUserModal(true);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Entrenador
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Nombre</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Cédula</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Estado</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Clientes</th>
                  <th className="text-right py-3 px-4 text-zinc-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {coaches.map((coach) => {
                  const clientCount = clients.filter(c => c.coachId === coach.id).length;
                  return (
                    <tr key={coach.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white font-medium">{coach.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">{coach.email}</td>
                      <td className="py-3 px-4 text-zinc-300">{coach.cedula}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          coach.isActive 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {coach.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">{clientCount}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleUserStatus(coach.id)}
                          >
                            {coach.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Users Management */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Clientes</h3>
            </div>
            <Button 
              size="sm"
              onClick={() => {
                setSelectedRole('USER');
                setShowCreateUserModal(true);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Nombre</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Entrenador</th>
                  <th className="text-left py-3 px-4 text-zinc-400 font-medium">Estado</th>
                  <th className="text-right py-3 px-4 text-zinc-400 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.slice(0, 10).map((client) => (
                  <tr key={client.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <Users className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white font-medium">{client.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-zinc-300">{client.email}</td>
                    <td className="py-3 px-4 text-zinc-300">
                      {client.coach ? client.coach.name : 'Sin asignar'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        client.isActive 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {client.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleUserStatus(client.id)}
                        >
                          {client.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {clients.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                Ver todos los clientes ({clients.length})
              </Button>
            </div>
          )}
        </section>
      </main>

      {/* Modal para crear usuario - Implementar según necesidad */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">
              Crear {selectedRole === 'COACH' ? 'Entrenador' : 'Cliente'}
            </h3>
            <p className="text-zinc-400 mb-4">
              Funcionalidad por implementar - Modal de creación de usuarios
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateUserModal(false)}>
                Cerrar
              </Button>
              <Button>Crear</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
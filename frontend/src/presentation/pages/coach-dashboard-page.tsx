// frontend/src/presentation/pages/coach-dashboard-page.tsx
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
  Shield, 
  Target, 
  TrendingUp, 
  Dumbbell, 
  Calendar,
  Activity,
  MessageCircle,
  UserCheck,
  UserX,
  Eye,
  Plus
} from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COACH' | 'USER';
  cedula: string;
  isActive: boolean;
  coachId?: string;
  createdAt: string;
  updatedAt: string;
}

export function CoachDashboardPage() {
  const { user, logout } = useAuth();
  const [clients, setClients] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateClientModal, setShowCreateClientModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Cargar clientes asignados a este coach
      const response = await apiClient.getUsers('USER');
      if (response.success && response.data) {
        setClients(response.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleClientStatus = async (clientId: string) => {
    try {
      const response = await apiClient.toggleUserStatus(clientId);
      if (response.success) {
        await loadDashboardData(); // Recargar datos
      }
    } catch (error) {
      console.error('Error toggling client status:', error);
    }
  };

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.isActive).length,
    inactiveClients: clients.filter(c => !c.isActive).length,
    newClientsThisMonth: 3, // Esto se calcularía basado en fechas reales
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Cargando panel de entrenador..." />
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Panel de Entrenador
                </h1>
                <p className="text-sm text-zinc-400">
                  Bienvenido, {user?.name} (Entrenador)
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="primary"
                onClick={() => setShowCreateClientModal(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Nuevo Cliente
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
          <h2 className="text-2xl font-bold text-white mb-6">Resumen de Clientes</h2>
          <StatsGrid>
            <StatsCard
              title="Total Clientes"
              value={stats.totalClients}
              icon={Users}
              variant="default"
            />
            <StatsCard
              title="Clientes Activos"
              value={stats.activeClients}
              trend={{ value: 15, isPositive: true }}
              icon={UserCheck}
              variant="success"
            />
            <StatsCard
              title="Nuevos este Mes"
              value={stats.newClientsThisMonth}
              trend={{ value: 25, isPositive: true }}
              icon={TrendingUp}
              variant="warning"
            />
            <StatsCard
              title="Entrenamientos Hoy"
              value="8"
              icon={Activity}
              variant="danger"
            />
          </StatsGrid>
        </section>

        {/* Quick Actions */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <h3 className="text-xl font-bold text-white mb-6">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:from-blue-500/30 hover:to-blue-600/30"
              onClick={() => setShowCreateClientModal(true)}
            >
              <UserPlus className="h-6 w-6" />
              <span>Agregar Cliente</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => window.location.href = '/exercises'}
            >
              <Dumbbell className="h-6 w-6" />
              <span>Crear Rutina</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Programar Sesión</span>
            </Button>
          </div>
        </section>

        {/* Clients Management */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Mis Clientes</h3>
            </div>
            <Button 
              size="sm"
              onClick={() => setShowCreateClientModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Cliente
            </Button>
          </div>

          {clients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Cliente</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Estado</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Último Entrenamiento</th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">Próxima Sesión</th>
                    <th className="text-right py-3 px-4 text-zinc-400 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <span className="text-white font-medium block">{client.name}</span>
                            <span className="text-zinc-400 text-sm">{client.cedula}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">{client.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          client.isActive 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {client.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-zinc-300">Hace 2 días</td>
                      <td className="py-3 px-4 text-zinc-300">Mañana 9:00 AM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Ver progreso"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            title="Enviar mensaje"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleToggleClientStatus(client.id)}
                            title={client.isActive ? 'Desactivar' : 'Activar'}
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
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-zinc-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">No tienes clientes aún</h4>
              <p className="text-zinc-400 mb-6">Comienza agregando tu primer cliente para gestionar sus entrenamientos</p>
              <Button onClick={() => setShowCreateClientModal(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Agregar Primer Cliente
              </Button>
            </div>
          )}
        </section>

        {/* Recent Activity */}
        <section className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Actividad Reciente</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">Juan Pérez completó "Rutina de Fuerza"</p>
                  <p className="text-sm text-zinc-400">Hace 2 horas</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">María García inició "Cardio Intenso"</p>
                  <p className="text-sm text-zinc-400">Hace 4 horas</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="text-white font-medium">Carlos López programó una sesión</p>
                  <p className="text-sm text-zinc-400">Hace 6 horas</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Modal para crear cliente - Placeholder */}
      {showCreateClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-700 max-w-md w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">
              Agregar Nuevo Cliente
            </h3>
            <p className="text-zinc-400 mb-4">
              Funcionalidad por implementar - Modal de creación de clientes
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowCreateClientModal(false)}>
                Cerrar
              </Button>
              <Button>Crear Cliente</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
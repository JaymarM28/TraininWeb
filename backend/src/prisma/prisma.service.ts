import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Conectar a la base de datos cuando el módulo se inicializa
    await this.$connect();
    console.log('✅ Conectado a la base de datos PostgreSQL');
  }

  async onModuleDestroy() {
    // Desconectar cuando la aplicación se cierra
    await this.$disconnect();
    console.log('❌ Desconectado de la base de datos');
  }

  // Método para limpiar la base de datos (útil para testing)
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') return;
    
    const tables = ['routine_exercises', 'routines', 'exercises', 'users'];
    
    for (const table of tables) {
      await this.$executeRawUnsafe(`DELETE FROM "${table}";`);
    }
  }

  // Método para verificar la conexión
  async isHealthy(): Promise<boolean> {
    try {
      await this.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('❌ Error de conexión a la base de datos:', error);
      return false;
    }
  }
}
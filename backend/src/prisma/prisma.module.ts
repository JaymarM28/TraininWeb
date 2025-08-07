import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Hace que el servicio esté disponible globalmente
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporta para que otros módulos lo puedan usar
})
export class PrismaModule {}
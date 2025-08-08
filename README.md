# 🏋️ TraininWeb - Plataforma Completa de Entrenamiento

## 📋 Descripción

TraininWeb es una plataforma web completa para gimnasios y entrenadores personales, permitiendo la gestión de entrenamientos, ejercicios y seguimiento de usuarios. El proyecto implementa una arquitectura moderna con separación clara entre frontend y backend.

## 🏗️ Arquitectura del Proyecto

### Frontend (Next.js + React + TypeScript)
- **Framework**: Next.js 14 con App Router
- **UI**: React + Tailwind CSS
- **Arquitectura**: Hexagonal (Ports and Adapters) + Clean Architecture
- **Estado**: TypeScript para type safety

### Backend (NestJS + PostgreSQL)
- **Framework**: NestJS con TypeScript
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT + Passport
- **Arquitectura**: Hexagonal + Clean Architecture

## 📁 Estructura del Proyecto

```
TraininWeb/
├── frontend/                 # 🎨 Aplicación Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 14)
│   │   ├── core/            # 🧠 Lógica de negocio
│   │   ├── infrastructure/  # 🏢 Adaptadores externos
│   │   ├── presentation/    # 🎨 Componentes React
│   │   └── shared/          # 🔄 Código compartido
│   ├── package.json
│   └── README.md
├── backend/                  # ⚙️ API NestJS
│   ├── src/
│   │   ├── modules/         # 📦 Módulos de la aplicación
│   │   ├── common/          # 🔧 Utilidades compartidas
│   │   ├── shared/          # 🔄 Código compartido
│   │   └── infrastructure/  # 🏢 Capa de infraestructura
│   ├── prisma/              # 🗄️ Esquemas de base de datos
│   ├── package.json
│   └── README.md
└── README.md                # 📖 Este archivo
```

## 🚀 Cómo Ejecutar el Proyecto

### Prerrequisitos

1. **Node.js** (versión 18 o superior)
2. **npm** o **pnpm** (gestor de paquetes)
3. **Git** (control de versiones)
4. **PostgreSQL** (base de datos)

### Instalación de Dependencias

#### Frontend
```bash
# Navegar al directorio del frontend
cd TraininWeb/frontend

# Instalar dependencias
npm install
# o
pnpm install
```

#### Backend
```bash
# Navegar al directorio del backend
cd TraininWeb/backend

# Instalar dependencias
npm install
# o
pnpm install
```

### Configuración de la Base de Datos

1. **Instalar PostgreSQL** en tu sistema
2. **Crear una base de datos** para el proyecto
3. **Configurar variables de entorno**:

```bash
# En TraininWeb/backend/
cp .env.example .env

# Editar .env con tus credenciales
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/traininweb"
```

4. **Ejecutar migraciones**:
```bash
cd TraininWeb/backend
npx prisma generate
npx prisma migrate dev
```

### Ejecutar el Proyecto

#### Frontend (Puerto 3000)
```bash
# Navegar al directorio del frontend
cd TraininWeb/frontend

# Ejecutar en modo desarrollo
npm run dev
# o
pnpm dev
```

**Resultado esperado**:
```
> frontend@0.1.0 dev
> next dev --turbopack

   - Local:        http://localhost:3000
   - Network:      http://192.168.100.72:3000

 ✓ Starting...
 ✓ Ready in 2.1s
```

#### Backend (Puerto 3001)
```bash
# Navegar al directorio del backend
cd TraininWeb/backend

# Ejecutar en modo desarrollo
npm run start:dev
# o
pnpm start:dev
```

**Resultado esperado**:
```
[Nest] 1234   - 12/01/2024, 10:30:00 AM   [NestFactory] Starting Nest application...
[Nest] 1234   - 12/01/2024, 10:30:00 AM   [InstanceLoader] AppModule dependencies initialized
[Nest] 1234   - 12/01/2024, 10:30:00 AM   [RoutesResolver] AppController {/}
[Nest] 1234   - 12/01/2024, 10:30:00 AM   [RouterExplorer] Mapped {/, GET} route
[Nest] 1234   - 12/01/2024, 10:30:00 AM   [NestApplication] Nest application successfully started
```

## 🌐 Acceso a la Aplicación

### Frontend
- **URL Local**: http://localhost:3000
- **URL Red**: http://192.168.100.72:3000 (acceso desde otros dispositivos)

### Backend API
- **URL Local**: http://localhost:3001
- **Documentación Swagger**: http://localhost:3001/api/docs

## 📱 Entidades del Dominio

### User (Usuario)
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}
```

### Workout (Entrenamiento)
```typescript
interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  duration: number;
  difficulty: DifficultyLevel;
  createdBy: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Exercise (Ejercicio)
```typescript
interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: MuscleGroup[];
  equipment: Equipment[];
  instructions: string[];
  videoUrl?: string;
  imageUrl?: string;
  difficulty: DifficultyLevel;
  createdAt: Date;
  updatedAt: Date;
}
```

### TrainingPlan (Plan de Entrenamiento)
```typescript
interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  workouts: Workout[];
  duration: number; // semanas
  frequency: number; // entrenamientos por semana
  userId: string;
  isActive: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
```

### Progress (Progreso)
```typescript
interface Progress {
  id: string;
  userId: string;
  workoutId: string;
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  duration: number;
  notes: string;
  completedAt: Date;
  createdAt: Date;
}
```

## 🛠️ Comandos Útiles

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint

# Testing
npm run test
```

### Backend
```bash
# Desarrollo
npm run start:dev

# Build
npm run build

# Producción
npm run start:prod

# Testing
npm run test
npm run test:e2e

# Base de datos
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=TraininWeb
```

#### Backend (.env)
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/traininweb"
JWT_SECRET="tu-secreto-jwt-super-seguro"
PORT=3001
NODE_ENV=development
```

### Configuración de TypeScript

El proyecto incluye path mapping para facilitar las importaciones:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["../backend/src/common/*"],
      "@types/*": ["../backend/src/types/*"],
      "@contracts/*": ["./src/shared/contracts/*"]
    }
  }
}
```

## 🧪 Testing

### Frontend
```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

### Backend
```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

## 📊 Monitoreo y Logging

### Frontend
- **Hot Reload**: Cambios automáticos en desarrollo
- **Error Boundaries**: Captura de errores en React
- **Performance**: Métricas de Next.js

### Backend
- **Request/Response Logging**: Todas las peticiones HTTP
- **Error Logging**: Stack traces completos
- **Health Checks**: `/health`, `/health/db`

## 🔒 Seguridad

### Autenticación
- **JWT Tokens**: Access tokens con refresh tokens
- **Passport Strategies**: Múltiples estrategias de autenticación
- **Guards**: Protección de rutas por roles

### Validación
- **Frontend**: Validación de formularios con React Hook Form
- **Backend**: DTOs con class-validator
- **SQL Injection Protection**: Prisma ORM

## 📈 Próximos Pasos

### Configuración Inmediata
1. ✅ **Estructura del proyecto** - Completada
2. ✅ **Arquitectura hexagonal** - Implementada
3. ✅ **Documentación** - Completada
4. 🔄 **Configurar base de datos** - En progreso
5. 🔄 **Implementar autenticación** - Pendiente

### Desarrollo de Funcionalidades
1. **Auth Module**: Login, registro, refresh tokens
2. **Users Module**: CRUD de usuarios y perfiles
3. **Workouts Module**: Gestión de entrenamientos
4. **Exercises Module**: Catálogo de ejercicios
5. **Training Plans Module**: Planes personalizados
6. **Progress Module**: Seguimiento de progreso

### UI/UX
1. **Landing Page**: Página de inicio atractiva
2. **Dashboard**: Panel principal de usuario
3. **Formularios**: Login, registro, creación de entrenamientos
4. **Componentes**: Header, sidebar, cards, modals
5. **Responsive Design**: Adaptación móvil

### Testing y Calidad
1. **Tests Unitarios**: Cobertura del 80%+
2. **Tests de Integración**: Flujos completos
3. **Tests E2E**: Validación de endpoints
4. **CI/CD**: Pipeline automatizado

### Despliegue
1. **Frontend**: Vercel o Netlify
2. **Backend**: Docker + Cloud (AWS, GCP, Azure)
3. **Base de Datos**: PostgreSQL en la nube
4. **Monitoring**: Logs y métricas en producción

## 🐛 Solución de Problemas

### Frontend no carga
```bash
# Verificar que el puerto 3000 esté libre
netstat -ano | findstr :3000

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Limpiar cache de Next.js
npm run dev -- --clear
```

### Backend no conecta a la base de datos
```bash
# Verificar variables de entorno
cat .env

# Verificar conexión a PostgreSQL
psql -h localhost -U usuario -d traininweb

# Regenerar cliente de Prisma
npx prisma generate
```

### Errores de TypeScript
```bash
# Verificar configuración
npx tsc --noEmit

# Limpiar cache
rm -rf .next
npm run dev
```

## 📚 Recursos Adicionales

### Frontend
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Backend
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Arquitectura
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Esteban** - *Desarrollo Frontend*
- **Jaymar** - *Desarrollo Backend*

---

**¡Disfruta desarrollando TraininWeb! 🚀**

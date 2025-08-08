# TraininWeb Backend

## 📋 Descripción

Backend de la plataforma TraininWeb construido con **NestJS**, implementando una arquitectura hexagonal (Ports and Adapters) combinada con Clean Architecture y Domain-Driven Design (DDD). Esta arquitectura proporciona una base sólida para el desarrollo de APIs escalables y mantenibles.

## 🏗️ Arquitectura Hexagonal

### Principios Arquitectónicos

- **Separación de Responsabilidades**: Cada capa tiene una responsabilidad específica y bien definida
- **Inversión de Dependencias**: Las dependencias apuntan hacia el dominio, no hacia frameworks externos
- **Independencia de Frameworks**: El dominio de negocio es independiente de NestJS y otras tecnologías
- **Testabilidad**: Cada componente puede ser testeado de forma aislada

### Estructura de Carpetas

```
src/
├── common/                    # 🔧 Utilidades y configuraciones compartidas
│   ├── constants/            # Constantes de la aplicación
│   ├── decorators/          # Decoradores personalizados
│   ├── filters/             # Filtros de excepción
│   ├── guards/              # Guards de autenticación
│   ├── interceptors/        # Interceptores HTTP
│   ├── pipes/               # Pipes de validación
│   └── types/               # Tipos compartidos
├── modules/                  # 📦 Módulos de la aplicación
│   ├── auth/                # Autenticación y autorización
│   ├── users/               # Gestión de usuarios
│   ├── workouts/            # Gestión de entrenamientos
│   ├── exercises/           # Gestión de ejercicios
│   ├── training-plans/      # Planes de entrenamiento
│   └── progress/            # Seguimiento de progreso
├── shared/                   # 🔄 Código compartido entre módulos
│   ├── contracts/           # Contratos de API
│   ├── dto/                 # Data Transfer Objects
│   ├── entities/            # Entidades de dominio
│   └── interfaces/          # Interfaces compartidas
├── infrastructure/           # 🏢 Capa de infraestructura
│   ├── database/            # Configuración de base de datos
│   ├── http/                # Configuración HTTP
│   └── external/            # Servicios externos
└── main.ts                  # Punto de entrada de la aplicación
```

## 🎯 Beneficios para TraininWeb

### Escalabilidad
- **Módulos Independientes**: Cada módulo puede evolucionar independientemente
- **Arquitectura Distribuida**: Preparado para microservicios futuros
- **Caching Estratégico**: Implementación de cache por módulo

### Testabilidad
- **Tests Unitarios**: Cada componente puede ser testeado aisladamente
- **Tests de Integración**: Pruebas de flujos completos
- **Tests E2E**: Validación de endpoints completos

### Mantenibilidad
- **Código Limpio**: Estructura clara y consistente
- **Documentación Automática**: Swagger/OpenAPI integrado
- **Logging Centralizado**: Trazabilidad completa

### Flexibilidad
- **Cambios de Base de Datos**: Fácil migración entre bases de datos
- **APIs Externas**: Integración simple con servicios externos
- **Configuración Dinámica**: Variables de entorno por ambiente

## 🏛️ Entidades de Dominio

### User (Usuario)
```typescript
interface User {
  id: string;
  email: string;
  password: string;
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

## 🛠️ Tecnologías Utilizadas

### Core Framework
- **NestJS**: Framework progresivo de Node.js
- **TypeScript**: Tipado estático para mayor robustez
- **Node.js**: Runtime de JavaScript

### Base de Datos
- **PostgreSQL**: Base de datos relacional
- **Prisma**: ORM moderno con type safety
- **Migrations**: Control de versiones de esquema

### Autenticación y Seguridad
- **JWT**: JSON Web Tokens para autenticación
- **Passport**: Estrategias de autenticación
- **bcryptjs**: Hashing seguro de contraseñas
- **class-validator**: Validación de datos

### Documentación y Testing
- **Swagger/OpenAPI**: Documentación automática de APIs
- **Jest**: Framework de testing
- **Supertest**: Testing de endpoints HTTP

### Desarrollo
- **ESLint**: Linting de código
- **Prettier**: Formateo de código
- **Hot Reload**: Desarrollo en tiempo real

## 📝 Convenciones de Nomenclatura

### Archivos y Carpetas
- **PascalCase**: Para clases, interfaces, tipos
- **camelCase**: Para variables, funciones, métodos
- **kebab-case**: Para archivos y carpetas
- **UPPER_SNAKE_CASE**: Para constantes

### Estructura de Módulos
```
modules/
├── [module-name]/
│   ├── dto/
│   │   ├── create-[entity].dto.ts
│   │   ├── update-[entity].dto.ts
│   │   └── index.ts
│   ├── entities/
│   │   └── [entity].entity.ts
│   ├── [module-name].controller.ts
│   ├── [module-name].service.ts
│   ├── [module-name].module.ts
│   └── [module-name].spec.ts
```

### Nomenclatura de Endpoints
- **GET** `/api/[module]` - Obtener lista
- **GET** `/api/[module]/:id` - Obtener por ID
- **POST** `/api/[module]` - Crear
- **PUT** `/api/[module]/:id` - Actualizar completo
- **PATCH** `/api/[module]/:id` - Actualizar parcial
- **DELETE** `/api/[module]/:id` - Eliminar

## 🚀 Configuración del Proyecto

### Instalación de Dependencias
```bash
npm install
```

### Configuración de Base de Datos
```bash
# Configurar variables de entorno
cp .env.example .env

# Generar cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev
```

### Desarrollo
```bash
# Modo desarrollo con hot reload
npm run start:dev

# Modo debug
npm run start:debug
```

### Testing
```bash
# Tests unitarios
npm run test

# Tests con coverage
npm run test:cov

# Tests e2e
npm run test:e2e
```

### Producción
```bash
# Build del proyecto
npm run build

# Ejecutar en producción
npm run start:prod
```

## 🔗 Integración con Frontend

### API Contracts
Los contratos de API están definidos en `src/shared/contracts/` para asegurar consistencia entre frontend y backend:

```typescript
// Ejemplo de contrato de API
export interface AuthApiContract {
  login(credentials: LoginDto): Promise<AuthResponse>;
  register(userData: RegisterDto): Promise<AuthResponse>;
  refreshToken(token: string): Promise<AuthResponse>;
  logout(): Promise<void>;
}
```

### Tipos Compartidos
Los tipos TypeScript están centralizados en `src/shared/types/` para mantener consistencia:

```typescript
// Tipos compartidos entre frontend y backend
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  // ... más propiedades
}
```

### Validación de Datos
DTOs con validación automática usando `class-validator`:

```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;
}
```

## 📊 Monitoreo y Logging

### Logging Estratégico
- **Request/Response**: Logging automático de todas las peticiones
- **Errores**: Captura y logging de errores con stack traces
- **Performance**: Métricas de tiempo de respuesta
- **Business Events**: Eventos importantes del negocio

### Health Checks
```typescript
// Endpoints de salud del sistema
GET /health          // Estado general
GET /health/db       // Estado de base de datos
GET /health/redis    // Estado de cache
```

## 🔒 Seguridad

### Autenticación
- **JWT Tokens**: Access tokens con refresh tokens
- **Passport Strategies**: Múltiples estrategias de autenticación
- **Guards**: Protección de rutas por roles

### Autorización
- **Role-based Access Control (RBAC)**: Control de acceso por roles
- **Resource-based Permissions**: Permisos granulares por recurso
- **API Rate Limiting**: Protección contra abuso

### Validación
- **Input Validation**: Validación automática de datos de entrada
- **SQL Injection Protection**: Protección mediante Prisma ORM
- **XSS Protection**: Headers de seguridad automáticos

## 🧪 Testing Strategy

### Tests Unitarios
```typescript
describe('UserService', () => {
  it('should create a new user', async () => {
    // Arrange
    const createUserDto = { /* ... */ };
    
    // Act
    const result = await userService.create(createUserDto);
    
    // Assert
    expect(result).toBeDefined();
    expect(result.email).toBe(createUserDto.email);
  });
});
```

### Tests de Integración
```typescript
describe('UserController (e2e)', () => {
  it('/api/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/users')
      .send(createUserDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toBe(createUserDto.email);
      });
  });
});
```

## 📈 Próximos Pasos

### Configuración Inmediata
1. **Configurar Base de Datos**: PostgreSQL y Prisma
2. **Variables de Entorno**: Configurar `.env` para desarrollo
3. **Autenticación JWT**: Implementar guards y estrategias
4. **CORS**: Configurar para frontend
5. **Swagger**: Documentación automática de APIs

### Implementación de Módulos
1. **Auth Module**: Login, registro, refresh tokens
2. **Users Module**: CRUD de usuarios y perfiles
3. **Workouts Module**: Gestión de entrenamientos
4. **Exercises Module**: Catálogo de ejercicios
5. **Training Plans Module**: Planes personalizados
6. **Progress Module**: Seguimiento de progreso

### Conectividad con Frontend
1. **API Endpoints**: Implementar todos los contratos definidos
2. **Interceptores**: Manejo centralizado de errores
3. **Validación**: DTOs con class-validator
4. **Tipos**: Exportar tipos compartidos

### Testing y Calidad
1. **Tests Unitarios**: Cobertura del 80%+
2. **Tests de Integración**: Flujos completos
3. **Tests E2E**: Validación de endpoints
4. **CI/CD**: Pipeline automatizado

### Despliegue
1. **Docker**: Containerización de la aplicación
2. **Environment**: Configuración por ambientes
3. **Database**: Migraciones automáticas
4. **Monitoring**: Logs y métricas en producción

---

## 📚 Recursos Adicionales

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT.io](https://jwt.io/) - Para entender JWT tokens
- [Swagger Documentation](https://swagger.io/docs/) - Para documentación de APIs

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

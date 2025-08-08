# 🏗️ Arquitectura Hexagonal - TraininWeb Frontend

## 📋 Resumen Ejecutivo

TraininWeb Frontend implementa una **Arquitectura Hexagonal (Puertos y Adaptadores)** combinada con **Clean Architecture** y **Domain-Driven Design (DDD)**. Esta arquitectura garantiza:

- ✅ **Separación clara de responsabilidades**
- ✅ **Independencia de frameworks**
- ✅ **Testabilidad mejorada**
- ✅ **Escalabilidad y mantenibilidad**
- ✅ **Código limpio y organizado**

## 🎯 Capas de la Arquitectura

### 1. **Core Layer** (`@/core/`)
**Responsabilidad**: Lógica de negocio pura e independiente de frameworks

#### Domain (`@/core/domain/`)
```typescript
// Entidades del dominio
entities/
├── user/
├── workout/
├── exercise/
├── training-plan/
└── progress/

// Objetos de valor
value-objects/
├── email.ts
├── password.ts
└── workout-duration.ts

// Interfaces de repositorios
repositories/
├── user-repository.interface.ts
├── workout-repository.interface.ts
└── exercise-repository.interface.ts

// Servicios del dominio
services/
├── workout-validation.service.ts
└── progress-calculation.service.ts
```

#### Application (`@/core/application/`)
```typescript
// Casos de uso
use-cases/
├── user/
│   ├── get-user-profile.use-case.ts
│   └── update-user-profile.use-case.ts
├── workout/
│   ├── create-workout.use-case.ts
│   └── get-workout-details.use-case.ts
└── exercise/
    ├── search-exercises.use-case.ts
    └── get-exercise-details.use-case.ts

// DTOs (Data Transfer Objects)
dto/
├── user-dto.ts
├── workout-dto.ts
└── exercise-dto.ts

// Mapeadores entre capas
mappers/
├── user-mapper.ts
├── workout-mapper.ts
└── exercise-mapper.ts
```

#### Ports (`@/core/ports/`)
```typescript
// Puertos de entrada (driving adapters)
ports/
├── input/
│   ├── user-service.port.ts
│   ├── workout-service.port.ts
│   └── exercise-service.port.ts

// Puertos de salida (driven adapters)
├── output/
│   ├── user-repository.port.ts
│   ├── workout-repository.port.ts
│   └── exercise-repository.port.ts
```

### 2. **Infrastructure Layer** (`@/infrastructure/`)
**Responsabilidad**: Implementaciones técnicas y adaptadores externos

```typescript
infrastructure/
├── adapters/           # Adaptadores para servicios externos
│   ├── auth-adapter.ts
│   ├── storage-adapter.ts
│   └── notification-adapter.ts

├── repositories/       # Implementaciones de repositorios
│   ├── user-repository.impl.ts
│   ├── workout-repository.impl.ts
│   └── exercise-repository.impl.ts

├── services/          # Servicios de infraestructura
│   ├── auth.service.ts
│   ├── storage.service.ts
│   └── notification.service.ts

├── http/             # Cliente HTTP y configuraciones
│   ├── api-client.ts
│   ├── interceptors.ts
│   └── error-handler.ts

├── storage/          # Almacenamiento local
│   ├── local-storage.service.ts
│   ├── session-storage.service.ts
│   └── indexed-db.service.ts

└── config/           # Configuraciones de la aplicación
    ├── app.config.ts
    ├── api.config.ts
    └── feature-flags.config.ts
```

### 3. **Presentation Layer** (`@/presentation/`)
**Responsabilidad**: Interfaz de usuario y componentes React

```typescript
presentation/
├── pages/            # Páginas de la aplicación
│   ├── dashboard/
│   ├── workouts/
│   ├── exercises/
│   └── profile/

├── components/       # Componentes reutilizables
│   ├── ui/          # Componentes base
│   │   ├── button/
│   │   ├── input/
│   │   └── modal/
│   ├── forms/       # Componentes de formularios
│   ├── layout/      # Componentes de layout
│   └── features/    # Componentes específicos de features

├── hooks/           # Custom hooks de React
│   ├── use-auth.ts
│   ├── use-workouts.ts
│   └── use-exercises.ts

├── providers/       # Context providers
│   ├── auth-provider.tsx
│   ├── theme-provider.tsx
│   └── workout-provider.tsx

├── layouts/         # Layouts de la aplicación
│   ├── main-layout.tsx
│   ├── dashboard-layout.tsx
│   └── auth-layout.tsx

└── styles/          # Estilos y configuraciones CSS
    ├── globals.css
    ├── components.css
    └── utilities.css
```

### 4. **Shared Layer** (`@/shared/`)
**Responsabilidad**: Código compartido entre todas las capas

```typescript
shared/
├── utils/           # Utilidades generales
│   ├── date.utils.ts
│   ├── string.utils.ts
│   └── validation.utils.ts

├── constants/       # Constantes de la aplicación
│   ├── paths.ts
│   ├── api-endpoints.ts
│   └── app-constants.ts

├── types/           # Tipos TypeScript compartidos
│   ├── index.ts
│   ├── api.types.ts
│   └── ui.types.ts

├── interfaces/      # Interfaces compartidas
│   ├── repository.interface.ts
│   ├── service.interface.ts
│   └── adapter.interface.ts

└── helpers/         # Funciones auxiliares
    ├── error.helper.ts
    ├── format.helper.ts
    └── storage.helper.ts
```

## 🔄 Flujo de Dependencias

```
Presentation Layer
       ↓
Application Layer (Use Cases)
       ↓
Domain Layer (Entities & Business Logic)
       ↑
Infrastructure Layer (Adapters & External Services)
```

### Principios de Dependencia:

1. **Las capas externas dependen de las internas**
2. **Las capas internas NO dependen de las externas**
3. **La comunicación se hace a través de interfaces (puertos)**
4. **El dominio es completamente independiente**

## 📝 Ejemplo de Implementación

### 1. Definir Entidad del Dominio
```typescript
// @/core/domain/entities/user/user.entity.ts
export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly profile: UserProfile,
    public readonly preferences: UserPreferences
  ) {}

  updateProfile(newProfile: Partial<UserProfile>): User {
    return new User(
      this.id,
      this.email,
      { ...this.profile, ...newProfile },
      this.preferences
    );
  }
}
```

### 2. Definir Puerto (Interface)
```typescript
// @/core/ports/output/user-repository.port.ts
export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
```

### 3. Implementar Caso de Uso
```typescript
// @/core/application/use-cases/user/update-user-profile.use-case.ts
export class UpdateUserProfileUseCase {
  constructor(private userRepository: UserRepositoryPort) {}

  async execute(userId: string, profileData: Partial<UserProfile>): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = user.updateProfile(profileData);
    return this.userRepository.save(updatedUser);
  }
}
```

### 4. Implementar Adaptador
```typescript
// @/infrastructure/repositories/user-repository.impl.ts
export class UserRepositoryImpl implements UserRepositoryPort {
  constructor(private apiClient: ApiClient) {}

  async findById(id: string): Promise<User | null> {
    const response = await this.apiClient.get(`/api/users/${id}`);
    return response.success ? UserMapper.toDomain(response.data) : null;
  }

  async save(user: User): Promise<User> {
    const dto = UserMapper.toDto(user);
    const response = await this.apiClient.post('/api/users', dto);
    return UserMapper.toDomain(response.data);
  }
}
```

### 5. Usar en Componente React
```typescript
// @/presentation/components/forms/user-profile-form.tsx
export const UserProfileForm: React.FC = () => {
  const { updateProfile, loading } = useUpdateUserProfile();

  const handleSubmit = async (data: UserProfileFormData) => {
    await updateProfile(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

## 🧪 Testing Strategy

### 1. **Domain Layer** - Unit Tests
```typescript
// @/core/domain/entities/user/__tests__/user.entity.test.ts
describe('User Entity', () => {
  it('should update profile correctly', () => {
    const user = new User('1', 'test@example.com', profile, preferences);
    const updatedUser = user.updateProfile({ firstName: 'John' });
    
    expect(updatedUser.profile.firstName).toBe('John');
  });
});
```

### 2. **Application Layer** - Integration Tests
```typescript
// @/core/application/use-cases/user/__tests__/update-user-profile.use-case.test.ts
describe('UpdateUserProfileUseCase', () => {
  it('should update user profile', async () => {
    const mockRepository = createMockUserRepository();
    const useCase = new UpdateUserProfileUseCase(mockRepository);
    
    const result = await useCase.execute('1', { firstName: 'John' });
    
    expect(result.profile.firstName).toBe('John');
  });
});
```

### 3. **Presentation Layer** - Component Tests
```typescript
// @/presentation/components/forms/__tests__/user-profile-form.test.tsx
describe('UserProfileForm', () => {
  it('should submit form data', async () => {
    const mockUpdateProfile = jest.fn();
    render(<UserProfileForm updateProfile={mockUpdateProfile} />);
    
    fireEvent.click(screen.getByText('Save'));
    
    expect(mockUpdateProfile).toHaveBeenCalled();
  });
});
```

## 🚀 Beneficios de esta Arquitectura

### ✅ **Mantenibilidad**
- Código organizado y fácil de entender
- Responsabilidades bien definidas
- Fácil localización de bugs

### ✅ **Testabilidad**
- Testing unitario simplificado
- Mocks fáciles de implementar
- Cobertura de código alta

### ✅ **Escalabilidad**
- Fácil agregar nuevas funcionalidades
- Módulos independientes
- Código reutilizable

### ✅ **Flexibilidad**
- Cambios de UI sin afectar lógica
- Cambios de API sin afectar dominio
- Migración de tecnologías simplificada

## 📋 Próximos Pasos

1. **Implementar entidades del dominio**
2. **Crear casos de uso básicos**
3. **Configurar adaptadores de infraestructura**
4. **Desarrollar componentes de UI**
5. **Configurar testing con Jest y React Testing Library**
6. **Implementar sistema de autenticación**
7. **Configurar estado global con Context API o Zustand**

---

*Esta arquitectura garantiza un código limpio, mantenible y escalable para TraininWeb.*

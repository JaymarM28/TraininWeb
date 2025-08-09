# TraininWeb Frontend - Arquitectura Hexagonal + DDD

## 🏗️ Arquitectura del Proyecto

Este proyecto implementa una **Arquitectura Hexagonal (Puertos y Adaptadores)** combinada con **Clean Architecture** y **Domain-Driven Design (DDD)**.

### 📁 Estructura de Carpetas

```
src/
├── app/                      # App Router (solo orquestación)
│   ├── layout.tsx            # usa presentation/layouts/MainLayout
│   ├── page.tsx              # delega a presentation/pages/HomePage
│   ├── exercises/page.tsx    # delega a presentation/pages/ExercisesPage
│   └── routines/page.tsx     # delega a presentation/pages/RoutinesPage
├── core/                     # 🎯 Núcleo (Domain + Application + Ports)
│   ├── domain/{entities,value-objects,repositories,services}
│   ├── application/{use-cases,dto,mappers}
│   └── ports/
├── infrastructure/           # 🔌 Adaptadores externos
│   ├── http/api-client.ts
│   └── {adapters,repositories,services,storage,config}
├── presentation/             # 🎨 UI
│   ├── components/
│   │   ├── layout/{header,footer}.tsx
│   │   ├── ui/{button,nav-link,brand-logo}.tsx
│   │   ├── mobile/drawer.tsx
│   │   └── {aurora-text,sparkle-particles,exercise-card,routine-card}.tsx
│   ├── layouts/main-layout.tsx
│   ├── pages/{home-page,exercises-page,routines-page}.tsx
│   └── providers/theme-provider.tsx
└── shared/                   # 🔄 Contratos/Tipos/Utilidades compartidas FE/BE
    ├── constants/paths.ts
    ├── contracts/api-contracts.ts
    ├── types/{shared-types.ts,index.ts}
    ├── utils/cn.ts
    └── exercise/            # módulo compartido de ejercicios
```

## 🎯 Principios de la Arquitectura

### 1. **Separación de Responsabilidades**
- **Domain**: Lógica de negocio pura
- **Application**: Casos de uso y orquestación
- **Infrastructure**: Implementaciones técnicas
- **Presentation**: Interfaz de usuario

### 2. **Inversión de Dependencias**
- Las capas internas no dependen de las externas
- Las dependencias apuntan hacia adentro
- Uso de interfaces (puertos) para desacoplar

### 3. **Independencia de Frameworks**
- El dominio es independiente de Next.js/React
- Fácil migración a otros frameworks
- Testing simplificado

## 🚀 Beneficios para TraininWeb

### ✅ **Escalabilidad**
- Fácil agregar nuevas funcionalidades
- Módulos independientes
- Código mantenible

### ✅ **Testabilidad**
- Testing unitario simplificado
- Mocks fáciles de implementar
- Cobertura de código alta

### ✅ **Mantenibilidad**
- Código organizado y claro
- Responsabilidades bien definidas
- Fácil debugging

### ✅ **Flexibilidad**
- Cambios de UI sin afectar lógica
- Cambios de API sin afectar dominio
- Migración de tecnologías simplificada

## 📋 Entidades del Dominio (TraininWeb)

### 🏃‍♂️ **User**
- Información del usuario
- Perfil de entrenamiento
- Preferencias

### 💪 **Workout**
- Sesiones de entrenamiento
- Ejercicios incluidos
- Métricas de rendimiento

### 🏋️‍♂️ **Exercise**
- Ejercicios disponibles
- Categorías y músculos
- Instrucciones y videos

### 📅 **TrainingPlan**
- Planes de entrenamiento
- Progresión y periodización
- Objetivos y metas

### 📊 **Progress**
- Seguimiento de progreso
- Métricas y estadísticas
- Gráficos y reportes

## 🔧 Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **React** - Biblioteca de UI
- **ESLint** - Linting de código
- **Arquitectura Hexagonal** - Patrón arquitectónico

## 📝 Convenciones de Nomenclatura

- **CamelCase**: Variables, funciones, métodos
- **PascalCase**: Clases, interfaces, tipos
- **kebab-case**: Nombres de archivos y carpetas
- **UPPER_SNAKE_CASE**: Constantes

## 📦 Dependencias instaladas hoy

- lightswind@latest
- clsx
- tailwind-merge
- framer-motion
- lucide-react

## ✅ Cambios de hoy
- Header/Drawer sólidos y navegación con pills.
- `Header` movido a `presentation/components/layout/header.tsx` y `Footer` a `layout/footer.tsx`.
- `MainLayout` actualizado con los nuevos paths.
- `NavLink` rediseñado; sidebar simplificado.
- `next.config.ts`: rewrites `/api/*` y headers CORS para `/_next/*` y `fonts/*` en dev LAN.

## 🎯 Próximos Pasos

1. **Configurar entidades del dominio**
2. **Implementar casos de uso**
3. **Crear adaptadores de infraestructura**
4. **Desarrollar componentes de UI**
5. **Configurar testing**
6. **Documentar APIs**

---

*Jaymar esta arquitectura garantiza un código limpio, mantenible y escalable para TraininWeb jajjaja pero podemos revisar mas parametros.*

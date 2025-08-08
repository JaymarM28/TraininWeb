# TraininWeb Frontend - Arquitectura Hexagonal

## 🏗️ Arquitectura del Proyecto

Este proyecto implementa una **Arquitectura Hexagonal (Puertos y Adaptadores)** combinada con **Clean Architecture** y **Domain-Driven Design (DDD)**.

### 📁 Estructura de Carpetas

```
src/
├── core/                    # 🎯 Núcleo de la aplicación (Domain + Application)
│   ├── domain/             # Entidades y lógica de negocio
│   │   ├── entities/       # Entidades del dominio
│   │   ├── value-objects/  # Objetos de valor
│   │   ├── repositories/   # Interfaces de repositorios
│   │   └── services/       # Servicios del dominio
│   ├── application/        # Casos de uso y lógica de aplicación
│   │   ├── use-cases/      # Casos de uso específicos
│   │   ├── dto/           # Objetos de transferencia de datos
│   │   └── mappers/       # Mapeadores entre capas
│   └── ports/             # Puertos (interfaces) de la arquitectura hexagonal
├── infrastructure/         # 🔌 Adaptadores y implementaciones externas
│   ├── adapters/          # Adaptadores para servicios externos
│   ├── repositories/      # Implementaciones de repositorios
│   ├── services/          # Servicios de infraestructura
│   ├── http/             # Cliente HTTP y configuraciones
│   ├── storage/          # Almacenamiento local
│   └── config/           # Configuraciones de la aplicación
├── presentation/          # 🎨 Capa de presentación (UI/UX)
│   ├── pages/            # Páginas de la aplicación
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Custom hooks de React
│   ├── providers/        # Context providers
│   ├── layouts/          # Layouts de la aplicación
│   └── styles/           # Estilos y configuraciones CSS
└── shared/               # 🔄 Código compartido entre capas
    ├── utils/            # Utilidades generales
    ├── constants/        # Constantes de la aplicación
    ├── types/            # Tipos TypeScript compartidos
    ├── interfaces/       # Interfaces compartidas
    └── helpers/          # Funciones auxiliares
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

## 🎯 Próximos Pasos

1. **Configurar entidades del dominio**
2. **Implementar casos de uso**
3. **Crear adaptadores de infraestructura**
4. **Desarrollar componentes de UI**
5. **Configurar testing**
6. **Documentar APIs**

---

*Jaymar esta arquitectura garantiza un código limpio, mantenible y escalable para TraininWeb jajjaja pero podemos revisar mas parametros.*

/**
 * Paths constants for the hexagonal architecture
 * Centralized path management for better maintainability
 */

export const PATHS = {
  // Core Layer
  CORE: {
    DOMAIN: '@/core/domain',
    APPLICATION: '@/core/application',
    PORTS: '@/core/ports',
  },

  // Domain Layer
  DOMAIN: {
    ENTITIES: '@/core/domain/entities',
    VALUE_OBJECTS: '@/core/domain/value-objects',
    REPOSITORIES: '@/core/domain/repositories',
    SERVICES: '@/core/domain/services',
  },

  // Application Layer
  APPLICATION: {
    USE_CASES: '@/core/application/use-cases',
    DTO: '@/core/application/dto',
    MAPPERS: '@/core/application/mappers',
  },

  // Infrastructure Layer
  INFRASTRUCTURE: {
    ADAPTERS: '@/infrastructure/adapters',
    REPOSITORIES: '@/infrastructure/repositories',
    SERVICES: '@/infrastructure/services',
    HTTP: '@/infrastructure/http',
    STORAGE: '@/infrastructure/storage',
    CONFIG: '@/infrastructure/config',
  },

  // Presentation Layer
  PRESENTATION: {
    PAGES: '@/presentation/pages',
    COMPONENTS: '@/presentation/components',
    HOOKS: '@/presentation/hooks',
    PROVIDERS: '@/presentation/providers',
    LAYOUTS: '@/presentation/layouts',
    STYLES: '@/presentation/styles',
  },

  // Shared Layer
  SHARED: {
    UTILS: '@/shared/utils',
    CONSTANTS: '@/shared/constants',
    TYPES: '@/shared/types',
    INTERFACES: '@/shared/interfaces',
    HELPERS: '@/shared/helpers',
  },
} as const;

/**
 * API endpoints for TraininWeb
 */
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // User endpoints
  USER: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
    DELETE: '/api/users/delete',
  },

  // Workout endpoints
  WORKOUT: {
    LIST: '/api/workouts',
    CREATE: '/api/workouts',
    GET: '/api/workouts/:id',
    UPDATE: '/api/workouts/:id',
    DELETE: '/api/workouts/:id',
  },

  // Exercise endpoints
  EXERCISE: {
    LIST: '/api/exercises',
    CREATE: '/api/exercises',
    GET: '/api/exercises/:id',
    UPDATE: '/api/exercises/:id',
    DELETE: '/api/exercises/:id',
  },

  // Training Plan endpoints
  TRAINING_PLAN: {
    LIST: '/api/training-plans',
    CREATE: '/api/training-plans',
    GET: '/api/training-plans/:id',
    UPDATE: '/api/training-plans/:id',
    DELETE: '/api/training-plans/:id',
  },

  // Progress endpoints
  PROGRESS: {
    GET: '/api/progress/:userId',
    UPDATE: '/api/progress/:userId',
    STATS: '/api/progress/:userId/stats',
  },
} as const;

/**
 * Route paths for the application
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  WORKOUTS: '/workouts',
  EXERCISES: '/exercises',
  TRAINING_PLANS: '/training-plans',
  PROGRESS: '/progress',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

/**
 * Storage keys for local storage
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'traininweb_auth_token',
  USER_DATA: 'traininweb_user_data',
  THEME: 'traininweb_theme',
  LANGUAGE: 'traininweb_language',
} as const;

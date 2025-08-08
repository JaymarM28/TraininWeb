/**
 * API Contracts between Frontend and Backend
 * These contracts ensure type safety and consistency across the application
 */

import { 
  ApiResponse, 
  PaginatedResponse, 
  User, 
  Workout, 
  Exercise, 
  TrainingPlan, 
  Progress, 
  WorkoutSession,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  PaginationParams
} from '@/shared/types/shared-types';

// ============================================================================
// AUTHENTICATION CONTRACTS
// ============================================================================

export interface AuthApiContract {
  login: (data: LoginRequest) => Promise<ApiResponse<AuthResponse>>;
  register: (data: RegisterRequest) => Promise<ApiResponse<AuthResponse>>;
  logout: () => Promise<ApiResponse<void>>;
  refreshToken: (refreshToken: string) => Promise<ApiResponse<AuthResponse>>;
  verifyToken: (token: string) => Promise<ApiResponse<{ valid: boolean }>>;
  forgotPassword: (email: string) => Promise<ApiResponse<{ message: string }>>;
  resetPassword: (token: string, password: string) => Promise<ApiResponse<{ message: string }>>;
}

// ============================================================================
// USER CONTRACTS
// ============================================================================

export interface UserApiContract {
  // CRUD Operations
  create: (data: RegisterRequest) => Promise<ApiResponse<User>>;
  findById: (id: string) => Promise<ApiResponse<User>>;
  findByEmail: (email: string) => Promise<ApiResponse<User>>;
  update: (id: string, data: Partial<User>) => Promise<ApiResponse<User>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // List Operations
  findAll: (params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<User>>>;
  findByRole: (role: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<User>>>;
  
  // Profile Operations
  updateProfile: (id: string, profile: Partial<User>) => Promise<ApiResponse<User>>;
  updatePreferences: (id: string, preferences: Partial<User>) => Promise<ApiResponse<User>>;
  uploadAvatar: (id: string, file: File) => Promise<ApiResponse<{ avatarUrl: string }>>;
  
  // Status Operations
  activate: (id: string) => Promise<ApiResponse<User>>;
  deactivate: (id: string) => Promise<ApiResponse<User>>;
  verify: (id: string) => Promise<ApiResponse<User>>;
}

// ============================================================================
// WORKOUT CONTRACTS
// ============================================================================

export interface WorkoutApiContract {
  // CRUD Operations
  create: (data: Partial<Workout>) => Promise<ApiResponse<Workout>>;
  findById: (id: string) => Promise<ApiResponse<Workout>>;
  update: (id: string, data: Partial<Workout>) => Promise<ApiResponse<Workout>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // List Operations
  findAll: (params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  findByCreator: (creatorId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  findByType: (type: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  findByDifficulty: (difficulty: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  
  // Search Operations
  search: (query: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  findByTags: (tags: string[], params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Workout>>>;
  
  // Status Operations
  publish: (id: string) => Promise<ApiResponse<Workout>>;
  archive: (id: string) => Promise<ApiResponse<Workout>>;
  duplicate: (id: string) => Promise<ApiResponse<Workout>>;
  
  // Exercise Management
  addExercise: (workoutId: string, exerciseData: any) => Promise<ApiResponse<Workout>>;
  removeExercise: (workoutId: string, exerciseId: string) => Promise<ApiResponse<Workout>>;
  updateExercise: (workoutId: string, exerciseId: string, data: any) => Promise<ApiResponse<Workout>>;
}

// ============================================================================
// EXERCISE CONTRACTS
// ============================================================================

export interface ExerciseApiContract {
  // CRUD Operations
  create: (data: Partial<Exercise>) => Promise<ApiResponse<Exercise>>;
  findById: (id: string) => Promise<ApiResponse<Exercise>>;
  update: (id: string, data: Partial<Exercise>) => Promise<ApiResponse<Exercise>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // List Operations
  findAll: (params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  findByCategory: (category: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  findByDifficulty: (difficulty: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  findByMuscleGroup: (muscleGroup: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  findByEquipment: (equipment: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  
  // Search Operations
  search: (query: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  findByCreator: (creatorId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Exercise>>>;
  
  // Status Operations
  activate: (id: string) => Promise<ApiResponse<Exercise>>;
  deactivate: (id: string) => Promise<ApiResponse<Exercise>>;
  
  // Media Operations
  uploadImage: (id: string, file: File) => Promise<ApiResponse<{ imageUrl: string }>>;
  uploadVideo: (id: string, file: File) => Promise<ApiResponse<{ videoUrl: string }>>;
  removeMedia: (id: string, mediaType: 'image' | 'video', mediaId: string) => Promise<ApiResponse<Exercise>>;
}

// ============================================================================
// TRAINING PLAN CONTRACTS
// ============================================================================

export interface TrainingPlanApiContract {
  // CRUD Operations
  create: (data: Partial<TrainingPlan>) => Promise<ApiResponse<TrainingPlan>>;
  findById: (id: string) => Promise<ApiResponse<TrainingPlan>>;
  update: (id: string, data: Partial<TrainingPlan>) => Promise<ApiResponse<TrainingPlan>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // List Operations
  findAll: (params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<TrainingPlan>>>;
  findByCreator: (creatorId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<TrainingPlan>>>;
  findByGoal: (goal: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<TrainingPlan>>>;
  findByDuration: (duration: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<TrainingPlan>>>;
  
  // Assignment Operations
  assignToUser: (planId: string, userId: string) => Promise<ApiResponse<TrainingPlan>>;
  unassignFromUser: (planId: string, userId: string) => Promise<ApiResponse<TrainingPlan>>;
  getAssignedUsers: (planId: string) => Promise<ApiResponse<User[]>>;
  
  // Status Operations
  activate: (id: string) => Promise<ApiResponse<TrainingPlan>>;
  deactivate: (id: string) => Promise<ApiResponse<TrainingPlan>>;
  duplicate: (id: string) => Promise<ApiResponse<TrainingPlan>>;
  
  // Workout Management
  addWorkout: (planId: string, workoutId: string) => Promise<ApiResponse<TrainingPlan>>;
  removeWorkout: (planId: string, workoutId: string) => Promise<ApiResponse<TrainingPlan>>;
  reorderWorkouts: (planId: string, workoutIds: string[]) => Promise<ApiResponse<TrainingPlan>>;
}

// ============================================================================
// PROGRESS CONTRACTS
// ============================================================================

export interface ProgressApiContract {
  // CRUD Operations
  create: (data: Partial<Progress>) => Promise<ApiResponse<Progress>>;
  findById: (id: string) => Promise<ApiResponse<Progress>>;
  update: (id: string, data: Partial<Progress>) => Promise<ApiResponse<Progress>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // User Progress
  findByUser: (userId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Progress>>>;
  findByUserAndCategory: (userId: string, category: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<Progress>>>;
  
  // Metrics Operations
  addMetric: (progressId: string, metric: any) => Promise<ApiResponse<Progress>>;
  updateMetric: (progressId: string, metricId: string, data: any) => Promise<ApiResponse<Progress>>;
  removeMetric: (progressId: string, metricId: string) => Promise<ApiResponse<Progress>>;
  
  // Goal Operations
  setGoal: (progressId: string, goal: any) => Promise<ApiResponse<Progress>>;
  updateGoal: (progressId: string, goal: any) => Promise<ApiResponse<Progress>>;
  removeGoal: (progressId: string) => Promise<ApiResponse<Progress>>;
  
  // Analytics
  getProgressStats: (userId: string, category?: string, period?: string) => Promise<ApiResponse<any>>;
  getProgressChart: (userId: string, category: string, period: string) => Promise<ApiResponse<any>>;
}

// ============================================================================
// WORKOUT SESSION CONTRACTS
// ============================================================================

export interface WorkoutSessionApiContract {
  // CRUD Operations
  create: (data: Partial<WorkoutSession>) => Promise<ApiResponse<WorkoutSession>>;
  findById: (id: string) => Promise<ApiResponse<WorkoutSession>>;
  update: (id: string, data: Partial<WorkoutSession>) => Promise<ApiResponse<WorkoutSession>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  
  // User Sessions
  findByUser: (userId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<WorkoutSession>>>;
  findByWorkout: (workoutId: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<WorkoutSession>>>;
  findByStatus: (status: string, params?: PaginationParams) => Promise<ApiResponse<PaginatedResponse<WorkoutSession>>>;
  
  // Session Management
  startSession: (workoutId: string, userId: string) => Promise<ApiResponse<WorkoutSession>>;
  pauseSession: (sessionId: string) => Promise<ApiResponse<WorkoutSession>>;
  resumeSession: (sessionId: string) => Promise<ApiResponse<WorkoutSession>>;
  completeSession: (sessionId: string, performance: any) => Promise<ApiResponse<WorkoutSession>>;
  cancelSession: (sessionId: string) => Promise<ApiResponse<WorkoutSession>>;
  
  // Performance Tracking
  updatePerformance: (sessionId: string, exerciseId: string, performance: any) => Promise<ApiResponse<WorkoutSession>>;
  addNote: (sessionId: string, note: string) => Promise<ApiResponse<WorkoutSession>>;
  rateSession: (sessionId: string, rating: number) => Promise<ApiResponse<WorkoutSession>>;
  
  // Analytics
  getSessionStats: (userId: string, period?: string) => Promise<ApiResponse<any>>;
  getWorkoutHistory: (userId: string, workoutId: string) => Promise<ApiResponse<WorkoutSession[]>>;
}

// ============================================================================
// MASTER API CONTRACT
// ============================================================================

export interface MasterApiContract {
  auth: AuthApiContract;
  users: UserApiContract;
  workouts: WorkoutApiContract;
  exercises: ExerciseApiContract;
  trainingPlans: TrainingPlanApiContract;
  progress: ProgressApiContract;
  workoutSessions: WorkoutSessionApiContract;
}

// ============================================================================
// API ERROR CODES
// ============================================================================

export const API_ERROR_CODES = {
  // Authentication
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Resources
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_IN_USE: 'RESOURCE_IN_USE',
  
  // Database
  DATABASE_ERROR: 'DATABASE_ERROR',
  CONSTRAINT_VIOLATION: 'CONSTRAINT_VIOLATION',
  
  // Network
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // Server
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  
  // Business Logic
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  BUSINESS_RULE_VIOLATION: 'BUSINESS_RULE_VIOLATION',
  WORKFLOW_ERROR: 'WORKFLOW_ERROR',
} as const;

export type ApiErrorCode = typeof API_ERROR_CODES[keyof typeof API_ERROR_CODES];

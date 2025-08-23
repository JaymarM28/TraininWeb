/**
 * Shared types between Frontend and Backend
 * These types ensure consistency across the entire application
 */

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

// ============================================================================
// USER TYPES (Shared between Frontend and Backend)
// ============================================================================

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
  height?: number; // in cm
  weight?: number; // in kg
  fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    workoutReminders: boolean;
    progressUpdates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showProgress: boolean;
    showWorkouts: boolean;
    showStats: boolean;
  };
  units: {
    weight: 'kg' | 'lbs';
    height: 'cm' | 'ft';
    distance: 'km' | 'miles';
  };
}

export interface User {
  id: string;
  email: string;
  profile: UserProfile;
  preferences: UserPreferences;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'ADMIN' | 'COACH' | 'USER';

// ============================================================================
// WORKOUT TYPES
// ============================================================================

export interface ExerciseSet {
  exerciseId: string;
  sets: number;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  restTime: number; // in seconds
  notes?: string;
  order: number;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  type: WorkoutType;
  status: WorkoutStatus;
  difficulty: ExerciseDifficulty;
  estimatedDuration: number; // in minutes
  exercises: ExerciseSet[];
  createdBy: string; // userId
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type WorkoutType = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'hiit' 
  | 'endurance' 
  | 'recovery'
  | 'functional'
  | 'sports';

export type WorkoutStatus = 'draft' | 'published' | 'archived' | 'deleted';

// ============================================================================
// EXERCISE TYPES
// ============================================================================

export interface Exercise {
  id: string;
  name: string;
  description: string;
  instructions: string[];
  muscleGroups: MuscleGroup[];
  category: ExerciseCategory;
  difficulty: ExerciseDifficulty;
  equipment: ExerciseEquipment[];
  images: string[];
  videoUrl?: string;
  estimatedDuration: number; // in minutes
  caloriesPerMinute?: number;
  isActive: boolean;
  createdBy: string; // userId
  createdAt: Date;
  updatedAt: Date;
}

export type MuscleGroup = 
  | 'chest' 
  | 'back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'forearms'
  | 'abs' 
  | 'obliques' 
  | 'glutes' 
  | 'quadriceps' 
  | 'hamstrings' 
  | 'calves'
  | 'full_body'
  | 'core'
  | 'upper_body'
  | 'lower_body';

export type ExerciseCategory = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'balance' 
  | 'sports' 
  | 'functional'
  | 'yoga'
  | 'pilates'
  | 'crossfit';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseEquipment = 
  | 'bodyweight' 
  | 'dumbbells' 
  | 'barbell' 
  | 'kettlebell' 
  | 'resistance_bands' 
  | 'machine' 
  | 'cable' 
  | 'medicine_ball'
  | 'foam_roller'
  | 'yoga_mat'
  | 'other';

// ============================================================================
// TRAINING PLAN TYPES
// ============================================================================

export interface TrainingPlan {
  id: string;
  name: string;
  description: string;
  goal: PlanGoal;
  duration: PlanDuration;
  workoutsPerWeek: number;
  workouts: string[]; // workout IDs
  createdBy: string; // userId
  assignedTo?: string[]; // userIds
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type PlanDuration = '1_week' | '2_weeks' | '4_weeks' | '8_weeks' | '12_weeks' | 'custom';

export type PlanGoal = 
  | 'weight_loss' 
  | 'muscle_gain' 
  | 'strength' 
  | 'endurance' 
  | 'flexibility' 
  | 'general_fitness'
  | 'sports_performance'
  | 'rehabilitation'
  | 'maintenance';

// ============================================================================
// PROGRESS TYPES
// ============================================================================

export interface ProgressMetric {
  date: Date;
  value: number;
  unit: string;
  notes?: string;
}

export interface Progress {
  id: string;
  userId: string;
  category: ProgressCategory;
  metrics: ProgressMetric[];
  goal?: {
    target: number;
    unit: string;
    deadline?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type ProgressCategory = 
  | 'weight' 
  | 'body_fat' 
  | 'muscle_mass' 
  | 'strength' 
  | 'endurance' 
  | 'flexibility' 
  | 'custom';

// ============================================================================
// WORKOUT SESSION TYPES
// ============================================================================

export interface ExercisePerformance {
  exerciseId: string;
  sets: {
    reps?: number;
    weight?: number;
    duration?: number;
    restTime: number;
    completed: boolean;
    notes?: string;
  }[];
}

export interface WorkoutSession {
  id: string;
  workoutId: string;
  userId: string;
  status: WorkoutSessionStatus;
  startTime: Date;
  endTime?: Date;
  performance: ExercisePerformance[];
  notes?: string;
  rating?: number; // 1-5 stars
  difficulty?: ExerciseDifficulty;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkoutSessionStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

// ============================================================================
// FORM TYPES
// ============================================================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'date' | 'time';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export type FormData = Record<string, any>;

// ============================================================================
// UI TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// ============================================================================
// API TYPES
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
}

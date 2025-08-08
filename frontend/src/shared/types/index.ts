/**
 * Shared TypeScript types for TraininWeb
 * Centralized type definitions for better type safety
 */

// ============================================================================
// BASE TYPES
// ============================================================================

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type PaginationParams = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

// ============================================================================
// USER TYPES
// ============================================================================

export type UserRole = 'admin' | 'trainer' | 'client';

export type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other';
};

export type UserPreferences = {
  theme: 'light' | 'dark' | 'system';
  language: 'es' | 'en';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showProgress: boolean;
    showWorkouts: boolean;
  };
};

export type User = BaseEntity & {
  profile: UserProfile;
  role: UserRole;
  preferences: UserPreferences;
  isActive: boolean;
  lastLoginAt?: Date;
};

// ============================================================================
// EXERCISE TYPES
// ============================================================================

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
  | 'full_body';

export type ExerciseCategory = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'balance' 
  | 'sports' 
  | 'functional';

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type ExerciseEquipment = 
  | 'bodyweight' 
  | 'dumbbells' 
  | 'barbell' 
  | 'kettlebell' 
  | 'resistance_bands' 
  | 'machine' 
  | 'cable' 
  | 'other';

export type Exercise = BaseEntity & {
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
};

// ============================================================================
// WORKOUT TYPES
// ============================================================================

export type WorkoutType = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'hiit' 
  | 'endurance' 
  | 'recovery';

export type WorkoutStatus = 'draft' | 'published' | 'archived';

export type ExerciseSet = {
  exerciseId: string;
  sets: number;
  reps?: number;
  weight?: number; // in kg
  duration?: number; // in seconds
  restTime: number; // in seconds
  notes?: string;
};

export type Workout = BaseEntity & {
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
};

// ============================================================================
// TRAINING PLAN TYPES
// ============================================================================

export type PlanDuration = '1_week' | '2_weeks' | '4_weeks' | '8_weeks' | '12_weeks' | 'custom';

export type PlanGoal = 
  | 'weight_loss' 
  | 'muscle_gain' 
  | 'strength' 
  | 'endurance' 
  | 'flexibility' 
  | 'general_fitness';

export type TrainingPlan = BaseEntity & {
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
};

// ============================================================================
// PROGRESS TYPES
// ============================================================================

export type ProgressMetric = {
  date: Date;
  value: number;
  unit: string;
  notes?: string;
};

export type ProgressCategory = 
  | 'weight' 
  | 'body_fat' 
  | 'muscle_mass' 
  | 'strength' 
  | 'endurance' 
  | 'flexibility' 
  | 'custom';

export type Progress = BaseEntity & {
  userId: string;
  category: ProgressCategory;
  metrics: ProgressMetric[];
  goal?: {
    target: number;
    unit: string;
    deadline?: Date;
  };
};

// ============================================================================
// WORKOUT SESSION TYPES
// ============================================================================

export type WorkoutSessionStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export type ExercisePerformance = {
  exerciseId: string;
  sets: {
    reps?: number;
    weight?: number;
    duration?: number;
    restTime: number;
    completed: boolean;
    notes?: string;
  }[];
};

export type WorkoutSession = BaseEntity & {
  workoutId: string;
  userId: string;
  status: WorkoutSessionStatus;
  startTime: Date;
  endTime?: Date;
  performance: ExercisePerformance[];
  notes?: string;
  rating?: number; // 1-5 stars
  difficulty?: ExerciseDifficulty;
};

// ============================================================================
// FORM TYPES
// ============================================================================

export type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
};

export type FormData = Record<string, any>;

// ============================================================================
// UI TYPES
// ============================================================================

export type Theme = 'light' | 'dark' | 'system';

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastProps = {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
};

// ============================================================================
// API TYPES
// ============================================================================

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, any>;
};

export type ApiRequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, any>;
};

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

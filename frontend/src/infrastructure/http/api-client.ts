/**
 * HTTP API Client for TraininWeb - Versión Completa
 * Centralized HTTP client with interceptors and error handling
 * Implements API contracts for type safety
 */

import { API_ENDPOINTS } from '@/shared/constants/paths';
import { 
  ApiResponse, 
  ApiError, 
  ApiRequestConfig,
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Workout,
  Exercise,
  TrainingPlan,
  Progress,
  WorkoutSession,
  PaginationParams,
  PaginatedResponse
} from '@/shared/types/shared-types';
import { 
  AuthApiContract,
  UserApiContract,
  WorkoutApiContract,
  ExerciseApiContract,
  TrainingPlanApiContract,
  ProgressApiContract,
  WorkoutSessionApiContract,
  API_ERROR_CODES,
  ApiErrorCode
} from '@/shared/contracts/api-contracts';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/api/auth/login', data);
  }

  async register(data: RegisterRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/api/auth/register', data);
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.post<void>('/api/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/api/auth/refresh', { refreshToken });
  }

  async verifyToken(token: string): Promise<ApiResponse<{ valid: boolean }>> {
    return this.post<{ valid: boolean }>('/api/auth/verify', { token });
  }

  async getProfile(): Promise<ApiResponse<{ user: User }>> {
    return this.get<{ user: User }>('/api/auth/me');
  }

  async validateToken(): Promise<ApiResponse<{ valid: boolean; user: User }>> {
    return this.get<{ valid: boolean; user: User }>('/api/auth/validate');
  }

  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/auth/forgot-password', { email });
  }

  async resetPassword(token: string, password: string): Promise<ApiResponse<{ message: string }>> {
    return this.post<{ message: string }>('/api/auth/reset-password', { token, password });
  }

  // ============================================================================
  // USER METHODS
  // ============================================================================

  async createUser(data: RegisterRequest): Promise<ApiResponse<User>> {
    return this.post<User>('/api/users', data);
  }

  async findUserById(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`/api/users/${id}`);
  }

  async findUserByEmail(email: string): Promise<ApiResponse<User>> {
    return this.get<User>('/api/users/email', { email });
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.put<User>(`/api/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/users/${id}`);
  }

  async findAllUsers(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.get<PaginatedResponse<User>>('/api/users', params);
  }

  // ============================================================================
  // WORKOUT METHODS
  // ============================================================================

  async createWorkout(data: Partial<Workout>): Promise<ApiResponse<Workout>> {
    return this.post<Workout>('/api/workouts', data);
  }

  async findWorkoutById(id: string): Promise<ApiResponse<Workout>> {
    return this.get<Workout>(`/api/workouts/${id}`);
  }

  async updateWorkout(id: string, data: Partial<Workout>): Promise<ApiResponse<Workout>> {
    return this.put<Workout>(`/api/workouts/${id}`, data);
  }

  async deleteWorkout(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/workouts/${id}`);
  }

  async findAllWorkouts(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Workout>>> {
    return this.get<PaginatedResponse<Workout>>('/api/workouts', params);
  }

  // ============================================================================
  // EXERCISE METHODS
  // ============================================================================

  async createExercise(data: Partial<Exercise>): Promise<ApiResponse<Exercise>> {
    return this.post<Exercise>('/api/exercises', data);
  }

  async findExerciseById(id: string): Promise<ApiResponse<Exercise>> {
    return this.get<Exercise>(`/api/exercises/${id}`);
  }

  async updateExercise(id: string, data: Partial<Exercise>): Promise<ApiResponse<Exercise>> {
    return this.put<Exercise>(`/api/exercises/${id}`, data);
  }

  async deleteExercise(id: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/exercises/${id}`);
  }

  async findAllExercises(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Exercise>>> {
    return this.get<PaginatedResponse<Exercise>>('/api/exercises', params);
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Set authentication token
   */
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove authentication token
   */
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  /**
   * Get stored auth token from localStorage
   */
  private getStoredAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('traininweb_auth_token');
    }
    return null;
  }

  /**
   * Add auth token to headers if available
   */
  private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const token = this.getStoredAuthToken();
    const headers = { ...this.defaultHeaders, ...customHeaders };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  /**
   * Build URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }
    
    return url.toString();
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        code: error.response.status.toString(),
        message: error.response.data?.message || 'Server error',
        details: error.response.data,
      };
    } else if (error.request) {
      // Network error
      return {
        code: API_ERROR_CODES.NETWORK_ERROR,
        message: 'Network error - please check your connection',
      };
    } else {
      // Other error
      return {
        code: API_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: error.message || 'Unknown error occurred',
      };
    }
  }

  /**
   * Make HTTP request
   */
  private async request<T>(config: {
    method: string;
    url: string;
    body?: any;
    headers?: Record<string, string>;
    params?: Record<string, any>;
  }): Promise<ApiResponse<T>> {
    try {
      const { method, url, body, headers, params } = config;
      const fullUrl = params ? this.buildURL(url, params) : 
                     url.startsWith('http') ? url : `${this.baseURL}${url}`;
      const requestHeaders = this.getHeaders(headers);

      console.log(`[API] ${method} ${fullUrl}`); // Debug log

      const response = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      let responseData;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        console.error(`[API Error] ${response.status}:`, responseData);
        return {
          success: false,
          error: responseData?.message || responseData || `HTTP ${response.status}`,
          statusCode: response.status,
        };
      }

      return {
        success: true,
        data: responseData,
        statusCode: response.status,
      };
    } catch (error) {
      console.error('[API Network Error]:', error);
      const apiError = this.handleError(error);
      return {
        success: false,
        error: apiError.message,
        statusCode: parseInt(apiError.code) || 0,
      };
    }
  }

  /**
   * GET request
   */
  private async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
      headers,
    });
  }

  /**
   * POST request
   */
  private async post<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url,
      body,
      headers,
    });
  }

  /**
   * PUT request
   */
  private async put<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url,
      body,
      headers,
    });
  }

  /**
   * PATCH request
   */
  private async patch<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url,
      body,
      headers,
    });
  }

  /**
   * DELETE request
   */
  private async delete<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url,
      headers,
    });
  }

  /**
   * Upload file
   */
  private async uploadFile<T>(
    url: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const headers = this.getHeaders();
      delete headers['Content-Type']; // Let browser set content-type for FormData

      const xhr = new XMLHttpRequest();

      return new Promise((resolve) => {
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable && onProgress) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const responseData = JSON.parse(xhr.responseText);
            resolve({
              success: true,
              data: responseData,
              statusCode: xhr.status,
            });
          } else {
            resolve({
              success: false,
              error: 'Upload failed',
              statusCode: xhr.status,
            });
          }
        });

        xhr.addEventListener('error', () => {
          resolve({
            success: false,
            error: 'Network error during upload',
            statusCode: 0,
          });
        });

        const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
        xhr.open('POST', fullUrl);
        
        // Add auth header if available
        const token = this.getStoredAuthToken();
        if (token) {
          xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        }

        xhr.send(formData);
      });
    } catch (error) {
      return {
        success: false,
        error: 'Upload failed',
        statusCode: 500,
      };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient };
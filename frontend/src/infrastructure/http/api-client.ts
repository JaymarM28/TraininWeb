// frontend/src/infrastructure/http/api-client.ts (versión completa actualizada)

/**
 * HTTP API Client for TraininWeb - Versión Completa con Roles
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
  // USER MANAGEMENT METHODS (Para Roles)
  // ============================================================================

  async getUsers(role?: 'ADMIN' | 'COACH' | 'USER'): Promise<ApiResponse<any[]>> {
    const params = role ? { role } : {};
    return this.get<any[]>('/api/auth/users', params);
  }

  async createUser(data: {
    email: string;
    cedula: string;
    name: string;
    password: string;
    role?: 'ADMIN' | 'COACH' | 'USER';
    coachId?: string;
  }): Promise<ApiResponse<any>> {
    return this.post<any>('/api/auth/register-user', data);
  }

  async toggleUserStatus(userId: string): Promise<ApiResponse<any>> {
    return this.patch<any>(`/api/auth/users/${userId}/toggle-status`);
  }

  async getDashboardRoute(): Promise<ApiResponse<{ route: string; role: string }>> {
    return this.get<{ route: string; role: string }>('/api/auth/dashboard-route');
  }

  async getUserById(userId: string): Promise<ApiResponse<any>> {
    return this.get<any>(`/api/auth/users/${userId}`);
  }

  async updateUser(userId: string, data: any): Promise<ApiResponse<any>> {
    return this.put<any>(`/api/auth/users/${userId}`, data);
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return this.delete<void>(`/api/auth/users/${userId}`);
  }

  async assignCoachToUser(userId: string, coachId: string): Promise<ApiResponse<any>> {
    return this.patch<any>(`/api/auth/users/${userId}/assign-coach`, { coachId });
  }

  async getCoachUsers(coachId: string): Promise<ApiResponse<any[]>> {
    return this.get<any[]>(`/api/auth/coaches/${coachId}/users`);
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

  async getAllExercises(): Promise<ApiResponse<Exercise[]>> {
    return this.get<Exercise[]>('/api/exercises/getAll');
  }

  // ============================================================================
  // ROUTINES METHODS
  // ============================================================================
  async getAllRoutines(): Promise<ApiResponse<Workout[]>> {
    return this.get<Workout[]>('/api/routines');
  }

  // ============================================================================
  // ROLE-BASED REDIRECTS
  // ============================================================================

  async getRedirectRoute(): Promise<string> {
    try {
      const response = await this.getDashboardRoute();
      if (response.success && response.data) {
        return response.data.route;
      }
      return '/dashboard'; // fallback
    } catch (error) {
      console.error('Error getting redirect route:', error);
      return '/dashboard'; // fallback
    }
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
        code: 'NETWORK_ERROR',
        message: 'Network error - please check your connection',
      };
    } else {
      // Other error
      return {
        code: 'INTERNAL_SERVER_ERROR',
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
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient };
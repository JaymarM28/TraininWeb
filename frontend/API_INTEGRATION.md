# Integración del API Frontend-Backend

Este documento explica cómo conectar el frontend Next.js con el backend NestJS para realizar peticiones a los controladores.

## Configuración del Backend

### 1. CORS y Prefijo de API

El backend ya está configurado con:
- CORS habilitado para permitir peticiones desde `localhost:3000` y `localhost:3001`
- Prefijo global `/api` para todas las rutas
- Puerto por defecto: `3001`

### 2. Controladores Disponibles

- **Ejercicios**: `/api/exercises/*`
- **Rutinas**: `/api/routines/*`
- **Autenticación**: `/api/auth/*`

## Configuración del Frontend

### 1. URL Base de la API

La URL base está configurada en `src/shared/constants/paths.ts`:
```typescript
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  // ...
}
```

### 2. Variables de Entorno

Crea un archivo `.env.local` en la raíz del frontend:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Uso del API Client

### 1. Importar el Cliente

```typescript
import { apiClient } from '@/infrastructure/http/api-client';
```

### 2. Ejemplos de Uso

#### Obtener todos los ejercicios:
```typescript
const response = await apiClient.findAllExercises();
if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}
```

#### Crear un ejercicio:
```typescript
const exerciseData = {
  name: 'Flexiones',
  description: 'Ejercicio de pecho',
  category: 'strength',
  difficulty: 'beginner'
};

const response = await apiClient.createExercise(exerciseData);
```

### 3. Usando Hooks Personalizados

#### Hook para Ejercicios:
```typescript
import { useExercises } from '@/presentation/hooks/use-api';

function MyComponent() {
  const { getAllExercises, createExercise } = useExercises();
  
  useEffect(() => {
    getAllExercises.execute();
  }, [getAllExercises]);
  
  // Los datos están en getAllExercises.data
  // El estado de carga en getAllExercises.loading
  // Los errores en getAllExercises.error
}
```

#### Hook para Rutinas:
```typescript
import { useRoutines } from '@/presentation/hooks/use-api';

function MyComponent() {
  const { getAllRoutines } = useRoutines();
  
  useEffect(() => {
    getAllRoutines.execute();
  }, [getAllRoutines]);
}
```

## Estructura de Respuestas

Todas las respuestas del API siguen esta estructura:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode?: number;
}
```

### Ejemplo de Respuesta Exitosa:
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Flexiones",
    "description": "Ejercicio de pecho"
  },
  "statusCode": 200
}
```

### Ejemplo de Respuesta con Error:
```json
{
  "success": false,
  "error": "Ejercicio no encontrado",
  "statusCode": 404
}
```

## Manejo de Errores

### 1. Errores de Red
- Errores de conexión
- Timeouts
- Problemas de CORS

### 2. Errores del Servidor
- Errores de validación
- Errores de autenticación
- Errores internos del servidor

### 3. Ejemplo de Manejo:
```typescript
try {
  const response = await apiClient.findAllExercises();
  if (response.success) {
    // Procesar datos
  } else {
    // Mostrar error al usuario
    console.error(response.error);
  }
} catch (error) {
  // Manejar errores inesperados
  console.error('Error inesperado:', error);
}
```

## Autenticación

### 1. Configurar Token
```typescript
// Después de login exitoso
apiClient.setAuthToken(token);

// Para logout
apiClient.removeAuthToken();
```

### 2. Token Automático
El cliente automáticamente incluye el token de autenticación desde localStorage si está disponible.

## Testing

### 1. Backend
```bash
cd backend
npm run start:dev
```

### 2. Frontend
```bash
cd frontend
npm run dev
```

### 3. Verificar Conexión
- Backend corriendo en: `http://localhost:3001`
- Frontend corriendo en: `http://localhost:3000`
- API disponible en: `http://localhost:3001/api/*`

## Troubleshooting

### 1. Error de CORS
- Verificar que el backend tenga CORS habilitado
- Verificar que las URLs de origen estén permitidas

### 2. Error de Conexión
- Verificar que el backend esté corriendo
- Verificar la URL base en las constantes
- Verificar que no haya firewall bloqueando el puerto

### 3. Errores de Tipos
- Verificar que los tipos en `shared-types.ts` coincidan con el backend
- Verificar que los DTOs del backend coincidan con los tipos del frontend

## Próximos Pasos

1. Implementar autenticación JWT completa
2. Agregar interceptores para refresh de tokens
3. Implementar manejo de errores más robusto
4. Agregar tests de integración
5. Implementar cache de respuestas

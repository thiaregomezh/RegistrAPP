// src/app/models/asignatura.model.ts
export interface Asignatura {
    id: number; // Ajusta el tipo según tu API
    nombre: string;
    seccion: string;
    mostrarDetalles?: boolean; // Si usas este campo para mostrar u ocultar detalles
    profesor?: string; // Si este campo es opcional
  }
  
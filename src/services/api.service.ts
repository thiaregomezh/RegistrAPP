import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obtener asignaturas con el nombre del profesor asignado y la sección
  getAsignaturasConProfesores(): Observable<any[]> {
    const asignaturas$ = this.http.get<any[]>(`${this.apiUrl}/asignaturas`);
    const docentes$ = this.http.get<any[]>(`${this.apiUrl}/docentes`);
  
    return forkJoin([asignaturas$, docentes$]).pipe(
      map(([asignaturas, docentes]) => {
        const asignaturasConProfesores = asignaturas.map(asignatura => {
          const profesor = docentes.find(docente => docente.id.toString() === asignatura.profesorId.toString());
          return {
            ...asignatura,
            profesorNombre: profesor ? profesor.nombre : 'Sin profesor asignado',
            seccion: asignatura.seccion
          };
        });
        console.log("Asignaturas con profesores:", asignaturasConProfesores); // Depuración
        return asignaturasConProfesores;
      })
    );
    
  }
  

  // Método de autenticación para estudiantes y docentes
  authenticate(usuario: string, clave: string): Observable<any> {
    const estudiantes$ = this.http.get<any[]>(`${this.apiUrl}/estudiantes`);
    const docentes$ = this.http.get<any[]>(`${this.apiUrl}/docentes`);

    return forkJoin([estudiantes$, docentes$]).pipe(
      map(([estudiantes, docentes]) => {
        const estudiante = estudiantes.find(est => est.usuario === usuario && est.clave === clave);
        if (estudiante) {
          return { ...estudiante, role: 'estudiante' };
        }

        const docente = docentes.find(doc => doc.usuario === usuario && doc.clave === clave);
        if (docente) {
          return { ...docente, role: 'docente' };
        }

        return null;
      })
    );
  }

  // Otros métodos de la API
  updatePassword(id: number, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/estudiantes/${id}`, { clave: newPassword });
  }

  getEstudiantes(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/estudiantes`);
  }

  getDocentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/docentes`);
  }

  getAsistencias(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/asistencias`);
  }

  registrarAsistencia(asistencia: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/asistencias`, asistencia);
  }

  getAsignaturas(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaturas`);
  }
 
  getAsignaturasPorDocente(docenteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/asignaturas?profesorId=${docenteId}`);
  }
}

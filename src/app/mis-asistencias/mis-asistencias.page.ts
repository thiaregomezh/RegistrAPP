import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.page.html',
  styleUrls: ['./mis-asistencias.page.scss'],
})
export class MisAsistenciasPage implements OnInit {
  asignaturasConAsistencias: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarAsignaturasConAsistencias();
  }

  cargarAsignaturasConAsistencias() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const estudianteId = user.id;

    this.apiService.getAsignaturas().subscribe((asignaturas) => {
      this.apiService.getAsistencias().subscribe((asistencias) => {
        // Agrupar asistencias por asignatura
        this.asignaturasConAsistencias = asignaturas.map((asignatura: any) => {
          const asistenciasPorAsignatura = asistencias.filter(
            (asistencia: any) => asistencia.asignaturaId === asignatura.id && asistencia.estudianteId === estudianteId
          );
          return {
            ...asignatura,
            asistencias: asistenciasPorAsignatura,
            expanded: false, // Estado de expansión inicial de la lista
          };
        });
      });
    });
  }

  // Alternar expansión de la lista de cada asignatura
  toggleAsignatura(asignatura: any) {
    asignatura.expanded = !asignatura.expanded;
  }
}

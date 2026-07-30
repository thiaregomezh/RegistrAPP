import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mis-asignaturas',
  templateUrl: './mis-asignaturas.page.html',
  styleUrls: ['./mis-asignaturas.page.scss'],
})
export class MisAsignaturasPage implements OnInit {
  asignaturas: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.cargarAsignaturasConProfesores();
  }

  cargarAsignaturasConProfesores() {
    this.apiService.getAsignaturasConProfesores().subscribe((asignaturasConProfesores) => {
      console.log('Asignaturas con profesores:', asignaturasConProfesores); // Depuración
      this.asignaturas = asignaturasConProfesores;
    });
  }

  verDetalles(asignatura: any) {
    asignatura.mostrarDetalles = !asignatura.mostrarDetalles;
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  isLoggedIn: boolean = true;
  userRole: string | null = null;
  asignaturas = [
    { nombre: 'Arquitectura de Software', seccion: 'Sección 1' },
    { nombre: 'Calidad de Software', seccion: 'Sección 2' },
    { nombre: 'Programación Móvil', seccion: 'Sección 3' }
  ];

  constructor(private router: Router) {
    this.obtenerNombreUsuario(); // Llamar al método al iniciar el componente
  }

  // Método para obtener el nombre del usuario
  obtenerNombreUsuario() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.username = user.nombre || 'Invitado';
    this.userRole = user.role || 'estudiante';
  }

  // Método para hacer logout y cambiar el estado de autenticación
  logout() {
    this.isLoggedIn = false;
    sessionStorage.removeItem('user');  // Limpiar los datos de usuario de la sesión actual
    sessionStorage.removeItem('role');  // Limpiar el rol del usuario de la sesión actual
    this.router.navigate(['/login']);  // Redirigir al login
  }

  // Método para simular el cambio del nombre de usuario
  cambiarNombreUsuario(nuevoNombre: string) {
    this.username = nuevoNombre;
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    user.nombre = nuevoNombre;
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  // Método para simular el cambio de asignaturas
  actualizarAsignaturas(nuevasAsignaturas: any[]) {
    this.asignaturas = nuevasAsignaturas;
  }

  // Método para redirigir a "Sobre Nosotros"
  navegarSobreNosotros() {
    this.router.navigate(['/sobre-nosotros']);
  }

  ngOnInit() {
    this.obtenerNombreUsuario();
  }
}

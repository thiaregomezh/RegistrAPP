import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import QRCode from 'qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQRPage implements OnInit {
  asignaturas: any[] = [];
  selectedAsignatura: any = null;
  qrCodeData: string | null = null;
  qrCodeImage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.role === 'docente') {
      this.apiService.getAsignaturasPorDocente(user.id).subscribe((asignaturas) => {
        this.asignaturas = asignaturas;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  async generarQR(asignatura: any) {
    this.selectedAsignatura = asignatura;
    this.qrCodeData = JSON.stringify({
      asignaturaId: asignatura.id,
      profesorId: this.selectedAsignatura.profesorId,
    });

    this.qrCodeImage = await QRCode.toDataURL(this.qrCodeData);
  }
}

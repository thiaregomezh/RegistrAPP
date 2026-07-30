import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-registrar-asistencia',
  templateUrl: './registrar-asistencia.page.html',
  styleUrls: ['./registrar-asistencia.page.scss'],
})
export class RegistrarAsistenciaPage {
  qrData: string | null = null;
  scanning: boolean = false;

  constructor(
    private apiService: ApiService,
    private alertCtrl: AlertController
  ) {}

  async startScan() {
    const permission = await BarcodeScanner.checkPermission({ force: true });
    if (!permission.granted) {
      this.presentAlert('Permiso para acceder a la cámara denegado.');
      return;
    }

    BarcodeScanner.hideBackground(); // Oculta el fondo de la cámara
    this.scanning = true;

    const result = await BarcodeScanner.startScan(); // Inicia el escaneo

    if (result.hasContent) {
      this.qrData = result.content;
      this.registrarAsistencia(this.qrData);
    } else {
      this.presentAlert('No se detectó ningún código QR.');
    }

    this.scanning = false;
    BarcodeScanner.showBackground(); // Muestra el fondo nuevamente
  }

  async stopScan() {
    await BarcodeScanner.stopScan();
    this.scanning = false;
  }

  async registrarAsistencia(qrData: string) {
    try {
      const qrInfo = JSON.parse(qrData);
      const { asignaturaId, profesorId } = qrInfo;

      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const estudianteId = user.id;

      const asistencia = {
        estudianteId,
        asignaturaId,
        fecha: new Date().toISOString(),
        presente: true,
      };

      this.apiService.registrarAsistencia(asistencia).subscribe(async () => {
        await this.presentAlert('Asistencia registrada exitosamente.');
      });
    } catch (error) {
      this.presentAlert('Error al procesar el QR.');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

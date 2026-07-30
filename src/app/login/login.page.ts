import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  resetForm!: FormGroup;
  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log("Intentando autenticación con:", username, password); // Depuración

      this.apiService.authenticate(username, password).subscribe(
        async (user) => {
          if (user) {
            console.log("Usuario autenticado:", user); // Depuración
            const { clave, ...userWithoutPassword } = user;

            // Cambia `localStorage` a `sessionStorage`
            sessionStorage.setItem('user', JSON.stringify(userWithoutPassword));
            sessionStorage.setItem('role', user.role);

            this.router.navigate(['/home']);
            this.loginForm.reset();
          } else {
            console.log("Autenticación fallida. Usuario o contraseña incorrectos.");
            this.presentAlert('Usuario o contraseña incorrectos');
          }
        },
        async (error) => {
          console.log("Error en la autenticación:", error);
          this.presentAlert('Error de autenticación. Intenta nuevamente.');
        }
      );
    }
  }

  async sendResetPassword() {
    if (this.resetForm.valid) {
      const email = this.resetForm.value.email;
      await this.presentAlert(`Se ha enviado un correo de restablecimiento a ${email}`);
      this.closeModal();
    }
  }

  openResetModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

// src/app/cambiar-clave/cambiar-clave.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.page.html',
  styleUrls: ['./cambiar-clave.page.scss'],
})
export class CambiarClavePage implements OnInit {
  changePasswordForm!: FormGroup;
  passwordsDoNotMatch: boolean = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }

    this.changePasswordForm.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value;
    this.passwordsDoNotMatch = newPassword !== confirmPassword;
  }

  async onSubmit() {
    if (this.changePasswordForm.valid && !this.passwordsDoNotMatch) {
      const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
      const newPassword = this.changePasswordForm.get('newPassword')?.value;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
  
      if (user && user.clave === currentPassword) {
        this.apiService.updatePassword(user.id, newPassword).subscribe(async () => {
          await this.presentToast('Contraseña actualizada correctamente');
          this.changePasswordForm.reset();
        }, async () => {
          await this.presentToast('Error al actualizar la contraseña');
        });
      } else {
        await this.presentToast('La contraseña actual es incorrecta');
      }
    }
  }
  
  

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}

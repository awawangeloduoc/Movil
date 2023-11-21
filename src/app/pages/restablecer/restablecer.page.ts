import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../services/utils.service';


function emailDomainValidator(control: AbstractControl): { [key: string]: any } | null {
  const email: string = control.value;
  if (email === null) {
    return null; // o manejarlo de acuerdo a tus requerimientos
  }
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email === '' || domain.toLowerCase() === 'duocuc.cl') {
    return null;
  } else {
    return { 'emailDomain': true };
  }
}
@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {
  resetForm: FormGroup;

  constructor() {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, emailDomainValidator]),

    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() { }

  async submit() {
    if (this.resetForm.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendRecoveryEmail(this.resetForm.value.email).then(res => {

        this.utilsSvc.presentToast({
          message: 'Correo enviado con éxito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        });

        this.resetForm.reset();
          
        }).catch(error => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
            icon: 'mail-outline'
          })
        })
        .finally(() => {
          loading.dismiss();
          this.utilsSvc.routerLink('/login');
        });
    }
  }
}

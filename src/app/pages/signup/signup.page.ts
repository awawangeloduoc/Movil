import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  registrarForm: FormGroup;

  constructor() {
    this.registrarForm = new FormGroup({
      uid: new FormControl (''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() { }

  async submit() {
    if (this.registrarForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.registrar(this.registrarForm.value as User).then(async res => {

          await this.firebaseSvc.updateUser(this.registrarForm.value.name);
          
          let uid = res.user.uid;
          this.registrarForm.controls['uid'].setValue(uid);
          this.setUserInfo(uid);
          
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
            icon: 'alter-circle-outline'
          })
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async setUserInfo(uid: string) {
    if (this.registrarForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;
      delete this.registrarForm.value.password;

      this.firebaseSvc.setDocument(path, this.registrarForm.value).then(async res => {

        this.utilsSvc.saveLocal('user', this.registrarForm.value);
        this.utilsSvc.routerLink('/login');
        this.registrarForm.reset();
        
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
            icon: 'alter-circle-outline'
          })
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.loginForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .logear(this.loginForm.value as User)
        .then((res) => {
          this.getUserInfo(res.user.uid);
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2000,
            color: 'danger',
            position: 'bottom',
            icon: 'alter-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async getUserInfo(uid: string) {
    if (this.loginForm.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc
        .getDocument(path)
        .then((user: User | undefined) => {
          // Asegurarte de que user pueda ser undefined
          if (user) {
            this.utilsSvc.saveLocal('user', user);
            this.utilsSvc.routerLink('/tab/home');
            console.log(user);
            console.log(path);
            this.loginForm.reset();

            this.utilsSvc.presentToast({
              message: `Te damos la bienvenida ${user.name}`,
              duration: 1500,
              color: 'primary',
              position: 'middle',
              icon: 'person-circle-outline',
            });
          } else {
            // Aquí puedes manejar el caso en el que user es undefined
            console.log('El objeto user es undefined');
          }
        })
        .catch((error) => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 5000,
            color: 'danger',
            position: 'bottom',
            icon: 'alter-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}

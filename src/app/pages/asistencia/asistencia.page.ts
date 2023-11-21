import { Component, OnInit, inject } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { User } from 'firebase/auth';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  texto: any;

  constructor(private barcodeScanner: BarcodeScanner) {}

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  // Método que devuelve el usuario actual
  user(): User {
    return this.utilsSvc.getLocal('user');
  }
  // Método para escanear el código de barras y registrar la asistencia
  async scan() {
    try {
      // Escanea el código de barras
      const barcodedata = await this.barcodeScanner.scan();
      console.log('Scaneando...', barcodedata);
      this.texto = JSON.stringify(barcodedata);

      // Obtiene el ID del usuario actual
      let user = this.user();
      let idAlumno = user.uid;

      // Obtiene el ID de la asignatura del código de barras
      const idAsignatura = barcodedata.text;

      // Crea el objeto de asistencia
      const asistenciaData = {
        idAlumno,
        idAsignatura,
        fecha: new Date(),
        asistencia: true,
      };

      // Guarda la asistencia en Firebase
      await this.firebaseSvc.addDocument('asistencias', asistenciaData);

      // Guarda la asistencia en localStorage
      this.utilsSvc.saveLocal('asistencias', asistenciaData);

      // Muestra un mensaje de éxito al usuario
      this.utilsSvc.presentToast({
        message: 'Asistencia registrada con éxito.',
        duration: 2000,
        color: 'success',
      });
    } catch (err) {
      console.log('ERROR: ', err);
      // Muestra un mensaje de error al usuario
      this.utilsSvc.presentToast({
        message: 'Error al escanear el código. Por favor, inténtalo de nuevo.',
        duration: 2000,
        color: 'danger',
      });
    }
  }
}

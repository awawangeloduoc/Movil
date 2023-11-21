import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-ramos',
  templateUrl: './ramos.page.html',
  styleUrls: ['./ramos.page.scss'],
})
export class RamosPage {
  ramos: any = [];
  asistencia: any = [];

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  async ngOnInit() {
    this.ramos = await this.firebaseSvc.getSubjects();

    // Crea un mapa de asistencias por ID de asignatura
    const asistenciasPorId = {};
    for (let ramo of this.ramos) {
      asistenciasPorId[ramo.id] = [];
    }

    // Obtén el ID
    let user = this.user();
    let idAlumnoLogueado = user.uid;

    // Llena el mapa con las asistencias correspondientes
    const todasAsistencias = await this.firebaseSvc.getAttendances();
    for (let asist of todasAsistencias) {
      const fecha = new Date(asist['fecha'].seconds * 1000);
      if (
        asistenciasPorId.hasOwnProperty(asist['idAsignatura']) &&
        asist['idAlumno'] === idAlumnoLogueado
      ) {
        asistenciasPorId[asist['idAsignatura']].push({
          ...asist,
          fecha: fecha,
        });
      }
    }

    this.asistencia = asistenciasPorId;
  }

  getAsistenciasPorAsignatura(nombreAsignatura: string) {
    if (!this.asistencia.hasOwnProperty(nombreAsignatura)) {
      console.log(
        'No se encontró el nombre de la asignatura en el mapa: ',
        nombreAsignatura
      );
      return [];
    }

    return this.asistencia[nombreAsignatura];
  }

  user(): User {
    return this.utilsSvc.getLocal('user');
  }

  toggleContent(id: number) {
    this.ramos.forEach((ramo) => {
      if (ramo.id === id) {
        ramo.showContent = !ramo.showContent;
      }
    });
  }
}

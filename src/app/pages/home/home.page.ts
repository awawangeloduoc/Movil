import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  studentName: string = '';
  utilsSvc = inject(UtilsService);

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentName = params['studentName'];
    });
  }

  user(): User {
    return this.utilsSvc.getLocal('user');
  }
  

  navigateToDetails() {
    this.router.navigate(['/tab/ramos']);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { IonicModule } from '@ionic/angular';

import { RamosPageRoutingModule } from './ramos-routing.module';

import { RamosPage } from './ramos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RamosPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RamosPage]
})
export class RamosPageModule {}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUserPage } from './perfil-user.page';

describe('PerfilUserPage', () => {
  let component: PerfilUserPage;
  let fixture: ComponentFixture<PerfilUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PerfilUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

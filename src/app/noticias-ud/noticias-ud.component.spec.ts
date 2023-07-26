import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasUDComponent } from './noticias-ud.component';

describe('NoticiasUDComponent', () => {
  let component: NoticiasUDComponent;
  let fixture: ComponentFixture<NoticiasUDComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoticiasUDComponent]
    });
    fixture = TestBed.createComponent(NoticiasUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

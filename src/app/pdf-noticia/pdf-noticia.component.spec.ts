import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFNoticiaComponent } from './pdf-noticia.component';

describe('PDFNoticiaComponent', () => {
  let component: PDFNoticiaComponent;
  let fixture: ComponentFixture<PDFNoticiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PDFNoticiaComponent]
    });
    fixture = TestBed.createComponent(PDFNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

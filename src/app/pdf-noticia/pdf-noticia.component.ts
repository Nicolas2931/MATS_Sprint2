import { Component } from '@angular/core';

@Component({
  selector: 'app-pdf-noticia',
  templateUrl: './pdf-noticia.component.html',
  styleUrls: ['./pdf-noticia.component.css']
})
export class PDFNoticiaComponent {
  
  selectedFile: File | null = null;

  //Función que resalta el áre de arrastrar y soltar
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      target.classList.add('drag-over');
    }
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      target.classList.remove('drag-over');
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      target.classList.remove('drag-over');
    }

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  eliminarArchivo() {
    this.selectedFile = null;
  }
}

import { Component,Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-pdf-noticia',
  templateUrl: './pdf-noticia.component.html',
  styleUrls: ['./pdf-noticia.component.css']
})
export class PDFNoticiaComponent {
  @Input() opcion: string | null;
  selectedFile: File | null = null;
  pdfURL:string | null = null;
  constructor(private http: HttpClient){}
  /*
  cargarArchivoDesdeBackend() {
    // Si la opción es "editar", realizar la solicitud para obtener el archivo PDF del Backend
    if (this.opcion === 'editar' || this.opcion=='ver') {
      const url = 'URL_DEL_ENDPOINT_PARA_OBTENER_EL_PDF'; // Reemplaza por la URL del endpoint en el Backend
      const headers = new HttpHeaders({ 'Content-Type': 'application/pdf', responseType: 'blob' as 'json' });

      // Realizar la solicitud HTTP para obtener el archivo PDF
      this.http.get(url, { headers, observe: 'response', responseType: 'blob' })
        .subscribe((response) => {
          if (response.status === 200) {
            // Crear una URL del objeto Blob recibido
            const blob = new Blob([response.body as BlobPart], { type: 'application/pdf' });
            this.pdfUrl = URL.createObjectURL(blob);
          }
        }, (error) => {
          // Manejar el error si la solicitud no se pudo completar
          console.error('Error al obtener el archivo PDF desde el Backend:', error);
        });
    }
  }
}
*/
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

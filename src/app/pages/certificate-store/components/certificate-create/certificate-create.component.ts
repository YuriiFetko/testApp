import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-certificate-create',
  templateUrl: './certificate-create.component.html',
  styleUrls: ['./certificate-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificateCreateComponent {
  @Output() onFileBrowseEmit: EventEmitter<File> = new EventEmitter<File>();
  @Output() onFileDroppedEmit: EventEmitter<File> = new EventEmitter<File>();

  onFileDropped($event: any) {
    this.onFileDroppedEmit.emit($event[0]);
  }

  onFileBrowseHandler(files: any) {
    this.onFileBrowseEmit.emit(files.files[0]);
  }

}

import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {CertificateInterface} from "../../../../core/types";

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificatesListComponent {
  @Input() certificates$: BehaviorSubject<CertificateInterface[]> = new BehaviorSubject<CertificateInterface[]>([]);
  @Input() lastAddedCertificate: CertificateInterface | null = null;

  @Output() onSelectCertificateEmit: EventEmitter<CertificateInterface> = new EventEmitter<CertificateInterface>();

  constructor() {
  }

  isActive(certificate: CertificateInterface): boolean {
    return this.lastAddedCertificate?.uuid === certificate.uuid;
  }

  onSelectCertificate(certificate: CertificateInterface): void {
    this.onSelectCertificateEmit.emit(certificate);
  }

  trackById(index: number, certificate: CertificateInterface): string {
    return certificate.uuid;
  }

}

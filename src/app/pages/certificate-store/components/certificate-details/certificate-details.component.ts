import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CertificateInterface} from "../../../../core/types";

@Component({
  selector: 'app-certificate-details',
  templateUrl: './certificate-details.component.html',
  styleUrls: ['./certificate-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CertificateDetailsComponent {
  @Input() certificate: CertificateInterface | null = null;

}

import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {FileParserService} from "../../core/services/file-parser.service";
import {LocalStorageService} from "../../core/services/local-storage.service";

import {v4 as uuidv4} from 'uuid';

import {CertificateInterface} from "../../core/types";

@Component({
  selector: 'app-certificate-store',
  templateUrl: './certificate-store.component.html',
  styleUrls: ['./certificate-store.component.css']
})
export class CertificateStoreComponent implements OnInit {
  certificates$: BehaviorSubject<CertificateInterface[]> = new BehaviorSubject<CertificateInterface[]>([]);
  showAddFileWindow = false;
  lastAddedCertificate: CertificateInterface | null = null;

  constructor(private fileParserService: FileParserService,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.certificates$ = this.localStorageService.getDataSubject();
  }

  onFileDropped(file: File) {
    this.fileParserService.fileChanged(file, uuidv4())
      .then(result => {
        this.saveCertificate(result);
      })
      .catch(reason => {
        console.log('reason', reason);
      })
  }

  fileBrowseHandler(file: File) {
    this.fileParserService.fileChanged(file, uuidv4())
      .then(result => {
        this.saveCertificate(result);
      })
      .catch(reason => {
        console.log('reason', reason);
      })
  }

  toggleAddFileWindow(): void {
    this.showAddFileWindow = !this.showAddFileWindow;
    if (this.showAddFileWindow) {
      this.lastAddedCertificate = null;
    }
  }

  onSelectCertificate(certificate: CertificateInterface): void {
    this.lastAddedCertificate = certificate;
    if (this.showAddFileWindow) {
      this.showAddFileWindow = false;
    }
  }

  saveCertificate(certificate: CertificateInterface): void {
    this.localStorageService.saveData(certificate);
    this.lastAddedCertificate = certificate;
    this.showAddFileWindow = false
  }

}

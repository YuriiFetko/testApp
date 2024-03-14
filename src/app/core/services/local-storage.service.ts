import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

import {CertificateInterface} from "../types";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageKey = 'certificatesData';
  private dataSubject = new BehaviorSubject<CertificateInterface[]>([]);

  constructor() {
    this.loadDataFromLocalStorage();
  }

  private loadDataFromLocalStorage(): void {
    const savedDataString = localStorage.getItem(this.storageKey);
    if (savedDataString) {
      const savedData = JSON.parse(savedDataString);
      this.dataSubject.next(savedData);
    }
  }

  getDataSubject(): BehaviorSubject<CertificateInterface[]> {
    return this.dataSubject;
  }

  saveData(data: CertificateInterface): void {
    const savedData = this.dataSubject.value;
    savedData.push(data);
    this.dataSubject.next(savedData);
    localStorage.setItem(this.storageKey, JSON.stringify(savedData));
  }

}

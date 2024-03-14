import {Injectable} from '@angular/core';
import * as ASN1 from "@lapo/asn1js";

import {CertificateDataWithIndex} from "../types";

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
  private dataStructure: CertificateDataWithIndex = {
    dateBefore: [4, 0],
    dateAfter: [4, 1],
    issuerCommonName: [3, 2, 0, 1],
    commonName: [5, 1, 0, 1],
  };

  constructor() {
  }

  async fileChanged(eventFile: File, uuid: string): Promise<any> {
    try {
      const fileData = await this.readFile(eventFile);

      const result: any = ASN1.decode(fileData);
      if (result.typeName() !== 'SEQUENCE') {
        throw new Error('Неправильна структура конверта сертифіката (очікується SEQUENCE)');
      }

      const tbsCertificate: any = result.sub[0];
      const data = this.getData(tbsCertificate);

      return {...data, uuid};
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private readFile(file: File): Promise<Uint8Array> {
    return new Promise<Uint8Array>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        resolve(uint8Array);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  getData(tbsCertificate: any): any {
    const result: any = {};
    for (const key of Object.keys(this.dataStructure)) {
      result[key] = this.getValueByKey(tbsCertificate, this.dataStructure[key]);
    }
    return result;
  }

  private getValueByKey(tbsCertificate: any, indexes: number[]): any {
    let current = tbsCertificate;
    for (const index of indexes) {
      current = current.sub[index];
    }
    return current.content();
  }

}

import {Component, OnInit} from '@angular/core';
import * as Hex from "@lapo/asn1js/hex";
import * as ASN1 from "@lapo/asn1js";
import {log} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  file: any;

  async fileChanged(e: any) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file);
    const fileData = await this.readFile(this.file);
    // Опрацювати fileData (Uint8Array) подальше
    console.log(fileData);
    console.log(ASN1.decode(fileData));

    const result = ASN1.decode(fileData);
    console.log('result decode', result);
    if (result.typeName() !== 'SEQUENCE') {
      throw 'Неправильна структура конверта сертифіката (очікується SEQUENCE)';
    }

    // @ts-ignore
    const tbsCertificate = result.sub[0];
    // @ts-ignore
    console.log('tbsCertificate', tbsCertificate.sub[4].content());
    // @ts-ignore
    console.log('tbsCertificate', tbsCertificate.sub[4]);

    const objectData = {
      dateBefore: [4,0],
      dateAfter: [4,1],
    }
    // @ts-ignore
    console.log('date before', tbsCertificate.sub[4].sub[0].content());
    // @ts-ignore
    console.log('date after', tbsCertificate.sub[4].sub[1].content());
    // @ts-ignore
    console.log('tbsCertificate', tbsCertificate.sub[4].sub[1]);
    // @ts-ignore
    console.log('tbsCertificate', tbsCertificate.sub[4].sub[1]);
    // @ts-ignore
    console.log('tbsCertificate', tbsCertificate.sub[4].sub[1].typeName());
    // @ts-ignore
   // console.log('tbsCertificate', tbsCertificate.sub[4].toPrettyString());
    // @ts-ignore
    const tbsCertificate2 = result.sub[2];
    // @ts-ignore
    //  console.log('tbsCertificate', tbsCertificate.content());
    // @ts-ignore
    //console.log('tbsCertificate', tbsCertificate.toPrettyString());
    const parseData = this.findAllCertificateData(tbsCertificate.sub);
    console.log('parseData', parseData);
    // // @ts-ignore
    // console.log('tbsCertificate', tbsCertificate.sub[3].sub[1].sub[0].sub[0].content());

    console.log('result', result);
    console.log(tbsCertificate);

    console.log('getData', this.getData(tbsCertificate))

  }

  private dataStructure: any = {
    dateBefore: [4, 0],
    dateAfter: [4, 1],
    issuerCommonName: [3, 2, 0, 1],
    commonName: [5, 1, 0, 1]
    // Додайте інші ключі тут, якщо необхідно
  };

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


  findAllCertificateData(subArray: any[]): any[] {
    const results: any[] = [];

    function findData(subArray: any) {
      if (subArray === null) {
        return;
      }
      if (subArray.length === 2) {

        const key = subArray[0].content();
        const value = subArray[1].content();

        const typeName0 = subArray[0].typeName()
        const typeName1 = subArray[1].typeName();
        const content0 = subArray[0].toPrettyString();
        const content1 = subArray[1].toPrettyString();

        results.push({typeName0, content0, content1, typeName1, key, value });
      } else {
        for (const sub of subArray) {
          findData(sub.sub);
        }
      }
    }

    findData(subArray);
    return results;
  }

  parseData(data: any[]): any[] {
    const parsedData: any[] = [];
    this.parseItems(data, parsedData);
    return parsedData;
  }

  private parseItems(items: any[], parsedData: any[]): void {
    items.forEach(item => {
      if (item.sub && item.sub.length === 2 && item.sub[0].sub.length === 0 && item.sub[1].sub.length === 0) {
        const key = item.sub[0].typeName();
        const value = item.sub[1].content();
        parsedData.push({ [key]: value });
      } else if (item.sub && item.sub.length > 0) {
        this.parseItems(item.sub, parsedData);
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  async readFile(file: File): Promise<Uint8Array> {
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

  uploadDocument(file: any) {
    console.log('uploadDocument', file);

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader);
      // @ts-ignore
      /// console.log(ASN1.decode(fileReader.result));
    }
    fileReader.readAsBinaryString(this.file);

    console.log('fileReader', fileReader);
    console.log('fileReader');

  }

  test($event: any) {
    console.log('test', $event);
    console.log('test', $event.files[0]);
    const result = ASN1.decode($event.files[0]);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.file);
    console.log('result', result);
    // console.log(ASN1.decode($event.files[0]))

  }
}

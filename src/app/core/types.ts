export interface CertificateInterface {
  uuid: string;
  dateBefore: string;
  dateAfter: string;
  issuerCommonName: string;
  commonName: string;
}

export interface CertificateDataWithIndex {
  [key: string]: number[];
}

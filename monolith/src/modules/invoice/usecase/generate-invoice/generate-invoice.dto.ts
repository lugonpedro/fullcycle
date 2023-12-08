export interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  street: string;
  number: number;
  city: string;
  zip: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: number;
  city: string;
  zip: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}

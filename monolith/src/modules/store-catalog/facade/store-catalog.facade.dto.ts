export interface FindStoreCatalogFacadeInputDto {
  id: string;
}

export interface FindStoreCatalogFacadeOutputDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStorageCatalogFacadeInputDto {}

export interface FindAllStorageCatalogFacadeOutputDto {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface AddProductFacadeInputDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface CheckProductFacadeInputDto {
  id: string;
}

export interface CheckProductFacadeOutputDto {
  id: string;
  stock: number;
}

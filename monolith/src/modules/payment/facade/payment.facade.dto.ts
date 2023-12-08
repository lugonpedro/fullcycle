export interface PaymentFacadeInputDto {
  orderId: string;
  amount: number;
}

export interface PaymentFacadeOutputDto {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

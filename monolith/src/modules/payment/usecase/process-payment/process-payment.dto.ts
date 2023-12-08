export interface ProcessPaymentInputDto {
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDto {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

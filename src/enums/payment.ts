export enum PaymentStatuses {
  NONE = 'NONE',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export enum PaymentActions {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  APPROVE_ALL = 'APPROVE ALL',
}

export enum PaymentStatusColors {
  PENDING = 'pickerBluewood',
  APPROVED = 'green',
  REJECTED = 'orange',
}

export enum PaymentActionColors {
  APPROVE = 'green',
  REJECT = 'orange',
  APPROVE_ALL = 'green',
}

export enum SessionStatuses {
  OPEN = 'OPEN',
  LOCKED = 'LOCKED',
  PENDING_PAYMENTS = 'PENDING PAYMENTS',
  FINISHED = 'FINISHED',
}

export enum SessionsTodayPageTabs {
  ALL = 'All',
  JOINED = 'Joined',
  HOSTED = 'Hosted',
}

export enum SessionActions {
  DELETE = 'DELETE',
  LOCK_ORDER = 'LOCK ORDER',
  SPLIT_PAYMENT = 'SPLIT PAYMENT',
  FINISH = 'FINISH',
}

export enum SessionActionColor {
  DELETE = 'orange',
  LOCK_ORDER = 'bashfulPink',
  SPLIT_PAYMENT = 'watermelon',
  FINISH = 'orange',
}

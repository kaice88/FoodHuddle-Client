export const REQUEST_POST_SESSION_INFO = "v1/session/create-new-session";
export const REQUEST_GET_HOST_PAYMENT_INFO = "/v1/session/host-payment-infor";

export const FOOD_ORDER = "/v1/food-order";

export const REQUEST_GET_ALL_SESSIONS_TODAY = "/v1/session/today";

export const REQUEST_GET_SESSION_INFO = (sessionId: string) =>
  `/v1/session/${sessionId}`;

export const REQUEST_GET_FOOD_MENU = `v1/food-order/menu`;

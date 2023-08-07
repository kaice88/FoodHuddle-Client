const BASE_URL = '/v1'
const SESSION_BASE_URL = `${BASE_URL}/session`
const FOOD_ORDER_BASE_URL = `${BASE_URL}/food-order`

const constructSessionURL = (sessionId = '', path = '') => `${SESSION_BASE_URL}/${sessionId}${path}`
const constructFoodOrderURL = (rowId = '', path = '') => `${FOOD_ORDER_BASE_URL}/${rowId}${path}`

export const REQUEST_AUTH_GOOGLE = `${BASE_URL}/auth/google/callback`

// SESSION
export const REQUEST_POST_SESSION_INFO = SESSION_BASE_URL
export const REQUEST_GET_HOST_PAYMENT_INFO = `${SESSION_BASE_URL}/host-payment-infor`
export const REQUEST_GET_ALL_SESSIONS_TODAY = `${SESSION_BASE_URL}/today`
export const REQUEST_ORDER_BILL = (sessionId: string | number) => constructSessionURL(sessionId, '/payment')
export const REQUEST_EDIT_SESSION_INFO = (sessionId: string | number) => constructSessionURL(sessionId)
export const REQUEST_GET_SESSION_INFO = (sessionId: string | number) => constructSessionURL(sessionId)
export const REQUEST_UPDATE_SESSION_STATUS = (sessionId: string | number) => constructSessionURL(sessionId, '/update-status')
export const REQUEST_USER_PAYMENT = (sessionId: string | number) => constructSessionURL(sessionId, '/user-payment')
export const REQUEST_PAYMENT_CHECKLIST = (sessionId: string | number) => constructSessionURL(sessionId, '/payment-checklist')
export const REQUEST_GET_ALL_SESSIONS_HISTORY = `${SESSION_BASE_URL}/history`
export const REQUEST_GET_HOSTED_SESSIONS_HISTORY = `${SESSION_BASE_URL}/history/hosted`
export const REQUEST_GET_JOINED_SESSIONS_HISTORY = `${SESSION_BASE_URL}/history/joined`
export const REQUEST_POST_ORDER_BILL = SESSION_BASE_URL

// FOOD ORDER
export const REQUEST_GET_FOOD_ORDER_IN_SUMMARY_TAB = `${FOOD_ORDER_BASE_URL}/summary`
export const REQUEST_FOOD_ORDER_ROW = rowId => constructFoodOrderURL(rowId)
export const FOOD_ORDER = FOOD_ORDER_BASE_URL
export const REQUEST_GET_HOSTED_SESSIONS_TODAY = `${SESSION_BASE_URL}/today/hosted`
export const REQUEST_GET_JOINED_SESSIONS_TODAY = `${SESSION_BASE_URL}/today/joined`
export const REQUEST_GET_FOOD_MENU = `${FOOD_ORDER_BASE_URL}/menu`
export const REQUEST_EDIT_FOOD_ORDER_LIST = FOOD_ORDER_BASE_URL
export const REQUEST_GET_FOOD_ORDER_LIST = (sessionId: string | number) => `${FOOD_ORDER_BASE_URL}?sessionId=${sessionId}`

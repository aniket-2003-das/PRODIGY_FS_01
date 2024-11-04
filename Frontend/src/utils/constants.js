export const HOST = import.meta.env.VITE_SERVER_URL

export const SIGNUP_ROUTE = `http://${HOST}/api/users/signup`
export const LOGIN_ROUTE = `http://${HOST}/api/users/login`
export const VERIFY_ROUTE = `http://${HOST}/api/users/verify`
export const USER_INFO_ROUTE = `http://${HOST}/api/users/getUserInfo`
export const LOGOUT_ROUTE = `http://${HOST}/api/users/logout`

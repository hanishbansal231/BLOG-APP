const BASE_URL = ' http://localhost:3001/api/v1';

export const USER_ENDPOINT = {
    REGISTER_USER: BASE_URL + '/user/signup',
    LOGIN_USER: BASE_URL + '/user/login'
}

export const BLOG_ENDPOINT = {
    CREATE_BLOG: BASE_URL + '/blog/createblog',
}
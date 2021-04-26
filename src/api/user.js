import http from '../utils/request';


export function Login(params) { return http.post('/users/login', params, true); }
export function queryWeather(params) { return http.get('users/queryWeather', params); }
import http from '../utils/request';

export function queryWeather(params) { return http.get('all/queryWeather', params); }

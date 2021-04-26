import http from '../utils/request';

// 获取所有账户区域
export function getAllAccountRegion(params) { return http.get('/users/getAllAccountRegion', params); }

// 根据id获取该id区域的行政区域分支
export function getRegionBranch(params) { return http.get('/users/getRegionLevelOfId', params); }

// 根据id获取该id的行政区域下属的行政区域
export function getChildRegionById(params) { return http.get('/users/getChildRegionById', params); }

// 获取生成图表的数据
export function getGenerateChartsData(params) { return http.post('/chart/getGenerateChartsData', params); }
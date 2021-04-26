import http from '../utils/request';

export function queryWaterMeterCopyRecords(params) { return http.post('/watermeter/queryWaterMeterCopyRecords', params); }
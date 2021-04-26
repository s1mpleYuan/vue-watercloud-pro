import http from '../utils/request';

// 查询该账号下所属的其他账号
export function queryOtherUsersInfo(params) { return http.post('/users/queryOtherUsersInfo', params); }

// 根据筛选条件查询账户信息
export function queryUserInfoByConditions(params) { return http.post('/users/queryUserInfoByConditions', params); }

// 编辑账户
export function editUserInfo(params) { return http.post('/users/editUserInfo', params); }

// 删除账户
export function deleteUserInfo(params) { return http.delete('/users/deleteUserInfo', params); }

// 查询所有企业代码
export function queryAllEnterpriseCode() { return http.get('/enterprises/queryAllEnterpriseCode'); }

// 新建新账户
export function createUserInfo(params) { return http.post('/users/createUserInfo', params); }
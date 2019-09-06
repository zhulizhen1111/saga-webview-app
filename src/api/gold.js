import service from "./service";

// 查询应急预案
export function QueryEventReport({ postParams }) {
    return service.postJson(`/duoduo-service/manage-service/manage/plan/query`, {}, postParams)
}
//  查询应急预案掌握
export function QueryIncident({ postParams }) {
    return service.postJson(`/server/manage/plan/master/query`, {}, postParams)
}
// 查询所有的成就
export function QueryAllGrade({ getParams }) {
    return service.getJson(`/server/manage/achievenment/list`, getParams)
}
// 查询人员成就
export function QueryMyGrade({ postParams }) {
    return service.postJson(` /server/manage/achievenment/person/query`, {}, postParams)
}
//查询累计金币和剩余金币
export function QueryGold({ postParams }) {
    return service.postJson(` /duoduo-service/manage-service/manage/coin/query`, {}, postParams)
}
//查询人员等级
export function QueryLevel({ postParams }) {
    return service.postJson(`/server/manage/level/person/query`, {}, postParams)
}
//专业中英文匹配
export function major({ getParams }) {
    return service.getJson(`/duoduo-service/manage-service/manage/major/list`, getParams)
}

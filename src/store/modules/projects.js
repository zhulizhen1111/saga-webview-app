/**
 *@author: fugy
 *@date: 2018.10.08
 *@info: wx授权信息
 */
var project = {
    state: {
        projects: [
            { projectId:"Pj1101080002"}
        ],
    },
    getters: {
        projects: state => state.projects,  
    },
    mutations: {
        projects: (state, val) => (state.projects = val),
    },
    actions: {

    }
}
export default project
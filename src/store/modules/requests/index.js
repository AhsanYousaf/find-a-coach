import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
    mutations,
    actions,
    getters,
    namespaced: true,
    state() {
        return {
            requests: []
        };
    }
};
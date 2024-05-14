// Axios
import Axios from 'axios';

// Vue Axios wrapper
import VueAxios from 'vue-axios';

Axios.defaults.withCredentials = true;

Axios.interceptors.request.use(
    function (config) {
        config.headers["X-Requested-With"] = "XMLHttpRequest";
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    function (response) {
        const {skipResultHandler} = response.config;
        return Promise.resolve(skipResultHandler ? response : response.data);
    },
    function (error) {
        if (error.response.data && error.response.data.msg) {
            error.message = error.response.data.msg;
        }
        return Promise.reject(error);
    }
);

export function registerAxios(app) {
    app.use(VueAxios, Axios);
    // app.provide('axios', app.config.globalProperties.axios);
    app.provide('$http', app.config.globalProperties.axios);
}

import AlbumListView from './views/AlbumListView'
import AlbumView from './views/AlbumView'
import App from './App.vue'
import Attachment from './components/Attachment'
import Comment from './components/Comment'
import DotEnv from 'dotenv'
import Entry from './components/Entry'
import EntryList from './components/EntryList'
import EntryListView from './views/EntryListView'
import HomeView from './views/HomeView'
import NotFound from './components/NotFound'
import NotFoundView from './views/NotFound'
import Sidebar from './components/Sidebar'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import LocalStorageService from "./services/LocalStorageService";
import moment from 'moment-timezone'

DotEnv.config();

require('moment/locale/fi'); // HACK: https://momentjs.com/docs/#/use-it/browserify/
moment.tz.setDefault(LocalStorageService.getTimezone())

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(require('vue-moment'), {
    moment
});

Vue.http.options.root = process.env.VUE_APP_API_ROOT

Vue.component('sidebar', Sidebar)
Vue.component('entry-list', EntryList)
Vue.component('entry', Entry)
Vue.component('comment', Comment)
Vue.component('attachment', Attachment)
Vue.component('not-found', NotFound)

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/404',
        component: NotFoundView,
    },
    {
        path: '/:urlName/',
        component: EntryListView,
        props: true,
    },
    {
        path: '/:urlName/:year/:month/:day/',
        component: EntryListView,
        props: true
    },
    {
        path: '/:urlName/albums/',
        component: AlbumListView,
        props: true
    },
    {
        path: '/:urlName/albums/:placeId',
        component: AlbumView,
        props: true
    },
    {
        path: '*',
        redirect: '/404'
    },
    
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

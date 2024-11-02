import './bootstrap';
import '../sass/main-app.scss';

import { createApp, h } from 'vue';
import routes from './router/admin';
import App from './app.vue';

createApp(App)
    .use(routes)
    .mount('#app');
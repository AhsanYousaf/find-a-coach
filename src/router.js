import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList';
import CoachesDetails from './pages/coaches/CoachesDetails.vue';
import CoachesRegistration from './pages/coaches/CoachesRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        {
            path: '/coaches/:id',
            component: CoachesDetails,
            props: true,
        },
               { path: '/coaches/:id/contact', component: ContactCoach },
        
        { path: '/register', component: CoachesRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/auth', component: UserAuth },
        { path: '/:notFound(.*)', component: NotFound },
    ],
});
export default router;
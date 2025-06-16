import Home from '@/components/pages/Home';
import Discover from '@/components/pages/Discover';
import Messages from '@/components/pages/Messages';
import Notifications from '@/components/pages/Notifications';
import Profile from '@/components/pages/Profile';
import PostDetail from '@/components/pages/PostDetail';

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/home',
    icon: 'Home',
    component: Home
  },
  discover: {
    id: 'discover',
    label: 'Discover',
    path: '/discover',
    icon: 'Compass',
    component: Discover
  },
  messages: {
    id: 'messages',
    label: 'Messages',
    path: '/messages',
    icon: 'MessageCircle',
    component: Messages
  },
  notifications: {
    id: 'notifications',
    label: 'Notifications',
    path: '/notifications',
    icon: 'Bell',
    component: Notifications
  },
  profile: {
    id: 'profile',
    label: 'Profile',
    path: '/profile',
    icon: 'User',
    component: Profile
  },
  postDetail: {
    id: 'postDetail',
    label: 'Post Detail',
    path: '/post/:id',
    icon: 'FileText',
    component: PostDetail
  }
};

export const routeArray = Object.values(routes);
export default routes;
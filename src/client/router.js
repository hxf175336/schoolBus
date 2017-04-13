// route
import NavConfig from './components/common/navList'

const registerRoute = (config) => {
  let route = [];
  for(let item in config) {
    config[item].map(page => {
      route.push({
        name: page.name,
        path: page.path,
        component: require(`./components${page.path}/index.vue`)
      })
    })
  }
  return route;
};

let route = registerRoute(NavConfig);

route.push({
  path: '/',
  component: require('./components/home/index.vue')
});

export default {
  routes: route
};

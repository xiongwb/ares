
/**
*  原始的 popToRoute 用起来比较绕，简单封装一下
*  by fushang318
*/
export default class NavigatorUtils {
  static popToRoute(navigator, route){
    var routes = navigator.getCurrentRoutes()
    for (var i = routes.length - 1; i >= 0; i--) {
      if(routes[i].id === route.id){
        //合并参数
        Object.assign(routes[i], route);
        navigator.popToRoute(routes[i]);
      }
    }
  }
}

var routerApp = angular.module('routerApp', ['ui.router', 'ngCookies','homepageModule','selfinfoModule','headerModule','houseModule','login_Module','register_Module','recommend_Module']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

routerApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("index");
	$stateProvider
		.state('index', {
			url: '/index',
			templateUrl: 'tpls/homepage.html'
		})
        .state('login', {
			url: '/login',
			templateUrl: 'tpls/login.html'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'tpls/register.html'
		})
		.state('recommend', {
			url: '/recommend/:rec_visible/:house_id',
			templateUrl: 'tpls/recommend.html'
		})
		.state('house',{
			url:'/house/:houseId',
			templateUrl:'tpls/house.html'
		})
		.state('selfinfo',{
			url:"/selfinfo",
			templateUrl:'tpls/selfinfo.html'
		})

})
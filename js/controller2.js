//登录
var loModule = angular.module('login_Module', []);
loModule.controller('loginCtrl', function($scope, $http, $state, $cookieStore, $rootScope) {
	$scope.logininfo = {
		'phone_no': '',
		'passwd': ''
	}
	$rootScope.phone_no = {}
		//点击登录发送用户名和密码
	$scope.login = function() {
		console.log($scope.logininfo)

		$http.post("/haofangtianxia-server/index.php/user/login", $.param($scope.logininfo), {
				'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.success(function(response) {
				if (response.meta.code == 200) {

					//登录成功后存储rootScope
					$rootScope.phone_no = $scope.logininfo.phone_no;
					$rootScope.username = response.data.name;
					$state.go('index');


				} else {
					$.teninedialog({
						title: '系统提示',
						content: response.meta.description
					});

				}
			})

	}



});

//注册
var regModule = angular.module('register_Module', []);
regModule.controller('registerCtrl', function($scope, $http, $state, $cookieStore, $rootScope) {

	$scope.reginfo = {
		'phone_no': '',
		'passwd': '',
		'name': '',
		'id_no': '',
		'bank_name': '',
		'bank_no': '',
	}

	//点击注册发送用户注册信息
	$scope.reg = function() {
		if ($rootScope.phone_no != null && $rootScope.phone_no != undefined) {
			//如果已经登陆了，不允许注册
			$.teninedialog({
				title: '系统提示',
				content: '请退出登录后再注册'
			});


		} else {
			//如果还没登录，就可以注册

			console.log($scope.reginfo)
			$http.post("/haofangtianxia-server/index.php/user/register", $.param($scope.reginfo), {
					'headers': {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
				.success(function(response) {
					if (response.meta.code == 200) {

						$.teninedialog({
							title: '系统提示',
							content: '注册成功'
						});

						//          成功后自动登录并跳转到首页 
						// $state.go('index');

					} else {


						$.teninedialog({
							title: '系统提示',
							content: response.meta.description
						});
					}
				})
		};





	}
});


var recModule = angular.module('recommend_Module', []);
recModule.controller('recommendCtrl', function($scope, $http, $state, $cookieStore, $rootScope, $state,$stateParams) {

	var visible = $stateParams.rec_visible;
	var test = 1;

	$scope.rec_visible = function() {

		if (visible === null || visible === undefined || visible == '') {

			return true;

		} else {

			return false;

		}
	}

	if ($stateParams.house_id == undefined || $stateParams.house_id == null || $stateParams.house_id == '') {
		$scope.house_id = {};

	} else {
		$scope.house_id = $stateParams.house_id;

	}

//	if ($stateParams.house_name == undefined || $stateParams.house_name == null || $stateParams.house_name == '') {
//		$stateParams.house_name = {};
//
//	} else {
//		$scope.house_name = $stateParams.house_name;
//
//	}
    $scope.house_name=$rootScope.rec_housename;

	$scope.recinfo = {
			'name': '',
			'aim_house_id': $scope.house_id,
			'phone_no': '',
			'aim_price': '',
			'remark': '',
			'phone_no_user': $rootScope.phone_no,
			'type': '1'
		}
		//接收传过来的值

	$scope.confirm = function() {

		$http.post("/haofangtianxia-server/index.php/user/recommend", $.param($scope.recinfo), {
				'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.success(function(response) {
				if (response.meta.code == 200) {

					$.teninedialog({
						title: '系统提示',
						content: '提交推荐成功'
					});


					if (history.length == 1) {
						location.href = 'index.html';
					} else {
						history.back(-1);
					}

				} else {
					$.teninedialog({
						title: '系统提示',
						content: "提交推荐失败"
					});

				}

			});



	}



	$scope.goback = function() {
		if (history.length == 1) {
			location.href = 'index.html';
		} else {
			history.back(-1);
		}
	}
});
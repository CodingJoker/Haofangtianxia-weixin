var header = angular.module('headerModule', []);
header.controller('headerCtrl',function($scope,$state,$rootScope){
	$rootScope.backhide = true;
	$rootScope.homepagehide = true;
	
	$scope.back = function(){
		$state.go('index');
		$rootScope.backhide = true;
		$rootScope.homepagehide = true;
	}
	$scope.homepage = function(){
		$state.go('index');
		$rootScope.backhide = true;
		$rootScope.homepagehide = true;
	}

})
var homepage = angular.module('homepageModule', []);
homepage.controller('homepageCtrl',  function($scope,$http,$state,$rootScope){
	$scope.houses = [];
	var num = {
		'num': '4'
	}
	$http.post("/haofangtianxia-server/index.php/home/recommend", $.param(num), {
		'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
	})
		.success(function(response){
			if(response.meta.code == 200)
				$scope.houses = response.data.pictures;
		})
	$scope.go = function(where){
		if($rootScope.phone_no == null)
		{
			 $.teninedialog({
                    title:'系统提示',
                    content:'请先登录',
                    otherButtons:["去登录"],
                    otherButtonStyles:['btn-primary'],
                     clickButton:function(sender,modal,index){
                        $(this).closeDialog(modal);
                        location.href = 'index.html#/login'
                    }
                });
		}
		else{
			if(where == 'recommend')
			{
				$state.go(where,{'rec_visible':1,'house_id':0});
			}
			else{
				$state.go(where)
			}
		}
	}
	$scope.gohouse = function(id){
		$state.go('house',{'houseId':id});
	}
	$scope.one_recommend = function(id,name){
		if($rootScope.phone_no == null)
		{
			 $.teninedialog({
                    title:'系统提示',
                    content:'请先登录',
                    otherButtons:["去登录"],
                    otherButtonStyles:['btn-primary'],
                     clickButton:function(sender,modal,index){
                        $(this).closeDialog(modal);
                        location.href = 'index.html#/login'
                    }
                });
		}
		else{
			$state.go('recommend',{'rec_visible':0,'house_id':id});
			$rootScope.rec_housename = name;
		}
		
	}
})

var selfinfo = angular.module('selfinfoModule', []);
selfinfo.controller('selfinfoCtrl', function($rootScope,$scope,$http,$state,$stateParams){
	$rootScope.backhide = false;
	$rootScope.homepagehide = false;
	var userId = {
		"phone_no" :$rootScope.phone_no
	};
	$scope.name = $rootScope.username;
	$scope.bankname = '';
	$scope.bankno = '';
	$scope.recommend_num = 0;
	$scope.recomUser = [];
	$http.post('/haofangtianxia-server/index.php?/user/info',$.param(userId),{
		'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
	})
	.success(function(response){
			if(response.meta.code == 200){
				$scope.bankname = response.data.bank_name;
				$scope.bankno = response.data.bank_no;
				$scope.id_no = response.data.id_no;
			}
	});
	$http.post("/haofangtianxia-server/index.php?/Recommend/user", $.param({'phone':userId}),{
		'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
	})
		.success(function(response){
			if(response.meta.code == 200){
				if(response.meta.status == 101){
					$scope.recomUser = response.data;
					$scope.recommend_num = response.data.length;
				}
			}
		})
	$scope.disctrl = new Array(true,true,true,true);
	$scope.edit = function(num){
		$scope.disctrl[num] = false;
	}
	$scope.checkSubmit = function(num){
		var data = {
			'bank_name':$scope.bankname,
			'bank_no':$scope.bankno,
			'phone_no': $rootScope.phone_no
		}
		$scope.disctrl[num] = true;
		$http.post('/haofangtianxia-server/index.php/user/modify',$.param(data),{
			'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		})
		.success(function(response){
			if(response.meta.code == 200){
				$.teninedialog({
		                    title:'系统提示',
		                    content:'修改成功'
		                });
			}
		})
		
	
	}
})
var house = angular.module('houseModule', []);
house.controller('houseCtrl', function($rootScope,$scope,$http,$state,$stateParams){
	$rootScope.backhide = false;
	$rootScope.homepagehide = false;
	$rootScope.rec_housename='';
	var houseId = $stateParams.houseId;
	$scope.house = null;
	$http.post('/haofangtianxia-server/index.php/house/detailinfo',$.param({'house_id':houseId}),{
		'headers': {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
	})
			.success(function(response){
				if(response.meta.code == 200){
					$scope.house = response.data;
				}
			})
	$scope.goRegister = function () {
		if($rootScope.phone_no == null)
		{
			$.teninedialog({
                    title:'系统提示',
                    content:'请先登录',
                    otherButtons:["去登录"],
                    otherButtonStyles:['btn-primary'],
                     clickButton:function(sender,modal,index){
                        $(this).closeDialog(modal);
                        location.href = 'index.html#/login'
                    }
                });
		}
		else{
			var data = {
				'rec_visible':0,
				'house_id':houseId
			}

			$rootScope.rec_housename=$scope.house.name;

			$state.go('recommend',data);

		}
	}
})
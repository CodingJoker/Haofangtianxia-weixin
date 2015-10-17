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
	$http.post("data/homepage_house.json")
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
			if(where == 'register')
			{
				$state.go(where,{'rec_visible':0,'house_id':0,'house_name':''});
			}
			else{
				$state.go(where)
			}
		}
	}
	$scope.gohouse = function(id){
		$state.go('house',{'houseId':id});
	}
})

var selfinfo = angular.module('selfinfoModule', []);
selfinfo.controller('selfinfoCtrl', function($rootScope,$scope,$http,$state,$stateParams){
	$rootScope.backhide = false;
	$rootScope.homepagehide = false;
	var userId = $rootScope.phone_no;
	$scope.name = '';
	$scope.bankname = '';
	$scope.bankno = '';
	$scope.recommend_num = 0;
	$http.post('data/selfinfo.json',userId)
	.success(function(response){
			if(response.meta.code == 200){
				$scope.bankname = response.data.bank_name;
				$scope.bankno = response.data.bank_no;
				$scope.id_no = response.data.id_no;
				$scope.recommend_num = response.data.recommend_no;
			}
	})
	$scope.disctrl = new Array(true,true,true,true);
	$scope.edit = function(num){
		$scope.disctrl[num] = false;
	}
	$scope.checkSubmit = function(num){
		$scope.disctrl[num] = true;
		$.teninedialog({
                    title:'系统提示',
                    content:'修改成功'
                });
	}
})
var house = angular.module('houseModule', []);
house.controller('houseCtrl', function($rootScope,$scope,$http,$state,$stateParams){
	$rootScope.backhide = false;
	$rootScope.homepagehide = false;
	var houseId = $stateParams.houseId;
	$scope.house = null;
	$http.get('data/houseinfo.json',{'houseId':houseId})
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
				'rec_visible':1,
				'house_id':houseId,
				'house_name':house.name
			}
			$state.go('register',data);
		}
	}
})
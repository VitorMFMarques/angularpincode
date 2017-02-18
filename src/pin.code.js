'use strict';
angular.module('pinCode',[]).directive('digitRestricted',['$timeout',function($timeout){
    
    function getPin(obj){
        var pin = '';
        for(var key in obj){
            pin += obj[key];
        }
        return pin;
    };
    
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            
            var idx = parseInt(attrs.idx,10);
            var digits = scope.$parent.numberOfDigits;
            var hideInput = scope.$parent.hideInput;
            var hideTimeout = scope.$parent.hideTimeout;
            var $prevElem;
            var $nextElem;
            
            angular.element(element).on('keydown',function(e){
                if(e.keyCode===8){
                    scope.$parent.digits[''+idx] = '';
                    scope.$parent.pin = getPin(scope.$parent.digits);
                    if(idx>0){
                        $timeout(function(){
                            $prevElem = $prevElem || $('#pin-d-'+(idx-1));
                            $prevElem.focus();
                            $timeout(function(){
                                $prevElem.select();
                            },0);
                        },0);
                    }
                }  
            });
            
            angular.element(element).on('keypress',function(e){
                
                if (e.keyCode == 13 && idx===(digits-1) && getPin(scope.$parent.digits).length===digits) {
                   if(typeof scope.onEnter === 'function'){
                       scope.onEnter();
                   }
                }
                
                var $this = $(this);
                var newValue = $this.val();
                if(newValue === ' '){
                    $this.select();
                    newValue = '';
                }
                if(e.charCode!==0){
                    newValue += String.fromCharCode(e.charCode);
                }
                if(!/^[0-9]$/.test(newValue) || newValue.length>1){
                    e.preventDefault();
                    return;
                }
                if(newValue.length===1){
                    if(idx<(digits-1)){
                        $timeout(function(){
                            $nextElem = $nextElem || $('#pin-d-'+(idx+1));
                            $nextElem.focus();
                        },0);
                    }
                    if(hideInput){
                        scope.$parent.digits[''+idx] =  newValue;
                        scope.$parent.pin = getPin(scope.$parent.digits);
                        $timeout(function(){
                            scope.$parent.inputs[''+idx] = ' ';
                        },hideTimeout);
                    }
                }   
                
            });
            
            angular.element(element).on('click',function(){
                $(this).select();
            });
            
        }
    };
}]);
angular.module('pinCode').directive('pin',function(){
    return {
        restrict:'E',
        template:'<div ng-repeat="inputIdx in inputsIdxs"><input idx="{{inputIdx}}" id="pin-d-{{inputIdx}}" type="text" ng-model="inputs[inputIdx]" digit-restricted><span ng-show="inputs[inputIdx] == \' \'" ng-bind-html="hideSymbol"></span></div>',
        link:function(scope,element,attrs){
            
            scope.numberOfDigits = scope.numberOfDigits || 4;
            scope.hideSymbol = scope.hideSymbol || '&#9899;';
            scope.hideInput = scope.hideInput || true;
            scope.hideTimeout = scope.hideTimeout || 200;
            scope.inputs = {};
            scope.digits = {};
            scope.inputsIdxs = [];
            scope.pin = scope.pin || '';
            
            for(var i = 0;i<scope.numberOfDigits;i++){
                scope.inputsIdxs.push(''+i);
            }
            
            scope.$watch('pin',function(){
               if(!scope.pin){
                   scope.inputs = {};
                   scope.digits = {};
               }
            });
            
            scope.$on('focusPin', function(event, args) {
                $('#pin-d-0').focus();
            });

        },
        scope:{
           numberOfDigits:'=digits',           
           hideInput:'=?',
           hideTimeout:'=?',
           hideSymbol:'=?',
           pin:'=',
           onEnter:'&?'
        }
    }
});
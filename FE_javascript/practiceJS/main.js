var worker = (function() {
	var name = 'jerome';
	var sex = 'male';
	var position = 'development';
	var salary = 2000;
	var taxSalary = 200;
	var totalBonus = 100;
	var taxBonus = 10;
	
	var payBonus = function(){
		totalBonus = totalBonus - taxBonus;
		return totalBonus;
	};
	var paySalary = function(){
		return salary - taxSalary;
	};
	
	// Public 속성, 메서드
	return {
		name: name,
		sex: sex,
		position: position,
		paySalary : paySalary,
		payBonus : payBonus
	};
}());

// name 속성은 public
console.log(worker.name);
// salary 변수는 즉시실행함수 내부변수 이므로 private
console.log(worker.salary);
// paySalary 메서드는 public
console.log(worker.paySalary());

// payBonus 메서드는 public
console.log(worker.payBonus());
console.log(worker.payBonus());

//SPA 모듈 작성 순서 예시
var app = (function () {
  
  // 1. 모듈 스코프 내에서 사용할 변수 작성
  var scopeVar = {};
  var utilMethod;
  var manipulateDom;
  var eventHandle;
  var initModule;

  // 2. 유틸리티 메서드 작성
  utilMethod = function () { }
  
  // 3. DOM 조작 메서드 작성
  manipulateDom = function () { }

  // 4. 이벤트 핸들러 작성
  eventHandle = function () { }

  // Public 메서드 작성
  initModule = function () { }
  return {
    init: initModule
  }
}());
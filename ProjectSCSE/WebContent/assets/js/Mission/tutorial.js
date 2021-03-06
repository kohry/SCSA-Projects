var detectLight = true;
var redSign = false;
var greenSign = false;
var redSignal = "red";
var greenSignal = "green";

function setRedSign(signal) {
	if(signal=="red") {
		redSign = true;
	}
}

function setGreenSign(signal) {
	if(signal=="green") {
		greenSign = true;
	}
}

$(function() {

	$(".trainLink").hide();
	$(".trainLink", "#board").show();

	$( "#selector, #board" ).sortable({
	      connectWith: ".sortable",
	      items: "li:not(.locomotive)",
	      start: function(event, ui) {
			$(".trainLink", ui.item).hide();
	      },
	      update: function(event, ui) {
	    	$(".trainLink", "#board").show();
	      }
	    }).disableSelection();
	
	/*$("#selector").sortable({
		connectWith : ".sortable",
		forcePlaceholderSize : false,
		stop : function() {
			copyHelper && copyHelper.remove();
		},
		revert : true
	});

	$(".sortable").sortable({
		receive : function(e, ui) {
			copyHelper = null;
		},
		revert : true
	});*/
	
	$(".trafficLight1").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/redlight.png')").attr("id", "redLight");
	setTimeout(function() {
		$(".trafficLight1").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/greenlight.png')").attr("id", "greenLight");
	}, 2000);
	setTimeout(function() {
		$(".trafficLight1").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/redlight.png')").attr("id", "redLight");
	}, 4000);
	setInterval(function() {
		setTimeout(function() {
			$(".trafficLight1").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/greenlight.png')").attr("id", "greenLight");
		}, 2000);
		setTimeout(function() {
			$(".trafficLight1").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/redlight.png')").attr("id", "redLight");
		}, 4000);
	}, 4000);
	$(".trafficLight2").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/greenlight.png')").attr("id", "greenLight");
	setTimeout(function() {
		$(".trafficLight2").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/redlight.png')").attr("id", "redLight");
	}, 3000);
	setTimeout(function() {
		$(".trafficLight2").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/greenlight.png')").attr("id", "greenLight");
	}, 5000);
	setTimeout(function() {
		setInterval(function() {
			setTimeout(function() {
				$(".trafficLight2").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/redlight.png')").attr("id", "redLight");
			}, 2000);
			setTimeout(function() {
				$(".trafficLight2").css("background-image", "url('/ProjectSCSE/assets/image/Tutorial/greenlight.png')").attr("id", "greenLight");
			}, 4000);
		}, 4000);
	}, 1000);
});

// 오른쪽으로 간다
function moveRight() {
	$('#target').animate({
		left : '+=75px'
	}, 'slow', function() {
		clearTimeout(afterTimeOut);
		checkLight();
		if(!detectLight) {
			if(redSign) {
				wait(2000);
			}
			detectLight = true;
		}
		afterTimeOut = setTimeout(function() {
			checkSuccess();
		}, 700);
	});
	detection = detection + 1;
}

//신호등 충돌 체크 함수
function lightCollision($div1, $div2) {
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var h2 = $div2.outerHeight(true);
	var b2 = y2 + h2;
	if (r1 == x2 && y1 == y2 && b1 == b2) {
		return true;
	}
	return false;
}

function checkSuccess() {
	if(redSign) {
		$("#nextBtn").show();
		$("#CorrectModal").modal("show");
		
	/*	alert("성공하였습니다!");
		*/
		successUpdate();
	} else {
		$("#retryBtn").show();
		$("#WrongModal").modal("show");
		
/*		alert("실패하였습니다!");
		
*/	}
}

function checkLight() {
	$(".light").each(function(index, item) {
		var flag = lightCollision($('#target'), $(this));
		if (flag) {
			if($(this).attr("id")=="greenLight") {
				detectLight = true;
			}else {
				detectLight = false;
			}
		}
	});
}

function wait(msecs){
	var start = new Date().getTime();
	var cur = start;
	while(cur - start < msecs)
	{
	cur = new Date().getTime();
	}
}
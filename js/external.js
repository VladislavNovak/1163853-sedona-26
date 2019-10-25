// скрипт начинает работать в момент загрузки документа:
window.onload = function() {
	//! index: открытие/закрытие формы
	// получаем элемент, который будет управлять открытием формы:
	var eLink = document.querySelector(".popup-opener");
	var eCheckIn = document.querySelector("#check-in");
	// по клику запускаем функцию, которая...
	eLink.addEventListener("click", function(evt) {
		evt.preventDefault();
		// получет элемент формы и...
		var ePopup = document.querySelector(".booking-form");	
		// скрывает её, если у неё стиль display:flex или наоборот - прячет её:
		// ePopup.style.display = (ePopup.style.display == "none") ? "flex" : "none";
		if(ePopup.style.display == "none") {
			ePopup.style.display = "flex";
			eCheckIn.focus();
		} else {
			ePopup.style.display = "none";
		}
	});

	//! index форма: проверка корректности введённой даты
	var eIndexForm = document.querySelector("#hotel-selector");
	var eCheckInValid = document.querySelector("#check-in");
	var eCheckOutValid = document.querySelector("#check-out");
	var eAdultValid = document.querySelector("#adult");
	var eChildrenValid = document.querySelector("#children");

	eIpdexForm.addEventListener("submit", function(evt){
		if(!eCheckInValid||!eCheckInValid||!eAdultValid||!eChildrenValid) {
			evt.preventDefault();
			console.log("Нужно ввести корректные значения");
		}
	});
};

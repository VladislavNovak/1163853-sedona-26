// скрипт начинает работать в момент загрузки документа:
window.onload = function() {
	// ! index: открытие/закрытие формы через клик на button !
	// получаем элемент, который будет управлять открытием формы:
	var eLink = document.querySelector(".popup-opener");
	var eCheckInSetFocus = document.querySelector("#check-in");
	var eCheckIn = document.querySelector("#check-in");
	var eCheckOut = document.querySelector("#check-out");

	// по клику запускаем функцию, которая...
	eLink.addEventListener("click", function(evt) {
		evt.preventDefault();
		// получет элемент формы и...
		var ePopup = document.querySelector(".booking-form");	

		// скрывает её, если у неё стиль display:flex или наоборот - прячет её:
		// ePopup.style.display = (ePopup.style.display == "none") ? "flex" : "none";
		if(ePopup.style.display == "none") {
			ePopup.style.display = "flex";
			eCheckInSetFocus.focus();

			// возвращаем сохранённые данные:
			eCheckIn.value = localStorage.getItem("checkInValue");
			eCheckOut.value = localStorage.getItem("checkOutValue");
		} else {
			// сохраняем данные в localStorage
			try {
				localStorage.setItem("checkInValue", eCheckIn.value);
				localStorage.setItem("checkOutValue", eCheckOut.value);
			} catch(err) {}

			// и закрываем форму
			ePopup.style.display = "none";

		}
	});

	// ! index: закрытие формы через ESC !
	// получет элемент формы...
	var ePopup = document.querySelector(".booking-form");
	ePopup.addEventListener("keydown", function(evt) {
		// если форма открыта и нажата ESC...
		if(evt.keyCode === 27 && ePopup.style.display == "flex") { 
			// <- if( ePopup.classList.contains("modal-show") ) {
			// то форму можно свернуть
			evt.preventDefault();
			ePopup.style.display = "none";
			// -> ePopup.classList.remove("modal-show");
		}
	});

	//! index форма: проверка корректности введённой даты
	// var eIndexForm = document.querySelector("#hotel-selector");
	// var eCheckInValid = document.querySelector("#check-in");
	// var eCheckOutValid = document.querySelector("#check-out");
	// var eAdultValid = document.querySelector("#adult");
	// var eChildrenValid = document.querySelector("#children");

	// eIndexForm.addEventListener("submit", function(evt){
	// 	if(!eCheckInValid||!eCheckInValid||!eAdultValid||!eChildrenValid) {
	// 		evt.preventDefault();
	// 		console.log("Нужно ввести корректные значения");
	// 	}
	// });

	// эксперименты с localStorage
	// localStorage.setItem("name", "keks");
};

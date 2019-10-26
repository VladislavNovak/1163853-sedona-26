// скрипт начинает работать в момент загрузки документа:
window.onload = function() {
	// ! index: открытие/закрытие формы через клик на button !
	// получаем элемент, который будет управлять открытием формы:
	var $ = getCls => { return document.querySelector(getCls); };

	var popupOpener = 		$(".popup-opener");
	var bookingForm = 		$(".booking-form");
	var checkinOnload = 	$("#check-in");
	var checkin = 			$("#check-in");
	var checkout = 			$("#check-out");

	

	// по клику запускаем функцию, которая...
	popupOpener.addEventListener("click", function(evt) {
		evt.preventDefault();
		// скрывает её, если у неё стиль display:flex или наоборот - прячет её:
		// ePopup.style.display = (ePopup.style.display == "none") ? "flex" : "none";
		if(bookingForm.style.display == "none") {
			bookingForm.style.display = "flex";
			checkinOnload.focus();

			// возвращаем сохранённые данные:
			checkin.value = localStorage.getItem("checkInValue");
			checkout.value = localStorage.getItem("checkOutValue");
		} else {
			// сохраняем данные в localStorage
			try {
				localStorage.setItem("checkInValue", checkin.value);
				localStorage.setItem("checkOutValue", checkout.value);
			} catch(err) {}

			// и закрываем форму
			bookingForm.style.display = "none";

		}
	});

	// ! index: закрытие формы через ESC !
	bookingForm.addEventListener("keydown", function(evt) {
		// если форма открыта и нажата ESC...
		if(evt.keyCode === 27 && bookingForm.style.display == "flex") { 
			// <- if( ePopup.classList.contains("modal-show") ) {
			// то форму можно свернуть
			evt.preventDefault();
			bookingForm.style.display = "none";
			// -> ePopup.classList.remove("modal-show");
		}
	});

};
// скрипт начинает работать в момент загрузки документа:
window.onload = function() {
	// получаем элемент, который будет управлять открытием формы:
	var eLink = document.querySelector(".popup-opener");
	// по клику запускаем функцию, которая...
	eLink.addEventListener("click", function(evt) {
		evt.preventDefault();
		// получет элемент формы и...
		var ePopup = document.querySelector(".booking-form");	
		// скрывает её, если у неё стиль display:flex или наоборот - прячет её:
		ePopup.style.display = (ePopup.style.display == "none") ? "flex" : "none";
	});
}

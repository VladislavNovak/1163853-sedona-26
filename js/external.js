// скрипт начинает работать в момент загрузки документа:
window.addEventListener("load", function (evt) {
	var popupOpener = document.querySelector(".popup-opener");
	var bookingForm = document.querySelector(".booking-form");
	// var bookingFormHidden = document.querySelector(".booking-form-hidden");
	// var checkIn = document.querySelector("#check-in");
	// var checkOut = document.querySelector("#check-out");
	var checkIn = document.querySelector("[name=check-in]");
	var checkOut = document.querySelector("[name=check-out]");
	var adult = document.querySelector("[name=adult]");
	// флаг: открывалась ли форма. Если еще не открывалась, то спрячем форму при загрузке страницы:
	var isOpenerWasPressed = false;

	// проверяем доступность локального хранилища:
	function storageAvialable() {
		try {
			var storage = window.localStorage; 
			var x = "__storage_test__"; 
			storage.setItem(x, x);
			storage.removeItem(x);
			return true;
		} catch(error) {
			return false;
		}
	}

	// если кнопка открытия/закрытия и сама форма существуют...
	if (popupOpener && bookingForm) {
		// ... а форма ещё не открывалась...
		if (isOpenerWasPressed == false) {
			// ... просто прячем форму. 
			bookingForm.classList.remove("booking-form");
			bookingForm.classList.add("booking-form-hidden");
		}

		// проверяем событие на кнопке открытия формы (в данном случае - клик):
		popupOpener.addEventListener("click", function (evt) {
			evt.preventDefault();
			// устанавливаем флаг дающий знать, что форма минимум однажды уже открывалась:
			isOpenerWasPressed = true;
			// если форма не открыта, открываем:
			if (bookingForm.classList.contains("booking-form-hidden")) {
				// удаляем скрытое состояние (none) и добавляем flex и animation:
				bookingForm.classList.remove("booking-form-hidden"); 
				bookingForm.classList.add("booking-form"); 
				if (!bookingForm.classList.contains("booking-form-appear")) {
					bookingForm.classList.add("booking-form-appear");
				}
        
				// localStorage - возвращаем сохранённые данные. 
				// они могут понадобиться, если пользователь уже ввел какие-то данные
				if (storageAvialable()) {
					checkIn.value = localStorage.getItem("checkInValue");
					checkOut.value = localStorage.getItem("checkOutValue");
					adult.value = localStorage.getItem("adultValue");
				}
				// и фокусируемся на первом input
				checkIn.focus();

				if (bookingForm.scrollHeight > 396 && bookingForm.scrollHeight > bookingForm.clientHeight) {
					bookingForm.style.overflowY = "auto";
				}

				// отправляем данные на сервер после проверки валидности введённых данных:
				bookingForm.addEventListener("submit", function(evt) {
					// сначала проверяем, состояние формы и если оно имеет класс shake...
					if (bookingForm.classList.contains("booking-form-shake")) {
						// и отключаем его
						bookingForm.classList.remove("booking-form-shake");
					}
					// теперь проверяем, введены ли данные в необходимые input (поле children может остаться пустым)...
					if (checkIn.value && checkOut.value && adult.value) {
						if (storageAvialable()) {
							localStorage.setItem("checkInValue", checkIn.value);
							localStorage.setItem("checkOutValue", checkOut.value);
							localStorage.setItem("adultValue", adult.value);
						}
					} 
					else {
						// если хотя бы один из полей с пустым значением анимируем отказ...
						evt.preventDefault();
						void bookingForm.offsetWidth;
						bookingForm.classList.add("booking-form-shake");
						checkIn.focus(); 
					} 
				});

				// ! закрытие формы через ESC !
				bookingForm.addEventListener("keydown", function (evt) {
					// если форма открыта и нажата ESC...
					if (evt.keyCode === 27 && bookingForm.classList.contains("booking-form") && bookingForm.classList.contains("booking-form-appear")) { 
						evt.preventDefault();

						// сначала сохраняем данные, введённые пользователем:
						if (storageAvialable()) {
							localStorage.setItem("checkInValue", checkIn.value);
							localStorage.setItem("checkOutValue", checkOut.value);
							localStorage.setItem("adultValue", adult.value);
						}
						// удаляем состояние shake (если есть) flex и animation и добавляем скрытое состояние (none) :
						if (bookingForm.classList.contains("booking-form-shake")) {
							bookingForm.classList.remove("booking-form-shake");
						}
						bookingForm.classList.remove("booking-form-appear");
						bookingForm.classList.remove("booking-form");
						bookingForm.classList.add("booking-form-hidden");
					}
				});

			//***
			} else {    
				// если же форма уже была открыта, то нам её нужно закрыть!

				// сначала сохраняем данные, введённые пользователем:
				if (storageAvialable()) {
					localStorage.setItem("checkInValue", checkIn.value);
					localStorage.setItem("checkOutValue", checkOut.value);
					localStorage.setItem("adultValue", adult.value);
				}

				// удаляем состояние shake (если есть) flex и animation и добавляем скрытое состояние (none) :
				if (bookingForm.classList.contains("booking-form-shake")) {
					bookingForm.classList.remove("booking-form-shake");
				}
				if( bookingForm.classList.contains("booking-form-appear") ) {
					bookingForm.classList.remove("booking-form-appear");
				}
				bookingForm.classList.remove("booking-form");
				bookingForm.classList.add("booking-form-hidden");
			}

		});
	}
	
	//***

	var relatedSorts = document.querySelectorAll(".sort-types");
	var targetSort = document.querySelector(".sort-types.sort-active-onload");
	var relatedLinks = document.querySelectorAll(".updown-link");
	var targetLink = document.querySelector(".updown-link.updown-active-onload");
	var events = ["click", "focus"];

	// relatedItems - группа связанных элементов
	// events - список событий, которые вызывают последующие действия
	// targetItem - элемент( из группы связанных ), который нужно деактивировать
	// removeClass - класс, который нужно удалить из targetItem
	function deactivator(relatedItems, events, targetItem, removeClass) {
		// перечень элементов, выбираем один...
		relatedItems.forEach(function (item) {   
			// перечень событий, выбираем одно...            
			events.forEach(function (event) { 
				// применяем к каждому элементу события по порядку...   
				item.addEventListener(event, function (evt) {  
					if (targetItem.classList.contains(removeClass)) {
						// отключаем у заданного элемента класс со стилями     
						targetItem.classList.remove (removeClass);
					}
					evt.preventDefault();
				}); 
			});
		});
	}

	deactivator(relatedLinks, events, targetLink, "updown-active-onload");
	deactivator(relatedSorts, events, targetSort, "sort-active-onload");
	    
});

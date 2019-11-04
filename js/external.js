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

// выключение предварительно активированного элемента 
// (в каждой из групп панели сортировки в hotels):

// relatedItems - группа связанных элементов
// events - список событий, которые вызывают последующие действия
// targetItem - элемент( из группы связанных ), который нужно деактивировать
// removeClass - класс, который нужно удалить из targetItem
function deactivator(relatedItems, events, targetItem, removeClass) {
	// перечень элементов, выбираем один...
	relatedItems.forEach(function(item) {   
		// перечень событий, выбираем одно...            
		events.forEach(function(event) { 
			// применяем к каждому элементу события по порядку...   
			item.addEventListener(event, function(evt) {  
				if(targetItem.classList.contains(removeClass)) {
					// отключаем у заданного элемента класс со стилями     
					targetItem.classList.remove(removeClass);
				}
				evt.preventDefault();
			}); 
		});
	});
}

// выполняется и по событию DONContentLoaded, и после того, как DOM загружен:
function executeMain() {
	var popupOpener = document.querySelector(".popup-opener");
	var bookingForm = document.querySelector(".booking-form");
	var input1 = document.querySelector("[name=check-in]");
	var input2 = document.querySelector("[name=check-out]");
	var input3 = document.querySelector("[name=adult]");
	var relatedSorts = document.querySelectorAll(".sort-types");
	var targetSort = document.querySelector(".sort-types.sort-active-onload");
	var relatedLinks = document.querySelectorAll(".updown-link");
	var targetLink = document.querySelector(".updown-link.updown-active-onload");
	var listEvents = ["click", "focus"];
	// флаг: открывалась ли форма. Если еще не открывалась, то спрячем форму при загрузке страницы:
	var isOpenerWasPressed = false;
	var KEY_ESCAPE = 27;
	// сохраняем данные inputs в LS*(localStorage)
	function saveDataToLocalStorage() {
		if(storageAvialable()) {
			localStorage.setItem("savedInput1", input1.value);
			localStorage.setItem("savedInput2", input2.value);
			localStorage.setItem("savedInput3", input3.value);
		}
	} 
	// извлекаем значения из LS* и передаём их в inputs  
	function getDataToInputs() {
		if(storageAvialable()) {
			input1.value = localStorage.getItem("savedInput1") || "24 апреля 2017";
			input2.value = localStorage.getItem("savedInput2") || "4 июля 2017";
			input3.value = localStorage.getItem("savedInput3") || "2";
		}
	} 
	// обрабатываем отправку формы:
	function submitData(e) {
		// если inputs имеют значения (поле children может остаться пустым)...
		if(input1.value && input2.value && input3.value) {
			saveDataToLocalStorage();
		} 
		else {
			// сначала проверяем, состояние формы и если она имеет класс shake и отключаем его:
			if (bookingForm.classList.contains("booking-form-shake")) {
				bookingForm.classList.remove("booking-form-shake");
			}
			// если хотя бы один из полей с пустым значением отказываем...
			e.preventDefault();
			// без этого анимация не будет работать
			// для можно использовать также void bookingForm.offsetWidth;
			bookingForm.offsetWidth = bookingForm.offsetWidth;
			// и переподключаем класс shake
			bookingForm.classList.add("booking-form-shake");
			if(!input3.value) input3.focus(); 
			if(!input2.value) input2.focus(); 
			if(!input1.value) input1.focus(); 
		} 
	}
	// прячем форму
	function hideForm() {
		if(bookingForm.classList.contains("booking-form-shake")) {
			bookingForm.classList.remove("booking-form-shake");
		}
		if(bookingForm.classList.contains("booking-form-appear") ) {
			bookingForm.classList.remove("booking-form-appear");
		}
		bookingForm.classList.remove("booking-form");
		bookingForm.classList.add("booking-form-hidden");
	}
	// открываем форму
	function openForm() {
		// удаляем скрытое состояние (none) и добавляем flex и animation:
		bookingForm.classList.remove("booking-form-hidden"); 
		bookingForm.classList.add("booking-form"); 
		if(!bookingForm.classList.contains("booking-form-appear")) {
			bookingForm.classList.add("booking-form-appear");
		}
	}
	// инициализируем форму
	function init() {
		// если JS подключен, прячем форму 
		bookingForm.classList.remove("booking-form");
		bookingForm.classList.add("booking-form-hidden");
		//... и если значения в LS* ещё пусты, сохраняем... 
		// это нужно лишь для самого первого запуска приложения:
		if(storageAvialable() && localStorage.length < 3) {
			saveDataToLocalStorage();
		}
	}

	// Основная функция:
	function mainIndex() {
		// если кнопка открытия/закрытия и сама форма существуют...
		if(popupOpener && bookingForm) {
			// ... а форма ещё не открывалась...
			if(isOpenerWasPressed === false) init();

			// проверяем событие на кнопке открытия формы (в данном случае - клик):
			popupOpener.addEventListener("click", function(evt) {
				evt.preventDefault();
				// устанавливаем флаг дающий знать, что форма минимум однажды уже открывалась:
				isOpenerWasPressed = true;
				// если форма не открыта, открываем:
				if(bookingForm.classList.contains("booking-form-hidden")) {
					openForm();	// открываем форму
					getDataToInputs(); // устанавливаем в inputs сохранённые данные из localStorage.
					input1.focus(); // фокусируемся на первом input

					if(bookingForm.scrollHeight > 396 && bookingForm.scrollHeight > bookingForm.clientHeight) {
						bookingForm.style.overflowY = "auto";
					}

					// сохраняем данные при изменениях в форме:
					bookingForm.addEventListener("change", saveDataToLocalStorage, false);
					// отправляем данные в localStorage после проверки валидности введённых данных:
					bookingForm.addEventListener("submit", submitData, false);
					// предусматриваем закрытие формы через ESC !
					bookingForm.addEventListener("keydown", function(e) {
						// если форма открыта и нажата ESC...
						if(e.keyCode === KEY_ESCAPE && bookingForm.classList.contains("booking-form") && bookingForm.classList.contains("booking-form-appear")) { 
							e.preventDefault();

							saveDataToLocalStorage(); // ... сохраняем данные, введённые пользователем
							hideForm(); // ... скрываем форму
						}
					});

				} else { // если же форма уже была открыта, то нам её нужно закрыть: 
					saveDataToLocalStorage(); // ... сохраняем данные, введённые пользователем
					hideForm(); // ... скрываем форму
				}

			});
		}
	}

	mainIndex();
	
	// выключение предварительно активированного элемента
	deactivator(relatedLinks, listEvents, targetLink, "updown-active-onload");
	deactivator(relatedSorts, listEvents, targetSort, "sort-active-onload");

} 

// readyState показывает текущее состояние загрузки:
if(document.readyState === "loading") {
	// если документ загружается, ждём события
	document.addEventListener("DONContentLoaded", executeMain);
} else {
	// DOM готов
	executeMain();
}

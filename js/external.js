// скрипт начинает работать в момент загрузки документа:
window.addEventListener("load", 
	function(evt) {
		var popupOpener = document.querySelector(".popup-opener");
		var bookingForm = document.querySelector(".booking-form");
		var checkIn = document.querySelector("#check-in");
		var checkOut = document.querySelector("#check-out");

		if (popupOpener) {
			popupOpener.addEventListener ("click", function( evt ) {
				if (bookingForm.style.display == "none") {
					bookingForm.style.display = "flex"; 
	     
					if (!bookingForm.classList.contains("booking-form-appear")) {
						bookingForm.classList.add("booking-form-appear");
					}

					checkIn.focus();

					// localStorage - возвращаем сохранённые данные:
					checkIn.value = localStorage.getItem("checkInValue");
					checkOut.value = localStorage.getItem("checkOutValue");
				} else {     
					try {
						// localStorage - сохраняем данные
						localStorage.setItem("checkInValue", checkIn.value);
	              		localStorage.setItem("checkOutValue", checkOut.value);
	            	} catch(err) {}

	            	if( bookingForm.classList.contains("booking-form-appear") ) {
	              		bookingForm.classList.remove("booking-form-appear");
	            	}

	            	// и закрываем форму
	            	bookingForm.style.display = "none";
	          		}

				evt.preventDefault();
	        	}
			);
		}
		
		//*********************************

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
			relatedItems.forEach( function(item) {   
				// перечень событий, выбираем одно...            
				events.forEach( function( event ) { 
					// применяем к каждому элементу события по порядку...   
					item.addEventListener(event, function( evt) {  
						if (targetItem.classList.contains( removeClass )) {
							// отключаем у заданного элемента класс со стилями     
							targetItem.classList.remove( removeClass );
						}
						evt.preventDefault();
	            	}); 
	          	});
	        });
	    }

      deactivator(relatedLinks, events, targetLink, "updown-active-onload");
      deactivator(relatedSorts, events, targetSort, "sort-active-onload");
      
	//********************
	}
);


	// // ! index: закрытие формы через ESC !
	// bookingForm.addEventListener("keydown", 
	// 	function(evt) {
	// 		// если форма открыта и нажата ESC...
	// 		if(evt.keyCode === 27 && bookingForm.style.display == "flex") { 
	// 			// <- if( ePopup.classList.contains("modal-show") ) {
	// 			// то форму можно свернуть
	// 			evt.preventDefault();
	// 			bookingForm.style.display = "none";
	// 			// -> ePopup.classList.remove("modal-show");
	// 		}
	// 	}
	// );


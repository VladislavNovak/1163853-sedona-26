// скрипт начинает работать в момент загрузки документа:
window.addEventListener("load", function (evt) {
  var popupOpener = document.querySelector(".popup-opener");
  var bookingForm = document.querySelector(".booking-form");
  var checkIn = document.querySelector("#check-in");
  var checkOut = document.querySelector("#check-out");

  // открытие/закрытие index form...
  // если кнопка открытия/закрытия и сама форма существуют...
  if (popupOpener && bookingForm) {
    // проверяем событие на кнопке (в данном случае - клик):
    popupOpener.addEventListener("click", function (evt) {
      // если форма не открыта, открываем
      if (bookingForm.style.display === "none") {
        bookingForm.style.display = "flex"; 
        // и если у формы нет добавленного класса анимации, то добавляем
        if (!bookingForm.classList.contains("booking-form-appear")) {
          bookingForm.classList.add("booking-form-appear");
        }
        // фокусируемся на первом input
        checkIn.focus();

        if (bookingForm.scrollHeight > 396 && bookingForm.scrollHeight > bookingForm.clientHeight) {
          bookingForm.style.overflowY = "auto";
        }

        //***
        // localStorage - возвращаем сохранённые данные. 
        // они могут понадобиться, если пользователь уже ввел какие-то данные
        checkIn.value = localStorage.getItem("checkInValue");
        checkOut.value = localStorage.getItem("checkOutValue");

        // ! index: закрытие формы через ESC !
        bookingForm.addEventListener("keydown", function (evt) {
          // если форма открыта и нажата ESC...
            if (evt.keyCode === 27 && bookingForm.style.display === "flex" && bookingForm.classList.contains("booking-form-appear")) { 
              // удаляем у формы класс анимации
              bookingForm.classList.remove("booking-form-appear");
              evt.preventDefault();
              // и закрываем форму
              bookingForm.style.display = "none";
            }
          }
        );

      //***
      } else {    
        // если же форма уже была открыта, то нам её нужно закрыть
        try {
          // localStorage - сохраняем данные
          // добавляем обработку ошибок для localStorage (может понадобиться)
          localStorage.setItem("checkInValue", checkIn.value);
          localStorage.setItem("checkOutValue", checkOut.value);
        } catch(err) {}
          
        // удаляем у формы класс анимации
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
      
	//********************
	}
);

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	// First screen full height
	function setHeiHeight() {
	    $('.full__height').css({
	        minHeight: $(window).height() + 'px'
	    });
	}
	setHeiHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize( setHeiHeight ); // обновляем при изменении размеров окна


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();

   	var slider = $( ".calculate__slider" );

   	// Calculate
   	$( ".calculate__slider" ).each(function(index, el) {
   		var sliderWrap = $(this).closest('.calculate__form_row'),
   			sliderMin = $(this).data('min'),
   			sliderMax = $(this).data('max'),
   			sliderVal = $(this).data('value'),
   			sliderStep = $(this).data('step'),
   			amount = sliderWrap.find('input');
		$(this).slider({
			range: "min",
			value: sliderVal,
			min: sliderMin,
			max: sliderMax,
			step: sliderStep,
			slide: function( event, ui ) {
				$( amount ).val( addSpaces(ui.value) );
				calculate();
			}
		});
		$( amount ).val(addSpaces($(this).slider( "value" )));
   	});

	$( ".calculate input" ).on('keyup change', function(event) {
		event.preventDefault();
		var slider = $(this).closest('.calculate__form_row').find('.calculate__slider');
		slider.slider( "value", $(this).val());
		calculate();
	});

	calculate();

    $("#form").submit(function() { //устанавливаем событие отправки для формы с id=form
        var form_data = $(this).serialize(); //собераем все данные из формы
        console.log(form_data);
        $.ajax({
            type: "POST", //Метод отправки
            url: "../send.php", //путь до php фаила отправителя
            data: form_data,
            success: function() {
                //код в этом блоке выполняется при успешной отправке сообщения
                $('.form__rezult').remove();
                setTimeout(function() {
                	$("#form").append('<div class="form__rezult">Ваше сообщение отпрaвлено!</div>');
                }, 100);
            }
        });
        return false;
    });

    $("[name=phone]").mask("+7(999) 999-9999");

});

function calculate() {

	var price = $('#price').val().replace(/\s+/g,''),
		have = $('#have').val().replace(/\s+/g,''),
		year = $('#year').val().replace(/\s+/g,''),
		percent = $('#percent').val().replace(/\s+/g,'');

	var need = price-have;
	var total = addSpaces(need);
	var rezult = need / year;
	var totalPercent = rezult * percent;
	var roundedrezult = addSpaces(parseFloat(rezult + totalPercent).toFixed());

	$('#total_summ').html(total);
	$('#total_percent').html(percent.replace('.', ','));
	$('#total_month').html(roundedrezult);

}

function addSpaces(nStr){
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ' ' + '$2');
	}
	return x1 + x2;
}

$(window).resize(function(event) {
	checkOnResize()
});

function checkOnResize() {
   	// setGridMatch($('[data-grid-match] .grid__item'));
   	gridMatch();
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

// function setGridMatch(columns) {
// 	var tallestcolumn = 0;
// 	columns.removeAttr('style');
// 	columns.each( function() {
// 		currentHeight = $(this).height();
// 		if(currentHeight > tallestcolumn) {
// 			tallestcolumn = currentHeight;
// 		}
// 	});
// 	setTimeout(function() {
// 		columns.css('minHeight', tallestcolumn);
// 	}, 100);
// }

// Map
ymaps.ready(init);

function init() {
	var center = [43.582031074541156,39.71922600000001];
    var myMap = new ymaps.Map("map", {
            center: center,
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        });

    myMap.geoObjects
        .add(new ymaps.Placemark(center, {
            balloonContent: 'ЦЕНТРАЛЬНЫЙ ОФИС:  Бизнес-центр «Европейский» 5 этаж,  офис 506. <br>Адрес: Сочи, ул.Несебрская 6'
        }));
}

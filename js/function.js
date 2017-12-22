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

    // Хак для фокуса на ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

    if (isIOS()) {
    } else {
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

});
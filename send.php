<?php
// несколько получателей
$to  = 'busforward@gmail.com' . ', ';  // обратите внимание на запятую
$to .= 'workrealcapital@yandex.ru';

// тема письма
$subject = 'Письмо с сайта';

// текст письма
$message = 'Пользователь ' . $_POST['name'] . ' отправил вам письмо:<br />
Связяться с ним можно по телефону <a href="tel:' . $_POST['phone'] . '">' . $_POST['phone'] . '</a>'
;

// Для отправки HTML-письма должен быть установлен заголовок Content-type
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 

// Дополнительные заголовки
$headers .= 'To: workrealcapital@yandex.ru' . "\r\n"; // Свое имя и phone
$headers .= 'From: Письмо с сайта>' . "\r\n";


// Отправляем
mail($to, $subject, $message, $headers);
?>
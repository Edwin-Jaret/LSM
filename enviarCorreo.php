<?php
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $telefono =$_POST['telefono'];
    $mensaje = $_POST['mensaje']; 

    // Correo destinatario
    //$destinatario = "el37110@gmail.com";
    $destinatario = "utp0149483@alumno.utpuebla.edu.mx";
    $asunto = "Mensaje de contacto de $nombre";

    // Cuerpo del correo
    $cuerpo = "Has recibido un mensaje de contacto:\n\n";
    $cuerpo .= "Nombre: $nombre\n";
    $cuerpo .= "Email: $email\n";
    $cuerpo .= "Teléfono: $telefono\n\n";
    $cuerpo .= "Mensaje:\n$mensaje\n";

    // Encabezados
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Enviar correo
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        echo "success";
    } else {
        echo "error: mail not sent";
    }
?>

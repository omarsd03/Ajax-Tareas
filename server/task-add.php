<?php
    
    include('database.php');

    if (isset($_POST['nombre'])) {

        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];

        $query = "INSERT INTO tasks (name, description) VALUES ('$nombre', '$descripcion')";
        $result = mysqli_query($conexion, $query);

        if (!$result) {
            die('Error en la consulta ' . mysqli_error($conexion));
        }

        echo 'Tarea agregada correctamente';

    }
    
?>
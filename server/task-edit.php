<?php
    
    include('database.php');

    $id = $_POST['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];

    $query = "UPDATE tasks SET name = '$nombre', description = '$descripcion' WHERE id = $id";
    $result = mysqli_query($conexion, $query);

    if (!$result) {
        die('Error en la consulta ' . mysqli_error($conexion));
    }

    echo 'Tarea actualizada correctamente';
    
?>
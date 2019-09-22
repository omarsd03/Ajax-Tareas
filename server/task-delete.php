<?php
    
    include('database.php');

    if (isset($_POST['id'])) {
        
        $id = $_POST['id'];
    
        $query = "DELETE FROM tasks WHERE id = $id";
        $result = mysqli_query($conexion, $query);

        if (!$result) {
            die('Error en la consulta ' . mysqli_error($conexion));
        }

        echo 'Tarea eliminada correctamente!';
        
    }
    
?>
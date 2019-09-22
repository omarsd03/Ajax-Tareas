<?php
    
    include('database.php');

    $query = "SELECT * FROM tasks";
    $result = mysqli_query($conexion, $query);

    if (!$result) {
        die('Error en la consulta ' . mysqli_error($conexion));
    }

    $json = array();

    while ($row = mysqli_fetch_array($result)) {
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );
    }

    $jsonString = json_encode($json);
    echo $jsonString;
    
?>
<?php
    
    include('database.php');

    $search = $_POST['search'];

    if (!empty($search)) {

        $query = "SELECT * FROM tasks WHERE name LIKE '%$search%'";
        $result = mysqli_query($conexion, $query);

        if (!$result) {
            die('Error en la consulta ' . mysqli_error($conexion));
        }

        $json = array();

        while ($row = mysqli_fetch_array($result)) {
            $json[] = array(
                'name' => $row['name'],
                'descripction' => $row['description'],
                'id' => $row['id']
            );
        }

        $jsonString = json_encode($json);
        echo $jsonString;

    }
    
?>
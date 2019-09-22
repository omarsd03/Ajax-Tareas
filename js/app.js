$(document).ready(function() {

    let editar = false;
    
    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function (e) {

        if ($('#search').val()) {

            let search = $('#search').val();

            $.ajax({
                url: 'server/task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {

                    let tareas = JSON.parse(response);

                    let template = '';

                    tareas.forEach(tarea => {
                        console.log(tarea);
                        template += `<li>${tarea.name}</li>`
                    });

                    $('#container').html(template);
                    $('#task-result').show();

                }
            });

        }

    });

    $('#task-form').submit(function(e) {
        
        e.preventDefault();

        const postData = {
            nombre: $('#nombre').val(),
            descripcion: $('#descripcion').val(),
            id: $('#idTask').val()
        }
        
        let url = editar === false ? 'server/task-add.php' : 'server/task-edit.php';

        $.post(url, postData, function(response) {
            console.log(response);
            editar = false;
            fetchTasks();
            $('#task-form').trigger('reset');
        });

    });

    function fetchTasks() {
        
        $.ajax({
            url: 'server/task-list.php',
            method: 'GET',
            success: function(response) {
                
                let tareas = JSON.parse(response);
    
                let template = '';
    
                tareas.forEach(tarea => {
                    template += `
                        <tr taskId="${tarea.id}">
                            <td>${tarea.id}</td>
                            <td>
                                <a href="#" class="task-item">${tarea.name}</a>
                            </td>
                            <td>${tarea.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });
    
                $('#tasks').html(template);
    
            }
        });

    }

    $(document).on('click', '.task-delete', function() {

        if (confirm('Estas seguro de eliminar esta tarea?')) {
            
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('taskId')
    
            $.post('server/task-delete.php', { id }, function(response) {
                fetchTasks();
            });

        }

    });

    $(document).on('click', '.task-item', function() {
        
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('taskId')
        
        $.post('server/task-single.php', { id }, function(response) {
            
            let tarea = JSON.parse(response);
            $('#nombre').val(tarea.name);
            $('#descripcion').val(tarea.description);
            $('#idTask').val(tarea.id);
            editar = true;

        });

    })

});
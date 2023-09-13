$(document).ready(function () {
    listar();
});

function listar() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/usuarios",
        dataType: "json",
        success: function (res) {
            var lis = "";
            $.each(res, function (i, mascota) {
                lis += "<tr>";
                lis += "<th scope='row'>" + mascota.id + "</th>";
                lis += "<td>" + mascota.nombre + "</td>";
                lis += "<td>" + mascota.apellido + "</td>";
                lis += "<td><button type='button' class='btn btn-outline-primary boton' data-id='" + mascota.id + "' data-nombre='" + mascota.nombre + "' data-apellido='" + mascota.apellido + "' data-bs-toggle='modal' data-bs-target='#myModal'>Actualizar</button></td>";
                lis += "<td><button class='btn btn-outline-danger eliminar' data-id='" + mascota.id + "'>Eliminar</button></td>";
                lis += "</tr>";
            });

            $("#tabla_mascota tbody").html(lis);
        }
    });
}

$(document).on("click", ".boton", function () {
    $('#myModal').on('hidden.bs.modal', function () {
        $("#nombre").val("");
        $("#apellido").val("");
    });

    var id = $(this).data("id");
    var nombre = $(this).data("nombre");
    var apellido = $(this).data("apellido");

    // mostar datos en el modal
    $('#myModal').modal('show');
    $("#id").val(id);
    $("#nombre").val(nombre);
    $("#apellido").val(apellido);
});

$(document).on("click", ".eliminar", function () {
    var eliminar = $(this).data("id");

    $.ajax({
        url: "http://localhost:8080/usuarios/" + eliminar,
        type: "DELETE",
        success: function () {
            location.reload();
        }
    });
});

$(".guardar").click(function () {
    var type = '';
    var data = {
        nombre: $("#nombre").val(),
        apellido: $("#apellido").val(),
        id: $("#id").val()
    };

    if ($('#id').val() == '') {
        type = 'POST';
    } else {
        type = 'PUT';
    }

    $.ajax({
        url: "http://localhost:8080/usuarios",
        type: type,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function () {
            location.reload();
        }
    });
});

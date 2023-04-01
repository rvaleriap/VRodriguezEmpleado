


$(document).ready(function () { //click
    GetAll();
    EstadoGetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5003/api/Empleado/GetAll',
        success: function (result) { //200 OK 
            $('#tblEmpleado tbody').empty();
            $.each(result.objects, function (i, empleado) {
                var filas =
                    '<tr>'
                    + '<td class="text-center " > '
                    + '<a href="#" onclick="GetById(' + empleado.idEmpleado + ')">'
                    + '<i class="bi bi-pencil-square"></i> '
                    + '</a> '
                    + '</td>'
                   /* + "<td  id='id' class='text-center'>" + empleado.idEmpleado + "</td>"*/
                    + "<td class='text-center'>" + empleado.numeroNomina + "</td>"
                    + "<td class='text-center'>" + empleado.nombre + "</ td>"
                    + "<td class='text-center'>" + empleado.apellidoPaterno + "</ td>"
                    + "<td class='text-center'>" + empleado.apellidoMaterno + "</ td>"
                 /*   + "<td class='text-center'>" + empleado.estado.idEstado + "</ td>"*/
                    + "<td class='text-center'>" + empleado.estado.nombre + "</ td>"
                    //+ '<td class="text-center">  <a href="#" onclick="return Eliminar(' + subCategoria.IdSubCategoria + ')">' + '<img  style="height: 25px; width: 25px;" src="../img/delete.png" />' + '</a>    </td>'
                    + '<td class="text-center"> <button class="btn btn-danger" onclick="Eliminar(' + empleado.idEmpleado + ')"><i class="bi bi-trash3-fill"></i></button></td>'

                    + "</tr>";
                $("#tblEmpleado tbody").append(filas);
            });
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};

function Modal() {
    var mostrar = $('#ModalUpdate').modal('show');

};

function EstadoGetAll() {
    $("#ddlEstado").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5003/api/Estado/GetAll',
        success: function (result) {
            $("#ddlEstado").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.objects, function (i, estado) {
                $("#ddlEstado").append('<option value="'
                    + estado.idEstado + '">'
                    + estado.nombre + '</option>');
            });
        }
    });
}

function Add() {

    var empleado = {
        idEmpleado: 0,
        numeroNomina: $('#txtNumeroNomina').val(),
        nombre: $('#txtNombre').val(),
        apellidoPaterno: $('#txtApellidoPaterno').val(),
        apellidoMaterno: $('#txtApellidoMaterno').val(),
        estado: {
            idEstado: $('#ddlEstado').val()
        }
    }
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5003/api/Empleado/Add',
        dataType: 'json',
        data: JSON.stringify(empleado),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#myModal').modal();
            $('#ModalUpdate').modal('hide');
            GetAll();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
};

function GetById(idEmpleado) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5003/api/Empleado/GetById/' +idEmpleado,
        success: function (result) {
            $('#txtIdEmpleado').val(result.object.idEmpleado);
            $('#txtNumeroNomina').val(result.object.numeroNomina);
            $('#txtNombre').val(result.object.nombre);
            $('#txtApellidoPaterno').val(result.object.apellidoPaterno);
            $('#txtApellidoMaterno').val(result.object.apellidoMaterno);
            $('#ddlEstado').val(result.object.estado.idEstado);
            $('#ModalUpdate').modal('show');
            GetAll();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });

}

function Update() {

    var empleado = {
        idEmpleado: $('#txtIdEmpleado').val(),
        numeroNomina: $('#txtNumeroNomina').val(),
        nombre: $('#txtNombre').val(),
        apellidoPaterno: $('#txtApellidoPaterno').val(),
        apellidoMaterno: $('#txtApellidoMaterno').val(),
        estado: {
            idEstado: $('#ddlEstado').val()
        }
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:5003/api/Empleado/Update',
        datatype: 'json',
        data: JSON.stringify(empleado),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            $('#myModal').modal();
            $('#ModalUpdate').modal('hide');
            GetAll();
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });

};

function Actualizar() {
    var empleado = {
        idEmpleado: $('#txtIdEmpleado').val(),
        numeroNomina: $('#txtNumeroNomina').val(),
        nombre: $('#txtNombre').val(),
        apellidoPaterno: $('#txtApellidoPaterno').val(),
        apellidoMaterno: $('#txtApellidoMaterno').val(),
        estado: {
            idEstado: $('#ddlEstado').val()

        }
    }

    if (empleado.idEmpleado == '') {
        Add();

    }
    else {
        Update();
    }
};

function Eliminar(idEmpleado) {

    if (confirm("¿Estas seguro de eliminar el empleado ?")) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5003/api/Empleado/Delete/' + idEmpleado,
            success: function (result) {
                $('#myModal').modal();
                GetAll();
            },
            error: function (result) {
                alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
            }
        });

    };
};


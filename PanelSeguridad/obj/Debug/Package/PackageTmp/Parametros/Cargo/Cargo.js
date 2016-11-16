/*--------------- region de variables globales --------------------*/
var ArrayCargo = [];
var ArrayCombo = [];
var ArrayCargoDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Seguridad('Seguridad');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    Change_Select_Nit();
});


//carga el combo de Cargo dependiente
function Change_Select_Nit() {

    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        $('#Select_CargoDepent').empty();
        transacionAjax_CargoDepend('Cargo_Dep', index_ID);
    });


}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCargo").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCargo").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCargo").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Cargo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Cargo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Cargo_create("crear");
        }
        else {
            transacionAjax_Cargo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Cargo_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
    }
    return validar;
}

//validamos si han escogido una columna
function ValidarDroplist() {
    var flag;
    var contenido = $("#DDLColumns").val();

    if (contenido == '-1') {
        flag = 1;
    }
    else {
        flag = 0;
    }
    return flag;
}

// crea la tabla en el cliente
function Table_Cargo() {

    var html_Cargo;

    switch (estado) {

        case "buscar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {

                if (ArrayCargo[itemArray].Cargo_ID != 0) {
                    var dependencia;

                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {
                if (ArrayCargo[itemArray].Cargo_ID != 0) {
                    var dependencia;

                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayCargo[itemArray].Nit_ID + "','" + ArrayCargo[itemArray].Cargo_ID + "')\"></input></td><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Cargo = "<table id='TCargo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Área</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCargo) {
                if (ArrayCargo[itemArray].Cargo_ID != 0) {
                    var dependencia;

                    if (ArrayCargo[itemArray].CargoDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayCargo[itemArray].DescripCargoDepen;

                    html_Cargo += "<tr id= 'TCargo_" + ArrayCargo[itemArray].Cargo_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayCargo[itemArray].Nit_ID + "','" + ArrayCargo[itemArray].Cargo_ID + "')\"></input></td><td>" + ArrayCargo[itemArray].Nit_ID + " - " + ArrayCargo[itemArray].DescripEmpresa + "</td><td>" + ArrayCargo[itemArray].Cargo_ID + "</td><td>" + ArrayCargo[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayCargo[itemArray].DescripPolitica + "</td><td>" + ArrayCargo[itemArray].UsuarioCreacion + "</td><td>" + ArrayCargo[itemArray].FechaCreacion + "</td><td>" + ArrayCargo[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCargo[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Cargo += "</tbody></table>";
    $("#container_TCargo").html("");
    $("#container_TCargo").html(html_Cargo);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TCargo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}


//muestra el registro a eliminar
function Eliminar(index_Nit, index_Cargo) {

    for (itemArray in ArrayCargo) {
        if (index_Nit == ArrayCargo[itemArray].Nit_ID && index_Cargo == ArrayCargo[itemArray].Cargo_ID) {
            editID = ArrayCargo[itemArray].Cargo_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}


// muestra el registro a editar
function Editar(index_Nit, index_Cargo) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCargo) {
        if (index_Nit == ArrayCargo[itemArray].Nit_ID && index_Cargo == ArrayCargo[itemArray].Cargo_ID) {

            editNit_ID = ArrayCargo[itemArray].Nit_ID;
            editID = ArrayCargo[itemArray].Cargo_ID;

            $("#Select_EmpresaNit").val(ArrayCargo[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayCargo[itemArray].Cargo_ID);

            setTimeout("$('#Select_EmpresaNit').trigger('change');", 200);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayCargo[itemArray].Descripcion);

            if (ArrayCargo[itemArray].CargoDependencia == 0)
                setTimeout("ChargeDependencia('-1');", 300);
            else
                setTimeout("ChargeDependencia('" + ArrayCargo[itemArray].CargoDependencia + "');", 300);

            if (ArrayCargo[itemArray].Politica_ID == 0)
                $("#Select_Politica").val("-1");
            else
                $("#Select_Politica").val(ArrayCargo[itemArray].Politica_ID);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}


//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_CargoDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}


//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_CargoDepent").val("-1");
    $("#Select_Politica").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
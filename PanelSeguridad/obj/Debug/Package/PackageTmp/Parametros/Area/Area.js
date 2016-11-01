/*--------------- region de variables globales --------------------*/
var ArrayArea = [];
var ArrayCombo = [];
var ArrayAreaDep = [];
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


//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        $('#Select_AreaDepent').empty();
        transacionAjax_AreaDepend('Area_Dep', index_ID);
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
            $("#container_TArea").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TArea").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TArea").html("");
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
        transacionAjax_Area("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Area("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Area_create("crear");
        }
        else {
            transacionAjax_Area_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Area_delete("elimina");
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
function Table_Area() {

    switch (estado) {

        case "buscar":
            Tabla_consulta();
            break;

        case "modificar":
            Tabla_modificar();
            break;

        case "eliminar":
            Tabla_eliminar();
            break;
    }

}

//grid con el boton eliminar
function Tabla_eliminar() {
    var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayArea) {
        if (ArrayArea[itemArray].Area_ID != 0) {
            var dependencia;

            if (ArrayArea[itemArray].AreaDependencia == 0)
                dependencia = "";
            else
                dependencia = ArrayArea[itemArray].DescripAreaDepen;

            html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayArea[itemArray].Nit_ID + "','" + ArrayArea[itemArray].Area_ID + "')\"></input></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_Area += "</tbody></table>";
    $("#container_TArea").html("");
    $("#container_TArea").html(html_Area);

    $(".Eliminar").click(function () {
    });

    $("#TArea").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Area) {

    for (itemArray in ArrayArea) {
        if (index_Nit == ArrayArea[itemArray].Nit_ID && index_Area == ArrayArea[itemArray].Area_ID) {
            editID = ArrayArea[itemArray].Area_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayArea) {
        if (ArrayArea[itemArray].Area_ID != 0) {
            var dependencia;

            if (ArrayArea[itemArray].AreaDependencia == 0)
                dependencia = "";
            else
                dependencia = ArrayArea[itemArray].DescripAreaDepen;

            html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayArea[itemArray].Nit_ID + "','" + ArrayArea[itemArray].Area_ID + "')\"></input></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_Area += "</tbody></table>";
    $("#container_TArea").html("");
    $("#container_TArea").html(html_Area);

    $(".Editar").click(function () {
    });

    $("#TArea").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Nit, index_Area) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayArea) {
        if (index_Nit == ArrayArea[itemArray].Nit_ID && index_Area == ArrayArea[itemArray].Area_ID) {

            editNit_ID = ArrayArea[itemArray].Nit_ID;
            editID = ArrayArea[itemArray].Area_ID;
            
            $("#Select_EmpresaNit").val(ArrayArea[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayArea[itemArray].Area_ID);

            setTimeout("$('#Select_EmpresaNit').trigger('change');", 200);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayArea[itemArray].Descripcion);

            if (ArrayArea[itemArray].AreaDependencia == 0)
                setTimeout("ChargeDependencia('-1');", 300);
            else
                setTimeout("ChargeDependencia('" + ArrayArea[itemArray].AreaDependencia + "');", 300);

            if (ArrayArea[itemArray].Politica_ID == 0)
                $("#Select_Politica").val("-1");
            else
                $("#Select_Politica").val(ArrayArea[itemArray].Politica_ID);
          
            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}


//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_AreaDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
    for (itemArray in ArrayArea) {

        if (ArrayArea[itemArray].Area_ID != 0) {
            var dependencia;

            if (ArrayArea[itemArray].AreaDependencia == 0)
                dependencia = "";
            else
                dependencia = ArrayArea[itemArray].DescripAreaDepen;

            html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
        }
    }
    html_Area += "</tbody></table>";
    $("#container_TArea").html("");
    $("#container_TArea").html(html_Area);

    $("#TArea").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
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
    $("#Select_AreaDepent").val("-1");
    $("#Select_Politica").val("-1");
     
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
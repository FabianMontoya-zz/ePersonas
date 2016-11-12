/*--------------- region de variables globales --------------------*/
var ArrayAyudas = [];
var ArrayCombo = [];
var estado;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");


    $("#TablaDatos").css("display", "none");
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
      
});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TAyudas").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TAyudas").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TAyudas").html("");
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
        transacionAjax_Ayudas("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ayudas("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ayudas_create("crear");
        }
        else {
            transacionAjax_Ayudas_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Ayudas_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtNombre").val();
    var Campo_3 = $("#TxtArea_Descripcion").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
    }
    else {
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
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
function Table_Ayudas() {

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
    var html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayAyudas) {
        if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
            html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayAyudas[itemArray].Ayudas_ID + "')\"></input></td><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ayudas += "</tbody></table>";
    $("#container_TAyudas").html("");
    $("#container_TAyudas").html(html_Ayudas);

    $(".Eliminar").click(function () {
    });

    $("#TAyudas").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Ayudas) {

    for (itemArray in ArrayAyudas) {
        if (index_Ayudas == ArrayAyudas[itemArray].Ayudas_ID) {
            editID = ArrayAyudas[itemArray].Ayudas_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayAyudas) {
        if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
            html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayAyudas[itemArray].Ayudas_ID + "')\"></input></td><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ayudas += "</tbody></table>";
    $("#container_TAyudas").html("");
    $("#container_TAyudas").html(html_Ayudas);

    $(".Editar").click(function () {
    });

    $("#TAyudas").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Ayudas) {

    $("#TablaDatos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayAyudas) {
        if (index_Ayudas == ArrayAyudas[itemArray].Ayudas_ID) {
            $("#Txt_ID").val(ArrayAyudas[itemArray].Ayudas_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtNombre").val(ArrayAyudas[itemArray].Nombre);
            $("#TxtArea_Descripcion").val(ArrayAyudas[itemArray].Descripcion);
            editID = ArrayAyudas[itemArray].Ayudas_ID;
            $("#Btnguardar").attr("value", "Actualizar");
        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Ayudas = "<table id='TAyudas' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Codigo</th><th>Nombre</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayAyudas) {
        if (ArrayAyudas[itemArray].Ayudas_ID != 0) {
            html_Ayudas += "<tr id= 'TAyudas_" + ArrayAyudas[itemArray].Ayudas_ID + "'><td>" + ArrayAyudas[itemArray].Ayudas_ID + "</td><td>" + ArrayAyudas[itemArray].Nombre + "</td><td>" + ArrayAyudas[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ayudas += "</tbody></table>";
    $("#container_TAyudas").html("");
    $("#container_TAyudas").html(html_Ayudas);

    $("#TAyudas").dataTable({
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
    $("#Txt_ID").val("");
    $("#TxtNombre").val("");
    $("#TxtArea_Descripcion").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}
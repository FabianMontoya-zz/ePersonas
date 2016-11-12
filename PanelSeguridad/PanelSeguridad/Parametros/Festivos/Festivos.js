/*--------------- region de variables globales --------------------*/
var ArrayFestivo = [];
var ArrayCombo = [];
var estado;
var editID;
var editDia;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
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
            $("#container_TFestivo").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TFestivo").html("");
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
        transacionAjax_Festivo("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Festivo("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Festivo_create("crear");
        }
        else {
            transacionAjax_Festivo_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Festivo_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var valID = $("#Txt_Año").val();
    var descrip = $("#Txt_mes_Dia").val();

    var validar = 0;
    var flag_y = 0;
    var flag_m = 0;

    if (descrip == "" || valID == "" || valID.length != 4 || descrip.length != 4) {
        validar = 1;
        if (valID == "") {
            $("#ImgID").css("display", "inline-table");
            $("#S_Y").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
            flag_y = 1;
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (descrip == "") {
            $("#Img1").css("display", "inline-table");
            $("#S_D").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
            flag_m = 1;
        }
        else {
            $("#Img1").css("display", "none");
        }

        if (flag_y == 0) {

            if (valID.length != 4) {
                $("#ImgID").css("display", "inline-table");
                $("#S_Y").html(ArrayMensajes[2].Mensajes_ID + ": " + ArrayMensajes[2].Descripcion);
            }
            else {
                $("#ImgID").css("display", "none");
                $("#S_Y").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
            }
        }

        if (flag_m == 0) {

            if (descrip.length != 4) {
                $("#Img1").css("display", "inline-table");
                $("#S_D").html(ArrayMensajes[3].Mensajes_ID + ": " + ArrayMensajes[3].Descripcion);
            }
            else {
                $("#Img1").css("display", "none");
                $("#S_D").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
            }
        }
    }
    else {
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
function Table_Festivo() {

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
    var html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Año</th><th>Mes/Dia</th></tr></thead><tbody>";
    for (itemArray in ArrayFestivo) {
        if (ArrayFestivo[itemArray].Year != 0) {
            html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Year + "'><td><span class='cssToolTip_ver'><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayFestivo[itemArray].Year + "','" + ArrayFestivo[itemArray].Mes_Dia + "')\"></input><span>Al presionar eliminara el registro</span></span></td><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + " / " + ArrayFestivo[itemArray].StrDia + "</td></tr>";
        }
    }
    html_TFestivo += "</tbody></table>";
    $("#container_TFestivo").html("");
    $("#container_TFestivo").html(html_TFestivo);

    $(".Eliminar").click(function () {
    });

    $("#TFestivo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Festivo, index_dia) {

    for (itemArray in ArrayFestivo) {
        if (index_Festivo == ArrayFestivo[itemArray].Year && index_dia == ArrayFestivo[itemArray].Mes_Dia) {
            editID = ArrayFestivo[itemArray].Year;
            editDia = ArrayFestivo[itemArray].Mes_Dia;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}


//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Año</th><th>Mes/Dia</th></tr></thead><tbody>";
    for (itemArray in ArrayFestivo) {
        if (ArrayFestivo[itemArray].Año != 0) {
            html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Year + "'><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + " / " + ArrayFestivo[itemArray].StrDia + "</td></tr>";
        }
    }
    html_TFestivo += "</tbody></table>";
    $("#container_TFestivo").html("");
    $("#container_TFestivo").html(html_TFestivo);

    $("#TFestivo").dataTable({
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
    $("#Txt_Año").val("");
    $("#Txt_mes_Dia").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}
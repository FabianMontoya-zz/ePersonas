/*--------------- region de variables globales --------------------*/
var ArrayFestivo = [];
var ArrayCombo = [];
var estado;
var editID;
var editDia;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TFestivo").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');

});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();

    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");


    $("#TablaConsulta").css("display", "none");

}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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

}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
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

    OpenControl();

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
    OpenControl();
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

    var html_TFestivo

    switch (estado) {

        case "buscar":
            html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Año</th><th>Mes/Dia</th></tr></thead><tbody>";
            for (itemArray in ArrayFestivo) {
                if (ArrayFestivo[itemArray].Año != 0) {
                    html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Year + "'><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + " / " + ArrayFestivo[itemArray].StrDia + "</td></tr>";
                }
            }
            break;

        case "modificar":
            Tabla_modificar();
            break;

        case "eliminar":
            html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Año</th><th>Mes/Dia</th></tr></thead><tbody>";
            for (itemArray in ArrayFestivo) {
                if (ArrayFestivo[itemArray].Year != 0) {
                    html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Year + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayFestivo[itemArray].Year + "','" + ArrayFestivo[itemArray].Mes_Dia + "')\"></img><span>Eliminar Festivos</span></span></td><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + " / " + ArrayFestivo[itemArray].StrDia + "</td></tr>";
                }
            }
            break;
    }
    html_TFestivo += "</tbody></table>";
    $("#container_TFestivo").html("");
    $("#container_TFestivo").html(html_TFestivo);

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
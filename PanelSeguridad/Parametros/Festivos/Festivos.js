/*--------------- region de variables globales --------------------*/
var ArrayFestivo = [];
var ArrayCombo = [];
var Matrix_Calendarios = [];
var estado;

var editNit_ID = "";
var editCalendario_ID = "";
var editYear = "";
var editMesDia = "";
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();

    Picker_Fechas();
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#TablaConsulta").css("display", "none");
}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {
    
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

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#Txt_Año").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
    $("#Txt_Año").datepicker("option", "yearRange", "-50:+20"); //Rango de los años, hacia atrás y hacia adelante
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        $("#TxtRead").val("");
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
    try {
        var validate;
        validate = validarCamposCrear();

        if (validate == 0) {
            if ($("#Btnguardar").val() == "Guardar") {
                transacionAjax_Festivo_create("crear");            
            } else {
                Mensaje_General("¡Acción NO valida!", "La acción «" + $("#Btnguardar").val() + "» no es una acción valida para el sistema, favor recargar la página para solucionar este error.", "E");
                setTimeout(console.warn.bind(console, "• Log de error generado (Festivos.BtnCrear):\nSe intentó ejecutar una acción no valida, solo se permite creación en este módulo."));
            }
        }
    } catch (e) {
        Mensaje_General("Error - No se logró " + $("#Btnguardar").val(), "Lo sentimos, ocurrió un error y no se logró ejecutar la acción de " + $("#Btnguardar").val() + ", favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Festivos.BtnCrear):\n" + e));
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Festivo_delete("elimina");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      REGION VALIDACIONES DEL PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del link
function validarCamposCrear() {

    var NIT_ID = $("#Select_EmpresaNit").val();
    var Calendario_ID = $("#Select_Calendario_CP").val();
    var valID = $("#Txt_Año").val();

    var validar = 0;

    if (valID == "" || NIT_ID == "-1" || NIT_ID == null || Calendario_ID == "-1" || Calendario_ID == null) {
        validar = 1;

        if (NIT_ID == "-1" || NIT_ID == null) { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Calendario_ID == "-1" || Calendario_ID == null) { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }

        if (valID == "") {
            $("#Img3").css("display", "inline-table");
            $("#S_Y").html(ArrayMensajes[0].Mensajes_ID + ": " + ArrayMensajes[0].Descripcion);
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                      PROCESOS DE VALIDACION Y GRID FESTIVOS                                                                                                              ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

// crea la tabla en el cliente
function Table_Festivo() {

    var html_TFestivo
    var vl_Index_Festivo;

    switch (estado) {

        case "buscar":
            html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Calendario</th><th>Año</th><th>Mes/Día</th></tr></thead><tbody>";
            for (itemArray in ArrayFestivo) {
                if (ArrayFestivo[itemArray].Año != 0) {
                    html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Index + "'><td style='white-space: nowrap;'>" + ArrayFestivo[itemArray].Nit_ID + " - " + ArrayFestivo[itemArray].DescripcionEmpresa + "</td><td style='white-space: nowrap;'>" + ArrayFestivo[itemArray].Calendario_ID + " - " + ArrayFestivo[itemArray].DescripcionCalendario + "</td><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + "" + ArrayFestivo[itemArray].StrDia + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_TFestivo = "<table id='TFestivo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Calendario</th><th>Año</th><th>Mes/Día</th></tr></thead><tbody>";
            for (itemArray in ArrayFestivo) {
                if (ArrayFestivo[itemArray].Year != 0) {
                    html_TFestivo += "<tr id= 'TFestivo_" + ArrayFestivo[itemArray].Index + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayFestivo[itemArray].Index + "')\"></img><span>Eliminar Festivos</span></span></td><td style='white-space: nowrap;'>" + ArrayFestivo[itemArray].Nit_ID + " - " + ArrayFestivo[itemArray].DescripcionEmpresa + "</td><td style='white-space: nowrap;'>" + ArrayFestivo[itemArray].Calendario_ID + " - " + ArrayFestivo[itemArray].DescripcionCalendario + "</td><td>" + ArrayFestivo[itemArray].Year + "</td><td>" + ArrayFestivo[itemArray].StrMes + "" + ArrayFestivo[itemArray].StrDia + "</td></tr>";
                }
            }
            break;
    }
    html_TFestivo += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_TFestivo);

    $("#TFestivo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(vp_Index) {

    for (var i in ArrayFestivo) {
        if (ArrayFestivo[i].Index == vp_Index) {
            editNit_ID = ArrayFestivo[i].Nit_ID;
            editCalendario_ID = ArrayFestivo[i].Calendario_ID;
            editYear = ArrayFestivo[i].Year;
            editMesDia = ArrayFestivo[i].Mes_Dia;
        }
    }    

    $("#dialog_eliminar").dialog("option", "title", "¿Eliminar Festivo?");
    $("#dialog_eliminar").dialog("open");

}

//Función que ejecuta todas las transacciones que dependen de la selección de un NIT
function TransaccionesNIT(NIT) {
    transacionAjax_ChargeCalendarios('MatrixCalendarios', NIT);
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    Matrix_Calendarios = [];
    editNit_ID = "";
    editCalendario_ID = "";
    editYear = "";
    editMesDia = "";

    $("#Select_EmpresaNit").val("-1").trigger('chosen:updated');
    $("#Select_Calendario_CP").empty().trigger("chosen:updated");
    $("#Txt_Año").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger('chosen:updated');

    var Only_Empresa = VerificarNIT("Select_EmpresaNit");

    if (Only_Empresa == true) {
        $("#Txt_ID").val("");
        TransaccionesNIT($("#Select_EmpresaNit").val());
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             PROCESOS DE CHANGES                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Proceso de Change para el NIT Empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
            $("#Select_Calendario_CP").empty().trigger("chosen:updated");
        } else {
            $("#Select_Calendario_CP").empty();
            TransaccionesNIT($(this).val());
        }
    });
}
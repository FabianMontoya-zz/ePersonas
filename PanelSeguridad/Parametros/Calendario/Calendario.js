/*--------------- region de variables globales --------------------*/
var ArrayCalendario = [];
var ArrayCombo = [];
var ArrayCalendarioDep = [];
var ArraySeguridad = [];

var MensajeHora = "";
var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
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

    $("#Dialog_Calendar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1160,
        height: 600,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $(function () {
        $("#Txtfecha").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtIniLun").timepicker();
        $("#TxtFinLun").timepicker();
        $("#TxtIniMar").timepicker();
        $("#TxtFinMar").timepicker();
        $("#TxtIniMie").timepicker();
        $("#TxtFinMie").timepicker();
        $("#TxtIniJue").timepicker();
        $("#TxtFinJue").timepicker();
        $("#TxtIniVie").timepicker();
        $("#TxtFinVie").timepicker();
        $("#TxtIniSab").timepicker();
        $("#TxtFinSab").timepicker();
        $("#TxtIniDom").timepicker();
        $("#TxtFinDom").timepicker();
        $("#TxtIniF").timepicker();
        $("#TxtFinF").timepicker();
    });
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Calendario("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Calendario("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Calendario_create("crear");
        }
        else {
            transacionAjax_Calendario_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Calendario_delete("elimina");
}

//agrega calendario a un array
function BtnAgregaCalendario() {

    var validate = ValidaHoras();
    if (validate == 1)
        Mensaje_General("Advertencia!", "La hora inicial es mayor que la hora final! en el dia (" + MensajeHora + ")", "W");
    else
        alert("Mi Pitbull");
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
            $("#Dialog_Calendar").dialog("open");
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}



//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TipoCalendario ").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
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

//valida horas
function ValidaHoras() {
    var validate = 0;
    var V_H;
    //Lunes
    if ($("#TxtIniLun").val() != "" || $("#TxtFinLun").val() != "") {
        V_H = Validahora($("#TxtIniLun").val(), $("#TxtFinLun").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Lunes"
            else
                MensajeHora = MensajeHora + ", Lunes"
        }
    }
    //Martes
    if ($("#TxtIniMar").val() != "" || $("#TxtFinMar").val() != "") {
        V_H = Validahora($("#TxtIniMar").val(), $("#TxtFinMar").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Martes"
            else
                MensajeHora = MensajeHora + ", Martes"
        }
    }
    //Miercoles
    if ($("#TxtIniMie").val() != "" || $("#TxtFinMie").val() != "") {
        V_H = Validahora($("#TxtIniMie").val(), $("#TxtFinMie").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Miercoles"
            else
                MensajeHora = MensajeHora + ", Miercoles"
        }
    }
    //Jueves
    if ($("#TxtIniJue").val() != "" || $("#TxtFinJue").val() != "") {
        V_H = Validahora($("#TxtIniJue").val(), $("#TxtFinJue").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Jueves"
            else
                MensajeHora = MensajeHora + ", Jueves"
        }
    }
    //Viernes
    if ($("#TxtIniVie").val() != "" || $("#TxtFinVie").val() != "") {
        V_H = Validahora($("#TxtIniVie").val(), $("#TxtFinVie").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Viernes"
            else
                MensajeHora = MensajeHora + ", Viernes"
        }
    }
    //Sabado
    if ($("#TxtIniSab").val() != "" || $("#TxtFinSab").val() != "") {
        V_H = Validahora($("#TxtIniSab").val(), $("#TxtFinSab").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Sabado"
            else
                MensajeHora = MensajeHora + ", Sabado"
        }
    }
    //Domingo
    if ($("#TxtIniDom").val() != "" || $("#TxtFinDom").val() != "") {
        V_H = Validahora($("#TxtIniDom").val(), $("#TxtFinDom").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " Domingo"
            else
                MensajeHora = MensajeHora + ", Domingo"
        }
    }
    //FESTIVO
    if ($("#TxtIniF").val() != "" || $("#TxtFinF").val() != "") {
        V_H = Validahora($("#TxtIniF").val(), $("#TxtFinF").val());
        if (V_H == 1) {
            validate = 1;
            if (MensajeHora == "")
                MensajeHora = MensajeHora + " FESTIVO"
            else
                MensajeHora = MensajeHora + ", FESTIVO"
        }
    }
    return validate;
}

// crea la tabla en el cliente
function Table_Calendario() {
    var html_Calendario;

    switch (estado) {

        case "buscar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            } break;

        case "modificar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></input></td><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></input></td><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Calendario += "</tbody></table>";
    $("#container_TGrid").html("");
    $("#container_TGrid").html(html_Calendario);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TCalendario").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Calendario) {

    for (itemArray in ArrayCalendario) {
        if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {

            editNit_ID = ArrayCalendario[itemArray].Nit_ID;
            editID = ArrayCalendario[itemArray].Calendario_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Calendario) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCalendario) {
        if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {

            editNit_ID = ArrayCalendario[itemArray].Nit_ID;
            editID = ArrayCalendario[itemArray].Calendario_ID;

            $("#Select_EmpresaNit").val(ArrayCalendario[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayCalendario[itemArray].Calendario_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayCalendario[itemArray].Descripcion);
            $("#Select_TipoCalendario").val(ArrayCalendario[itemArray].TipoCalendario);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}


//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_CalendarioDepent').val(index);
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
    $("#Select_TipoCalendario").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
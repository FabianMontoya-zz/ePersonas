/*--------------- region de variables globales --------------------*/
var ArrayCalendario_Grid = [];
var ArrayCalendario = [];
var ArrayCombo = [];
var ArrayCalendarioDep = [];
var ArrayC_Semana = [];

var MensajeHora = "";
var V_ONE = 0;

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {


    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TGrid").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Calendario('MatrixCalendarios');

    $(function () {
        $("#TxtF_Start").datepicker({ dateFormat: 'yy-mm-dd' });
        $("#TxtF_End").datepicker({ dateFormat: 'yy-mm-dd' });
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
    Change_Tipo_Calendario();

    Change_Select_Nit();
    Change_TipoCalendario();

    Clear();
});


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

    $("#Dialog_Calendar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1220,
        height: 760,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaHoras").css("display", "none"); //Table que contiene el capturador de horas
    $("#container_TGrid_2").css("display", "none"); //Tabla que dibuja el grid con las horas ya capturadas
    $("#TablaConsulta").css("display", "none");
    $("#Tabla_10").css("display", "none");
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    OpenControl();

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
    OpenControl();
    transacionAjax_Calendario_delete("elimina");
}

//agrega calendario a un array
function BtnAgregaCalendario() {

    var validate = ValidaHoras();
    switch (validate) {
        case 0:
            if (V_ONE == 0)
                Mensaje_General("Advertencia!", "Debe minimo seleccionar un agendamiento", "W");
            else
                validaTipoC();
            break;

        case 1:
            Mensaje_General("Advertencia!", "La hora inicial es mayor que la hora final! en el dia (" + MensajeHora + ")", "W");
            break;

        case 2:
            Mensaje_General("Advertencia!", "La hora inicial ó  la hora final! en el dia (" + MensajeHora + ")", "W");
            break;
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    MensajeHora = "";
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D_Calen").css("display", "inline-table");
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
            $("#TablaDatos_D_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del calendario
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

//validamos campos para la creacion del calendario
function validarCamposFechas() {

    var Campo_1 = $("#TxtF_Start").val();
    var Campo_2 = $("#TxtF_End").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
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
        V_ONE = 1;
        V_H = Validahora($("#TxtIniLun").val(), $("#TxtFinLun").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Lunes"
                else
                    MensajeHora = MensajeHora + ", Lunes"
                break

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Lunes"
                else
                    MensajeHora = MensajeHora + ", Lunes"
                break
        }

    }
    //Martes
    if ($("#TxtIniMar").val() != "" || $("#TxtFinMar").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniMar").val(), $("#TxtFinMar").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Martes"
                else
                    MensajeHora = MensajeHora + ", Martes"
                break

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Martes"
                else
                    MensajeHora = MensajeHora + ", Martes"
                break
        }

    }
    //Miercoles
    if ($("#TxtIniMie").val() != "" || $("#TxtFinMie").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniMie").val(), $("#TxtFinMie").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Miercoles"
                else
                    MensajeHora = MensajeHora + ", Miercoles"

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Miercoles"
                else
                    MensajeHora = MensajeHora + ", Miercoles"
                break
        }

    }
    //Jueves
    if ($("#TxtIniJue").val() != "" || $("#TxtFinJue").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniJue").val(), $("#TxtFinJue").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Jueves"
                else
                    MensajeHora = MensajeHora + ", Jueves"

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Jueves"
                else
                    MensajeHora = MensajeHora + ", Jueves"
                break
        }

    }
    //Viernes
    if ($("#TxtIniVie").val() != "" || $("#TxtFinVie").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniVie").val(), $("#TxtFinVie").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Viernes"
                else
                    MensajeHora = MensajeHora + ", Viernes"

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Viernes"
                else
                    MensajeHora = MensajeHora + ", Viernes"
                break
        }

    }
    //Sabado
    if ($("#TxtIniSab").val() != "" || $("#TxtFinSab").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniSab").val(), $("#TxtFinSab").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Sabado"
                else
                    MensajeHora = MensajeHora + ", Sabado"

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Sabado"
                else
                    MensajeHora = MensajeHora + ", Sabado"
                break
        }

    }
    //Domingo
    if ($("#TxtIniDom").val() != "" || $("#TxtFinDom").val() != "") {
        V_ONE = 1;
        V_H = Validahora($("#TxtIniDom").val(), $("#TxtFinDom").val());

        switch (V_H) {
            case 1:
                validate = 1;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Domingo"
                else
                    MensajeHora = MensajeHora + ", Domingo"

            case 2:
                validate = 2;
                if (MensajeHora == "")
                    MensajeHora = MensajeHora + " Domingo"
                else
                    MensajeHora = MensajeHora + ", Domingo"
                break
        }

    }
   
    return validate;
}

//valida el tio de clendario para el proceso
function validaTipoC() {
    var Ingresa;

    switch ($("#Select_TipoCalendario").val()) {
        case "1":

            CargeJson();
            break;

        case "2":
            Ingresa = ValidaFechas();
            console.log(Ingresa);
            if (Ingresa == 0) {
                CargeJson();
            }
            break;
    }
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//construye el Json con los datos proporcionados para la vista
function CargeJson() {

    var JsonCalendario_View = {
        "Nit_ID": $("#Select_EmpresaNit").val(),
        "Calendario_ID": $("#Txt_ID").val(),
        "Descripcion": $("#Txt_ID").val(),
        "TipoCalendario": $("#Select_TipoCalendario").val(),
        "IniLun": ValidaCamposJson($("#TxtIniLun").val()),
        "FinLun": ValidaCamposJson($("#TxtFinLun").val()),
        "IniMar": ValidaCamposJson($("#TxtIniMar").val()),
        "FinMar": ValidaCamposJson($("#TxtFinMar").val()),
        "IniMie": ValidaCamposJson($("#TxtIniMie").val()),
        "FinMie": ValidaCamposJson($("#TxtFinMie").val()),
        "IniJue": ValidaCamposJson($("#TxtIniJue").val()),
        "FinJue": ValidaCamposJson($("#TxtFinJue").val()),
        "IniVie": ValidaCamposJson($("#TxtIniVie").val()),
        "FinVie": ValidaCamposJson($("#TxtFinVie").val()),
        "IniSab": ValidaCamposJson($("#TxtIniSab").val()),
        "FinSab": ValidaCamposJson($("#TxtFinSab").val()),
        "IniDom": ValidaCamposJson($("#TxtIniDom").val()),
        "FinDom": ValidaCamposJson($("#TxtFinDom").val()),
    };
    InsertJson_Day("1", ValidaCamposJson($("#TxtIniLun").val()), ValidaCamposJson($("#TxtFinLun").val())); //lunes
    InsertJson_Day("2", ValidaCamposJson($("#TxtIniMar").val()), ValidaCamposJson($("#TxtFinMar").val())); //martes
    InsertJson_Day("3", ValidaCamposJson($("#TxtIniMie").val()), ValidaCamposJson($("#TxtFinMie").val())); //Miercoles
    InsertJson_Day("4", ValidaCamposJson($("#TxtIniJue").val()), ValidaCamposJson($("#TxtFinJue").val())); //Jueves
    InsertJson_Day("5", ValidaCamposJson($("#TxtIniVie").val()), ValidaCamposJson($("#TxtFinVie").val())); //Viernes
    InsertJson_Day("6", ValidaCamposJson($("#TxtIniSab").val()), ValidaCamposJson($("#TxtFinSab").val())); //Sabado
    InsertJson_Day("7", ValidaCamposJson($("#TxtIniDom").val()), ValidaCamposJson($("#TxtFinDom").val())); //Domingo
    InsertJson_Day($("#Select_Festivo").val(), "F", "F"); //festivo

    ArrayCalendario_Grid.push(JsonCalendario_View);
    TGridCalendar();
    Clear_Agregar();
}

//carga jsonde insercion para BD
function InsertJson_Day(vp_NumberDay, vp_H_In, vp_H_Fi) {
    var JsonDayCalendar = {
        "Nit_ID": $("#Select_EmpresaNit").val(),
        "Calendario_ID": $("#Txt_ID").val(),
        "Dia_1_8": vp_NumberDay,
        "IndicativoFoto": "N",
        "HoraInicial": vp_H_In,
        "HoraFinal": vp_H_Fi,
        "UsuarioCreacion": User.toUpperCase(),
    };
    ArrayC_Semana.push(JsonDayCalendar);
}

//valida camposvacios por cero
function ValidaCamposJson(vp_Campo) {
    var vl_CampoValue = 0;

    if (vp_Campo != "") {
        vl_CampoValue = vp_Campo;
    }
    return vl_CampoValue;
}

//grid de calendario asignados
function TGridCalendar() {

    var html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th><th colspan='2' class='Grid_Head' >Martes</th><th colspan='2' class='Grid_Head' >Miercoles</th><th colspan='2' class='Grid_Head' >Jueves</th><th colspan='2' class='Grid_Head' >Viernes</th><th colspan='2' class='Grid_Head' >Sabado</th><th colspan='2' class='Grid_Head' >Domingo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    for (itemArray in ArrayCalendario_Grid) {
        html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario_Grid[itemArray].Calendario_ID + "'><td>" + ArrayCalendario_Grid[itemArray].IniLun + "</td><td>" + ArrayCalendario_Grid[itemArray].FinLun + "</td><td>" + ArrayCalendario_Grid[itemArray].IniMar + "</td><td>" + ArrayCalendario_Grid[itemArray].FinMar + "</td><td>" + ArrayCalendario_Grid[itemArray].IniMie + "</td><td>" + ArrayCalendario_Grid[itemArray].FinMie + "</td><td>" + ArrayCalendario_Grid[itemArray].IniJue + "</td><td>" + ArrayCalendario_Grid[itemArray].FinJue + "</td><td>" + ArrayCalendario_Grid[itemArray].IniVie + "</td><td>" + ArrayCalendario_Grid[itemArray].FinVie + "</td><td>" + ArrayCalendario_Grid[itemArray].IniSab + "</td><td>" + ArrayCalendario_Grid[itemArray].FinSab + "</td><td>" + ArrayCalendario_Grid[itemArray].IniDom + "</td><td>" + ArrayCalendario_Grid[itemArray].FinDom + "</td></tr>";
    }

    html_Calendario += "</tbody></table>";
    $("#container_TGrid_2").html("");
    $("#container_TGrid_2").html(html_Calendario);

    $("#TCalendario").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpieza de campos despues de agregar un calendario al grid
function Clear_Agregar() {
    $("#TxtIniLun").val("");
    $("#TxtFinLun").val("");
    $("#TxtIniMar").val("");
    $("#TxtFinMar").val("");
    $("#TxtIniMie").val("");
    $("#TxtFinMie").val("");
    $("#TxtIniJue").val("");
    $("#TxtFinJue").val("");
    $("#TxtIniVie").val("");
    $("#TxtFinVie").val("");
    $("#TxtIniSab").val("");
    $("#TxtFinSab").val("");
    $("#TxtIniDom").val("");
    $("#TxtFinDom").val("");
    
    $('.C_Chosen').trigger('chosen:updated');
}

// crea la tabla de consulta
function Table_Calendario() {
    var html_Calendario;

    switch (estado) {

        case "buscar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Editar Calendario</span></span></td><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Calendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayCalendario) {
                if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                    html_Calendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Eliminar Calendario</span></span></td><td>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td>" + ArrayCalendario[itemArray].Descripcion + "</td><td>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
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

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");

    $("#Select_TipoCalendario").prop('disabled', true); //No se agrega el trigger porque se hace al seleccionar el val
    $("#Select_TipoCalendario").val("-1").trigger("chosen:updated");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    VerificarNIT("Select_EmpresaNit");

    ArrayCalendario_Grid = [];
    ArrayCombo = [];
    ArrayCalendarioDep = [];
    ArrayC_Semana = [];
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                     PROCESOS DE CHANGES EN Huellas                                                                                                                                     ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Proceso de Change para el NIT Empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
        } else {
            $("#Img1").css("display", "none");
        }
    });
}

//Proceso de Change para el Tipo Calendario
function Change_TipoCalendario() {
    $("#Select_TipoCalendario").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_TipoCalendario").val() == "-1") {
            $("#Img5").css("display", "inline-table");
            $("#TablaHoras").css("display", "inline-table"); //Table que contiene el capturador de horas
        } else {
            $("#Img5").css("display", "none");
            $("#TablaHoras").css("display", "none"); //Table que contiene el capturador de horas
        }
    });
}
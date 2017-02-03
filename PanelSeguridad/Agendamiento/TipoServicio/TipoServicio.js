/*--------------- region de variables globales --------------------*/
var ArrayTipoServicio = [];
var ArrayCombo = [];
var ArrayTipoServicioDep = [];
var ArraySeguridad = [];
var ArrayEmpresaNit = [];
var Matrix_Moneda = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {


    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TServicio").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_MMoneda('Moneda');

    //$(function () {
    //    $("#TxtF_Start").datepicker({ dateFormat: 'yy-mm-dd' });
    //    $("#TxtF_End").datepicker({ dateFormat: 'yy-mm-dd' });
    //    $("#TxtIniLun").timepicker();
    //    $("#TxtFinLun").timepicker();
    //    $("#TxtIniMar").timepicker();
    //    $("#TxtFinMar").timepicker();
    //    $("#TxtIniMie").timepicker();
    //    $("#TxtFinMie").timepicker();
    //    $("#TxtIniJue").timepicker();
    //    $("#TxtFinJue").timepicker();
    //    $("#TxtIniVie").timepicker();
    //    $("#TxtFinVie").timepicker();
    //    $("#TxtIniSab").timepicker();
    //    $("#TxtFinSab").timepicker();
    //    $("#TxtIniDom").timepicker();
    //    $("#TxtFinDom").timepicker();
    //    $("#TxtIniF").timepicker();
    //    $("#TxtFinF").timepicker();
    //});
    Change_Select_Nit();
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

    //$("#Dialog_Calendar").dialog({
    //    autoOpen: false,
    //    dialogClass: "Dialog_Sasif",
    //    modal: true,
    //    width: 1220,
    //    height: 760,
    //    overlay: {
    //        opacity: 0.5,
    //        background: "black"
    //    }
    //});

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
    $("#TablaConsulta").css("display", "none");
    $("#TablaDatos_D").css("display", "none");
}

//carga el combo de Cargo dependiente
function Change_Select_Nit() {

    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });

}

function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
    //    $('#Select_Moneda_Cod').empty();
    //    transacionAjax_MMoneda('Moneda', index_ID);
    }
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
        transacionAjax_TipoServicio("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_TipoServicio("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_TipoServicio_create("crear");
        }
        else {
            transacionAjax_TipoServicio_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl();
    transacionAjax_TipoServicio_delete("elimina");
}

////agrega Servicio a un array
//function BtnAgregaServicio() {

//    var validate = ValidaHoras();
//    switch (validate) {
//        case 0:
//            if (V_ONE == 0)
//                Mensaje_General("Advertencia!", "Debe minimo seleccionar un agendamiento", "W");
//            else
//                validaTipoC();
//            break;

//        case 1:
//            Mensaje_General("Advertencia!", "La hora inicial es mayor que la hora final! en el dia (" + MensajeHora + ")", "W");
//            break;

//        case 2:
//            Mensaje_General("Advertencia!", "La hora inicial ó  la hora final! en el dia (" + MensajeHora + ")", "W");
//            break;
//    }
//}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    //MensajeHora = "";
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
            //$("#Dialog_Calendar").dialog("open");

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del Servicio
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TipoServicio ").val();

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

//validamos campos para la creacion del Servicio
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
//function ValidaHoras() {
//    var validate = 0;
//    var V_H;

//    //Lunes
//    if ($("#TxtIniLun").val() != "" || $("#TxtFinLun").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniLun").val(), $("#TxtFinLun").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Lunes"
//                else
//                    MensajeHora = MensajeHora + ", Lunes"
//                break

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Lunes"
//                else
//                    MensajeHora = MensajeHora + ", Lunes"
//                break
//        }

//    }
//    //Martes
//    if ($("#TxtIniMar").val() != "" || $("#TxtFinMar").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniMar").val(), $("#TxtFinMar").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Martes"
//                else
//                    MensajeHora = MensajeHora + ", Martes"
//                break

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Martes"
//                else
//                    MensajeHora = MensajeHora + ", Martes"
//                break
//        }

//    }
//    //Miercoles
//    if ($("#TxtIniMie").val() != "" || $("#TxtFinMie").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniMie").val(), $("#TxtFinMie").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Miercoles"
//                else
//                    MensajeHora = MensajeHora + ", Miercoles"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Miercoles"
//                else
//                    MensajeHora = MensajeHora + ", Miercoles"
//                break
//        }

//    }
//    //Jueves
//    if ($("#TxtIniJue").val() != "" || $("#TxtFinJue").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniJue").val(), $("#TxtFinJue").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Jueves"
//                else
//                    MensajeHora = MensajeHora + ", Jueves"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Jueves"
//                else
//                    MensajeHora = MensajeHora + ", Jueves"
//                break
//        }

//    }
//    //Viernes
//    if ($("#TxtIniVie").val() != "" || $("#TxtFinVie").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniVie").val(), $("#TxtFinVie").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Viernes"
//                else
//                    MensajeHora = MensajeHora + ", Viernes"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Viernes"
//                else
//                    MensajeHora = MensajeHora + ", Viernes"
//                break
//        }

//    }
//    //Sabado
//    if ($("#TxtIniSab").val() != "" || $("#TxtFinSab").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniSab").val(), $("#TxtFinSab").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Sabado"
//                else
//                    MensajeHora = MensajeHora + ", Sabado"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Sabado"
//                else
//                    MensajeHora = MensajeHora + ", Sabado"
//                break
//        }

//    }
//    //Domingo
//    if ($("#TxtIniDom").val() != "" || $("#TxtFinDom").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniDom").val(), $("#TxtFinDom").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Domingo"
//                else
//                    MensajeHora = MensajeHora + ", Domingo"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " Domingo"
//                else
//                    MensajeHora = MensajeHora + ", Domingo"
//                break
//        }

//    }
//    //FESTIVO
//    if ($("#TxtIniF").val() != "" || $("#TxtFinF").val() != "") {
//        V_ONE = 1;
//        V_H = Validahora($("#TxtIniF").val(), $("#TxtFinF").val());

//        switch (V_H) {
//            case 1:
//                validate = 1;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " FESTIVO"
//                else
//                    MensajeHora = MensajeHora + ", FESTIVO"

//            case 2:
//                validate = 2;
//                if (MensajeHora == "")
//                    MensajeHora = MensajeHora + " FESTIVO"
//                else
//                    MensajeHora = MensajeHora + ", FESTIVO"
//                break
//        }

//    }
//    return validate;
//}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID Servicio                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function validaTipoC() {
    var Ingresa;

    switch ($("#Select_TipoServicio").val()) {
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

//construye el Json con los datos proporcionados
function CargeJson() {

    //JsonServicio = {
    //    "Nit_ID": $("#Select_EmpresaNit").val(),
    //    "Servicio_ID": $("#Txt_ID").val(),
    //    "Descripcion": $("#TxtNombre").val(),
    //    "TipoServicio": $("#Select_TipoServicio").val(),
        //"IniLun": $("#TxtIniLun").val(),
        //"FinLun": $("#TxtFinLun").val(),
        //"IniMar": $("#TxtIniMar").val(),
        //"FinMar": $("#TxtFinMar").val(),
        //"IniMie": $("#TxtIniMie").val(),
        //"FinMie": $("#TxtFinMie").val(),
        //"IniJue": $("#TxtIniJue").val(),
        //"FinJue": $("#TxtFinJue").val(),
        //"IniVie": $("#TxtIniVie").val(),
        //"FinVie": $("#TxtFinVie").val(),
        //"IniSab": $("#TxtIniSab").val(),
        //"FinSab": $("#TxtFinSab").val(),
        //"IniDom": $("#TxtIniDom").val(),
        //"FinDom": $("#TxtFinDom").val(),
        //"IniF": $("#TxtIniF").val(),
        //"FinF": $("#TxtFinF").val()
    //};

    //ArrayTipoServicio.push(JsonServicio);
    //TGridCalendar();
    //Clear_Agregar();

}

//grid de Servicio asignados
function TGridCalendar() {

    var html_Servicio;
    html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th><th colspan='2' class='Grid_Head' >Martes</th><th colspan='2' class='Grid_Head' >Miercoles</th><th colspan='2' class='Grid_Head' >Jueves</th><th colspan='2' class='Grid_Head' >Viernes</th><th colspan='2' class='Grid_Head' >Sabado</th><th colspan='2' class='Grid_Head' >Domingo</th><th colspan='2' class='Grid_Head' >Festivo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    for (itemArray in ArrayTipoServicio) {
        html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Servicio_ID + "'><td>" + ArrayTipoServicio[itemArray].IniLun + "</td><td>" + ArrayTipoServicio[itemArray].FinLun + "</td><td>" + ArrayTipoServicio[itemArray].IniMar + "</td><td>" + ArrayTipoServicio[itemArray].FinMar + "</td><td>" + ArrayTipoServicio[itemArray].IniMie + "</td><td>" + ArrayTipoServicio[itemArray].FinMie + "</td><td>" + ArrayTipoServicio[itemArray].IniJue + "</td><td>" + ArrayTipoServicio[itemArray].FinJue + "</td><td>" + ArrayTipoServicio[itemArray].IniVie + "</td><td>" + ArrayTipoServicio[itemArray].FinVie + "</td><td>" + ArrayTipoServicio[itemArray].IniSab + "</td><td>" + ArrayTipoServicio[itemArray].FinSab + "</td><td>" + ArrayTipoServicio[itemArray].IniDom + "</td><td>" + ArrayTipoServicio[itemArray].FinDom + "</td><td>" + ArrayTipoServicio[itemArray].IniF + "</td><td>" + ArrayTipoServicio[itemArray].FinF + "</td></tr>";
    }

    html_Servicio += "</tbody></table>";
    $("#container_TGrid_2").html("");
    $("#container_TGrid_2").html(html_Servicio);

    $("#TServicio").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//limpieza de campos despues de agregar un Servicio al grid
function Clear_Agregar() {

    /*$("#Select_StateLun").val("L");
    $("#Select_StateMar").val("L");
    $("#Select_StateMie").val("L");
    $("#Select_StateJue").val("L");
    $("#Select_StateVie").val("L");
    $("#Select_StateSab").val("L");
    $("#Select_StateDom").val("L");
    $("#Select_Festivo").val("L");*/

    ////$("#TxtIniLun").val("");
    ////$("#TxtFinLun").val("");
    ////$("#TxtIniMar").val("");
    ////$("#TxtFinMar").val("");
    ////$("#TxtIniMie").val("");
    ////$("#TxtFinMie").val("");
    ////$("#TxtIniJue").val("");
    ////$("#TxtFinJue").val("");
    ////$("#TxtIniVie").val("");
    ////$("#TxtFinVie").val("");
    ////$("#TxtIniSab").val("");
    ////$("#TxtFinSab").val("");
    ////$("#TxtIniDom").val("");
    ////$("#TxtFinDom").val("");
    ////$("#TxtIniF").val("");
    ////$("#TxtFinF").val("");

    $('.C_Chosen').trigger('chosen:updated');
}


// crea la tabla de consulta
function Table_Servicio() {
    var html_Servicio;

    switch (estado) {

        case "buscar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Num. Servicios no pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Num. Servicios no pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Num. Servicios no pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Servicios + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Servicio += "</tbody></table>";
    $("#container_TGrid").html("");
    $("#container_TGrid").html(html_Servicio);

    $(".Eliminar").click(function () {
    });

    $(".Editar").click(function () {
    });

    $("#TServicio").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Servicio) {

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Servicio_ID) {

            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Servicio_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Servicio) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Servicio_ID) {

            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Servicio_ID;

            $("#Select_EmpresaNit").val(ArrayTipoServicio[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayTipoServicio[itemArray].Servicio_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayTipoServicio[itemArray].Descripcion);
            $("#Select_TipoServicio").val(ArrayTipoServicio[itemArray].TipoServicio);

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_ServicioDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}



//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_TipoServicio").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }
}
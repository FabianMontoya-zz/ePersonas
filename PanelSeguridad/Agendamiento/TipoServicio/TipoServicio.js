/*--------------- region de variables globales --------------------*/
var ArrayTipoServicio = [];
var ArrayCombo = [];
var ArrayTipoServicioDep = [];
var ArraySeguridad = [];
var ArrayEmpresaNit = [];
var Matrix_Moneda = [];
var Matrix_Calendarios = [];
var Matrix_Documento = [];
var ArrayFormato = [];
var ParamMoneda = "" //Para tomar la moneda que llega por parámetro (Param 1)

var estado;
var editNit_ID;
var index_ID;
var editID;
var RutaTemporal;
var RutaRelativa;
var DescripFormato;
var StrConsecutivo;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    try {
        /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
        Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
        Ocultar_Errores();
        Ocultar_Tablas();
        /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/
        transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
        transacionAjax_EmpresaNit('Cliente');
        //transacionAjax_Formato('Formato');
        //transaccionAjax_RutasOperacion('Rutas_Operacion');
        //transaccionAjax_MDocumento('Matrx_Documento', Array_G_Usuario[0].Nit_ID);
        transacionAjax_MMoneda('Moneda');

        ParamMoneda = ConsultaParam1_Pag();
        SelectMoneda(ParamMoneda);

        IniciarTimeFormat();
        Change_Select_Nit();
        Change_Select_TipoServicio();
        Change_Select_Moneda();
    } catch (e) {
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.ready):\n" + e));
        return false;
    }
});

//Función que inicializa todos los label que contendran horas
function IniciarTimeFormat() {
    Format_DialogTime("TXT_TiempoSesion");
    Format_DialogTime("TXT_TiempoEntreSesiones");
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

    $("#Dialog_Imagen").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#Dialog_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
}

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#Img13").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#IF_Visor").css("display", "none");
    $("#foto_servicio").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaConsulta").css("display", "none");
    $(".Dialog_Datos").css("display", "none");
}

//habilita la ventana emergente de Horas
function Format_DialogTime(ObjText) {
    $("#" + ObjText).click(function () {
        ControlTime = ObjText; //Se inicializó en SasifMaster
        if ($("#" + ObjText).val == "") {
        } else {
            ClearTime();
            TimeWrote = $("#" + ObjText).val();
            var time = TimeWrote.split(":");
            Hours = time[0];
            Minutes = time[1];
            $("#TXTHours").val(Hours);
            $("#TXTMinutes").val(Minutes);
            WriteTime();
            $("#TXTHours").focus();
        }
        $("#Dialog_time").dialog("open");
        $("#Dialog_time").dialog("option", "title", "Ingrese Tiempo");

    });

    $("#TXTMinutes").blur(function () {
        ValidaMinute($(this).val(), $(this))
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {
    try {
        var filtro;
        var ValidateSelect = ValidarDroplist();
        var opcion;

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
    } catch (e) {
        Mensaje_General("Error - No se logró consultar", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de busqueda.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.BtnConsulta):\n" + e));
    }
}

//crear link en la BD
function BtnCrear() {
    try {
        var validate;
        validate = validarCamposCrear();

        if (validate == 0) {
            if ($("#Btnguardar").val() == "Guardar") {
                $("#Dialog_Imagen").dialog("open");
                transacionAjax_TipoServicio_create("crear");

            }
            else {
                transacionAjax_TipoServicio_create("modificar");
            }
        }
    } catch (e) {
        Mensaje_General("Error - No se logró ejecutar Acción", "Lo sentimos, ocurrió un error y no se logró ejecutar correctamente la acción de « " + $("#Btnguardar").val() + " ».", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.BtnCrear):\n" + e));
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_TipoServicio_delete("elimina");
}

//traer el formado del documento
function BuscarFormato(vp_Formato) {
    var vl_ID_Doc;
    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].DescripFormato == "JPG")
            vl_ID_Doc = Matrix_Documento[item].Documento_ID;
    }

    var vl_StrFormato = "1";

    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Documento_ID == vl_ID_Doc)
            vl_StrFormato = Matrix_Documento[item].DescripFormato;
    }
    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Nit_ID == Nit_ID_proccess)
            StrConsecutivo = Matrix_Documento[item].Consecutivo;
    }
    return vl_StrFormato;
}

//Función que escribe en el td el tiempo que se ha digitado
function WriteTime() {
    try {
        var h = $("#TXTHours").val();
        var m = $("#TXTMinutes").val();

        if (h.length == 0 || m.length == 0) {
            if (h.length == 0) {
                h = "0";
            }
            if (m.length == 0) {
                m = "0";
            }
        }

        if (parseInt(h) != 1 && parseInt(m) != 1) {
            $("#L_Hours_Min").html("El tiempo será de " + parseInt(h) + " horas y " + parseInt(m) + " minutos.");
        } else if (parseInt(h) == 1 && parseInt(m) != 1) {
            $("#L_Hours_Min").html("El tiempo será de " + parseInt(h) + " hora y " + parseInt(m) + " minutos.");
        } else if (parseInt(h) != 1 && parseInt(m) == 1) {
            $("#L_Hours_Min").html("El tiempo será de " + parseInt(h) + " horas y " + parseInt(m) + " minuto.");
        } else if (parseInt(h) == 1 && parseInt(m) == 1) {
            $("#L_Hours_Min").html("El tiempo será de " + parseInt(h) + " hora y " + parseInt(m) + " minuto.");
        }
    } catch (e) {
        Mensaje_General("Error - No se completó acción", "Lo sentimos, ocurrió un error y no se logró aescribir correctamente el tiempo digitado, verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.WriteTime):\n" + e));
    }
}

//Función que añade el tiempo digitado
function IngresarTime() {
    try {
        Minutes = "";
        Hours = "";
        Hours = $("#TXTHours").val(); //Inicializado en SasifMaster
        Minutes = $("#TXTMinutes").val(); //Inicializado en SasifMaster
        if (Hours == "") {
            $("#TXTHours").val("00");
            Hours = "00"; //Inicializado en SasifMaster
        }

        if (Hours != "" && Minutes != "" && ControlTime != "") {
            if (Hours.length == 1) {
                Hours = "0" + Hours;
            }
            if (Minutes.length == 1) {
                Minutes = "0" + Minutes;
            }

            if ((Hours.length == 2 && Minutes.length == 2) && (parseInt(Hours) >= 0) && (parseInt(Minutes) >= 0 && parseInt(Minutes) <= 59)) {
                TimeWrote = Hours + ":" + Minutes;
                $("#" + ControlTime).val("" + TimeWrote);
                $("#Dialog_time").dialog("close");
            } else {
                Mensaje_General("Error - Hora no valida", "Lo sentimos, por alguna razón la hora no cumple el formato y contiene números invalidos, verifique los datos digitados. Recomendamos volver a digitar cada uno de los datos.", "W");

                if (Hours.length != 2 || parseInt(Hours) < 0) {
                    $("#TXTHours").focus();
                    $("#TXTHours").select();
                    $("#ImgHours").css("display", "inline-table");
                } else {
                    $("#TXTMinutes").focus();
                    $("#TXTMinutes").select();
                }

                if (Minutes.length != 2 || parseInt(Minutes) < 0 || parseInt(Minutes) > 59) {
                    $("#ImgMinutes").css("display", "inline-table");
                }
            }
        } else {
            if (ControlTime == "") {
                Mensaje_General("Control Perdido", "Lo sentimos, se ha perdido la referencia del Control y no podemos escribir la hora digitada.", "W");
            } else {
                Mensaje_General("Campos Incompletos", "Debes completar los campos para poder agregar la hora.", "E");
                if (Hours == "") {
                    $("#ImgHours").css("display", "inline-table");
                }
                if (Minutes == "") {
                    $("#ImgMinutes").css("display", "inline-table");
                }
            }
        }
    } catch (e) {
        Mensaje_General("Error - No se completó acción", "Lo sentimos, ocurrió un error y no se logró añadir el tiempo digitado.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.IngresarTiempo):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {
    try {
        switch (opcion) {

            case "crear":
                $(".Dialog_Datos").css("display", "inline-table");
                $("#TablaConsulta").css("display", "none");
                $("#Select_EmpresaNit").removeAttr("disabled");
                $("#Txt_ID").removeAttr("disabled");
                $("#Btnguardar").attr("value", "Guardar");
                $('.C_Chosen').trigger('chosen:updated');
                $("#IF_Visor").css("display", "inline-table");
                $("#foto_servicio").css("display", "inline-table");
                Ocultar_Errores();
                Clear();
                estado = opcion;
                //$("#Dialog_Calendar").dialog("open");

                var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

                if (OnlyEmpresa == true) {
                    TransaccionesSegunNIT($("#Select_EmpresaNit").val());
                }

                //StrTFormato = BuscarFormato(Matrix_Documento);
                //ContruyeName_Temp("TEMP", StrConsecutivo, StrTFormato);
                break;

            case "buscar":
                $(".Dialog_Datos").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                $("#foto_servicio").css("display", "none");
                estado = opcion;
                Clear();
                break;

            case "modificar":
                $("#IF_Visor").css("display", "none");
                $("#foto_servicio").css("display", "none");
                $(".Dialog_Datos").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                estado = opcion;
                Ocultar_Errores();
                Clear();

                break;

            case "eliminar":
                $(".Dialog_Datos").css("display", "none");
                $("#TablaConsulta").css("display", "inline-table");
                $(".container_TGrid").html("");
                $("#foto_servicio").css("display", "none");
                estado = opcion;
                Clear();
                break;

        }
    } catch (e) {
        Mensaje_General("Error - Cambio Panel", "Lo sentimos, ocurrió un error y no se logró ejecutar la acción solicitada, favor recargue la página.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.HabilitarPanel):\n" + e));
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

//Función que valida que el número decimal recibido sea valido, sirve para recibir decimales (18,2)
function ValidaDecimales(input, val) {
    try {
        var decimal = false;
        var value = val;
        var splitValue = value.split(",");

        if (splitValue.length <= 2) {
            if (splitValue.length == 2) {
                if (splitValue[1].length <= 2) {
                    //No hacemos nada, está ok
                } else {
                    Mensaje_General("Decimal No valido", "Solo se permiten dos números despues de la coma decimal, favor verifique el dato.", "E");
                    value = value.substring(0, value.length - 1);
                    $(input).val(value);
                }
                if (splitValue[0].length <= 16) {
                    //No se hace nada, todo OK
                } else {
                    Mensaje_General("Número No valido", "El número digitado no puede exceder los 16 dígitos antes de la coma, favor verifique el dato.", "E");
                    value = splitValue[0].substring(0, splitValue[0].length - 1) + "," + splitValue[1];
                    $(input).val(value);
                }
            } else if (splitValue.length == 1) {
                if (splitValue[0].length <= 16) {
                    //No se hace nada, todo OK
                } else {
                    Mensaje_General("Número No valido", "El número digitado no puede exceder los 16 dígitos antes de la coma, favor verifique el dato.", "E");
                    value = value.substring(0, value.length - 1);
                    $(input).val(value);
                }
            }
        } else {
            value = value.replace(",", "");
            $(input).val(value);
            Mensaje_General("Decimal No valido", "El campo solo admite números decimales validos EJ: « 1234,56 » , favor verifique la entrada.", "E");
        }
        return decimal;
    } catch (e) {
        Mensaje_General("Error - Validación Dato Decimal", "Lo sentimos, ocurrió un error y no se logró verificar si el número es o no valido, el campo se limpiará.", "E");
        $(input).val("");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.ValidaDecimales):\n" + e));
        return false;
    }
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID Servicio                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// crea la tabla de consulta
function Table_Servicio() {
    var html_Servicio;

    switch (estado) {

        case "buscar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayTipoServicio[itemArray].Nit_ID + "','" + ArrayTipoServicio[itemArray].Codigo_ID + "')\"></img><span>Editar Tipo Sevicio</span></span></td><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayTipoServicio[itemArray].Nit_ID + "','" + ArrayTipoServicio[itemArray].Codigo_ID + "')\"></img><span>Eliminar Tipo Servicio</span></td><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Servicio += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Servicio);

    $("#TServicio").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Servicio) {

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Codigo_ID) {

            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Codigo_ID;
            $("#dialog_eliminar").dialog("option", "title", "¿Eliminar Servicio?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Servicio) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");
    $("#IF_Visor").css("display", "inline-table");
    $("#foto_servicio").css("display", "inline-table");

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Codigo_ID) {
            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Codigo_ID;

            $("#Select_EmpresaNit").val(ArrayTipoServicio[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayTipoServicio[itemArray].Codigo_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtNombre").val(ArrayTipoServicio[itemArray].Nombre);
            $("#Select_TipoServicio").val(ArrayTipoServicio[itemArray].Tipo);
            $("#Text_Referencia").val(ArrayTipoServicio[itemArray].Referencia);
            $("#Select_Moneda_Cod").val(ArrayTipoServicio[itemArray].Cod_Moneda);
            $("#TxtCosto").val(ArrayTipoServicio[itemArray].Costo);
            $("#TxtValor").val(ArrayTipoServicio[itemArray].valor);
            $("#Text_Capacidad").val(ArrayTipoServicio[itemArray].Capacidad);
            $("#Text_Bloqueo").val(ArrayTipoServicio[itemArray].N_Pagos_Bloqueos);
            $("#Select_Calculo").val(ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion);
            $("#Text_Tiempo_Sesion").val(ArrayTipoServicio[itemArray].Tiempo_Sesion);
            $("#Text_Tiempo_Entre_Sesiones").val(ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion);
            $("#Tiempo_Max_Agenda").val(ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda);
            $("#Txt_Detalle").val(ArrayTipoServicio[itemArray].Detalle);
            $("#Select_Calendario_TS").val(ArrayTipoServicio[itemArray].Calendario_ID),

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
    try {
        $("#TxtRead").val("");
        $("#DDLColumns").val("-1");

        $("#Select_EmpresaNit").val("-1");
        $("#Txt_ID").val("");
        $("#TxtDescription").val("");
        $("#Select_TipoServicio").val("-1");
        $("#TxtNombre").val("");
        $("#Select_TipoServicio").val("");
        $("#Text_Referencia").val("");
        SelectMoneda(ParamMoneda);
        $("#TxtCosto").val("");
        $("#TxtValor").val("");
        $("#Txt_Detalle").val("");
        $("#Text_Capacidad").val("");
        $("#Text_Bloqueo").val("");
        $("#Select_Calculo").val("");
        $("#Text_Tiempo_Sesion").val("");
        $("#Text_Tiempo_Entre_Sesiones").val("");
        $("#Tiempo_Max_Agenda").val("");
        $("#Select_Calendario_TS").empty();

        $('.C_Chosen').trigger('chosen:updated');

        var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (OnlyEmpresa == true) {
            TransaccionesSegunNIT($("#Select_EmpresaNit").val());
        }
    } catch (e) {
        Mensaje_General("Error - Sigla Moneda", "Lo sentimos, ocurrió un error y no se logró completar el proceso de limpieza de los campos. Favor verifique los datos.", "E");
        $("#V_Sigla_1").html("----");
        $("#V_Sigla_2").html("----");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.Clear):\n" + e));
    }
}

function TransaccionesSegunNIT(vp_index_ID) {
    if (vp_index_ID != "-1") {
        transacionAjax_Calendario('MatrixCalendarios', vp_index_ID);
        transaccionAjax_MDocumento('Matrx_Documento', vp_index_ID);
    }
}

//Función que coloca el combo de moneda en el valor enviado
function SelectMoneda(id_Moneda) {
    try {
        if (id_Moneda != null && id_Moneda.length > 0) {
            $("#Select_Moneda_Cod").val(id_Moneda).trigger('chosen:updated');
        } else {
            $("#Select_Moneda_Cod").val("-1").trigger('chosen:updated');
        }
        WriteSiglaMoneda();
    } catch (e) {
        Mensaje_General("Error - Selección Moneda", "Lo sentimos, ocurrió un error y no se logró seleccionar la moneda parametrizada. Favor verifique los datos.", "E");
        $("#V_Sigla_1").html("----");
        $("#V_Sigla_2").html("----");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.SelectMoneda):\n" + e));
    }
}

//Función que escribe la sigla de la moneda que se usará según sea la selección del combo de moneda
function WriteSiglaMoneda() {
    try {
        var index_ID = $("#Select_Moneda_Cod").val();
        if (index_ID != "-1" && index_ID != null) {
            $("#Img7").css("display", "none");
            for (item in Matrix_Moneda) {
                if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                    $("#V_Sigla_1").html(Matrix_Moneda[item].Sigla);
                    $("#V_Sigla_2").html(Matrix_Moneda[item].Sigla);
                    break;
                }
            }
        } else {
            $("#Img7").css("display", "inline-table");
            $("#V_Sigla_1").html("----");
            $("#V_Sigla_2").html("----");
        }
    } catch (e) {
        Mensaje_General("Error - Sigla Moneda", "Lo sentimos, ocurrió un error y no se logró escribir correctamente la sigla de la moneda seleccionada. Favor verifique los datos.", "E");
        $("#V_Sigla_1").html("----");
        $("#V_Sigla_2").html("----");
        setTimeout(console.error.bind(console, "• Log de error generado (TipoServicio.WriteSiglaMoneda):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CHANGES PARA SELECTS                                                                               ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Detección del change del combo Select_EmpresaNit
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        if (index_ID == "-1") {
            $("#Img1").css("display", "inline-table");
            $("#Select_Calendario_TS").empty().trigger('chosen:updated');
        } else {
            $("#Img1").css("display", "none");
            TransaccionesSegunNIT(index_ID);
        }
    });
}

//Detección del change del combo Select_EmpresaNit
function Change_Select_TipoServicio() {
    $("#Select_TipoServicio").change(function () {
        var index_ID = $(this).val();
        if (index_ID == "-1") {
            $("#Img5").css("display", "inline-table");
        } else {
            $("#Img5").css("display", "none");
        }
    });
}

//Detección del change del combo Select_Moneda_Cod
function Change_Select_Moneda() {
    $("#Select_Moneda_Cod").change(function () {
        WriteSiglaMoneda();
    });
}

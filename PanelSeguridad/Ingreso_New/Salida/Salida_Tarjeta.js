/*--------------- region de variables globales --------------------*/
var Array_SalidaLog = [];
var ListSalidaLog = [];

var Tarjeta_Proccess = 0;
var Process_Manual_Salida = 0;
var Cant_Salida = 0;
/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                            INICIA OPERCACION CON TARJETA                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//captura tarjeta y muestra 
function Capture_Tarjeta_ID() {
    $("#TxtIDTarjeta").change(function () {
        var Tarjeta_ID = $(this).val();

        Tarjeta_Proccess = 1;
        if (Tarjeta_ID.length == 10) {
            $("#TxtIDTarjeta").attr("disabled", "disabled");
            $("#Btnguardar").attr("value", "Nueva Consulta");
            OpenControl();
            transacionAjax_ShearchPeopleAccess("Search_People_Access", $("#Select_Documento").val(), $("#TxtDoc").val(), 0, Tarjeta_ID);
        }
        else {
            $("#TxtIDTarjeta").removeAttr("disabled");
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// validamos campos de captura
function Campos() {  //OK

    var Campo_1 = $("#Select_Documento").val();
    var Campo_2 = $("#TxtDoc").val();
    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
}

//valida si la persona tiene tarjeta o no
function Valida_Access_Minimo() {
    if (Array_People[0].Tarjeta_ID == "") {
        valida_GrpDoc();
    }
    else {
        if (Tarjeta_Proccess == 1) {
            Validaciones_Tarjeta();
        }
        else {
            Mensaje_General("Tiene Tarjeta", "la persona tiene la tarjeta N° (" + Array_People[0].Tarjeta_ID + ") para el Salida", "W");
            Clear();
        }
    }
}

//validamos es estado de la tarjeta
function Validaciones_Tarjeta() {

    var Estado_Tarjeta = Array_People[0].EstadoTarjeta;

    switch (Estado_Tarjeta) {
        case "1":
            Mensaje_General("Tarjeta No funcional!", "La Tarjeta  de " + Array_People[0].Nombre + " está sin Entregar en el Sistema comuniquese con su Administrador", "W");
            break;

        case "2":
            Valida_VigenciaTarjeta();
            break;

        case "3":
            Mensaje_General("Tarjeta Bloqueada!", "La Tarjeta  de " + Array_People[0].Nombre + " está " + Array_People[0].DescripMotivoBloqueo, "W");
            break;
    }
}

//valida la fecha de vencimiento de la tarjeta
function Valida_VigenciaTarjeta() {

    var CheckVigencia = Array_People[0].CheckVigencia_Tarjeta;
    var FechaVigencia = Array_People[0].FechaVencimientoTarjeta;

    switch (CheckVigencia) {
        case "S":
            comparacion = validate_fechaMayorQue(FechaVigencia, "", "SystemCompare");
            if (comparacion == "Mayor")
                Mensaje_General("Tarjeta Vencida!", "La Tarjeta  de " + Array_People[0].Nombre + " está vencida fecha de vencimiento ( " + FechaVigencia + ")", "W");
            else {
                Consulta_log_Registros();
            }
            break;
        case "N":
            Consulta_log_Registros();
            break;
    }

}

//valida si tiene rupo de documento
function Consulta_log_Registros() {
    transacionAjax_Consult_Registros_Ingreso("Traer_LogIngreso", Array_People[0].TypeDocument_ID, Array_People[0].Document_ID, Array_People[0].Nit_ID)
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           FUNCION   COMPLEMENTARIAS                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//muestra la hora en tiempo real
function MostrarHora() {
    if (!document.layers && !document.all && !document.getElementById)
        return

    var Digital = new Date();
    var hours = Digital.getHours();
    var minutes = Digital.getMinutes();
    var seconds = Digital.getSeconds();

    /*  construcion para hora normal
    var dn = "PM";
    if (hours < 12)
        dn = "AM";
    if (hours > 12)
        hours = hours - 12;
    if (hours == 0)
        hours = 12;
    */
    if (minutes <= 9)
        minutes = "0" + minutes;
    if (seconds <= 9)
        seconds = "0" + seconds;
    //change font size here to your desire
    myclock = "<font size='3' face='Arial' ><b></br>" + hours + ":" + minutes + ":" + seconds + " </b></font>";
    if (document.layers) {
        document.layers.liveclock.document.write(myclock);
        document.layers.liveclock.document.close();
    }
    else if (document.all)
        liveclock.innerHTML = myclock;
    else if (document.getElementById)
        document.getElementById("liveclock").innerHTML = myclock;

    Hours_Live = hours;
    Minutes_Live = minutes;

    setTimeout("MostrarHora()", 1000);
}

//calcula la hora estimada de salida de la persona
function CalculaHoraEstimada() {

    var Fecha_actual = $("#Hours").html();
    var HV_P = $("#TxtHora").val();
    var MV_P = $("#TxtMinutos").val();

    var Minuto_Estimado = 0;
    var Hora_Estimado = 0;
    var Minuto_Flotante = parseInt(MV_P) + parseInt(Minutes_Live);

    if (Minuto_Flotante > 59) {
        Minuto_Estimado = parseInt(Minuto_Flotante) - 59;
        if (Minuto_Estimado <= 9)
            Minuto_Estimado = "0" + Minuto_Estimado;

        Hora_Estimado = parseInt(Hours_Live) + parseInt(HV_P) + 1;
    }
    else {
        Minuto_Estimado = Minuto_Flotante;
        if (Minuto_Estimado <= 9)
            Minuto_Estimado = "0" + Minuto_Estimado;

        Hora_Estimado = parseInt(Hours_Live) + parseInt(HV_P);
    }

    $("#HA_Salida").html(Fecha_actual + " || " + Hours_Live + " : " + Minutes_Live);
    $("#HE_Salida").html(Fecha_actual + " || " + Hora_Estimado + " : " + Minuto_Estimado);

    CreateJSON_SalidaLog();
}

//crea array de Salidas
function CreateJSON_SalidaLog() {

    var Dato_Salida = $("#HA_Salida").html();
    var Dato_PlanSalida = $("#HE_Salida").html();
    var Dato_PA = $("#Select_PAcceso option:selected").html();
    var Dato_A = $("#Select_AreaAcceso option:selected").html();

    var A_Salida = Dato_Salida.split("||");
    var A_PlanSalida = Dato_PlanSalida.split("||");
    var A_PA = Dato_PA.split("-");

    var D_Area;
    if (Dato_A == "Todos")
        D_Area = "Todos"
    else {
        var A_A = Dato_A.split("-");
        D_Area = A_A[1];
    }

    var FIng = A_Salida[0].trim();
    var HIng = A_Salida[1].trim();

    var FPSal = A_PlanSalida[0].trim();
    var HPSal = A_PlanSalida[1].trim();

    var Str_P_Enc = $("#Txt_Persona_Enc").val();
    var SplitP_Enc = Str_P_Enc.split(" - ");
    var T_Doc_P_Enc = SplitP_Enc[0];
    var Doc_P_Enc = SplitP_Enc[1];

    var JSON_SalidaLog = {
        "Index": Cant_Salida,
        "Nit_ID": Nit_ID_Proccess,
        "TypeDocument_ID": $("#Select_Documento").val(),
        "Document_ID": $("#TxtDoc").val(),
        "Tarjeta_ID": $("#Tarjeta_ID").val(),
        "Nit_ID_EmpVisita": Nit_ID_Proccess,
        "PuertaAcceso_ID": $("#Select_PAcceso").val(),
        "Area_ID": $("#Select_AreaAcceso").val(),
        "TypeDocument_ID_Per_Encargada": T_Doc_P_Enc,
        "Document_ID_Per_Encargada": Doc_P_Enc,
        "FechaEntrada": FIng,
        "HoraEntrada": HIng,
        "Tiempo_PlanVisita": $("#TxtHora").val() + ":" + $("#TxtMinutos").val(),
        "Fecha_PlanSalida": FPSal,
        "Hora_PlanSalida": HPSal,
        "Fecha_RealSalida": "",
        "Hora_RealSalida": "",
        "Estado": 1,
        "IngAutomatico_Porteria": 2,
        "TipoPersona": "",
        "Num_UnicoVisita": Cant_Salida,
        "Usuario_Salida": User.toUpperCase(),
        "FechaSalida": $("#HA_Salida").html().replace("||", ""),
        "Usuario_Salida": "",
        "FechaSalida": "",
        "DescripPuertaAcceso": A_PA[1],
        "DescripAreaAcceso": D_Area,
        "DescripPersona_Enc": $("#Txt_Persona_Enc").val()
    }

    Array_SalidaLog.push(JSON_SalidaLog);
    Cant_Salida = Cant_Salida + 1;
    Tabla_Salida();
}

//crea el grid de Salida
function Tabla_Salida() {
    var html = "<table id='TIng' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='7' style='margin-top: 5px;' >Registro de Salidas</th></tr><tr><th>Puerta</th><th>Area</th><th>Persona Encargada</th><th>Tiempo Visita</th><th>Fecha/Hora Salida</th><th>Fecha/Hora Estimada Salida</th></tr></thead><tbody>";

    for (item in Array_SalidaLog) {
        html += "<tr id= 'TIng_" + item + "'><td>" + Array_SalidaLog[item].PuertaAcceso_ID + " - " + Array_SalidaLog[item].DescripPuertaAcceso + "</td><td>" + Array_SalidaLog[item].Area_ID + " - " + Array_SalidaLog[item].DescripAreaAcceso + "</td><td>" + Array_SalidaLog[item].DescripPersona_Enc + "</td><td>" + Array_SalidaLog[item].Tiempo_PlanVisita + "</td><td>" + Array_SalidaLog[item].FechaSalida + "</td><td>" + Array_SalidaLog[item].Fecha_PlanSalida + "  " + Array_SalidaLog[item].Hora_PlanSalida + "</td></tr>";
    }

    html += "</tbody></table>";
    $("#Cointainer_Salida").html("");
    $("#Cointainer_Salida").html(html);

    $("#TIng").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
    Clear_Salida();
    $("#Control_Salida").css("display", "inline-table");

}



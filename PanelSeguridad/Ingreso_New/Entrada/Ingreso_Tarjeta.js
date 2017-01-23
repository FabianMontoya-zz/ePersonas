/*--------------- region de variables globales --------------------*/
var Array_IngresoLog = [];
var ListIngresoLog = [];
var List_Puerta_Acceso = [];

var Tarjeta_Proccess = 0;
var Process_Manual_Ingreso = 0;
var Cant_Ingreso = 0;
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
            Mensaje_General("Tiene Tarjeta", "la persona tiene la tarjeta N° (" + Array_People[0].Tarjeta_ID + ") para el ingreso", "W");
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
                valida_GrpDoc();
            }
            break;
        case "N":
            valida_GrpDoc();
            break;
    }

}

//valida si tiene rupo de documento
function valida_GrpDoc() {
    if (GrpDoc_Persona != 0) {
        transacionAjax_Shearch_DocPersona('Buscar_Doc_Persona', Array_People[0].TypeDocument_ID, Array_People[0].Document_ID, Array_People[0].Nit_ID);
        transacionAjax_Shearch_DocEmpresa('Buscar_Doc_Empresa', Array_People[0].Nit_ID);
        transacionAjax_Bring_DocPersona('Traer_Doc_Persona', Array_People[0].TypeDocument_ID, Array_People[0].Document_ID, Array_People[0].Nit_ID);
        transacionAjax_Bring_DocEmpresa('Traer_Doc_Empresa', Array_People[0].Nit_ID);
    }
    else
        Mensaje_General("Proceso Imcompleto", "La persona no tiene (Grupo de Documentos) asignados, comuniquese con el administrador del sistema!", "E");


}

//revisamos ingreso segun documentos solicitados
function ValidaAccesoPrincipal() {
    var contador_semaforo = 0;

    for (item in Array_Valida_Ingreso) {
        contador_semaforo = contador_semaforo + parseInt(Array_Valida_Ingreso[item].Estado_Doc);
        if (Array_Valida_Ingreso[item].Estado_Doc >= 1) {
            ConstruyeMensaje(Array_Valida_Ingreso[item].Document, Array_Valida_Ingreso[item].Existe, Array_Valida_Ingreso[item].Verificado, Array_Valida_Ingreso[item].Vigencia);
        }
    }
    return contador_semaforo;
}

//valida los campos de acceso asignado
function ValidaCamposIngreso() {

    var validar = 0;
    var Campo_1 = $("#Select_PAcceso").val();
    var Campo_2 = $("#Select_AreaAcceso").val();
    var Campo_3 = $("#Txt_Persona_Enc").val();
    var Campo_4 = $("#TxtHora").val();
    var Campo_5 = $("#TxtMinutos").val();

    if (Campo_5 == "" || Campo_4 == "" || Campo_3 == "" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "-1") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        if (Campo_3 == "") { $("#Img8").css("display", "inline-table"); } else { $("#Img8").css("display", "none"); }
        if (Campo_4 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_5 == "") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }

    return validar;
}

//valida los campos de busqueda personas
function ValidaSearch_People() {
    var valida = 0;
    var Campo_P = $("#Txt_Nombre").val();

    if (Campo_P != "") {
        if (Campo_P.length < 3) {
            valida = 1;
            Process_Manual_Ingreso = 1;
            Mensaje_General("Minimo de letras", "El minimo de letras debe se de (3) para la busqueda del " + Tipo_Busqueda, "W");
        }
    }
    else {
        valida = 1;
        Process_Manual_Ingreso = 1;
        Mensaje_General("Minimo de letras", "El minimode letras debe se de (3) para la busqueda del " + Tipo_Busqueda, "W");
    }
    return valida;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           FUNCION   COMPLEMENTARIAS                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga combo dependiente de acceso
function CargaComboAreas() {
    $("#Select_PAcceso").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(List_PAcceso_Area, "Select_AreaAcceso", index_ID, "");
    });
}

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

    $("#HA_Ingreso").html(Fecha_actual + " || " + Hours_Live + " : " + Minutes_Live);
    $("#HE_Salida").html(Fecha_actual + " || " + Hora_Estimado + " : " + Minuto_Estimado);

    CreateJSON_IngresoLog();
}

//crea array de ingresos
function CreateJSON_IngresoLog() {

    var Dato_Ingreso = $("#HA_Ingreso").html();
    var Dato_PlanSalida = $("#HE_Salida").html();
    var Dato_PA = $("#Select_PAcceso option:selected").html();
    var Dato_A = $("#Select_AreaAcceso option:selected").html();

    var A_Ingreso = Dato_Ingreso.split("||");
    var A_PlanSalida = Dato_PlanSalida.split("||");
    var A_PA = Dato_PA.split("-");

    var D_Area;
    if (Dato_A == "Todos")
        D_Area = "Todos"
    else {
        var A_A = Dato_A.split("-");
        D_Area = A_A[1];
    }

    var FIng = A_Ingreso[0].trim();
    var HIng = A_Ingreso[1].trim();

    var FPSal = A_PlanSalida[0].trim();
    var HPSal = A_PlanSalida[1].trim();

    var Str_P_Enc = $("#Txt_Persona_Enc").val();
    var SplitP_Enc = Str_P_Enc.split(" - ");
    var T_Doc_P_Enc = SplitP_Enc[0];
    var Doc_P_Enc = SplitP_Enc[1];

    var JSON_IngresoLog = {
        "Index": Cant_Ingreso,
        "Nit_ID": Nit_ID_Proccess,
        "TypeDocument_ID": $("#Select_Documento").val(),
        "Document_ID": $("#TxtDoc").val(),
        "Tarjeta_ID": $("#TxtIDTarjeta").val(),
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
        "Num_UnicoVisita": Cant_Ingreso,
        "Usuario_Ingreso": User.toUpperCase(),
        "FechaIngreso": $("#HA_Ingreso").html().replace("||", ""),
        "Usuario_Salida": "",
        "FechaSalida": "",
        "DescripPuertaAcceso": A_PA[1],
        "DescripAreaAcceso": D_Area,
        "DescripPersona_Enc": $("#Txt_Persona_Enc").val()
    }

    Array_IngresoLog.push(JSON_IngresoLog);
    Cant_Ingreso = Cant_Ingreso + 1;
    Tabla_Ingreso();
}

//crea el grid de ingreso
function Tabla_Ingreso() {
    var html = "<table id='TIng' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='7' style='margin-top: 5px;' >Registro de Ingresos</th></tr><tr><th style='width: 2%;'>Eliminar</th><th>Puerta</th><th>Area</th><th>Persona Encargada</th><th>Tiempo Visita</th><th>Fecha/Hora Ingreso</th><th>Fecha/Hora Estimada Salida</th></tr></thead><tbody>";

    for (item in Array_IngresoLog) {
        html += "<tr id= 'TIng_" + Array_IngresoLog[item].Index + "'><td><input type='radio' name='Asig' id='Check_" + Array_IngresoLog[item].Index + "' value='TR" + Array_IngresoLog[item].Index + "' onclick=\"EliminarIngreso('" + Array_IngresoLog[item].Index + "')\"/></td><td>" + Array_IngresoLog[item].PuertaAcceso_ID + " - " + Array_IngresoLog[item].DescripPuertaAcceso + "</td><td>" + Array_IngresoLog[item].Area_ID + " - " + Array_IngresoLog[item].DescripAreaAcceso + "</td><td>" + Array_IngresoLog[item].DescripPersona_Enc + "</td><td>" + Array_IngresoLog[item].Tiempo_PlanVisita + "</td><td>" + Array_IngresoLog[item].FechaIngreso + "</td><td>" + Array_IngresoLog[item].Fecha_PlanSalida + "  " + Array_IngresoLog[item].Hora_PlanSalida + "</td></tr>";
    }

    html += "</tbody></table>";
    $("#Cointainer_ingreso").html("");
    $("#Cointainer_ingreso").html(html);

    $("#TIng").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
    Clear_Ingreso();
    $("#Control_Ingreso").css("display", "inline-table");

}

//eliminar ingreso de l array
function EliminarIngreso(index) {
    //borramos el Registro deseado
    for (item in Array_IngresoLog) {
        if (Array_IngresoLog[item].Index == index) {
            Array_IngresoLog.splice(item, 1);
        }
    }
    Tabla_Ingreso();
}

//valida si se puede ingresar a la tabla de ingresos
function Mostrar_AccesoPredeterminado(Index_AP) {

    Index_AP = Index_AP - 1;
    var Flag_ingreso;
    var A_FIV = [];
    var A_FFV = [];

    var Index_E = parseInt(Index_AP) + 1;

    var TVigen = List_Acceso_Predeterminado[Index_AP].ControlVigencia;
    A_FIV[0] = [$("#TxtHoraIni_" + Index_E).val(), $("#TxtMinutosIni_" + Index_E).val()];
    A_FFV[0] = [$("#TxtHoraSal_" + Index_E).val(), $("#TxtMinutosSal_" + Index_E).val()];

    if (TVigen == "N")
        Flag_Ingreso = "VERDE";
    else
        Flag_Ingreso = validaEntradaSalida(A_FIV, A_FFV);

    switch (Flag_Ingreso) {
        case "ROJO":
            Process_Manual_Ingreso = 1;
            Mensaje_General("Ha expirado a Vigencia", "El tiempo Esta vencido para el ingreso, puede editar la horas de entrada si lo desea", "W");
            break;

        case "VERDE":
            $("#Txt_Persona_Enc").val(List_Acceso_Predeterminado[Index_AP].TypeDocument_ID_Per_Encargada + " - " + List_Acceso_Predeterminado[Index_AP].Document_ID_Per_Encargada + " - " + List_Acceso_Predeterminado[Index_AP].DescripPersona_Enc);
            Charge_Combos_Depend_Nit(List_Puerta_Acceso, "Select_PAcceso", Nit_ID_Proccess, List_Acceso_Predeterminado[Index_AP].PuertaAcceso_ID);
            transaccionAjax_Door_Access_Area('Lista_Puerta_Acceso_Area');
            setTimeout("Charge_Combos_Depend_Nit(List_PAcceso_Area, 'Select_AreaAcceso', List_Acceso_Predeterminado[" + Index_AP + "].PuertaAcceso_ID, List_Acceso_Predeterminado[" + Index_AP + "].Area_ID);", 400);
            $("#Select_AreaAcceso").prop('disabled', true).trigger("chosen:updated");
            $("#Select_PAcceso").prop('disabled', true).trigger("chosen:updated");
            $("#BtnConsult_encargado").prop('disabled', true);
            $("#Acordeon_Ingreso").accordion("option", "active", 2);
            break;
    }

}



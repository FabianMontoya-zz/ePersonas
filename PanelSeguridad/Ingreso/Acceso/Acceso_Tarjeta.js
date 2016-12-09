/*--------------- region de variables globales --------------------*/
var Array_IngresoLog = [];
var ListIngresoLog = [];

var TDoc_VT;
var Doc_VT;
var FIV;
var FFV;
var Hours_Live;
var Minutes_Live;
var Ingreso_Live;
var Process_Manual_Ingreso = 0;
var Cant_Ingreso = 0;
var existe_tarjeta = 0;

/*--------------- region de variables globales --------------------*/

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//captura tarjeta y muestra 
function Capture_Tarjeta_ID() {
    $("#TxtIDTarjeta").change(function () {
        var StrID = $(this).val();
        if (StrID.length == 10) {
            $("#TxtIDTarjeta").attr("disabled", "disabled");
            validaTarjeta(StrID);
        }
        else {
            $("#TxtIDTarjeta").removeAttr("disabled");
        }
    });
}

//validamos el estado de la tarjeta y datos de la persona asignada a ella
function validaTarjeta(Tarjeta_ID) {
    $("#Btnguardar").attr("value", "Nueva Consulta");
    for (item in Matrix_Persona) {
        console.log(Tarjeta_ID + " == " + Matrix_Persona[item].Tarjeta_ID);
        if (Matrix_Persona[item].Tarjeta_ID == Tarjeta_ID) {

            existe_tarjeta = 1;
            $("#TxtDoc").val(Matrix_Persona[item].Document_ID);
            $("#Select_Documento").val(Matrix_Persona[item].TypeDocument_ID);
            TDoc_VT = Matrix_Persona[item].TypeDocument_ID;
            Doc_VT = Matrix_Persona[item].Document_ID;

            $("#TxtDoc").attr("disabled", "disabled");
            $("#Select_Documento").attr("disabled", "disabled");

            $("#Inf_persona").css("display", "inline-table");
            $("#L_Nombre").html(Matrix_Persona[item].Nombre);
            $("#L_Empresa").html(Matrix_Persona[item].DescripEmpresa);
            $("#L_Area").html(Matrix_Persona[item].DescripArea);
            $("#L_Cargo").html(Matrix_Persona[item].DescripCargo);

            Nit_ID_Proccess = Matrix_Persona[item].Nit_ID;
            GrpDoc = Matrix_Persona[item].GrpDocumentos;

            switch (GrpDoc) {
                case 0:
                    Mensaje_General("Proceso Imcompleto", "La persona no tiene (Grupo de Documentos) asignados, comuniquese con el administrador del sistema!", "E");
                    break;
                default:
                    HabilitaCombosIngreso();

                    VerificacionTarjeta(Matrix_Persona[item].Nombre, Matrix_Persona[item].EstadoTarjeta, Matrix_Persona[item].CheckVigencia_Tarjeta, Matrix_Persona[item].FechaVencimientoTarjeta, Matrix_Persona[item].DescripMotivoBloqueo, "T");
                    SearchFoto(TDoc_VT, Doc_VT);
                    break;
            }
            $('.C_Chosen').trigger('chosen:updated');
            break;
        }
    }

    if (existe_tarjeta == 0)
        Mensaje_General("Tarjeta No registrada", "Esta tarjeta no existe en el sistema ó no esta asignada comuniquese con el administrador del sistema!", "W");

}

//verificamos el estado de la tarjeta
function VerificacionTarjeta(Nombre, Estado, CheckVigencia, FechaVigencia, Bloqueo, TipoIngreso) {

    switch (Estado) {
        case "1":
            Mensaje_General("Tarjeta No funcional!", "La Tarjeta  de " + Nombre + " está sin Entregar en el Sistema comuniquese con su Administrador", "W");
            break;

        case "2":
            VerificaVigenciaTarjeta(Nombre, CheckVigencia, FechaVigencia, TipoIngreso);
            break;

        case "3":
            Mensaje_General("Tarjeta Bloqueada!", "La Tarjeta  de " + Nombre + " está " + Bloqueo, "W");
            break;
    }
}

//verificamos la vigencia de la tarjeta
function VerificaVigenciaTarjeta(Nombre, CheckVigencia, FechaVigencia, TipoIngreso) {

    switch (CheckVigencia) {
        case "S":
            comparacion = validate_fechaMayorQue(FechaVigencia, "", "SystemCompare");
            if (comparacion == "Mayor")
                Mensaje_General("Tarjeta Vencida!", "La Tarjeta  de " + Nombre + " está vencida fecha de vencimiento ( " + FechaVigencia + ")", "W");
            else {
                if (TipoIngreso == "T") {
                    Tabla_Docs(Nit_ID_Proccess, TDoc_VT, Doc_VT, GrpDoc, "Empleado");
                    SearchEmpresa();
                }
                else
                    Mensaje_General("Tiene Tarjeta!", "El Sr(a) " + Nombre + " Tiene tarjeta se nesecita para el ingreso a las instalaciones ", "W");
            }
            break;
        case "N":
            if (TipoIngreso == "T") {
                Tabla_Docs(Nit_ID_Proccess, TDoc_VT, Doc_VT, GrpDoc, "Empleado");
                SearchEmpresa();
            }
            else
                Mensaje_General("Tiene Tarjeta!", "El Sr(a) " + Nombre + " Tiene tarjeta se nesecita para el ingreso a las instalaciones ", "W");
            break;
    }
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
    //  ComparaIngreso();

    setTimeout("MostrarHora()", 1000);
}

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---                                                                   PROCESO DE ACESSO PREDETERMINADOS                                                                                                            ---*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                     PROCESO DE CARGUE GRID ACCESO PREDETERMINADO                                                                                                         ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//contruye vista de accesos predeterminados
function Tabla_AccesosPredeterminados() {

    var html_AP;
    var Flag_ingreso;

    html_AP = "<table id='TAP' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='10' style='margin-top: 5px;' >AccesosPredetermminados</th></tr><tr><th style='width: 2%;'>Selección</th><th></th><th>Acceso</th><th>Area</th><th>Persona Encargada</th><th style='width: 10%;'>Fecha inicial</th><th style='width: 10%;'>Fecha final</th><th style='width: 12%;'>Hora Entrada</th><th style='width: 12%;'>Hora Salida</th><th>Horario de ingreso</th></tr></thead><tbody>";
    for (item in Matrix_AccesoPredeterminados) {
        if (Matrix_AccesoPredeterminados[item].Document_ID == Doc_VT &&
           Matrix_AccesoPredeterminados[item].Nit_ID == Nit_ID_Proccess &&
            Matrix_AccesoPredeterminados[item].Estado == "1") {
            if (Matrix_AccesoPredeterminados[item].ControlVigencia == "N")
                html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='radio' name='Asig' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "' onclick=\"Mostrar_AccesoPredeterminado('" + Matrix_AccesoPredeterminados[item].Index + "')\"/></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
            else {

                FIV = Matrix_AccesoPredeterminados[item].HoraInicio;
                FFV = Matrix_AccesoPredeterminados[item].HoraFin;

                var A_FIV = FIV.split(":");
                var A_FFV = FFV.split(":");

                Flag_Ingreso = validaEntradaSalida(A_FIV, A_FFV);

                switch (Flag_Ingreso) {
                    case "VERDE":
                        html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='radio' name='Asig' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "'  onclick=\"Mostrar_AccesoPredeterminado('" + Matrix_AccesoPredeterminados[item].Index + "')\" /></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td><input type='number' id='TxtHoraIni_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='24' style='width: 30px;' oninput='maxLengthTypeNumber(this)'  value='" + A_FIV[0] + "' /> : <input type='number' id='TxtMinutosIni_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='59' style='width: 30px;' oninput='maxLengthTypeNumber(this)' value='" + A_FIV[1] + "' /></td><td><input type='number' id='TxtHoraSal_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='24' style='width: 30px;' oninput='maxLengthTypeNumber(this)'  value='" + A_FFV[0] + "' /> : <input type='number' id='TxtMinutosSal_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='59' style='width: 30px;' oninput='maxLengthTypeNumber(this)' value='" + A_FFV[1] + "' /></td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                        break;
                    case "ROJO":
                        html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='radio' name='Asig' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "'  onclick=\"Mostrar_AccesoPredeterminado('" + Matrix_AccesoPredeterminados[item].Index + "')\" /></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td><input type='number' id='TxtHoraIni_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='24' style='width: 30px;' oninput='maxLengthTypeNumber(this)'  value='" + A_FIV[0] + "' /> : <input type='number' id='TxtMinutosIni_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='59' style='width: 30px;' oninput='maxLengthTypeNumber(this)' value='" + A_FIV[1] + "'  /></td><td><input type='number' id='TxtHoraSal_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='24' style='width: 30px;' oninput='maxLengthTypeNumber(this)'  value='" + A_FFV[0] + "' /> : <input type='number' id='TxtMinutosSal_" + Matrix_AccesoPredeterminados[item].Index + "' class='Numeric' maxlength='2' min='0' max='59' style='width: 30px;' oninput='maxLengthTypeNumber(this)' value='" + A_FFV[1] + "' /></td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                        break;
                }
            }
        }
    }

    html_AP += "</tbody></table>";
    $("#Container_Acceso").html("");
    $("#Container_Acceso").html(html_AP);

    $("#TAP").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//valida el ingreso y salida
function validaEntradaSalida(A_FIV, A_FFV) {
    var EstadoEnt = "";
    var EstadoSal = "";
    var Estado = "";

    //1 PASO 1 VALIDAD ENTRADA
    if ((parseInt(Hours_Live)) >= parseInt(A_FIV[0])) {// revisamos si la hora actual es mayor o igual a la hora capturada
        EstadoEnt = "VERDE";
        if (parseInt(Hours_Live) == (parseInt(A_FIV[0]))) {// revisamos si la hora es igual a la hora actual
            if ((parseInt(Minutes_Live) >= parseInt(A_FIV[1]))) // revisamos si los minutos son mayor a los minutos actuales
                EstadoEnt = "VERDE";
            else if ((parseInt(A_FIV[1]) > parseInt(Minutes_Live)))
                EstadoEnt = "ROJO";
        }
    }
    else if ((parseInt(Hours_Live)) < parseInt(A_FIV[0]))
        EstadoEnt = "ROJO";

    //2 PASO 1 VALIDA SALIDA
    if ((parseInt(Hours_Live)) >= parseInt(A_FFV[0])) {// revisamos si la hora actual es menor o igual a la hora salida capturada
        EstadoSal = "ROJO";
        if (parseInt(A_FFV[0]) == (parseInt(Hours_Live))) {// revisamos si la hora es igual a la hora actual
            EstadoSal = "VERDE";
            if ((parseInt(A_FFV[1]) >= parseInt(Minutes_Live))) // revisamos si los minutos son mayor a los minutos actuales
                EstadoSal = "ROJO";
            else
                EstadoSal = "VERDE";
        }
    }
    else
        EstadoSal = "VERDE";

    //console.log("EstadoEnt: " + EstadoEnt + "  EstadoSal : " + EstadoSal);

    if (EstadoEnt == "VERDE" && EstadoSal == "VERDE")
        Estado = "VERDE";
    else if (EstadoEnt == "VERDE" && EstadoSal == "ROJO")
        Estado = "ROJO";
    else if (EstadoEnt == "ROJO" && EstadoSal == "VERDE")
        Estado = "ROJO";
    else if (EstadoEnt == "ROJO" && EstadoSal == "ROJO")
        Estado = "ROJO";


    return Estado;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                PROCESO DE CARGUE INGRESO                                                                                                                          ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga combos y habilitadependencias
function HabilitaCombosIngreso() {
    Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", Nit_ID_Proccess, "");
    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", Nit_ID_Proccess, "");
    CargaComboAreas();
}

//carga combo dependiente de pertas de acceso
function CargaComboAreas() {
    $("#Select_PAcceso").change(function () {
        var index_ID = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", index_ID, "");
    });
}

//valida si se puede ingresar a la tabla de ingresos
function Mostrar_AccesoPredeterminado(Index_AP) {

    Index_AP = Index_AP - 1;
    var Flag_ingreso;
    var A_FIV = [];
    var A_FFV = [];

    var Index_E = parseInt(Index_AP) + 1;

    var TVigen = Matrix_AccesoPredeterminados[Index_AP].ControlVigencia;
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
            Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", Nit_ID_Proccess, Matrix_AccesoPredeterminados[Index_AP].PuertaAcceso_ID);
            Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", Nit_ID_Proccess, Matrix_AccesoPredeterminados[Index_AP].Document_ID_Per_Encargada);
            Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", Matrix_AccesoPredeterminados[Index_AP].PuertaAcceso_ID, Matrix_AccesoPredeterminados[Index_AP].Area_ID);
            break;
    }

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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                     VALIDACION EN LINEA ACCESO PREDETERMINADO                                                                                                         ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//comparacion tiempos de vigencia
function ComparaIngreso() {
    switch (Flag_ingreso) {
        case "VERDE":
            CierreIngreso();
            break;

        case "ROJO":
            AbreIngreso();
            break;
    }
}

// validacion por cierre de ingreso (verde) 
function CierreIngreso() {
    for (item in Matrix_AccesoPredeterminados) {
        if (Matrix_AccesoPredeterminados[item].Document_ID == Doc_VT &&
           Matrix_AccesoPredeterminados[item].Nit_ID == Nit_ID_Proccess &&
            Matrix_AccesoPredeterminados[item].Estado == "1") {
            if (Matrix_AccesoPredeterminados[item].ControlVigencia == "S") {

                FIV = Matrix_AccesoPredeterminados[item].HoraInicio;
                FFV = Matrix_AccesoPredeterminados[item].HoraFin;

                var A_FIV = FIV.split(":");
                var A_FFV = FFV.split(":");

                if ((parseInt(A_FIV[0]) >= parseInt(Hours_Live)) || (parseInt(A_FFV[0]) <= parseInt(Hours_Live))) {
                    if ((parseInt(A_FIV[0]) == parseInt(Hours_Live)) || (parseInt(A_FFV[0]) == parseInt(Hours_Live))) {
                        if ((parseInt(A_FIV[1]) > parseInt(Minutes_Live)) || (parseInt(A_FFV[1]) < parseInt(Minutes_Live))) {
                            if (Flag_ingreso == Ingreso_Live) {
                                Tabla_AccesosPredeterminados();
                                Ingreso_Live = "ROJO";
                            }
                        }
                        else
                            Ingreso_Live = "VERDE";
                    }
                    else
                        Ingreso_Live = "ROJO";
                }
                else
                    Ingreso_Live = "VERDE";
            }
        }
    }
}

// validacion por apertura de ingreso (ROJO) 
function AbreIngreso() {
    for (item in Matrix_AccesoPredeterminados) {
        if (Matrix_AccesoPredeterminados[item].Document_ID == Doc_VT &&
           Matrix_AccesoPredeterminados[item].Nit_ID == Nit_ID_Proccess &&
            Matrix_AccesoPredeterminados[item].Estado == "1") {
            if (Matrix_AccesoPredeterminados[item].ControlVigencia == "S") {

                FIV = Matrix_AccesoPredeterminados[item].HoraInicio;
                FFV = Matrix_AccesoPredeterminados[item].HoraFin;

                var A_FIV = FIV.split(":");
                var A_FFV = FFV.split(":");

                if ((parseInt(A_FIV[0]) >= parseInt(Hours_Live)) || (parseInt(A_FFV[0]) <= parseInt(Hours_Live))) {
                    if ((parseInt(A_FIV[0]) == parseInt(Hours_Live)) || (parseInt(A_FFV[0]) == parseInt(Hours_Live))) {
                        if ((parseInt(A_FIV[1]) > parseInt(Minutes_Live)) || (parseInt(A_FFV[1]) < parseInt(Minutes_Live)))
                            Ingreso_Live = "ROJO";
                        else {
                            if (Flag_ingreso == Ingreso_Live) {
                                Tabla_AccesosPredeterminados();
                                Ingreso_Live = "VERDE";
                            }
                        }
                    }
                    else
                        Ingreso_Live = "ROJO";
                }
                else
                    Ingreso_Live = "VERDE";
            }
        }
    }
}

//valida los campos de acceso asignado
function ValidaCamposIngreso() {

    var validar = 0;
    var Campo_1 = $("#Select_PAcceso").val();
    var Campo_2 = $("#Select_AreaAcceso").val();
    var Campo_3 = $("#Select_Persona_Enc").val();
    var Campo_4 = $("#TxtHora").val();
    var Campo_5 = $("#TxtMinutos").val();

    if (Campo_5 == "" || Campo_4 == "" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "-1") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
        if (Campo_3 == "-1") { $("#Img8").css("display", "inline-table"); } else { $("#Img8").css("display", "none"); }
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

    var JSON_IngresoLog = {
        "Index": Cant_Ingreso,
        "Nit_ID": Nit_ID_Proccess,
        "TypeDocument_ID": $("#Select_Documento").val(),
        "Document_ID": $("#TxtDoc").val(),
        "Tarjeta_ID": $("#Tarjeta_ID").val(),
        "Nit_ID_EmpVisita": Nit_ID_Proccess,
        "PuertaAcceso_ID": $("#Select_PAcceso").val(),
        "Area_ID": $("#Select_AreaAcceso").val(),
        "TypeDocument_ID_Per_Encargada": $("#Select_Documento").val(),
        "Document_ID_Per_Encargada": $("#Select_Persona_Enc").val(),
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
        "DescripPersona_Enc": $("#Select_Persona_Enc option:selected").html()
    }

    Array_IngresoLog.push(JSON_IngresoLog);
    Cant_Ingreso = Cant_Ingreso + 1;
    Tabla_Ingreso();
}

//crea el grid de ingreso
function Tabla_Ingreso() {
    var html = "<table id='TIng' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='7' style='margin-top: 5px;' >Registro de Ingresos</th></tr><tr><th style='width: 2%;'>Eliminar</th><th>Puerta</th><th>Area</th><th>Persona Encargada</th><th>Tiempo Visita</th><th>Fecha/Hora Ingreso</th><th>Fecha/Hora Estimada Salida</th></tr></thead><tbody>";

    for (item in Array_IngresoLog) {
        html += "<tr id= 'TIng_" + Array_IngresoLog[item].Index + "'><td><input type='radio' name='Asig' id='Check_" + Array_IngresoLog[item].Index + "' value='TR" + Array_IngresoLog[item].Index + "' onclick=\"EliminarIngreso('" + Array_IngresoLog[item].Index + "')\"/></td><td>" + Array_IngresoLog[item].PuertaAcceso_ID + " - " + Array_IngresoLog[item].DescripPuertaAcceso + "</td><td>" + Array_IngresoLog[item].Area_ID + " - " + Array_IngresoLog[item].DescripAreaAcceso + "</td><td>" + Array_IngresoLog[item].Document_ID_Per_Encargada + " - " + Array_IngresoLog[item].DescripPersona_Enc + "</td><td>" + Array_IngresoLog[item].Tiempo_PlanVisita + "</td><td>" + Array_IngresoLog[item].FechaIngreso + "</td><td>" + Array_IngresoLog[item].Fecha_PlanSalida + "  " + Array_IngresoLog[item].Hora_PlanSalida + "</td></tr>";
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

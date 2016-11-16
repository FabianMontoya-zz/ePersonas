/*--------------- region de variables globales --------------------*/
var TDoc_VT;
var Doc_VT;
var FIV;
var FFV;
var Hours_Live;
var Minutes_Live;
var Flag_ingreso;
var Ingreso_Live;
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
        if (Matrix_Persona[item].Tarjeta_ID == Tarjeta_ID) {

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

            HabilitaCombosIngreso();

            VerificacionTarjeta(Matrix_Persona[item].Nombre, Matrix_Persona[item].EstadoTarjeta, Matrix_Persona[item].CheckVigencia_Tarjeta, Matrix_Persona[item].FechaVencimientoTarjeta, Matrix_Persona[item].DescripMotivoBloqueo, "T");
            SearchFoto(TDoc_VT, Doc_VT);

            $('.C_Chosen').trigger('chosen:updated');
            break;
        }
    }
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

    html_AP = "<table id='TAP' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Selección</th><th></th><th>Acceso</th><th>Area</th><th>Persona Encargada</th><th>Fecha inicial</th><th>Fecha final</th><th>Hora Entrada</th><th>Hora Salida</th><th>Horario de ingreso</th></tr></thead><tbody>";
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

                if ((parseInt(A_FIV[0]) >= parseInt(Hours_Live)) || (parseInt(A_FFV[0]) <= parseInt(Hours_Live))) {
                    if ((parseInt(A_FIV[0]) == parseInt(Hours_Live)) || (parseInt(A_FFV[0]) == parseInt(Hours_Live))) {
                        if ((parseInt(A_FIV[1]) > parseInt(Minutes_Live)) || (parseInt(A_FFV[1]) < parseInt(Minutes_Live))) {
                            html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                            Flag_ingreso = "ROJO";
                        }
                        else {
                            html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='radio' name='Asig' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "'  onclick=\"Mostrar_AccesoPredeterminado('" + Matrix_AccesoPredeterminados[item].Index + "')\" /></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                            Flag_ingreso = "VERDE";
                        }
                    }
                    else {
                        html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                        Flag_ingreso = "ROJO";
                    }
                }
                else {
                    html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='radio' name='Asig' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "' onclick=\"Mostrar_AccesoPredeterminado('" + Matrix_AccesoPredeterminados[item].Index + "')\"/></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
                    Flag_ingreso = "VERDE";
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

function Mostrar_AccesoPredeterminado(Index_AP) {
    Index_AP = Index_AP - 1;
    Charge_Combos_Depend_Nit(Matrix_PAcceso, "Select_PAcceso", Nit_ID_Proccess, Matrix_AccesoPredeterminados[Index_AP].PuertaAcceso_ID);
    Charge_Combos_Depend_Nit(Matrix_Persona, "Select_Persona_Enc", Nit_ID_Proccess, Matrix_AccesoPredeterminados[Index_AP].Document_ID_Per_Encargada);
    Charge_Combos_Depend_Nit(Matrix_PAcceso_Area, "Select_AreaAcceso", Matrix_AccesoPredeterminados[Index_AP].PuertaAcceso_ID, Matrix_AccesoPredeterminados[Index_AP].Area_ID);
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
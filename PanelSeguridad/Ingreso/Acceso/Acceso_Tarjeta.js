var TDoc_VT;
var Doc_VT;

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

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---                                                                   PROCESO DE ACESSO PREDETERMINADOS                                                                                                            ---*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//contruye vista de accesos predeterminados
function Tabla_AccesosPredeterminados() {

    var html_AP;

    html_AP = "<table id='TAP' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Selección</th><th></th><th>Acceso</th><th>Area</th><th>Persona Encargada</th><th>Fecha inicial</th><th>Fecha final</th><th>Hora Entrada</th><th>Hora Salida</th><th>Horario de ingreso</th></tr></thead><tbody>";
    for (item in Matrix_AccesoPredeterminados) {
        if (Matrix_AccesoPredeterminados[item].Document_ID == Doc_VT &&
           Matrix_AccesoPredeterminados[item].Nit_ID == Nit_ID_Proccess &&
            Matrix_AccesoPredeterminados[item].Estado == "1") {
            if (Matrix_AccesoPredeterminados[item].ControlVigencia == "N") 
                html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td><input type='checkbox' id='Check_" + Matrix_AccesoPredeterminados[item].Index + "' value='TR" + Matrix_AccesoPredeterminados[item].Index + "' /></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
            else
                html_AP += "<tr id= 'TAP_" + Matrix_AccesoPredeterminados[item].Nit_ID + "'><td></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td>" + Matrix_AccesoPredeterminados[item].PuertaAcceso_ID + " - " + Matrix_AccesoPredeterminados[item].DescripPuertaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Area_ID + " - " + Matrix_AccesoPredeterminados[item].DescripAreaAcceso + "</td><td>" + Matrix_AccesoPredeterminados[item].Document_ID_Per_Encargada + " - " + Matrix_AccesoPredeterminados[item].DescripPersona_Enc + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaInicio_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].FechaFin_Vigencia + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraInicio + "</td><td>" + Matrix_AccesoPredeterminados[item].HoraFin + "</td><td>" + Matrix_AccesoPredeterminados[item].DescripTipoIngreso + "</td></tr>";
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
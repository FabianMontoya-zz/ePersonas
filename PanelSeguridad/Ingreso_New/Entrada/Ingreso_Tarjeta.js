/*--------------- region de variables globales --------------------*/
var Tarjeta_Proccess = 0;
var Process_Manual_Ingreso = 0;
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
                //Tabla_Docs(Nit_ID_Proccess, TDoc_VT, Doc_VT, GrpDoc, "Empleado");
                //SearchEmpresa();
            }
            break;
        case "N":
            valida_GrpDoc();
            //   Tabla_Docs(Nit_ID_Proccess, TDoc_VT, Doc_VT, GrpDoc, "Empleado");
            //SearchEmpresa();
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

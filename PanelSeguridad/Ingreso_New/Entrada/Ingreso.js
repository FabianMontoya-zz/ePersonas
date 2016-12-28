/*--------------- region de variables globales --------------------*/
var Array_People = [];
var Array_Foto = [];
var Array_InfDoc_Persona = [];
var Array_InfDoc_Empresa = [];
var Array_Doc_Persona = [];
var Array_Doc_Empresa = [];
var Array_Valida_Ingreso = [];
var Tabla_Persona = 0;
var Tabla_Empresa = 0;
var GrpDoc_Persona;
var Nit_ID_Proccess;

/*--------------- region de variables globales --------------------*/



var Matrix_Persona = [];

var Matrix_AccesoPredeterminados = [];
var Matrix_PAcceso = [];
var Matrix_Area = [];
var Matrix_PAcceso_Area = [];
var Matrix_Datos_Empresa = [];
var Matrix_Empleados = [];

var ArrayAcceso = [];
var ArrayCombo = [];
var ArrayAccesoDep = [];
var ArraySeguridad = [];
var ArrayTdoc = [];

var Fecha_Vencimiento;
var RutaDocumento;
var Imagen_Vencimiento;
var EstadoVerif;
var Est_Verifica;
var Est_Vigencia;
var Mensaje_Semaforo = "";
var User_Porteria;

var editNit_ID;
var index_ID;
var editID;
var editDocID;

/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    Load_Charge_Sasif();
    transacionAjax_Documento('Documento');
    //User_Porteria = ConsultaParametrosURL();

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Control_Ingreso").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#Sucess").css("display", "none");
    $("#Fail").css("display", "none");

    $("#Inf_persona").css("display", "none");
    $("#Inf_Ingreso").css("display", "none");

    $("#Div_D").css("display", "none");
    $("#TI_1").css("display", "none");
    $("#TI_2").css("display", "none");
    $("#TI_3").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif_Web",
        modal: true
    });

    $("#Dialog_Visor").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 520,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Extencion").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 400,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    //MostrarHora();
    Capture_Tarjeta_ID();
    $("#TxtIDTarjeta").focus();


    $(function () { //Función del acordeon
        $("#Acordeon_Ingreso").accordion({
            heightStyle: "content",
            collapsible: true
        });
    });


});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consuta si la persona esta en el sistema
function BtnConsulta() {
    switch ($("#Btnguardar").val()) {

        case "Consultar":
            var validate = Campos();

            if (validate == 0) {
                $("#Btnguardar").attr("value", "Nueva Consulta");
                OpenControl();
                transacionAjax_ShearchPeopleAccess("Search_People_Access", $("#Select_Documento").val(), $("#TxtDoc").val(), 0, "");
            }
            break;

        case "Nueva Consulta":
            Clear();
            break;
    }
}



//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    if (Process_Manual_Ingreso == 0)
        Clear();
    else
        Process_Manual_Ingreso = 0;
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + User + "&L_L=" + Link;
}

//ingreso de acceso
function BtnAgregarAcceso() {

    var validate = ValidaCamposIngreso();

    if (validate == 0) {
        CalculaHoraEstimada();
    }

}

//confirmacion de registro
function Registrar_Ingreso_Log() {
    $("#dialog_eliminar").dialog("open");
    $("#Mensaje_confirma").html("¿Esta seguro?, de la configuración de ingreso de la persona " + $("#L_Nombre").html());
}

//ingreso de registro
function BtnConfirmaIngreso() {
    transacionAjax_LogAcceso_create("Save_Log_Ingreso");
}

function VerExtenciones() {
    $("#Dialog_Extencion").dialog("open");
    Table_Extenciones();
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

    for (item in Matrix_Valida_Ingreso) {
        contador_semaforo = contador_semaforo + parseInt(Matrix_Valida_Ingreso[item].Estado_Doc);
        if (Matrix_Valida_Ingreso[item].Estado_Doc >= 1) {
            ConstruyeMensaje(Matrix_Valida_Ingreso[item].Document, Matrix_Valida_Ingreso[item].Existe, Matrix_Valida_Ingreso[item].Verificado, Matrix_Valida_Ingreso[item].Vigencia);
        }
    }
    return contador_semaforo;
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID PAGINA DE ACCESO                                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                  DATOS INICIALES DE LA PERSONA A INGRESAR                                                                               ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//muestra los datos iniciales de la persona a ingresar
function Datos_principales() {

    Nit_ID_Proccess = Array_People[0].Nit_ID;
    GrpDoc_Persona = Array_People[0].GrpDocumentos;
    $("#L_Nombre").html(Array_People[0].Nombre);
    $("#L_Empresa").html(Array_People[0].DescripEmpresa);
    $("#L_Area").html(Array_People[0].DescripArea);
    $("#L_Cargo").html(Array_People[0].DescripCargo);

    $("#Inf_persona").css("display", "inline-table");
    $("#TI_1").css("display", "inline-table");

}

//buscar Foto de la persona
function SearchFoto() {
    var StrSrc = "";
    if (Array_Foto.length != 0)
        StrSrc = Array_Foto[0].RutaRelativaDocumento + Array_Foto[0].Nombre_Save + '.' + Array_Foto[0].DescripFormato;
    else
        StrSrc = "../../images/avatar.png";

    $("#Imgfoto").attr("src", StrSrc);
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                  TABLA DE DOCUMENTOS PERSONA EMPRESA                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// crea la tabla en el cliente
function Grid_Doc_People_Business(Matrix, Val_GrpDoc, Type) {
    var html_DP;

    switch (Type) {
        case "Empleado":
            html_DP = "<table id='TDP' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='6'>Documentación Empleado</th></tr><tr><th>Documento</th><th>Existe</th><th>Verificado</th><th>Vigencia</th><th>Fecha Vencimiento</th><th>Ver</th></tr></thead><tbody>";
            var JsonVerifDoc;
            var TotalEstado = 0;

            for (itemArray in Matrix) {
                Fecha_Vencimiento = "";
                if (Matrix[itemArray].GrpDocumentos_ID == Val_GrpDoc) {
                    var Existe_Doc = Verifica_Doc(Array_Doc_Persona, Matrix[itemArray].Nit_ID, Matrix[itemArray].Document_ID, Matrix[itemArray].Documento_ID);

                    switch (Existe_Doc) {
                        case "NO":
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 1, "Verificado": 1, "Vigencia": 1, "Estado_Doc": 1 };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>No existe " + Matrix[itemArray].Descripcion + "!</span></span></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "EXISTE":
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": 1, "Vigencia": 1, "Estado_Doc": 1 };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "PEND":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_YELLOW.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "VERIF":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip_Form'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "RECHA":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        default:
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;
                    }
                    Array_Valida_Ingreso.push(JsonVerifDoc);
                }
            }
            html_DP += "</tbody></table>";
            $("#container_T_DP").html("");
            $("#container_T_DP").html(html_DP);

            $("#TDP").dataTable({
                "bJQueryUI": true, "iDisplayLength": 1000,
                "bDestroy": true
            });
            break;

        case "Empresa":
            html_DP = "<table id='TDE' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th class='T_head' colspan='6'>Documentación Empresa</th></tr><tr><th>Documento</th><th>Existe</th><th>Verificado</th><th>Vigencia</th><th>Fecha Vencimiento</th><th>Ver</th></tr></thead><tbody>";
            var JsonVerifDoc;

            for (itemArray in Matrix) {
                if (Matrix[itemArray].GrpDocumentos_ID == Val_GrpDoc) {

                    var Existe_Doc = Verifica_Doc(Array_Doc_Empresa,Matrix[itemArray].Nit_ID, Matrix[itemArray].Document_ID, Matrix[itemArray].Documento_ID);

                    switch (Existe_Doc) {
                        case "NO":
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 1, "Verificado": 1, "Vigencia": 1, "Estado_Doc": 1 };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>No existe " + Matrix[itemArray].Descripcion + "!</span></span></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "EXISTE":
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": 1, "Vigencia": 1, "Estado_Doc": 1 };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;

                        case "PEND":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_YELLOW.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "VERIF":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip_Form'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        case "RECHA":
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_GREEN.png' /></td><td><span class='cssToolTip'><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /><span>" + EstadoVerif + "</span></span></td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/" + Imagen_Vencimiento + "' /></td><td>" + Fecha_Vencimiento + "</td><td><span class='cssToolTip_Form_L'><img alt='' title='' style=' height: 21px; width: 21px;' src='../../images/LOOK_BLACK.png' onclick=\"VerDocumento('" + RutaDocumento + "','" + $("#L_Nombre").html() + "');\" /><span>Ver Documento</span></span></td></tr>";
                            break;

                        default:
                            TotalEstado = parseInt(Est_Verifica) + parseInt(Est_Vigencia);
                            JsonVerifDoc = { "Doc_P": Matrix[itemArray].Document_ID, "Document": Matrix[itemArray].Descripcion, "Existe": 0, "Verificado": Est_Verifica, "Vigencia": Est_Vigencia, "Estado_Doc": TotalEstado };
                            html_DP += "<tr id= 'TDP_" + Matrix[itemArray].Nit_ID + "'><td>" + Matrix[itemArray].Descripcion + "</td><td><img alt='No' title='' style='height: 21px; width: 21px;' src='../../images/C_RED.png' /></td><td></td><td></td><td></td><td></td></tr>";
                            break;
                    }
                    Array_Valida_Ingreso.push(JsonVerifDoc);
                }
            }
            html_DP += "</tbody></table>";
            $("#container_T_DE").html("");
            $("#container_T_DE").html(html_DP);

            $("#TDE").dataTable({
                "bJQueryUI": true, "iDisplayLength": 1000,
                "bDestroy": true
            });
            break;
    }
}

//verificar documento
function Verifica_Doc(Matrix, Nit, PDoc, Doc_ID) {
    var estado = "NO";
    for (item in Matrix) {
        if (Matrix[item].Nit_ID == Nit &&
            Matrix[item].Document_ID == PDoc &&
            Matrix[item].Documento_ID == Doc_ID) {
            var verifico = Matrix[item].Verificado;
            Fecha_Vencimiento = Matrix[item].Fecha_Vencimiento;
            RutaDocumento = Matrix[item].RutaRelativaDocumento + Matrix[item].Nombre_Save + "." + Matrix[item].DescripFormato;
            var comparacion;

            if (Fecha_Vencimiento != "") {
                comparacion = validate_fechaMayorQue(Fecha_Vencimiento, "", "SystemCompare");
                if (comparacion == "Mayor") {
                    Imagen_Vencimiento = "C_RED.png";
                    Est_Vigencia = 1;
                }
                else {
                    Imagen_Vencimiento = "C_GREEN.png";
                    Est_Vigencia = 0;
                }
            }
            else {
                Imagen_Vencimiento = "C_GREEN.png";
                Est_Vigencia = 0;
            }

            switch (verifico) {
                case "1":
                    Est_Verifica = 1;
                    estado = "PEND";
                    EstadoVerif = "Pendiente por Verificar";
                    break;

                case "2":
                    Est_Verifica = 0;
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;

                case "3":
                    Est_Verifica = 3;
                    estado = "RECHA";
                    EstadoVerif = "Rechazado";
                    break;

                case "0":
                    Est_Verifica = 0;
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;

                case "":
                    Est_Verifica = 0;
                    estado = "VERIF";
                    EstadoVerif = "verificado";
                    break;

                default:
                    Est_Verifica = 1;
                    estado = "EXISTE";
                    break;
            }
        }
    }

    return estado;
}

//dibuja las tablas documentos Persona - Empresa
function Paint_Grid_Docs() {
    if (Tabla_Persona == 1 && Tabla_Empresa == 1) {
        Grid_Doc_People_Business(Array_InfDoc_Persona, GrpDoc_Persona, 'Empleado');
        Grid_Doc_People_Business(Array_InfDoc_Empresa, Array_InfDoc_Empresa[0].GrpDocumentos_ID, "Empresa");
    }
}





//buscar persona en la matrix
function SearchPersona() {
    $("#Btnguardar").attr("value", "Nueva Consulta");
    var TDoc = $("#Select_Documento").val();
    var Doc = $("#TxtDoc").val();
    var Exist = 0;

    for (item in Matrix_Persona) {
        if (TDoc == Matrix_Persona[item].TypeDocument_ID &&
             Doc == Matrix_Persona[item].Document_ID) {

            Exist = 1;

            Nit_ID_Proccess = Matrix_Persona[item].Nit_ID;
            GrpDoc = Matrix_Persona[item].GrpDocumentos;
            $("#L_Nombre").html(Matrix_Persona[item].Nombre);
            $("#L_Empresa").html(Matrix_Persona[item].DescripEmpresa);
            $("#L_Area").html(Matrix_Persona[item].DescripArea);
            $("#L_Cargo").html(Matrix_Persona[item].DescripCargo);


            switch (GrpDoc) {
                case 0:
                    Mensaje_General("Proceso Imcompleto", "La persona no tiene (Grupo de Documentos) asignados, comuniquese con el administrador del sistema!", "E");
                    break;
                default:
                    HabilitaCombosIngreso();

                    TDoc_VT = TDoc;
                    Doc_VT = Doc;

                    VerificacionTarjeta(Matrix_Persona[item].Nombre, Matrix_Persona[item].EstadoTarjeta, Matrix_Persona[item].CheckVigencia_Tarjeta, Matrix_Persona[item].FechaVencimientoTarjeta, Matrix_Persona[item].DescripMotivoBloqueo, "D");
                         break;
            }
            break;
        }
    }
    return Exist;
}

//buscar datos de la empresa del empleado
function SearchEmpresa() {
    var TDoc;
    var GrpDoc;
    var L_Nit = Nit_ID_Proccess.length;
    var Nit_Emp = Nit_ID_Proccess.substring(0, parseInt(L_Nit) - 1);

    for (item in Matrix_Persona) {
        if (Nit_ID_Proccess == Matrix_Persona[item].Nit_ID &&
             Nit_Emp == Matrix_Persona[item].Document_ID) {

            GrpDoc = Matrix_Persona[item].GrpDocumentos;
            TDoc = Matrix_Persona[item].TypeDocument_ID;

            switch (GrpDoc) {
                case 0:
                    Mensaje_General("Proceso Imcompleto", "La Empresa de la persona no tiene (Grupo de Documentos) asignados, comuniquese con el administrador del sistema!", "E");
                    break;
                default:
                    Tabla_Docs(Nit_ID_Proccess, TDoc, Nit_Emp, GrpDoc, "Empresa");
                    break;
            }
            break;
        }
    }

    var Semaforo_P = ValidaAccesoPrincipal();
    switch (Semaforo_P) {
        case 0:
            $("#Sucess").css("display", "inline-table");
            $("#Fail").css("display", "none");
            $("#Inf_Ingreso").css("display", "inline-table");
            Tabla_AccesosPredeterminados();
            break;
        default:
            $("#Sucess").css("display", "none");
            $("#Fail").css("display", "inline-table");
            break;
    }

}




/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//ver documento en pantalla
function VerDocumento(RutaDocumento, Documento) {

    $("#IF_Visor").attr("width", "100%");
    $("#IF_Visor").attr("height", "100%");
    $("#IF_Visor").attr("src", RutaDocumento);

    $("#Dialog_Visor").dialog("open");
    $("#Dialog_Visor").dialog("option", "title", Documento);
}

//construye el mensaje
function ConstruyeMensaje(Doc, Existe, Verificado, Vigencia) {

    if (Mensaje_Semaforo != "")
        Mensaje_Semaforo = Mensaje_Semaforo + ",\n ";
    else
        Mensaje_Semaforo = "Documentos no cumplen los requisitos:\n ";

    if (Existe == 1)
        Mensaje_Semaforo = Mensaje_Semaforo + Doc + " No existe en el sistema!";
    else {

        switch (Verificado) {
            case 1:
                Mensaje_Semaforo = Mensaje_Semaforo + Doc + " Pendiente por Verificar  ";
                break;
            case 3:
                Mensaje_Semaforo = Mensaje_Semaforo + Doc + " Rechazado en la verificación  ";
                break;
        }

        if (Vigencia == 1) {
            Mensaje_Semaforo = Mensaje_Semaforo + Doc + "  Esta vencido!";
        }
    }
    $("#Spam_Mensaje").html(Mensaje_Semaforo);
}

//limpiar pagina para nueva consulta
function Clear() {
    $("#Select_Documento").val("-1");
    $("#TxtIDTarjeta").val("");
    $("#TxtDoc").val("");

    $("#TxtIDTarjeta").removeAttr("disabled");
    $("#Select_Documento").removeAttr("disabled");
    $("#TxtDoc").removeAttr("disabled");

    $("#Inf_persona").css("display", "None");
    $("#Inf_Ingreso").css("display", "none");
    $("#Control_Ingreso").css("display", "none");
    $("#L_Nombre").html("");
    $("#L_Empresa").html("");
    $("#L_Area").html("");
    $("#L_Cargo").html("");

    $("#container_T_DP").html("");
    $("#container_T_DE").html("");
    $("#Container_Acceso").html("");

    $("#Sucess").css("display", "none");
    $("#Fail").css("display", "none");

    $("#Btnguardar").attr("value", "Consultar");
    $('.C_Chosen').trigger('chosen:updated');
    $("#TxtIDTarjeta").focus();

}

//limpiar pagina para nueva consulta
function Clear_Ingreso() {
    $("#Select_PAcceso").val("-1");
    $("#Select_AreaAcceso").val("-1");
    $("#Select_Persona_Enc").val("-1");

    $("#TxtHora").val("");
    $("#TxtMinutos").val("");
    $("#HA_Ingreso").html("");
    $("#HE_Salida").html("");

    $('.C_Chosen').trigger('chosen:updated');
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              GRID EXTENCIONES                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// crea la tabla en el cliente
function Table_Extenciones() {

    var html;
    var StrTelefono_1 = "";
    var StrTelefono_2 = "";
    var StrTelefono_3 = "";
    var StrTelefono_4 = "";

    html = "<table id='TGridExtencion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th style='width: 25%'>Nombre</th><th style='width: 15%'>Telefono 1</th><th style='width: 15%'>Telefono 2</th><th style='width: 15%'>Telefono 3</th><th style='width: 15%'>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
    for (itemArray in Matrix_Empleados) {
        if (Matrix_Empleados[itemArray].Nit_ID != 0) {
            if (Matrix_Empleados[itemArray].Tipo_1 != "F") {
                StrTelefono_1 = "DesActualizado";
                StrTelefono_2 = "DesActualizado";
                StrTelefono_3 = "DesActualizado";
                StrTelefono_4 = "DesActualizado";
            }
            else {
                StrTelefono_1 = Convert_Valores_0(Matrix_Empleados[itemArray].Telefono_1);
                StrTelefono_2 = Convert_Valores_0(Matrix_Empleados[itemArray].Telefono_2);
                StrTelefono_3 = Convert_Valores_0(Matrix_Empleados[itemArray].Telefono_3);
                StrTelefono_4 = Convert_Valores_0(Matrix_Empleados[itemArray].Telefono_4);
            }
            html += "<tr id= 'TExtencion_" + Matrix_Empleados[itemArray].Nit_ID + "'><td>" + Matrix_Empleados[itemArray].Nombre + "</td><td>" + StrTelefono_1 + "</td><td>" + StrTelefono_2 + "</td><td>" + StrTelefono_3 + "</td><td>" + StrTelefono_4 + "</td><td>" + Matrix_Empleados[itemArray].Correo_1 + "</td><td>" + Matrix_Empleados[itemArray].Correo_2 + "</td></tr>";
        }
    }

    html += "</tbody></table>";
    $("#container_TGrid_New").html("");
    $("#container_TGrid_New").html(html);


    $("#TGridExtencion").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}



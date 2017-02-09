var ArrayDocument = [];
var ListDocument = [];

var ArrayFoto = [];

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        GRID PRINCIPAL DE DOCUMENTOS                                */
/*---------------------------------------------------------------------------------------------------------------*/

//el llamado para insertar modificar o eliminar la direcciones
function Documentos(Option_Document) {
    $("#Dialog_Documentos").dialog("open");
    $("#Dialog_Documentos").dialog("option", "title", "Documentos de: " + Nombre_Persona);
    CargaFrame();

    if (OpcWordComplementos == 'V')
        $("#BtnSave_Document").css("display", "none");
    else
        $("#BtnSave_Document").css("display", "inline-table");

    switch (Option_Document) {
        case "V":
            $("#Txt_Nit_Doc").val(D_Nit);
            $("#Txt_TypeIden_Doc").val(D_String_TDocumento);
            $("#Txt_Ident_Doc").val(D_Documento);
            $("#Txt_Nit_Doc_2").val(D_Nit);
            $("#Txt_TypeIden_Doc_2").val(D_String_TDocumento);
            $("#Txt_Ident_Doc_2").val(D_Documento);

            transaccionAjax_MDocWork('MATIRXDOC_WORK', D_Nit, D_TDocumento, D_Documento, "Doc");
            transacionAjax_allDocument('R_ead_Document', D_Nit, D_TDocumento, D_Documento, Option_Document);

            break;

        case "U":

            var Nit_Work;

            if ($("#Select_EmpresaNit").val() == "-1")
                Nit_Work = NitAlter;
            else
                Nit_Work = $("#Select_EmpresaNit").val();

            $("#Txt_Nit_Doc").val(Nit_Work);
            $("#Txt_TypeIden_Doc").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_Doc").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());
            $("#Txt_Nit_Doc_2").val(Nit_Work);
            $("#Txt_TypeIden_Doc_2").val($("#Select_Documento option:selected").text());
            $("#Txt_Ident_Doc_2").val($("#Txt_Ident").val() + "-" + $("#TxtVerif").val());

            transaccionAjax_MDocWork('MATIRXDOC_WORK', $("#Select_EmpresaNit").val(), $("#Select_Documento").val(), $("#Txt_Ident").val(), "Doc");
            transacionAjax_allDocument('R_ead_Document', $("#Select_EmpresaNit").val(), $("#Select_Documento").val(), $("#Txt_Ident").val(), Option_Document);
            break;
    }
}

//llena los titulos del visor
function CargaFrame() {
    $("#Vis_MultiEmpresa").val($("#Select_EmpresaNit option:selected").html());
    $("#Vis_Persona").val($("#Txt_Ident").val() + " - " + $("#TxtVerif").val() + " - " + Nombre_Persona);
    $("#Vis_MultiEmpresa_2").val($("#Select_EmpresaNit option:selected").html());
    $("#Vis_Persona_2").val($("#Txt_Ident").val() + " - " + $("#TxtVerif").val() + " - " + Nombre_Persona);
}


//grid Documentos cliente
function Tabla_General_Document(Opc_Link) {
    var html = "";
    var contador = 0;

    switch (Opc_Link) {
        case "V":
            html = "<table id='TDocument' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Documento</th><th>Formato</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Modificación</th></tr></thead><tbody>";
            break;

        case "U":
            html = "<table id='TDocument' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones <span class='cssToolTip_ver'><img alt='Document' class='AddDocument' onclick=\"AddDocument()\" id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Nuevo Documento</span></span></th><th>Documento</th><th>Formato</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Modificación</th></tr></thead><tbody>";
            break;
    }

    for (itemArray in Matrix_DocWork) {
        if (Matrix_DocWork[itemArray].Nit_ID == $("#Select_EmpresaNit").val() &&
             Matrix_DocWork[itemArray].TypeDocument_ID == $("#Select_Documento").val() &&
             Matrix_DocWork[itemArray].Document_ID == $("#Txt_Ident").val()) {

            var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;

            switch (Opc_Link) {
                case "V":
                    if (estado == "eliminar") {
                        if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                            html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                        else
                            html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    }
                    else {
                        if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                            html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                        else
                            html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    }
                    break;

                case "U":
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','PRIMARIO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    break;
            }

        }
        contador += 1;
    }

    html += "</tbody></table>";
    $("#container_Document").html("");
    $("#container_Document").html(html);

    $(".AddDocument").click(function () {
    });

    $("#TDocument").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//ver documento en pantalla
function VerDocumento(RutaDocumento, Documento) {

    $("#IF_Visor").attr("width", "100%");
    $("#IF_Visor").attr("height", "100%");
    $("#IF_Visor").attr("src", RutaDocumento);

    $("#Dialog_Visor").dialog("open");
    $("#Dialog_Visor").dialog("option", "title", Documento + " de: " + Nombre_Persona);
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                      CASOS DE LLAMADO SEGUN LA OPERACION DE DOCUMENTOS                             */
/*---------------------------------------------------------------------------------------------------------------*/
//llamado del boton agregar o eliminar Entidad Financiera
function InsertAddDocument() {

    var validate;
    validate = ValidaDocumentos();

    if (validate == 0) {
        switch ($("#BtnAddDocument").val()) {

            case "Agregar":
                var validateRepetido = Repetido();
                if (validateRepetido == 0) {
                    Add_Array_Document();
                }
                else {
                    $("#dialog").dialog("option", "title", "Atención!");
                    $("#Mensaje_alert").text("la Entidad ya fue agregada!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                }

                break;

            case "Eliminar":
                $("#Dialog_Delete_Document").dialog("open");
                break;

            case "Salir":
                ReadView_Document();
                break;
        }
    }
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Document(Select_control, Secuencia, Ruta, Nombre, Nit, type) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {

        case "V": //visualizar
            VerDocumento(Ruta, Nombre)
            break;

        case "R": //eliminar
            ReadDocument(Secuencia, Ruta, Nombre, Nit, type);
            Disabled_Document();
            break;

        case "DA": //detalle de losdocumentos hijos
            ReadAnexos(Secuencia, Ruta, Nombre, Nit, type);
            break;
    }

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        CREAR DE DOCUMENTOS                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la creacion de direccion
function AddDocument() {
    ClearDocument();
    Enabled_Document();
    $("#Dialog_C_R_U_D_Document").dialog("open");
    $("#Dialog_C_R_U_D_Document").dialog("option", "title", "Nuevo Documento de: " + Nombre_Persona);
    $("#BtnAddDocument").attr("value", "Agregar");
}

//agrega al array de direcciones los datos diligenciados
function Add_Array_Document() {

    var Json_Document = Convert_and_Valide_Json_Document();
    ArrayDocument.push(Json_Document);
    Tabla_General_Document('Default');

    $("#dialog").dialog("option", "title", "Exito");
    $("#Mensaje_alert").text("la Nueva Entidad Financiera fue agregada!");
    $("#dialog").dialog("open");
    $("#DE").css("display", "none");
    $("#SE").css("display", "block");
    $("#WA").css("display", "none");
    $("#Dialog_C_R_U_D_Document").dialog("close");
    ClearDocument();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        ELIMINAR ENTIDAD FINANCIERA                                            */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Eliminacion de direccion
function DeleteDocument(Nit_Document, TC_Document, Cuenta_Document) {

    $("#Dialog_C_R_U_D_Document").dialog("open");
    $("#Dialog_C_R_U_D_Document").dialog("option", "title", "Retirar Entidad Financiera de: " + +Nombre_Persona);
    $("#BtnAddDocument").attr("value", "Eliminar");

    Search_Document(Nit_Document, TC_Document, Cuenta_Document);
    Delete_Document(Nit_Document, TC_Document, Cuenta_Document);
}

// CONFIRMA SI SE ELIMINA EL REGISTRO
function Confirm_Document(Confirm) {
    if (Confirm == 'N') {
        RestoreDelete_Array_Document();
    }
    else {
        $("#dialog").dialog("option", "title", "Exito");
        $("#Mensaje_alert").text("la Entidad Financiera fue Retirada!");
        $("#dialog").dialog("open");
        $("#DE").css("display", "none");
        $("#SE").css("display", "block");
        $("#WA").css("display", "none");
        $("#Dialog_C_R_U_D_Document").dialog("close");
        $("#Dialog_Delete_Document").dialog("close");

        for (itemArray in ArrayDirecciones) {
            ArrayDirecciones[itemArray].Consecutivo = parseInt(itemArray) + 1;
        }

        Tabla_General_Document('Default');
        ClearDocument();

    }
}

//Restaura la eliminacion al array de direcciones los datos diligenciados
function RestoreDelete_Array_Document() {

    var Json_Document = Convert_and_Valide_Json_Document();
    ArrayDocument.push(Json_Document);

    $("#Dialog_Delete_Document").dialog("close");
    $("#Dialog_C_R_U_D_Document").dialog("close");
    Tabla_General_Document("Default");
    ClearDocument();

}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        LEER DE DOCUMENTOS                                          */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que abre la ventana para la Actualizacion de direccion
function ReadDocument(Secuencia, Ruta, Nombre, Nit, type) {

    $("#Dialog_Detalle_Document").dialog("open");
    $("#Dialog_Detalle_Document").dialog("option", "title", "Detalle del documento de: " + Nombre_Persona);
    $("#BtnAddDocument").attr("value", "Salir");

    Search_Document(Secuencia, Nit, type);

}

//llama los documentos hijos del  la opcion elegida
function ReadAnexos(Secuencia, Ruta, Nombre, Nit) {
    $("#Dialog_Ver_Anexos").dialog("open");
    $("#Dialog_Ver_Anexos").dialog("option", "title", "Documentos Anexo(s) del Documento: " + Nombre);
    TableDocument_Anexos(Secuencia);
}

//CIERRA LA VENTANA EMERGENTE
function ReadView_Document() {
    $("#Dialog_Detalle_Document").dialog("close");
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES COMPLEMETARIAS DEL CRUD                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//funcion que captura la direccion y la comvierte en un Json
function Convert_and_Valide_Json_Document() {

    var strTD = $("#Txt_TypeIden_Doc_2").val();
    var SplitTD = strTD.split(" - ");

    var strD = $("#Txt_Ident_Doc_2").val();
    var SplitD = strD.split("-");

    var strEntF = $("#Select_EntFinanciera option:selected").html();
    var SplitEntF = strEntF.split(" - ");

    var strTC = $("#Select_Formato option:selected").html();
    var SplitTC = strTC.split(" - ");

    var Json_Document = {
        "Nit_ID": $("#Txt_Nit_Doc_2").val(),
        "TypeDocument_ID": SplitTD[0],
        "Document_ID": SplitD[0],
        "DocExist_ID": SplitEntF[0],
        "TypeDocExist_ID": SplitEntF[1],
        "DescripEntidad": SplitEntF[2],
        "Formato": SplitTC[0],
        "DescripDocument": SplitTC[1],
        "Cuenta": $("#TxtCuenta").val().toUpperCase(),
        "UsuarioCreacion": User.toUpperCase(),
        "UsuarioActualizacion": User.toUpperCase(),
        "FechaCreacion": $("#Hours").html(),
        "FechaActualizacion": $("#Hours").html()
    }

    return Json_Document;
}

//busca los datos por el banco seleccionado
function Search_Document(secuencia, Nit, type) {

    if (type == "ANEXO") {
        for (itemArray in Matrix_DocWork) {
            if (Matrix_DocWork[itemArray].Nit_ID == Nit &&
               Matrix_DocWork[itemArray].Secuencia_ID == secuencia) {

                $("#Vis_MultiEmpresa_2").val(Matrix_DocWork[itemArray].Nit_ID);
                $("#Vis_MultiEmpresa_3").val(Matrix_DocWork[itemArray].Nit_ID);

                $("#Vis_Persona_2").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
                $("#Vis_Persona_3").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
                $("#Vis_Documento_2").val(Matrix_DocWork[itemArray].Descripcion);
                $("#Vis_Documento_3").val(Matrix_DocWork[itemArray].Descripcion);

                $("#Vista_Secuencia").html(Matrix_DocWork[itemArray].Secuencia_ID);
                $("#Vista_Documento").html(Matrix_DocWork[itemArray].Descripcion);
                $("#Vista_Formato").html(Matrix_DocWork[itemArray].DescripFormato);

                $("#Vista_Indcativo").html(Matrix_DocWork[itemArray].Indicativo);
                $("#Vista_Verificado").html(Matrix_DocWork[itemArray].Verificado + " - " + Matrix_DocWork[itemArray].DescripVerificacion);
                $("#Vista_Usuario_Verificado").html(Matrix_DocWork[itemArray].Usuario_Verifico);

                $("#Vista_Fecha_Verificacion").html(Matrix_DocWork[itemArray].Fecha_Verifico);
                $("#Vista_ObsCaptura").html(Matrix_DocWork[itemArray].Observaciones_Captura);
                $("#Vista_ObsValida").html(Matrix_DocWork[itemArray].Observaciones_Validacion);

                $("#Vista_FechaIniVigen").html(Matrix_DocWork[itemArray].Fecha_Inicio_Vigencia);
                $("#Vista_DiasVigen").html(Matrix_DocWork[itemArray].Dias_Vigencia);
                $("#Vista_FechaVenceVigen").html(Matrix_DocWork[itemArray].Fecha_Vencimiento);

                $("#Vista_FechaCreacion").html(Matrix_DocWork[itemArray].UsuarioCreacion + "   " + Matrix_DocWork[itemArray].FechaCreacion);
                $("#Vista_FechaActualizacion").html(Matrix_DocWork[itemArray].UsuarioActualizacion + "    " + Matrix_DocWork[itemArray].FechaActualizacion);

                if (Matrix_DocWork[itemArray].Secuencia_Doc == 0)
                    $("#BtnPadre").css("display", "none");
                else {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc != Matrix_DocWork[itemArray].Secuencia_ID) {
                        $("#BtnPadre").css("display", "inline-table");
                        SearchPadre(Matrix_DocWork[itemArray].Secuencia_Doc, Matrix_DocWork[itemArray].Nit_ID);
                    }
                    else
                        $("#BtnPadre").css("display", "none");
                }
            }
        }
    }
    else {
        $("#BtnPadre").css("display", "none");
        for (itemArray in Matrix_DocWork) {
            if (Matrix_DocWork[itemArray].Nit_ID == Nit &&
                 Matrix_DocWork[itemArray].TypeDocument_ID == $("#Select_Documento").val() &&
                 Matrix_DocWork[itemArray].Document_ID == $("#Txt_Ident").val() &&
                 Matrix_DocWork[itemArray].Secuencia_ID == secuencia) {

                $("#Vis_MultiEmpresa_2").val(Matrix_DocWork[itemArray].Nit_ID);
                $("#Vis_MultiEmpresa_3").val(Matrix_DocWork[itemArray].Nit_ID);

                $("#Vis_Persona_2").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
                $("#Vis_Persona_3").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
                $("#Vis_Documento_2").val(Matrix_DocWork[itemArray].Descripcion);
                $("#Vis_Documento_3").val(Matrix_DocWork[itemArray].Descripcion);

                $("#Vista_Secuencia").html(Matrix_DocWork[itemArray].Secuencia_ID);
                $("#Vista_Documento").html(Matrix_DocWork[itemArray].Descripcion);
                $("#Vista_Formato").html(Matrix_DocWork[itemArray].DescripFormato);

                $("#Vista_Indcativo").html(Matrix_DocWork[itemArray].Indicativo);
                $("#Vista_Verificado").html(Matrix_DocWork[itemArray].Verificado + " - " + Matrix_DocWork[itemArray].DescripVerificacion);
                $("#Vista_Usuario_Verificado").html(Matrix_DocWork[itemArray].Usuario_Verifico);

                $("#Vista_Fecha_Verificacion").html(Matrix_DocWork[itemArray].Fecha_Verifico);
                $("#Vista_ObsCaptura").html(Matrix_DocWork[itemArray].Observaciones_Captura);
                $("#Vista_ObsValida").html(Matrix_DocWork[itemArray].Observaciones_Validacion);

                $("#Vista_FechaIniVigen").html(Matrix_DocWork[itemArray].Fecha_Inicio_Vigencia);
                $("#Vista_DiasVigen").html(Matrix_DocWork[itemArray].Dias_Vigencia);
                $("#Vista_FechaVenceVigen").html(Matrix_DocWork[itemArray].Fecha_Vencimiento);

                $("#Vista_FechaCreacion").html(Matrix_DocWork[itemArray].UsuarioCreacion + "   " + Matrix_DocWork[itemArray].FechaCreacion);
                $("#Vista_FechaActualizacion").html(Matrix_DocWork[itemArray].UsuarioActualizacion + "    " + Matrix_DocWork[itemArray].FechaActualizacion);
            }
        }
    }
}


var RutaPadre;
var NombrePadre;

//buscamos los datos del padre para manejo de boton y datos
function SearchPadre(Index_Padre, Nit) {
    for (itemArray in Matrix_DocWork) {
        if (Matrix_DocWork[itemArray].Secuencia_ID == Index_Padre && Matrix_DocWork[itemArray].Nit_ID == Nit) {
            $("#Vis_Persona_2").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
            $("#Vis_Persona_3").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa);
            $("#Vis_Secuencia_2").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].Secuencia_Doc);
            $("#Vis_Secuencia_3").val(Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].Secuencia_Doc);
            $("#Vis_Documento_2").val(Matrix_DocWork[itemArray].Descripcion);
            $("#Vis_Documento_3").val(Matrix_DocWork[itemArray].Descripcion);

            RutaPadre = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
            NombrePadre = Matrix_DocWork[itemArray].Nombre_Save;
        }
    }
}

//boton que llama al padre
function VerDocPadre() {
    VerDocumento(RutaPadre, NombrePadre);
}


//elimina del array el dato seleccionado
function Delete_Document(Nit_Document, TC_Document, Cuenta_Document) {
    for (itemArray in ArrayDocument) {
        if (ArrayDocument[itemArray].DocExist_ID == Nit_Document && ArrayDocument[itemArray].Formato == TC_Document && ArrayDocument[itemArray].Cuenta == Cuenta_Document) {
            ArrayDocument.splice(itemArray, 1);
        }
    }
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                           FUNCIONES VALIDACION  Y LIMPIEZA DE CAMPOS                                                                      */
/*---------------------------------------------------------------------------------------------------------------*/

//construye la tabla de documentos hijos
function TableDocument_Anexos(Secuencia) {
    var Html;

    Html = "<table id='TDoc_Anexo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcionres</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in Matrix_DocWork) {
        if (Matrix_DocWork[itemArray].Secuencia_Doc == Secuencia) {
            if (Matrix_DocWork[itemArray].Secuencia_Doc != Matrix_DocWork[itemArray].Secuencia_ID) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                Html += "<tr id= 'TDoc_H_" + Matrix_DocWork[itemArray].Index + "'><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "','ANEXO');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Descripcion + "</td></tr>";
            }
        }
    }
    Html += "</tbody></table>";
    $("#container_TDoc_Anexos").html("");
    $("#container_TDoc_Anexos").html(Html);

    $(".Opciones").click(function () {
    });

    $("#TDoc_Anexo").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}


//valida si la entidad ya fue registrada en la grilla
function Repetido() {

    var Campo_1 = $("#Select_EntFinanciera").val();
    var Campo_2 = $("#Select_Formato").val();
    var Campo_3 = $("#TxtCuenta").val();
    var validar = 0;

    for (item in ArrayDocument) {
        if (Campo_1 == ArrayDocument[item].DocExist_ID && Campo_2 == ArrayDocument[item].Formato && Campo_3 == ArrayDocument[item].Cuenta)
            validar = 1;
    }

    return validar;
}

//valida campos minimos para crear una direccion
function ValidaDocumentos() {

    var Campo_1 = $("#Select_EntFinanciera").val();
    var Campo_2 = $("#Select_Formato").val();
    var Campo_3 = $("#TxtCuenta").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#Img6").css("display", "inline-table");
        else
            $("#Img6").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img7").css("display", "inline-table");
        else
            $("#Img7").css("display", "none");

        if (Campo_3 == "")
            $("#Img8").css("display", "inline-table");
        else
            $("#Img8").css("display", "none");
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
        $("#Img8").css("display", "none");
    }
    return validar;
}

//limpiar campos de Entidades finacieras
function ClearDocument() {
    $("#Select_EntFinanciera").val("-1");
    $("#Select_Formato").val("-1");
    $("#TxtCuenta").val("");

    $('.C_Chosen').trigger('chosen:updated');

}

//bloquear campos de Entidades finacieras
function Disabled_Document() {

    $("#Select_EntFinanciera").attr("disabled", "disabled");
    $("#Select_Formato").attr("disabled", "disabled");
    $("#TxtCuenta").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated')
}

//desbloquear campos de Entidades finacieras
function Enabled_Document() {

    $("#Select_EntFinanciera").removeAttr("disabled");
    $("#Select_Formato").removeAttr("disabled");
    $("#TxtCuenta").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');
}


//llamado para el guardar el array de direcciones
function BtnSave_Document_Client() {
    transacionAjax_Document_create('Create_Document', D_Nit, D_TDocumento, D_Documento);
}


//arma la ruta del documento y lo muestra
function SearchDocument(Ruta, Nombre, Ext) {
    var Link_Download = Ruta + Nombre + "." + Ext;
}

//crear la ruta del src de la imagen
function ViewFoto() {
    transaccionAjax_MDocWork('MATIRXDOC_WORK', $("#Select_EmpresaNit").val(), $("#Select_Documento").val(), $("#Txt_Ident").val(), "Foto");
}
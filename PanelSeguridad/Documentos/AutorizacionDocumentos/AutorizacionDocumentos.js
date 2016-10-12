/*--------------- region de variables globales --------------------*/
var Matrix_DocWork = [];
var Matrix_Consecutivo = [];
var Array_Documento_Hijo = [];
var listDocAnexos = [];

var Matrix_Verificacion = [];
var RutasOperacion = [];

var ArrayCombo = [];
var ArrayFormato = [];
var ArrayAutorizacionDocumentos = [];

var RutaTemporal;
var RutaRelativa;
var RutaDestino;
var RequiereVerif;

var estado;
var editNit_ID;
var index_ID;
var editID;

var Nit_ID_proccess;
var ConsecutivoNuevo;
var Formato_ID;
var Secuencia_Padre;
var Documento_ID;

var IndicativoFoto;

var CheckVigencias;
var DescripFormato;

var NameDoc_Final;

var Flitro_Empresa;
var Flitro_Estado;
var Filtro_Documento;
var Nivel_Filtro;

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {

    transaccionAjax_RutasOperacion('RUTAS_OPERACION');
    transaccionAjax_MConsecutivo('MATRIX_CONSECUTIVOS');
    transaccionAjax_MVerificacion('MATRIX_VERIFICAR');
    transaccionAjax_MDocWork('MATIRXDOC_WORK');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

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

    $("#Dialog_Visor").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1200,
        height: 600,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Visor_View").dialog({
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

    $("#Dialog_Visor_View_Validacion").dialog({
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

    $("#Dialog_Detalle_Document").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 550,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Ver_Anexos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 700,
        height: 350,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Valida_Document").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 750,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $(function () {
        $("#TxtFVerificacion").datepicker({ dateFormat: 'yy-mm-dd' });
    });

});

//salida del formulario
function btnSalir() {
    transacionAjax_EraseDocument('EraseDocument');
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//carga los combos dependientes
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        Nit_ID_proccess = $(this).val();
        Charge_Combos_Depend_Nit(Matrix_DocWork, "Select_Documento_V", index_ID, "");
    });
}

//dispara la consulta a la matriz
function BtnCrear() {
    ValidaFiltros();
}

//validamos campos filtros para consulta y muestre info
function ValidaFiltros() {
    Flitro_Empresa = $("#Select_EmpresaNit").val();
    Flitro_Estado = $("#Select_Estado").val();
    Filtro_Documento = $("#Select_Documento_V").val();

    if (Flitro_Empresa != "-1") {
        $("#Vis_EmpresaNit").val($("#Select_EmpresaNit option:selected").html());
        $("#Vis_MultiEmpresa_2").val($("#Select_EmpresaNit option:selected").html());
        $("#Vis_MultiEmpresa_3").val($("#Select_EmpresaNit option:selected").html());
        Nivel_Filtro = "1";
    }

    if (Flitro_Estado != "-1")
        Nivel_Filtro = "2";

    if (Filtro_Documento != "-1" && Filtro_Documento != null) {
        $("#Vis_Documento").val($("#Select_Documento_V option:selected").html());
        $("#Vis_Documento_2").val($("#Select_Documento_V option:selected").html());
        $("#Vis_Documento_3").val($("#Select_Documento_V option:selected").html());
        Nivel_Filtro = "3";
    }

    if (Flitro_Empresa != "-1" && Flitro_Estado != "-1")
        Nivel_Filtro = "4";

    if (Flitro_Empresa != "-1" && Filtro_Documento != "-1")
        Nivel_Filtro = "5";

    if (Flitro_Estado != "-1" && Filtro_Documento != "-1")
        Nivel_Filtro = "6";

    if (Flitro_Empresa != "-1" && Flitro_Estado != "-1" && Filtro_Documento != "-1")
        Nivel_Filtro = "7";

    if (Flitro_Empresa == "-1" && Flitro_Estado == "-1" && Filtro_Documento == "-1")
        Nivel_Filtro = "0";

    $("#Dialog_Visor").dialog("open");
    console.log(Nivel_Filtro);
    Tabla_General_Document("U");
}

//grid Documentos general
function Tabla_General_Document(Opc_Link) {
    var html = "";
    html = "<table id='TDocument' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Documento</th><th>Formato</th><th>Tipo de Documento y Documento</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Modificación</th></tr></thead><tbody>";

    switch (Nivel_Filtro) {

        case "0":
            $("#Dialog_Visor").dialog("option", "title", "Validacion General de Documentos");
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "1":
            $("#Dialog_Visor").dialog("option", "title", "Validacion General de la Empresa: " + $("#Select_EmpresaNit option:selected").html());
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "2":
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "3":
            for (itemArray in Matrix_DocWork) {
                if (Matrix_DocWork[itemArray].Secuencia_ID == Filtro_Documento) {
                    var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "4":
            $("#Dialog_Visor").dialog("option", "title", "Validacion por Estados de la Empresa: " + $("#Select_EmpresaNit option:selected").html());
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "5":
            $("#Dialog_Visor").dialog("option", "title", "Validacion del Documento: " + $("#Select_Documento_V option:selected").html());
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        case "6":
            $("#Dialog_Visor").dialog("option", "title", "Validacion de los Documentos  por el Estado: " + $("#Select_Estado option:selected").html());
            for (itemArray in Matrix_DocWork) {
                if (Matrix_DocWork[itemArray].Verificado == Flitro_Estado && Matrix_DocWork[itemArray].Secuencia_ID == Filtro_Documento) {
                    var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "7":
            $("#Dialog_Visor").dialog("option", "title", "Validacion del Documento: " + $("#Select_Documento_V option:selected").html() + " de la Empresa: " + $("#Select_EmpresaNit option:selected").html() + " Por el Estado: " + $("#Select_Estado option:selected").html());
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

        default:
            $("#Dialog_Visor").dialog("option", "title", "Validacion General de Documentos");
            for (itemArray in Matrix_DocWork) {
                var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
                if (Matrix_DocWork[itemArray].Verificado != "1") {
                    if (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='DA'>Ver Documentos Anexos</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
                }
                else
                    html += "<tr><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option><option value='A'>Validación Documento</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td><td>" + Matrix_DocWork[itemArray].DescripFormato + "</td><td>" + Matrix_DocWork[itemArray].TypeDocument_ID + " - " + Matrix_DocWork[itemArray].Document_ID + " - " + Matrix_DocWork[itemArray].DescripEmpresa + "</td><td>" + Matrix_DocWork[itemArray].UsuarioCreacion + "</td><td>" + Matrix_DocWork[itemArray].FechaCreacion + "</td><td>" + Matrix_DocWork[itemArray].UsuarioActualizacion + "</td><td>" + Matrix_DocWork[itemArray].FechaActualizacion + "</td></tr>";
            }
            break;

    }

    html += "</tbody></table>";
    $("#container_Autorizacion").html("");
    $("#container_Autorizacion").html(html);

    $(".AddDocument").click(function () {
    });

    $("#TDocument").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Document(Select_control, Secuencia, Ruta, Nombre, Nit) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {

        case "A": //Validar documento
            ValideDocument(Secuencia, Ruta, Nombre, Nit);
            break;

        case "V": //visualizar documentos
            VerDocumento(Ruta, Nombre)
            break;

        case "R": //detalles del documento
            ReadDocument(Secuencia, Ruta, Nombre, Nit);
            break;

        case "DA": //detalle de losdocumentos hijos
            ReadAnexos(Secuencia, Ruta, Nombre, Nit);
            break;
    }

}

//llama los documentos hijos del  la opcion elegida
function ReadAnexos(Secuencia, Ruta, Nombre, Nit) {
    $("#Dialog_Ver_Anexos").dialog("open");
    $("#Dialog_Ver_Anexos").dialog("option", "title","Documentos Anexo(s) del Documento: " + Nombre);
    TableDocument_Anexos(Secuencia);
}

//levanta en la vista el documento
function VerDocumento(RutaDocumento, Documento, Nit) {

    $("#IF_Visor").attr("width", "100%");
    $("#IF_Visor").attr("height", "100%");
    $("#IF_Visor").attr("src", RutaDocumento);

    $("#Dialog_Visor_View").dialog("open");
    $("#Dialog_Visor_View").dialog("option", "title", Documento);
}

//regresar proceso
function BtnRegresar() {
    Clear();
    $("#Dialog_Visor").dialog("close");
}

//ingresar la verificacion de los datos
function BtnIngresar() {
    var valida = camposvalidar();

    if (valida == 0) {
        transaccionAjax_Update_Verificacion('Update_Verificacion');
    }

}

//validamos campos de verificacion
function camposvalidar() {

    var validar = 0;
    var Campo_1 = $("#Select_TVerificacion").val();
    var Campo_2 = $("#TxtFVerificacion").val();

    if (Campo_1 == "-1" || Campo_2 == "") {
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

//funcion que abre la ventana para la grilla de documentos
function ReadDocument(Secuencia, Ruta, Nombre, Nit) {

    $("#Dialog_Detalle_Document").dialog("open");
    $("#Dialog_Detalle_Document").dialog("option", "title", "Detalle del documento ");
    Search_Document(Secuencia, Nit);

}

//funcion que abre la ventana para la validacion de documentos
function ValideDocument(Secuencia, Ruta, Nombre, Nit) {

    $("#Dialog_Valida_Document").dialog("open");
    $("#Dialog_Valida_Document").dialog("option", "title", "Validación del documento: " + Nombre);
    $("#Vis_Documento_3").val(Nombre);

    $("#IF_Visor_View").attr("width", "100%");
    $("#IF_Visor_View").attr("height", "100%");
    $("#IF_Visor_View").attr("src", Ruta);
    Search_Document(Secuencia, Nit);

}

//busca los datos por el documento seleccionado seleccionado
function Search_Document(secuencia, Nit) {

    for (itemArray in Matrix_DocWork) {
        if (Matrix_DocWork[itemArray].Secuencia_ID == secuencia && Matrix_DocWork[itemArray].Nit_ID == Nit) {

            $("#Vista_Secuencia").html(Matrix_DocWork[itemArray].Secuencia_ID);
            $("#Vista_Documento").html(Matrix_DocWork[itemArray].Nombre_Save);
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
            else
                $("#BtnPadre").css("display", "inline-table");
            var Consecutivo_ME = Matrix_DocWork[itemArray].Nombre_Save;
            Consecutivo_ME = Consecutivo_ME.split("_");
            Secuencia_Padre = Consecutivo_ME[4];
            Documento_ID = Matrix_DocWork[itemArray].Documento_ID;
            RutaDestino = Matrix_DocWork[itemArray].RutaDocumento;
            Nit_ID_proccess = Matrix_DocWork[itemArray].Nit_ID;
            Formato_ID = Matrix_DocWork[itemArray].Formato;
            ContruyeName_Temp("TEMP", Consecutivo_ME[1], Matrix_DocWork[itemArray].DescripFormato);
        }
    }
}


//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//muestra controles de guardado
function HabilitarControl() {
    $("#D_Controls").css("display", "inline-table");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Estado").val("-1");
    $("#Select_TVerificacion").val("-1");
    $("#TxtFVerificacion").val("");
    $("#TxtA_Observacion").val("");

    $("#IF_Visor").attr("src", "");
    $("#IF_Visor_D").attr("src", "");
    $('#Select_Documento_V').empty();

    $('.C_Chosen').trigger('chosen:updated');
}

//levanta en la vista el documento anexo
function VerDocumento_Validacion() {

    $("#IF_Visor_D").attr("width", "100%");
    $("#IF_Visor_D").attr("height", "400px");
    $("#IF_Visor_D").attr("src", RutaRelativa + "TEMP/" + Doc_name);

    $("#Dialog_Visor_View_Validacion").dialog("open");
    $("#Dialog_Visor_View_Validacion").dialog("option", "title", Doc_name);
}

var Cont_Hijo = 0;

//insertar documento detro del array y visualizarlo en grilla
function Add_Doc() {
    CaptureConsecutivo();

    var StrDoc_Name = Doc_name.split(".");
    var Split_Name = StrDoc_Name[0].split("_");
    NameDoc_Final = Split_Name[0] + "_" + Split_Name[1] + "_" + Split_Name[2] + "_" + Split_Name[3] + "_" + ConsecutivoNuevo + "." + StrDoc_Name[1];

    var JsonDoc = {
        "Nit_ID": Nit_ID_proccess,
        "Consecutivo": ConsecutivoNuevo,
        "Documento_ID": Documento_ID,
        "Nombre_Save": NameDoc_Final,
        "RutaDocumentoDestino": RutaDestino,
        "Formato": Formato_ID,
        "Indicativo": "N",
        "Observaciones_Captura": "Este es un hijo del documento Padre: " + $("#Vista_Documento").html(),
        "UsuarioCreacion": User.toUpperCase(),
        "Secuencia_Doc": Secuencia_Padre,
        "RutaRelativaDocumento": RutaTemporal,
        "Nombre_Old": Doc_name,
        "Index": Cont_Hijo
    };

    Array_Documento_Hijo.push(JsonDoc);
    Cont_Hijo = Cont_Hijo + 1;
    $("#Dialog_Visor_View_Validacion").dialog("close");
    Table_Doc_H();
}

//trae el consecutivo y actualiza
function CaptureConsecutivo() {

    for (item in Matrix_Consecutivo) {
        if (Matrix_Consecutivo[item].Nit_ID == Nit_ID_proccess) {
            if (Array_Documento_Hijo.length != 0)
                ConsecutivoNuevo = parseInt(ConsecutivoNuevo) + 1;
            else
                ConsecutivoNuevo = parseInt(Matrix_Consecutivo[item].Consecutivo);
        }
    }
}

//Crea la tabla de documentos hijos
function Table_Doc_H() {
    var Html;

    Html = "<table id='TDoc_H' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in Array_Documento_Hijo) {
        if (Array_Documento_Hijo[itemArray].Array_Documento_Hijo != 0) {
            Html += "<tr id= 'TDoc_H_" + Array_Documento_Hijo[itemArray].Index + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar_Doc_H('" + Array_Documento_Hijo[itemArray].Index + "')\"></input></td><td>" + Array_Documento_Hijo[itemArray].Nombre_Old + "</td></tr>";
        }
    }
    Html += "</tbody></table>";
    $("#container_TDoc_H").html("");
    $("#container_TDoc_H").html(Html);

    $(".Eliminar").click(function () {
    });

    $("#TDoc_H").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//eliminar documentos de la carga
function Eliminar_Doc_H(index) {
    //borramos el documento deseado
    for (item in Array_Documento_Hijo) {
        if (Array_Documento_Hijo[item].Index == index) {
            transacionAjax_DeleteDocument("DeleteDocument", Array_Documento_Hijo[item].RutaRelativaDocumento, Array_Documento_Hijo[item].Nombre_Old);
            Array_Documento_Hijo.splice(item, 1);
        }
    }
    Table_Doc_H();
}

//construye la tabla de documentos hijos
function TableDocument_Anexos(Secuencia) {
    var Html;

    Html = "<table id='TDoc_Anexo' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Opcionres</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in Matrix_DocWork) {
        if ((Matrix_DocWork[itemArray].Secuencia_Doc == Secuencia) != (Matrix_DocWork[itemArray].Secuencia_Doc == Matrix_DocWork[itemArray].Secuencia_ID)) {
            var StrRutadocument = Matrix_DocWork[itemArray].RutaRelativaDocumento + Matrix_DocWork[itemArray].Nombre_Save + "." + Matrix_DocWork[itemArray].DescripFormato;
            Html += "<tr id= 'TDoc_H_" + Matrix_DocWork[itemArray].Index + "'><td><select id='Select_" + Matrix_DocWork[itemArray].Secuencia_ID + "' class='Opciones' onchange=\"Select_Option_Document(this,'" + Matrix_DocWork[itemArray].Secuencia_ID + "','" + StrRutadocument + "','" + Matrix_DocWork[itemArray].Nombre_Save + "','" + Matrix_DocWork[itemArray].Nit_ID + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Detalle</option></select></td><td>" + Matrix_DocWork[itemArray].Nombre_Save + "</td></tr>";
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

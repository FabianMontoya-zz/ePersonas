/*--------------- region de variables globales --------------------*/
var Array_People = [];
var Array_Foto = [];
var List_Registros = [];


var Array_Valida_Salida = [];

var Tabla_Persona = 0;
var Tabla_Empresa = 0;
var GrpDoc_Persona;
var Nit_ID_Proccess;
var Tipo_Busqueda;
var En_Planta = 0;

/*--------------- region de variables globales --------------------*/
var Fecha_Vencimiento;
var RutaDocumento;
var Imagen_Vencimiento;
var EstadoVerif;
var Est_Verifica;
var Est_Vigencia;
var Mensaje_Semaforo = "";

var editNit_ID;
var index_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    Load_Charge_Sasif();
    transacionAjax_Documento('Documento');

    VentanasEmergentes();
    ComplementosJquery();
    InicializaPagina();

     MostrarHora();
    Capture_Tarjeta_ID();
});

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                 REGION INICIO DE COMPONENTES                                                                                                    ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//instancia dialogos jquey
function VentanasEmergentes() {
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
        
}

//instancia  componentes anexos a jquery
function ComplementosJquery() {
    $(function () { //Función del acordeon
        $("#Acordeon_Salida").accordion({
            heightStyle: "content",
            collapsible: true
        });
    });
}

//ininiciliza campos del load
function InicializaPagina() {

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Control_Salida").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#Sucess").css("display", "none");
    $("#Fail").css("display", "none");

    $("#Inf_persona").css("display", "none");
    $("#Datos_persona").css("display", "none");

    $("#Inf_Salida").css("display", "none");

    $("#Div_D").css("display", "none");
    $("#TI_2").css("display", "none");
    $("#TI_3").css("display", "none");

    $("#TxtIDTarjeta").focus();
}

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

//abre dialog para busqueda de la persona
function BtnConsulta_Persona(Type) {

    $("#Dialog_Search_Persona").dialog("open");
    switch (Type) {
        case "Encargado":
            $("#Dialog_Search_Persona").dialog("option", "title", "Buscar Encargado");
            Tipo_Busqueda = Type;
            break;

        case "Empleado":
            $("#Dialog_Search_Persona").dialog("option", "title", "Buscar Empleado");
            Tipo_Busqueda = Type;
            break;
    }
}

//Salida de acceso
function BtnAgregarAcceso() {

    var validate = ValidaCamposSalida();

    if (validate == 0) {
        CalculaHoraEstimada();
        $("#Inf_Salida").css("display", "inline-table");

    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    if (Process_Manual_Salida == 0)
        Clear();
    else
        Process_Manual_Salida = 0;
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + User + "&L_L=" + Link;
}

//Salida de registro
function Registrar_Salida_Log() {
    transacionAjax_LogAcceso_Update("Update_Log_Salida");
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

    $("#Datos_persona").css("display", "inline-table");
    $("#Inf_persona").css("display", "inline-table");

    if (Tarjeta_Proccess == 1) {
        $("#TxtDoc").val(Array_People[0].Document_ID);
        $("#Select_Documento").val(Array_People[0].TypeDocument_ID);
        TDoc_VT = Array_People[0].TypeDocument_ID;
        Doc_VT = Array_People[0].Document_ID;

        $("#TxtDoc").attr("disabled", "disabled");
        $("#Select_Documento").attr("disabled", "disabled");
    }
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
/*----                                                                                              GRID EXTENCIONES                                                                                                                        ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// crea la tabla en el cliente
function Table_Extenciones() {
    var html;
    var StrTelefono_1 = "";
    var StrTelefono_2 = "";
    var StrTelefono_3 = "";
    var StrTelefono_4 = "";
    var Name_Emp;

    html = "<table id='TGridExtencion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th style='width: 35%'>Nombre</th><th style='width: 15%'>Telefono 1</th><th style='width: 15%'>Telefono 2</th><th style='width: 15%'>Telefono 3</th><th style='width: 15%'>Telefono 4</th><th style='width: 15%'>Correo 1</th><th style='width: 15%'>Correo 2</th></tr></thead><tbody>";
    for (itemArray in List_Extencion) {
        if (List_Extencion[itemArray].Nit_ID != 0) {
            if (List_Extencion[itemArray].Tipo_1 != "F") {
                StrTelefono_1 = "DesActualizado";
                StrTelefono_2 = "DesActualizado";
                StrTelefono_3 = "DesActualizado";
                StrTelefono_4 = "DesActualizado";
            }
            else {
                StrTelefono_1 = Convert_Valores_0(List_Extencion[itemArray].Telefono_1);
                StrTelefono_2 = Convert_Valores_0(List_Extencion[itemArray].Telefono_2);
                StrTelefono_3 = Convert_Valores_0(List_Extencion[itemArray].Telefono_3);
                StrTelefono_4 = Convert_Valores_0(List_Extencion[itemArray].Telefono_4);
            }
            Name_Emp = List_Extencion[itemArray].Nombre;
            html += "<tr id= 'TExtencion_" + List_Extencion[itemArray].Nit_ID + "'><td>" + Name_Emp + "</td><td>" + StrTelefono_1 + "</td><td>" + StrTelefono_2 + "</td><td>" + StrTelefono_3 + "</td><td>" + StrTelefono_4 + "</td><td>" + List_Extencion[itemArray].Correo_1 + "</td><td>" + List_Extencion[itemArray].Correo_2 + "</td></tr>";
        }
    }

    html += "</tbody></table>";
    $("#container_TGrid_New").html("");
    $("#container_TGrid_New").html(html);

    $("#TGridExtencion").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

    $("#Dialog_Extencion").dialog("open");
    $("#Dialog_Extencion").dialog("option", "title", "Extencion de " + Name_Emp);

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

    $("#Datos_persona").css("display", "None");

    $("#Inf_persona").css("display", "None");
    $("#Inf_Salida").css("display", "none");
    $("#Control_Salida").css("display", "none");
    $("#Reg_Ingreso").css("display", "none");
    
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

    Array_SalidaLog = [];
    Tabla_Salida();
    $("#TxtIDTarjeta").focus();



}

//limpiar pagina para nueva consulta
function Clear_Salida() {
    $("#Select_PAcceso").val("-1");
    $("#Select_AreaAcceso").val("-1");
    $("#Txt_Persona_Enc").val("");

    $("#TxtHora").val("");
    $("#TxtMinutos").val("");
    $("#HA_Salida").html("");
    $("#HE_Salida").html("");

    $('.C_Chosen').trigger('chosen:updated');
}


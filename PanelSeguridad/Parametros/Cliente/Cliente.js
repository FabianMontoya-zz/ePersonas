/*--------------- region de variables globales --------------------*/
var Matrix_Pais = [];
var Matrix_Ciudad = [];
var Matrix_Area = [];
var Matrix_Cargo = [];
var Matrix_Jefe = [];
var Matrix_GrpDocumentos = [];
var Matrix_DocWork = [];

var ArrayRegimen = [];

var ArrayCliente = [];
var ArrayCombo = [];
var ArrayPaises = [];
var ArrayImpuesto_Gasto = [];
var ArrayEmpresaNit = [];
var ArrayEntfinanciera = [];
var ArrayTcuenta = [];
var ArrayCli_Relacion = [];
var ArraySeguridad = [];
var ArrayGrpDocumentos = [];

var estado;
var editNit_ID;
var editType_Document_ID;
var editDocument_ID;
var NitAlter = "";
var ValidatorCampos = 1;
var OpcComplementos = 0;
var OpcWordComplementos;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    transaccionAjax_MDocWork('MATIRXDOC_WORK');
    transaccionAjax_MPaises_Ciudades('MATRIX_PAIS_CIUDAD');
    transaccionAjax_MArea('MATRIX_AREA');
    transaccionAjax_MCargo('MATRIX_CARGO');
    transaccionAjax_MJefe('MATRIX_JEFE');
    transaccionAjax_MGrpDoc('MATRIX_GRP');

    CargaMonth("Select_Mont", "");
    M_Regimen();

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente')
    transacionAjax_EntFinan('Bank');
    transacionAjax_Documento('Documento');
    transacionAjax_TCuenta('TCuenta');
    transacionAjax_Seguridad('Seguridad');

    Verifica();
    ExitComplementos();

    $("#ESelect").css("display", "none");
    $("#ImgMul").css("display", "none");
    $("#ImgPais").css("display", "none");
    $("#ImgC_Doc").css("display", "none");
    $("#ImgCiudad").css("display", "none");
    $("#ImgPais_D").css("display", "none");
    $("#Relacion").css("display", "none");
    $("#T_option").css("display", "none");

    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img8").css("display", "none");
    $("#Img9").css("display", "none");
    $("#Img10").css("display", "none");
    $("#Img11").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
    $("#Img15").css("display", "none");
    $("#Img16").css("display", "none");
    $("#Img19").css("display", "none");
    $("#Img20").css("display", "none");
    $("#Img21").css("display", "none");
    $("#Img24").css("display", "none");

    $("#Img22").css("display", "none");
    $("#Img23").css("display", "none");

    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaDatos_D_Vista").css("display", "none");

    $("#Admin_Anexos").css("display", "none");
    $("#Foto_Persona").css("display", "none");
    $("#Container_Complementos").css("display", "none");
    $("#C_Empleado").css("display", "none");
    $("#C_Banco").css("display", "none");
    $("#C_Banco_Vista").css("display", "none");
    $("#C_Empleado_Vista").css("display", "none");
    $("#C_MultiEmpresa").css("display", "none");

    $("#Relacion").css("display", "none");
    $("#Controls").css("display", "none");
    $("#TablaConsulta").css("display", "none");

    $("#Anexos").css("display", "none");
    $("#TR_Nit").css("display", "none");

    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#Dialog_Charge").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 400,
        height: 400,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        show: {
            effect: 'fade',
            duration: 1000
        },
        hide: {
            effect: 'fade',
            duration: 1000
        }
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true
    });

    $("#Dialog_Direcciones").dialog({
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

    $("#Dialog_Ver_Anexos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 900,
        height: 550,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_EntidadFinanciera").dialog({
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

    $("#Dialog_Documentos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 700,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Doc_Autorizados").dialog({
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

    $("#Dialog_C_R_U_D").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 850,
        height: 620,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_C_R_U_D_Bank").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 750,
        height: 400,
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

    $("#Dialog_Delete_Adress").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 300,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Delete_Bank").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 300,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Format_Adress").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1000,
        height: 250,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Relation").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 150,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
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

    Format_Adress();
    Change_Select_pais();
    Change_Select_TPersona("", "");
    ValideAnexos();
    Change_Select_TDoc();
    Change_Select_Nit();
    Change_Mes();

});

//revisa el tipo de documento
function Change_Select_TDoc() {
    $("#Select_Documento").change(function () {
        var index = $(this).val();

        if (index != 2) {

            ResetError();
            $("#TR_Nit").css("display", "none");
            $(".Desvanecer").css("display", "inline-table");
            $(".TR_1").css("width", "100%");
            ValidatorCampos = 1;

            $("#TD_1").css("width", "15.2%");
            $("#TD_2").css("width", "10%");
            $("#TD_3").css("width", "3%");
            $("#TD_4").css("width", "3%");
            $("#TD_5").css("width", "5%");
            $("#TD_6").css("width", "2%");
            $("#TD_7").css("width", "35%");
            $("#TD_8").css("width", "15%");
            $("#Select_Ciudad_Doc").css("width", "80%");

            $("#TD_A1").css("width", "12%");
            $("#TD_HA1").css("width", "3.7%");
            $("#TD_A2").css("width", "15%");


        }
        else {
            $("#TD_1").css("width", "13%");
            $("#TD_2").css("width", "10%");
            $("#TD_3").css("width", "1%");
            $("#TD_4").css("width", "5%");
            $("#TD_5").css("width", "5%");
            $("#TD_6").css("width", "50%");
            $("#TD_7").css("width", "50%");
            $("#TD_8").css("width", "50%");

            ResetError();
            $("#TR_Nit").css("display", "inline-table");
            $(".Desvanecer").css("display", "none");
            ValidatorCampos = 2;
        }
    });
}

//Carga los dias del mes correspondiente
function Change_Mes() {
    $("#Select_Mont").change(function () {
        CargaDay("Select_Year", "Select_Mont", "Select_Day", "");
    });
}

//muestra las relacion del cliente
function BtnRelacion() {
    $("#Dialog_Relation").dialog("open");
}

//salida del formulario
function btnSalir() {
    transacionAjax_EraseDocument('EraseDocument');
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            ResetError();
            CargaYear("Select_Year", 80, 17, "");
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#Admin_Anexos").css("display", "none");
            $("#Foto_Persona").css("display", "inline-table");

            $("#Controls").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Anexos").css("display", "none");
            $("#C_Banco").css("display", "none");
            $("#C_Empleado").css("display", "none");

            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Select_Documento").removeAttr("disabled");

            $("#BtnLimpiar").css("display", "inline-table");
            $("#Btnguardar").css("display", "inline-table");

            $("#Txt_Nit").removeAttr("disabled");
            $("#Txt_Ident").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");

            $("#Imgfoto").attr("src", "../../images/avatar.png");
            Enabled_Client();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#Admin_Anexos").css("display", "none");
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#Foto_Persona").css("display", "none");

            $("#Controls").css("display", "none");
            $("#Anexos").css("display", "none");
            $("#BtnLimpiar").css("display", "none");

            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCliente").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            ResetError();
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#Admin_Anexos").css("display", "none");
            $("#Foto_Persona").css("display", "none");

            $("#Controls").css("display", "none");
            $("#Anexos").css("display", "none");
            $("#C_Banco").css("display", "none");
            $("#C_Empleado").css("display", "none");
            $("#BtnLimpiar").css("display", "none");

            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCliente").html("");
            estado = opcion;
            Clear();
            Enabled_Client();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaDatos_D_Vista").css("display", "none");
            $("#Admin_Anexos").css("display", "none");
            $("#Foto_Persona").css("display", "none");

            $("#Controls").css("display", "none");
            $("#Anexos").css("display", "none");
            $("#BtnLimpiar").css("display", "none");

            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCliente").html("");
            estado = opcion;
            Clear();
            break;

    }
}

//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Cliente("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Cliente("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Cliente_create("crear");
        }
        else {
            transacionAjax_Cliente_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Cliente_delete("elimina");
}

//validamos si han escogido una columna
function ValidarDroplist() {
    var flag;
    var contenido = $("#DDLColumns").val();

    if (contenido == '-1') {
        flag = 1;
    }
    else {
        flag = 0;
    }
    return flag;
}

// crea la tabla en el cliente
function Table_Cliente() {

    var html_Cliente;
    var StrCiudad;
    var ArraySplit;

    switch (estado) {

        case "buscar":
            html_Cliente = "<table id='TCliente' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='11' class='Grid_Head' >Datos Generales</th><th colspan='11' class='Grid_Head' >Relacion</th></tr><tr><th>Ver</th><th>Nit Empresa</th><th>Tipo de Documento</th><th>N° Documento</th><th>Digito De Verificación</th><th>Nombre Empresa</th><th>Tipo Persona</th><th>Regimen</th><th>Pais</th><th>Ciudad</th><th>Cliente</th><th>Avaluador</th><th>Organismo de Transito</th><th>Hacienda</th><th>Nit Multi-Empresa</th><th>Empleado</th><th>Asesor</th><th>Proveedor</th><th>Ent. Bancaria</th></tr></thead><tbody>";
            for (itemArray in ArrayCliente) {
                if (ArrayCliente[itemArray].Cliente_ID != 0) {

                    StrCiudad = ArrayCliente[itemArray].DescripCiudad
                    ArraySplit = StrCiudad.split("_");

                    html_Cliente += "<tr><td><select id='Select_" + ArrayCliente[itemArray].Cliente_ID + "' class='Opciones' onchange=\"Select_Option_Cliente(this,'" + ArrayCliente[itemArray].Index + "','');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayCliente[itemArray].Nit_ID + "</td><td>" + ArrayCliente[itemArray].DescripTypeDocument + "</td><td>" + ArrayCliente[itemArray].Document_ID + "</td><td>" + ArrayCliente[itemArray].Digito_Verificacion + "</td><td>" + ArrayCliente[itemArray].Nombre + " " + ArrayCliente[itemArray].Nombre_2 + " " + ArrayCliente[itemArray].Apellido_1 + " " + ArrayCliente[itemArray].Apellido_2 + "</td><td>" + ArrayCliente[itemArray].DescripTipoPersona + "</td><td>" + ArrayCliente[itemArray].DescripRegimen + "</td><td>" + ArrayCliente[itemArray].DescripPais + "</td><td>" + ArrayCliente[itemArray].DescripCiudad + "</td><td>" + ArrayCliente[itemArray].OP_Cliente + "</td><td>" + ArrayCliente[itemArray].OP_Avaluador + "</td><td>" + ArrayCliente[itemArray].OP_Transito + "</td><td>" + ArrayCliente[itemArray].OP_Hacienda + "</td><td>" + ArrayCliente[itemArray].OP_Empresa + "</td><td>" + ArrayCliente[itemArray].OP_Empleado + "</td><td>" + ArrayCliente[itemArray].OP_Asesor + "</td><td>" + ArrayCliente[itemArray].Other_1 + "</td><td>" + ArrayCliente[itemArray].Other_2 + "</td></tr>";

                }
            }
            break;

        case "modificar":
            html_Cliente = "<table id='TCliente' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='10' class='Grid_Head' >Datos Generales</th><th colspan='11' class='Grid_Head' >Relacion</th></tr><tr><th>Opcion</th><th>Nit Empresa</th><th>Tipo de Documento</th><th>N° Documento</th><th>Digito De Verificación</th><th>Nombre Empresa</th><th>Tipo Persona</th><th>Regimen</th><th>Pais</th><th>Ciudad</th><th>Cliente</th><th>Avaluador</th><th>Organismo de Transito</th><th>Hacienda</th><th>Nit Multi-Empresa</th><th>Empleado</th><th>Asesor</th><th>Proveedor</th><th>Ent. Bancaria</th></tr></thead><tbody>";
            for (itemArray in ArrayCliente) {
                if (ArrayCliente[itemArray].Document_ID != 0) {

                    StrCiudad = ArrayCliente[itemArray].DescripCiudad
                    ArraySplit = StrCiudad.split("_");

                    html_Cliente += "<tr><td><select id='Select_" + ArrayCliente[itemArray].Cliente_ID + "' class='Opciones' onchange=\"Select_Option_Cliente(this,'" + ArrayCliente[itemArray].Index + "','U');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Editar</option></select></td><td>" + ArrayCliente[itemArray].Nit_ID + "</td><td>" + ArrayCliente[itemArray].DescripTypeDocument + "</td><td>" + ArrayCliente[itemArray].Document_ID + "</td><td>" + ArrayCliente[itemArray].Digito_Verificacion + "</td><td>" + ArrayCliente[itemArray].Nombre + " " + ArrayCliente[itemArray].Nombre_2 + " " + ArrayCliente[itemArray].Apellido_1 + " " + ArrayCliente[itemArray].Apellido_2 + "</td><td>" + ArrayCliente[itemArray].DescripTipoPersona + "</td><td>" + ArrayCliente[itemArray].DescripRegimen + "</td><td>" + ArrayCliente[itemArray].DescripPais + "</td><td>" + ArrayCliente[itemArray].DescripCiudad + "</td><td>" + ArrayCliente[itemArray].OP_Cliente + "</td><td>" + ArrayCliente[itemArray].OP_Avaluador + "</td><td>" + ArrayCliente[itemArray].OP_Transito + "</td><td>" + ArrayCliente[itemArray].OP_Hacienda + "</td><td>" + ArrayCliente[itemArray].OP_Empresa + "</td><td>" + ArrayCliente[itemArray].OP_Empleado + "</td><td>" + ArrayCliente[itemArray].OP_Asesor + "</td><td>" + ArrayCliente[itemArray].Other_1 + "</td><td>" + ArrayCliente[itemArray].Other_2 + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Cliente = "<table id='TCliente' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='10' class='Grid_Head' >Datos Generales</th><th colspan='11' class='Grid_Head' >Relacion</th></tr><tr><th>Opcion</th><th>Nit Empresa</th><th>Tipo de Documento</th><th>N° Documento</th><th>Digito De Verificación</th><th>Nombre Empresa</th><th>Tipo Persona</th><th>Regimen</th><th>Pais</th><th>Ciudad</th><th>Cliente</th><th>Avaluador</th><th>Organismo de Transito</th><th>Hacienda</th><th>Nit Multi-Empresa</th><th>Empleado</th><th>Asesor</th><th>Proveedor</th><th>Ent. Bancaria</th></tr></thead><tbody>";
            for (itemArray in ArrayCliente) {
                if (ArrayCliente[itemArray].Cliente_ID != 0) {

                    StrCiudad = ArrayCliente[itemArray].DescripCiudad
                    ArraySplit = StrCiudad.split("_");

                    html_Cliente += "<tr><td><select id='Select_" + ArrayCliente[itemArray].Cliente_ID + "' class='Opciones' onchange=\"Select_Option_Cliente(this,'" + ArrayCliente[itemArray].Index + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='E'>Eliminar</option></select></td><td>" + ArrayCliente[itemArray].Nit_ID + "</td><td>" + ArrayCliente[itemArray].DescripTypeDocument + "</td><td>" + ArrayCliente[itemArray].Document_ID + "</td><td>" + ArrayCliente[itemArray].Digito_Verificacion + "</td><td>" + ArrayCliente[itemArray].Nombre + " " + ArrayCliente[itemArray].Nombre_2 + " " + ArrayCliente[itemArray].Apellido_1 + " " + ArrayCliente[itemArray].Apellido_2 + "</td><td>" + ArrayCliente[itemArray].DescripTipoPersona + "</td><td>" + ArrayCliente[itemArray].DescripRegimen + "</td><td>" + ArrayCliente[itemArray].DescripPais + "</td><td>" + ArrayCliente[itemArray].DescripCiudad + "</td><td>" + ArrayCliente[itemArray].OP_Cliente + "</td><td>" + ArrayCliente[itemArray].OP_Avaluador + "</td><td>" + ArrayCliente[itemArray].OP_Transito + "</td><td>" + ArrayCliente[itemArray].OP_Hacienda + "</td><td>" + ArrayCliente[itemArray].OP_Empresa + "</td><td>" + ArrayCliente[itemArray].OP_Empleado + "</td><td>" + ArrayCliente[itemArray].OP_Asesor + "</td><td>" + ArrayCliente[itemArray].Other_1 + "</td><td>" + ArrayCliente[itemArray].Other_2 + "</td></tr>";

                }
            }
            break;
    }

    html_Cliente += "</tbody></table>";
    $("#container_TCliente").html("");
    $("#container_TCliente").html(html_Cliente);

    $(".Opciones").click(function () {
    });

    $("#TCliente").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });

}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option_Cliente(Select_control, Index_Cliente, Type) {

    var Select_Value = $(Select_control).val();
    var Index_Pos = parseInt(Index_Cliente) - 1;

    switch (Select_Value) {
        case "M": //modificar
            Editar(Index_Pos, Type);
            break;

        case "V": //visualizar
            Ver(Index_Pos);
            break;

        case "E": //eliminar
            Eliminar(Index_Pos);
            break;

    }
}


// muestra el registro a ver
function Ver(Index_Cliente) {

    Editar(Index_Cliente, "V");

}

var StrPolitica;


function Editar(Index_Cliente, Type) {

    Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, ArrayCliente[Index_Cliente].Pais_ID, "Select_Ciudad", 1, ArrayCliente[Index_Cliente].Ciudad_ID);
    Charge_CatalogList_Matriz_Depend(Matrix_Pais, Matrix_Ciudad, ArrayCliente[Index_Cliente].Pais_ID, "Select_Ciudad_Doc", 1, ArrayCliente[Index_Cliente].DocCiudad);
    Change_Select_TPersona(ArrayCliente[Index_Cliente].TipoPersona, ArrayCliente[Index_Cliente].Regimen);

    if (Type == 'V') {
        $("#TablaDatos_D_Vista").css("display", "inline-table");
        $("#TablaDatos_D").css("display", "none");

    }
    else {
        $("#TablaDatos_D").css("display", "inline-table");
        $("#TablaDatos_D_Vista").css("display", "none");
    }

    $("#Controls").css("display", "inline-table");
    $("#Foto_Persona").css("display", "inline-table");

    $("#TablaConsulta").css("display", "none");

    OpcWordComplementos = Type;

    D_Nit = ArrayCliente[Index_Cliente].Nit_ID;
    D_TDocumento = ArrayCliente[Index_Cliente].TypeDocument_ID;
    D_Documento = ArrayCliente[Index_Cliente].Document_ID;
    editNit_ID = ArrayCliente[Index_Cliente].Nit_ID;
    editType_Document_ID = ArrayCliente[Index_Cliente].TypeDocument_ID;
    editDocument_ID = ArrayCliente[Index_Cliente].Document_ID;

    D_String_Contacto = ArrayCliente[Index_Cliente].Nombre;
    D_String_TDocumento = ArrayCliente[itemArray].DescripTypeDocument;

    $("#Select_EmpresaNit").val(ArrayCliente[Index_Cliente].Nit_ID);
    $("#Select_Documento").val(ArrayCliente[Index_Cliente].TypeDocument_ID);
    $("#Select_Pais").val(ArrayCliente[Index_Cliente].Pais_ID);
    $("#Select_TPersona").val(ArrayCliente[Index_Cliente].TipoPersona);
    $("#Select_Acceso").val(ArrayCliente[Index_Cliente].AccesoSistema);

    StrPolitica = ArrayCliente[Index_Cliente].Politica_ID;

    if (StrPolitica == 0)
        $("#Select_Politica").val("-1");
    else
        $("#Select_Politica").val(StrPolitica);

    $("#Txt_Ident").val(ArrayCliente[Index_Cliente].Document_ID);
    $("#TxtVerif").val(ArrayCliente[Index_Cliente].Digito_Verificacion);

    if (ArrayCliente[Index_Cliente].TypeDocument_ID == "2") {
        $("#TxtNombreNit").val(ArrayCliente[Index_Cliente].Nombre);
        $("#TR_Nit").css("display", "inline-block");
        $(".Desvanecer").css("display", "none");
        ValidatorCampos = 2;
    }
    else {
        $("#TxtNombre").val(ArrayCliente[Index_Cliente].Nombre);
        $(".Desvanecer").css("display", "inline-block");
        $(".TR_1").css("width", "150%");
        $("#TR_Nit").css("display", "none");
        ValidatorCampos = 1;
    }

    $("#TxtNombre_2").val(ArrayCliente[Index_Cliente].Nombre_2);
    $("#Txt_Ape_1").val(ArrayCliente[Index_Cliente].Apellido_1);
    $("#Txt_Ape_2").val(ArrayCliente[Index_Cliente].Apellido_2);
    $("#Txt_CodBank").val(ArrayCliente[Index_Cliente].Cod_Bank);

    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Select_Documento").attr("disabled", "disabled");

    $("#Txt_Nit").attr("disabled", "disabled");
    $("#Txt_Ident").attr("disabled", "disabled");
    $("#Complementos").css("display", "inline-table");
    $("#Admin_Anexos").css("display", "inline-table");

    transacionAjax_Foto('Foto', D_Nit, D_TDocumento, D_Documento, Index_Cliente, Type, ArrayCliente[Index_Cliente].Pais_ID);

    if (Type == "V") {
        $("#Btnguardar").css("display", "none");
        $("#BtnLimpiar").css("display", "none");

        ConsultaPersona(Index_Cliente);
        Disabled_Client();
    }
    else {
        $("#BtnLimpiar").css("display", "none");
        $("#Btnguardar").css("display", "inline-table");
        $("#Btnguardar").attr("value", "Actualizar");
    }

    $('.C_Chosen').trigger('chosen:updated');

    Charge_Combos_Depend_Nit(Matrix_Area, "Select_Area", ArrayCliente[Index_Cliente].Nit_ID, ArrayCliente[Index_Cliente].Area_ID);
    Charge_Combos_Depend_Nit(Matrix_Cargo, "Select_Cargo", ArrayCliente[Index_Cliente].Nit_ID, ArrayCliente[Index_Cliente].Cargo_ID);
    Charge_Combos_Depend_Nit(Matrix_Jefe, "Select_Jefe", ArrayCliente[Index_Cliente].Nit_ID, ArrayCliente[Index_Cliente].Document_ID_Jefe);
    Charge_Combos_Depend_Nit(Matrix_GrpDocumentos, "Select_GrpDocument", ArrayCliente[Index_Cliente].Nit_ID, ArrayCliente[Index_Cliente].GrpDocumentos);

}

//oculta los combos
function ConsultaPersona(Index_Cliente) {

    $("#Con_Documento").html(ArrayCliente[Index_Cliente].DescripTypeDocument);
    $("#Con_TPersona").html(ArrayCliente[Index_Cliente].DescripTipoPersona);
    $("#Con_Regimen").html(ArrayCliente[Index_Cliente].DescripRegimen);
    $("#Con_Area").html(ArrayCliente[Index_Cliente].DescripArea);
    $("#Con_Cargo").html(ArrayCliente[Index_Cliente].DescripCargo);
    $("#Con_Politica").html(ArrayCliente[Index_Cliente].DescripSeguridad);
    $("#Con_Ciudad").html(ArrayCliente[Index_Cliente].DescripCiudad);
    $("#Con_Pais").html(ArrayCliente[Index_Cliente].DescripPais);
    $("#Con_Acceso").html(ArrayCliente[Index_Cliente].AccesoSistema);

    $("#Con_Ident").html(ArrayCliente[Index_Cliente].Document_ID);
    $("#ConVerif").html(ArrayCliente[Index_Cliente].Digito_Verificacion);
    $("#Con_Consecutivo").html(ArrayCliente[Index_Cliente].Consecutivo);

    if (ArrayCliente[Index_Cliente].TypeDocument_ID == "2") {
        $("#ConNombreNit").html(ArrayCliente[Index_Cliente].Nombre);
        $("#TR_Nit_C").css("display", "inline-block");
        $(".Desvanecer").css("display", "none");
    }
    else {
        $("#ConNombre").html(ArrayCliente[Index_Cliente].Nombre);
        $(".Desvanecer").css("display", "inline-block");
        $(".TR_1").css("width", "150%");
        $("#TR_Nit_C").css("display", "none");
    }

    if (ArrayCliente[Index_Cliente].OP_Empresa == "S")
        $("#C_MultiEmpresa").css("display", "inline-block");
    else
        $("#C_MultiEmpresa").css("display", "none");

    $("#ConNombre_2").html(ArrayCliente[Index_Cliente].Nombre_2);
    $("#Con_Ape_1").html(ArrayCliente[Index_Cliente].Apellido_1);
    $("#Con_Ape_2").html(ArrayCliente[Index_Cliente].Apellido_2);
    $("#Con_CodBank").html(ArrayCliente[Index_Cliente].Cod_Bank);

    $("#Con_EmpresaNit").html(ArrayCliente[Index_Cliente].DescripEmpresa);
    $('#Con_GrpDocument').html(ArrayCliente[Index_Cliente].DescripGrupoDocumentos);
    $("#Con_Ciudad_Doc").html(ArrayCliente[Index_Cliente].DescripCiudadDoc);
    $("#Con_Jefe").html(ArrayCliente[Index_Cliente].DescripJefe);
}

//carga las relaciones ademas llama los combos que son dependientes
function Carga_Relaciones(Index_Cliente, Type) {

    if (ArrayCliente[Index_Cliente].OP_Cliente == "S")
        $("#Check_Cliente").prop("checked", true);
    else
        $("#Check_Cliente").prop("checked", false);

    if (ArrayCliente[Index_Cliente].OP_Avaluador == "S")
        $("#Check_Avaluador").prop("checked", true);
    else
        $("#Check_Avaluador").prop("checked", false);

    if (ArrayCliente[Index_Cliente].OP_Transito == "S")
        $("#Check_Transito").prop("checked", true);
    else
        $("#Check_Transito").prop("checked", false);

    if (ArrayCliente[Index_Cliente].OP_Hacienda == "S")
        $("#Check_Hacienda").prop("checked", true);
    else
        $("#Check_Hacienda").prop("checked", false);

    if (ArrayCliente[Index_Cliente].OP_Empresa == "S")
        $("#Check_MultiEmpresa").prop("checked", true);
    else
        $("#Check_MultiEmpresa").prop("checked", false);

    if (ArrayCliente[Index_Cliente].OP_Asesor == "S")
        $("#Check_Asesor").prop("checked", true);
    else
        $("#Check_Asesor").prop("checked", false);

    if (ArrayCliente[Index_Cliente].Other_1 == "S")
        $("#Check_Proveedor").prop("checked", true);
    else
        $("#Check_Proveedor").prop("checked", false);

    if (ArrayCliente[Index_Cliente].Other_2 == "S") {
        $("#Check_EntBancaria").prop("checked", true);
        $("#C_Banco").css("display", "inline-table");
        $("#C_Banco_Vista").css("display", "inline-table");

        if (Type == "V")
            $("#Anexos").css("display", "none");
        else
            $("#Anexos").css("display", "inline-table");

    }
    else {
        $("#Check_EntBancaria").prop("checked", false);
        $("#C_Banco").css("display", "none");
        $("#C_Banco_Vista").css("display", "none");
    }

    if (ArrayCliente[Index_Cliente].OP_Empleado == "S") {
        $("#Check_Empleado").prop("checked", true);
        $("#C_Empleado").css("display", "inline-table");
        $("#C_Empleado_Vista").css("display", "inline-table");

        if (Type == "V")
            $("#Anexos").css("display", "none");
        else
            $("#Anexos").css("display", "inline-table");


    }
    else {
        $("#Check_Empleado").prop("checked", false);
        $("#C_Empleado").css("display", "none");
        $("#C_Empleado_Vista").css("display", "none");
    }

}

//muestra el registro a eliminar
function Eliminar(Index_Cliente) {

    D_Nit = ArrayCliente[Index_Cliente].Nit_ID;
    D_TDocumento = ArrayCliente[Index_Cliente].TypeDocument_ID;
    D_Documento = ArrayCliente[Index_Cliente].Document_ID;

    editNit_ID = ArrayCliente[Index_Cliente].Nit_ID;
    editType_Document_ID = ArrayCliente[Index_Cliente].TypeDocument_ID;
    editDocument_ID = ArrayCliente[Index_Cliente].Document_ID;

    D_String_Contacto = ArrayCliente[Index_Cliente].Nombre;

    $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
    $("#dialog_eliminar").dialog("open");

}


//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_Documento").val("-1");
    $("#Select_Pais").val("-1");
    $("#Select_Ciudad").val("-1");
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Ciudad_Doc").val("-1");

    $("#Txt_Ident").val("");
    $("#TxtVerif").val("");
    $("#TxtNombre").val("");
    $("#TxtNombreNit").val("");

    $("#TxtNombre_2").val("");
    $("#Txt_Ape_1").val("");
    $("#Txt_Ape_2").val("");
    $("#Txt_CodBank").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");


    $("#Check_Cliente").prop("checked", false);
    $("#Check_Avaluador").prop("checked", false);
    $("#Check_Transito").prop("checked", false);
    $("#Check_Hacienda").prop("checked", false);
    $("#Check_MultiEmpresa").prop("checked", false);
    $("#Check_Empleado").prop("checked", false);
    $("#Check_Asesor").prop("checked", false);
    $("#Check_Proveedor").prop("checked", false);
    $("#Check_EntBancaria").prop("checked", false);

    $("#Select_TPersona").val("-1");
    $("#Select_Regimen").val("-1");
    $("#Select_Acceso").val("N");
    $("#Select_GrpDocument").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}



//verifica el numero de verificacion DIAN
function Verifica() {
    $("#Txt_Ident").blur(function () {

        var DigitoVerificado = DigitoVerificacion($("#Txt_Ident").val());
        $("#TxtVerif").val(DigitoVerificado);

    });
}



//bloquea controles cliente
function Disabled_Client() {

    $("#Select_Documento").attr("disabled", "disabled");
    $("#Select_Pais").attr("disabled", "disabled");
    $("#Select_Ciudad").attr("disabled", "disabled");
    $("#Select_EmpresaNit").attr("disabled", "disabled");
    $("#Select_Ciudad_Doc").attr("disabled", "disabled");
    $("#Txt_Ident").attr("disabled", "disabled");
    $("#TxtVerif").attr("disabled", "disabled");
    $("#TxtNombre").attr("disabled", "disabled");
    $("#TxtNombreNit").attr("disabled", "disabled");
    $("#TxtNombre_2").attr("disabled", "disabled");
    $("#Txt_Ape_1").attr("disabled", "disabled");
    $("#Txt_Ape_2").attr("disabled", "disabled");

    $("#Select_TPersona").attr("disabled", "disabled");
    $("#Select_Regimen").attr("disabled", "disabled");

    $("#Txt_CodBank").attr("disabled", "disabled");
    $("#Select_Area").attr("disabled", "disabled");
    $("#Select_Cargo").attr("disabled", "disabled");
    $("#Select_Jefe").attr("disabled", "disabled");
    $("#Select_Politica").attr("disabled", "disabled");

    $("#Check_Cliente").attr("disabled", "disabled");
    $("#Check_Avaluador").attr("disabled", "disabled");
    $("#Check_Transito").attr("disabled", "disabled");
    $("#Check_Hacienda").attr("disabled", "disabled");
    $("#Check_MultiEmpresa").attr("disabled", "disabled");
    $("#Check_Empleado").attr("disabled", "disabled");
    $("#Check_Asesor").attr("disabled", "disabled");
    $("#Check_Proveedor").attr("disabled", "disabled");
    $("#Check_EntBancaria").attr("disabled", "disabled");

    $("#Select_Acceso").attr("disabled", "disabled");
    $("#Select_GrpDocument").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated');

}

//Des-bloquea controles cliente
function Enabled_Client() {

    $("#Select_Documento").removeAttr("disabled");
    $("#Select_Pais").removeAttr("disabled");
    $("#Select_Ciudad").removeAttr("disabled");
    $("#Select_EmpresaNit").removeAttr("disabled");
    $("#Select_Ciudad_Doc").removeAttr("disabled");
    $("#Txt_Ident").removeAttr("disabled");
    $("#TxtVerif").removeAttr("disabled");
    $("#TxtNombre").removeAttr("disabled");
    $("#TxtNombreNit").removeAttr("disabled");
    $("#TxtNombre_2").removeAttr("disabled");
    $("#Txt_Ape_1").removeAttr("disabled");
    $("#Txt_Ape_2").removeAttr("disabled");

    $("#Select_TPersona").removeAttr("disabled");
    $("#Select_Regimen").removeAttr("disabled");

    $("#Txt_CodBank").removeAttr("disabled");
    $("#Select_Area").removeAttr("disabled");
    $("#Select_Cargo").removeAttr("disabled");
    $("#Select_Jefe").removeAttr("disabled");
    $("#Select_Politica").removeAttr("disabled");

    $("#Check_Cliente").removeAttr("disabled");
    $("#Check_Avaluador").removeAttr("disabled");
    $("#Check_Transito").removeAttr("disabled");
    $("#Check_Hacienda").removeAttr("disabled");
    $("#Check_MultiEmpresa").removeAttr("disabled");
    $("#Check_Empleado").removeAttr("disabled");
    $("#Check_Asesor").removeAttr("disabled");
    $("#Check_Proveedor").removeAttr("disabled");
    $("#Check_EntBancaria").removeAttr("disabled");

    $("#Select_Acceso").removeAttr("disabled");
    $("#Select_GrpDocument").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');

}


//habilita barra de complementos
function Complemento() {
    if (OpcComplementos == 0) {
        $("#Container_Complementos").css("display", "inline-table");
        $("#T_option").css("display", "inline-table");
        OpcComplementos = 1;
    }
    else {
        $('#Container_Complementos').fadeOut("slow");
        $("#T_option").fadeOut("slow");
        OpcComplementos = 0;
    }
}

//cierra  barra de complementos
function ExitComplementos() {
    $("#form1").click(function () {
        $("#T_option").fadeOut("slow");
        $('#Container_Complementos').fadeOut("slow");
        OpcComplementos = 0;
    });
}

//redirecciona al modulo selecionado
function BlockAnexos(Modulo) {

    switch (Modulo) {

        case "Banco":
            String_Nombre();
            Bancos(OpcWordComplementos);
            break;

        case "Direcciones":
            String_Nombre();
            Direcciones(OpcWordComplementos);
            break;

        case "Documento":
            String_Nombre();
            Documentos(OpcWordComplementos);
            break;

        case "DocumentoAutrizado":
            DocumentosAutorizados(OpcWordComplementos);
            break;

    }

}

//revicion y carge de combos paises
function V2() {
    for (e = 0; e < A.length; e++) {
        i = 0;
        for (i = 0; i < A_0.length; i++) {
            if (A[e] - 1 == A_0[i]) {
                var Val_F = A_0[i + 1] + e;
                Matrix_Pais[P[e]].IndexFinal = Val_F;
            }
        }
    }

    charge_CatalogList(Matrix_Pais, "Select_Pais", 1);
    charge_CatalogList(Matrix_Pais, "Select_Pais_D", 1);
}

//limpia los campos
function BtnLimpia() {
    Clear();
    Enabled_Client();
    $("#Anexos").css("display", "none");
}
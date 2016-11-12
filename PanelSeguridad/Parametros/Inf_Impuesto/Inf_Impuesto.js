/*--------------- region de variables globales --------------------*/
var ArrayInf_Impuesto = [];
var ArrayCombo = [];
var ArrayPaises = [];
var ArrayCiudades = [];
var ArrayImpuesto_Gasto = [];
var ArrayCliente = [];
var ArrayCliente_H = [];
var ArrayDocument = [];
var ArrayClienteView = [];
var ArrayDirecciones = [];

var estado;
var editCod_ID;
var editCiudad_ID;
var editInf_Impuesto_ID;
var editCliente;
var editTypeDocument;
var editDocument;

var D_Nit;
var D_TDocumento;
var D_String_TDocumento;
var D_Documento;
var D_String_Contacto;

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');
    transacionAjax_Impuesto('Impuesto');
    transacionAjax_Cliente('Cliente');

    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaPais").css("display", "none");
    $("#TablaCiudad").css("display", "none");
    $("#TablaImpuesto").css("display", "none");
    $("#TablaMuticliente").css("display", "none");
    $("#TablaCliente").css("display", "none");
    $("#TablaConsulta").css("display", "none");
    $("#controls_X").css("display", "none");



    //funcion para las ventanas emergentes
    $("#dialog").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#dialog_eliminar").dialog({
        dialogClass: "Dialog_Sasif",
        modal: true,
        autoOpen: false
    });

    $("#Dialog_Visualiza").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 500,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_VisualizaCliente").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 600,
        height: 550,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_Direcciones").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
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
        width: 780,
        height: 520,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $(function () {
        $("#Acordeon_Dat").accordion({
            heightStyle: "content"
        });
    });

    Change_Select_pais();
    Change_Select_Nit();

});

//carga el combo de paises
function Change_Select_pais() {
    $("#Select_Pais").change(function () {
        var Str_pais = $("#Select_Pais option:selected").html();
        var SplitPais = Str_pais.split(" - ");
        $("#Td_P_ID").html(SplitPais[0]);
        $("#Td_P_Descrip").html(SplitPais[1]);

        $('#Select_Ciudad').empty();
        transacionAjax_Ciudad('Ciudad', SplitPais[0]);

    });
}

//carga el combo de clientes hijo
function Change_Select_Nit() {

    $("#Select_Cliente").change(function () {

        var Str_Empresa = $("#Select_Cliente option:selected").html();
        var SplitEmpresa = Str_Empresa.split(" - ");
        $("#Td_Empresa_ID").html(SplitEmpresa[0]);
        $("#Td_Empresa_Descrip").html(SplitEmpresa[1]);

        var TD_ID = this.value;
        $('#Select_Cliente_H').empty();
        transacionAjax_Cliente_H('Cliente_H', TD_ID);

    });

}

//carga las vistas del hijo cliente
function Change_Select_H_Cliente() {
    $("#Select_Cliente_H").change(function () {
        var Str_H_cliente = $("#Select_Cliente_H option:selected").html();
        var SplitCliente = Str_H_cliente.split(" - ");
        editTypeDocument = SplitCliente[0];
        editDocument = SplitCliente[1];
    });
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaPais").css("display", "inline-table");
            $("#TablaCiudad").css("display", "inline-table");
            $("#TablaImpuesto").css("display", "inline-table");
            $("#TablaMuticliente").css("display", "inline-table");
            $("#TablaCliente").css("display", "inline-table");
            $("#controls_X").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;
            
            for (item in ArrayPaises) {
                if (ArrayPaises[item].ID == 169) {
                    var Str_pais = ArrayPaises[item].descripcion;
                    var SplitPais = Str_pais.split(" - ");
                    $("#Td_P_ID").html(SplitPais[0]);
                    $("#Td_P_Descrip").html(SplitPais[1]);

                }
            }

            break;

        case "buscar":
            $("#TablaPais").css("display", "none");
            $("#TablaCiudad").css("display", "none");
            $("#TablaImpuesto").css("display", "none");
            $("#TablaMuticliente").css("display", "none");
            $("#TablaCliente").css("display", "none");

            $("#controls_X").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TInf_Impuesto").html("");
            estado = opcion;
            Clear();
            break;

        case "eliminar":
            $("#TablaPais").css("display", "none");
            $("#TablaCiudad").css("display", "none");
            $("#TablaImpuesto").css("display", "none");
            $("#TablaMuticliente").css("display", "none");
            $("#TablaCliente").css("display", "none");
            $("#controls_X").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TInf_Impuesto").html("");
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
        transacionAjax_Inf_Impuesto("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Inf_Impuesto("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Inf_Impuesto_create("crear");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Inf_Impuesto_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_Pais").val();
    var Campo_2 = $("#Select_Ciudad").val();
    var Campo_3 = $("#Select_Impuesto").val();
    var Campo_4 = $("#Select_Cliente").val();
    var Campo_5 = $("#Select_Cliente_H").val();

    var validar = 0;

    if (Campo_5 == "-1" || Campo_4 == "-1" || Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1")
            $("#ImgID").css("display", "inline-table");
        else
            $("#ImgID").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_3 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");

        if (Campo_4 == "-1")
            $("#Img3").css("display", "inline-table");
        else
            $("#Img3").css("display", "none");

        if (Campo_5 == "-1")
            $("#Img5").css("display", "inline-table");
        else
            $("#Img5").css("display", "none");


    }
    else {
        $("#ImgID").css("display", "none");
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }
    return validar;
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
function Table_Inf_Impuesto() {

    switch (estado) {

        case "buscar":
            Tabla_consulta();
            break;

        case "eliminar":
            Tabla_eliminar();
            break;
    }

}

//grid con el boton eliminar
function Tabla_eliminar() {
    var html_Inf_Impuesto = "<table id='TInf_Impuesto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Cliente</th><th>Eliminar</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Nit Responsable</th><th>Cliente</th></tr></thead><tbody>";
    for (itemArray in ArrayInf_Impuesto) {
        if (ArrayInf_Impuesto[itemArray].Inf_Impuesto_ID != 0) {

            var StrCiudad = ArrayInf_Impuesto[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            html_Inf_Impuesto += "<tr><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayInf_Impuesto[itemArray].Cod_ID + "','" + ArrayInf_Impuesto[itemArray].Ciudad_ID + "','" + ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID + "', '" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\"></input></td><td><span class='cssToolTip_ver'><img alt='Direc' height='20px' width='20px' id='Img18' src='../../images/search.png' onclick=\"ShearCliente('" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\" /><span>Consulta Cliente</span></span></td><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayInf_Impuesto[itemArray].Cod_ID + "','" + ArrayInf_Impuesto[itemArray].Ciudad_ID + "','" + ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID + "', '" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\"></input></td><td>" + ArrayInf_Impuesto[itemArray].DescripCod + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripCiudad + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto + "</td><td>" + ArrayInf_Impuesto[itemArray].Nit_ID + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripNitResponsable + "</td></tr>";
        }
    }
    html_Inf_Impuesto += "</tbody></table>";
    $("#container_TInf_Impuesto").html("");
    $("#container_TInf_Impuesto").html(html_Inf_Impuesto);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TInf_Impuesto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Pais, index_Ciudad, index_Inf_Impuesto, index_Nit, index_TypeDocument, index_Document) {

    for (itemArray in ArrayInf_Impuesto) {
        if (index_Pais == ArrayInf_Impuesto[itemArray].Cod_ID && index_Ciudad == ArrayInf_Impuesto[itemArray].Ciudad_ID && index_Inf_Impuesto == ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID && index_Nit == ArrayInf_Impuesto[itemArray].Nit_ID && index_TypeDocument == ArrayInf_Impuesto[itemArray].TypeDocument_ID && index_Document == ArrayInf_Impuesto[itemArray].Document_ID) {

            editCod_ID = ArrayInf_Impuesto[itemArray].Cod_ID;
            editCiudad_ID = ArrayInf_Impuesto[itemArray].Ciudad_ID;
            editInf_Impuesto_ID = ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID;
            editCliente = ArrayInf_Impuesto[itemArray].Nit_ID;
            editTypeDocument = ArrayInf_Impuesto[itemArray].TypeDocument_ID;
            editDocument = ArrayInf_Impuesto[itemArray].Document_ID;

            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Inf_Impuesto = "<table id='TInf_Impuesto' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Cliente</th><th>Pais</th><th>Ciudad</th><th>Impuesto</th><th>Nit Responsable</th><th>Cliente</th></tr></thead><tbody>";
    for (itemArray in ArrayInf_Impuesto) {
        if (ArrayInf_Impuesto[itemArray].Inf_Impuesto_ID != 0) {

            var StrCiudad = ArrayInf_Impuesto[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            html_Inf_Impuesto += "<tr><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayInf_Impuesto[itemArray].Cod_ID + "','" + ArrayInf_Impuesto[itemArray].Ciudad_ID + "','" + ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID + "', '" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\"></input></td><td><span class='cssToolTip_ver'><img alt='Direc' height='20px' width='20px' id='Img18' src='../../images/search.png' onclick=\"ShearCliente('" + ArrayInf_Impuesto[itemArray].Nit_ID + "', '" + ArrayInf_Impuesto[itemArray].TypeDocument_ID + "', '" + ArrayInf_Impuesto[itemArray].Document_ID + "')\" /><span>Consulta Cliente</span></span></td><td>" + ArrayInf_Impuesto[itemArray].DescripCod + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripCiudad + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto + "</td><td>" + ArrayInf_Impuesto[itemArray].Nit_ID + "</td><td>" + ArrayInf_Impuesto[itemArray].DescripNitResponsable + "</td></tr>";
        }
    }
    html_Inf_Impuesto += "</tbody></table>";
    $("#container_TInf_Impuesto").html("");
    $("#container_TInf_Impuesto").html(html_Inf_Impuesto);

    $(".Ver").click(function () {
    });

    $("#TInf_Impuesto").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_Pais").val("-1");
    $("#Select_Impuesto").val("-1");
    $("#Select_Cliente").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('#Select_Ciudad').empty();
    $('#Select_Cliente_H').empty();

    $("#Select_Pais").trigger("liszt:updated");
    $("#Select_Ciudad").trigger("liszt:updated");
    $("#Select_Impuesto").trigger("liszt:updated");
    $("#Select_Cliente").trigger("liszt:updated");
    $("#Select_Cliente_H").trigger("liszt:updated");

    $('.C_Chosen').trigger('chosen:updated');

}

// muestra el registro a ver
function Ver(index_Pais, index_Ciudad, index_Inf_Impuesto, index_Nit, index_TypeDocument, index_Document) {

    for (itemArray in ArrayInf_Impuesto) {
        if (index_Pais == ArrayInf_Impuesto[itemArray].Cod_ID && index_Ciudad == ArrayInf_Impuesto[itemArray].Ciudad_ID && index_Inf_Impuesto == ArrayInf_Impuesto[itemArray].Impuesto_Gasto_ID && index_Nit == ArrayInf_Impuesto[itemArray].Nit_ID && index_TypeDocument == ArrayInf_Impuesto[itemArray].TypeDocument_ID && index_Document == ArrayInf_Impuesto[itemArray].Document_ID) {

            var StrCiudad = ArrayInf_Impuesto[itemArray].DescripCiudad
            var ArraySplit = StrCiudad.split("_");

            editCliente = ArrayInf_Impuesto[itemArray].Nit_ID;
            editTypeDocument = ArrayInf_Impuesto[itemArray].TypeDocument_ID;
            editDocument = ArrayInf_Impuesto[itemArray].Document_ID;

            $("#V_Pais").html(ArrayInf_Impuesto[itemArray].DescripCod);
            $("#V_Ciudad").html(ArraySplit[0]);
            $("#V_Municipio").html(ArraySplit[1]);
            $("#V_Impuesto").html(ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto);

            $("#V_NitResponsable").html(ArrayInf_Impuesto[itemArray].Nit_ID);
            $("#V_Cliente").html(ArrayInf_Impuesto[itemArray].DescripNitResponsable);
            $("#V_TypeDocument").html(ArrayInf_Impuesto[itemArray].DescripTypeDocument);
            $("#V_Document").html(ArrayInf_Impuesto[itemArray].Document_ID);

            $("#Dialog_Visualiza").dialog("option", "title", "Impuesto ó Gasto: " + ArrayInf_Impuesto[itemArray].DescripImpuesto_Gasto);

        }
    }
    $("#Dialog_Visualiza").dialog("open");
}


/*----------------------------------------------------------------------------------------------------------------------------------*/
/*                          CONSULTA CLIENTES                                                   */
/*----------------------------------------------------------------------------------------------------------------------------------*/

function ShearCliente(Nit, TD, D) {

    ArrayClienteView = [];

    if (Nit == "Nit") {

        Nit = editCliente;
        TD = editTypeDocument;
        D = editDocument;
    }

    transacionAjax_Read_Cliente("Read_Cliente", Nit, TD, D);

}


// muestra el registro a ver
function VerCliente(index_Nit, index_TDocumento, index_Documento) {

    D_Nit = index_Nit;
    D_TDocumento = index_TDocumento;
    D_Documento = index_Documento;

    for (itemArray in ArrayClienteView) {
        if (index_Nit == ArrayClienteView[itemArray].Nit_ID && index_TDocumento == ArrayClienteView[itemArray].TypeDocument_ID && index_Documento == ArrayClienteView[itemArray].Document_ID) {

            var StrCiudad = ArrayClienteView[itemArray].DescripCiudad;
            var ArraySplit = StrCiudad.split("_");

            D_String_Contacto = ArrayClienteView[itemArray].Nombre;
            D_String_TDocumento = ArrayClienteView[itemArray].DescripTypeDocument;

            $("#V_Nombre").html(ArrayClienteView[itemArray].Nombre);
            $("#V_TDocumento").html(ArrayClienteView[itemArray].DescripTypeDocument);
            $("#V_Documento").html(ArrayClienteView[itemArray].Document_ID);
            $("#V_Nit").html(ArrayClienteView[itemArray].Nit_ID);
            $("#V_Digito").html(ArrayClienteView[itemArray].Digito_Verificacion);
            $("#V_Municipio_2").html(StrCiudad);

            $("#V_Op_Cliente").html(ArrayClienteView[itemArray].OP_Cliente);
            $("#V_Op_Avaluador").html(ArrayClienteView[itemArray].OP_Avaluador);
            $("#V_Op_Transito").html(ArrayClienteView[itemArray].OP_Transito);
            $("#V_Op_Hacienda").html(ArrayClienteView[itemArray].OP_Hacienda);
            $("#V_Op_Empresa").html(ArrayClienteView[itemArray].OP_Empresa);
            $("#V_Op_Empleado").html(ArrayClienteView[itemArray].OP_Empleado);
            $("#V_Op_Asesor").html(ArrayClienteView[itemArray].OP_Asesor);
            $("#V_Op_Otro_1").html(ArrayClienteView[itemArray].Other_1);

            $("#Dialog_VisualizaCliente").dialog("option", "title", "Cliente: " + ArrayClienteView[itemArray].Nombre);

        }
    }
    $("#Dialog_VisualizaCliente").dialog("open");
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        GRID PRINCIPAL DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//el llamado para insertar modificar o eliminar la direcciones
function Direcciones(Option_Adress) {
    $("#Dialog_Direcciones").dialog("open");
    $("#Dialog_Direcciones").dialog("option", "title", "Direcciones ");

    switch (Option_Adress) {
        case "Read":
            $("#Txt_Nit_V").val(D_Nit);
            $("#Txt_TypeIden_V").val(D_String_TDocumento);
            $("#Txt_Ident_V").val(D_Documento);
            $("#Txt_Nit_V_2").val(D_Nit);
            $("#Txt_TypeIden_V_2").val(D_String_TDocumento);
            $("#Txt_Ident_V_2").val(D_Documento);

            transacionAjax_allAdress('R_ead_Adress', D_Nit, D_TDocumento, D_Documento, Option_Adress);

            break;


    }


}


//grid con el boton eliminar
function Tabla_General(Opc_Link) {
    var html = "";
    var contador = 0;

    switch (Opc_Link) {
        case "Read":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Consecutivo</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;

        case "Default":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones <span class='cssToolTip_ver'><img alt='Direc' class='AddDirec' onclick=\"AddDirecion()\" id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Nueva Dirección</span></span></th><th>Consecutivo</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;
    }

    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].TypeDoc_ID != "") {

            switch (Opc_Link) {
                case "Read":
                    if (estado == "eliminar")
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;

                case "Default":
                    html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Modificar</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;
            }

        }
        contador += 1;
    }

    html += "</tbody></table>";
    $("#container_direccion").html("");
    $("#container_direccion").html(html);

    $(".AddDirec").click(function () {
    });

    $("#TDireccion").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option(Select_control, Index_Adress) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {

        case "V": //visualizar
            ReadDirecion(Index_Adress);
            Disabled_Direccion();
            break;

    }

}

//funcion que abre la ventana para la Actualizacion de direccion
function ReadDirecion(Direccion_Consecutivo) {

    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Dirección  ");
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#BtnAdd").attr("value", "Salir");

    Search_Adress(Direccion_Consecutivo);
}

//CIERRA LA VENTANA EMERGENTE
function ReadView_Adress() {
    $("#Dialog_C_R_U_D").dialog("close");
}

//busca los datos por el consecutivo seleccionado
function Search_Adress(Index_Adress) {

    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].Consecutivo == Index_Adress) {

            $("#TxtContact").val(ArrayDirecciones[itemArray].Contacto)
            $("#TxtCorreo_1").val(ArrayDirecciones[itemArray].Correo_1)
            $("#TxtCorreo_2").val(ArrayDirecciones[itemArray].Correo_2)
            $("#TxtDireccion").val(ArrayDirecciones[itemArray].Direccion)
            $("#TxtWeb").val(ArrayDirecciones[itemArray].PaginaWeb)
            $("#TxtTel1").val(ArrayDirecciones[itemArray].Telefono_1)
            $("#TxtTel2").val(ArrayDirecciones[itemArray].Telefono_2)
            $("#TxtTel3").val(ArrayDirecciones[itemArray].Telefono_3)
            $("#TxtTel4").val(ArrayDirecciones[itemArray].Telefono_4)
        }
    }
}

//bloquear campos de direcciones
function Disabled_Direccion() {
    $("#TxtContact").attr("disabled", "disabled");
    $("#TxtCorreo_1").attr("disabled", "disabled");
    $("#TxtCorreo_2").attr("disabled", "disabled");
    $("#TxtDireccion").attr("disabled", "disabled");
    $("#TxtWeb").attr("disabled", "disabled");
    $("#TxtTel1").attr("disabled", "disabled");
    $("#TxtTel2").attr("disabled", "disabled");
    $("#TxtTel3").attr("disabled", "disabled");
    $("#TxtTel4").attr("disabled", "disabled");
    $("#Img15").css("display", "none");
    $("#Img16").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
}


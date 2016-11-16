/*--------------- region de variables globales --------------------*/
var ArrayProductos = [];
var ArrayCombo = [];
var ArrayTipo_P = [];
var ArraySubTipo_P = [];
var ArrayTipo_A = [];
var ArraySubTipo_A = [];
var ArrayTransaccion = [];
var ArrayEmpresaNit = [];

var ProductoID;
var edit_TipoP_ID;
var edit_TipoA_ID;
var edit_SubTipoP_ID;
var edit_SubTipoA_ID;
var edit_Crea_ID;
var edit_Mod_ID;
var edit_Ret_ID;

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Tipo_P('Tipo_Pro');
    transacionAjax_Tipo_A('Tipo_Act');
    transacionAjax_Transaccion('Transaccion');
    transacionAjax_EmpresaNit('Cliente')

    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img3").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");


    $("#TablaConsulta").css("display", "none");

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


    $("#Dialog_Productos").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 620,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    Change_Select_Product();
    Change_Select_Active();

});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#Dialog_Productos").dialog("option", "title", "Crear Producto");
            $("#Dialog_Productos").dialog("open");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Select_EmpresaNit").removeAttr("disabled");
            
            $("#Btnguardar").attr("value", "Guardar");
            Enabled_Controls();
            ResetError();
            Clear();
            estado = opcion;
            $('.C_Chosen').trigger('chosen:updated');

            break;

        case "buscar":
            $("#Dialog_Productos").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TProductos").html("");
            estado = opcion;
            Enabled_Controls();
            Clear();
            break;

        case "modificar":
            $("#Dialog_Productos").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPorcen_Descuentos").html("");
            estado = opcion;
            Enabled_Controls();
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#Dialog_Productos").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TProductos").html("");
            estado = opcion;
            Enabled_Controls();
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
        transacionAjax_Productos("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Productos("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Productos_create("crear");
        }
        else {
            transacionAjax_Productos_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Productos_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_Tipo_P").val();
    var Campo_2 = $("#Select_Tipo_A").val();
    var Campo_3 = $("#Select_EmpresaNit").val();

    var validar = 0;

    if (Campo_3 == "-1" || Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_3 == "-1") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img3").css("display", "none");
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
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
function Table_Productos() {

    switch (estado) {

        case "buscar":
            Tabla_consulta();
            break;

        case "modificar":
            Tabla_modificar();
            break;

        case "eliminar":
            Tabla_eliminar();
            break;
    }

}

//grid con el boton eliminar
function Tabla_modificar() {
    var html_Productos = "<table id='TProductos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Editar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayProductos) {
        if (ArrayProductos[itemArray].Producto_ID != 0) {
            html_Productos += "<tr id= 'TProductos_" + ArrayProductos[itemArray].Producto_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayProductos[itemArray].Producto_ID + "','" + ArrayProductos[itemArray].Nit_ID + "')\"></input></td><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayProductos[itemArray].Producto_ID + "','" + ArrayProductos[itemArray].Nit_ID + "')\"></input></td><td>" + ArrayProductos[itemArray].Nit_ID + "</td><td>" + ArrayProductos[itemArray].Producto_ID + "</td><td>" + ArrayProductos[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Productos += "</tbody></table>";
    $("#container_TProductos").html("");
    $("#container_TProductos").html(html_Productos);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TProductos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Editar(index_Tipo_ID, index_Nit) {

    Enabled_Controls();

    for (itemArray in ArrayProductos) {
        if (index_Tipo_ID == ArrayProductos[itemArray].Producto_ID && index_Nit == ArrayProductos[itemArray].Nit_ID) {

            $("#Btnguardar").attr("value", "Actualizar");

            editNit_ID = ArrayProductos[itemArray].Nit_ID;

            ProductoID = ArrayProductos[itemArray].Producto_ID;
            edit_TipoP_ID = ArrayProductos[itemArray].TP_ID;
            edit_TipoA_ID = ArrayProductos[itemArray].TA_ID;
            edit_SubTipoP_ID = ArrayProductos[itemArray].STP_ID;
            edit_SubTipoA_ID = ArrayProductos[itemArray].STA_ID;
            edit_Crea_ID = ArrayProductos[itemArray].Tran_ID_1;
            edit_Mod_ID = ArrayProductos[itemArray].Tran_ID_2;
            edit_Ret_ID = ArrayProductos[itemArray].Tran_ID_3;


            if (edit_Ret_ID == 0)
                $("#Select_Ret").val("-1");
            else
                $("#Select_Ret").val(edit_Ret_ID);

            if (edit_Mod_ID == 0)
                $("#Select_Mod").val("-1");
            else
                $("#Select_Mod").val(edit_Mod_ID);

            if (edit_Crea_ID == 0)
                $("#Select_Crea").val("-1");
            else
                $("#Select_Crea").val(edit_Crea_ID);


            if (edit_TipoP_ID == 0)
                $("#Select_Tipo_P").val("-1");
            else
                $("#Select_Tipo_P").val(edit_TipoP_ID);


            $("#Select_Tipo_P").trigger("change");

            if (edit_SubTipoP_ID != 0) {
                $("#Select_SubTipo_P").val(edit_SubTipoP_ID);
                setTimeout("refresh_STP(" + edit_SubTipoP_ID + ");", 700);
            }
            else {
                $("#Select_SubTipo_P").val("-1");
            }


            if (edit_TipoA_ID == 0)
                $("#Select_Tipo_A").val("-1");
            else
                $("#Select_Tipo_A").val(edit_TipoA_ID);

            $("#Select_Tipo_A").trigger("change");

            if (edit_SubTipoA_ID != 0) {
                $("#Select_SubTipo_A").val(edit_SubTipoA_ID);
                setTimeout("refresh_STA(" + edit_SubTipoA_ID + ");", 700);
            }
            else {
                $("#Select_SubTipo_A").val("-1");
            }


            $("#Txt_ID").val(ArrayProductos[itemArray].Producto_ID);
            $("#TxtDescripcion").val(ArrayProductos[itemArray].Descripcion);

            $("#TxtCuenta_1").val(ArrayProductos[itemArray].Cuenta_1);
            $("#TxtCuenta_2").val(ArrayProductos[itemArray].Cuenta_2);
            $("#TxtCuenta_3").val(ArrayProductos[itemArray].Cuenta_3);
            $("#TxtCuenta_4").val(ArrayProductos[itemArray].Cuenta_4);
            $("#TxtCuenta_5").val(ArrayProductos[itemArray].Cuenta_5);
            $("#TxtCuenta_6").val(ArrayProductos[itemArray].Cuenta_6);
            $("#TxtCuenta_7").val(ArrayProductos[itemArray].Cuenta_7);
            $("#TxtCuenta_8").val(ArrayProductos[itemArray].Cuenta_8);
            $("#TxtCuenta_9").val(ArrayProductos[itemArray].Cuenta_9);
            $("#TxtCuenta_10").val(ArrayProductos[itemArray].Cuenta_10);

            $("#TxtCuenta_11").val(ArrayProductos[itemArray].Cuenta_11);
            $("#TxtCuenta_12").val(ArrayProductos[itemArray].Cuenta_12);
            $("#TxtCuenta_13").val(ArrayProductos[itemArray].Cuenta_13);
            $("#TxtCuenta_14").val(ArrayProductos[itemArray].Cuenta_14);
            $("#TxtCuenta_15").val(ArrayProductos[itemArray].Cuenta_15);
            $("#TxtCuenta_16").val(ArrayProductos[itemArray].Cuenta_16);
            $("#TxtCuenta_17").val(ArrayProductos[itemArray].Cuenta_17);
            $("#TxtCuenta_18").val(ArrayProductos[itemArray].Cuenta_18);
            $("#TxtCuenta_19").val(ArrayProductos[itemArray].Cuenta_19);
            $("#TxtCuenta_20").val(ArrayProductos[itemArray].Cuenta_20);
            $("#TxtCuenta_21").val(ArrayProductos[itemArray].Cuenta_21);
            $("#TxtCuenta_22").val(ArrayProductos[itemArray].Cuenta_22);
            $("#TxtCuenta_23").val(ArrayProductos[itemArray].Cuenta_23);
            $("#TxtCuenta_24").val(ArrayProductos[itemArray].Cuenta_24);
            $("#TxtCuenta_25").val(ArrayProductos[itemArray].Cuenta_25);
            $("#TxtCuenta_26").val(ArrayProductos[itemArray].Cuenta_26);
            $("#TxtCuenta_27").val(ArrayProductos[itemArray].Cuenta_27);
            $("#TxtCuenta_28").val(ArrayProductos[itemArray].Cuenta_28);
            $("#TxtCuenta_29").val(ArrayProductos[itemArray].Cuenta_29);
            $("#TxtCuenta_30").val(ArrayProductos[itemArray].Cuenta_30);
            $("#TxtCuenta_31").val(ArrayProductos[itemArray].Cuenta_31);
            $("#TxtCuenta_32").val(ArrayProductos[itemArray].Cuenta_32);
            $("#TxtCuenta_33").val(ArrayProductos[itemArray].Cuenta_33);
            $("#TxtCuenta_34").val(ArrayProductos[itemArray].Cuenta_34);
            $("#TxtCuenta_35").val(ArrayProductos[itemArray].Cuenta_35);
            $("#TxtCuenta_36").val(ArrayProductos[itemArray].Cuenta_36);
            $("#TxtCuenta_37").val(ArrayProductos[itemArray].Cuenta_37);
            $("#TxtCuenta_38").val(ArrayProductos[itemArray].Cuenta_38);
            $("#TxtCuenta_39").val(ArrayProductos[itemArray].Cuenta_39);
            $("#TxtCuenta_40").val(ArrayProductos[itemArray].Cuenta_40);
            $("#TxtCuenta_41").val(ArrayProductos[itemArray].Cuenta_41);
            $("#TxtCuenta_42").val(ArrayProductos[itemArray].Cuenta_42);
            $("#TxtCuenta_43").val(ArrayProductos[itemArray].Cuenta_43);
            $("#TxtCuenta_44").val(ArrayProductos[itemArray].Cuenta_44);
            $("#TxtCuenta_45").val(ArrayProductos[itemArray].Cuenta_45);
            $("#TxtCuenta_46").val(ArrayProductos[itemArray].Cuenta_46);
            $("#TxtCuenta_47").val(ArrayProductos[itemArray].Cuenta_47);
            $("#TxtCuenta_48").val(ArrayProductos[itemArray].Cuenta_48);
            $("#TxtCuenta_49").val(ArrayProductos[itemArray].Cuenta_49);
            $("#TxtCuenta_50").val(ArrayProductos[itemArray].Cuenta_50);


            $("#Select_EmpresaNit").val(ArrayProductos[itemArray].Nit_ID);


            $("#Dialog_Productos").dialog("option", "title", "Actualizar Producto");
            $("#Dialog_Productos").dialog("open");

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $('.C_Chosen').trigger('chosen:updated');

        }
    }

}


//funcion de carga Subtipo de producto para edicion
function refresh_STP(index) {
    $('#Select_SubTipo_P').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//funcion de carga Subtipo de activo para edicion
function refresh_STA(index) {
    $('#Select_SubTipo_A').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//grid con el boton eliminar
function Tabla_eliminar() {
    var html_Productos = "<table id='TProductos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Eliminar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayProductos) {
        if (ArrayProductos[itemArray].Producto_ID != 0) {
            html_Productos += "<tr id= 'TProductos_" + ArrayProductos[itemArray].Producto_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayProductos[itemArray].Producto_ID + "','" + ArrayProductos[itemArray].Nit_ID + "')\"></input></td><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayProductos[itemArray].Producto_ID + "','" + ArrayProductos[itemArray].Nit_ID + "')\"></input></td><td>" + ArrayProductos[itemArray].Nit_ID + "</td><td>" + ArrayProductos[itemArray].Producto_ID + "</td><td>" + ArrayProductos[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Productos += "</tbody></table>";
    $("#container_TProductos").html("");
    $("#container_TProductos").html(html_Productos);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TProductos").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Tipo_ID, index_Nit) {

    for (itemArray in ArrayProductos) {
        if (index_Tipo_ID == ArrayProductos[itemArray].Producto_ID && index_Nit == ArrayProductos[itemArray].Nit_ID) {
            ProductoID = ArrayProductos[itemArray].Producto_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}


//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Productos = "<table id='TProductos' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
    for (itemArray in ArrayProductos) {
        if (ArrayProductos[itemArray].Producto_ID != 0) {
            html_Productos += "<tr id= 'TProductos_" + ArrayProductos[itemArray].Producto_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayProductos[itemArray].Producto_ID + "','" + ArrayProductos[itemArray].Nit_ID + "')\"></input></td><td>" + ArrayProductos[itemArray].Nit_ID + "</td><td>" + ArrayProductos[itemArray].Producto_ID + "</td><td>" + ArrayProductos[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Productos += "</tbody></table>";
    $("#container_TProductos").html("");
    $("#container_TProductos").html(html_Productos);

    $(".Ver").click(function () {
    });

    $("#TProductos").dataTable({
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

    $("#Txt_ID").val("");
    $("#Select_Tipo_P").val("-1");
    $("#Select_Tipo_A").val("-1");
    $("#Select_SubTipo_P").val("-1");
    $("#Select_SubTipo_A").val("-1");
    $("#Select_Crea").val("-1");
    $("#Select_Mod").val("-1");
    $("#Select_Ret").val("-1");

    $("#TxtDescripcion").val("");

    $('#Select_Tipo_P').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $('#Select_Tipo_A').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $('#Select_SubTipo_P').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $('#Select_SubTipo_A').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $("#Select_Crea").siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $("#Select_Mod").siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    $("#Select_Ret").siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');

    $("#TxtCuenta_1").val("");
    $("#TxtCuenta_2").val("");
    $("#TxtCuenta_3").val("");
    $("#TxtCuenta_4").val("");
    $("#TxtCuenta_5").val("");
    $("#TxtCuenta_6").val("");
    $("#TxtCuenta_7").val("");
    $("#TxtCuenta_8").val("");
    $("#TxtCuenta_9").val("");
    $("#TxtCuenta_10").val("");

    $("#TxtCuenta_11").val("");
    $("#TxtCuenta_12").val("");
    $("#TxtCuenta_13").val("");
    $("#TxtCuenta_14").val("");
    $("#TxtCuenta_15").val("");
    $("#TxtCuenta_16").val("");
    $("#TxtCuenta_17").val("");
    $("#TxtCuenta_18").val("");
    $("#TxtCuenta_19").val("");
    $("#TxtCuenta_20").val("");

    $("#TxtCuenta_21").val("");
    $("#TxtCuenta_22").val("");
    $("#TxtCuenta_23").val("");
    $("#TxtCuenta_24").val("");
    $("#TxtCuenta_25").val("");
    $("#TxtCuenta_26").val("");
    $("#TxtCuenta_27").val("");
    $("#TxtCuenta_28").val("");
    $("#TxtCuenta_29").val("");
    $("#TxtCuenta_30").val("");

    $("#TxtCuenta_31").val("");
    $("#TxtCuenta_32").val("");
    $("#TxtCuenta_33").val("");
    $("#TxtCuenta_34").val("");
    $("#TxtCuenta_35").val("");
    $("#TxtCuenta_36").val("");
    $("#TxtCuenta_37").val("");
    $("#TxtCuenta_38").val("");
    $("#TxtCuenta_39").val("");
    $("#TxtCuenta_40").val("");

    $("#TxtCuenta_41").val("");
    $("#TxtCuenta_42").val("");
    $("#TxtCuenta_43").val("");
    $("#TxtCuenta_44").val("");
    $("#TxtCuenta_45").val("");
    $("#TxtCuenta_46").val("");
    $("#TxtCuenta_47").val("");
    $("#TxtCuenta_48").val("");
    $("#TxtCuenta_49").val("");
    $("#TxtCuenta_50").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");
}

//limpiar campos
function Disabled_Controls() {

    $("#Txt_ID").attr("disabled", "disabled");
    $("#Select_Tipo_P").attr("disabled", "disabled");
    $("#Select_Tipo_A").attr("disabled", "disabled");
    $("#Select_SubTipo_P").attr("disabled", "disabled");
    $("#Select_SubTipo_A").attr("disabled", "disabled");
    $("#Select_Crea").attr("disabled", "disabled");
    $("#Select_Mod").attr("disabled", "disabled");
    $("#Select_Ret").attr("disabled", "disabled");

    $("#TxtDescripcion").attr("disabled", "disabled");

    $("#Select_Tipo_P").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_Tipo_P").parent().find("a.ui-button").button("disable");
    $("#Select_Tipo_A").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_Tipo_A").parent().find("a.ui-button").button("disable");
    $("#Select_SubTipo_P").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_SubTipo_P").parent().find("a.ui-button").button("disable");
    $("#Select_SubTipo_A").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_SubTipo_A").parent().find("a.ui-button").button("disable");
    $("#Select_Crea").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_Crea").parent().find("a.ui-button").button("disable");
    $("#Select_Mod").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_Mod").parent().find("a.ui-button").button("disable");
    $("#Select_Ret").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_Ret").parent().find("a.ui-button").button("disable");

    $("#Select_EmpresaNit").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", true).prop("disabled", true);
    $("#Select_EmpresaNit").parent().find("a.ui-button").button("disable");

    $("#TxtCuenta_1").attr("disabled", "disabled");
    $("#TxtCuenta_2").attr("disabled", "disabled");
    $("#TxtCuenta_3").attr("disabled", "disabled");
    $("#TxtCuenta_4").attr("disabled", "disabled");
    $("#TxtCuenta_5").attr("disabled", "disabled");
    $("#TxtCuenta_6").attr("disabled", "disabled");
    $("#TxtCuenta_7").attr("disabled", "disabled");
    $("#TxtCuenta_8").attr("disabled", "disabled");
    $("#TxtCuenta_9").attr("disabled", "disabled");
    $("#TxtCuenta_10").attr("disabled", "disabled");

    $("#TxtCuenta_11").attr("disabled", "disabled");
    $("#TxtCuenta_12").attr("disabled", "disabled");
    $("#TxtCuenta_13").attr("disabled", "disabled");
    $("#TxtCuenta_14").attr("disabled", "disabled");
    $("#TxtCuenta_15").attr("disabled", "disabled");
    $("#TxtCuenta_16").attr("disabled", "disabled");
    $("#TxtCuenta_17").attr("disabled", "disabled");
    $("#TxtCuenta_18").attr("disabled", "disabled");
    $("#TxtCuenta_19").attr("disabled", "disabled");
    $("#TxtCuenta_20").attr("disabled", "disabled");

    $("#TxtCuenta_21").attr("disabled", "disabled");
    $("#TxtCuenta_22").attr("disabled", "disabled");
    $("#TxtCuenta_23").attr("disabled", "disabled");
    $("#TxtCuenta_24").attr("disabled", "disabled");
    $("#TxtCuenta_25").attr("disabled", "disabled");
    $("#TxtCuenta_26").attr("disabled", "disabled");
    $("#TxtCuenta_27").attr("disabled", "disabled");
    $("#TxtCuenta_28").attr("disabled", "disabled");
    $("#TxtCuenta_29").attr("disabled", "disabled");
    $("#TxtCuenta_30").attr("disabled", "disabled");

    $("#TxtCuenta_31").attr("disabled", "disabled");
    $("#TxtCuenta_32").attr("disabled", "disabled");
    $("#TxtCuenta_33").attr("disabled", "disabled");
    $("#TxtCuenta_34").attr("disabled", "disabled");
    $("#TxtCuenta_35").attr("disabled", "disabled");
    $("#TxtCuenta_36").attr("disabled", "disabled");
    $("#TxtCuenta_37").attr("disabled", "disabled");
    $("#TxtCuenta_38").attr("disabled", "disabled");
    $("#TxtCuenta_39").attr("disabled", "disabled");
    $("#TxtCuenta_40").attr("disabled", "disabled");

    $("#TxtCuenta_41").attr("disabled", "disabled");
    $("#TxtCuenta_42").attr("disabled", "disabled");
    $("#TxtCuenta_43").attr("disabled", "disabled");
    $("#TxtCuenta_44").attr("disabled", "disabled");
    $("#TxtCuenta_45").attr("disabled", "disabled");
    $("#TxtCuenta_46").attr("disabled", "disabled");
    $("#TxtCuenta_47").attr("disabled", "disabled");
    $("#TxtCuenta_48").attr("disabled", "disabled");
    $("#TxtCuenta_49").attr("disabled", "disabled");
    $("#TxtCuenta_50").attr("disabled", "disabled");

    $("#TxtRead").attr("disabled", "disabled");
    $("#DDLColumns").attr("disabled", "disabled");
}


//limpiar campos
function Enabled_Controls() {

    $("#Txt_ID").removeAttr("disabled");
    $("#Select_Tipo_P").removeAttr("disabled");
    $("#Select_Tipo_A").removeAttr("disabled");
    $("#Select_SubTipo_P").removeAttr("disabled");
    $("#Select_SubTipo_A").removeAttr("disabled");
    $("#Select_Crea").removeAttr("disabled");
    $("#Select_Mod").removeAttr("disabled");
    $("#Select_Ret").removeAttr("disabled");

    $("#TxtDescripcion").removeAttr("disabled");

    $("#Select_Tipo_P").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_Tipo_P").parent().find("a.ui-button").button("enable");
    $("#Select_Tipo_A").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_Tipo_A").parent().find("a.ui-button").button("enable");
    $("#Select_SubTipo_P").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_SubTipo_P").parent().find("a.ui-button").button("enable");
    $("#Select_SubTipo_A").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_SubTipo_A").parent().find("a.ui-button").button("enable");
    $("#Select_Crea").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_Crea").parent().find("a.ui-button").button("enable");
    $("#Select_Mod").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_Mod").parent().find("a.ui-button").button("enable");
    $("#Select_Ret").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_Ret").parent().find("a.ui-button").button("enable");

    $("#Select_EmpresaNit").parent().find("input.ui-autocomplete-input").autocomplete("option", "disabled", false).prop("disabled", false);
    $("#Select_EmpresaNit").parent().find("a.ui-button").button("enable");

    $("#TxtCuenta_1").removeAttr("disabled");
    $("#TxtCuenta_2").removeAttr("disabled");
    $("#TxtCuenta_3").removeAttr("disabled");
    $("#TxtCuenta_4").removeAttr("disabled");
    $("#TxtCuenta_5").removeAttr("disabled");
    $("#TxtCuenta_6").removeAttr("disabled");
    $("#TxtCuenta_7").removeAttr("disabled");
    $("#TxtCuenta_8").removeAttr("disabled");
    $("#TxtCuenta_9").removeAttr("disabled");
    $("#TxtCuenta_10").removeAttr("disabled");

    $("#TxtCuenta_11").removeAttr("disabled");
    $("#TxtCuenta_12").removeAttr("disabled");
    $("#TxtCuenta_13").removeAttr("disabled");
    $("#TxtCuenta_14").removeAttr("disabled");
    $("#TxtCuenta_15").removeAttr("disabled");
    $("#TxtCuenta_16").removeAttr("disabled");
    $("#TxtCuenta_17").removeAttr("disabled");
    $("#TxtCuenta_18").removeAttr("disabled");
    $("#TxtCuenta_19").removeAttr("disabled");
    $("#TxtCuenta_20").removeAttr("disabled");

    $("#TxtCuenta_21").removeAttr("disabled");
    $("#TxtCuenta_22").removeAttr("disabled");
    $("#TxtCuenta_23").removeAttr("disabled");
    $("#TxtCuenta_24").removeAttr("disabled");
    $("#TxtCuenta_25").removeAttr("disabled");
    $("#TxtCuenta_26").removeAttr("disabled");
    $("#TxtCuenta_27").removeAttr("disabled");
    $("#TxtCuenta_28").removeAttr("disabled");
    $("#TxtCuenta_29").removeAttr("disabled");
    $("#TxtCuenta_30").removeAttr("disabled");

    $("#TxtCuenta_31").removeAttr("disabled");
    $("#TxtCuenta_32").removeAttr("disabled");
    $("#TxtCuenta_33").removeAttr("disabled");
    $("#TxtCuenta_34").removeAttr("disabled");
    $("#TxtCuenta_35").removeAttr("disabled");
    $("#TxtCuenta_36").removeAttr("disabled");
    $("#TxtCuenta_37").removeAttr("disabled");
    $("#TxtCuenta_38").removeAttr("disabled");
    $("#TxtCuenta_39").removeAttr("disabled");
    $("#TxtCuenta_40").removeAttr("disabled");

    $("#TxtCuenta_41").removeAttr("disabled");
    $("#TxtCuenta_42").removeAttr("disabled");
    $("#TxtCuenta_43").removeAttr("disabled");
    $("#TxtCuenta_44").removeAttr("disabled");
    $("#TxtCuenta_45").removeAttr("disabled");
    $("#TxtCuenta_46").removeAttr("disabled");
    $("#TxtCuenta_47").removeAttr("disabled");
    $("#TxtCuenta_48").removeAttr("disabled");
    $("#TxtCuenta_49").removeAttr("disabled");
    $("#TxtCuenta_50").removeAttr("disabled");

    $("#TxtRead").removeAttr("disabled");
    $("#DDLColumns").removeAttr("disabled");
}

function Change_Select_Product() {
    $("#Select_Tipo_P").change(function () {
        var TD_ID = this.value;
        transacionAjax_SubTipo_P('SubTipo_Pro', TD_ID);
        $('#Select_SubTipo_P').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    });
}

function Change_Select_Active() {
    $("#Select_Tipo_A").change(function () {
        var TD_ID = this.value;
        transacionAjax_SubTipo_A('SubTipo_Act', TD_ID);
        $('#Select_SubTipo_A').siblings('.ui-combobox').find('.ui-autocomplete-input').val('Seleccione...');
    });
}

//muestra el registro a eliminar
function Ver(index_Tipo_ID, index_Nit) {

    for (itemArray in ArrayProductos) {
        if (index_Tipo_ID == ArrayProductos[itemArray].Producto_ID && index_Nit == ArrayProductos[itemArray].Nit_ID) {

            editNit_ID = ArrayProductos[itemArray].Nit_ID;

            ProductoID = ArrayProductos[itemArray].Producto_ID;
            edit_TipoP_ID = ArrayProductos[itemArray].TP_ID;
            edit_TipoA_ID = ArrayProductos[itemArray].TA_ID;
            edit_SubTipoP_ID = ArrayProductos[itemArray].STP_ID;
            edit_SubTipoA_ID = ArrayProductos[itemArray].STA_ID;
            edit_Crea_ID = ArrayProductos[itemArray].Tran_ID_1;
            edit_Mod_ID = ArrayProductos[itemArray].Tran_ID_2;
            edit_Ret_ID = ArrayProductos[itemArray].Tran_ID_3;

            for (item in ArrayTransaccion) {
                if (ArrayTransaccion[item].ID == edit_Crea_ID) {
                    $('#Select_Crea').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayTransaccion[item].descripcion);
                }
                if (ArrayTransaccion[item].ID == edit_Mod_ID) {
                    $('#Select_Mod').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayTransaccion[item].descripcion);
                }
                if (ArrayTransaccion[item].ID == edit_Ret_ID) {
                    $('#Select_Ret').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayTransaccion[item].descripcion);
                }
            }

            $("#Select_Tipo_P").val(ArrayProductos[itemArray].TP_ID);

            for (item in ArrayTipo_P) {
                if (ArrayTipo_P[item].ID == edit_TipoP_ID) {
                    $('#Select_Tipo_P').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayTipo_P[item].descripcion);
                }
            }

            $("#Select_Tipo_P").trigger("change");

            $("#Select_Tipo_A").val(ArrayProductos[itemArray].TA_ID);

            for (item in ArrayTipo_A) {
                if (ArrayTipo_A[item].ID == edit_TipoA_ID) {
                    $('#Select_Tipo_A').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayTipo_A[item].descripcion);
                }
            }

            $("#Select_Tipo_A").trigger("change");

            if (edit_SubTipoP_ID != 0) {
                $("#Select_SubTipo_P").val(ArrayProductos[itemArray].STP_ID);
                setTimeout("refresh_STP();", 500);
            }

            if (edit_SubTipoA_ID != 0) {
                $("#Select_SubTipo_A").val(ArrayProductos[itemArray].STA_ID);
                setTimeout("refresh_STA();", 500);
            }

            for (item in ArrayEmpresaNit) {
                if (ArrayEmpresaNit[item].ID == ArrayProductos[itemArray].Nit_ID) {
                    $('#Select_EmpresaNit').siblings('.ui-combobox').find('.ui-autocomplete-input').val(ArrayEmpresaNit[item].descripcion);
                }
            }

            $("#Select_EmpresaNit").val(ArrayProductos[itemArray].Nit_ID);
            $("#Select_SubTipo_P").val(ArrayProductos[itemArray].STP_ID);
            $("#Select_SubTipo_A").val(ArrayProductos[itemArray].STA_ID);
            $("#Select_Crea").val(ArrayProductos[itemArray].Tran_ID_1);
            $("#Select_Mod").val(ArrayProductos[itemArray].Tran_ID_2);
            $("#Select_Ret").val(ArrayProductos[itemArray].Tran_ID_3);

            $("#Txt_ID").val(ArrayProductos[itemArray].Producto_ID);
            $("#TxtDescripcion").val(ArrayProductos[itemArray].Descripcion);

            $("#TxtCuenta_1").val(ArrayProductos[itemArray].Cuenta_1);
            $("#TxtCuenta_2").val(ArrayProductos[itemArray].Cuenta_2);
            $("#TxtCuenta_3").val(ArrayProductos[itemArray].Cuenta_3);
            $("#TxtCuenta_4").val(ArrayProductos[itemArray].Cuenta_4);
            $("#TxtCuenta_5").val(ArrayProductos[itemArray].Cuenta_5);
            $("#TxtCuenta_6").val(ArrayProductos[itemArray].Cuenta_6);
            $("#TxtCuenta_7").val(ArrayProductos[itemArray].Cuenta_7);
            $("#TxtCuenta_8").val(ArrayProductos[itemArray].Cuenta_8);
            $("#TxtCuenta_9").val(ArrayProductos[itemArray].Cuenta_9);
            $("#TxtCuenta_10").val(ArrayProductos[itemArray].Cuenta_10);

            $("#TxtCuenta_11").val(ArrayProductos[itemArray].Cuenta_11);
            $("#TxtCuenta_12").val(ArrayProductos[itemArray].Cuenta_12);
            $("#TxtCuenta_13").val(ArrayProductos[itemArray].Cuenta_13);
            $("#TxtCuenta_14").val(ArrayProductos[itemArray].Cuenta_14);
            $("#TxtCuenta_15").val(ArrayProductos[itemArray].Cuenta_15);
            $("#TxtCuenta_16").val(ArrayProductos[itemArray].Cuenta_16);
            $("#TxtCuenta_17").val(ArrayProductos[itemArray].Cuenta_17);
            $("#TxtCuenta_18").val(ArrayProductos[itemArray].Cuenta_18);
            $("#TxtCuenta_19").val(ArrayProductos[itemArray].Cuenta_19);
            $("#TxtCuenta_20").val(ArrayProductos[itemArray].Cuenta_20);
            $("#TxtCuenta_21").val(ArrayProductos[itemArray].Cuenta_21);
            $("#TxtCuenta_22").val(ArrayProductos[itemArray].Cuenta_22);
            $("#TxtCuenta_23").val(ArrayProductos[itemArray].Cuenta_23);
            $("#TxtCuenta_24").val(ArrayProductos[itemArray].Cuenta_24);
            $("#TxtCuenta_25").val(ArrayProductos[itemArray].Cuenta_25);
            $("#TxtCuenta_26").val(ArrayProductos[itemArray].Cuenta_26);
            $("#TxtCuenta_27").val(ArrayProductos[itemArray].Cuenta_27);
            $("#TxtCuenta_28").val(ArrayProductos[itemArray].Cuenta_28);
            $("#TxtCuenta_29").val(ArrayProductos[itemArray].Cuenta_29);
            $("#TxtCuenta_30").val(ArrayProductos[itemArray].Cuenta_30);
            $("#TxtCuenta_31").val(ArrayProductos[itemArray].Cuenta_31);
            $("#TxtCuenta_32").val(ArrayProductos[itemArray].Cuenta_32);
            $("#TxtCuenta_33").val(ArrayProductos[itemArray].Cuenta_33);
            $("#TxtCuenta_34").val(ArrayProductos[itemArray].Cuenta_34);
            $("#TxtCuenta_35").val(ArrayProductos[itemArray].Cuenta_35);
            $("#TxtCuenta_36").val(ArrayProductos[itemArray].Cuenta_36);
            $("#TxtCuenta_37").val(ArrayProductos[itemArray].Cuenta_37);
            $("#TxtCuenta_38").val(ArrayProductos[itemArray].Cuenta_38);
            $("#TxtCuenta_39").val(ArrayProductos[itemArray].Cuenta_39);
            $("#TxtCuenta_40").val(ArrayProductos[itemArray].Cuenta_40);
            $("#TxtCuenta_41").val(ArrayProductos[itemArray].Cuenta_41);
            $("#TxtCuenta_42").val(ArrayProductos[itemArray].Cuenta_42);
            $("#TxtCuenta_43").val(ArrayProductos[itemArray].Cuenta_43);
            $("#TxtCuenta_44").val(ArrayProductos[itemArray].Cuenta_44);
            $("#TxtCuenta_45").val(ArrayProductos[itemArray].Cuenta_45);
            $("#TxtCuenta_46").val(ArrayProductos[itemArray].Cuenta_46);
            $("#TxtCuenta_47").val(ArrayProductos[itemArray].Cuenta_47);
            $("#TxtCuenta_48").val(ArrayProductos[itemArray].Cuenta_48);
            $("#TxtCuenta_49").val(ArrayProductos[itemArray].Cuenta_49);
            $("#TxtCuenta_50").val(ArrayProductos[itemArray].Cuenta_50);

            $("#Dialog_Productos").dialog("option", "title", "Ver Producto");
            $("#Dialog_Productos").dialog("open");

            Disabled_Controls();
        }
    }

}



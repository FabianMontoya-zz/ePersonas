/*--------------- region de variables globales --------------------*/
var ArrayFasecolda = [];
var ArrayCombo = [];

var Edit_ID;

/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    carga_eventos("Dialog_Charge");


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
        modal: true,
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).show(); }
    });

    $("#dialog_eliminar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).show(); }
    });

    $("#Dialog_Fasecolda").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1100,
        height: 620,
        overlay: {
            opacity: 0.5,
            background: "black"
        },
        open: function (event, ui) { $(".ui-dialog-titlebar-close", ui.dialog).show(); }
    });

    setTimeout("Periodos();",300);

});

//crea los periodos desdeel año pasodo hata los 25 años atras
function Periodos() {
    var fecha = new Date();
    var Year;

    for (item in ArrayMenu) {
            if (ArrayMenu[item].Tipo == 2) {
            if (ArrayMenu[item].IDlink == Link) {
                Year = ArrayMenu[item].Parametro_2;
            }
        }
    }

    var ArrayPeriodo = [];
    var ConP = 26;
    for (n = 1; n <= 25; n++) {
        ArrayPeriodo[n - 1] = parseInt(Year) - n;
    }

    for (item in ArrayPeriodo) {
        ConP = ConP - 1;
        $("#P_" + ConP).html(ArrayPeriodo[item]);
    }
}

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#Dialog_Fasecolda").dialog("option", "title", "Crear Registro Fasecolda");
            $("#Dialog_Fasecolda").dialog("open");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Btnguardar").css("display", "inline-table");
            Enabled_Controls();
            ResetError();
            Clear();
            estado = opcion;
            $("#Select_Estado").attr("disabled", "disabled");
            $('.C_Chosen').trigger('chosen:updated');
    
            break;

        case "buscar":
            $("#Dialog_Fasecolda").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TFasecolda").html("");
            $("#Select_Estado").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');

            estado = opcion;
            Enabled_Controls();
            Clear();
            break;

        case "modificar":
            $("#Dialog_Fasecolda").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TFasecolda").html("");
            $("#Select_Estado").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');
            estado = opcion;
            Enabled_Controls();
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#Dialog_Fasecolda").dialog("close");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TFasecolda").html("");
            $("#Select_Estado").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');

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
        transacionAjax_Fasecolda("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Fasecolda("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Fasecolda_create("crear");
        }
        else {
            transacionAjax_Fasecolda_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Fasecolda_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtMarca").val();
    var Campo_3 = $("#TxtLinea").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (Campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img3").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img1").css("display", "none");
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
function Table_Fasecolda() {

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
    var html_Fasecolda = "<table id='TFasecolda' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Editar</th><th>Codigo</th><th>Clase</th><th>Marca</th><th>Linea</th><th>Cilindraje</th></tr></thead><tbody>";
    for (itemArray in ArrayFasecolda) {
        if (ArrayFasecolda[itemArray].Fasecolda_ID != 0) {
            html_Fasecolda += "<tr id= 'TFasecolda_" + ArrayFasecolda[itemArray].Fasecolda_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayFasecolda[itemArray].Fasecolda_ID + "')\"></input></td><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayFasecolda[itemArray].Fasecolda_ID + "')\"></input></td><td>" + ArrayFasecolda[itemArray].Fasecolda_ID + "</td><td>" + ArrayFasecolda[itemArray].Clase + "</td><td>" + ArrayFasecolda[itemArray].Marca + "</td><td>" + ArrayFasecolda[itemArray].Linea + "</td><td>" + ArrayFasecolda[itemArray].Cilindraje + "</td></tr>";
        }
    }
    html_Fasecolda += "</tbody></table>";
    $("#container_TFasecolda").html("");
    $("#container_TFasecolda").html(html_Fasecolda);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TFasecolda").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 100000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Editar(index_Tipo_ID) {

    Enabled_Controls();

    for (itemArray in ArrayFasecolda) {
        if (index_Tipo_ID == ArrayFasecolda[itemArray].Fasecolda_ID) {

            $("#Btnguardar").attr("value", "Actualizar");
            $("#Btnguardar").css("display", "inline-table");
            
            Edit_ID = ArrayFasecolda[itemArray].Fasecolda_ID;

            $("#Txt_ID").val(ArrayFasecolda[itemArray].Fasecolda_ID);
            $("#TxtDescripcion").val(ArrayFasecolda[itemArray].Clase);
            $("#TxtMarca").val(ArrayFasecolda[itemArray].Marca);
            $("#TxtLinea").val(ArrayFasecolda[itemArray].Linea);
            $("#TxtCilindraje").val(ArrayFasecolda[itemArray].Cilindraje);

            $("#TxtYear_1").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_1, "0"));
            $("#TxtYear_2").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_2, "0"));
            $("#TxtYear_3").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_3, "0"));
            $("#TxtYear_4").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_4, "0"));
            $("#TxtYear_5").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_5, "0"));
            $("#TxtYear_6").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_6, "0"));
            $("#TxtYear_7").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_7, "0"));
            $("#TxtYear_8").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_8, "0"));
            $("#TxtYear_9").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_9, "0"));
            $("#TxtYear_10").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_10, "0"));
            $("#TxtYear_11").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_11, "0"));
            $("#TxtYear_12").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_12, "0"));
            $("#TxtYear_13").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_13, "0"));
            $("#TxtYear_14").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_14, "0"));
            $("#TxtYear_15").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_15, "0"));
            $("#TxtYear_16").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_16, "0"));
            $("#TxtYear_17").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_17, "0"));
            $("#TxtYear_18").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_18, "0"));
            $("#TxtYear_19").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_19, "0"));
            $("#TxtYear_20").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_20, "0"));
            $("#TxtYear_21").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_21, "0"));
            $("#TxtYear_22").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_22, "0"));
            $("#TxtYear_23").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_23, "0"));
            $("#TxtYear_24").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_24, "0"));
            $("#TxtYear_25").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_25, "0"));

            $("#Dialog_Fasecolda").dialog("option", "title", "Actualizar Registro Fasecolda");
            $("#Dialog_Fasecolda").dialog("open");

            $("#Txt_ID").attr("disabled", "disabled");
            $("#Select_Estado").val(ArrayFasecolda[itemArray].Estado);
            $('.C_Chosen').trigger('chosen:updated');
    

        }
    }

}


//grid con el boton eliminar
function Tabla_eliminar() {
    var html_Fasecolda = "<table id='TFasecolda' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Eliminar</th><th>Codigo</th><th>Clase</th><th>Marca</th><th>Linea</th><th>Cilindraje</th></tr></thead><tbody>";
    for (itemArray in ArrayFasecolda) {
        if (ArrayFasecolda[itemArray].Fasecolda_ID != 0) {
            html_Fasecolda += "<tr id= 'TFasecolda_" + ArrayFasecolda[itemArray].Fasecolda_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayFasecolda[itemArray].Fasecolda_ID + "')\"></input></td><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayFasecolda[itemArray].Fasecolda_ID + "')\"></input></td><td>" + ArrayFasecolda[itemArray].Fasecolda_ID + "</td><td>" + ArrayFasecolda[itemArray].Clase + "</td><td>" + ArrayFasecolda[itemArray].Marca + "</td><td>" + ArrayFasecolda[itemArray].Linea + "</td><td>" + ArrayFasecolda[itemArray].Cilindraje + "</td></tr>";
        }
    }
    html_Fasecolda += "</tbody></table>";
    $("#container_TFasecolda").html("");
    $("#container_TFasecolda").html(html_Fasecolda);

    $(".Eliminar").click(function () {
    });

    $(".Ver").click(function () {
    });

    $("#TFasecolda").dataTable({
        "bJQueryUI": true, "iDisplayLength": 100000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Tipo_ID) {

    for (itemArray in ArrayFasecolda) {
        if (index_Tipo_ID == ArrayFasecolda[itemArray].Fasecolda_ID) {
            ProductoID = ArrayFasecolda[itemArray].Fasecolda_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}


//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Fasecolda = "<table id='TFasecolda' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Codigo</th><th>Clase</th><th>Marca</th><th>Linea</th><th>Cilindraje</th></tr></thead><tbody>";
    for (itemArray in ArrayFasecolda) {
        if (ArrayFasecolda[itemArray].Fasecolda_ID != 0) {
            html_Fasecolda += "<tr id= 'TFasecolda_" + ArrayFasecolda[itemArray].Fasecolda_ID + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayFasecolda[itemArray].Fasecolda_ID + "')\"></input></td><td>" + ArrayFasecolda[itemArray].Fasecolda_ID + "</td><td>" + ArrayFasecolda[itemArray].Clase + "</td><td>" + ArrayFasecolda[itemArray].Marca + "</td><td>" + ArrayFasecolda[itemArray].Linea + "</td><td>" + ArrayFasecolda[itemArray].Cilindraje + "</td></tr>";
        }
    }
    html_Fasecolda += "</tbody></table>";
    $("#container_TFasecolda").html("");
    $("#container_TFasecolda").html(html_Fasecolda);

    $(".Ver").click(function () {
    });

    $("#TFasecolda").dataTable({
        "bJQueryUI": true, "iDisplayLength": 100000,
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

    $("#TxtDescripcion").val("");
    $("#TxtMarca").val("");
    $("#TxtLinea").val("");
    $("#TxtCilindraje").val("");

    $("#TxtYear_1").val("");
    $("#TxtYear_2").val("");
    $("#TxtYear_3").val("");
    $("#TxtYear_4").val("");
    $("#TxtYear_5").val("");
    $("#TxtYear_6").val("");
    $("#TxtYear_7").val("");
    $("#TxtYear_8").val("");
    $("#TxtYear_9").val("");
    $("#TxtYear_10").val("");

    $("#TxtYear_11").val("");
    $("#TxtYear_12").val("");
    $("#TxtYear_13").val("");
    $("#TxtYear_14").val("");
    $("#TxtYear_15").val("");
    $("#TxtYear_16").val("");
    $("#TxtYear_17").val("");
    $("#TxtYear_18").val("");
    $("#TxtYear_19").val("");
    $("#TxtYear_20").val("");

    $("#TxtYear_21").val("");
    $("#TxtYear_22").val("");
    $("#TxtYear_23").val("");
    $("#TxtYear_24").val("");
    $("#TxtYear_25").val("");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $("#Select_Estado").val("N");
    $('.C_Chosen').trigger('chosen:updated');

}

//limpiar campos
function Disabled_Controls() {

    $("#Txt_ID").attr("disabled", "disabled");

    $("#TxtDescripcion").attr("disabled", "disabled");
    $("#TxtMarca").attr("disabled", "disabled");
    $("#TxtLinea").attr("disabled", "disabled");
    $("#TxtCilindraje").attr("disabled", "disabled");

    $("#TxtYear_1").attr("disabled", "disabled");
    $("#TxtYear_2").attr("disabled", "disabled");
    $("#TxtYear_3").attr("disabled", "disabled");
    $("#TxtYear_4").attr("disabled", "disabled");
    $("#TxtYear_5").attr("disabled", "disabled");
    $("#TxtYear_6").attr("disabled", "disabled");
    $("#TxtYear_7").attr("disabled", "disabled");
    $("#TxtYear_8").attr("disabled", "disabled");
    $("#TxtYear_9").attr("disabled", "disabled");
    $("#TxtYear_10").attr("disabled", "disabled");

    $("#TxtYear_11").attr("disabled", "disabled");
    $("#TxtYear_12").attr("disabled", "disabled");
    $("#TxtYear_13").attr("disabled", "disabled");
    $("#TxtYear_14").attr("disabled", "disabled");
    $("#TxtYear_15").attr("disabled", "disabled");
    $("#TxtYear_16").attr("disabled", "disabled");
    $("#TxtYear_17").attr("disabled", "disabled");
    $("#TxtYear_18").attr("disabled", "disabled");
    $("#TxtYear_19").attr("disabled", "disabled");
    $("#TxtYear_20").attr("disabled", "disabled");

    $("#TxtYear_21").attr("disabled", "disabled");
    $("#TxtYear_22").attr("disabled", "disabled");
    $("#TxtYear_23").attr("disabled", "disabled");
    $("#TxtYear_24").attr("disabled", "disabled");
    $("#TxtYear_25").attr("disabled", "disabled");

    $("#TxtRead").attr("disabled", "disabled");
    $("#DDLColumns").attr("disabled", "disabled");

    $("#Select_Estado").attr("disabled", "disabled");
    $('.C_Chosen').trigger('chosen:updated');

}


//limpiar campos
function Enabled_Controls() {

    $("#Txt_ID").removeAttr("disabled");

    $("#TxtDescripcion").removeAttr("disabled");
    $("#TxtMarca").removeAttr("disabled");
    $("#TxtLinea").removeAttr("disabled");
    $("#TxtCilindraje").removeAttr("disabled");

    $("#TxtYear_1").removeAttr("disabled");
    $("#TxtYear_2").removeAttr("disabled");
    $("#TxtYear_3").removeAttr("disabled");
    $("#TxtYear_4").removeAttr("disabled");
    $("#TxtYear_5").removeAttr("disabled");
    $("#TxtYear_6").removeAttr("disabled");
    $("#TxtYear_7").removeAttr("disabled");
    $("#TxtYear_8").removeAttr("disabled");
    $("#TxtYear_9").removeAttr("disabled");
    $("#TxtYear_10").removeAttr("disabled");

    $("#TxtYear_11").removeAttr("disabled");
    $("#TxtYear_12").removeAttr("disabled");
    $("#TxtYear_13").removeAttr("disabled");
    $("#TxtYear_14").removeAttr("disabled");
    $("#TxtYear_15").removeAttr("disabled");
    $("#TxtYear_16").removeAttr("disabled");
    $("#TxtYear_17").removeAttr("disabled");
    $("#TxtYear_18").removeAttr("disabled");
    $("#TxtYear_19").removeAttr("disabled");
    $("#TxtYear_20").removeAttr("disabled");

    $("#TxtYear_21").removeAttr("disabled");
    $("#TxtYear_22").removeAttr("disabled");
    $("#TxtYear_23").removeAttr("disabled");
    $("#TxtYear_24").removeAttr("disabled");
    $("#TxtYear_25").removeAttr("disabled");

    $("#TxtRead").removeAttr("disabled");
    $("#DDLColumns").removeAttr("disabled");

    $("#Select_Estado").removeAttr("disabled");
    $('.C_Chosen').trigger('chosen:updated');

}



//muestra el registro a eliminar
function Ver(index_Tipo_ID) {

    for (itemArray in ArrayFasecolda) {
        if (index_Tipo_ID == ArrayFasecolda[itemArray].Fasecolda_ID) {

            Edit_ID = ArrayFasecolda[itemArray].Fasecolda_ID;

            $("#Txt_ID").val(ArrayFasecolda[itemArray].Fasecolda_ID);
            $("#TxtDescripcion").val(ArrayFasecolda[itemArray].Clase);
            $("#TxtMarca").val(ArrayFasecolda[itemArray].Marca);
            $("#TxtLinea").val(ArrayFasecolda[itemArray].Linea);
            $("#TxtCilindraje").val(ArrayFasecolda[itemArray].Cilindraje);

            $("#TxtYear_1").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_1, "0"));
            $("#TxtYear_2").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_2, "0"));
            $("#TxtYear_3").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_3, "0"));
            $("#TxtYear_4").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_4, "0"));
            $("#TxtYear_5").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_5, "0"));
            $("#TxtYear_6").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_6, "0"));
            $("#TxtYear_7").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_7, "0"));
            $("#TxtYear_8").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_8, "0"));
            $("#TxtYear_9").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_9, "0"));
            $("#TxtYear_10").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_10, "0"));
            $("#TxtYear_11").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_11, "0"));
            $("#TxtYear_12").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_12, "0"));
            $("#TxtYear_13").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_13, "0"));
            $("#TxtYear_14").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_14, "0"));
            $("#TxtYear_15").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_15, "0"));
            $("#TxtYear_16").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_16, "0"));
            $("#TxtYear_17").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_17, "0"));
            $("#TxtYear_18").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_18, "0"));
            $("#TxtYear_19").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_19, "0"));
            $("#TxtYear_20").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_20, "0"));
            $("#TxtYear_21").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_21, "0"));
            $("#TxtYear_22").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_22, "0"));
            $("#TxtYear_23").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_23, "0"));
            $("#TxtYear_24").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_24, "0"));
            $("#TxtYear_25").val(dinner_format_grid(ArrayFasecolda[itemArray].Year_25, "0"));

            $("#Select_Estado").val(ArrayFasecolda[itemArray].Estado);
            $('.C_Chosen').trigger('chosen:updated');
    
            $("#Dialog_Fasecolda").dialog("option", "title", "Ver Registro Fasecolda");
            $("#Dialog_Fasecolda").dialog("open");

            $("#Btnguardar").css("display", "None");
            
            Disabled_Controls();
        }
    }

}



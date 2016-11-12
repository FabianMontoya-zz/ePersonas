/*--------------- region de variables globales --------------------*/
var ArrayCiudades = [];
var ArrayCombo = [];
var ArrayPais = [];

var estado;
var editID;
var editPais_ID;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Pais('Pais');

    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");


    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");

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

});

//salida del formulario
function btnSalir() {
    window.location = "../../Menu/menu.aspx?User=" + $("#User").html() + "&L_L=" + Link;
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#Select_Pais").val("169");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Select_Pais").removeAttr("disabled");
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiudades").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiudades").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TCiudades").html("");
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
        transacionAjax_Ciudades("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Ciudades("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Ciudades_create("crear");
        }
        else {
            transacionAjax_Ciudades_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Ciudades_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var campo_1 = $("#Select_Pais").val();
    var campo_2 = $("#Txt_ID").val();
    var campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (campo_1 == "-1" || campo_2 == "" || campo_3 == "") {
        validar = 1;
        if (campo_1 == "-1") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (campo_2 == "") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }
        if (campo_3 == "") {
            $("#Img3").css("display", "inline-table");
        }
        else {
            $("#Img3").css("display", "none");
        }

    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
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
function Table_Ciudades() {

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
function Tabla_eliminar() {
    var html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
    for (itemArray in ArrayCiudades) {
        if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
            html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayCiudades[itemArray].Pais_ID + "','" + ArrayCiudades[itemArray].Ciudades_ID + "')\"></input></td><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ciudades += "</tbody></table>";
    $("#container_TCiudades").html("");
    $("#container_TCiudades").html(html_Ciudades);

    $(".Eliminar").click(function () {
    });

    $("#TCiudades").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Pais, index_Ciudades) {

    for (itemArray in ArrayCiudades) {
        if (index_Pais == ArrayCiudades[itemArray].Pais_ID && index_Ciudades == ArrayCiudades[itemArray].Ciudades_ID) {
            editPais_ID = ArrayCiudades[itemArray].Pais_ID;
            editID = ArrayCiudades[itemArray].Ciudades_ID;

            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
    for (itemArray in ArrayCiudades) {
        if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
            html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayCiudades[itemArray].Pais_ID + "','" + ArrayCiudades[itemArray].Ciudades_ID + "')\"></input></td><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ciudades += "</tbody></table>";
    $("#container_TCiudades").html("");
    $("#container_TCiudades").html(html_Ciudades);

    $(".Editar").click(function () {
    });

    $("#TCiudades").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Pais, index_Ciudades) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayCiudades) {
        if (index_Pais == ArrayCiudades[itemArray].Pais_ID && index_Ciudades == ArrayCiudades[itemArray].Ciudades_ID) {
            $("#Txt_ID").val(ArrayCiudades[itemArray].Ciudades_ID);
            $("#Select_Pais").val(ArrayCiudades[itemArray].Pais_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#Select_Pais").attr("disabled", "disabled");
            $("#TxtDescription").val(ArrayCiudades[itemArray].Descripcion);
            editPais_ID = ArrayCiudades[itemArray].Pais_ID;
            editID = ArrayCiudades[itemArray].Ciudades_ID;
            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');

        }
    }
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_Ciudades = "<table id='TCiudades' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Pais</th><th>Codigo</th><th>Ciudad</th></tr></thead><tbody>";
    for (itemArray in ArrayCiudades) {
        if (ArrayCiudades[itemArray].Ciudades_ID != 0) {
            html_Ciudades += "<tr id= 'TCiudades_" + ArrayCiudades[itemArray].Ciudades_ID + "'><td>" + ArrayCiudades[itemArray].Pais_ID + " - " + ArrayCiudades[itemArray].DescripPais + "</td><td>" + ArrayCiudades[itemArray].Ciudades_ID + "</td><td>" + ArrayCiudades[itemArray].Descripcion + "</td></tr>";
        }
    }
    html_Ciudades += "</tbody></table>";
    $("#container_TCiudades").html("");
    $("#container_TCiudades").html(html_Ciudades);

    $("#TCiudades").dataTable({
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
    $("#TxtDescription").val("");
    $("#Select_Pais").val("169");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

}
/*--------------- region de variables globales --------------------*/
var ArrayPaises = [];
var ArrayCombo = [];

var Matrix_Moneda = [];
var Matrix_Calendarios = [];

var estado;
var editID;
var editDia;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    transacionAjax_CargaBusqueda("cargar_droplist_busqueda");

    transacionAjax_Moneda("Moneda");

    transacionAjax_Calendario("MatrixCalendarios");

    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#ImgMon").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
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
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $("#Btnguardar").css("display", "inline-table");
            Enabled_Pais();
            ResetError();
            Clear();
            estado = opcion;
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPaises").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPaises").html("");
            estado = opcion;
            Enabled_Pais();
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPaises").html("");
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
        transacionAjax_Paises("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Paises("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Paises_create("crear");
        }
        else {
            transacionAjax_Paises_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_Paises_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_Codigo").val();
    var Campo_2 = $("#Txt_Pais").val();
    var Campo_3 = $("#Select_moneda").val();
    var Campo_4 = $("#Select_Calendario").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "" || Campo_3 == "" || Campo_3 == "-1" || Campo_3 == null || Campo_4 == "" || Campo_4 == "-1" || Campo_4 == null) {
        validar = 1;
        if (Campo_1 == "") {
            $("#ImgID").css("display", "inline-table");
        }
        else {
            $("#ImgID").css("display", "none");
        }
        if (Campo_2 == "") {
            $("#Img1").css("display", "inline-table");
        }
        else {
            $("#Img1").css("display", "none");
        }
        if (Campo_3 == "" || Campo_3 == "-1" || Campo_3 == null) {
            $("#ImgMon").css("display", "inline-table");
        }
        else {
            $("#ImgMon").css("display", "none");
        }
        if (Campo_4 == "" || Campo_4 == "-1" || Campo_4 == null) {
            $("#ImgCal").css("display", "inline-table");
        }
        else {
            $("#ImgCal").css("display", "none");
        }
    }
    else {
        $("#Img1").css("display", "none");
        $("#ImgID").css("display", "none");
        $("#ImgMon").css("display", "none");
        $("#ImgCal").css("display", "none");
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
function Table_Paises() {

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
    var html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Eliminar</th><th>Codigo</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Cod != 0) {
            html_TPaises += "<tr id= 'TPaises_" + ArrayPaises[itemArray].Cod + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPaises[itemArray].Cod + "')\"></input></td><td><input type ='radio' class= 'Eliminar' name='eliminar' onclick=\"Eliminar('" + ArrayPaises[itemArray].Cod + "')\"></input></td><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td></tr>";
        }
    }
    html_TPaises += "</tbody></table>";
    $("#container_TPaises").html("");
    $("#container_TPaises").html(html_TPaises);

    $(".Eliminar").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Paises) {
    for (itemArray in ArrayPaises) {
        if (index_Paises == ArrayPaises[itemArray].Cod) {
            editID = ArrayPaises[itemArray].Cod;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

//grid con el boton editar
function Tabla_modificar() {
    var html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Editar</th><th>Codigo</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Cod != 0) {
            html_TPaises += "<tr id= 'TPaises_" + ArrayPaises[itemArray].Cod + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPaises[itemArray].Cod + "')\"></input></td><td><input type ='radio' class= 'Editar' name='editar' onclick=\"Editar('" + ArrayPaises[itemArray].Cod + "')\"></input></td><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td></tr>";
        }
    }
    html_TPaises += "</tbody></table>";
    $("#container_TPaises").html("");
    $("#container_TPaises").html(html_TPaises);

    $(".Editar").click(function () {
    });

    $("#TPaises").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

// muestra el registro a editar
function Editar(index_Paises) {
    Search_Pais(index_Paises);    
    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    $("#Btnguardar").attr("value", "Actualizar");
    $("#Btnguardar").css("display", "inline-table");  
}

// muestra el registro 
function Ver(index_Paises) {

    Disabled_Pais();
    Search_Pais(index_Paises);

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaHoras").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");
   
    $("#Btnguardar").css("display", "none");
    
}

//grid sin botones para ver resultado
function Tabla_consulta() {
    var html_TPaises = "<table id='TPaises' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Ver</th><th>Codigo</th><th>Nombre</th></tr></thead><tbody>";
    for (itemArray in ArrayPaises) {
        if (ArrayPaises[itemArray].Cod != 0) {
            html_TPaises += "<tr id= 'TPaises_" + ArrayPaises[itemArray].Cod + "'><td><input type ='radio' class= 'Ver' name='ver' onclick=\"Ver('" + ArrayPaises[itemArray].Cod + "')\"></input></td><td>" + ArrayPaises[itemArray].Cod + "</td><td>" + ArrayPaises[itemArray].Name + "</td></tr>";
        }
    }
    html_TPaises += "</tbody></table>";
    $("#container_TPaises").html("");
    $("#container_TPaises").html(html_TPaises);

    $("#TPaises").dataTable({
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
    $("#Txt_Codigo").val("");
    $("#Txt_Pais").val("");
    $("#TxtRead").val("");
    $("#Select_Calendario").val("-1");
    $("#Select_moneda").val("-1");
    $("#TxtSWIFT").val("");

    $("#DDLColumns").val("-1");
    
    $('.C_Chosen').trigger('chosen:updated');
}

// muestra el registro selccionado
function Search_Pais(index_Paises) {
    
    for (itemArray in ArrayPaises) {
        if (index_Paises == ArrayPaises[itemArray].Cod) {
            $("#Txt_Codigo").val(ArrayPaises[itemArray].Cod);
            $("#Txt_Codigo").attr("disabled", "disabled");
            $("#Txt_Pais").val(ArrayPaises[itemArray].Name);
            editID = ArrayPaises[itemArray].Cod;
           
            if (ArrayPaises[itemArray].Moneda == "") {
                $("#Select_moneda").val("-1");
            }
            else {
                $("#Select_moneda").val(ArrayPaises[itemArray].Moneda);
            }

            $("#TxtSWIFT").val(ArrayPaises[itemArray].SWIFT);

            if (ArrayPaises[itemArray].Moneda == "") {
                $("#Select_Calendario").val("-1");
            }
            else {
                $("#Select_Calendario").val(ArrayPaises[itemArray].Calendario_ID);
            }

            $('.C_Chosen').trigger('chosen:updated');

        }
    }
}

//BLOQUEA LOS CONTROLES
function Disabled_Pais() {

    $("#Txt_Codigo").attr("disabled", "disabled");
    $("#Txt_Pais").attr("disabled", "disabled");
    $("#Select_moneda").attr("disabled", "disabled");
    $("#TxtSWIFT").attr("disabled", "disabled");

    $("#Select_Calendario").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated');

}

//DES-BLOQUEA LOS CONTROLES
function Enabled_Pais() {

    $("#Txt_Codigo").removeAttr("disabled");
    $("#Txt_Pais").removeAttr("disabled");
    $("#Select_moneda").removeAttr("disabled");
    $("#TxtSWIFT").removeAttr("disabled");
    $("#Select_Calendario").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');
}
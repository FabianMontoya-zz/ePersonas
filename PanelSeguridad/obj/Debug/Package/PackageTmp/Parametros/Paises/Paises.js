/*--------------- region de variables globales --------------------*/
var ArrayPaises = [];
var ArrayCombo = [];
var ArrayMoneda = [];

var estado;
var editID;
var editDia;
/*--------------- region de variables globales --------------------*/

//evento load de los Links
$(document).ready(function () {
    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_Moneda('Moneda');
    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WE").css("display", "none");

    $("#TablaDatos_D").css("display", "none");
    $("#TablaHoras").css("display", "none");
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

    $(function () {
        $("#TxtIniLun1").timepicker();
        $("#TxtFinLun1").timepicker();
        $("#TxtIniLun2").timepicker();
        $("#TxtFinLun2").timepicker();
        $("#TxtIniLun3").timepicker();
        $("#TxtFinLun3").timepicker();
        $("#TxtIniLun4").timepicker();
        $("#TxtFinLun4").timepicker();
        $("#TxtIniMar1").timepicker();
        $("#TxtFinMar1").timepicker();
        $("#TxtIniMar2").timepicker();
        $("#TxtFinMar2").timepicker();
        $("#TxtIniMar3").timepicker();
        $("#TxtFinMar3").timepicker();
        $("#TxtIniMar4").timepicker();
        $("#TxtFinMar4").timepicker();
        $("#TxtIniMie1").timepicker();
        $("#TxtFinMie1").timepicker();
        $("#TxtIniMie2").timepicker();
        $("#TxtFinMie2").timepicker();
        $("#TxtIniMie3").timepicker();
        $("#TxtFinMie3").timepicker();
        $("#TxtIniMie4").timepicker();
        $("#TxtFinMie4").timepicker();
        $("#TxtIniJue1").timepicker();
        $("#TxtFinJue1").timepicker();
        $("#TxtIniJue2").timepicker();
        $("#TxtFinJue2").timepicker();
        $("#TxtIniJue3").timepicker();
        $("#TxtFinJue3").timepicker();
        $("#TxtIniJue4").timepicker();
        $("#TxtFinJue4").timepicker();
        $("#TxtIniVie1").timepicker();
        $("#TxtFinVie1").timepicker();
        $("#TxtIniVie2").timepicker();
        $("#TxtFinVie2").timepicker();
        $("#TxtIniVie3").timepicker();
        $("#TxtFinVie3").timepicker();
        $("#TxtIniVie4").timepicker();
        $("#TxtFinVie4").timepicker();
        $("#TxtIniSab1").timepicker();
        $("#TxtFinSab1").timepicker();
        $("#TxtIniSab2").timepicker();
        $("#TxtFinSab2").timepicker();
        $("#TxtIniSab3").timepicker();
        $("#TxtFinSab3").timepicker();
        $("#TxtIniSab4").timepicker();
        $("#TxtFinSab4").timepicker();
        $("#TxtIniDom1").timepicker();
        $("#TxtFinDom1").timepicker();
        $("#TxtIniDom2").timepicker();
        $("#TxtFinDom2").timepicker();
        $("#TxtIniDom3").timepicker();
        $("#TxtFinDom3").timepicker();
        $("#TxtIniDom4").timepicker();
        $("#TxtFinDom4").timepicker();
    });

    Break_hora();
});

function Break_hora() {

    $('.Hours').focus(function () {
        this.value = "";
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

            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaHoras").css("display", "inline-table");
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
            $("#TablaHoras").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPaises").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaHoras").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TPaises").html("");
            estado = opcion;
            Enabled_Pais();
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaHoras").css("display", "none");
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

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
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
    }
    else {
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
    $("#TablaHoras").css("display", "inline-table");
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

    $("#Select_moneda").val("-1");
    $("#TxtSWIFT").val("");

    $("#DDLColumns").val("-1");
    $("#TxtFinLun1").val("");
    $("#TxtIniLun1").val("");
    $("#TxtIniLun2").val("");
    $("#TxtFinLun2").val("");
    $("#TxtIniLun3").val("");
    $("#TxtFinLun3").val("");
    $("#TxtIniLun4").val("");
    $("#TxtFinLun4").val("");
    $("#TxtIniMar1").val("");
    $("#TxtFinMar1").val("");
    $("#TxtIniMar2").val("");
    $("#TxtFinMar2").val("");
    $("#TxtIniMar3").val("");
    $("#TxtFinMar3").val("");
    $("#TxtIniMar4").val("");
    $("#TxtFinMar4").val("");
    $("#TxtIniMie1").val("");
    $("#TxtFinMie1").val("");
    $("#TxtIniMie2").val("");
    $("#TxtFinMie2").val("");
    $("#TxtIniMie3").val("");
    $("#TxtFinMie3").val("");
    $("#TxtIniMie4").val("");
    $("#TxtFinMie4").val("");
    $("#TxtIniJue1").val("");
    $("#TxtFinJue1").val("");
    $("#TxtIniJue2").val("");
    $("#TxtFinJue2").val("");
    $("#TxtIniJue3").val("");
    $("#TxtFinJue3").val("");
    $("#TxtIniJue4").val("");
    $("#TxtFinJue4").val("");
    $("#TxtIniVie1").val("");
    $("#TxtFinVie1").val("");
    $("#TxtIniVie2").val("");
    $("#TxtFinVie2").val("");
    $("#TxtIniVie3").val("");
    $("#TxtFinVie3").val("");
    $("#TxtIniVie4").val("");
    $("#TxtFinVie4").val("");
    $("#TxtIniSab1").val("");
    $("#TxtFinSab1").val("");
    $("#TxtIniSab2").val("");
    $("#TxtFinSab2").val("");
    $("#TxtIniSab3").val("");
    $("#TxtFinSab3").val("");
    $("#TxtIniSab4").val("");
    $("#TxtFinSab4").val("");
    $("#TxtIniDom1").val("");
    $("#TxtFinDom1").val("");
    $("#TxtIniDom2").val("");
    $("#TxtFinDom2").val("");
    $("#TxtIniDom3").val("");
    $("#TxtFinDom3").val("");
    $("#TxtIniDom4").val("");
    $("#TxtFinDom4").val("");

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
           
            if (ArrayPaises[itemArray].Moneda == "")
                $("#Select_moneda").val("-1");
            else
                $("#Select_moneda").val(ArrayPaises[itemArray].Moneda);

            $("#TxtSWIFT").val(ArrayPaises[itemArray].SWIFT);

            $("#Select_StateLun").val(ArrayPaises[itemArray].Est_LUN);
            $("#Select_StateMar").val(ArrayPaises[itemArray].Est_MAR);
            $("#Select_StateMie").val(ArrayPaises[itemArray].Est_MIE);
            $("#Select_StateJue").val(ArrayPaises[itemArray].Est_JUE);
            $("#Select_StateVie").val(ArrayPaises[itemArray].Est_VIE);
            $("#Select_StateSab").val(ArrayPaises[itemArray].Est_SAB);
            $("#Select_StateDom").val(ArrayPaises[itemArray].Est_DOM);
            $("#TxtFinLun1").val(ArrayPaises[itemArray].HoF1_LUN);
            $("#TxtIniLun1").val(ArrayPaises[itemArray].HoI1_LUN);
            $("#TxtIniLun2").val(ArrayPaises[itemArray].HoI2_LUN);
            $("#TxtFinLun2").val(ArrayPaises[itemArray].HoF2_LUN);
            $("#TxtIniLun3").val(ArrayPaises[itemArray].HoI3_LUN);
            $("#TxtFinLun3").val(ArrayPaises[itemArray].HoF3_LUN);
            $("#TxtIniLun4").val(ArrayPaises[itemArray].HoI4_LUN);
            $("#TxtFinLun4").val(ArrayPaises[itemArray].HoF4_LUN);
            $("#TxtIniMar1").val(ArrayPaises[itemArray].HoI1_MAR);
            $("#TxtFinMar1").val(ArrayPaises[itemArray].HoF1_MAR);
            $("#TxtIniMar2").val(ArrayPaises[itemArray].HoI2_MAR);
            $("#TxtFinMar2").val(ArrayPaises[itemArray].HoF2_MAR);
            $("#TxtIniMar3").val(ArrayPaises[itemArray].HoI3_MAR);
            $("#TxtFinMar3").val(ArrayPaises[itemArray].HoF3_MAR);
            $("#TxtIniMar4").val(ArrayPaises[itemArray].HoI4_MAR);
            $("#TxtFinMar4").val(ArrayPaises[itemArray].HoF4_MAR);
            $("#TxtIniMie1").val(ArrayPaises[itemArray].HoI1_MIE);
            $("#TxtFinMie1").val(ArrayPaises[itemArray].HoF1_MIE);
            $("#TxtIniMie2").val(ArrayPaises[itemArray].HoI2_MIE);
            $("#TxtFinMie2").val(ArrayPaises[itemArray].HoF2_MIE);
            $("#TxtIniMie3").val(ArrayPaises[itemArray].HoI3_MIE);
            $("#TxtFinMie3").val(ArrayPaises[itemArray].HoF3_MIE);
            $("#TxtIniMie4").val(ArrayPaises[itemArray].HoI4_MIE);
            $("#TxtFinMie4").val(ArrayPaises[itemArray].HoF4_MIE);
            $("#TxtIniJue1").val(ArrayPaises[itemArray].HoI1_JUE);
            $("#TxtFinJue1").val(ArrayPaises[itemArray].HoF1_JUE);
            $("#TxtIniJue2").val(ArrayPaises[itemArray].HoI2_JUE);
            $("#TxtFinJue2").val(ArrayPaises[itemArray].HoF2_JUE);
            $("#TxtIniJue3").val(ArrayPaises[itemArray].HoI3_JUE);
            $("#TxtFinJue3").val(ArrayPaises[itemArray].HoF3_JUE);
            $("#TxtIniJue4").val(ArrayPaises[itemArray].HoI4_JUE);
            $("#TxtFinJue4").val(ArrayPaises[itemArray].HoF4_JUE);
            $("#TxtIniVie1").val(ArrayPaises[itemArray].HoI1_VIE);
            $("#TxtFinVie1").val(ArrayPaises[itemArray].HoF1_VIE);
            $("#TxtIniVie2").val(ArrayPaises[itemArray].HoI2_VIE);
            $("#TxtFinVie2").val(ArrayPaises[itemArray].HoF2_VIE);
            $("#TxtIniVie3").val(ArrayPaises[itemArray].HoI3_VIE);
            $("#TxtFinVie3").val(ArrayPaises[itemArray].HoF3_VIE);
            $("#TxtIniVie4").val(ArrayPaises[itemArray].HoI4_VIE);
            $("#TxtFinVie4").val(ArrayPaises[itemArray].HoF4_VIE);
            $("#TxtIniSab1").val(ArrayPaises[itemArray].HoI1_SAB);
            $("#TxtFinSab1").val(ArrayPaises[itemArray].HoF1_SAB);
            $("#TxtIniSab2").val(ArrayPaises[itemArray].HoI2_SAB);
            $("#TxtFinSab2").val(ArrayPaises[itemArray].HoF2_SAB);
            $("#TxtIniSab3").val(ArrayPaises[itemArray].HoI3_SAB);
            $("#TxtFinSab3").val(ArrayPaises[itemArray].HoF3_SAB);
            $("#TxtIniSab4").val(ArrayPaises[itemArray].HoI4_SAB);
            $("#TxtFinSab4").val(ArrayPaises[itemArray].HoF4_SAB);
            $("#TxtIniDom1").val(ArrayPaises[itemArray].HoI1_DOM);
            $("#TxtFinDom1").val(ArrayPaises[itemArray].HoF1_DOM);
            $("#TxtIniDom2").val(ArrayPaises[itemArray].HoI2_DOM);
            $("#TxtFinDom2").val(ArrayPaises[itemArray].HoF2_DOM);
            $("#TxtIniDom3").val(ArrayPaises[itemArray].HoI3_DOM);
            $("#TxtFinDom3").val(ArrayPaises[itemArray].HoF3_DOM);
            $("#TxtIniDom4").val(ArrayPaises[itemArray].HoI4_DOM);
            $("#TxtFinDom4").val(ArrayPaises[itemArray].HoF4_DOM);

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

    $("#Select_StateLun").attr("disabled", "disabled");
    $("#Select_StateMar").attr("disabled", "disabled");
    $("#Select_StateMie").attr("disabled", "disabled");
    $("#Select_StateJue").attr("disabled", "disabled");
    $("#Select_StateVie").attr("disabled", "disabled");
    $("#Select_StateSab").attr("disabled", "disabled");
    $("#Select_StateDom").attr("disabled", "disabled");
    $("#TxtFinLun1").attr("disabled", "disabled");
    $("#TxtIniLun1").attr("disabled", "disabled");
    $("#TxtIniLun2").attr("disabled", "disabled");
    $("#TxtFinLun2").attr("disabled", "disabled");
    $("#TxtIniLun3").attr("disabled", "disabled");
    $("#TxtFinLun3").attr("disabled", "disabled");
    $("#TxtIniLun4").attr("disabled", "disabled");
    $("#TxtFinLun4").attr("disabled", "disabled");
    $("#TxtIniMar1").attr("disabled", "disabled");
    $("#TxtFinMar1").attr("disabled", "disabled");
    $("#TxtIniMar2").attr("disabled", "disabled");
    $("#TxtFinMar2").attr("disabled", "disabled");
    $("#TxtIniMar3").attr("disabled", "disabled");
    $("#TxtFinMar3").attr("disabled", "disabled");
    $("#TxtIniMar4").attr("disabled", "disabled");
    $("#TxtFinMar4").attr("disabled", "disabled");
    $("#TxtIniMie1").attr("disabled", "disabled");
    $("#TxtFinMie1").attr("disabled", "disabled");
    $("#TxtIniMie2").attr("disabled", "disabled");
    $("#TxtFinMie2").attr("disabled", "disabled");
    $("#TxtIniMie3").attr("disabled", "disabled");
    $("#TxtFinMie3").attr("disabled", "disabled");
    $("#TxtIniMie4").attr("disabled", "disabled");
    $("#TxtFinMie4").attr("disabled", "disabled");
    $("#TxtIniJue1").attr("disabled", "disabled");
    $("#TxtFinJue1").attr("disabled", "disabled");
    $("#TxtIniJue2").attr("disabled", "disabled");
    $("#TxtFinJue2").attr("disabled", "disabled");
    $("#TxtIniJue3").attr("disabled", "disabled");
    $("#TxtFinJue3").attr("disabled", "disabled");
    $("#TxtIniJue4").attr("disabled", "disabled");
    $("#TxtFinJue4").attr("disabled", "disabled");
    $("#TxtIniVie1").attr("disabled", "disabled");
    $("#TxtFinVie1").attr("disabled", "disabled");
    $("#TxtIniVie2").attr("disabled", "disabled");
    $("#TxtFinVie2").attr("disabled", "disabled");
    $("#TxtIniVie3").attr("disabled", "disabled");
    $("#TxtFinVie3").attr("disabled", "disabled");
    $("#TxtIniVie4").attr("disabled", "disabled");
    $("#TxtFinVie4").attr("disabled", "disabled");
    $("#TxtIniSab1").attr("disabled", "disabled");
    $("#TxtFinSab1").attr("disabled", "disabled");
    $("#TxtIniSab2").attr("disabled", "disabled");
    $("#TxtFinSab2").attr("disabled", "disabled");
    $("#TxtIniSab3").attr("disabled", "disabled");
    $("#TxtFinSab3").attr("disabled", "disabled");
    $("#TxtIniSab4").attr("disabled", "disabled");
    $("#TxtFinSab4").attr("disabled", "disabled");
    $("#TxtIniDom1").attr("disabled", "disabled");
    $("#TxtFinDom1").attr("disabled", "disabled");
    $("#TxtIniDom2").attr("disabled", "disabled");
    $("#TxtFinDom2").attr("disabled", "disabled");
    $("#TxtIniDom3").attr("disabled", "disabled");
    $("#TxtFinDom3").attr("disabled", "disabled");
    $("#TxtIniDom4").attr("disabled", "disabled");
    $("#TxtFinDom4").attr("disabled", "disabled");

    $('.C_Chosen').trigger('chosen:updated');

}

//DES-BLOQUEA LOS CONTROLES
function Enabled_Pais() {

    $("#Txt_Codigo").removeAttr("disabled");
    $("#Txt_Pais").removeAttr("disabled");
    $("#Select_moneda").removeAttr("disabled");
    $("#TxtSWIFT").removeAttr("disabled");

    $("#Select_StateLun").removeAttr("disabled");
    $("#Select_StateMar").removeAttr("disabled");
    $("#Select_StateMie").removeAttr("disabled");
    $("#Select_StateJue").removeAttr("disabled");
    $("#Select_StateVie").removeAttr("disabled");
    $("#Select_StateSab").removeAttr("disabled");
    $("#Select_StateDom").removeAttr("disabled");
    $("#TxtFinLun1").removeAttr("disabled");
    $("#TxtIniLun1").removeAttr("disabled");
    $("#TxtIniLun2").removeAttr("disabled");
    $("#TxtFinLun2").removeAttr("disabled");
    $("#TxtIniLun3").removeAttr("disabled");
    $("#TxtFinLun3").removeAttr("disabled");
    $("#TxtIniLun4").removeAttr("disabled");
    $("#TxtFinLun4").removeAttr("disabled");
    $("#TxtIniMar1").removeAttr("disabled");
    $("#TxtFinMar1").removeAttr("disabled");
    $("#TxtIniMar2").removeAttr("disabled");
    $("#TxtFinMar2").removeAttr("disabled");
    $("#TxtIniMar3").removeAttr("disabled");
    $("#TxtFinMar3").removeAttr("disabled");
    $("#TxtIniMar4").removeAttr("disabled");
    $("#TxtFinMar4").removeAttr("disabled");
    $("#TxtIniMie1").removeAttr("disabled");
    $("#TxtFinMie1").removeAttr("disabled");
    $("#TxtIniMie2").removeAttr("disabled");
    $("#TxtFinMie2").removeAttr("disabled");
    $("#TxtIniMie3").removeAttr("disabled");
    $("#TxtFinMie3").removeAttr("disabled");
    $("#TxtIniMie4").removeAttr("disabled");
    $("#TxtFinMie4").removeAttr("disabled");
    $("#TxtIniJue1").removeAttr("disabled");
    $("#TxtFinJue1").removeAttr("disabled");
    $("#TxtIniJue2").removeAttr("disabled");
    $("#TxtFinJue2").removeAttr("disabled");
    $("#TxtIniJue3").removeAttr("disabled");
    $("#TxtFinJue3").removeAttr("disabled");
    $("#TxtIniJue4").removeAttr("disabled");
    $("#TxtFinJue4").removeAttr("disabled");
    $("#TxtIniVie1").removeAttr("disabled");
    $("#TxtFinVie1").removeAttr("disabled");
    $("#TxtIniVie2").removeAttr("disabled");
    $("#TxtFinVie2").removeAttr("disabled");
    $("#TxtIniVie3").removeAttr("disabled");
    $("#TxtFinVie3").removeAttr("disabled");
    $("#TxtIniVie4").removeAttr("disabled");
    $("#TxtFinVie4").removeAttr("disabled");
    $("#TxtIniSab1").removeAttr("disabled");
    $("#TxtFinSab1").removeAttr("disabled");
    $("#TxtIniSab2").removeAttr("disabled");
    $("#TxtFinSab2").removeAttr("disabled");
    $("#TxtIniSab3").removeAttr("disabled");
    $("#TxtFinSab3").removeAttr("disabled");
    $("#TxtIniSab4").removeAttr("disabled");
    $("#TxtFinSab4").removeAttr("disabled");
    $("#TxtIniDom1").removeAttr("disabled");
    $("#TxtFinDom1").removeAttr("disabled");
    $("#TxtIniDom2").removeAttr("disabled");
    $("#TxtFinDom2").removeAttr("disabled");
    $("#TxtIniDom3").removeAttr("disabled");
    $("#TxtFinDom3").removeAttr("disabled");
    $("#TxtIniDom4").removeAttr("disabled");
    $("#TxtFinDom4").removeAttr("disabled");

    $('.C_Chosen').trigger('chosen:updated');

}
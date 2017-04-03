/*--------------- region de variables globales --------------------*/
var ArrayTransacciones = [];
var ArrayCombo = [];
var ArrayEmpresaNit = [];

var estado;
var editID;
var editNit_ID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
  
    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente')

});

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();

    $("#ESelect").css("display", "none");
    $("#ImgID").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img1").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");

    $("#TablaConsulta").css("display", "none");

}

//funcion para las ventanas emergentes
function Ventanas_Emergentes() {

    Load_Charge_Sasif(); //Carga de "SasifMaster.js" el Control de Carga

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

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Dialog_Datos").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}

//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            ResetError();
            Clear();
            estado = opcion;

            $("#Select_EmpresaNit").removeAttr("disabled");
            $('.C_Chosen').trigger('chosen:updated');

            VerificarNIT("Select_EmpresaNit");

            break;

        case "buscar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
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

    OpenControl(); //Abrimos el load de espera con el logo

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_Transacciones("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Transacciones("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Transacciones_create("crear");
        }
        else {
            transacionAjax_Transacciones_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Transacciones_delete("elimina");
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Txt_ID").val();
    var Campo_2 = $("#TxtDescripcion").val();
    var Campo_3 = $("#Select_EmpresaNit").val();

    var validar = 0;

    if (Campo_3 == "-1" | Campo_2 == "" || Campo_1 == "") {
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
        if (Campo_3 == "-1") {
            $("#Img2").css("display", "inline-table");
        }
        else {
            $("#Img2").css("display", "none");
        }

    }
    else {
        $("#Img2").css("display", "none");
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
function Table_Transacciones() {

    switch (estado) {

        case "buscar":
            //Jhon
            var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayTransacciones) {
                if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
                    html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayTransacciones) {
                if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
                    html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayTransacciones[itemArray].Nit_ID + "','" + ArrayTransacciones[itemArray].Transacciones_ID + "')\"></img><span>Editar Transacción</span></span></td><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            var html_Transacciones = "<table id='TTransacciones' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Nit Empresa</th><th>Codigo</th><th>Descripción</th></tr></thead><tbody>";
            for (itemArray in ArrayTransacciones) {
                if (ArrayTransacciones[itemArray].Transacciones_ID != 0) {
                    html_Transacciones += "<tr id= 'TTransacciones_" + ArrayTransacciones[itemArray].Transacciones_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayTransacciones[itemArray].Nit_ID + "','" + ArrayTransacciones[itemArray].Transacciones_ID + "')\"></img><span>Eliminar Transacción</span></span></td><td>" + ArrayTransacciones[itemArray].Nit_ID + "</td><td>" + ArrayTransacciones[itemArray].Transacciones_ID + "</td><td>" + ArrayTransacciones[itemArray].Descripcion + "</td></tr>";
                }
            }
            break;
    }

    html_Transacciones += "</tbody></table>";
    $(".container_TGrid").html("");
    $(".container_TGrid").html(html_Transacciones);

    $("#TTransacciones").dataTable({
        "bJQueryUI": true,
        "iDisplayLength": 1000,
        "bDestroy": true
    });
}


//muestra el registro a eliminar
function Eliminar(index_Nit, index_Transacciones) {

    for (itemArray in ArrayTransacciones) {
        if (index_Nit == ArrayTransacciones[itemArray].Nit_ID && index_Transacciones == ArrayTransacciones[itemArray].Transacciones_ID) {

            editNit_ID = ArrayTransacciones[itemArray].Nit_ID;
            editID = ArrayTransacciones[itemArray].Transacciones_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Transacciones) {

    $(".Dialog_Datos").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");

    for (itemArray in ArrayTransacciones) {
        if (index_Nit == ArrayTransacciones[itemArray].Nit_ID && index_Transacciones == ArrayTransacciones[itemArray].Transacciones_ID) {
            editNit_ID = ArrayTransacciones[itemArray].Nit_ID;
            editID = ArrayTransacciones[itemArray].Transacciones_ID;

            $("#Select_EmpresaNit").val(ArrayTransacciones[itemArray].Nit_ID);

            $("#Txt_ID").val(ArrayTransacciones[itemArray].Transacciones_ID);
            $("#Txt_ID").attr("disabled", "disabled");
            $("#TxtDescripcion").val(ArrayTransacciones[itemArray].Descripcion);
            $("#Btnguardar").attr("value", "Actualizar");
            $("#Select_EmpresaNit").attr("disabled", "disabled");


            $('.C_Chosen').trigger('chosen:updated');

        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescripcion").val("");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1").trigger("chosen:updated");
    $('.C_Chosen').trigger('chosen:updated');
    VerificarNIT("Select_EmpresaNit");
}
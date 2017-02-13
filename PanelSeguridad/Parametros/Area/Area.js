/*--------------- region de variables globales --------------------*/
var ArrayArea = [];
var ArrayCombo = [];
var ArrayAreaDep = [];
var ArraySeguridad = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TArea").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');

    Change_Select_Nit();
});

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

//Función que oculta todas las IMG de los errores en pantalla
function Ocultar_Errores() {
    ResetError();
    $("#ESelect").css("display", "none");
    $("#Img1").css("display", "none");
    $("#Img2").css("display", "none");
    $("#Img3").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos_D").css("display", "none");
    $("#TablaConsulta").css("display", "none");
}


//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });
}

function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        transacionAjax_AreaDepend('Area_Dep', index_ID);
        transacionAjax_Seguridad('Seguridad', index_ID);
    }
}


//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $("#TablaDatos_D").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TArea").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TArea").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TArea").html("");
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
        transacionAjax_Area("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_Area("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_Area_create("crear");
        }
        else {
            transacionAjax_Area_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    OpenControl(); //Abrimos el load de espera con el logo
    transacionAjax_Area_delete("elimina");
    filtro = "N";
    opcion = "ALL";
    transacionAjax_Area("consulta", filtro, opcion);
}


//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();

    var validar = 0;

    if (Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1") {
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
function Table_Area() {

    switch (estado) {

        case "buscar":
            var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {

                if (ArrayArea[itemArray].Area_ID != 0) {
                    var dependencia;

                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {
                if (ArrayArea[itemArray].Area_ID != 0) {
                    var dependencia;

                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayArea[itemArray].Nit_ID + "','" + ArrayArea[itemArray].Area_ID + "')\"></img><span>Editar Area</span></span></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            var html_Area = "<table id='TArea' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Descripción</th><th>Area Que Depende</th><th>Politica de Seguridad</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayArea) {
                if (ArrayArea[itemArray].Area_ID != 0) {
                    var dependencia;

                    if (ArrayArea[itemArray].AreaDependencia == 0)
                        dependencia = "";
                    else
                        dependencia = ArrayArea[itemArray].DescripAreaDepen;

                    html_Area += "<tr id= 'TArea_" + ArrayArea[itemArray].Area_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayArea[itemArray].Nit_ID + "','" + ArrayArea[itemArray].Area_ID + "')\"></img><span>Eliminar Area</span></td><td>" + ArrayArea[itemArray].Nit_ID + " - " + ArrayArea[itemArray].DescripEmpresa + "</td><td>" + ArrayArea[itemArray].Area_ID + "</td><td>" + ArrayArea[itemArray].Descripcion + "</td><td>" + dependencia + "</td><td>" + ArrayArea[itemArray].DescripPolitica + "</td><td>" + ArrayArea[itemArray].UsuarioCreacion + "</td><td>" + ArrayArea[itemArray].FechaCreacion + "</td><td>" + ArrayArea[itemArray].UsuarioActualizacion + "</td><td>" + ArrayArea[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Area += "</tbody></table>";
    $("#container_TArea").html("");
    $("#container_TArea").html(html_Area);

    $("#TArea").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Area) {

    for (itemArray in ArrayArea) {
        if (index_Nit == ArrayArea[itemArray].Nit_ID && index_Area == ArrayArea[itemArray].Area_ID) {
            editID = ArrayArea[itemArray].Area_ID;
            editNit_ID = ArrayArea[itemArray].Nit_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Area) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");
    var vl_index_Area;
    var vl_index_Politica;

    for (itemArray in ArrayArea) {
        if (index_Nit == ArrayArea[itemArray].Nit_ID && index_Area == ArrayArea[itemArray].Area_ID) {

            editNit_ID = ArrayArea[itemArray].Nit_ID;
            editID = ArrayArea[itemArray].Area_ID;

            $("#Select_EmpresaNit").val(ArrayArea[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayArea[itemArray].Area_ID);

            setTimeout("Change_Select_Nit();", 200);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtDescription").val(ArrayArea[itemArray].Descripcion);

            if (ArrayArea[itemArray].AreaDependencia == 0) {
                setTimeout("$('#Select_AreaDepent').val('-1').trigger('chosen:updated');", 400);
            } else {
                vl_index_Area = ArrayArea[itemArray].AreaDependencia;
                console.log(vl_index_Area);
                setTimeout("$('#Select_AreaDepent').val('" + vl_index_Area + "').trigger('chosen:updated');", 400);
            }

            if (ArrayArea[itemArray].Politica_ID == 0) {
                setTimeout("$('#Select_Politica').val('-1').trigger('chosen:updated');", 400);
            } else {
                vl_index_Politica = ArrayArea[itemArray].Politica_ID;
                setTimeout("$('#Select_Politica').val('" + vl_index_Politica + "').trigger('chosen:updated');", 400);
            }
            $("#Btnguardar").attr("value", "Actualizar");
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
    $("#TxtDescription").val("");
    $("#Select_AreaDepent").val("-1");
    $("#Select_Politica").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }

}
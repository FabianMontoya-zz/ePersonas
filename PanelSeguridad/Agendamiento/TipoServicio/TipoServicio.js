/*--------------- region de variables globales --------------------*/
var ArrayTipoServicio = [];
var ArrayCombo = [];
var ArrayTipoServicioDep = [];
var ArraySeguridad = [];
var ArrayEmpresaNit = [];
var Matrix_Moneda = [];
var Matrix_Calendarios = [];
var Matrix_Documento = [];
var ArrayFormato = [];

var estado;
var editNit_ID;
var index_ID;
var editID;
var RutaTemporal;
var RutaRelativa;
var Nit_ID_proccess;
var DescripFormato;
var StrConsecutivo;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    $("#Marco_trabajo_Form").css("height", "490px");
    $("#container_TServicio").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_Formato('Formato');
    transaccionAjax_RutasOperacion('Rutas_Operacion');
    transaccionAjax_MDocumento('Matrx_Documento', Array_G_Usuario[0].Nit_ID);
    transacionAjax_MMoneda('Moneda');

    $(function () {
        $("#Text_Tiempo_Sesion").timepicker();
        $("#Text_Tiempo_Entre_Sesiones").timepicker();
        $("#Tiempo_Max_Agenda").timepicker();
    });
    Change_Select_Nit();

});

//muestra controles de guardado
function HabilitarControl() {
    $("#D_Controls").css("display", "inline-table");
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

    $("#Dialog_Imagen").dialog({
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
    $("#Img5").css("display", "none");
    $("#Img6").css("display", "none");
    $("#Img7").css("display", "none");
    $("#Img12").css("display", "none");
    $("#Img13").css("display", "none");
    $("#ImgCal").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#IF_Visor").css("display", "none");
    $("#foto_servicio").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaConsulta").css("display", "none");
    $("#TablaDatos_D").css("display", "none");
}

//carga el combo de Cargo dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        Nit_ID_proccess = $(this).val();
        TransaccionesSegunNIT(Nit_ID_proccess);
    });
    Change_Select_Moneda();
}

function TransaccionesSegunNIT(vp_index_ID) {
    if (vp_index_ID != "-1") {
        transacionAjax_Calendario('MatrixCalendarios', vp_index_ID);
        transaccionAjax_MDocumento('Matrx_Documento', vp_index_ID);
    }
}

//coloca la sigla de la moneda
function Change_Select_Moneda() {
    $("#Select_Moneda_Cod").change(function () {
        var index_ID = this.value;
        for (item in Matrix_Moneda) {
            if (Matrix_Moneda[item].MonedaCod_ID == index_ID) {
                $("#V_Sigla_1").html(Matrix_Moneda[item].Sigla);
                $("#V_Sigla_2").html(Matrix_Moneda[item].Sigla);
            }
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {

    var filtro;
    var ValidateSelect = ValidarDroplist();
    var opcion;

    if (ValidateSelect == 1) {
        filtro = "N";
        opcion = "ALL";
        transacionAjax_TipoServicio("consulta", filtro, opcion);
    }
    else {
        filtro = "S";
        opcion = $("#DDLColumns").val();
        transacionAjax_TipoServicio("consulta", filtro, opcion);
    }

}

//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            $("#Dialog_Imagen").dialog("open");
            transacionAjax_TipoServicio_create("crear");

        }
        else {
            transacionAjax_TipoServicio_create("modificar");
        }
    }
}

//elimina de la BD
function BtnElimina() {
    transacionAjax_TipoServicio_delete("elimina");
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
    $("#Dialog_Imagen").dialog("close");
    //MensajeHora = "";
}

//muestra dialog de 
function BtnRelacion() {
    $("#Dialog_Imagen").dialog("open");
}

//traer el formado del documento
function BuscarFormato(vp_Formato) {
    var vl_ID_Doc;
    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].DescripFormato == "JPG")
            vl_ID_Doc = Matrix_Documento[item].Documento_ID;
    }
    
    var vl_StrFormato = "1";

    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Documento_ID == vl_ID_Doc)
            vl_StrFormato = Matrix_Documento[item].DescripFormato;
    }
    for (item in Matrix_Documento) {
        if (Matrix_Documento[item].Nit_ID == Nit_ID_proccess)
            StrConsecutivo = Matrix_Documento[item].Consecutivo;
    }
    return vl_StrFormato;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
            $("#IF_Visor").css("display", "inline-table");
            $("#foto_servicio").css("display", "inline-table");
            ResetError();
            Clear();
            estado = opcion;
            //$("#Dialog_Calendar").dialog("open");

            var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

            if (OnlyEmpresa == true) {
                TransaccionesSegunNIT($("#Select_EmpresaNit").val());
            }

            StrTFormato = BuscarFormato(Matrix_Documento);
            ContruyeName_Temp("TEMP", StrConsecutivo, StrTFormato);
            break;

        case "buscar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            $("#foto_servicio").css("display", "none");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $("#IF_Visor").css("display", "none");
            $("#foto_servicio").css("display", "none");
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            estado = opcion;
            ResetError();
            Clear();

            break;

        case "eliminar":
            $("#TablaDatos_D").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $("#container_TServicio").html("");
            $("#foto_servicio").css("display", "none");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//validamos campos para la creacion del Servicio
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Txt_ID").val();
    var Campo_3 = $("#TxtDescription").val();
    var Campo_4 = $("#Select_TipoServicio ").val();

    var validar = 0;

    if (Campo_4 == "-1" || Campo_3 == "" || Campo_2 == "" || Campo_1 == "-1") {
        validar = 1;
        if (Campo_1 == "-1") { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "") { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "-1") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");
    }

    return validar;
}

//validamos campos para la creacion del Servicio
function validarCamposFechas() {

    var Campo_1 = $("#TxtF_Start").val();
    var Campo_2 = $("#TxtF_End").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }
    }
    else {
        $("#Img6").css("display", "none");
        $("#Img7").css("display", "none");
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID Servicio                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//grid de Servicio asignados
function TGridCalendar() {

    var html_Servicio;
    html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th colspan='2' class='Grid_Head' >Lunes</th><th colspan='2' class='Grid_Head' >Martes</th><th colspan='2' class='Grid_Head' >Miercoles</th><th colspan='2' class='Grid_Head' >Jueves</th><th colspan='2' class='Grid_Head' >Viernes</th><th colspan='2' class='Grid_Head' >Sabado</th><th colspan='2' class='Grid_Head' >Domingo</th><th colspan='2' class='Grid_Head' >Festivo</th></tr><tr><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th><th colspan='2' class='Grid_Head' >Hora</th></tr><tr><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th><th>Inicial</th><th>Final</th></tr></thead><tbody>";
    for (itemArray in ArrayTipoServicio) {
        html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Servicio_ID + "'><td>" + ArrayTipoServicio[itemArray].IniLun + "</td><td>" + ArrayTipoServicio[itemArray].FinLun + "</td><td>" + ArrayTipoServicio[itemArray].IniMar + "</td><td>" + ArrayTipoServicio[itemArray].FinMar + "</td><td>" + ArrayTipoServicio[itemArray].IniMie + "</td><td>" + ArrayTipoServicio[itemArray].FinMie + "</td><td>" + ArrayTipoServicio[itemArray].IniJue + "</td><td>" + ArrayTipoServicio[itemArray].FinJue + "</td><td>" + ArrayTipoServicio[itemArray].IniVie + "</td><td>" + ArrayTipoServicio[itemArray].FinVie + "</td><td>" + ArrayTipoServicio[itemArray].IniSab + "</td><td>" + ArrayTipoServicio[itemArray].FinSab + "</td><td>" + ArrayTipoServicio[itemArray].IniDom + "</td><td>" + ArrayTipoServicio[itemArray].FinDom + "</td><td>" + ArrayTipoServicio[itemArray].IniF + "</td><td>" + ArrayTipoServicio[itemArray].FinF + "</td></tr>";
    }

    html_Servicio += "</tbody></table>";
    $("#container_TGrid_2").html("");
    $("#container_TGrid_2").html(html_Servicio);

    $("#TServicio").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//limpieza de campos despues de agregar un Servicio al grid
function Clear_Agregar() {

    $("#TxtNombre").val("");
    $("#Select_TipoServicio").val("");
    $("#Text_Referencia").val("");
    $("#Select_Moneda_Cod").val("");
    $("#TxtCosto").val("");
    $("#TxtValor").val("");
    $("#Txt_Detalle").val("");
    $("#Text_Capacidad").val("");
    $("#Text_Bloqueo").val("");
    $("#Select_Calculo").val("");
    $("#Text_Tiempo_Sesion").val("");
    $("#Text_Tiempo_Entre_Sesiones").val("");
    $("#Tiempo_Max_Agenda").val("");
    $("#Select_Calendario_TS").val("-1");

    $('.C_Chosen').trigger('chosen:updated');
}


// crea la tabla de consulta
function Table_Servicio() {
    var html_Servicio;

    switch (estado) {

        case "buscar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "modificar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayTipoServicio[itemArray].Nit_ID + "','" + ArrayTipoServicio[itemArray].Codigo_ID + "')\"></img><span>Editar Tipo Sevicio</span></span></td><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;

        case "eliminar":
            html_Servicio = "<table id='TServicio' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>Empresa</th><th>Codigo</th><th>Nombre</th><th>Tipo Servicio</th><th>Referencia</th><th>Moneda</th><th>Costo</th><th>Valor</th><th>Detalle</th><th>Calendario</th><th>Capacidad</th><th>Cant. No pago para Bloqueo</th><th>Tipo Calculo Sesion</th><th>Tiempo Sesion</th><th>Tiempo entre Servicios</th><th>Tiempo Maximo Agenda</th><th>Imagen Asociada</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Ultimo Usuario</th><th>Fecha Ultima Actualización</th></tr></thead><tbody>";
            for (itemArray in ArrayTipoServicio) {
                if (ArrayTipoServicio[itemArray].Codigo_ID != 0) {
                    html_Servicio += "<tr id= 'TServicio_" + ArrayTipoServicio[itemArray].Codigo_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayTipoServicio[itemArray].Nit_ID + "','" + ArrayTipoServicio[itemArray].Codigo_ID + "')\"></img><span>Eliminar Tipo Servicio</span></td><td>" + ArrayTipoServicio[itemArray].Nit_ID + " - " + ArrayTipoServicio[itemArray].DescripEmpresa + "</td><td>" + ArrayTipoServicio[itemArray].Codigo_ID + "</td><td>" + ArrayTipoServicio[itemArray].Nombre + "</td><td>" + ArrayTipoServicio[itemArray].Tipo + "</td><td>" + ArrayTipoServicio[itemArray].Referencia + "</td><td>" + ArrayTipoServicio[itemArray].Cod_Moneda + "</td><td>" + ArrayTipoServicio[itemArray].Costo + "</td><td>" + ArrayTipoServicio[itemArray].valor + "</td><td>" + ArrayTipoServicio[itemArray].Detalle + "</td><td>" + ArrayTipoServicio[itemArray].Calendario_ID + "</td><td>" + ArrayTipoServicio[itemArray].Capacidad + "</td><td>" + ArrayTipoServicio[itemArray].N_Pagos_Bloqueos + "</td><td>" + ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion + "</td><td>" + ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda + "</td><td>" + ArrayTipoServicio[itemArray].Imagen_asociada + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioCreacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaCreacion + "</td><td>" + ArrayTipoServicio[itemArray].UsuarioActualizacion + "</td><td>" + ArrayTipoServicio[itemArray].FechaActualizacion + "</td></tr>";
                }
            }
            break;
    }

    html_Servicio += "</tbody></table>";
    $("#container_TServicio").html("");
    $("#container_TServicio").html(html_Servicio);

    $("#TServicio").dataTable({
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Servicio) {

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Codigo_ID) {

            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Codigo_ID;
            $("#dialog_eliminar").dialog("option", "title", "Eliminar?");
            $("#dialog_eliminar").dialog("open");
        }
    }

}

// muestra el registro a editar
function Editar(index_Nit, index_Servicio) {

    $("#TablaDatos_D").css("display", "inline-table");
    $("#TablaConsulta").css("display", "none");
    $("#IF_Visor").css("display", "inline-table");
    $("#foto_servicio").css("display", "inline-table");

    for (itemArray in ArrayTipoServicio) {
        if (index_Nit == ArrayTipoServicio[itemArray].Nit_ID && index_Servicio == ArrayTipoServicio[itemArray].Codigo_ID) {
            editNit_ID = ArrayTipoServicio[itemArray].Nit_ID;
            editID = ArrayTipoServicio[itemArray].Codigo_ID;

            $("#Select_EmpresaNit").val(ArrayTipoServicio[itemArray].Nit_ID);
            $("#Txt_ID").val(ArrayTipoServicio[itemArray].Codigo_ID);

            $("#Select_EmpresaNit").attr("disabled", "disabled");
            $("#Txt_ID").attr("disabled", "disabled");

            $("#TxtNombre").val(ArrayTipoServicio[itemArray].Nombre);
            $("#Select_TipoServicio").val(ArrayTipoServicio[itemArray].Tipo);
            $("#Text_Referencia").val(ArrayTipoServicio[itemArray].Referencia);
            $("#Select_Moneda_Cod").val(ArrayTipoServicio[itemArray].Cod_Moneda);
            $("#TxtCosto").val(ArrayTipoServicio[itemArray].Costo);
            $("#TxtValor").val(ArrayTipoServicio[itemArray].valor);
            $("#Text_Capacidad").val(ArrayTipoServicio[itemArray].Capacidad);
            $("#Text_Bloqueo").val(ArrayTipoServicio[itemArray].N_Pagos_Bloqueos);
            $("#Select_Calculo").val(ArrayTipoServicio[itemArray].Tipo_Calculo_Sesion);
            $("#Text_Tiempo_Sesion").val(ArrayTipoServicio[itemArray].Tiempo_Sesion);
            $("#Text_Tiempo_Entre_Sesiones").val(ArrayTipoServicio[itemArray].Tiempo_Entre_Sesion);
            $("#Tiempo_Max_Agenda").val(ArrayTipoServicio[itemArray].Tiempo_Maximo_Agenda);
            $("#Txt_Detalle").val(ArrayTipoServicio[itemArray].Detalle);
            $("#Select_Calendario_TS").val(ArrayTipoServicio[itemArray].Calendario_ID),

            $("#Btnguardar").attr("value", "Actualizar");

            $('.C_Chosen').trigger('chosen:updated');
        }
    }
}

//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_ServicioDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}



//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#TxtDescription").val("");
    $("#Select_TipoServicio").val("-1");
    $("#Select_Moneda_Cod").val("-1");

    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');

    Clear_Agregar();

    var OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

    if (OnlyEmpresa == true) {
        TransaccionesSegunNIT($("#Select_EmpresaNit").val());
    }
}
/*--------------- Región de variables globales --------------------*/
var MatrizCalendario = []; //Carga los horarios que estamos vamos a agregar
var MatrizFestivos = []; //Matriz que contendrá los días festivos que verificaremos
var ArrayC_Semana = [];
var ArrayH_Calendario = [];

var ArrayCombo = [];

var LapsoAnios = 0;

var estado;
var editNit_ID;
var index_ID;
var editID;

var ArrayDayWork = [];
ArrayDayWork[0] = [1, "Lunes", true];
ArrayDayWork[1] = [2, "Martes", true];
ArrayDayWork[2] = [3, "Miércoles", true];
ArrayDayWork[3] = [4, "Jueves", true];
ArrayDayWork[4] = [5, "Viernes", true];
ArrayDayWork[5] = [6, "Sábado", true];
ArrayDayWork[6] = [7, "Domingo", true];
ArrayDayWork[7] = [8, "Festivo", false];


//Usadas al modificar los horarios
var editHoraIni = "";
var editHoraFin = "";
var editFechaID = "";
var editNumDia = "";
var editGrupoHorario = "";
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {
    $("#Marco_trabajo_Form").css("height", "490px");
    $(".container_TGrid").css("height", "380px");

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE MÉTODOS DE INICIALIZACIÓN ==============*/

    //transacionAjax_CargaBusqueda('cargar_droplist_busqueda');
    transacionAjax_EmpresaNit('Cliente');
    transacionAjax_ChargeFestivos('MatrizFestivos');


    Picker_Fechas();
    IniciarTimeFormat();

    Change_Select_Nit();
    Change_Select_Calendario_CP();
    Change_TxtF_Start();
    Change_TxtF_End();

});

//Función de control del picker de las fechas
function Picker_Fechas() {
    $("#TxtF_Start").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
    $("#TxtF_Start").datepicker("option", "yearRange", "+0:+2"); //Rango años hacia atras (0) y rango hacia adelante (+2)
    $("#TxtF_Start").datepicker("option", "minDate", "+0m +0d"); //Rango días (Desde el día actual, bloquea pasados)
    $("#TxtF_Start").datepicker("option", "showButtonPanel", true);
}

//Función que inicializa todos los label que contendran horas
function IniciarTimeFormat() {
    //Editor de las horas
    Time_Format("TxtEditIni");
    Time_Format("TxtEditFin");
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

    $("#Dialog_Calendar").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 1220,
        height: 760,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });

    $("#Dialog_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 300,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
    });
    $("#Dialog_Edit_time").dialog({
        autoOpen: false,
        dialogClass: "Dialog_Sasif",
        modal: true,
        width: 323,
        height: 350,
        overlay: {
            opacity: 0.5,
            background: "black"
        }
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
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $(".Table_Header_Block").css("display", "none"); //Table que contiene el capturador de horas
    $(".container_TGrid_Create").html("");
    $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid
    $("#TablaConsulta").css("display", "none");

    $("#TxtF_Start").css("display", "none");
    $("#TxtF_End").css("display", "none");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//consulta del del crud(READ)
function BtnConsulta() {
    try {
        var filtro;
        var ValidateSelect = ValidarDroplist();
        var opcion;

        OpenControl();

        if (ValidateSelect == 1) {
            filtro = "N";
            opcion = "ALL";
            transacionAjax_Calendario("consulta", filtro, opcion);
        }
        else {
            filtro = "S";
            opcion = $("#DDLColumns").val();
            transacionAjax_Calendario("consulta", filtro, opcion);
        }
    } catch (e) {
        Mensaje_General("Error - No se logró consultar", "Lo sentimos, ocurrió un error y no se logró completar consultar los calendarios, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//crear link en la BD
function BtnCrear() {
    try {
        var validate;
        validate = validarCamposCrear();
        if (validate == 0) {
            var LeghtArray = ArrayH_Calendario.length;
            if (LeghtArray > 0) {
                if ($("#Btnguardar").val() == "Guardar") {
                    transacionAjax_Calendario_create("crear");
                }
                else if ($("#Btnguardar").val() == "Actualizar") {
                    transacionAjax_Calendario_create("modificar");
                } else {
                    Mensaje_General("¡Acción NO valida!", "La acción «" + $("#Btnguardar").val() + "» no es una acción valida para el sistema, favor recargar la página para solucionar este error.", "E");
                    setTimeout(console.warn.bind(console, "• Log de error generado (Calendario Progresivo):\nSe intentó ejecutar una acción no valida, solo se permite creación o modificación en este módulo."));
                }
            } else {
                Mensaje_General("¡Sin Horarios!", "Debes ingresar por lo menos un horario para este calendario, no puedes guardar un calendario vacio.", "W");
            }

        }
    } catch (e) {
        Mensaje_General("Error - No se logró " + $("#Btnguardar").val(), "Lo sentimos, ocurrió un error y no se logró ejecutar la acción de " + $("#Btnguardar").val() + ", favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//elimina de la BD
function BtnElimina() {
    try {
        OpenControl();
        transacionAjax_Calendario_delete("elimina");
    } catch (e) {
        Mensaje_General("Error - No se logró eliminar", "Lo sentimos, ocurrió un error y no se logró completar operación de eliminación del calendario, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION PANEL DE CONTROL                                                                                                 ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//habilita el panel de crear o consulta
function HabilitarPanel(opcion) {

    switch (opcion) {

        case "crear":
            $(".Dialog_Datos_Calen").css("display", "inline-table");
            $("#TablaConsulta").css("display", "none");
            $("#Select_EmpresaNit").removeAttr("disabled");
            $("#Txt_ID").removeAttr("disabled");
            $("#Btnguardar").attr("value", "Guardar");
            $('.C_Chosen').trigger('chosen:updated');
            ResetError();
            Clear();
            estado = opcion;
            $("#Dialog_Calendar").dialog("open");
            $("#Dialog_Calendar").dialog("option", "title", "Crear Calendario Progresivo");
            break;

        case "buscar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

        case "modificar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            ResetError();
            Clear();
            break;

        case "eliminar":
            $(".Dialog_Datos_Calen").css("display", "none");
            $("#TablaConsulta").css("display", "inline-table");
            $(".container_TGrid").html("");
            estado = opcion;
            Clear();
            break;

    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//validamos campos para la creacion del calendario
function validarCamposCrear() {
    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Calendario_CP").val();
    var Campo_3 = $("#Txt_ID").val();
    var Campo_4 = $("#TxtDescription").val();

    $("#Img6").css("display", "none"); //Rango fechas
    $("#Img7").css("display", "none"); //Rango fechas

    var validar = 0;

    if (Campo_2 == "-1" || Campo_2 == null || Campo_1 == "-1" || Campo_1 == null || Campo_3 == "" || Campo_4 == "") {
        validar = 1;
        if (Campo_1 == "-1" || Campo_1 == null) { $("#Img1").css("display", "inline-table"); } else { $("#Img1").css("display", "none"); }
        if (Campo_2 == "-1" || Campo_2 == null) { $("#Img2").css("display", "inline-table"); } else { $("#Img2").css("display", "none"); }
        if (Campo_3 == "") { $("#Img3").css("display", "inline-table"); } else { $("#Img3").css("display", "none"); }
        if (Campo_4 == "") { $("#Img5").css("display", "inline-table"); } else { $("#Img5").css("display", "none"); }

        Mensaje_General("¡Campos Incompletos!", "Debes completar todos los datos de identificación del calendario para poder " + $("#Btnguardar").val() + " el calendario.", "W");
    } else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
        $("#Img3").css("display", "none");
        $("#Img5").css("display", "none");        
        validar = validarCamposFechas();
    }
    return validar;
}

//validamos campos para la creación del calendario
function validarCamposFechas() {

    var Campo_1 = $("#TxtF_Start").val();
    var Campo_2 = $("#TxtF_End").val();

    var validar = 0;

    if (Campo_2 == "" || Campo_1 == "") {
        validar = 1;
        if (Campo_1 == "") { $("#Img6").css("display", "inline-table"); } else { $("#Img6").css("display", "none"); }
        if (Campo_2 == "") { $("#Img7").css("display", "inline-table"); } else { $("#Img7").css("display", "none"); }

        Mensaje_General("¡Campos Incompletos!", "Debes seleccionar un rango de fechas antes de poder " + $("#Btnguardar").val() + " el calendario.", "W");
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
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que valida si la combinación de horas ya existe en el array armado
function ValidarHoras(fechaID, horaIni, horaFini) {
    var Encontrado = false;
    for (var i in ArrayH_Calendario) {//Recorremos el array que contiene los datos de los horarios día
        if (ArrayH_Calendario[i].Fecha == fechaID) { //Entramos a revisar solo los datos que contienen el día que se quiere verificar
            //Verificamos si la combinación de horas ya existe
            if (ArrayH_Calendario[i].HoraIni == horaIni && ArrayH_Calendario[i].HoraFin == horaFini) {
                Encontrado = true;
                break;
            }
        }
    }
    return Encontrado;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MODIFICAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que toma los datos que se van a editar de la matriz
function EditHoraDia(ID_Dia, Horario) {
    try {
        editHoraIni = "";
        editHoraFin = "";
        editNumDia = "";
        editFechaID = "";
        editGrupoHorario = Horario;
        for (i in MatrizCalendario) {
            if (MatrizCalendario[i].ID == ID_Dia) {
                switch (Horario) {
                    case "A":
                        editHoraIni = MatrizCalendario[i].A_HoraIni;
                        editHoraFin = MatrizCalendario[i].A_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "B":
                        editHoraIni = MatrizCalendario[i].B_HoraIni;
                        editHoraFin = MatrizCalendario[i].B_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "C":
                        editHoraIni = MatrizCalendario[i].C_HoraIni;
                        editHoraFin = MatrizCalendario[i].C_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "D":
                        editHoraIni = MatrizCalendario[i].D_HoraIni;
                        editHoraFin = MatrizCalendario[i].D_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                }
                break;
            }
        }
        //Abrimos el Dialogo y colocamos las horas
        $("#TxtEditIni").val("");
        $("#TxtEditFin").val("");
        if (editHoraIni != "0" || editHoraFin != "0") {
            $("#TxtEditIni").val(editHoraIni);
            $("#TxtEditFin").val(editHoraFin);
        }
        $("#Dialog_Edit_time").dialog("open");
        $("#Dialog_Edit_time").dialog("option", "title", "Modificar Horario");
        $("#TxtEditIni").focus();
    } catch (e) {
        Mensaje_General("Error - No se logró actualizar", "Lo sentimos, ocurrió un error y no se logró ejecutar la opción de editar, verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//Función que valida que el horario que se quiere ingresar se encuentre dentro de los rangos establecidos por el calendario
function TimeInRange(diaID, horaINI, horaFIN) {
    var inRange = false;
    for (var i in ArrayC_Semana) {
        if (ArrayC_Semana[i].Dia == diaID) {
            var Ini = SAS_ValidarHoras(ArrayC_Semana[i].HoraInicial, horaINI);
            var Fin = SAS_ValidarHoras(horaFIN, ArrayC_Semana[i].HoraFinal);
            //Validamos si la hora se encuentra dentro de alguno de los rangos de las horas establecidas
            if (Ini && Fin) {
                inRange = true;
                break;
            }
        }
    }
    return inRange;
}

//Función que valida que los horarios sean correctos en la edición de horarios
function ValidarHorasEdit() {
    var validoEdit = 0;

    if ($("#TxtEditIni").val() != "" || $("#TxtEditFin").val() != "") {
        V_H = Validahora($("#TxtEditIni").val(), $("#TxtEditFin").val());

        switch (V_H) {
            case 1:
                validoEdit = 1;
                break;

            case 2:
                validoEdit = 2;
                break;
        }
    } else {
        Mensaje_General("ERROR - Campos Vacios", "No puedes dejar los campos vacios, debe ingresar un horario valido.", "E");
        validoEdit = 3;
    }

    return validoEdit;
}

//Función que valida el nuevo horario al editarlo antes de mandar a modificar los arrays
function EditArraysTime() {
    try {
        var validate = ValidarHorasEdit();
        switch (validate) {
            case 0:
                var enRango = TimeInRange(editNumDia, $("#TxtEditIni").val(), $("#TxtEditFin").val()); //Validamos que la hora esté dentro del rango
                if (enRango == true) {
                    var Repetido = ValidarHoras(editFechaID, $("#TxtEditIni").val(), $("#TxtEditFin").val()); //Validamos que no se haya ingresado esta hora
                    if (Repetido == false) {
                        ModifyArrays();
                        DibujarGrid(MatrizCalendario); //Dibujamos nuevamente la tabla
                        editHoraIni = "";
                        editHoraFin = "";
                        editNumDia = "";
                        editFechaID = "";
                        editGrupoHorario = "";
                        $("#Dialog_Edit_time").dialog("close");
                    } else {
                        Mensaje_General("Error - Horario Existe", "No puedes ingresar dos veces una misma combinación de horarios para el este día.", "W");
                    }
                } else {
                    Mensaje_General("Error - Fuera de Rangos", "El horario a ingresar no se encuentra dentro de los rangos establecidos en el calendario «" + $("#Select_Calendario_CP option:selected").html() + " » para este día, verifica el horario a ingresar.", "W");
                }
                break;

            case 1:
                Mensaje_General("Error - Hora Inconsistente", "La hora inicial es mayor que la hora final.", "E");
                break;

            case 2:
                Mensaje_General("Error - Campos Incompletos", "El campo de hora inicial u hora final no se completó.", "W");
                break;
        }
    } catch (e) {
        Mensaje_General("Error - No se logró actualizar", "Lo sentimos, ocurrió un error y no se logró actualizar el horario, intente más tarde.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//Función que modifca los arrays con los nuevos datos
function ModifyArrays() {
    var NewIni = $("#TxtEditIni").val();
    var NewFin = $("#TxtEditFin").val();

    for (var i in MatrizCalendario) {
        if (MatrizCalendario[i].Fecha == editFechaID) {
            switch (editGrupoHorario) {
                case "A":
                    MatrizCalendario[i].A_HoraIni = NewIni;
                    MatrizCalendario[i].A_HoraFin = NewFin;
                    break;
                case "B":
                    MatrizCalendario[i].B_HoraIni = NewIni;
                    MatrizCalendario[i].B_HoraFin = NewFin;
                    break;
                case "C":
                    MatrizCalendario[i].C_HoraIni = NewIni;
                    MatrizCalendario[i].C_HoraFin = NewFin;
                    break;
                case "D":
                    MatrizCalendario[i].D_HoraIni = NewIni;
                    MatrizCalendario[i].D_HoraFin = NewFin;
                    break;
            }
            if (editHoraIni != "0" && editHoraFin != "0") { //Verificamos si ya se habia ingresado en el array
                for (var j in ArrayH_Calendario) { //Reemplazamos valores
                    if (ArrayH_Calendario[j].Fecha == editFechaID &&
                        ArrayH_Calendario[j].HoraIni == editHoraIni &&
                        ArrayH_Calendario[j].HoraFin == editHoraFin) {
                        //Reemplazamos
                        ArrayH_Calendario[j].HoraIni = NewIni;
                        ArrayH_Calendario[j].HoraFin = NewFin;
                        break;
                    }
                }
            } else { //Sino, ingresamos el nuevo valor
                CargarJSON_HCalendario(editFechaID, NewIni, NewFin);
            }
            break;
        }
    }
}

//Función que va agregando datos al ArrayH_Calendario
function CargarJSON_HCalendario(fechaID, horaINI, horaFIN) {
    var JSON = {
        "Fecha": fechaID,
        "HoraIni": horaINI,
        "HoraFin": horaFIN
    };
    ArrayH_Calendario.push(JSON);
}
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              ELIMINAR HORARIOS DEL CALENDARIO                                                                                  ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Función que permite eliminar una hora que ya ha sido ingresada en el array
function DeleteHoraDia(ID_Dia, Horario) {
    try {
        editHoraIni = "";
        editHoraFin = "";
        editNumDia = "";
        editFechaID = "";
        editGrupoHorario = Horario;
        for (i in MatrizCalendario) {
            if (MatrizCalendario[i].ID == ID_Dia) {
                switch (Horario) {
                    case "A":
                        editHoraIni = MatrizCalendario[i].A_HoraIni;
                        editHoraFin = MatrizCalendario[i].A_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "B":
                        editHoraIni = MatrizCalendario[i].B_HoraIni;
                        editHoraFin = MatrizCalendario[i].B_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "C":
                        editHoraIni = MatrizCalendario[i].C_HoraIni;
                        editHoraFin = MatrizCalendario[i].C_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                    case "D":
                        editHoraIni = MatrizCalendario[i].D_HoraIni;
                        editHoraFin = MatrizCalendario[i].D_HoraFin;
                        editNumDia = MatrizCalendario[i].Dia;
                        editFechaID = MatrizCalendario[i].Fecha;
                        break;
                }
                break;
            }
        }
        //Abrimos el Dialogo y colocamos las horas
        if (editHoraIni != "0" || editHoraFin != "0") {
            DeleteArraysTime();
            DibujarGrid(MatrizCalendario);
        }
        editHoraIni = "";
        editHoraFin = "";
        editNumDia = "";
        editFechaID = "";
        editGrupoHorario = "";
    } catch (e) {
        Mensaje_General("Error - No se logró eliminar", "Lo sentimos, ocurrió un error y no se logró ejecutar la opción de eliminar, verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//función que modifica y elimina los datos de los arrays
function DeleteArraysTime() {
    var NewIni = "0";
    var NewFin = "0";

    for (var i in MatrizCalendario) {
        if (MatrizCalendario[i].Fecha == editFechaID) {
            switch (editGrupoHorario) {
                case "A":
                    MatrizCalendario[i].A_HoraIni = NewIni;
                    MatrizCalendario[i].A_HoraFin = NewFin;
                    break;
                case "B":
                    MatrizCalendario[i].B_HoraIni = NewIni;
                    MatrizCalendario[i].B_HoraFin = NewFin;
                    break;
                case "C":
                    MatrizCalendario[i].C_HoraIni = NewIni;
                    MatrizCalendario[i].C_HoraFin = NewFin;
                    break;
                case "D":
                    MatrizCalendario[i].D_HoraIni = NewIni;
                    MatrizCalendario[i].D_HoraFin = NewFin;
                    break;
            }
            if (editHoraIni != "0" && editHoraFin != "0") { //Verificamos si ya se habia ingresado en el array
                for (var j in ArrayH_Calendario) { //Reemplazamos valores
                    if (ArrayH_Calendario[j].Fecha == editFechaID &&
                        ArrayH_Calendario[j].HoraIni == editHoraIni &&
                        ArrayH_Calendario[j].HoraFin == editHoraFin) {
                        //Eliminamos
                        ArrayH_Calendario.splice(j, 1);
                        break;
                    }
                }
            }
            break;
        }
    }

}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE GRID CALENDARIO                                                                                   ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// crea la tabla de consulta
function Table_Calendario() {
    try {
        var html_TableCalendario = "";
        $(".container_TGrid").html("");

        switch (estado) {

            case "buscar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;

            case "modificar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Editar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img src='../../images/Editar1.png' width='23px' height='23px' class= 'Editar' name='editar' onmouseover=\"this.src='../../images/EditarOver.png';\" onmouseout=\"this.src='../../images/Editar1.png';\" onclick=\"Editar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Editar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;

            case "eliminar":
                html_TableCalendario = "<table id='TCalendario' border='1' cellpadding='1' cellspacing='1'  style='width: 100%'><thead><tr><th>Eliminar</th><th>NIT Empresa</th><th>Código</th><th>Descripción</th><th>Tipo Calendario</th><th>Usuario Creación</th><th>Fecha Creación</th><th>Usuario Actualización</th><th>Fecha Actualización</th></tr></thead><tbody>";
                for (itemArray in ArrayCalendario) {
                    if (ArrayCalendario[itemArray].Calendario_ID != 0) {
                        html_TableCalendario += "<tr id= 'TCalendario_" + ArrayCalendario[itemArray].Calendario_ID + "'><td><span class='cssToolTip_ver'><img  src='../../images/Delete.png' width='23px' height='23px' class= 'Eliminar' name='eliminar' onmouseover=\"this.src='../../images/DeleteOver.png';\" onmouseout=\"this.src='../../images/Delete.png';\" onclick=\"Eliminar('" + ArrayCalendario[itemArray].Nit_ID + "','" + ArrayCalendario[itemArray].Calendario_ID + "')\"></img><span>Eliminar Calendario</span></span></td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Nit_ID + " - " + ArrayCalendario[itemArray].DescripEmpresa + "</td><td>" + ArrayCalendario[itemArray].Calendario_ID + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].Descripcion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].TipoCalendario + " - " + ArrayCalendario[itemArray].DescripTipoCalendario + "</td><td>" + ArrayCalendario[itemArray].UsuarioCreacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaCreacion + "</td><td>" + ArrayCalendario[itemArray].UsuarioActualizacion + "</td><td style='white-space: nowrap;'>" + ArrayCalendario[itemArray].FechaActualizacion + "</td></tr>";
                    }
                }
                break;
        }

        html_TableCalendario += "</tbody></table>";
        $(".container_TGrid").html("");
        $(".container_TGrid").html(html_TableCalendario);

        $(".Eliminar").click(function () {
        });

        $(".Editar").click(function () {
        });

        $("#TCalendario").dataTable({
            "bJQueryUI": true,
            "iDisplayLength": 1000,
            "bDestroy": true
        });
    } catch (e) {
        Mensaje_General("Error - Dibujar tabla", "Lo sentimos, ocurrió un error y no se logró dibujar la tabla con los datos solicitados, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//muestra el registro a eliminar
function Eliminar(index_Nit, index_Calendario) {
    try {
        for (itemArray in ArrayCalendario) {
            if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {
                editNit_ID = ArrayCalendario[itemArray].Nit_ID;
                editID = ArrayCalendario[itemArray].Calendario_ID;
                TipoCalendar = ArrayCalendario[itemArray].TipoCalendario;
                $("#dialog_eliminar").dialog("option", "title", "¿Eliminar Calendario?");
                $("#dialog_eliminar").dialog("open");
            }
        }
    } catch (e) {
        Mensaje_General("Error - Eliminar", "Lo sentimos, ocurrió un error y no se logró ejecutar la acción solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

// muestra el registro a editar
function Editar(index_Nit, index_Calendario) {
    try {
        $(".Dialog_Datos_Calen").css("display", "inline-table");
        $("#TablaConsulta").css("display", "none");
        $("#Dialog_Calendar").dialog("open");
        $("#Dialog_Calendar").dialog("option", "title", "Actualizar Calendario");
        $("#Btnguardar").attr("value", "Actualizar");
        OpenControl();
        for (itemArray in ArrayCalendario) {
            if (index_Nit == ArrayCalendario[itemArray].Nit_ID && index_Calendario == ArrayCalendario[itemArray].Calendario_ID) {

                editNit_ID = ArrayCalendario[itemArray].Nit_ID;
                editID = ArrayCalendario[itemArray].Calendario_ID;

                transacionAjax_ArrayC_Semana("MatrizDiasSemana");

                $("#Select_EmpresaNit").val(ArrayCalendario[itemArray].Nit_ID);
                $("#Txt_ID").val(ArrayCalendario[itemArray].Calendario_ID);

                $("#Select_EmpresaNit").attr("disabled", "disabled");
                $("#Txt_ID").attr("disabled", "disabled");

                $("#TxtDescription").val(ArrayCalendario[itemArray].Descripcion);
                $("#Select_TipoCalendario").val(ArrayCalendario[itemArray].TipoCalendario);

                VerifyTextID("Ok"); //Decir se llenó el campo
                VerifyTextDescription("Ok"); //Decir se llenó el campo
                $(".Table_Header_Block").css("display", "inline-table"); //Table que contiene el capturador de horas

                $('.C_Chosen').trigger('chosen:updated');
            }
        }

        ArmarMatricesDias();
    } catch (e) {
        Mensaje_General("Error - Actualizar", "Lo sentimos, ocurrió un error y no se logró ejecutar la acción solicitada, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//funcion de carga de la dependecia para edicion
function ChargeDependencia(index) {
    $('#Select_CalendarioDepent').val(index);
    $('.C_Chosen').trigger('chosen:updated');
}

//limpiar campos
function Clear() {
    Matrix_Calendarios = []; //Usado para cargar el combo de calendario por NIT
    MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
    ArrayC_Semana = []; //Matriz que guarda los datos del calendario seleccionado
    ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD

    editHoraIni = "";
    editHoraFin = "";
    editNumDia = "";
    editFechaID = "";
    editGrupoHorario = "";

    $("#Select_EmpresaNit").val("-1");
    $("#Txt_ID").val("");
    $("#Select_Calendario_CP").empty().trigger("chosen:updated");
    $("#TxtRead").val("");
    $("#DDLColumns").val("-1");

    $('.C_Chosen').trigger('chosen:updated');


    $("#TxtF_Start").val("");
    $("#TxtF_End").val("");
    $("#TxtF_Start").css("display", "none");
    $("#TxtF_End").css("display", "none");
    $(".container_TGrid_Create").html("");
    $(".container_TGrid_Create").css("display", "none");

    var Only_Empresa = VerificarNIT("Select_EmpresaNit");

    if (Only_Empresa == true) {
        $("#Txt_ID").val("");
        TransaccionesNIT($("#Select_EmpresaNit").val());
    }
}

//Función que toma los días del calendario que se va a asociar y valida si los días son o no laborales
function ValidarLaborales() {
    try {
        for (var i in ArrayC_Semana) {
            //Validamos Lunes Laboral o NO
            if (ArrayC_Semana[i].Dia == "1") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[0][2] = true;
                } else {
                    ArrayDayWork[0][2] = false;
                }
            }
            //Validamos Martes Laboral o NO
            if (ArrayC_Semana[i].Dia == "2") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[1][2] = true;
                } else {
                    ArrayDayWork[1][2] = false;
                }
            }
            //Validamos Miércoles Laboral o NO
            if (ArrayC_Semana[i].Dia == "3") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[2][2] = true;
                } else {
                    ArrayDayWork[2][2] = false;
                }
            }
            //Validamos Jueves Laboral o NO
            if (ArrayC_Semana[i].Dia == "4") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[3][2] = true;
                } else {
                    ArrayDayWork[3][2] = false;
                }
            }
            //Validamos Viernes Laboral o NO
            if (ArrayC_Semana[i].Dia == "5") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[4][2] = true;
                } else {
                    ArrayDayWork[4][2] = false;
                }
            }
            //Validamos Sábado Laboral o NO
            if (ArrayC_Semana[i].Dia == "6") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[5][2] = true;
                } else {
                    ArrayDayWork[5][2] = false;
                }
            }
            //Validamos Domingo Laboral o NO
            if (ArrayC_Semana[i].Dia == "7") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[6][2] = true;
                } else {
                    ArrayDayWork[6][2] = false;
                }
            }
            //Validamos Festivos Laboral o NO
            if (ArrayC_Semana[i].Dia == "8") {
                if (ArrayC_Semana[i].IndicativoFestivo == "N") {
                    ArrayDayWork[7][2] = true;
                } else {
                    ArrayDayWork[7][2] = false;
                }
            }
        }
    } catch (e) {
        Mensaje_General("Error - Validación Laborales", "Lo sentimos, ocurrió un error y no se logró completar la verificación de los días que son laborales según el calendario, favor verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//Función que ejecuta todas las transacciones que dependen de la selección de un NIT
function TransaccionesNIT(NIT) {
    transacionAjax_ChargeCalendarios('MatrixCalendarios', NIT);
}

//Función que recorre el rango que se ha seleccionado y arma la matriz que guardará los días en este
function FirstJSONCharge(DateIni, DateFin) {
    try {
        var FechaIni = DateIni.split("-");
        var FechaFin = DateFin.split("-");

        var AnioIni = 0;
        AnioIni = parseInt(FechaIni[0]);
        var MesIni = 0
        MesIni = parseInt(FechaIni[1]);
        var DiaIni = 0;
        DiaIni = parseInt(FechaIni[2]);
        //---
        var AnioFin = 0;
        AnioFin = parseInt(FechaFin[0]);
        var MesFin = 0;
        MesFin = parseInt(FechaFin[1]);
        var DiaFin = 0;
        DiaFin = parseInt(FechaFin[2]);

        LapsoAnios = 0;
        LapsoAnios = parseInt(FechaFin[0]) - parseInt(FechaIni[0]);

        var year = 0;
        year = AnioIni;

        var iniMonth = false; //Saber si ya se recorrió el primer mes en el for
        var iniYear = false; //Saber si ya se recorrió por primera vez el año


        MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
        ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD

        for (var i = 0; i <= LapsoAnios; i++) {
            var biciesto = Valida_Bisiesto(year);
            if (biciesto == "Y") {
                Matrix_Mes[1][2] = 29;
            } else {
                Matrix_Mes[1][2] = 28;
            }
            //----
            //----
            if (year == AnioFin) { //Verificamos si el recorrido está en el año fin
                if (iniYear == false) { //Verificamos que no se haya pintado el año desde donde arranca
                    for (var j = MesIni; j <= MesFin ; j++) { //Iniciamos en el mes seleccionado y recorremos el año                

                        if (iniMonth == false && Matrix_Mes[j - 1][0] != MesFin) { //Verificamos si ya se pintó el mes inicio para iniciar desde el día seleccionado
                            for (var day = DiaIni; day <= Matrix_Mes[j - 1][2]; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);

                            }
                            iniMonth = true;
                        } else if (Matrix_Mes[j - 1][0] == MesFin && iniMonth == false) {  //Verificamos si es el mes fin y ademas es el mes de Inicio
                            for (var day = DiaIni; day <= DiaFin; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        } else if (Matrix_Mes[j - 1][0] == MesFin && iniMonth == true) {  //Verificamos si es el mes fin y ya se pinto el mes de inicio
                            for (var day = 1; day <= DiaFin; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        } else { //Sino, pintamos todos los días de ese mes
                            for (var day = 1; day <= Matrix_Mes[j - 1][2]; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        }
                    }

                } else { //Si ya se pintó el año de inicio y ahora vamos a terminar de pintar el rango
                    for (var j = 1; j <= MesFin ; j++) { //Iniciamos en el año y recorremos el hasta el mes fin
                        if (Matrix_Mes[j - 1][0] == MesFin && iniMonth == true) {  //Verificamos si es el mes fin y que ya se  haya pintado el mes de inicio
                            for (var day = 1; day <= DiaFin; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        } else { //Sino, pintamos todos los días de ese mes
                            for (var day = 1; day <= Matrix_Mes[j - 1][2]; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        }
                    }
                }
                break;
            } else { //Sino comenzamos a dibujar los años desde el inicio
                if (iniYear == false) { //Verificamos que no se haya pintado el año desde donde arranca
                    for (var j = MesIni; j <= 12 ; j++) { //Iniciamos en el mes seleccionado y recorremos el año                

                        if (iniMonth == false) { //Verificamos si ya se pintó para iniciar desde el día seleccionado
                            for (var day = DiaIni; day <= Matrix_Mes[j - 1][2]; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                            iniMonth = true;
                        } else { //Sino, continuamos pintando los días de los demás meses del año
                            for (var day = 1; day <= Matrix_Mes[j - 1][2]; day++) {
                                var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                                var Cons_Fecha = new Date(year, (j - 1), day);
                                var StrDia = D_Semana[Cons_Fecha.getDay()];
                                var numDia = Cons_Fecha.getDay();

                                if (numDia == 0) { //Validamos si ese día es un Domingo
                                    numDia = 7;
                                } else { //Sino dejamos el mismo dato
                                    numDia = numDia;
                                }

                                var JSONCalendar = {
                                    "ID": ID_TR,
                                    "Fecha": toJSONLocal(Cons_Fecha),
                                    "Year": year,
                                    "Month": Matrix_Mes[j - 1][0],
                                    "NameMonth": Matrix_Mes[j - 1][1],
                                    "Day": day,
                                    "DayName": StrDia,
                                    "Dia": numDia,
                                    "Festivo": "N",
                                    "A_HoraIni": "0",
                                    "A_HoraFin": "0",
                                    "B_HoraIni": "0",
                                    "B_HoraFin": "0",
                                    "C_HoraIni": "0",
                                    "C_HoraFin": "0",
                                    "D_HoraIni": "0",
                                    "D_HoraFin": "0"
                                };
                                MatrizCalendario.push(JSONCalendar);
                            }
                        }

                    }
                    iniYear = true; //Decimos que ya pintamos el primer año
                } else { //Si ya pintamos el primero año y como no estamos en el año fin vamos a pintar todos los días de todos los meses del año
                    for (var j = 1; j <= 12 ; j++) { //Iniciamos en el mes seleccionado y recorremos el año    
                        for (var day = 1; day <= Matrix_Mes[j - 1][2]; day++) {
                            var ID_TR = year + "_" + Matrix_Mes[j - 1][0] + "_" + day;
                            var Cons_Fecha = new Date(year, (j - 1), day);
                            var StrDia = D_Semana[Cons_Fecha.getDay()];
                            var numDia = Cons_Fecha.getDay();

                            if (numDia == 0) { //Validamos si ese día es un Domingo
                                numDia = 7;
                            } else { //Sino dejamos el mismo dato
                                numDia = numDia;
                            }

                            var JSONCalendar = {
                                "ID": ID_TR,
                                "Fecha": toJSONLocal(Cons_Fecha),
                                "Year": year,
                                "Month": Matrix_Mes[j - 1][0],
                                "NameMonth": Matrix_Mes[j - 1][1],
                                "Day": day,
                                "DayName": StrDia,
                                "Dia": numDia,
                                "Festivo": "N",
                                "A_HoraIni": "0",
                                "A_HoraFin": "0",
                                "B_HoraIni": "0",
                                "B_HoraFin": "0",
                                "C_HoraIni": "0",
                                "C_HoraFin": "0",
                                "D_HoraIni": "0",
                                "D_HoraFin": "0"
                            };
                            MatrizCalendario.push(JSONCalendar);
                        }

                    }
                }

            }
            year = year + 1;
        }

        DibujarGrid(MatrizCalendario);
    } catch (e) {
        Mensaje_General("Error - No se cargó tabla", "Lo sentimos, ocurrió un error y no se logró cargar la tabla de los días dentro del rango, verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}

//Función que convierte una fecha en cierto formato
function toJSONLocal(date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}

//Función que recibe la matriz con las fechas y se encarga de armarla en la tabla
function DibujarGrid(Matriz) {
    try {
        $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid

        var html_Calendario = "";

        html_Calendario = "<table id='TCalendarioRango' border='1' cellpadding='1' cellspacing='1' style='width: 100%'><thead> ";
        html_Calendario = html_Calendario + "<tr id='Cabecera_1'><th class='Grid_Head' rowspan='3'>Año</th><th class='Grid_Head' rowspan='3'>Mes</th><th class='Grid_Head' rowspan='3'>Día</th><th class='Grid_Head' rowspan='3'>Nombre Día</th><th class='Grid_Head' colspan='8'>Horario</th></tr> "; //Armamos las cabeceras fijas
        html_Calendario = html_Calendario + "<tr><th class='Grid_Head' colspan='2'>A</th><th class='Grid_Head' colspan='2'>B</th><th class='Grid_Head' colspan='2'>C</th><th class='Grid_Head' colspan='2'>D</th></tr> "
        html_Calendario = html_Calendario + "<tr id='Cabecera_2'><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th><th class='Grid_Head'>Inicial</th><th class='Grid_Head'>Final</th></tr> "; //Armamos las cabeceras fijas
        html_Calendario = html_Calendario + "</thead><tbody> "

        for (var i in Matriz) {
            var isFestivo = VerifyFestivo(Matriz[i].Year, Matriz[i].Month, Matriz[i].Day, MatrizFestivos);
            html_Calendario = html_Calendario + "<tr id='" + Matriz[i].ID + "'>"; //ID del TR

            if (isFestivo == true && ArrayDayWork[7][2] == false) { //Pintamos en verde si es un día festivo y en el calendario se dice que festivos no se labora y lo colocamos en la matriz del calendario
                html_Calendario = html_Calendario + "<td>" + Matriz[i].Year + "</td><td>" + Matriz[i].NameMonth + "</td><td>" + Matriz[i].Day + "</td><td><span class='cssToolTip_Form'><b style='color: #086308; cursor: pointer; cursor: hand;'><u>" + Matriz[i].DayName + "</u></b><span>Día Festivo</span></span></td>"; //Armamos la identificación del Día
                Matriz[i].Festivo = "S";
                html_Calendario = html_Calendario + "<td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td></tr>"; //Colocamos los horarios
            } else if (isFestivo == true && ArrayDayWork[7][2] == true) { //Pintamos un * de verde y en negrilla para que sepan que es festivo pero es laboral
                html_Calendario = html_Calendario + "<td>" + Matriz[i].Year + "</td><td>" + Matriz[i].NameMonth + "</td><td>" + Matriz[i].Day + "</td><td><span class='cssToolTip_Form'><b style='color: #000000; cursor: pointer; cursor: hand;'><u>" + Matriz[i].DayName + "</u></b><b style='color: #086308'>*</b><span>Festivo Laboral</span></span></td>"; //Armamos la identificación del Día
                Matriz[i].Festivo = "S";
                html_Calendario = html_Calendario + "<td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].A_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'A');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','A');\">Eliminar</span></span></td><td>" + Matriz[i].A_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].B_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'B');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','B');\">Eliminar</span></span></td><td>" + Matriz[i].B_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].C_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'C');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','C');\">Eliminar</span></span></td><td>" + Matriz[i].C_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].D_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'D');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','D');\">Eliminar</span></span></td><td>" + Matriz[i].D_HoraFin + "</td></tr>"; //Colocamos los horarios
            } else { //Si el día no es un día festivo
                for (var j in ArrayDayWork) { //Recorremos el array que contiene los días laborales y los que no
                    if (Matriz[i].Dia == ArrayDayWork[j][0]) {
                        if (ArrayDayWork[j][2] == false) { //SI ese día no es laboral colocamos en ROJO
                            html_Calendario = html_Calendario + "<td>" + Matriz[i].Year + "</td><td>" + Matriz[i].NameMonth + "</td><td>" + Matriz[i].Day + "</td><td><span class='cssToolTip_Form'><b style='color: #6B1010; cursor: pointer; cursor: hand;'>" + Matriz[i].DayName + "</b><span>Día no Laboral</span></span></td>"; //Armamos la identificación del Día
                            html_Calendario = html_Calendario + "<td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td><td> - </td></tr>"; //Colocamos los horarios
                            break;
                        } else if (ArrayDayWork[j][2] == true) { //Si ese día si es laboral pintamos normal
                            html_Calendario = html_Calendario + "<td>" + Matriz[i].Year + "</td><td>" + Matriz[i].NameMonth + "</td><td>" + Matriz[i].Day + "</td><td>" + Matriz[i].DayName + "</td>"; //Armamos la identificación del Día
                            html_Calendario = html_Calendario + "<td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].A_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'A');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','A');\">Eliminar</span></span></td><td>" + Matriz[i].A_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].B_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'B');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','B');\">Eliminar</span></span></td><td>" + Matriz[i].B_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].C_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'C');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','C');\">Eliminar</span></span></td><td>" + Matriz[i].C_HoraFin + "</td><td style='cursor: pointer; cursor: hand;'><span class='cssToolTip_Boton'>" + Matriz[i].D_HoraIni + "<span><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"EditHoraDia('" + Matriz[i].ID + "', 'D');\">Editar<br><input type='radio' class='Ver' name='option' style='cursor: pointer; cursor: hand;' onclick=\"DeleteHoraDia('" + Matriz[i].ID + "','D');\">Eliminar</span></span></td><td>" + Matriz[i].D_HoraFin + "</td></tr>"; //Colocamos los horarios
                            break;
                        }
                    }
                }

            }

        }

        html_Calendario = html_Calendario + "</tbody></table>";//Cerramos tabla principal

        $(".container_TGrid_Create").html(html_Calendario);
        $(".container_TGrid_Create").css("display", "inline-table"); //Tabla que dibuja el grid

        $("#TCalendarioRango").dataTable({
            "bJQueryUI": true,
            "iDisplayLength": 365,
            "bDestroy": true,
            "aoColumnDefs": [
              { 'bSortable': false, 'aTargets': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
            ]
        });
    } catch (e) {
        Mensaje_General("Error - No se logró dibujar", "Lo sentimos, ocurrió un error y no se logró dibujar la tabla, verifique los datos.", "E");
        setTimeout(console.error.bind(console, "• Log de error generado (Calendario Progresivo):\n" + e));
    }
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                             PROCESOS DE CHANGES                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//Proceso de Change para el NIT Empresa
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_EmpresaNit").val() == "-1") {
            $("#Img1").css("display", "inline-table");
            Matrix_Calendarios = []; //Usado para cargar el combo de calendario por NIT
            MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
            ArrayC_Semana = [];
            ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD
            $("#Select_Calendario_CP").empty().trigger("chosen:updated");
            Ocultar_Tablas();
            $("#Txt_ID").val("");
        } else {           
            $("#Txt_ID").val("");
            $("#Img1").css("display", "none");
            Ocultar_Tablas();
            Matrix_Calendarios = [];
            ArrayC_Semana = [];
            $("#Select_Calendario_CP").empty();
            TransaccionesNIT($(this).val());
        }
    });
}

//Proceso de Change para el Select del Calendario
function Change_Select_Calendario_CP() {
    $("#Select_Calendario_CP").change(function () {
        /*Validamos si el cambio es para seleccionar un valor, sino, mostramos el error*/
        if ($("#Select_Calendario_CP").val() == "-1") {
            $("#Img2").css("display", "inline-table");
            MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
            ArrayC_Semana = [];
            ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD
            $("#TxtF_Start").val("");
            $("#TxtF_End").val("");
            $("#TxtF_Start").css("display", "none");
            $("#TxtF_End").css("display", "none");
            $(".container_TGrid_Create").html("");
            $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid
        } else {
            MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
            ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD
            $("#Img2").css("display", "none");
            $("#TxtF_Start").css("display", "inline-table");
            $("#TxtF_End").val("");
            $("#TxtF_Start").val("");
            $("#TxtF_End").css("display", "none");
            $(".container_TGrid_Create").html("");
            $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid
        }
    });
}

//Función que detecta el change del TXT de la fecha inicial
function Change_TxtF_Start() {
    $("#TxtF_Start").change(function () {
        $("#Img6").css("display", "none");
        $("#TxtF_End").val("");
        var dateFormat = 'yy-mm-dd';
        var date = $.datepicker.parseDate(dateFormat, $("#TxtF_Start").val());
        $("#TxtF_End").datepicker({ dateFormat: 'yy-mm-dd', changeYear: true, changeMonth: true }); //Inicializa Datapicker
        $("#TxtF_End").datepicker("option", "minDate", date);
        $("#TxtF_End").datepicker("option", "yearRange", "+0:+3");
        $("#TxtF_End").css("display", "inline-table");
        MatrizCalendario = []; //Matriz que carga las fechas del rango seleccionado
        ArrayH_Calendario = []; //Matriz que guarda los datos que guardaremos en la BD
        $(".container_TGrid_Create").html("");
        $(".container_TGrid_Create").css("display", "none"); //Tabla que dibuja el grid
    });
}

//Función que detecta el change del TXT de la fecha final
function Change_TxtF_End() {
    $("#TxtF_End").change(function () {
        $("#Img7").css("display", "none");
        var DateIni = $("#TxtF_Start").val();
        var DateFin = $(this).val();
        transacionAjax_ArrayC_Semana("MatrizDiasSemana");
        FirstJSONCharge(DateIni, DateFin);
    });
}


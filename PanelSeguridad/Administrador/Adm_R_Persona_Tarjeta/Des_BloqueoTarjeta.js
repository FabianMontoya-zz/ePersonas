/*--------------- region de variables globales --------------------*/
var Matrix_Tarjeta = [];
var Matrix_Persona = [];
var Matrix_RTP = [];
var ArrayDes_Bloqueo = [];

var ArrayR_Persona_Tarjeta = [];
var ArrayR_Persona_TarjetaDep = [];

var estado;
var editNit_ID;
var editID;
var editDocID;
/*--------------- region de variables globales --------------------*/

//Evento load JS
$(document).ready(function () {

    /*Llamado de metodos para ocultar elementos al inicio de la operación de la pantalla*/
    Ventanas_Emergentes(); //Ventanas_Emergentes Va primero pues es la que llama al load de espera al inicio de los AJAX
    Ocultar_Errores();
    Ocultar_Tablas();
    /*================== FIN LLAMADO INICIAL DE METODOS DE INICIALIZACIÓN ==============*/

    
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
    $("#Img5").css("display", "none");
    $("#DE").css("display", "none");
    $("#SE").css("display", "none");
    $("#WA").css("display", "none");
    $("#DIV_Des_Bloqueo").css("display", "none");
    /*Los demás se ocultan en la SASIF Master*/
}

//Función que oculta las tablas
function Ocultar_Tablas() {
    $("#TablaDatos_D").css("padding-bottom", "25%");
    $("#TablaConsulta").css("display", "none");
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                                 REGION BOTONES                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//crear link en la BD
function BtnCrear() {

    var validate;
    validate = validarCamposCrear();

    if (validate == 0) {
        if ($("#Btnguardar").val() == "Guardar") {
            transacionAjax_UpdateDes_Bloqueo("Update_DesBloqueo");
        }
    }
}

//evento del boton salir
function x() {
    $("#dialog").dialog("close");
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                                           REGION DE VALIDACIONES                                                                                                       ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//valida si la persona ya tiene tarjeta Bloqueada
function ValidarDes_BloqueoTarjeta(validaDoc) {
    
    for (item in Matrix_Tarjeta) {
        console.log(Matrix_Tarjeta);
        console.log(Matrix_Tarjeta[0].Document_ID_Entrega == validaDoc);
        console.log(Matrix_Tarjeta[0].Document_ID_Entrega);
        console.log(validaDoc);
        if (Matrix_Tarjeta[item].Document_ID_Entrega == validaDoc) {

            $("#V_Persona").html(Matrix_Tarjeta[item].Document_ID_Entrega + " - " + Matrix_Tarjeta[item].DescripPersonaEntrega);
            $("#V_MBloqueo").html(Matrix_Tarjeta[item].MotivoBloqueo + " - " + Matrix_Tarjeta[item].DescripBloqueo);
            $("#V_ObsBloqueo").html(Matrix_Tarjeta[item].Observaciones);

            var Estado_Bloqueo = Matrix_Tarjeta[item].MotivoBloqueo;

            switch (Estado_Bloqueo) {
                case "1":
                    $("#DIV_Des_Bloqueo").css("display", "inline-table");
                    break;

                case "2":
                    Mensaje_General("No puede Des - Bloquear!", "La Tarjeta  No se puede Des - bloquear porque Ya que esta (Dañada)", "W");
                    break;

                case "3":
                    Mensaje_General("No puede Des - Bloquear!", "La Tarjeta  No se puede Des - bloquear porque Ya que esta (Deteriorada)", "W");
                    break;

                case "4":
                    $("#DIV_Des_Bloqueo").css("display", "inline-table");
                    break;

            }
        }
    }

}

//validamos campos para la creacion del link
function validarCamposCrear() {

    var Campo_1 = $("#Select_EmpresaNit").val();
    var Campo_2 = $("#Select_Tarjeta_DBlo").val();

    var validar = 0;

    if (Campo_2 == "-1" || Campo_1 == "-1") {
        validar = 1;

        if (Campo_1 == "-1")
            $("#Img1").css("display", "inline-table");
        else
            $("#Img1").css("display", "none");

        if (Campo_2 == "-1")
            $("#Img2").css("display", "inline-table");
        else
            $("#Img2").css("display", "none");
    }
    else {
        $("#Img1").css("display", "none");
        $("#Img2").css("display", "none");
    }
    return validar;
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              PROCESO DE CARGUE                                                                                                                             ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//carga el combo de Area dependiente
function Change_Select_Nit() {
    $("#Select_EmpresaNit").change(function () {
        var index_ID = $(this).val();
        TransaccionesSegunNIT(index_ID);
    });
    Change_Select_Tarjeta();
}

//Carga los combos que estan relacionados a Select_Nit
function TransaccionesSegunNIT(index_ID) {
    if (index_ID != "-1") {
        transaccionAjax_MPersona('MATRIX_PERSONA');
        transaccionAjax_MTarjeta('MATRIX_TARJETA');
        transaccionAjax_MRTP('MATRIX_RTP');
        Charge_Combos_Depend_Nit(Matrix_Tarjeta, "Select_Tarjeta_DBlo", index_ID, "");
    }
}
//valida los cambios del combo de Persona y carga
function Change_Select_Tarjeta() {
    $("#Select_Tarjeta_DBlo").change(function () {
        var index_ID = $(this).val();
        for (item in Matrix_RTP) {
            if (Matrix_RTP[item].Tarjeta_ID == index_ID) {
                ValidarDes_BloqueoTarjeta(Matrix_RTP[item].Document_ID);
                break;
            }
        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                                              MENSAJES, VISUALIZACION Y LIMPIEZA                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//limpiar campos
function Clear() {
    $("#Select_EmpresaNit").val("-1");
    $("#Select_Tarjeta_DBlo").val("-1");
    $("#TxtA_Observacion").val("");
    $("#V_Persona").html("");
    $("#V_MBloqueo").html("");
    $("#V_ObsBloqueo").html("");

    $("#DIV_Des_Bloqueo").css("display", "none");
    $('.C_Chosen').trigger('chosen:updated');

}
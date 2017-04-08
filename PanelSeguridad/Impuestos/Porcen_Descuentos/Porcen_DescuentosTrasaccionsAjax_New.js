﻿/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Porcen_Descuentos'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCombo = [];
            }
            else {
                ArrayCombo = JSON.parse(result);
                charge_CatalogList(ArrayCombo, "DDLColumns", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Pais(State) {
    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'PAISES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPaises = [];
            }
            else {
                ArrayPaises = JSON.parse(result);
                charge_CatalogList(ArrayPaises, "Select_Pais", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ciudad(State, Index) {
    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Index": Index,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCiudades = [];
            }
            else {
                ArrayCiudades = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        charge_CatalogList(ArrayCiudades, "Select_Ciudad", 1);
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Impuesto(State) {
    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayImpuesto_Gasto = [];
            }
            else {
                ArrayImpuesto_Gasto = JSON.parse(result);
                charge_CatalogList(ArrayImpuesto_Gasto, "Select_Impuesto", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Porcen_Descuentos(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayPorcen_Descuentos = [];
            }
            else {
                ArrayPorcen_Descuentos = JSON.parse(result);
                Table_Porcen_Descuentos();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Porcen_Descuentos_create(State) {

    var ID_P;
    var ID_C;
    var ID_I;
    var ID_RI;
    var ID_RF;

    var Val_1 = 0;
    var Val_2 = 0;
    var Val_3 = 0;
    var Val_4 = 0;

    var TipoL = 0;
    var L_Inf = "";
    var L_Sup = "";

    var F_1 = '';
    var F_2 = '';
    var F_3 = '';
    var F_4 = '';

    if ($("#TxtValor_1").val() != "")
        Val_1 = $("#TxtValor_1").val();
    if ($("#TxtValor_2").val() != "")
        Val_2 = $("#TxtValor_2").val();
    if ($("#TxtValor_3").val() != "")
        Val_3 = $("#TxtValor_3").val();
    if ($("#TxtValor_4").val() != "")
        Val_4 = $("#TxtValor_4").val();

    if ($("#TxtFecha_1").val() != "")
        F_1 = $("#TxtFecha_1").val();
    if ($("#TxtFecha_2").val() != "")
        F_2 = $("#TxtFecha_2").val();
    if ($("#TxtFecha_3").val() != "")
        F_3 = $("#TxtFecha_3").val();
    if ($("#TxtFecha_4").val() != "")
        F_4 = $("#TxtFecha_4").val();

    if (State == "modificar") {
        ID_P = editCod_ID;
        ID_C = editCiudad_ID;
        ID_I = editInf_Impuesto_ID;
        ID_RI = editRangoInicial_ID;
        ID_RF = editRangoFinal_ID;

        if ($("#Select_LTipo").val() != "-1")
            TipoL = $("#Select_LTipo").val();
        if ($("#Txt_LInf").val() != "")
            L_Inf = $("#Txt_LInf").val();
        if ($("#Txt_Sup").val() != "")
            L_Sup = $("#Txt_Sup").val();
    }
    else {

        if ($("#Select_LTipo").val() != "-1")
            TipoL = $("#Select_LTipo").val();
        if ($("#Txt_LInf").val() != "")
            L_Inf = $("#Txt_LInf").val();
        if ($("#Txt_Sup").val() != "")
            L_Sup = $("#Txt_Sup").val();

        ID_P = $("#Select_Pais").val();
        ID_C = $("#Select_Ciudad").val();
        ID_I = $("#Select_Impuesto").val();
        ID_RI = $("#TxtRInicial").val();
        ID_RF = $("#TxtRFinal").val();
    }

    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Pais_ID": ID_P,
            "Ciudad_ID": ID_C,
            "Impuesto_ID": ID_I,
            "RInicial": ID_RI,
            "RFinal": ID_RF,
            "TipoL": TipoL,
            "L_Inf": L_Inf,
            "L_Sup": L_Sup,
            "Fecha_1": F_1,
            "Fecha_2": F_2,
            "Fecha_3": F_3,
            "Fecha_4": F_4,
            "Porcen_1": $("#TxtPorcen_1").val(),
            "Porcen_2": $("#TxtPorcen_2").val(),
            "Porcen_3": $("#TxtPorcen_3").val(),
            "Porcen_4": $("#TxtPorcen_4").val(),
            "Val_1": Val_1,
            "Val_2": Val_2,
            "Val_3": Val_3,
            "Val_4": Val_4,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de porcentaje descuento.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "El descuento impuesto se ha modificado correctamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "El descuento impuesto se ha creado correctamente.", "S");
                        Clear();
                    }
                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Porcen_Descuentos_delete(State) {

    $.ajax({
        url: "Porcen_DescuentosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Pais_ID": editCod_ID,
            "Ciudad_ID": editCiudad_ID,
            "Impuesto_ID": editInf_Impuesto_ID,
            "RInicial": editRangoInicial_ID,
            "RFinal": editRangoFinal_ID,
            "TipoL": editTypeLimit_ID,
            "L_Inf": editLimit_Min_ID,
            "L_Sup": editLimit_Max_ID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar el porcentaje impuesto.", "E");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "El porcentaje impuesto  se ha eliminado correctamente.", "S");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Inf_Impuesto'
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
        url: "Inf_ImpuestoAjax.aspx",
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
                $("#Select_Pais").trigger("liszt:updated");
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
        url: "Inf_ImpuestoAjax.aspx",
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
                charge_CatalogList(ArrayCiudades, "Select_Ciudad", 1);
            }
        },
        error: function () {

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Impuesto(State) {
    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
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

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Cliente(State) {
    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCliente = [];
            }
            else {
                ArrayCliente = JSON.parse(result);
                charge_CatalogList(ArrayCliente, "Select_Cliente", 1);

            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Cliente_H(State, Index) {
    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ID": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCliente_H = [];
            }
            else {
                ArrayCliente_H = JSON.parse(result);
                charge_CatalogList(ArrayCliente_H, "Select_Cliente_H", 1);
                Change_Select_H_Cliente();

            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Inf_Impuesto(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayInf_Impuesto = [];
            }
            else {
                ArrayInf_Impuesto = JSON.parse(result);
                Table_Inf_Impuesto();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Inf_Impuesto_create(vp_State) {

    var vl_ID_P = $("#Select_Pais").val();
    var vl_ID_C = $("#Select_Ciudad").val();
    var vl_ID_I = $("#Select_Impuesto").val();
    var vl_ID_Cli = $("#Select_Cliente").val();
    var vl_StrCliente_H = $("#Select_Cliente_H option:selected").html().split(" - ");
    alert(vl_StrCliente_H[0] + " - " + vl_StrCliente_H[1]);

    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Pais_ID": vl_ID_P,
            "Ciudad_ID": vl_ID_C,
            "Impuesto_ID": vl_ID_I,
            "Cliente_ID": vl_ID_Cli,
            "TipoDocumento_ID": vl_StrCliente_H[0],
            "Documento_ID": vl_StrCliente_H[1],
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de información de impuesto.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Ya Existe!", "El código ingresado ya existe en la base de datos.", "W");
                    break;

                case "Exito":
                    Mensaje_General("¡Exito!", "La información de impuesto se ha creado correctamente.", "S");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}

/*------------------------------ eliminar ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Inf_Impuesto_delete(State) {

    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Pais_ID": editCod_ID,
            "Ciudad_ID": editCiudad_ID,
            "Impuesto_ID": editInf_Impuesto_ID,
            "Cliente_ID": editCliente,
            "TipoDocumento_ID": editTypeDocument,
            "Documento_ID": editDocument,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Disculpenos :(", "Ocurrio un error al intentar eliminar la información de impuesto.", "E");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("¡Registro Eliminado!", "La información de impuesto  se ha eliminado correctamente.", "S");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}

/*----------------------------------------------------------------------------------------------------------------------------------*/
/*                          CONSULTA CLIENTES                                                   */
/*----------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Read_Cliente(State, Nit, TD, D) {
    var contenido;

    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": Nit,
            "TD": TD,
            "D": D
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayClienteView = [];
            }
            else {
                ArrayClienteView = JSON.parse(result);
                VerCliente(Nit, TD, D);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ CONSULTA ---------------------------*/
//trae todas las direcciones ancladas al cliente escojido
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_allAdress(State, Nit, TypeDoc, Doc, Opc_Link) {

    ArrayDirecciones = [];

    $.ajax({
        url: "Inf_ImpuestoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDirecciones = [];
            }
            else {
                ArrayDirecciones = JSON.parse(result);
                Tabla_General(Opc_Link);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'PRODUCTOS'
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
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEmpresaNit = [];
            }
            else {
                ArrayEmpresaNit = JSON.parse(result);
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Tipo_P(State) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTipo_P = [];
            }
            else {
                ArrayTipo_P = JSON.parse(result);
                charge_CatalogList(ArrayTipo_P, "Select_Tipo_P", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_SubTipo_P(State, Index) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'TIPO',
            "ID": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArraySubTipo_P = [];
            }
            else {
                ArraySubTipo_P = JSON.parse(result);
                charge_CatalogList(ArraySubTipo_P, "Select_SubTipo_P", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Tipo_A(State) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTipo_A = [];
            }
            else {
                ArrayTipo_A = JSON.parse(result);
                charge_CatalogList(ArrayTipo_A, "Select_Tipo_A", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Transaccion(State) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTransaccion = [];
            }
            else {
                ArrayTransaccion = JSON.parse(result);
                charge_CatalogList(ArrayTransaccion, "Select_Crea", 1);
                charge_CatalogList(ArrayTransaccion, "Select_Mod", 1);
                charge_CatalogList(ArrayTransaccion, "Select_Ret", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_SubTipo_A(State, Index) {
    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'TIPO',
            "ID": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArraySubTipo_A = [];
            }
            else {
                ArraySubTipo_A = JSON.parse(result);
                charge_CatalogList(ArraySubTipo_A, "Select_SubTipo_A", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Productos(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayProductos = [];
            }
            else {
                ArrayProductos = JSON.parse(result);
                Table_Productos();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Productos_create(State) {

    var Prod_ID;
    var TipoP_ID;
    var TipoA_ID;
    var SubTipoP_ID;
    var SubTipoA_ID;
    var Crea_ID;
    var Mod_ID;
    var Ret_ID;
    var ID_N;


    var index_A;
    var index_SA;
    var index_SP;
    var index_C;
    var index_M;
    var index_R;

    if ($("#Select_Tipo_A").val() == "-1" || $("#Select_Tipo_A").val() == "")
        index_A = 0;
    else
        index_A = $("#Select_Tipo_A").val();

    if ($("#Select_SubTipo_P").val() == "-1" || $("#Select_SubTipo_P").val() == "")
        index_SP = 0;
    else
        index_SP = $("#Select_SubTipo_P").val();

    if ($("#Select_SubTipo_A").val() == "-1" || $("#Select_SubTipo_A").val() == "")
        index_SA = 0;
    else
        index_SA = $("#Select_SubTipo_A").val();

    if ($("#Select_Crea").val() == "-1" || $("#Select_Crea").val() == "")
        index_C = 0;
    else
        index_C = $("#Select_Crea").val();

    if ($("#Select_Mod").val() == "-1" || $("#Select_Mod").val() == "")
        index_M = 0;
    else
        index_M = $("#Select_Mod").val();

    if ($("#Select_Ret").val() == "-1" || $("#Select_Ret").val() == "")
        index_R = 0;
    else
        index_R = $("#Select_Ret").val();


    if (State == "modificar") {
        ID_N = editNit_ID;
        Prod_ID = ProductoID;
        TipoP_ID = $("#Select_Tipo_P").val();
        TipoA_ID = index_A;
        SubTipoP_ID = index_SP;
        SubTipoA_ID = index_SA;
        Crea_ID = index_C;
        Mod_ID = index_M;
        Ret_ID = index_R;
    }
    else {
        ID_N = $("#Select_EmpresaNit").val();
        Prod_ID = $("#Txt_ID").val();
        TipoP_ID = $("#Select_Tipo_P").val();
        TipoA_ID = index_A;
        SubTipoP_ID = index_SP;
        SubTipoA_ID = index_SA;
        Crea_ID = index_C;
        Mod_ID = index_M;
        Ret_ID = index_R;
    }

    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": ID_N,
            "ID": Prod_ID,
            "Descripcion": $("#TxtDescripcion").val(),
            "TipoP_ID": TipoP_ID,
            "TipoA_ID": TipoA_ID,
            "SubTipoP_ID": SubTipoP_ID,
            "SubTipoA_ID": SubTipoA_ID,
            "Crea_ID": Crea_ID,
            "Mod_ID": Mod_ID,
            "Ret_ID": Ret_ID,
            "Cuenta_1": $("#TxtCuenta_1").val(),
            "Cuenta_2": $("#TxtCuenta_2").val(),
            "Cuenta_3": $("#TxtCuenta_3").val(),
            "Cuenta_4": $("#TxtCuenta_4").val(),
            "Cuenta_5": $("#TxtCuenta_5").val(),
            "Cuenta_6": $("#TxtCuenta_6").val(),
            "Cuenta_7": $("#TxtCuenta_7").val(),
            "Cuenta_8": $("#TxtCuenta_8").val(),
            "Cuenta_9": $("#TxtCuenta_9").val(),
            "Cuenta_10": $("#TxtCuenta_10").val(),
            "Cuenta_11": $("#TxtCuenta_11").val(),
            "Cuenta_12": $("#TxtCuenta_12").val(),
            "Cuenta_13": $("#TxtCuenta_13").val(),
            "Cuenta_14": $("#TxtCuenta_14").val(),
            "Cuenta_15": $("#TxtCuenta_15").val(),
            "Cuenta_16": $("#TxtCuenta_16").val(),
            "Cuenta_17": $("#TxtCuenta_17").val(),
            "Cuenta_18": $("#TxtCuenta_18").val(),
            "Cuenta_19": $("#TxtCuenta_19").val(),
            "Cuenta_20": $("#TxtCuenta_20").val(),
            "Cuenta_21": $("#TxtCuenta_21").val(),
            "Cuenta_22": $("#TxtCuenta_22").val(),
            "Cuenta_23": $("#TxtCuenta_23").val(),
            "Cuenta_24": $("#TxtCuenta_24").val(),
            "Cuenta_25": $("#TxtCuenta_25").val(),
            "Cuenta_26": $("#TxtCuenta_26").val(),
            "Cuenta_27": $("#TxtCuenta_27").val(),
            "Cuenta_28": $("#TxtCuenta_28").val(),
            "Cuenta_29": $("#TxtCuenta_29").val(),
            "Cuenta_30": $("#TxtCuenta_20").val(),
            "Cuenta_31": $("#TxtCuenta_31").val(),
            "Cuenta_32": $("#TxtCuenta_32").val(),
            "Cuenta_33": $("#TxtCuenta_33").val(),
            "Cuenta_34": $("#TxtCuenta_34").val(),
            "Cuenta_35": $("#TxtCuenta_35").val(),
            "Cuenta_36": $("#TxtCuenta_36").val(),
            "Cuenta_37": $("#TxtCuenta_37").val(),
            "Cuenta_38": $("#TxtCuenta_38").val(),
            "Cuenta_39": $("#TxtCuenta_39").val(),
            "Cuenta_40": $("#TxtCuenta_40").val(),
            "Cuenta_41": $("#TxtCuenta_41").val(),
            "Cuenta_42": $("#TxtCuenta_42").val(),
            "Cuenta_43": $("#TxtCuenta_43").val(),
            "Cuenta_44": $("#TxtCuenta_44").val(),
            "Cuenta_45": $("#TxtCuenta_45").val(),
            "Cuenta_46": $("#TxtCuenta_46").val(),
            "Cuenta_47": $("#TxtCuenta_47").val(),
            "Cuenta_48": $("#TxtCuenta_48").val(),
            "Cuenta_49": $("#TxtCuenta_49").val(),
            "Cuenta_50": $("#TxtCuenta_50").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Productos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    break;

                case "Existe":
                    $("#dialog").dialog("option", "title", "Ya Existe");
                    $("#Mensaje_alert").text("El codigo ingresado ya existe en la base de datos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "None");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Productos fue creado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WE").css("display", "none");
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
function transacionAjax_Productos_delete(State) {

    $.ajax({
        url: "ProductosAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": editNit_ID,
            "Prod_ID": ProductoID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se elimino el Productos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Productos, para eliminarlo debe eliminar primero el registro en la tabla Empleado");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Productos fue eliminado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WE").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}
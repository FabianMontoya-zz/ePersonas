/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    OpenControl();
    $.ajax({
        url: "ServicioServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'SUCURSAL_SERVICIO'
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
        url: "ServicioServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
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

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {

    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MMoneda(State) {
    $.ajax({
        url: "ServicioServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO',
            "Nit": $("#Select_EmpresaNit").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Moneda = [];
            }
            else {
                Matrix_Moneda = JSON.parse(result);
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_Cod", "", "");
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_Cod", $("#Select_EmpresaNit").val(), "");
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_SucursalServicio(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "ServicioServicioAjax.aspx",
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
                ArraySucursalServicio = [];
            }
            else {
                ArraySucursalServicio = JSON.parse(result);
                Table_Servicio();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_SucursalServicio_create(State) {

    var ID;
    var Nit_ID;
    var SucursalServicioDepen = 0;
    var Politica = 0;

    if (State == "modificar") {
        Nit_ID = editNit_ID;
        ID = editID;
    }
    else {
        Nit_ID = $("#Select_EmpresaNit").val();
        ID = $("#Txt_ID").val();
    }

    $.ajax({
        url: "ServicioServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID,
            "ID": ID,
            "nombre": $("#TxtNombre").val(),
            "Tipo": $("#Select_SucursalServicio").val(),
            "Refe": $("#Text_Referencia").val(),
            "Mon": $("#Select_Moneda_Cod").val(),
            "Cos": $("#TxtCosto").val(),
            "Val": $("#TxtValor").val(),
            "Det": $("#Txt_Detalle").val(),
            "Cap": $("#Text_Capacidad").val(),
            "Blo": $("#Text_Bloqueo").val(),
            "Cal": $("#Select_Calculo").val(),
            "TimSes": $("#Text_Tiempo_Sesion").val(),
            "TiemEn": $("#Text_Tiempo_Entre_Sesiones").val(),
            "MaxA": $("#Tiempo_Max_Agenda").val(),
            "Ima": $("#Imgfoto").val(),
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    if (estado == "modificar") {
                        Mensaje_General("Disculpenos :(", "No se realizo la modificación del SucursalServicio!", "E");
                    } else {
                        Mensaje_General("Disculpenos :(", "No se realizo el ingreso del SucursalServicio!", "E");
                    }
                    break;

                case "Existe":
                    Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("Exito", "El SucursalServicio fue modificado exitosamente!", "S");
                        Clear();
                        HabilitarPanel("modificar")
                    }
                    else {
                        Mensaje_General("Exito", "El SucursalServicio fue creado exitosamente!", "S");
                        Clear();
                        HabilitarPanel("modificar")
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
function transacionAjax_SucursalServicio_delete(State) {

    $.ajax({
        url: "ServicioServicioAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": editNit_ID,
            "ID": editID,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se elimino el SucursalServicio!", "E");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    Mensaje_General("Integridad referencial", "No se elimino el SucursalServicio, para eliminarlo debe eliminar primero el registro en la tabla Empleado", "W");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    Mensaje_General("Exito", "El SucursalServicio fue eliminado exitosamente!", "S");
                    transacionAjax_SucursalServicio("consulta", "N", "ALL");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}
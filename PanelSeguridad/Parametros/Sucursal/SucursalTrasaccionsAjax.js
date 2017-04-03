/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(vp_State) {
    OpenControl();
    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'SUCURSAL'
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

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    }).done(function () {
        var vl_OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (vl_OnlyEmpresa == true) {
            Nit_ID_proccess = $("#Select_EmpresaNit").val();
            TransaccionesSegunNIT(Nit_ID_proccess);
        }
    });
}

/*-------------------- Carga combo NIT ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(vp_State) {
    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
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
        //Jhon
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador 
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Sucursal(vp_State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }

    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "filtro": filtro,
            "opcion": opcion,
            "contenido": contenido,
            "Nit_User": g_NitEmpresa_User
        },
        //mostrar resultados de la creacion del Sucursal
        success: function (result) {
            if (result == "") {
                ArraySucursales = [];
            }
            else {
                ArraySucursales = JSON.parse(result);
                Table_Sucursal();
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDirecciones(vp_State, vp_Nit) {
    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'Direcciones',
            "NIT": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Direcciones = [];
            }
            else {
                Matrix_Direcciones = JSON.parse(result);
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        Charge_Combo_Persona(Matrix_Direcciones, "Select_Direccion", "", "");
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Calendario(vp_State, vp_Nit) {
    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'CALENDARIOS',
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Calendarios = [];
            }
            else {
                Matrix_Calendarios = JSON.parse(result);
            }
        },
        error: function () {

        },
        async: false,
        cache: false
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Calendarios, "Select_Calendario", "", "");
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Sucursal_create(vp_State) {

    var vl_ID;
    var vl_NIT;
    var vl_Descrip;

    if (vp_State == "modificar") {
        vl_ID = editID;
        vl_NIT = editNIT;
    } else {
        vl_ID = $("#Txt_ID").val();
        vl_NIT = $("#Select_EmpresaNit").val();
    }


    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vl_NIT,
            "ID": vl_ID,
            "descripcion": $("#TxtDescription").val(),
            "sigla": $("#TxtSigla").val(),
            "Derec": $("#Select_Direccion").val(),
            "Cale": $("#Select_Calendario").val(),
            "user": User.toUpperCase()
        },
        //mostrar resultados de la creacion del Sucursal
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error y no se realizó el Ingreso de la Nueva Sucursal.", "W");
                    break;

                case "Existe":
                    Mensaje_General("Sucursal Existente", "La Sucursal que desea ingresar ya existe en el sistema, favor revisar.", "E");
                    break;

                case "Exito":
                    if (estado == "modificar") {
                        Mensaje_General("¡Exito!", "La Sucursal  se ha modificado exitosamente.", "S");
                        Clear();
                    }
                    else {
                        Mensaje_General("¡Exito!", "La Sucursal  se ha ingresado exitosamente en el sistema.", "S");
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
function transacionAjax_Sucursal_delete(vp_State) {
    vl_ID = editID;
    vl_NIT = editNIT;

    $.ajax({
        url: "SucursalAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "NIT": vl_NIT,
            "ID": vl_ID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "Error") {
                $("#dialog_eliminar").dialog("close");
                Mensaje_General("Disculpenos :(", "Ocurrió un error y no se elimino la sucursal.", "W");
            }
            else {
                $("#dialog_eliminar").dialog("close");
                Mensaje_General("¡Exito!", "La sucursal  se ha Eliminado correctamente.", "S");
                $(".container_TGrid").html("");
                Clear();
            }
        },
        error: function () {

        }
    });

}


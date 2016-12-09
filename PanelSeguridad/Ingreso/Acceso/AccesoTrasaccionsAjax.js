/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersonas(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Persona = [];
            }
            else {
              //  OpenControl();
                Matrix_Persona = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocWork(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_DocWork = [];
            }
            else {
                Matrix_DocWork = JSON.parse(result);
                //CloseControl();
            }
        },
        error: function () {

        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersona(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Persona = [];
            }
            else {
                Matrix_Persona = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersona_Doc(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PersonaDoc = [];
            }
            else {
                Matrix_PersonaDoc = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MAccesoPrede(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_AccesoPredeterminados = [];
            }
            else {
                Matrix_AccesoPredeterminados = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPAcceso(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PAcceso = [];
            }
            else {
                Matrix_PAcceso = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MArea(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Area = [];
            }
            else {
                Matrix_Area = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPAcceso_Area(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_PAcceso_Area = [];
            }
            else {
                Matrix_PAcceso_Area = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDatosUsuario(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "User_Porteria": User_Porteria
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "")
                Matrix_Datos_Empresa = [];
            else {
               Matrix_Datos_Empresa = JSON.parse(result);
                transaccionAjax_MEmpleados("MATRIX_EMPLEADOS", Matrix_Datos_Empresa[0].Nit_ID);
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MEmpleados(State, Nit_Empresa) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit": Nit_Empresa
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Empleados = [];
            }
            else {
                Matrix_Empleados = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTdoc = [];
            }
            else {
                ArrayTdoc = JSON.parse(result);
                charge_CatalogList(ArrayTdoc, "Select_Documento", 1);
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
        url: "AccesoAjax.aspx",
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
                charge_CatalogList(ArrayEmpresaNit, "Select_EmpresaNit", "Generico");
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_LogAcceso_create(State) {

    //recorer array para el ingreso de los ingresos realizados
    ListIngresoLog = JSON.stringify(Array_IngresoLog);

    $.ajax({
        url: "AccesoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ListIngresoLog": ListIngresoLog
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "falla en el registro ,no puede ingresar", "E");
                    break;

                case "Exito":
                    Mensaje_General("Exito", "se ha registrado el ingreso,la persona puede ingresar", "S");
                    $("#dialog_eliminar").dialog("close");
                    Clear();
                    break;
            }
        },
        error: function () {
        }
    });
}


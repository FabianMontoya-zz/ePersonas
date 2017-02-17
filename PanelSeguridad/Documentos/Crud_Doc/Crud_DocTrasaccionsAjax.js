/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MClienteDep(vp_State, vp_Nit) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_ClienteDep = [];
            }
            else {
                Matrix_ClienteDep = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_ClienteDep, "Select_Persona", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MDocumento(vp_State, vp_Nit) {
    OpenControl();
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Documento = [];
            }
            else {
                Matrix_Documento = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Documento, "Select_Documento", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MSecuencia(vp_State, vp_Nit) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Secuencia = [];
            }
            else {
                Matrix_Secuencia = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Secuencia, "Select_Secuencia", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MContrato(vp_State, vp_Nit) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Contrato = [];
            }
            else {
                Matrix_Contrato = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Contrato, "Select_Contrato", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MActivo(vp_State, vp_Nit) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Activo = [];
            }
            else {
                Matrix_Activo = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Activo, "Select_Activo", vp_Nit, "");
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MFactura(vp_State, vp_Nit) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "Nit": vp_Nit
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Factura = [];
            }
            else {
                Matrix_Factura = JSON.parse(result);
            }
        },
        error: function () {

        },
    }).done(function () {
        Charge_Combos_Depend_Nit(Matrix_Factura, "Select_Factura", vp_Nit, "");
    });
}


/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_RutasOperacion(State) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                RutasOperacion = [];
            }
            else {
                RutasOperacion = JSON.parse(result);
                RutaTemporal = RutasOperacion[0].RutaDocumentoTemporal;
                RutaRelativa = RutasOperacion[0].RutaRelativaDocumento;
            }
        },
        error: function () {

        },
    }).done(function () {
        var vl_OnlyEmpresa = VerificarNIT("Select_EmpresaNit");

        if (vl_OnlyEmpresa == true) {
            var vl_nit_emp = $("#Select_EmpresaNit").val();
            TransaccionesSegunNIT(vl_nit_emp);
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
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
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Formato(State) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayFormato = [];
            }
            else {
                ArrayFormato = JSON.parse(result);
                charge_CatalogList(ArrayFormato, "Select_Formato", 1);
            }
        },
        error: function () {

        }
    });
}

/*PASO 0*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MConsecutivo(State) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Consecutivo = [];
                $("#dialog").dialog("option", "title", "Exito");
                $("#Mensaje_alert").text("El documento no se puede crear no hay consecutivos! ");
                $("#dialog").dialog("open");
                $("#DE").css("display", "none");
                $("#SE").css("display", "none");
                $("#WE").css("display", "block");
            }
            else {
                Matrix_Consecutivo = JSON.parse(result);
                switch (CheckVigencias) {

                    case "N":
                        var ConsecutivoExist = CaptureConsecutivo();
                        ValideConsecutivo(ConsecutivoExist);
                        break;

                    case "S":
                        var validar = ValidarCamposVigencia();
                        if (validar == 0) {
                            var ConsecutivoExist = CaptureConsecutivo();
                            ValideConsecutivo(ConsecutivoExist);
                        }
                        break;
                }

            }
        },
        error: function () {

        }
    });
}

/*PASO 1*/
/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_CopyDocument(State) {

    var StrDoc_Name = Doc_name.split(".");
    var Split_Name = StrDoc_Name[0].split("_");

    NameDoc_Final = Split_Name[0] + "_" + Split_Name[1] + "_" + Split_Name[2] + "_" + Split_Name[3] + "_" + ConsecutivoOrigen + "." + StrDoc_Name[1];

    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "RutaDestino": RutaDestino,
            "RutaTemporal": RutaTemporal,
            "Doc_name": Doc_name,
            "NameDoc_Final": NameDoc_Final
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == 0) {
                transacionAjax_UpdateConsecutivo("Update_Consecutivo", ConsecutivoNuevo);
            }
            else {
                $("#dialog").dialog("option", "title", "Atención!");
                $("#Mensaje_alert").text("El documento no se puede crear la ruta NO Existe! ");
                $("#dialog").dialog("open");
                $("#DE").css("display", "none");
                $("#SE").css("display", "none");
                $("#WE").css("display", "block");
            }
        },
        error: function () {

        }
    });
}

/* PASO 2 */
/*------------------------------ crear documento ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_UpdateConsecutivo(State, Consecutivo) {
    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Consecutivo": Consecutivo,
            "Nit_ID": Nit_ID_proccess
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            transacionAjax_DocumentosExitentes("Create_DocExist");
        },
        error: function () {

        }
    });
}

/* PASO 3 */
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_DocumentosExitentes(State) {
    var ValVerificar = 0;
    var FechaVigencia = "";
    var FechaVencimiento = "";
    var DiasVigencia = 0;

    if (RequiereVerif == "S")
        ValVerificar = 1;

    if (CheckVigencias == "S") {
        FechaVigencia = $("#TxtFinicial").val();
        FechaVencimiento = $("#TxtFVencimiento").val();
        DiasVigencia = $("#txt_DVigencia").val();
    }

    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID_proccess,
            "Secuencia": ConsecutivoOrigen,
            "Documento_ID": $("#Select_Documento").val(),
            "Nombre_Save": NameDoc_Final,
            "Ruta": RutaDestino,
            "Formato": Formato_ID,
            "IndicativoFoto": IndicativoFoto,
            "RequiereVerif": ValVerificar,
            "ObserCaptura": $("#TxtA_Observacion").val(),
            "FechaVigencia": FechaVigencia,
            "FechaVencimiento": FechaVencimiento,
            "DiasVigencia": DiasVigencia,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Crud_Doc!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Exito":
                    transacionAjax_AsociacionDocumentos("Create_DocAsociados")
                    break;
            }

        },
        error: function () {
        }
    });
}

/* PASO 4 */
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_AsociacionDocumentos(State) {

    var Tdoc = 0;
    var Doc = 0;
    var Contrato = "";
    var Secuencia_doc = 0;
    var Activos = "";
    var Facturas = "";

    if ($("#Select_Persona").val() != "-1") {
        var strPersona = $("#Select_Persona option:selected").html();
        var Spersona = strPersona.split(" - ");
        var Stdoc = Spersona[1];
        var Sdoc = Spersona[0];
        Tdoc = Stdoc.trim();
        Doc = Sdoc.trim();
    }

    if ($("#Select_Contrato").val() != "-1")
        Contrato = $("#Select_Contrato").val();

    if ($("#Select_Secuencia").val() != "-1")
        Secuencia_doc = $("#Select_Secuencia").val();

    $.ajax({
        url: "Crud_DocAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": Nit_ID_proccess,
            "TDoc": Tdoc,
            "Doc": Doc,
            "Secuencia_doc": Secuencia_doc,
            "Secuencia_ID": ConsecutivoOrigen,
            "Contrato": Contrato,
            "Activos": Activos,
            "Facturas": Facturas,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Crud_Doc!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "Exito":
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El documento fue creado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#Dialog_Visor").dialog("close");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}




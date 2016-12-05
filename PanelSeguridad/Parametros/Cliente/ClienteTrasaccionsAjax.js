/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_CargaBusqueda(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'Cliente'
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
function transaccionAjax_MDocWork(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_DocWork = [];
            }
            else {
                Matrix_DocWork = JSON.parse(result);
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
        url: "ClienteAjax.aspx",
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
function transacionAjax_EntFinan(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayEntfinanciera = [];
            }
            else {
                ArrayEntfinanciera = JSON.parse(result);
                charge_CatalogList(ArrayEntfinanciera, "Select_EntFinanciera", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_TCuenta(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'CLIENTE'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTcuenta = [];
            }
            else {
                ArrayTcuenta = JSON.parse(result);
                charge_CatalogList(ArrayTcuenta, "Select_TipoCuenta", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPaises_Ciudades(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Ciudad = [];
            }
            else {
                Matrix_Ciudad = JSON.parse(result);
                F_Matrix_pais();
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
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'AREA'
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
function transaccionAjax_MCargo(State) {

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'AREA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Cargo = [];
            }
            else {
                Matrix_Cargo = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MJefe(State) {

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'AREA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Jefe = [];
            }
            else {
                Matrix_Jefe = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MGrpDoc(State) {

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'AREA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_GrpDocumentos = [];
            }
            else {
                Matrix_GrpDocumentos = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ciudad_D(State, Index) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Index": Index,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayCiudades_D = [];
            }
            else {
                ArrayCiudades_D = JSON.parse(result);
                charge_CatalogList(ArrayCiudades_D, "Select_Ciudad_D", 1);
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
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayImpuesto_Gasto = [];
            }
            else {
                ArrayImpuesto_Gasto = JSON.parse(result);
                charge_CatalogList(ArrayImpuesto_Gasto, "Select_Documento", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Seguridad(State) {
    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "tabla": 'SEGURIDAD'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArraySeguridad = [];
            }
            else {
                ArraySeguridad = JSON.parse(result);
                charge_CatalogList(ArraySeguridad, "Select_Politica", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ consulta ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Cliente(State, filtro, opcion) {
    var contenido;

    if ($("#TxtRead").val() == "") {
        contenido = "ALL";
    }
    else {
        contenido = $("#TxtRead").val();
    }


    $.ajax({
        url: "ClienteAjax.aspx",
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
                ArrayCliente = [];
            }
            else {
                ArrayCliente = JSON.parse(result);
                Table_Cliente();
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Cliente_create(State) {

    var ID_N;
    var ID_TD;
    var ID_D;
    var capture_Nit;
    var CodBank = 0;
    var Area = 0;
    var Cargo = 0;
    var Politica = 0;
    var TDocJefe = 0;
    var DocJefe = 0;
    var GrpDocumento = 0;

    var Name;
    var CiudadDocument;
    var CL;
    var AV;
    var TR;
    var HA;
    var ME;
    var EM;
    var AS;
    var PR;
    var EB;
    var Sex="";

    
    if ($("#Select_Sex").val() != "-1")
        Area = $("#Select_Sex").val();

    if ($("#Select_Area").val() != "-1")
        Sex = $("#Select_Area").val();


    if ($("#Select_Cargo").val() != "-1")
        Cargo = $("#Select_Cargo").val();

    if ($("#Select_Jefe").val() != "-1") {
        var StrJefe = $("#Select_Jefe option:selected").html();
        var SplitJefe = StrJefe.split(" - ");
        TDocJefe = SplitJefe[0];
        DocJefe = SplitJefe[1];
    }

    if ($('#Select_GrpDocument').val() != "-1")
        GrpDocumento = $('#Select_GrpDocument').val();

    if ($("#Select_Politica").val() != "-1")
        Politica = $("#Select_Politica").val();

    if ($("#Txt_CodBank").val() != "")
        CodBank = $("#Txt_CodBank").val();

    if ($("#TxtNombre").val() != "")
        Name = $("#TxtNombre").val();
    else
        Name = $("#TxtNombreNit").val();

    if ($("#Select_Ciudad_Doc").val() == "-1" || $("#Select_Ciudad_Doc").val() == "")
        CiudadDocument = 0;
    else
        CiudadDocument = $("#Select_Ciudad_Doc").val();


    if (State == "modificar") {
        ID_N = editNit_ID;
        ID_TD = editType_Document_ID;
        ID_D = editDocument_ID;
    }
    else {
        $("#Complementos").css("display", "inline-table");
        var StrID = $("#Select_EmpresaNit").val();
        var SplitID = StrID.split("_");

        ID_N = SplitID[0];
        ID_TD = $("#Select_Documento").val();
        ID_D = $("#Txt_Ident").val();
    }

    if ($('#Check_Cliente').is(':checked'))
        CL = 'S';
    else
        CL = 'N';

    if ($('#Check_Avaluador').is(':checked'))
        AV = 'S';
    else
        AV = 'N';

    if ($('#Check_Transito').is(':checked'))
        TR = 'S';
    else
        TR = 'N';

    if ($('#Check_Hacienda').is(':checked'))
        HA = 'S';
    else
        HA = 'N';

    if ($('#Check_MultiEmpresa').is(':checked'))
        ME = 'S';
    else
        ME = 'N';

    if ($('#Check_Empleado').is(':checked'))
        EM = 'S';
    else
        EM = 'N';

    if ($('#Check_Asesor').is(':checked'))
        AS = 'S';
    else
        AS = 'N';

    if ($('#Check_Proveedor').is(':checked'))
        PR = 'S';
    else
        PR = 'N';

    if ($('#Check_EntBancaria').is(':checked'))
        EB = 'S';
    else
        EB = 'N';

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": ID_N,
            "TypeDocument_ID": ID_TD,
            "Document_ID": ID_D,
            "Digito_Verificacion": $("#TxtVerif").val(),
            "Nombre": Name,
            "Nombre_2": $("#TxtNombre_2").val(),
            "Ape_1": $("#Txt_Ape_1").val(),
            "Ape_2": $("#Txt_Ape_2").val(),
            "Pais_ID": $("#Select_Pais").val(),
            "Ciudad_ID": $("#Select_Ciudad").val(),
            "CiuDoc": CiudadDocument,
            "TipoPersona": $("#Select_TPersona").val(),
            "Regimen": $("#Select_Regimen").val(),
            "OP_Cliente": CL,
            "OP_Avaluador": AV,
            "OP_Transito": TR,
            "OP_Hacienda": HA,
            "OP_Empresa": ME,
            "OP_Empleado": EM,
            "OP_Asesor": AS,
            "Other_1": PR,
            "Other_2": EB,
            "CodBank": CodBank,
            "Acceso": $("#Select_Acceso").val(),
            "Area": Area,
            "Cargo": Cargo,
            "TDocJefe": TDocJefe,
            "DocJefe": DocJefe,
            "Politica": Politica,
            "Sexo": Sex,
            "FechaNacimiento": $("#Text_fechaNacimiento").val(),
            "GrpDocumento": GrpDocumento,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso del Cliente!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
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
                    if (estado == "modificar") {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Cliente fue modificado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WA").css("display", "none");
                        NitAlter = $("#Select_EmpresaNit").val();
                    }
                    else {
                        $("#dialog").dialog("option", "title", "Exito");
                        $("#Mensaje_alert").text("El Cliente fue creado exitosamente! ");
                        $("#dialog").dialog("open");
                        $("#DE").css("display", "none");
                        $("#SE").css("display", "block");
                        $("#WA").css("display", "none");
                        OpcWordComplementos = "U";
                        NitAlter = $("#Select_EmpresaNit").val();
                        $("#Admin_Anexos").css("display", "inline-table");

                        Disabled_Client();
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
function transacionAjax_Cliente_delete(State) {

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit_ID": editNit_ID,
            "TypeDocument_ID": editType_Document_ID,
            "Document_ID": editDocument_ID,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se elimino el Cliente!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exist_O":
                    $("#dialog").dialog("option", "title", "Integridad referencial");
                    $("#Mensaje_alert").text("No se elimino el Cliente, para eliminarlo debe eliminar primero el registro en la tabla Empleado");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "none");
                    $("#WE").css("display", "block");
                    $("#dialog_eliminar").dialog("close");
                    break;

                case "Exito":
                    $("#dialog_eliminar").dialog("close");
                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("El Cliente fue eliminado exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#dialog_eliminar").dialog("close");
                    transacionAjax_Cliente("consulta", "N", "ALL");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

}


/*---------------------------------------------------------------------------------------------------------------*/
/*                                        AJAX DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

/*------------------------------ CONSULTA ---------------------------*/
//trae todas las direcciones ancladas al cliente escojido
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_allAdress(State, Nit, TypeDoc, Doc, Opc_Link) {

    ArrayDirecciones = [];

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
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

/*------------------------------ crear direcciones---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Adress_create(State, Nit, TypeDoc, Doc) {

    ListDirecciones = JSON.stringify(ArrayDirecciones);

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc,
            "ListDirecciones": ListDirecciones,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "ERROR":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso de las direcciones!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "CREO":

                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("las direcciones fueron agregadas exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#Dialog_Direcciones").dialog("close");
                    break;
            }

        },
        error: function () {

        }
    });
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        AJAX DE ENTIDADES FINANCIERAS                                          */
/*---------------------------------------------------------------------------------------------------------------*/

/*------------------------------ CONSULTA ---------------------------*/
//trae todas las entidades financieras ancladas al cliente escojido
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_allBank(State, Nit, TypeDoc, Doc, Opc_Link) {

    ArrayBancos = [];

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayBancos = [];
            }
            else {
                ArrayBancos = JSON.parse(result);
                Tabla_General_Bank(Opc_Link);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear Entidades Financieras---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Bank_create(State, Nit, TypeDoc, Doc) {

    ListBancos = JSON.stringify(ArrayBancos);

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc,
            "ListBancos": ListBancos,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "ERROR":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso de las Entidades financieras!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "CREO":

                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("las Entidades Finacieras fueron agregadas exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#Dialog_Direcciones").dialog("close");
                    break;
            }

        },
        error: function () {

        }
    });
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        AJAX DE DOCUMENTOS                                          */
/*---------------------------------------------------------------------------------------------------------------*/

/*------------------------------ CONSULTA ---------------------------*/
//trae todas las entidades financieras ancladas al cliente escojido
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_allDocument(State, Nit, TypeDoc, Doc, Opc_Link) {

    ArrayDocument = [];

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDocument = [];
            }
            else {
                ArrayDocument = JSON.parse(result);
                Tabla_General_Document(Opc_Link);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ CONSULTA ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Foto(State, Nit, TypeDoc, Doc, Index_Cliente, Type, Pais) {

    transacionAjax_Ciudad_D('Ciudad', Pais);

    ArrayFoto = [];

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc
        },
        //Transaccion Ajax en proceso
        success: function (result) {

            Carga_Relaciones(Index_Cliente, Type);

            if (result == "") {
                ArrayFoto = [];
            }
            else {
                ArrayFoto = JSON.parse(result);
                ViewFoto();
            }
        },
        error: function () {

        }
    });
}


/*------------------------------ crear direcciones---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Document_create(State, Nit, TypeDoc, Doc) {

    ListDocument = JSON.stringify(ArrayDocument);

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc,
            "ListDocument": ListDocument,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "ERROR":
                    $("#dialog").dialog("option", "title", "Disculpenos :(");
                    $("#Mensaje_alert").text("No se realizo el ingreso de los Documentos!");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "block");
                    $("#SE").css("display", "none");
                    $("#WA").css("display", "none");
                    break;

                case "CREO":

                    $("#dialog").dialog("option", "title", "Exito");
                    $("#Mensaje_alert").text("Los Documentos fueron agregados exitosamente! ");
                    $("#dialog").dialog("open");
                    $("#DE").css("display", "none");
                    $("#SE").css("display", "block");
                    $("#WA").css("display", "none");
                    $("#Dialog_Direcciones").dialog("close");
                    break;
            }

        },
        error: function () {

        }
    });
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        AJAX DE DOCUMENTOS AUTORIZADOS                                         */
/*---------------------------------------------------------------------------------------------------------------*/

/*------------------------------ CONSULTA ---------------------------*/
//trae todas las entidades financieras ancladas al cliente escojido
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_AllDocAtorizados(State, Nit, TypeDoc, Doc, Opc_Link) {

    ArrayDocAutorizado = [];

    $.ajax({
        url: "ClienteAjax.aspx",
        type: "POST",
        //crear json
        data: { "action": State,
            "Nit": Nit,
            "TypeDoc": TypeDoc,
            "Doc": Doc
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayDocAutorizado = [];
            }
            else {
                ArrayDocAutorizado = JSON.parse(result);
                Tabla_General_DocumentAuto(Opc_Link);
            }
        },
        error: function () {

        }
    });
}
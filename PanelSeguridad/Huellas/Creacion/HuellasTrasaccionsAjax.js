/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    OpenControl();
    $.ajax({
        url: "HuellasAjax.aspx",
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
function transacionAjax_Documento(State) {
    $.ajax({
        url: "HuellasAjax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax para hacer la consulta
function transacionAjax_ShearchPeople(State, TD, D, NIT, Vista) {
    $.ajax({
        url: "HuellasAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "TD": TD,
            "D": D,
            "NIT": NIT
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {
                case "NO":
                    Mensaje_General("¡Datos Inexistentes!", "La persona que desea relacionar no está inscrita en el sistema. Favor verificar los datos.", "W");
                    $("#" + Vista).html("----");
                    Persona = false;
                    $("#Img1").css("display", "inline-table");
                    $("#Img_TD").css("display", "inline-table");
                    $("#Img_D").css("display", "inline-table");
                    break;

                default:
                    $("#" + Vista).html(result);
                    namePersona = result;
                    Persona = true;
                    $("#Img1").css("display", "none");
                    $("#Img_TD").css("display", "none");
                    $("#Img_D").css("display", "none");
                    break;
            }
        },
        error: function () {
        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Ok(vp_State) {
    var Dedos = "";

    for (item in ArrayDedos) {
        Dedos = Dedos + "," + ArrayDedos[item];
    }

    var Nit_ID;

    for (item in ArrayEmpresaNit) {
        if (ArrayEmpresaNit[item].ID == $("#Select_EmpresaNit").val()) {
            Nit_ID = ArrayEmpresaNit[item].descripcion;
            break;
        }
    }

    Dedos = Dedos.substr(1);

    $.ajax({
        url: "HuellasAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": vp_State,
            "tabla": 'Huellas',
            "NIT": Nit_ID,
            "TypeDocument": $("#Select_Documento").val(),
            "Document": $("#TxtDoc").val(),
            "Name_Client": namePersona,
            "Dedos": Dedos,
            "Name_User": Array_G_Usuario[0].Nombre,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            var Resultado = DowloadFile(result);
            if (Resultado = true) {
                Ejecutable = true;
                Mensaje_General("Cargar Archivo de Huella", "Ejecute el archivo descargado, este ejecutará el capturador de huellas, luego cargue el archivo *.fpt al servidor.", "W")
                $("#T_TitleTableFiles").css("display", "inline-table");
                $("#T_Files").css("display", "inline-table");
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
function transaccionAjax_RutasOperacion(State) {
    $.ajax({
        url: "HuellasAjax.aspx",
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
                RutaTemporal = "";
                RutaRelativa = ""
            }
            else {
                RutasOperacion = JSON.parse(result);
                for (item in RutasOperacion) {
                    if (RutasOperacion[item].TypeRuta == "F") {
                        RutaTemporal = RutasOperacion[item].RutaDocumentoTemporal;
                        RutaRelativa = RutasOperacion[item].RutaRelativaDocumento;
                        break;
                    }
                }
            }
        },
        error: function () {

        },
    });
}



/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_Huellas_Create(State) {

    var NameFiles = "";
    for (i in arrayNameFiles) {
        NameFiles = NameFiles + "," + arrayNameFiles[i];
    }
    NameFiles = NameFiles.substr(1);

    $.ajax({
        url: "HuellasAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "TypeDocument": $("#Select_Documento").val(),
            "Document": $("#TxtDoc").val(),
            "RutaTemporal": RutaTemporal,
            "NameArchivos": NameFiles,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "Ocurrió un error durante la transacción y no se realizó el ingreso de la nueva persona ni sus huellas. REcarga la página e intenta de nuevo.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Persona ya Existe!", "La persona que desea ingresar ya se encuentra registrada en el sistema de huellas. El formulario se reiniciará.", "W");
                    Clear();
                    break;

                case "Exito":
                    Mensaje_General("¡Persona Ingresada!", "Se ha registrado la información dactilar de " + namePersona + " correctamente.", "S");
                    Clear();
                    break;
            }
        },
        error: function () {
        }
    });
}

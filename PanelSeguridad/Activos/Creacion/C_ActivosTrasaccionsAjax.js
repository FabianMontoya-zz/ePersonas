/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          MATRICES DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MRTSTA(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'RUTA'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_RTSTA = [];
            }
            else {
                Matrix_RTSTA = JSON.parse(result);
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
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
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
function transaccionAjax_MPersonas(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Personas = [];
            }
            else {
                Matrix_Personas = JSON.parse(result);
                Charge_Combo_Persona(Matrix_Personas, "Select_Persona_R", "", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MSucursal(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'CIUDADES'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Sucursal = [];
            }
            else {
                Matrix_Sucursal = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MMoneda(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Moneda = [];
            }
            else {
                Matrix_Moneda = JSON.parse(result);
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda", "", "");
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MFasecolda(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Fasecolda = [];
            }
            else {
                Matrix_Fasecolda = JSON.parse(result);
            }
        },
        error: function () {
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MMarcaClase_F(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_MarcaClase_F = [];
            }
            else {
                Matrix_MarcaClase_F = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MLineaMarcaClase_F(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_LineaMarcaClase_F = [];
            }
            else {
                Matrix_LineaMarcaClase_F = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ListaClaseFasecolda(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Lista_Clase_F = [];
            }
            else {
                Lista_Clase_F = JSON.parse(result);
                Charge_Combos_Depend_Nit(Lista_Clase_F, "Select_ClaseF", "", "");
            }
        },
        error: function () {

        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          LISTAS DE CARGA                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
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

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Documento(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
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
                charge_CatalogList(ArrayTdoc, "Select_Documento_Blin", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Colores(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'IMPUESTO_GASTO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                var Colores = [];
            }
            else {
                var Colores = JSON.parse(result);
                charge_CatalogList(Colores, "Select_Color", 1);
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Tipo(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'TIPO'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                ArrayTipo = [];
            }
            else {
                ArrayTipo = JSON.parse(result);
                charge_CatalogList(ArrayTipo, "Select_Tipo", 1);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          CONSULTAS EN PROCESO                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeople(State, TD, D, NIT) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
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
                    Mensaje_General("No existe", "Los datos diligenciados No coinciden con las personas registradas en el sitema", "W");
                    $("#V_Responsable").html("");
                    break;

                default:
                    $("#V_Responsable").html(result);
                    break;
            }
        },
        error: function () {

        }
    });
}


/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          PETICIONES CRUD ACTIVOS                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Activos_create(State) {
    var Ref_1 = "";
    var Ref_2 = "";
    var Ref_3 = "";
    var STActivo = 0;
    var Pais_R = 0;
    var Ciudad_R = 0;
    var T_Doc_R = 0;
    var Doc_R = 0;
    var Valor_Bien = 0;
    var Val_Op_Compra = 0;
    var TipoEscritura = 0;
    var NunImobiliaria = "";
    var FechaC_Recibo = "";
    var FechaC_Retiro = "";

    switch (Tipo_Activo) {
        case 0:
            Ref_1 = $("#TxtRef_Other").val();
            break;

        case 1:
            if ($("#TxtRef_1").val() != "")
                Ref_1 = $("#TxtRef_1").val();

            if ($("#TxtRef_2").val() != "")
                Ref_2 = $("#TxtRef_2").val();

            if ($("#TxtRef_3").val() != "")
                Ref_3 = $("#TxtRef_3").val();
            break;

        case 2:
            Ref_1 = $("#TxtRef_Other").val();
            break;
    }

    if ($("#Select_SubTipo").val() != "-1")
        STActivo = $("#Select_SubTipo").val();

    if ($("#Select_Pais_R").val() != "-1")
        Pais_R = $("#Select_Pais_R").val();

    if ($("#Select_Ciudad_R").val() != "-1" || $("#Select_SubTipo").val() != null)
        Ciudad_R = $("#Select_Ciudad_R").val();

    if ($("#Select_Persona_R").val() != "-1") {
        var Str_C_R = $("#Select_Persona_R option:selected").html();
        var SplitCR = Str_C_R.split(" - ");
        T_Doc_R = SplitCR[1];
        Doc_R = SplitCR[0];
    }

    if ($("#TxtValor_Bien").val() != "")
        Valor_Bien = F_NumericBD($("#TxtValor_Bien").val());

    if ($("#TxtValor_Compra").val() != "")
        Val_Op_Compra = F_NumericBD($("#TxtValor_Compra").val());

    if ($("#Select_TipoEscritura").val() != "-1")
        TipoEscritura = $("#Select_TipoEscritura").val();

    if ($("#Txt_NunImobiliaria").val() != "-1")
        NunImobiliaria = $("#Txt_NunImobiliaria").val();

    if ($("#TxtFecha_Recibo").val() != "-1")
        FechaC_Recibo = $("#TxtFecha_Recibo").val();

    if ($("#TxtFecha_Retiro").val() != "-1")
        FechaC_Retiro = $("#TxtFecha_Retiro").val();

    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Ref_1": Ref_1,
            "Ref_2": Ref_2,
            "Ref_3": Ref_3,
            "Descripcion": $("#txtDescripcion").val(),
            "TActivo": $("#Select_Tipo").val(),
            "STActivo": STActivo,
            "Pais_U": $("#Select_Pais_U").val(),
            "Ciudad_U": $("#Select_Ciudad_U").val(),
            "Direccion_U ": $("#Txt_Adress_U").val(),
            "Pais_R": Pais_R,
            "Ciudad_R": Ciudad_R,
            "TDoc_R": T_Doc_R,
            "Doc_R": Doc_R,
            "Sucursal": $("#Select_Sucursal").val(),
            "Moneda": $("#Select_Moneda").val(),
            "Valor_Bien": Valor_Bien,
            "Val_Op_Compra": Val_Op_Compra,
            "CompraBien": $("#Select_CompraBien").val(),
            "Asegurado": $("#Select_Asegurado").val(),
            "EstadoActivo": 1,
            "TipoAdministracion": $("#Select_TipoAdmin").val(),
            "TipoEscritura": TipoEscritura,
            "NunImobiliaria": NunImobiliaria,
            "FechaC_Recibo": FechaC_Recibo,
            "FechaC_Retiro": FechaC_Retiro,
            "TDoc_T": $("#Select_Documento").val(),
            "Doc_T": $("#TxtDoc").val(),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizo el ingreso del Activo", "E");
                    break;

                case "Existe":
                    Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                    break;

                case "Exito":
                    Mensaje_General("Exito", "El Contrato fue creado exitosamente! ", "S");
                    //Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}


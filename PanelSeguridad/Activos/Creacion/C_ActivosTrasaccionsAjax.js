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

    var valida_process = ValidaCampos_InsertBD_Activos();

    if (valida_process == 0) {
        $.ajax({
            url: "C_ActivosAjax.aspx",
            type: "POST",
            //crear json
            data: {
                "action": State,
                "Nit_ID": $("#Select_EmpresaNit").val(),
                "Ref_1": Ref_1.toUpperCase(),
                "Ref_2": Ref_2.toUpperCase(),
                "Ref_3": Ref_3.toUpperCase(),
                "Descripcion": $("#txtDescripcion").val(),
                "TActivo": $("#Select_Tipo").val(),
                "STActivo": STActivo,
                "Pais_U": $("#Select_Pais_U").val(),
                "Ciudad_U": $("#Select_Ciudad_U").val(),
                "Direccion_U": $("#Txt_Adress_U").val(),
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
                "NunImobiliaria": NunImobiliaria.toUpperCase(),
                "FechaC_Recibo": FechaC_Recibo,
                "FechaC_Retiro": FechaC_Retiro,
                "TDoc_T": $("#Select_Documento").val(),
                "Doc_T": $("#TxtDoc").val(),
                "user": User.toUpperCase()
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
                        Mensaje_General("Exito", "El Activo fue creado exitosamente! ", "S");
                        //Clear();
                        break;
                }

            },
            error: function () {

            }
        });
    }
}

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Vehiculos_create(State) {

    var ValorChasis = 0;
    var Pasajeros = 0;
    var Potencia = 0;
    var TDoc_Blin = 0;
    var Doc_Blin = 0;
    var Nivel_Blin = 0;

    if ($("#TxtValor_Chasis").val() != "")
        ValorChasis = F_NumericBD($("#TxtValor_Chasis").val());

    if ($("#Txt_NPasajeros").val() != "")
        Pasajeros = $("#Txt_NPasajeros").val();

    if ($("#Txt_Potencia").val() != "")
        Potencia = $("#Txt_Potencia").val();

    if ($("#Select_Documento_Blin").val() != "-1")
        TDoc_Blin = $("#Select_Documento_Blin").val();

    if ($("#TxtDoc_Blin").val() != "-1")
        Doc_Blin = $("#TxtDoc_Blin").val();

    if ($("#Txt_Nivel_Blin").val() != "")
        Nivel_Blin = $("#Txt_Nivel_Blin").val();

    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Ref_1": $("#TxtRef_Other").val().toUpperCase(),
            "Ref_2": "",
            "Ref_3": "",
            "Facecolda_ID": $("#TxtFasecolda_ID").val(),
            "Modelo": $("#Select_modelo option:selected").html(),
            "Clase": $("#Select_ClaseF").val(),
            "Marca": $("#Select_MarcaF").val(),
            "Linea": $("#Select_LineaF").val(),
            "ValorComercial": F_NumericBD($("#V_Valor_F").html()),
            "Cilindraje": $("#Txt_Cilindraje").val(),
            "Motor": $("#TxtN_Motor").val(),
            "Chasis": $("#Txt_NChasis").val(),
            "ValorChasis": ValorChasis,
            "Serie": $("#Txt_NSerie").val(),
            "VIN": $("#Txt_NVIN").val(),
            "M_Servicio": $("#Select_MServicio").val(),
            "Pasajeros": Pasajeros,
            "TipoServicio": $("#Select_TServicio").val(),
            "Combustible": $("#Select_Combustible").val(),
            "Color": $("#Select_Color").val(),
            "Capacidad": $("#Txt_Capacidad").val(),
            "Potencia": Potencia,
            "Carroceria": $("#Txt_Carroceria").val(),
            "TipoCarroceria": $("#Txt_TCarroceria").val(),
            "Blindaje": $("#Select_Blindaje").val(),
            "TDoc_Blin": TDoc_Blin,
            "Doc_Blin": Doc_Blin,
            "Nivel_Blin": Nivel_Blin,
            "GPS": $("#Text_NGPS").val(),
            "user": User.toUpperCase()
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
                    transacionAjax_C_Activos_create("crear");
                    //Clear();
                    break;
            }

        },
        error: function () {

        }
    });
}



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
    OpenControl();
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
                Charge_Combo_Persona(Matrix_Personas, "Select_Notaria_R", "", "");
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
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_F", "", "");
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

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Marca_F(State) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,

        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_Marca_F = [];
            }
            else {
                Array_Marca_F = JSON.parse(result);
                charge_CatalogList(Array_Marca_F, "Select_MarcaF", 1);

            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Clase_F(State, Index) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "index": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Array_Clase_F = [];
            }
            else {
                Array_Clase_F = JSON.parse(result);
                charge_CatalogList(Array_Clase_F, "Select_ClaseF", 1);

            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Linea_F(State, Marca, Index, Proccess) {

    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Marca": Marca,
            "index": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Linea_F = [];
            }
            else {
                Matrix_Linea_F = JSON.parse(result);
                Charge_Combos_Depend_Verificacion(Matrix_Linea_F, "Select_LineaF", "", "", "");
                if (Proccess == "ID") {
                    setTimeout("CargarValoresCombos();", 400);
                }
            }
        },
        error: function () {
        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Linea_F_ID(State, Index) {

    if (Index == "")
        Index = 0;

    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "index": Index
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Linea_F_ID = [];
            }
            else {
                Matrix_Linea_F_ID = JSON.parse(result);
                if (Matrix_Linea_F_ID.length == 0) {
                    Mensaje_General("No existe", "El codigo Fasecolda NO exite en el sitema", "W");
                }
                else {
                    Crear_Rango_modelo(Matrix_Linea_F_ID, "", "ID");
                }
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
function transacionAjax_ShearchPeople(State, TD, D, NIT, Vista, Variable) {
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
                    $("#" + Vista).html("------");
                    if (Variable == "Persona_Exist") {
                        Persona_Exist = false;
                    }
                    break;

                default:
                    $("#" + Vista).html(result);
                    if (Variable == "Persona_Exist") {
                        Persona_Exist = true;
                    }
                    break;
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consult_Factura_Existe(State, tabla, index_NIT_ID, Ref_1, Ref_2, Ref_3, Factura_ID) {
    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": tabla,
            "NIT": index_NIT_ID,
            "Ref1": Ref_1,
            "Ref2": Ref_2,
            "Ref3": Ref_3,
            "Factura_ID": Factura_ID
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == 0)
                Json_Facturas(Ref_1, Ref_2, Ref_3);
            else
                Mensaje_General("¡Factura Repetido!", "La factura que desea ingresar ya se encuentra registrado en el sistema.", "W");


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
                "TDoc_Not": TDoc_Not,
                "Doc_Not": Doc_Not,
                "Num_Poliza": Num_Poliza,
                "N_Notaria": N_Notaria,
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
                        Mensaje_General("Disculpenos :(", "No se realizo el Salida del Activo", "E");
                        break;

                    case "Existe":
                        Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                        break;

                    case "Exito":
                        if (Tipo_Activo != 2) {
                            Clear_Limpiar();
                            Clear_Consulta_Fasecolda();
                            Enable_Consult_Fasecolda();
                        }

                        if (ArrayFactura.length != 0) {
                            transacionAjax_C_Facturas_create("crear_Factura");
                        }

                        Mensaje_General("Exito", "El Activo fue creado exitosamente! ", "S");
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

    var valida_process = ValidaCampos_InsertBD_Vehiculos();

    if (valida_process == 0) {
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
                        Mensaje_General("Disculpenos :(", "No se realizo el Salida del Activo", "E");
                        break;

                    case "Existe":
                        Mensaje_General("Ya Existe", "El codigo ingresado ya existe en la base de datos!", "W");
                        break;

                    case "Exito":
                        transacionAjax_C_Activos_create("crear");
                        Clear_Limpiar();
                        Clear_Consulta_Fasecolda();
                        Enable_Consult_Fasecolda();
                        break;
                }

            },
            error: function () {

            }
        });
    }
}

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Facturas_create(State) {

    ListFactura = JSON.stringify(ArrayFactura);

    $.ajax({
        url: "C_ActivosAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "ListFacturas": ListFactura,
            "user": User.toUpperCase()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error_Factura":
                    Mensaje_General("Disculpenos :(", "No se realizo el Salida de la factura", "E");
                    break;

                case "Exito":
                    Clear_Factura();
                    ArrayFactura = [];
                    Tabla_factura();
                    break;
            }

        },
        error: function () {

        }
    });
}

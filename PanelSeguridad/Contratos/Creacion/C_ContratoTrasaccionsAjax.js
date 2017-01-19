
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
    OpenControl();
    $.ajax({
        url: "C_ContratoAjax.aspx",
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
function transaccionAjax_MSucursal(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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

        },
        async: false, // La petición es síncrona
        cache: false // No queremos usar la caché del navegador
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_MMoneda(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_C", "", "");
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda", "", ""); //Activos
                Charge_Combos_Depend_Nit(Matrix_Moneda, "Select_Moneda_F", "", ""); //Facturas
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
        url: "C_ContratoAjax.aspx",
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
                charge_CatalogList(ArrayTdoc, "Select_Documento", 1); //Activos
                charge_CatalogList(ArrayTdoc, "Select_Documento_C", 1);
                charge_CatalogList(ArrayTdoc, "Select_Documento_C2", 1);
                charge_CatalogList(ArrayTdoc, "Select_Documento_Blin", 1);
            }
        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_ShearchPeople(State, TD, D, NIT, Vista, Variable) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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
                    Mensaje_General("¡Datos Inexistentes!", "La persona que desea relacionar no está inscrita en el sistema. Por favor revisar los datos.", "W");
                    $("#" + Vista).html("------");
                    if (Variable == "Persona1") {
                        Persona1 = false;
                    } else if (Variable == "Persona2") {
                        Persona2 = false;
                    } else if (Variable == "Persona_A") {
                        Persona_A = false;
                    }
                    break;

                default:
                    $("#" + Vista).html(result);
                    namePersona = result;
                    if (Variable == "Persona1") {
                        Persona1 = true;
                    } else if (Variable == "Persona2") {
                        Persona2 = true;
                    } else if (Variable == "Persona_A") {
                        Persona_A = true;
                    }
                    ;
                    break;
            }
        },
        error: function () {

        }
    });
}

//*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Productos(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Producto'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Productos = [];
            }
            else {
                Matrix_Productos = JSON.parse(result);
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
function transacionAjax_Financiacion(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Financiacion'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Financiacion = [];
            }
            else {
                Matrix_Financiacion = JSON.parse(result);
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
function transaccionAjax_MCiclo(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Ciclo'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Ciclo = [];
            }
            else {
                Matrix_Ciclo = JSON.parse(result);
                Charge_Combos_Depend_Nit(Matrix_Ciclo, "Select_Ciclo", "", "");
                Charge_Combos_Depend_Nit(Matrix_Ciclo, "Select_Ciclo_2", "", "");

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
function transaccionAjax_MDirecciones(State, TD, D, NIT) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Direcciones',
            "TD": TD,
            "D": D,
            "NIT": NIT,
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Direcciones = [];
            }
            else {
                Matrix_Direcciones = JSON.parse(result);
                Charge_Combo_Persona(Matrix_Direcciones, "Select_Direccion", "", "");
            }
        },
        error: function () {

        }
    });
}

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MTasas(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "tabla": 'Tasas'
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == "") {
                Matrix_Tasas = [];
            }
            else {
                Matrix_Tasas = JSON.parse(result);
            }
        },
        error: function () {

        }
    });
}

/*------------------------------ crear ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Contrato_create(State) {

    OpenControl();
    var Mensaje = "La colocación se ha agregado correctamente junto con sus adicionales";
    var caso;
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Sucursal": $("#Select_Sucursal_C").val(),
            "Colocacion": $("#TXT_ID_Colocacion").val(),
            "Descripcion": $("#TXT_Descripcion").val(),
            "TypeDocument": $("#Select_Documento_C").val(),
            "Document": $("#TxtDoc_C").val(),
            "Moneda": $("#Select_Moneda_C").val(),
            "Producto": $("#Select_Producto").val(),
            "CondicionFinanciacion": $("#Select_Condicion_Financiacion").val(),
            "UnidadTiempo": $("#Select_Tiempo").val(),
            "FechaApertura": $("#TXT_Fecha_Apertura").val(),
            "Plazo": $("#TXT_Plazo").val(),
            "Ciclo": $("#Select_Ciclo").val(),
            "BaseCalculo": $("#Select_Base_Calculo").val(),
            "Direccion": $("#Select_Direccion").val(),
            "Total": TotalActivosBD, //Se hace la suma de lo digitado y la suma de activos en el C_Contrato.js BtnCrear
            "Financiado": F_NumericBD($("#TXT_Valor_Financiado").val()),
            "OpcionCompra": F_NumericBD($("#TXT_Valor_Opcion_Compra").val()),
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de la nueva colocación.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Código Repetido!", "El código ingresado ya se encuentra registrado en la Base de Datos.", "W");
                    break;

                case "Exito":
                    if (ArrayTerceros.length > 0 || ArrayActivos.length > 0 || ArrayVehiculos.length > 0 || ArrayFactura.length > 0) {

                        if (ArrayTerceros.length > 0) {
                            transacionAjax_C_Terceros_create("CrearTercero");
                            Mensaje = Mensaje + " [Terceros]";
                            ArrayTerceros = [];
                        } else {
                        }

                        if (ArrayActivos.length > 0) {
                            transacionAjax_C_Activos_create("CrearActivo");
                            Mensaje = Mensaje + " [Activos]";
                            ArrayActivos = [];
                        } else {
                        }

                        if (ArrayVehiculos.length > 0) {
                            transacionAjax_C_Activos_Vehiculos_Create("CrearVehiculo");
                            Mensaje = Mensaje + " [Activos - Vehículos]";
                            ArrayVehiculos = [];
                        } else {
                        }

                        if (ArrayTodasFacturas.length > 0) {
                            transacionAjax_C_Facturas_create("crear_Factura");
                            Mensaje = Mensaje + " [Activos - Facturas]";

                        } else {
                        }
                        caso = "B";

                    } else {
                        caso = "A";
                    }
                    break;
            }


        },
        error: function () {

        }
    }).done(function () {
        switch (caso) {
            case "A":
                Mensaje_General("¡Colocación Agregada!", "La colocación se ha agregado correctamente.", "S");
                Clear();
                break;
            case "B":
                Mensaje_General("¡Colocación Agregada!", Mensaje, "S");
                Clear();
                break;
        }
    });
}

var listTerceros = [];

function transacionAjax_C_Terceros_create(State) {


    //recorer array para el ingreso de los documentos hijos
    listTerceros = JSON.stringify(ArrayTerceros);

    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Contrato_ID": $("#TXT_ID_Colocacion").val(),
            "listTerceros": listTerceros,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de los Terceros.", "E");
                    break;

                case "Existe":
                    Mensaje_General("¡Código Repetido! - Terceros", "El código ingresado ya se encuentra registrado en la Base de Datos.", "W");
                    break;

                case "Exito":
                    break;
            }

        },
        error: function () {

        }
    });

}

var ListActivos = [];
var ListVehiculos = [];

function transacionAjax_C_Activos_create(State) {


    //recorer array para el ingreso de los documentos hijos
    ListActivos = JSON.stringify(ArrayActivos);
    ListVehiculos = JSON.stringify(ArrayVehiculos);

    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Contrato_ID": $("#TXT_ID_Colocacion").val(),
            "ListActivos": ListActivos,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de los Activos.", "E");
                    console.error("No se realizó el ingreso de los Activos.");
                    break;

                case "Existe":
                    Mensaje_General("¡Código Repetido! - Activos", "El código ingresado ya se encuentra registrado en la Base de Datos.", "W");
                    console.warn("El código ingresado para Activos ya se encuentra registrado en la Base de Datos.");
                    break;

                case "Exito":
                    break;
            }

        },
        error: function () {

        }
    });

}

function transacionAjax_C_Activos_Vehiculos_Create(State) {


    //recorer array para el ingreso de los documentos hijos
    ListVehiculos = JSON.stringify(ArrayVehiculos);

    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "Nit_ID": $("#Select_EmpresaNit").val(),
            "Contrato_ID": $("#TXT_ID_Colocacion").val(),
            "ListVehiculos": ListVehiculos,
            "user": User
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            switch (result) {

                case "Error":
                    Mensaje_General("Disculpenos :(", "No se realizó el ingreso de los Vehículos.", "E");
                    console.error("No se realizó el ingreso de los Vehículos.");
                    break;

                case "Existe":
                    Mensaje_General("¡Código Repetido! - Vehículo", "El código ingresado ya se encuentra registrado en la Base de Datos.", "W");
                    console.warn("El código ingresado para vehículo ya se encuentra registrado en la Base de Datos.");
                    break;

                case "Exito":
                    break;
            }

        },
        error: function () {

        }
    });

}

var ListFactura = [];

//hacemos la transaccion al code behind por medio de Ajax
function transacionAjax_C_Facturas_create(State) {

    for (itemArray in ArrayTodasFacturas) {

        ListFactura = JSON.stringify(ArrayTodasFacturas[itemArray]);

        $.ajax({
            url: "C_ContratoAjax.aspx",
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
                        Mensaje_General("Disculpenos :(", "No se realizo el ingreso de la factura", "E");
                        break;

                    case "Exito":
                        break;
                }

            },
            error: function () {

            }
        });
    }
}

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----                                                                          MATRICES DE CARGA ACTIVOS                                                                                                                ----*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPersonas(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MRTSTA(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transaccionAjax_MPaises_Ciudades(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Marca_F(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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
        url: "C_ContratoAjax.aspx",
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
        url: "C_ContratoAjax.aspx",
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
                    setTimeout("CargarValoresCombos();", 300);
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
        url: "C_ContratoAjax.aspx",
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

/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Colores(State) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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
        url: "C_ContratoAjax.aspx",
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

//Hace la consulta para ver si el Activo que se desea crear ya existe en la BD, Si no lo agrega al array mediante un JSON
function transacionAjax_Consult_Activos_existe(State, index_NIT_ID, Ref_1, Ref_2, Ref_3) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
        type: "POST",
        //crear json
        data: {
            "action": State,
            "NIT": index_NIT_ID,
            "Ref1": Ref_1.toUpperCase(),
            "Ref2": Ref_2.toUpperCase(),
            "Ref3": Ref_3.toUpperCase(),
            "Ref_other": $("#TxtRef_Other").val().toUpperCase(),
            "Tipo": $("#Select_Tipo").val()
        },
        //Transaccion Ajax en proceso
        success: function (result) {
            if (result == 0) {
                var json_A = JsonActivos();
                if (json_A == 0) {
                    if ($("#Select_Tipo").val() == 2) {
                        var json_V = JsonVehiculos();

                        if (json_V == 0) {
                            Mensaje_General("¡Activo Agregado - Vehículo!", "Se ha agregado el Activo correctamente.", "S");
                            if (ArrayFactura.length > 0) {
                                ArrayTodasFacturas.push(ArrayFactura);
                            }
                            Clear_Limpiar(); /*C_Contrato_activos.js*/
                            Clear_Consulta_Fasecolda(); /*C_Contrato_activos.js*/
                        } else {
                            Mensaje_General("¡Error Vehículo!", "Lo sentimos, se produjo un error al guardar el nuevo vehículo. Para mayor información revisar el log (F12 - Console).", "E");
                        }

                    } else {
                        Mensaje_General("¡Activo Agregado!", "Se ha agregado el Activo correctamente.", "S");
                        if (ArrayFactura.length > 0) {
                            ArrayTodasFacturas.push(ArrayFactura);
                        }
                        Clear_Limpiar(); /*C_Contrato_activos.js*/
                        Clear_Consulta_Fasecolda(); /*C_Contrato_activos.js*/
                    }
                } else if (json_A == 2) {
                    Mensaje_General("¡Activo Existente!", "El activo que desea agregar ya se encuentra en la lista de la colocación, no puedes ingresar dos veces el mismo Activo.", "W");
                    var C_R1 = $("#TxtRef_1").val();
                    var C_R2 = $("#TxtRef_2").val();
                    var C_R3 = $("#TxtRef_3").val();
                    //--
                    if (C_R1.length > 0) {
                        $("#K_1").css("display", "inline-table");
                    } else {
                        $("#K_1").css("display", "none");
                    }
                    //--
                    if (C_R2.length > 0) {
                        $("#K_2").css("display", "inline-table");
                    } else {
                        $("#K_2").css("display", "none");
                    }
                    //--
                    if (C_R3.length > 0) {
                        $("#K_3").css("display", "inline-table");
                    } else {
                        $("#K_3").css("display", "none");
                    }
                    //--
                }
                else {
                    Mensaje_General("¡Error Activo!", "Lo sentimos, se produjo un error al guardar el nuevo activo.  Para mayor información revisar el log (F12 - Console).", "E");
                }
            } else {
                Mensaje_General("¡Activo Repetido!", "El activo que desea ingresar ya se encuentra registrado en el sistema.", "W");
            }

        },
        error: function () {

        }
    });
}

//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_Consult_Factura_Existe(State, tabla, index_NIT_ID, Ref_1, Ref_2, Ref_3, Factura_ID) {
    $.ajax({
        url: "C_ContratoAjax.aspx",
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

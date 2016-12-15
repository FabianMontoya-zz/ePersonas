
/*-------------------- carga ---------------------------*/
//hacemos la transaccion al code behind por medio de Ajax para cargar el droplist
function transacionAjax_EmpresaNit(State) {
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

        }
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

        }
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
                    }
                    break;

                default:                    
                    $("#" + Vista).html(result);
                    namePersona = result;
                    if (Variable == "Persona1") {
                        Persona1 = true;
                    } else if (Variable == "Persona2") {
                        Persona2 = true;
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

        }
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

        }
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

        }
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
            "Total": F_NumericBD($("#TXT_Valor_Total").val()), //Falta validar la suma de Activos y el total digitado
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
                    if (ArrayTerceros.length > 0) {
                        transacionAjax_C_Terceros_create("CrearTercero");
                    }
                    else {
                        Mensaje_General("¡Colocación Agregada!", "La colocación se ha agregado correctamente.", "S");
                        Clear();
                    }
                    break;
            }

        },
        error: function () {

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
            "listTerceros":listTerceros,
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
                    Mensaje_General("¡Terceros Agregados!", "La colocación se ha agregado correctamente.", "S");
                    Clear();
                    break;
            }

        },
        error: function () {

        }
    });

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
function transacionAjax_MFasecolda(State) {
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
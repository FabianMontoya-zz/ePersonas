/*Se generan todas las clases JSON que se utilizan en el Modulo*/

function Json_Terceros() {

    var valido = false;

    var validaRepetido = ConsultaRepetido();
    switch (validaRepetido) {
        case 0:
            var STRTypeDocumento = $("#Select_Documento_C2 option:selected").html();
            var STRTypeRelation = $("#Select_Relacion option:selected").html();
            var JSON_terceros = {
                "TypeDocument_ID": $("#Select_Documento_C2").val(),
                "Document_ID": $("#TxtDoc_C2").val(),
                "Descrip_Persona": namePersona,
                "TypeRelation": $("#Select_Relacion").val(),
                "Descrip_TypeDocumento": STRTypeDocumento,
                "Descrip_TypeRelation": STRTypeRelation,
                "Index": ContTerceros
            }
            ArrayTerceros.push(JSON_terceros);
            ContTerceros = ContTerceros + 1;
            valido = true;
            AddArrayTercerosToTable(); /*C_Contrato.js*/
            break;

        case 1:
            Mensaje_General("¡Persona Repetida!", "La persona ya se encuentra relacionada, no puede relacionar dos veces a la misma persona.", "W");
            break;

    }

    return valido;
}

function JsonActivos() {
    var valido = 0;
      
    var validacion = ValidaCampos_InsertBD_Activos();

    if (validacion == 0) {
        var Valido_Array = ValidarActivoArray(Ref_1.toUpperCase(), Ref_2.toUpperCase(), Ref_3.toUpperCase()); /*C_Contrato_Activos_Validacion.js*/
        if (Valido_Array == true) {
            try {

                var STRtActivo = $("#Select_Tipo option:selected").html();

                var JSON_Activos = {
                    "Ref_1": Ref_1.toUpperCase(),
                    "Ref_2": Ref_2.toUpperCase(),
                    "Ref_3": Ref_3.toUpperCase(),
                    "Descripcion": $("#txtDescripcion").val(),
                    "TA_ID": $("#Select_Tipo").val(),
                    "STA_ID": STActivo,
                    "Cod_Pais_U": $("#Select_Pais_U").val(),
                    "Ciudad_ID_U": $("#Select_Ciudad_U").val(),
                    "Direccion_U": $("#Txt_Adress_U").val(),
                    "Cod_Pais_R": Pais_R,
                    "Ciudad_ID_R": Ciudad_R,
                    "TypeDocument_ID_R": T_Doc_R,
                    "Document_ID_R": Doc_R,
                    "Surcursal_ID": $("#Select_Sucursal").val(),
                    "Cod_Moneda_ID": $("#Select_Moneda").val(),
                    "Valor_Bien": Valor_Bien,
                    "Val_Op_Compra": Val_Op_Compra,
                    "CompraBien": $("#Select_CompraBien").val(),
                    "Asegurado": $("#Select_Asegurado").val(),
                    "EstadoActivo": 1,
                    "TipoAdministracion": $("#Select_TipoAdmin").val(),
                    "TipoEscritura": TipoEscritura,
                    "N_Escritura": NunImobiliaria.toUpperCase(),
                    "TypeDocument_ID_Not": TDoc_Not,
                    "Document_ID_Not": Doc_Not,
                    "Num_Poliza": Num_Poliza,
                    "N_Notaria": N_Notaria,
                    "FechaConta_Recibo": FechaC_Recibo,
                    "FechaConta_Retiro": FechaC_Retiro,
                    "TypeDocument_ID_T": $("#Select_Documento").val(),
                    "Document_ID_T": $("#TxtDoc").val(),
                    "Index_A": ContActivos,
                    "Descrip_TActivos": STRtActivo,
                    "user": User.toUpperCase()
                }
                ArrayActivos.push(JSON_Activos);
                ContActivos = ContActivos + 1;
                AddArrayActivosToTable(); /*C_Contrato.js*/
                SumarValores(Valor_Bien, "L_Total_Activos") /*C_Contrato.js*/
            } catch (ex) {
                valido = 1;
                console.error("Error JSON Activos: " + ex);
            }

        } else {
            valido = 2;
            //Else de Valido_Array, El error se muestra en la Transacción Ajax
        }
    } else {        
        //Else de Validacion [No muestra error ya que se usa para llenar los datos que se insertan en BD
    }

    return valido;
}

function JsonVehiculos() {
    var valido = 0;

    var validacion = ValidaCampos_InsertBD_Vehiculos();

    if (validacion == 0) {

        try {
            var JSON_Vehiculos = {
                "Ref_1": $("#TxtRef_Other").val().toUpperCase(),
                "Ref_2": "",
                "Ref_3": "",
                "Fasecolda_ID": $("#TxtFasecolda_ID").val(),
                "Modelo": $("#Select_modelo option:selected").html(),
                "Clase": $("#Select_ClaseF").val(),
                "Marca": $("#Select_MarcaF").val(),
                "Linea": $("#Select_LineaF").val(),
                "ValorComer": F_NumericBD($("#V_Valor_F").html()),
                "Cilindraje": $("#Txt_Cilindraje").val(),
                "N_Motor": $("#TxtN_Motor").val(),
                "N_Chasis": $("#Txt_NChasis").val(),
                "ValorChasis": ValorChasis,
                "N_Serie": $("#Txt_NSerie").val(),
                "N_VIN": $("#Txt_NVIN").val(),
                "Modalidad_Servicio": $("#Select_MServicio").val(),
                "N_Pasajeros": Pasajeros,
                "TipoServicio": $("#Select_TServicio").val(),
                "Combustible": $("#Select_Combustible").val(),
                "Colores_ID": $("#Select_Color").val(),
                "Capacidad": $("#Txt_Capacidad").val(),
                "Potencia": Potencia,
                "Carroceria": $("#Txt_Carroceria").val(),
                "TipoCarroceria": $("#Txt_TCarroceria").val(),
                "Blindaje": $("#Select_Blindaje").val(),
                "N_TypeDocument_ID_Blind": TDoc_Blin,
                "N_Document_ID_Blind": Doc_Blin,
                "Nivel_Blin": Nivel_Blin,
                "N_GPS": $("#Text_NGPS").val(),
                "Index_A": ContActivos,
                "user": User.toUpperCase()
            }
            ArrayVehiculos.push(JSON_Vehiculos);
        } catch (ex) {
            valido = 1;
            console.error("Error JSON Vehículos: " + ex);
        }
    } else {
    }
    return valido;
}

//contruye JSON de facturas
function Json_Facturas(Ref_1, Ref_2, Ref_3) {

    var valido = 0;
    try {
        var Flag_rep_Array = Revisar_repetido(Ref_1, Ref_2, Ref_3);

        if (Flag_rep_Array == 0) {
            var JSON_Factura = {
                "Nit_ID": $("#Select_EmpresaNit").val(),
                "Ref_1": Ref_1.toUpperCase(),
                "Ref_2": Ref_2.toUpperCase(),
                "Ref_3": Ref_3.toUpperCase(),
                "Fact_Oct_ID": $("#Factura_ID").val().toUpperCase(),
                "F_Fecha": $("#Txt_Fecha_fact").val(),
                "Cod_Moneda_ID": $("#Select_Moneda").val(),
                "Valor_Sin_IVA": F_NumericBD($("#Text_Val_Sin_IVA").val()),
                "Valor_IVA": F_NumericBD($("#V_Val_IVA").html()),
                "Valor_Total": F_NumericBD($("#Txt_ValFactura").val()),
                "Index": ContFactura,
                "DescripMoneda": $("#Select_Moneda option:selected").html(),
                "UsuarioCreacion": User.toUpperCase()
            }
            ArrayFactura.push(JSON_Factura);
            Valor_Operativo = F_NumericBD($("#Txt_ValFactura").val());
            SumarValores_Grid(F_NumericBD($("#Txt_ValFactura").val()), Suma_Valor_Inicial, "V_TFacturas");

            ContFactura = ContFactura + 1;
            Tabla_factura();
            Clear_Factura();
        }
        else
            Mensaje_General("¡Factura Repetida!", "La Factura ya fue ingresada en la lista.", "W");

    } catch (ex) {
        valido = 1;
        console.error("Error JSON Facturas: " + ex);
    }
    return valido;

}
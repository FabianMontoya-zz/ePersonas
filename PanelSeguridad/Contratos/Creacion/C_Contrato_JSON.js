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
            AddArrayToTable();
            break;

        case 1:
            Mensaje_General("¡Persona Repetida!", "La persona ya se encuentra relacionada, no puede relacionar dos veces a la misma persona.", "W");
            break;

    }

    return valido;
}
function JsonActivos() {
    var valido = 0;
    try {
        var JSON_Activos = {
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
            "Index_A": ContActivos,
            "user": User.toUpperCase()
        }
        ArrayActivos.push(JSON_Activos);
        ContActivos = ContActivos + 1;
        //AddArray_AToTable();
    } catch (ex) {
        valido = 1;
        console.error("Error JSON Activos: " + ex);
    }
    return valido;
}

function JsonVehiculos() {
    var valido = 0;
    try {
        var JSON_Vehiculos = {
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
            "Index_A": ContActivos,
            "user": User.toUpperCase()
        }
        ArrayVehiculos.push(JSON_Vehiculos);
    } catch (ex) {
        valido = 1;
        console.error("Error JSON Vehículos: " + ex);
    }
    return valido;
}
//buscar datos del cliene de este impuesto
function ShearCliente(Nit, TD, D) {

    ArrayClienteView = [];

    if (Nit == "Nit") {

        Nit = editCliente;
        TD = editTypeDocument;
        D = editDocument;
    }

    transacionAjax_Read_Cliente("Read_Cliente", Nit, TD, D);

}

// muestra el registro a ver
function VerCliente(index_Nit, index_TDocumento, index_Documento) {

    D_Nit = index_Nit;
    D_TDocumento = index_TDocumento;
    D_Documento = index_Documento;

    for (itemArray in ArrayClienteView) {
        if (index_Nit == ArrayClienteView[itemArray].Nit_ID && index_TDocumento == ArrayClienteView[itemArray].TypeDocument_ID && index_Documento == ArrayClienteView[itemArray].Document_ID) {

            var StrCiudad = ArrayClienteView[itemArray].DescripCiudad;
            var ArraySplit = StrCiudad.split("_");

            D_String_Contacto = ArrayClienteView[itemArray].Nombre;
            D_String_TDocumento = ArrayClienteView[itemArray].DescripTypeDocument;

            $("#V_Nit").html(ArrayClienteView[itemArray].Nit_ID + " - " + ArrayClienteView[itemArray].DescripEmpresa);
            $("#V_TDocumento").html(ArrayClienteView[itemArray].DescripTypeDocument);
            $("#V_Documento").html(ArrayClienteView[itemArray].Document_ID);
            $("#V_Digito").html(ArrayClienteView[itemArray].Digito_Verificacion);
            $("#V_Nombre").html(ArrayClienteView[itemArray].Nombre);
            $("#V_Municipio_2").html(StrCiudad.replace("_", " - "));

            $("#V_TipoP").html(ArrayClienteView[itemArray].DescripTipoPersona);
            $("#V_Regimen").html(ArrayClienteView[itemArray].DescripRegimen);

            $("#V_Op_Cliente").html(ArrayClienteView[itemArray].OP_Cliente);
            $("#V_Op_Avaluador").html(ArrayClienteView[itemArray].OP_Avaluador);
            $("#V_Op_Transito").html(ArrayClienteView[itemArray].OP_Transito);
            $("#V_Op_Hacienda").html(ArrayClienteView[itemArray].OP_Hacienda);
            $("#V_Op_Empresa").html(ArrayClienteView[itemArray].OP_Empresa);
            $("#V_Op_Empleado").html(ArrayClienteView[itemArray].OP_Empleado);
            $("#V_Op_Asesor").html(ArrayClienteView[itemArray].OP_Asesor);
            $("#V_Op_Otro_1").html(ArrayClienteView[itemArray].Other_1);

            $("#Dialog_VisualizaCliente").dialog("option", "title", "Cliente: " + ArrayClienteView[itemArray].Nombre);

        }
    }
    $("#Dialog_VisualizaCliente").dialog("open");
}

/*---------------------------------------------------------------------------------------------------------------*/
/*                                        GRID PRINCIPAL DE DIRECCIONES                                                                       */
/*---------------------------------------------------------------------------------------------------------------*/

//el llamado para insertar modificar o eliminar la direcciones
function Direcciones(Option_Adress) {
    $("#Dialog_Direcciones").dialog("open");
    $("#Dialog_Direcciones").dialog("option", "title", "Direcciones ");

    switch (Option_Adress) {
        case "Read":
            $("#Txt_Nit_V").val(D_Nit);
            $("#Txt_TypeIden_V").val(D_String_TDocumento);
            $("#Txt_Ident_V").val(D_Documento);
            $("#Txt_Nit_V_2").val(D_Nit);
            $("#Txt_TypeIden_V_2").val(D_String_TDocumento);
            $("#Txt_Ident_V_2").val(D_Documento);

            transacionAjax_allAdress('R_ead_Adress', D_Nit, D_TDocumento, D_Documento, Option_Adress);
            break;

    }

}

//grid con el boton eliminar
function Tabla_General(Opc_Link) {
    var html = "";
    var contador = 0;

    switch (Opc_Link) {
        case "Read":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones</th><th>Consecutivo</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;

        case "Default":
            html = "<table id='TDireccion' border='1' cellpadding='1' cellspacing='1'  style='width: 100%; margin-top: 20px;'><thead><tr><th>Opciones <span class='cssToolTip_ver'><img alt='Direc' class='AddDirec' onclick=\"AddDirecion()\" id='Crear' height='20px' width='20px' src='../../images/add.png' /><span>Agregar Nueva Dirección</span></span></th><th>Consecutivo</th><th>Nombre del contacto</th><th>Pagina Web</th><th>Dirección</th><th>Telefono 1</th><th>Telefono 2</th><th>Telefono 3</th><th>Telefono 4</th><th>Correo 1</th><th>Correo 2</th></tr></thead><tbody>";
            break;
    }

    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].TypeDoc_ID != "") {

            switch (Opc_Link) {
                case "Read":
                    if (estado == "eliminar")
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    else
                        html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;

                case "Default":
                    html += "<tr><td><select id='Select_" + ArrayDirecciones[itemArray].Consecutivo + "' class='Opciones' onchange=\"Select_Option(this,'" + ArrayDirecciones[itemArray].Consecutivo + "');\"><option value='S'>Seleccione...</option><option value='V'>Ver</option><option value='M'>Modificar</option><option value='R'>Retirar</option></select></td><td>" + ArrayDirecciones[itemArray].Consecutivo + "</td><td>" + ArrayDirecciones[itemArray].Contacto + "</td><td>" + ArrayDirecciones[itemArray].PaginaWeb + "</td><td>" + ArrayDirecciones[itemArray].Direccion + "</td><td>" + ArrayDirecciones[itemArray].Telefono_1 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_2 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_3 + "</td><td>" + ArrayDirecciones[itemArray].Telefono_4 + "</td><td>" + ArrayDirecciones[itemArray].Correo_1 + "</td><td>" + ArrayDirecciones[itemArray].Correo_2 + "</td></tr>";
                    break;
            }

        }
        contador += 1;
    }

    html += "</tbody></table>";
    $("#container_direccion").html("");
    $("#container_direccion").html(html);

    $(".AddDirec").click(function () {
    });

    $("#TDireccion").dataTable({
        "iDisplayLength": -1,
        "aaSorting": [[1, "asc"]],
        "bJQueryUI": true, "iDisplayLength": 1000,
        "bDestroy": true
    });
}

//selecciona que tipo de operacion desea con el registro seleccionado
function Select_Option(Select_control, Index_Adress) {
    var Select_Value = $(Select_control).val();

    switch (Select_Value) {

        case "V": //visualizar
            ReadDirecion(Index_Adress);
            Disabled_Direccion();
            break;

    }

}

//funcion que abre la ventana para la Actualizacion de direccion
function ReadDirecion(Direccion_Consecutivo) {

    $("#Dialog_C_R_U_D").dialog("open");
    $("#Dialog_C_R_U_D").dialog("option", "title", "Dirección  ");
    $("#TxtConsecutivo").val(Direccion_Consecutivo);
    $("#BtnAdd").attr("value", "Salir");

    Search_Adress(Direccion_Consecutivo);
}

//CIERRA LA VENTANA EMERGENTE
function ReadView_Adress() {
    $("#Dialog_C_R_U_D").dialog("close");
}

//busca los datos por el consecutivo seleccionado
function Search_Adress(Index_Adress) {

    for (itemArray in ArrayDirecciones) {
        if (ArrayDirecciones[itemArray].Consecutivo == Index_Adress) {

            $("#TxtContact").val(ArrayDirecciones[itemArray].Contacto)
            $("#TxtCorreo_1").val(ArrayDirecciones[itemArray].Correo_1)
            $("#TxtCorreo_2").val(ArrayDirecciones[itemArray].Correo_2)
            $("#TxtDireccion").val(ArrayDirecciones[itemArray].Direccion)
            $("#TxtWeb").val(ArrayDirecciones[itemArray].PaginaWeb)
            $("#TxtTel1").val(ArrayDirecciones[itemArray].Telefono_1)
            $("#TxtTel2").val(ArrayDirecciones[itemArray].Telefono_2)
            $("#TxtTel3").val(ArrayDirecciones[itemArray].Telefono_3)
            $("#TxtTel4").val(ArrayDirecciones[itemArray].Telefono_4)
        }
    }
}

//bloquear campos de direcciones
function Disabled_Direccion() {
    $("#TxtContact").attr("disabled", "disabled");
    $("#TxtCorreo_1").attr("disabled", "disabled");
    $("#TxtCorreo_2").attr("disabled", "disabled");
    $("#TxtDireccion").attr("disabled", "disabled");
    $("#TxtWeb").attr("disabled", "disabled");
    $("#TxtTel1").attr("disabled", "disabled");
    $("#TxtTel2").attr("disabled", "disabled");
    $("#TxtTel3").attr("disabled", "disabled");
    $("#TxtTel4").attr("disabled", "disabled");
    $("#Img15").css("display", "none");
    $("#Img16").css("display", "none");
    $("#Img13").css("display", "none");
    $("#Img14").css("display", "none");
}


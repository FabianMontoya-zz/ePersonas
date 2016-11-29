<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="C_Contrato.aspx.vb" Inherits="PanelSeguridad.C_Contrato" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="C_Contrato.js" type="text/javascript"></script>
    <script src="C_ContratoTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Dialog/datepicker.js" type="text/javascript"></script>
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
        .ui-widget
        {
            background: -webkit-linear-gradient(#e0e0e0, #dadada); /*For Safari 5.1 to 6.0 */
            background: -o-linear-gradient(#e0e0e0, #dadada); /* For Opera 11.1 to 12.0 */
            background: -moz-linear-gradient(#e0e0e0, #dadada); /* For Firefox 3.6 to 15 */
            background: linear-gradient(#e0e0e0, #dadada); /* Standard syntax (must be last)*/
            border: solid 1px #921919;
            border-radius: 5px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
        <table id="Tabla_Title_form">
            <tr>
                <td id="Title_form"></td>
                <td id="image_exit">
                    <span class="cssToolTip_Form_L">
                        <input id="BtnExit" type="button" value="X" onclick="btnSalir();" /><span class="Spam_AEXIT_MOD"></span></span>
                </td>
            </tr>
        </table>
    </div>

    <!--Dialog que contiene la pantalla de las colocaciones/contratos -->
    <div id="Marco_Contrato">
        <div id="Marco_trabajo_Contrato">
            <div id="Acordeon_Contrato" style="width: 100%">
                <h3>Captura Colocación
                </h3>
                <div id="Div_Captura_Colocacion">
                    <table id="T_Encabezado" style="width: 100%;" border="1">
                        <tr>
                            <td id="TD_ID" style="width: 6.7%;" class="Label_Bold">NIT Empresa</td>
                            <td id="TD_TID" style="width: 20%;">
                                <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 40%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Datos_Colocacion" style="width: 100%;" border="1">
                        <tr>
                            <td class="Label_Bold" style="width: 10%;">Número Colocación
                            </td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input style="width: 100%;" type="text" id="TXT_ID_Colocacion" maxlength="17" class="Numeric_letter" />
                                    <span class="Spam_ANL"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 12%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 8%;">Descripción
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input style="width: 100%;" type="text" id="TXT_Descripcion" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>

                    </table>
                    <table id="T_Datos_Identificacion" style="width: 100%;" border="1">
                        <tr>
                            <td class="Label_Bold" style="width: 10%;">Tipo de Identificación
                            </td>
                            <td style="width: 21%;">
                                <select style="width: 100%;" id="Select_Identificacion" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 8%;" >Número de Identificación
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input style="width: 75%;" type="text" id="TXT_Identificacion" maxlength="17" class="Numeric" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Sucursal" style="width: 100%;" border="1">
                        <tr>
                            <td style="width: 10%;" class="Label_Bold">Sucursal
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Sucursal" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Moneda" style="width: 100%;" border="1">
                        <tr>
                            <td style="width: 10%;" class="Label_Bold">Moneda
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Moneda" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Producto_Condiciones" style="width: 100%;" border="1">
                        <tr>
                            <td class="Label_Bold" style="width: 10%;">Producto
                            </td>
                            <td>
                                <select id="Select_Producto" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 8%;">Condición de Financiación
                            </td>
                            <td>
                                <select id="Select_Condicion_Financiacion" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Tiempos" style="width: 100%;" border="1">
                        <tr>
                            <td class="Label_Bold" id="Unidad_De_Tiempo" style="width: 7%;">Unidad de Tiempo</td>
                            <td style="width: 15%;">
                                <select id="Select_Tiempo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 4%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" id="Fecha_Apertura" style="width: 7%;">Fecha Apertura </td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input id="TXT_Fecha_Apertura" type="text" readonly="readonly" style="width: 100%;" />
                                    <span class="Spam_AF"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 4%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" id="Plazo" style="width: 7%;">Plazo</td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Text_Plazo" maxlength="17" class="Numeric" style="width: 100%;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 4%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Ciclo_y_Base" style="width: 100%;" border="1">
                        <tr>
                            <td class="Label_Bold" style="width: 10%;">Ciclo
                            </td>
                            <td>
                                <select id="Select_Ciclo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img14"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 8%;">Base de Cálculo
                            </td>
                            <td>
                                <select id="Select_Base_Calculo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img15"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Correspondiente" style="width: 100%;" border="1">
                        <tr>
                            <td style="width: 20%;" class="Label_Bold">Dirección de Correspondencia
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Correspondencia" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img16"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Valores" style="width: 100%; padding-top: 5px; padding-bottom: 5px;" border="1">
                        <tr>
                            <td class="Title_Bold" colspan="6">Valor</td>
                        </tr>
                        <tr>
                            <td class="Label_Bold" style="width: 5%;">Total</td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TXT_Valor_Total" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                        onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 10%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img17"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 5%;">Financiado</td>
                            <td style="width: 15%;"><span class="cssToolTip_Form">
                                <input type="text" id="TXT_Valor_Financiado" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                    onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 10%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img18"
                                        src="../../images/error.png"/>
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 12%;">Opción de Compra</td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TXT_Valor_Opcion_Compra" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                        onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 10%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img19"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>                    
                </div>
                <h3>Condiciones Financieras
                </h3>
                <div id="Div_Condiciones_Financieras">
                    <table></table>
                </div>
                <h3>Añadir Activos
                </h3>
                <div id="Div_Estados">
                    <table id="T_Activo_Grid" border="1" cellpadding="1" cellspacing="1">
                        <thead>
                            <tr>
                                <th>
                                    <span class="cssToolTip_ver">
                                        <img alt="Activo" class="Add" onclick="javascript:Add_Activos();" id="Crear" height='20px'
                                            width='20px' src='../../images/add.png' /><span>Agregar Nuevo Activo</span></span>
                                </th>
                                <th>Identificación Activo
                                </th>
                                <th>Identificación Activo
                                </th>
                                <th>Identificación Activo
                                </th>
                                <th>Producto
                                </th>
                                <th>Moneda
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
        <div id="Div_BTN_Guardar" style="width: 100%; text-align: center; margin-top: 11px;">
            <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
        </div>
    </div>
    <div id="dialog" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td class="Label_Bold">
                    <p id="Mensaje_alert">
                    </p>
                </td>
                <td>
                    <img alt="error" id="DE" src="../../images/error_2.png" />
                    <img alt="success" id="SE" src="../../images/success.png" />
                    <img alt="Warning" id="WA" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnExitD" type="button" value="Salir" style="width: 40%;" onclick="x();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="dialog_eliminar" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold" id="P1">
                        Desea eliminar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning_2" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Activos">
        <div id="container_TActivos">
        </div>
    </div>

</asp:Content>



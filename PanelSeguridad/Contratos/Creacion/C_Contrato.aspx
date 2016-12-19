<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="C_Contrato.aspx.vb" Inherits="PanelSeguridad.C_Contrato" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="C_Contrato.js" type="text/javascript"></script>
    <script src="C_Contrato_Activos_Validacion.js" type="text/javascript"></script>
    <script src="C_Contrato_Activos.js" type="text/javascript"></script>
    <script src="C_Contrato_Activos_Complementos.js" type="text/javascript"></script>
    <script src="C_ContratoTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="C_Contrato_JSON.js" type="text/javascript"></script>
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
                    <table id="T_Encabezado" style="width: 100%;">
                        <tr>
                            <td id="TD_ID" style="width: 10.5%;" class="Label_Bold">NIT Empresa</td>
                            <td id="TD_TID" style="width: 47%;">
                                <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Sucursal" style="width: 100%;">
                        <tr>
                            <td style="width: 10.5%;" class="Label_Bold">Sucursal
                            </td>
                            <td style="width: 47%;">
                                <select id="Select_Sucursal_C" class="C_Chosen">
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
                    <table id="T_Datos_Colocacion" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.7%;">Número Colocación
                            </td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input style="width: 100%;" type="text" id="TXT_ID_Colocacion" maxlength="17" class="Numeric_letter" />
                                    <span class="Spam_ANL"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 21%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 10%;">Descripción
                            </td>
                            <td style="width: 35%;">
                                <span class="cssToolTip_Form">
                                    <input style="width: 100%;" type="text" id="TXT_Descripcion" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 15%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>

                    </table>
                    <table id="T_Datos_Identificacion" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Documento</td>
                            <td style="width: 47%;">
                                <select style="width: 100%;" id="Select_Documento_C" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD_C"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Persona" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.7%;">Identificación
                            </td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDoc_C" maxlength="18" class="Numeric" style="width: 100%;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 21%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D_C"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 10%;">Persona
                            </td>
                            <td id="V_Persona" style="width: 35%;" colspan="3"></td>
                            <td style="padding-bottom: 25px; width: 15%;"></td>
                        </tr>
                    </table>
                    <table id="T_Moneda" style="width: 100%;">
                        <tr>
                            <td style="width: 10.5%;" class="Label_Bold">Moneda
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Moneda_C" class="C_Chosen">
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
                    <table id="T_Producto_Condiciones" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Producto
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Producto" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6.5%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 10%;">Condición de Financiación
                            </td>
                            <td style="width: 36%;">
                                <select id="Select_Condicion_Financiacion" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 28%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Tiempos" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" id="Unidad_De_Tiempo" style="width: 10.5%;">Unidad de Tiempo</td>
                            <td style="width: 30%;">
                                <select id="Select_Tiempo" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="D">D - Diario</option>
                                    <option value="M">M - Mensual</option>
                                    <option value="S">S - Semestral</option>
                                    <option value="Y">Y - Anual</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6.5%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" id="Fecha_Apertura" style="width: 10%;">Fecha Apertura </td>
                            <td style="width: 10%;">
                                <span class="cssToolTip_Form">
                                    <input id="TXT_Fecha_Apertura" type="text" readonly="readonly" style="width: 100%;" />
                                    <span class="Spam_AF"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Plazo">
                        <tr>
                            <td class="Label_Bold" id="Plazo" style="width: 10.5%;">Plazo</td>
                            <td class="Label_Bold" id="L_Tiempo"></td>
                            <td style="width: 10%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TXT_Plazo" maxlength="17" class="Numeric" style="width: 100%;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 73%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Ciclo_y_Base" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Ciclo
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Ciclo" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 6.5%;">
                                <!--Campo no obligatorio, no utilizamos el mensaje de Erro -->
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img14"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 10%;">Base de Cálculo
                            </td>
                            <td style="width: 30%;">
                                <select id="Select_Base_Calculo" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">1 - 360/360</option>
                                    <option value="2">2 - 365/365</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 35%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img15"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Direccion_Correspondiente" style="width: 100%;">
                        <tr>
                            <td style="width: 10.5%;" class="Label_Bold">Dirección de Correspondencia
                            </td>
                            <td style="width: 80%;">
                                <select id="Select_Direccion" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 15px; width: 7%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img16"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Valores_1" style="width: 100%; padding-top: 5px; padding-bottom: 5px;">
                        <tr>
                            <td class="Title_Bold" colspan="6">Valor</td>
                        </tr>
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Total</td>
                            <td id="L_Moneda" class="Sigla" style="width: 7%"></td>
                            <td style="width: 13.5%;">
                                <span class="cssToolTip_Form_T">
                                    <input style="width: 100%;" type="text" id="TXT_Valor_Total" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                        onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 16%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img17"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span>
                                </span>
                            </td>
                            <td class="Label_Bold" style="width: 9%;">Total Activos</td>
                            <td id="L_Moneda_2" class="Sigla" style="width: 7%"></td>
                            <td id="L_Total_Activos" style="width: 50%;">[Total_Activos]</td>
                        </tr>
                    </table>
                    <table id="T_Valores_2" style="width: 100%">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Financiado</td>
                            <td id="L_Moneda_3" class="Sigla" style="width: 7%"></td>
                            <td style="width: 13.5%;">
                                <span class="cssToolTip_Form_T">
                                    <input style="width: 100%;" type="text" id="TXT_Valor_Financiado" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                        onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 16%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img18"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 9%;">Opción de Compra</td>
                            <td id="L_Moneda_4" class="Sigla" style="width: 7%"></td>
                            <td style="width: 13.5%;">
                                <span class="cssToolTip_Form_T">
                                    <input style="width: 100%;" type="text" id="TXT_Valor_Opcion_Compra" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                                        onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                    <span class="Spam_AVal"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 40%;">
                                <span class="cssToolTip">
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
                    <table id="T_Calculo_Pagos" style="width: 100%; padding-top: 5px; padding-bottom: 5px;">
                        <tr>
                            <td class="Label_Bold" style="width: 10%;">Total Cuota/Tasa</td>
                            <td id="L_Moneda_5" class="Sigla" style="width: 7%"></td>
                            <td id="L_Cuota_Tasa" style="width: 17%;">[00.000.0000]</td>

                            <td class="Label_Bold" style="width: 10%;">Modalidad Pago</td>
                            <td id="L_Modalidad_Pago" style="width: 17%;"></td>

                            <td class="Label_Bold" style="width: 10%;">Período Pago</td>
                            <td id="L_Tiempo_2" class="Label_Bold" style="width: 6%;"></td>
                            <td id="L_Periodo_Pago" style="width: 11%;"></td>

                        </tr>
                    </table>
                    <table id="T_Cuota_Base_Ciclo" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Tipo Cuota</td>
                            <td id="L_Tipo_Cuota" style="width: 24%;"></td>

                            <td class="Label_Bold" style="width: 10%;">Base Cálculo</td>
                            <td id="L_Base_Calculo" style="width: 17%;"></td>

                            <td class="Label_Bold" style="width: 10%;">Ciclo
                            </td>
                            <td style="width: 17%;">
                                <select id="Select_Ciclo_2" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 0.5%;"></td>
                        </tr>
                    </table>
                    <table id="T_Tasa_Puntos" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 7%;">Tasa</td>
                            <td id="L_Tasa" style="width: 16.5%;"></td>
                            <td class="Label_Bold" style="width: 7%;">Periodo</td>
                            <td id="L_Periodo" style="width: 11.5%;"></td>
                            <td class="Label_Bold" style="width: 7%;">Puntos Adicionales
                            </td>
                            <td style="width: 1%;">
                                <select id="Select_Signo_Puntos" class="C_Chosen">
                                    <option value="+">+</option>
                                    <option value="-">-</option>
                                </select>
                            </td>
                            <td style="width: 4%; padding-left: 10px;">
                                <span class="cssToolTip_Form">
                                    <input style="width: 100%;" type="text" id="TXT_Puntos_Adicionales" maxlength="7" class="Decimal" />
                                    <span class="Spam_ADec"></span></span>
                            </td>
                            <td style="width: 4.5%;"></td>
                        </tr>
                    </table>
                    <table id="T_Equivalencia_Nominal">
                        <tr>
                            <td class="Label_Bold" style="width: 11.5%;">Equivalencia Efectiva</td>
                            <td id="L_Equivalencia_Efectiva" class="Label_Bold" style="width: 10%;"></td>
                            <td style="padding-bottom: 25px; width: 26%;"></td>

                            <td class="Label_Bold" style="width: 10.2%;">Nominal Anual</td>
                            <td id="L_Nominal_Actual" class="Label_Bold" style="width: 15%;"></td>
                            <td style="padding-bottom: 25px; width: 40%;"></td>
                        </tr>
                    </table>
                    <table id="T_Tasas" style="width: 100%">
                        <tr>
                            <td class="Label_Bold" style="width: 11.5%;">Tasa de Mora</td>
                            <td id="L_Tasa_Mora" class="Label_Bold" style="width: 10%;"></td>
                            <td style="padding-bottom: 25px; width: 26%;"></td>

                            <td class="Label_Bold" style="width: 10.2%;">Tasa de Usura</td>
                            <td id="L_Tasa_Usura" class="Label_Bold" style="width: 15%;"></td>
                            <td style="padding-bottom: 25px; width: 40%;"></td>
                        </tr>
                    </table>
                </div>
                <h3>Añadir Activos
                </h3>
                <div id="Container_Activos">
                    <table id="T_Activo_Grid" border="1" cellpadding="1" cellspacing="1">
                        <thead>
                            <tr>
                                <th>
                                    <span class="cssToolTip_ver">
                                        <img alt="Activo" class="Add" onclick="javascript:ValidarIDColocacion_A();" id="Crear_Activo" height='20px'
                                            width='20px' src='../../images/add.png' /><span>Agregar Nuevo Activo</span></span>
                                </th>
                                <th>Descripción
                                </th>
                                <th>Referencia 1
                                </th>
                                <th>Referencia 2
                                </th>
                                <th>Referencia 3
                                </th>
                                <th>Tipo de Activo
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

                <h3>Añadir Terceros
                </h3>
                <div id="Div_Terceros">
                    <div id="Container_Terceros">
                        <table id="T_Terceros" border="1" cellpadding="1" cellspacing="1">
                            <thead>
                                <tr>
                                    <th>
                                        <span class="cssToolTip_ver">
                                            <img alt="Activo" class="Add" onclick="javascript:ValidarIDColocacion_T();" id="Crear_Terceros" height='20px'
                                                width='20px' src='../../images/add.png' /><span>Agregar Persona</span></span>
                                    </th>
                                    <th>Tipo Documento
                                    </th>
                                    <th>Identificación
                                    </th>
                                    <th>Nombre
                                    </th>
                                    <th>Tipo de relación
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                        Pulse Confirmar para eliminar el registro seleccionado.
                    </p>
                </td>
                <td>
                    <img alt="Warning_2" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="Eliminar_Persona_Array();" />
                </td>
            </tr>
        </table>
    </div>

    <div id="dialog_eliminar_A" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold" id="P2">
                        Pulse Confirmar para eliminar el registro seleccionado.
                    </p>
                </td>
                <td>
                    <img alt="Warning_2" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin_A" type="button" value="Confirmar" onclick="Eliminar_Activo_Array();" />
                </td>
            </tr>
        </table>
    </div>

    <div id="Dialog_Format_Adress">
        <table style="width: 100%; text-align: center; font: 12px/20px CenturyGothic,sans-serif;">
            <tr>
                <td>
                    <select id="Select_Type_Adress" class="Select_medium">
                        <option value="">Nomenclatura</option>
                        <option value="Cll">Calle</option>
                        <option value="Cra">Carrera</option>
                        <option value="Cir">Circular</option>
                        <option value="Diag">Diagonal</option>
                        <option value="Trans">Transversal</option>
                        <option value="Av">Avenida</option>
                        <option value="Km">Kilometro</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N1" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <input type="text" id="Txt_Special" maxlength="200" class="" style="width: 400px" />
                    <select id="Select_Letter_1" class="Select_tiny">
                        <option value="">Letra</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N2" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <select id="Select_Letter_2" class="Select_tiny">
                        <option value="">Letra</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                        <option value="H">H</option>
                        <option value="I">I</option>
                        <option value="J">J</option>
                        <option value="K">K</option>
                        <option value="L">L</option>
                        <option value="M">M</option>
                        <option value="N">N</option>
                        <option value="O">O</option>
                        <option value="P">P</option>
                        <option value="Q">Q</option>
                        <option value="R">R</option>
                        <option value="S">S</option>
                        <option value="T">T</option>
                        <option value="U">U</option>
                        <option value="V">V</option>
                        <option value="W">W</option>
                        <option value="X">X</option>
                        <option value="Y">Y</option>
                        <option value="Z">Z</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N3" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <select id="Select_Orientacion" class="Select_medium">
                        <option value="">Orientacion</option>
                        <option value="Norte">Norte</option>
                        <option value="Sur">Sur</option>
                        <option value="Oeste">Oeste</option>
                        <option value="Este">Este</option>
                    </select>
                </td>
                <td>
                    <select id="Select_Type_Cons" class="Select_medium">
                        <option value="">Vivienda</option>
                        <option value="Apto">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Lote">Lote</option>
                        <option value="Local">Local</option>
                        <option value="Bodega">Bodega</option>
                        <option value="Stand">Stand</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N4" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <select id="Select_Type_Cons2" class="Select_medium">
                        <option value="">Tipo</option>
                        <option value="Bloque">Bloque</option>
                        <option value="Interior">Interior</option>
                        <option value="Piso">Piso</option>
                        <option value="Manzana">Manzana</option>
                        <option value="Torre">Torre</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N5" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_Texto" maxlength="40" class="Letter" style="width: 200px" />
                        <span class="Spam_AWords"></span></span>
                </td>
            </tr>
            <tr>
                <td colspan="10">
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="13">
                    <input type="text" id="Txt_End_Adress" maxlength="4" readonly="readonly" style="width: 500px; text-align: center;" />
                </td>
            </tr>
            <tr>
                <td colspan="8">
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="13" style="text-align: center;">
                    <input id="BtnStrAdress" type="button" value="Aceptar" onclick="Add_Adress();" />
                </td>
            </tr>
        </table>
    </div>

    <div id="Dialog_Terceros">
        <div id="Bloque_datos_Terceros1">
            <table id="T_DatosColocacion" style="width: 100%;">
                <tr>
                    <td id="TD1" style="width: 10.5%;" class="Label_Bold">Empresa</td>
                    <td id="L_Empresa" style="width: 35%;">123123 - SASIF S.A.S.</td>
                    <td id="TD2" style="width: 10.5%;" class="Label_Bold">Colocación</td>
                    <td id="L_Colocacion" style="width: 35%;">ASD123456789DSA</td>
                </tr>
            </table>
        </div>
        <div id="Bloque_datos_Terceros2">
            <table id="T_Documento" style="width: 100%; padding-top: 20px;">
                <tr>
                    <td class="Label_Bold" style="width: 10.5%;">Documento</td>
                    <td style="width: 63%;">
                        <select style="width: 100%;" id="Select_Documento_C2" class="C_Chosen">
                        </select>
                    </td>
                    <td style="width: 44%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD_C2"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="T_Identificacion" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 10.8%;">Identificación
                    </td>
                    <td style="width: 15%;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtDoc_C2" maxlength="18" class="Numeric" style="width: 100%;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 25.4%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D_C2"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 5%;">Persona
                    </td>
                    <td id="V_Persona2" style="width: 50%;" colspan="3"></td>
                    <td style="padding-bottom: 25px; width: 15%;"></td>
                </tr>
            </table>
            <table id="T_Relacion" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 10.5%;">Relación</td>
                    <td style="width: 37%;">
                        <select style="width: 100%;" id="Select_Relacion" class="C_Chosen">
                            <option value="-1">Seleccione...</option>
                            <option value="1">1 - Locatario/Deudor Principal</option>
                            <option value="2">2 - Segundo u otro Locatario</option>
                            <option value="3">3 - Codeudor</option>
                            <option value="4">4 - Otras relaciones</option>
                        </select>
                    </td>
                    <td style="width: 70%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img20"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="Div_BTN_AgregarTercero" style="width: 100%; text-align: center; margin-top: 11px;">
            <input id="BTN_AgregarTercero" type="button" value="Guardar" onclick="BTNAgregarTercero();" />
        </div>
    </div>

    <div id="Dialog_Activos">
        <table id="T_DatosColocacion_A" style="width: 100%;">
            <tr>
                <td id="TD3" style="width: 10.5%;" class="Label_Bold">Empresa</td>
                <td id="L_Empresa_A" style="width: 35%;">123123 - SASIF S.A.S.</td>
                <td id="TD4" style="width: 10.5%;" class="Label_Bold">Colocación</td>
                <td id="L_Colocacion_A" style="width: 35%;">ASD123456789DSA</td>
            </tr>
        </table>
        <div id="Div1">
            <div id="Container_controls">
                <div id="Acordeon_Activo" style="width: 100%">
                    <h3>Datos Activos
                    </h3>
                    <div id="DatosActivos">
                        <table id="T_Sucursal_A" style="width: 100%;">
                            <tr>
                                <td style="width: 7.2%;" class="Label_Bold">Sucursal
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Sucursal" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 41%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G1"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                        <table id="T_Datos_Activo" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.7%;">Tipo de Activo
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Tipo" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 6%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G2"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 10%;">Sub-Tipo de Activo
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_SubTipo" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 10%; padding-bottom: 25px;"></td>
                            </tr>
                        </table>
                        <table id="Tabla_LLave_Inmueble" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 14%;">Cedula Catastral
                                </td>
                                <td style="width: 11%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_1" maxlength="17" class="Numeric_letter" style="width: 170px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="K_1"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 15%;">Matricula Imbiliaria
                                </td>
                                <td style="width: 11%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_2" maxlength="17" class="Numeric_letter" style="width: 170px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="K_2"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 14%;">Numero Unico ID
                                </td>
                                <td style="width: 11%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_3" maxlength="17" class="Numeric_letter" style="width: 170px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="K_3"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>

                                </td>
                            </tr>
                        </table>
                        <table id="Tabla_LLave_Vehiculos" style="width: 100%;">
                            <tr>
                                <td id="Txtkey_1" class="Label_Bold" style="width: 8%;">Placa
                                </td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form_T">
                                        <input type="text" id="TxtRef_Other" maxlength="17" style="width: 180px;" class="Numeric_letter" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 50%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="K_4"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                        <table id="T_Identificacion_Persona_A" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 4%;">Documento
                                </td>
                                <td style="width: 25%;">
                                    <select id="Select_Documento" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="padding-bottom: 25px; width: 3%;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD_A"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 3%;">Identificación
                                </td>
                                <td style="width: 10%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtDoc" maxlength="18" class="Numeric" style="width: 100%;" />
                                        <span class="Spam_AN"></span></span>
                                </td>
                                <td style="padding-bottom: 25px; width: 7%;">
                                    <span class="cssToolTip_L">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D_A"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                            <tr>
                                <td class="Label_Bold" style="width: 4%;">Responsable
                                </td>
                                <td id="V_Responsable" style="width: 25%;" colspan="3"></td>
                            </tr>
                        </table>
                        <table id="Tabla_datos_Or" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.8%;">Descripción
                                </td>
                                <td style="width: 10%;">
                                    <span class="cssToolTip_Form_T">
                                        <input type="text" id="txtDescripcion" maxlength="50" style="width: 300px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 40%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G3"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                        <table id="Tabla_Moneda" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.2%;">Moneda
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Moneda" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="padding-bottom: 25px; width: 41%;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G4"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                        <table id="Tabla_Valor" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.5%;">Valor Bien
                                </td>
                                <td id="V_Sigla_1" style="width: 3%" class="Sigla"></td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtValor_Bien" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                        <span class="Spam_AVal"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 10%;">Sumatoria Facturas
                                </td>
                                <td id="V_Sigla_2" style="width: 4%" class="Sigla"></td>
                                <td class="Label_Bold" id="V_TFacturas" style="width: 30%;"></td>
                            </tr>
                        </table>
                        <table id="Tabla_Valor_Compra" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.3%;">Valor Compra
                                </td>
                                <td id="V_Sigla_3" style="width: 3%" class="Sigla"></td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form_T">
                                        <input type="text" id="TxtValor_Compra" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                        <span class="Spam_AVal"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 10%;">Compra Bien</td>
                                <td style="width: 5%">
                                    <select id="Select_CompraBien" class="C_Chosen" style="width: 80px;">
                                        <option value="0">No Aplica</option>
                                        <option value="1">Nuevo</option>
                                        <option value="2">Usado</option>
                                    </select></td>
                                <td class="Label_Bold" style="width: 25%;"></td>
                            </tr>
                        </table>
                        <table id="T_Datos_Final" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 6%;">Asegurado (S/N)
                                </td>
                                <td style="width: 6%;">
                                    <select id="Select_Asegurado" class="C_Chosen">
                                        <option value="N">No</option>
                                        <option value="S">Si</option>
                                    </select>
                                </td>
                                <td style="width: 11.5%; padding-bottom: 25px;"></td>
                                <td class="Label_Bold" style="width: 7.7%;">Tipo Administración
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_TipoAdmin" class="C_Chosen">
                                        <option value="1">1 - Cliente paga</option>
                                        <option value="2">2 - Exento</option>
                                        <option value="3">3 - Pago BBVA</option>
                                        <option value="4">4 - Pago cliente con soporte</option>
                                    </select>
                                </td>
                                <td style="width: 10%; padding-bottom: 25px;"></td>
                            </tr>
                        </table>
                    </div>
                    <h3>Ubicación
                    </h3>
                    <div id="UbicacionBien" style="height: 200px;">
                        <table id="Tabla_Ubicacion" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.7%;">Pais
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Pais_U" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 6%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G5"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 10%; text-align: right">Ciudad
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Ciudad_U" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 10%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G6"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                            <tr>
                                <td class="Label_Bold" style="width: 7.7%;">Dirección
                                </td>
                                <td style="width: 20%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="Txt_Adress_U" maxlength="50" style="width: 200px;" readonly="readonly" />
                                        <span class="Spam_A_Addres"></span></span>
                                </td>
                                <td style="width: 6%; padding-bottom: 25px;" colspan="3">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_G7"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <h3 id="TitleActivo_2">Activo
                    </h3>
                    <div id="TipoActivo">
                        <table id="Blo_Inmuebles">
                            <tr>
                                <td>
                                    <table id="T_Datos_Inmueble" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 7.5%;">Tipo Escritura
                                            </td>
                                            <td style="width: 20%;">
                                                <select id="Select_TipoEscritura" class="C_Chosen">
                                                    <option value="1">1 - Ligada inmueble principal</option>
                                                    <option value="2">2 - Escritura independiente</option>
                                                </select>
                                            </td>
                                            <td style="width: 6%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Inmu_1"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                            <td class="Label_Bold" style="width: 15%;">N° Escritura Inmueble Notaria
                                            </td>
                                            <td style="width: 20%;">
                                                <span class="cssToolTip_Form_T">
                                                    <input type="text" class="Numeric_letter" id="Txt_NunImobiliaria" maxlength="17" style="width: 180px;" />
                                                    <span class="Spam_ANL"></span></span>
                                            </td>
                                            <td style="width: 10%; padding-bottom: 25px;">
                                                <span class="cssToolTip_L">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Inmu_2"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table id="Blo_Fasecolda">
                            <tr>
                                <td>
                                    <table id="Codigo_Fasecolda" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 12.8%;">Codigo Fasecolda
                                            </td>
                                            <td style="width: 20%;">
                                                <span class="cssToolTip_Form">
                                                    <input type="text" class="Numeric" id="TxtFasecolda_ID" maxlength="8" style="width: 90%;" />
                                                    <span class="Spam_ANL"></span></span>
                                            </td>
                                            <td style="width: 50%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_1"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                    <table id="T_Datos_Fasecolda_1" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 7.3%;">Clase
                                            </td>
                                            <td style="width: 20%;">
                                                <select id="Select_ClaseF" class="C_Chosen">
                                                </select>
                                            </td>
                                            <td style="width: 20%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_2"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                    <table id="T_Datos_Fasecolda_2" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 7.7%;">Marca
                                            </td>
                                            <td style="width: 10%;">
                                                <select id="Select_MarcaF" class="C_Chosen">
                                                </select>
                                            </td>
                                            <td style="width: 30%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_3"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                    <table id="T_Datos_Fasecolda_3" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 7.3%;">Linea
                                            </td>
                                            <td style="width: 35%;">
                                                <select id="Select_LineaF" class="C_Chosen">
                                                </select>
                                            </td>
                                            <td style="width: 5%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_4"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                    <table id="T_Datos_Fasecolda_4" style="width: 100%;">
                                        <tr>
                                            <td class="Label_Bold" style="width: 8.5%;">Modelo
                                            </td>
                                            <td style="width: 7%;">
                                                <select id="Select_modelo" class="C_Chosen">
                                                </select>
                                            </td>
                                            <td style="width: 40%; padding-bottom: 25px;">
                                                <span class="cssToolTip">
                                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_5"
                                                        src="../../images/error.png" />
                                                    <span class="SpamEG"></span></span>
                                            </td>
                                        </tr>
                                    </table>
                                    <div id="DIV_Buscar_FASECOLDA" style="width: 100%; text-align: center; margin-top: 25px;">
                                        <input id="Btn_ShearchFacecolda" type="button" style="width: 18%;" value="Consulta Facecolda" onclick="BtnBuscarFacecolda();" />
                                    </div>
                                    <div id="Bloque_datosIngreso">
                                        <table id="Table4" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 5.9%;">Valor Comercial
                                                </td>
                                                <td id="V_Sigla_5" style="width: 2%" class="Sigla"></td>
                                                <td id="V_Valor_F" class="Title_Bold" align="left" style="width: 5%;"></td>
                                                <td style="width: 30%"></td>
                                                <td class="Label_Bold" style="width: 4.9%;"></td>
                                            </tr>
                                        </table>
                                        <table id="Tabla_Blo_1" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 5%;">Cilindraje
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric" id="Txt_Cilindraje" maxlength="5" style="width: 30%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%; padding-bottom: 25px;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_6"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>

                                                </td>
                                                <td class="Label_Bold" style="width: 8.5%;">Número de motor
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="TxtN_Motor" maxlength="30" style="width: 100%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%;"></td>
                                            </tr>
                                            <tr>
                                                <td class="Label_Bold" style="width: 5%;">Número de Serie
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Txt_NSerie" maxlength="30" style="width: 100%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%;"></td>
                                                <td class="Label_Bold" style="width: 8.5%;">Número de VIN
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Txt_NVIN" maxlength="30" style="width: 100%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%;"></td>
                                            </tr>
                                        </table>
                                        <table id="Tabla_Vchasis" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 5.9%;">Número de Chasis
                                                </td>
                                                <td style="width: 16.3%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Txt_NChasis" maxlength="30" style="width: 66%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 5%;">Valor Chasis</td>
                                                <td id="V_Sigla_4" style="width: 4.2%" class="Sigla"></td>
                                                <td style="width: 5%">
                                                    <span class="cssToolTip_Form_T">
                                                        <input type="text" id="TxtValor_Chasis" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                                        <span class="Spam_AVal"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 4.9%;"></td>
                                            </tr>
                                        </table>
                                        <table id="T_F_Servicio" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 8.3%;">Tipo Servicio
                                                </td>
                                                <td style="width: 10%;">
                                                    <select id="Select_TServicio" class="C_Chosen">
                                                        <option value="-1">Seleccione...</option>
                                                        <option value="1">1 - Particular</option>
                                                        <option value="2">2 - Publico</option>
                                                        <option value="3">3 - Diplomatico</option>
                                                        <option value="4">4 - Oficial</option>
                                                        <option value="5">5 - RNMA</option>
                                                    </select>
                                                </td>
                                                <td style="width: 10%; padding-bottom: 25px;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_7"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 13%;">Modalidad Servicio
                                                </td>
                                                <td style="width: 20%;">
                                                    <select id="Select_MServicio" class="C_Chosen">
                                                        <option value="1">1 - Pasajeros</option>
                                                        <option value="2">2 - Carga</option>
                                                        <option value="3">3 - Mixto</option>
                                                    </select>
                                                </td>
                                                <td style="width: 2%; padding-bottom: 25px;"></td>
                                            </tr>
                                        </table>
                                        <table id="T_F_Combus" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 8.3%;">Combustible
                                                </td>
                                                <td style="width: 10%;">
                                                    <select id="Select_Combustible" class="C_Chosen">
                                                        <option value="-1">Seleccione...</option>
                                                        <option value="1">1 - Gasolina</option>
                                                        <option value="2">2 - Diesel</option>
                                                        <option value="3">3 - Gas</option>
                                                        <option value="4">4 - Mixto</option>
                                                        <option value="5">5 - Electrico</option>
                                                        <option value="6">6 - Hidrogeno</option>
                                                        <option value="7">7 - Etanol</option>
                                                        <option value="8">8 - BioDiesel</option>
                                                    </select>
                                                </td>
                                                <td style="width: 10%; padding-bottom: 25px;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_8"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 13%;">N° Pasajeros
                                                </td>
                                                <td style="width: 20%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric" id="Txt_NPasajeros" maxlength="3" style="width: 20%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 2%; padding-bottom: 25px;"></td>
                                            </tr>
                                        </table>
                                        <table id="T_F_ColorCap" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 8.9%;">Color
                                                </td>
                                                <td style="width: 6%;">
                                                    <select id="Select_Color" class="C_Chosen">
                                                    </select>
                                                </td>
                                                <td style="width: 11.3%; padding-bottom: 25px;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_9"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 14%;">N° Capacidad
                                                </td>
                                                <td style="width: 19%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric" id="Txt_Capacidad" maxlength="2" style="width: 22%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%; padding-bottom: 25px;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Fase_10"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                            </tr>
                                        </table>
                                        <table id="Tabla_Blo_2" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 5%;">Potencia
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric" id="Txt_Potencia" maxlength="5" style="width: 30%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%; padding-bottom: 25px;"></td>
                                                <td class="Label_Bold" style="width: 8.5%;"></td>
                                                <td style="width: 10%;"></td>
                                                <td style="width: 5%;"></td>
                                            </tr>
                                            <tr>
                                                <td class="Label_Bold" style="width: 5%;">Carroceria
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Txt_Carroceria" maxlength="30" style="width: 100%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%; padding-bottom: 25px;"></td>
                                                <td class="Label_Bold" style="width: 8.5%;">Tipo de Carroceria
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Txt_TCarroceria" maxlength="30" style="width: 100%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 5%; padding-bottom: 25px;"></td>
                                            </tr>
                                        </table>
                                        <table id="T_StateBlin" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 8%;">Blindaje (S/N)
                                                </td>
                                                <td style="width: 6%;">
                                                    <select id="Select_Blindaje" class="C_Chosen">
                                                        <option value="N">No</option>
                                                        <option value="S">Si</option>
                                                    </select>
                                                </td>
                                                <td style="width: 15.5%; padding-bottom: 25px;"></td>
                                                <td class="Label_Bold" style="width: 12%;">N° GPS</td>
                                                <td style="width: 15%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" class="Numeric_letter" id="Text_NGPS" maxlength="20" style="width: 70%;" />
                                                        <span class="Spam_ANL"></span></span>
                                                </td>
                                                <td style="width: 6%; padding-bottom: 25px;"></td>
                                            </tr>
                                        </table>
                                        <table id="T_Datos_Identificacion_blin" style="width: 100%;">
                                            <tr>
                                                <td class="Label_Bold" style="width: 4%;">Nivel Blindaje
                                                </td>
                                                <td style="width: 25%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" id="Txt_Nivel_Blin" maxlength="5" class="Numeric" style="width: 20%;" />
                                                        <span class="Spam_AN"></span></span>
                                                </td>
                                                <td style="padding-bottom: 25px; width: 3%;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_N_blin"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 3%;"></td>
                                                <td style="width: 10%;"></td>
                                                <td style="padding-bottom: 25px; width: 7%;"></td>
                                            </tr>
                                            <tr>
                                                <td class="Label_Bold" style="width: 4%;">Documento
                                                </td>
                                                <td style="width: 25%;">
                                                    <select id="Select_Documento_Blin" class="C_Chosen">
                                                    </select>
                                                </td>
                                                <td style="padding-bottom: 25px; width: 3%;">
                                                    <span class="cssToolTip">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD_blin"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                                <td class="Label_Bold" style="width: 3%;">Identificación
                                                </td>
                                                <td style="width: 10%;">
                                                    <span class="cssToolTip_Form">
                                                        <input type="text" id="TxtDoc_Blin" maxlength="18" class="Numeric" style="width: 100%;" />
                                                        <span class="Spam_AN"></span></span>
                                                </td>
                                                <td style="padding-bottom: 25px; width: 7%;">
                                                    <span class="cssToolTip_L">
                                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D_blin"
                                                            src="../../images/error.png" />
                                                        <span class="SpamEG"></span></span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="Label_Bold" style="width: 4%;"></td>
                                                <td id="V_Responsable_Blin" style="width: 25%;" colspan="3"></td>
                                            </tr>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <h3>Registro
                    </h3>
                    <div id="RegistroActivo" style="height: 240px">
                        <table id="Tabla_Registro" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.7%;">Pais
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Pais_R" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 6%; padding-bottom: 25px; text-align: right;"></td>
                                <td class="Label_Bold" style="width: 10%;">Ciudad
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Ciudad_R" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 10%; padding-bottom: 25px;"></td>
                            </tr>
                            <tr>
                                <td class="Label_Bold" style="width: 7.7%;">Persona
                                </td>
                                <td style="width: 20%;" colspan="3">
                                    <select id="Select_Persona_R" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 6%; padding-bottom: 25px;" colspan="3"></td>

                            </tr>
                        </table>
                    </div>
                    <h3>Activos NO Financieros
                    </h3>
                    <div id="ActivosNOFinancieros" style="height: 150px;">
                        <table id="Tabla_NoFinan" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 10%;">Fecha contable Recibo
                                </td>
                                <td style="width: 10%;">
                                    <span class="cssToolTip_Form">
                                        <input id="TxtFecha_Recibo" type="text" readonly="readonly" style="width: 80%;" />
                                        <span class="Spam_AF"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 10%; text-align: right;">Fecha Contable Retiro
                                </td>
                                <td style="width: 10%;">
                                    <span class="cssToolTip_Form">
                                        <input id="TxtFecha_Retiro" type="text" readonly="readonly" style="width: 80%;" />
                                        <span class="Spam_AF"></span></span>
                                </td>
                                <td style="width: 25%; padding-bottom: 25px;"></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <table id="Complementos">
                    <tr>
                        <td>
                            <table id="T_Factura_Grid" border="1" cellpadding="1" cellspacing="1">
                                <thead>
                                    <tr>
                                        <th>
                                            <span class="cssToolTip_ver">
                                                <img alt="Activo" class="Add" onclick="javascript:Add_Facturas();" id="Img27" height='20px'
                                                    width='20px' src='../../images/add.png' /><span>Agregar Nueva Factura</span></span>
                                        </th>
                                        <th>Identificación Factura
                                        </th>
                                        <th>Identificación Factura
                                        </th>
                                        <th>Identificación Factura
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
                        </td>
                    </tr>
                </table>
                <div id="Div_BTN_AgregarActivo" style="width: 100%; text-align: center; margin-top: 25px;">
                    <input id="BTN_AgregarActivo" type="button" value="Guardar" onclick="BtnCrear_Act();" />
                </div>
            </div>
        </div>

    </div>

</asp:Content>



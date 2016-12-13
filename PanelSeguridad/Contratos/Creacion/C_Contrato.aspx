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
                                <span class="cssToolTip_Form">
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
                                <span class="cssToolTip_Form">
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
                                <span class="cssToolTip_Form">
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

                <h3>Añadir Terceros
                </h3>
                <div id="Div_Terceros">
                    <div id="Container_Terceros">
                        <table id="T_Terceros" border="1" cellpadding="1" cellspacing="1">
                            <thead>
                                <tr>
                                    <th>
                                        <span class="cssToolTip_ver">
                                            <img alt="Activo" class="Add" onclick="javascript:ValidarIDColocacion();" id="Crear_Terceros" height='20px'
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

    <div id="Dialog_Activos">
    </div>

    <div id="Dialog_Terceros">
        <table id="T_DatosColocacion" style="width: 100%;">
            <tr>
                <td id="TD1" style="width: 10.5%;" class="Label_Bold">Empresa</td>
                <td id="L_Empresa" style="width: 35%;">123123 - SASIF S.A.S.</td>
                <td id="TD2" style="width: 10.5%;" class="Label_Bold">Colocación</td>
                <td id="L_Colocacion" style="width: 35%;">ASD123456789DSA</td>
            </tr>
        </table>
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
        <div id="Div_Agregar" style="width: 100%; text-align: center; margin-top: 11px;">
            <input id="BTN_Agregar" type="button" value="Guardar" onclick="BTNAgregarTercero();" />
        </div>
    </div>

</asp:Content>



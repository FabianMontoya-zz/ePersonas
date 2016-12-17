<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="C_Activos.aspx.vb" Inherits="PanelSeguridad.C_Activos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="C_Activos.js" type="text/javascript"></script>
    <script src="C_ActivosTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="C_Activos_Complementos.js" type="text/javascript"></script>
    <script src="C_Activos_Validacion.js" type="text/javascript"></script>
    <script src="C_Activos_Facturas.js" type="text/javascript"></script>
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
    <div id="Marco_Contrato">
        <div id="Marco_trabajo_Contrato">
            <div id="Container_controls">
                <div id="Acordeon_Activo" style="width: 100%">
                    <h3>Datos Activos
                    </h3>
                    <div id="DatosActivos">
                        <table id="T_Encabezado" style="width: 100%;">
                            <tr>
                                <td style="width: 7.2%;" class="Label_Bold">Nit Empresa
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_EmpresaNit" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 41%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                        <table id="T_Sucursal" style="width: 100%;">
                            <tr>
                                <td style="width: 7.2%;" class="Label_Bold">Sucursal
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Sucursal" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="width: 41%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
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
                        <table id="T_Datos_Identificacion" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 4%;">Documento
                                </td>
                                <td style="width: 25%;">
                                    <select id="Select_Documento" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="padding-bottom: 25px; width: 3%;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
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
                                <td class="Title_Bold" id="V_TFacturas" style="width: 30%;padding-bottom: 5px;" align="left"></td>
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
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
                                    <div style="width: 100%; text-align: center; margin-top: 25px;">
                                        <input id="Btn_ShearchFacecolda" type="button" style="width: 18%;" value="Consulta Facecolda" onclick="BtnBuscarFacecolda();" />
                                    </div>
                                    <div id="Bloque_datosIngreso">
                                        <table id="Table1" style="width: 100%;">
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
                            <div id="Container_Facturas" style="width: 100%;">
                                <table id="T_Factura_Grid" border="1" cellpadding="1" cellspacing="1">
                                    <thead>
                                        <tr>
                                            <th>
                                                <span class="cssToolTip_ver">
                                                    <img alt="Activo" class="Add" onclick="javascript:Add_Facturas();" id="Crear" height='20px'
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
                            </div>
                        </td>
                    </tr>
                </table>
                <div style="width: 100%; text-align: center; margin-top: 25px;">
                    <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                </div>
            </div>
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
                    <img alt="Warning" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Factura">
        <div id="Bloque_datos_activos">
            <table id="T_DatosActivo" style="width: 100%;">
                <tr>
                    <td style="width: 14.5%;" class="Label_Bold">Empresa</td>
                    <td id="L_Empresa_Act" style="width: 90%;">xxxx</td>
                </tr>
            </table>
            <table id="B_I" style="width: 100%;">
                <tr>
                    <td style="width: 12%;" class="Label_Bold">Cedula Catastral</td>
                    <td id="L_K1_Act" style="width: 15%;"></td>
                    <td style="width: 12%;" class="Label_Bold">Matricula Imbiliaria</td>
                    <td id="L_K2_Act" style="width: 15%;"></td>
                    <td style="width: 12%;" class="Label_Bold">Numero Unico ID</td>
                    <td id="L_K3_Act" style="width: 15%;"></td>
                </tr>
            </table>
            <table id="B_V" style="width: 100%;">
                <tr>
                    <td id="T_llave_Act" style="width: 14.5%;" class="Label_Bold">Placa</td>
                    <td id="L_K4_Act" style="width: 90%;"></td>
                </tr>
            </table>
        </div>
        <div id="Bloque_Datos_Factura">
            <table id="T_1_Fact" style="width: 100%;">
                <tr>
                    <td style="width: 5.1%;" class="Label_Bold">N° Factura</td>
                    <td style="width: 10%;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="Factura_ID" class="Numeric_letter" maxlength="17" style="width: 170px;" />
                            <span class="Spam_AST"></span></span>
                    </td>
                    <td style="width: 5%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_Fac_1"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 10%;">Fecha 
                    </td>
                    <td style="width: 10%;">
                        <span class="cssToolTip_Form">
                            <input id="Txt_Fecha_fact" type="text" readonly="readonly" style="width: 80%;" />
                            <span class="Spam_AF"></span></span>
                    </td>
                    <td style="width: 5%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_Fac_2"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="T_F_2" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 7.2%;">Moneda
                    </td>
                    <td style="width: 20%;">
                        <select id="Select_Moneda_F" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px; width: 41%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_Fac_3"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="T_F_3" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 8.5%;">Valor Total
                    </td>
                    <td id="V_Sigla_6" style="width: 3%" class="Sigla"></td>
                    <td style="width: 10%;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_ValFactura" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                            <span class="Spam_AVal"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 3%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_Fac_4"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 7%;">Valor sin IVA
                    </td>
                    <td id="V_Sigla_7" style="width: 3%" class="Sigla"></td>
                    <td style="width: 10%;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="Text_Val_Sin_IVA" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                            <span class="Spam_AVal"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 3%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_Fac_5"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 5%;">Valor IVA
                    </td>
                    <td id="V_Sigla_8" style="width: 3%" class="Sigla"></td>
                    <td class="Title_Bold" align="left" id="V_Val_IVA" style="width: 10%; padding-bottom: 5px;"></td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; text-align: center; margin-top: 25px;">
            <input id="Btn_Fact" type="button" value="Agregar Factura" onclick="BtnFactura();" style="width: 150px;" />
        </div>
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
</asp:Content>

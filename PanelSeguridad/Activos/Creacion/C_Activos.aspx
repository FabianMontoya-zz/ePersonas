<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="C_Activos.aspx.vb" Inherits="PanelSeguridad.C_Activos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="C_Activos.js" type="text/javascript"></script>
    <script src="C_ActivosTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="C_Activos_Complementos.js" type="text/javascript"></script>
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
                    <div id="DatosActivos" style="height: 200px;">
                        <table id="T_Encabezado" style="width: 100%;">
                            <tr>
                                <td style="width: 7%;" class="Label_Bold">Nit Empresa
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
                                <td style="width: 7%;" class="Label_Bold">Sucursal
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
                                <td class="Label_Bold" style="width: 7.5%;">Tipo de Activo
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
                    </div>
                    <h3 id="TitleActivo_2">Activo
                    </h3>
                    <div id="TipoActivo">
                        <table id="Tabla_LLave_Inmueble" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 12%;">Cedula Catastral
                                </td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_1" maxlength="17" style="width: 180px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 14%;">Matricula Imbiliaria
                                </td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_2" maxlength="17" style="width: 180px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 12%;">Numero Unico ID
                                </td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_3" maxlength="17" style="width: 180px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 5%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>

                                </td>
                            </tr>
                        </table>
                        <table id="Tabla_LLave_Vehiculos" style="width: 100%;">
                            <tr>
                                <td id="Txtkey_1" class="Label_Bold" style="width: 7.7%;">Placa
                                </td>
                                <td style="width: 15%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtRef_Other" maxlength="17" style="width: 180px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 50%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
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
                                            <td style="width: 6%; padding-bottom: 25px;"></td>
                                            <td class="Label_Bold" style="width: 15%;">N° Escritura Inmueble Notaria
                                            </td>
                                            <td style="width: 20%;">
                                                <span class="cssToolTip_Form">
                                                    <input type="text" class="Numeric_letter" id="Txt_NunImobiliaria" maxlength="17" style="width: 180px;" />
                                                    <span class="Spam_ANL"></span></span>
                                            </td>
                                            <td style="width: 10%; padding-bottom: 25px;"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <table id="Tabla_datos_Or" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7.5%;">Descripción
                                </td>
                                <td style="width: 10%;">
                                    <span class="cssToolTip_Form_T">
                                        <input type="text" id="txtDescripcion" maxlength="50" style="width: 300px;" />
                                        <span class="Spam_AST"></span></span>
                                </td>
                                <td style="width: 40%; padding-bottom: 25px;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <h3>Ubicación del Bien
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
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
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                            src="../../images/error.png" />
                                        <span class="SpamEG"></span></span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <h3>Registro
                    </h3>
                    <div id="RegistroActivo"  style="height: 240px">
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
                        <table id="Tabla_Moneda" style="width: 100%;">
                            <tr>
                                <td class="Label_Bold" style="width: 7%;">Moneda
                                </td>
                                <td style="width: 20%;">
                                    <select id="Select_Moneda" class="C_Chosen">
                                    </select>
                                </td>
                                <td style="padding-bottom: 25px; width: 41%;">
                                    <span class="cssToolTip">
                                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
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
                                <td class="Label_Bold" style="width: 6.8%;">Valor Compra
                                </td>
                                <td id="V_Sigla_3" style="width: 2.8%" class="Sigla"></td>
                                <td style="width: 11.5%;">
                                    <span class="cssToolTip_Form">
                                        <input type="text" id="TxtValor_Compra" maxlength="17" onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                                        <span class="Spam_AVal"></span></span>
                                </td>
                                <td class="Label_Bold" style="width: 5%;">Compra Bien</td>
                                <td style="width: 10%">
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
                                <td class="Label_Bold" style="width: 4.6%;">Asegurado (S/N)
                                </td>
                                <td style="width: 5%;">
                                    <select id="Select_Asegurado" class="C_Chosen">
                                        <option value="N">No</option>
                                        <option value="S">Si</option>
                                    </select>
                                </td>
                                <td style="width: 6.5%; padding-bottom: 25px;"></td>
                                <td class="Label_Bold" style="width: 6.5%; text-align: right;">Tipo Administración
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
                    <h3>Activos NO Financieros
                    </h3>
                    <div id="ActivosNOFinancieros">
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
                                <td style="width: 40%; padding-bottom: 25px;"></td>
                            </tr>
                        </table>
                    </div>
                </div>


                <table id="Complementos">
                    <tr>
                        <td>
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
    <div id="Dialog_Activos">
        <div id="container_TActivos">
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
                    <input type="text" id="Txt_N1" maxlength="4" class="Numeric" style="width: 40px" />
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
                    <input type="text" id="Txt_N2" maxlength="4" class="Numeric" style="width: 40px" />
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
                    <input type="text" id="Txt_N3" maxlength="4" class="Numeric" style="width: 40px" />
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
                        <option value="Stan">Stand</option>
                    </select>
                </td>
                <td>
                    <input type="text" id="Txt_N4" maxlength="4" class="Numeric" style="width: 40px" />
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
                    <input type="text" id="Txt_N5" maxlength="4" class="Numeric" style="width: 40px" />
                </td>
                <td>
                    <input type="text" id="Txt_Texto" maxlength="40" class="Letter" style="width: 200px" />
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

<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Salida.aspx.vb" Inherits="PanelSeguridad.Salida" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Salida.js" type="text/javascript"></script>
    <script src="Salida_Tarjeta.js" type="text/javascript"></script>
    <script src="SalidaTrasaccionsAjax.js" type="text/javascript"></script>
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
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div class="Container_title_Form">
        <div id="Dialog_Control" style="width: 100%; text-align: center;">
            <div class="cssload-container" style="margin-top: 25%;">
                <div class="cssload-whirlpool"></div>
                <div>
                    <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
                </div>
            </div>
        </div>
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
            <table width="100%">
                <tr>
                    <td id="logoExt" rowspan="2" style="width: 80%; text-align: end;"></td>
                    <td class="Label_Bold" style="width: 10%; text-align: end; color: #b70d0d;">Hora <span id="liveclock" style="left: 0; top: 0;"></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_Captura" style="width: 100%; text-align: left;">
                <tr>
                    <td style="width: 3%;" class="Label_Bold">Tarjeta
                    </td>
                    <td>
                        <span class="cssToolTip_Form" style="width: 15%;">
                            <input type="text" id="TxtIDTarjeta" maxlength="10" class="Numeric" style="width: 165px; height: 25px; font: 20px/20px CenturyGothic,sans-serif; text-align: center;" />
                            <span class="SpamALEC"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 3%;">Documento
                    </td>
                    <td style="width: 25%;">
                        <select id="Select_Documento" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px; width: 5%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 3%;">Identificación
                    </td>
                    <td style="width: 15%;">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtDoc" maxlength="18" class="Numeric" style="width: 150px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 5%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td style="width: 10%;">
                        <input id="Btnguardar" class="BWeb" type="button" value="Consultar" onclick="BtnConsulta();" />
                    </td>
                </tr>
            </table>
            <div id="Datos_persona" style="width: 100%;">
                <table id="TI_1" style="width: 100%">
                    <tr>
                        <td class="Label_Bold" style="width: 5%;">Nombre
                        </td>
                        <td id="L_Nombre" style="width: 30%;"></td>
                        <td></td>
                        <td class="Label_Bold" style="width: 5%;">Empresa
                        </td>
                        <td id="L_Empresa" style="width: 30%;"></td>
                        <td></td>
                        <td id="Semaforo" rowspan="2" style="text-align: left; width: 10%;">
                            <span class='cssToolTip_Form'>
                                <img id="Sucess" alt='No' title='' style='height: 35px; width: 35px;' src='../../images/C_GREEN.png' /><span>Documentos completos, Vigentes y Verificados</span></span>
                            <span class="cssToolTip_L">
                                <img id="Fail" alt='No' title='' style='height: 35px; width: 35px;' src='../../images/C_RED.png' /><span id="Spam_Mensaje"></span></span>
                        </td>
                        <td id="imagen" rowspan="3" colspan="2" style="text-align: end; width: 20%;">
                            <img alt="foto" title="" style="height: 100px; width: 80px; border-radius: 4px; border-color: #420101; border-width: 2px; border-style: outset;"
                                id="Imgfoto" src="../../images/avatar.png" />
                        </td>
                    </tr>
                    <tr>
                        <td class="Label_Bold" style="width: 70px;">Area
                        </td>
                        <td id="L_Area" style="width: 200px;"></td>
                        <td></td>
                        <td class="Label_Bold">Cargo
                        </td>
                        <td id="L_Cargo"></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div class="Container_controls">
                <div id="Acordeon_Salida" style="width: 100%;">
                    <h3>Registros De Ingreso 
                    </h3>
                    <div id="Reg_Ingreso">
                        <div id="Reg_Salida" style="margin-top: 10px; width: 100%;">
                            <div id="Cointainer_Salida" style="margin-bottom: 10px;">
                            </div>
                            <div id="Control_Salida" style="margin-top: 10px; width: 100%; margin-bottom: 10px; text-align: center">
                                <input id="BtnRegistroSalida" class="BWeb" type="button" value="Registrar Salida" style="width: 40%;"
                                    onclick="Registrar_Salida_Log()" />
                            </div>
                        </div>
                    </div>
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
                    <p class="Label_Bold" id="Mensaje_confirma">
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="Img4" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" class="BWeb" type="button" value="Confirmar" onclick="BtnConfirmaSalida();" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>

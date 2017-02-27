<%@ Page Title="Creación Huellas" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master" CodeBehind="Huellas.aspx.vb" Inherits="PanelSeguridad.Huellas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Huellas.js" type="text/javascript"></script>
    <script src="HuellasTrasaccionsAjax.js" type="text/javascript"></script>
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
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />

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

    <!--Dialog que contiene la pantalla de las colocaciones/Huellas -->
    <div id="Marco_Contrato">
        <div id="Marco_trabajo_Huella">
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
            <table id="T_Datos_Identificacion" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 10.5%;">Documento</td>
                    <td style="width: 47%;">
                        <select style="width: 100%;" id="Select_Documento" class="C_Chosen">
                        </select>
                    </td>
                    <td style="width: 60%; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TD"
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
                            <input type="text" id="TxtDoc" maxlength="18" class="Numeric" style="width: 100%;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 15%;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_D"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 6%;">Persona
                    </td>
                    <td id="V_Persona" style="width: 45%;"></td>
                    <td style="padding-bottom: 25px; width: 15%;"></td>
                </tr>
            </table>
            <div id="Div_BTNDedos" style="width: 100%; margin-top: 15px;">
                <input id="Button1" type="button" value="Dedos a Capturar" onclick="DialogDedos();" style="cursor: pointer; cursor: hand; width: 26%;" />
            </div>
            <table id="Div1" style="width: 75%; text-align: center; margin-top: 30px;">
            <tr>
            <td class="Label_Bold">IDENTIFICACIÓN
                    </td>
            </tr>
            </table>
            <table id="T_Files" style="width: 100%; margin-top: 15px;">
                <tr>
                    <td class="Label_Bold" style="width: 41%;">
                        <input id="fileupload" style="cursor: pointer; cursor: hand; width: 100%;" type="file" name="files" accept=".fpt" multiple />
                        <a id="lnkAttch" style="cursor: pointer; cursor: hand;" onclick="AddFileInput(F1)" visible="false"></a>
                    </td>
                    <td style="width: 70%;">
                        <input id="Btncharge_file" type="button" value="Adjuntar un archivo" name="Add_files"
                            style="cursor: pointer; cursor: hand; width: 200px;" onclick="CargaArchivos('fileupload');" />
                    </td>
                </tr>
            </table>
            <div id="Div_TableFingers" style="width: 100%;">
            </div>
            <div id="Div_BTN_Guardar" style="width: 100%; text-align: center; margin-top: 30px;">
                <input id="Btnguardar" type="button" value="Guardar" onclick="" />
            </div>
        </div>


        <div id="Dialog_Dedos" title="Dedos Solicitados">
            <table id="T_Fingers" style="width: 100%;" border="0">
                <tr>
                    <td align="center">
                        <table id="T_Checks_Fingers" cellspacing="2" cellpadding="2" style="width: 100%;" border="0">
                            <tr style="width: 100%;">

                                <td class="Label_Bold" colspan="2" align="center">
                                    <h3>Mano Izquierda</h3>
                                </td>
                                <td class="Label_Bold"></td>
                                <td class="Label_Bold" colspan="2" align="center">
                                    <h3>Mano Derecha</h3>
                                </td>
                                <td class="Label_Bold"></td>
                            </tr>

                            <tr>
                                <td style="width: 5%;">
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_PulgarIZ" value="PulgarIZ" />
                                </td>
                                <td class="Label_Bold">Pulgar
                                </td>
                                <td class="Label_Bold" style="width: 10%;"></td>
                                <td style="width: 5%;">
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_PulgarDER" value="PulgarDER" />
                                </td>
                                <td class="Label_Bold">Pulgar
                                </td>
                                <td class="Label_Bold" style="width: 10%;"></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_IndiceIZ" value="IndiceIZ" />
                                </td>
                                <td class="Label_Bold">Índice
                                </td>
                                <td class="Label_Bold"></td>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_IndiceDER" value="IndiceDER" />
                                </td>
                                <td class="Label_Bold">Índice
                                </td>
                                <td class="Label_Bold"></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_MedioIZ" value="MedioIZ" />
                                </td>
                                <td class="Label_Bold">Dedo Medio
                                </td>
                                <td class="Label_Bold"></td>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_MedioDER" value="MedioDER" />
                                </td>
                                <td class="Label_Bold">Dedo Medio
                                </td>
                                <td class="Label_Bold"></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_AnularIZ" value="AnularIZ" />
                                </td>
                                <td class="Label_Bold">Anular
                                </td>
                                <td class="Label_Bold"></td>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_AnularDER" value="AnularDER" />
                                </td>
                                <td class="Label_Bold">Anular
                                </td>
                                <td class="Label_Bold"></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_MeniqueIZ" value="MeniqueIZ" />
                                </td>
                                <td class="Label_Bold">Meñique
                                </td>
                                <td class="Label_Bold"></td>
                                <td>
                                    <input type="checkbox" style="cursor: pointer; cursor: hand;" id="Check_MeniqueDER" value="MeniqueDER" />
                                </td>
                                <td class="Label_Bold">Meñique
                                </td>
                                <td class="Label_Bold"></td>
                            </tr>
                            <tr>
                                <td class="Label_Bold" colspan="6" align="center">&nbsp;</td>
                            </tr>

                        </table>
                    </td>
                    <td class="Label_Bold" align="center">
                        <img alt="Nombre Dedos Manos" style="background-image: url(../../images/manos_dedos.png); background-size: 215px 240px; background-repeat: no-repeat;" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" width="215px" height="240px" />
                    </td>
                </tr>
                <tr>
                    <td colspan="2" align="center">
                        <input id="BTN_Capturar" type="button" style="cursor: pointer; cursor: hand;" value="Capturar" onclick="btnOk();" />
                    </td>
                </tr>
            </table>
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
</asp:Content>

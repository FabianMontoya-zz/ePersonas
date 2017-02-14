<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master" CodeBehind="Huellas.aspx.vb" Inherits="PanelSeguridad.Huellas" %>

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
            <table id="T_Pulgar_D" style="width: 100%;">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Pulgar Derecho:</td>
                    <td class="Label_Bold" style="width: 100px;">
                        <input id="file1" type="file" name="files[]" />
                        <a id="A1" style="cursor: pointer" onclick="AddFileInput(F1)" visible="false"></a>
                    </td>
                    <td style="width: 100px;">
                        <input id="Button1" type="button" value="Adjuntar Documento de Respaldo" name="Add_files"
                            style="width: 300px;" onclick="UpLoad_Document('AutorizacionDocumentos', 'fileupload', '2'); HabilitarControl();" />
                    </td>
                </tr>
            </table>

        </div>
        <div id="Div_BTN_Guardar" style="width: 100%; text-align: center; margin-top: 11px;">
            <input id="Btnguardar" type="button" value="Guardar" onclick="btnOk();" />
        </div>
    </div>


    <div id="Dialog_Dedos" title="Dedos Solicitados">
        <table style="width: 100%;" border="1">
             <tr>
                <td class="Label_Bold">Mano Izquierda
                </td>
                <td class="Label_Bold">Mano Derecha
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_PulgarIZ" value="PulI" />
                </td>
                <td class="Label_Bold">Pulgar
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_IndiceIZ" value="IndZ" />
                </td>
                <td class="Label_Bold">Indice
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_MedioIZ" value="MedI" />
                </td>
                <td class="Label_Bold">Dedo Medio
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Hacienda" value="AnuI" />
                </td>
                <td class="Label_Bold">Anular
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_MultiEmpresa" value="MeñI" />
                </td>
                <td class="Label_Bold">Meñique
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Empleado" value="EM" />
                </td>
                <td class="Label_Bold">Empleado
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Asesor" value="AS" />
                </td>
                <td class="Label_Bold">Asesor
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Proveedor" value="PR" />
                </td>
                <td class="Label_Bold">Proveedor
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_EntBancaria" value="EB" />
                </td>
                <td class="Label_Bold">Entidades Financieras / Aseguradoras / Fondos de Pensiones
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Visitante" value="EB" />
                </td>
                <td class="Label_Bold">Visitante
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_RepLegal" value="EB" />
                </td>
                <td class="Label_Bold">Representante Legal 
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Socio" value="EB" />
                </td>
                <td class="Label_Bold">Socio
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
    <div id="dialog_eliminar" title="Basic dialog">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold" id="P1">
                        Pulse Confirmar para cambiar el Estado al registro seleccionado.
                    </p>
                </td>
                <td>
                    <img alt="Warning_2" id="ImgDelete" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="BtnElimina();" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>

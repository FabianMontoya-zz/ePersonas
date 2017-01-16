<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Crud_Doc.aspx.vb" Inherits="PanelSeguridad.Crud_Doc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Crud_Doc.js" type="text/javascript"></script>
    <script src="Crud_DocTrasaccionsAjax.js" type="text/javascript"></script>
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
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" /> <meta http-equiv="Pragma" content="no-cache"/> <meta http-equiv="Expires" content="-1"/>
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
    <div id="Marco_Container">
        <div id="Marco_trabajo_Form">
            <div id="Container_controls">
                <div id="TablaDatos_D">
                    <table id="Tabla_1" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Multi - Empresa
                            </td>
                            <td>
                                <select id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Persona
                            </td>
                            <td>
                                <select id="Select_Persona" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 120px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEGOP"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Secuencia
                            </td>
                            <td>
                                <select id="Select_Secuencia" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEGOP"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_4" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Contrato
                            </td>
                            <td>
                                <select id="Select_Contrato" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEGOP"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_5" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Activos
                            </td>
                            <td>
                                <select id="Select_Activo" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                        src="../../images/error.png" />
                                    <span class="SpamEGOP"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_6" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Facturas
                            </td>
                            <td>
                                <select id="Select_Factura" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                        src="../../images/error.png" />
                                    <span class="SpamEGOP"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_7" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Documento
                            </td>
                            <td>
                                <select id="Select_Documento" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center" id="TD2">
                                <p>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center" id="TD_Button">
                                <input id="Btnguardar" type="button" value="Seguir" onclick="BtnCrear();" />
                            </td>
                        </tr>
                    </table>
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
    <div id="Dialog_Visor">
        <table id="Tabla_0" style="width: 700px; text-align: left;">
            <tr>
                <td style="width: 120px;" class="Label_Bold">Multi - Empresa
                </td>
                <td style="width: 300px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_EmpresaNit" readonly="readonly" style="width: 300px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 120px;" class="Label_Bold">Persona
                </td>
                <td style="width: 500px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Persona" readonly="readonly" style="width: 500px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 120px;" class="Label_Bold">Secuencia
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Secuencia" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="Tabla_s" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 110px;" class="Label_Bold">Contrato
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Contrato" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Activos
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Activo" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Facturas
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Factura" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 110px;" class="Label_Bold">Documento
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Documento" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <div id="Container_Vigencia">
            <table id="T_Vigencia" style="width: 700px; text-align: left;">
                <tr>
                    <td style="width: 160px;" class="Label_Bold">Fecha inicial
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input id="TxtFinicial" type="text" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_AF"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 80px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td style="width: 150px;" class="Label_Bold">Dias Vigencia
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="txt_DVigencia" style="width: 40px;" maxlength="5" class="Numeric" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td style="padding-bottom: 25px; width: 80px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td style="width: 150px;" class="Label_Bold">Fecha vencimiento
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input id="TxtFVencimiento" type="text" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_A_CC"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <table id="Table1" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 105px;" class="Label_Bold">Observaciones
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <textarea id="TxtA_Observacion" rows="1" cols="100"> </textarea>
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="TFile" style="width: 100%;">
            <tr>
                <td class="Label_Bold" style="width: 200px;">
                    <input id="fileupload" type="file" name="files[]" />
                    <a id="lnkAttch" style="cursor: pointer" onclick="AddFileInput(F1)" visible="false"></a>
                </td>
                <td style="width: 300px;">
                    <input id="Btncharge_file" type="button" value="Adjuntar un archivo" name="Add_files"
                        style="width: 200px;" onclick="UpLoad_Document('Crud_Doc', 'fileupload', '1'); HabilitarControl();" />
                </td>
            </tr>
        </table>
        <table style="width: 100%; height: 450px;">
            <tr>
                <td>
                    <iframe id="IF_Visor" src=""></iframe>
                </td>
            </tr>
        </table>
        <div id="D_Controls" style="text-align: center; width: 100%;">
            <table id="Controls">
                <tr>
                    <td colspan="4" align="center" id="TD1">
                        <input id="BtnGuardar" type="button" value="Guardar" onclick="BtnIngresar();" />
                        <input id="BtnRegresar" type="button" value="Regresar" onclick="BtnRegresar();" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</asp:Content>

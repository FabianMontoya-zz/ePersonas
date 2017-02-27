<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="AutorizacionDocumentos.aspx.vb" Inherits="PanelSeguridad.AutorizacionDocumentos" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="AutorizacionDocumentos.js" type="text/javascript"></script>
    <script src="AutorizacionDocumentosTrasaccionsAjax.js" type="text/javascript"></script>
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
    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%;">
            <div class="cssload-whirlpool"></div>
            <div>
                <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
            </div>
        </div>
    </div>
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
                            <td style="width: 150px;" class="Label_Bold">NIT Empresa
                            </td>
                            <td>
                                <select id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Estado
                            </td>
                            <td>
                                <select id="Select_Estado" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 250px; padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Tabla_7" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Documento
                            </td>
                            <td>
                                <select id="Select_Documento_V" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 200px; padding-bottom: 25px;"></td>
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
        <div id="container_Autorizacion">
        </div>
        <div id="Dialog_Visor_View_Validacion" style="text-align: center;">
            <table style="width: 100%; height: 400px;">
                <tr>
                    <td>
                        <iframe id="IF_Visor_D" src=""></iframe>
                    </td>
                </tr>
            </table>
            <table style="width: 100%;">
                <tr>
                    <td colspan="4" align="center" id="TD3">
                        <input id="Btn_G" type="button" value="Guardar" onclick="Add_Doc();" />
                        <input id="Btn_S" type="button" value="Regresar" onclick="CerrarDialogCap();" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div id="Dialog_Visor_View">
        <table style="width: 100%; height: 100%;">
            <tr>
                <td>
                    <iframe id="IF_Visor" src=""></iframe>
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Detalle_Document">
        <table style="width: 700px; text-align: left;">
            <tr>
                <td style="width: 100px;" class="Label_Bold">Nit Empresa
                </td>
                <td style="width: 300px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_MultiEmpresa_2" maxlength="20" readonly="readonly" style="width: 300px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Persona
                </td>
                <td style="width: 500px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Persona_2" maxlength="20" readonly="readonly" style="width: 500px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Secuencia
                </td>
                <td>
                    <span style="width: 200px;" class="cssToolTip_Form">
                        <input type="text" id="Vis_Secuencia_2" maxlength="20" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="Table1" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 120px;" class="Label_Bold">Contrato
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Contrato_2" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Activos
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Activo_2" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Facturas
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Factura_2" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 120px;" class="Label_Bold">Documento
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Documento_2" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table style="width: 900px; text-align: left; margin-left: 40px; margin-top: 40px;">
            <tr>
                <td style="width: 120px;" class="Label_Bold">Secuencia única
                </td>
                <td id="Vista_Secuencia" style="width: 70px;"></td>
                <td style="width: 100px;" class="Label_Bold">Documento
                </td>
                <td id="Vista_Documento" style="width: 200px;"></td>
                <td style="width: 70px;" class="Label_Bold">Formato
                </td>
                <td id="Vista_Formato" style="width: 180px;"></td>
            </tr>
        </table>
        <table style="width: 900px; text-align: left; margin-left: 40px;">
            <tr>
                <td style="width: 145px;" class="Label_Bold">Verificado
                </td>
                <td id="Vista_Verificado" style="width: 120px;" colspan="3"></td>
            </tr>
        </table>
        <table style="width: 800px; text-align: left; margin-left: 40px;">
            <tr>
                <td style="width: 65px;" class="Label_Bold">Usuario Verifico
                </td>
                <td id="Vista_Usuario_Verificado" style="width: 80px;"></td>
                <td style="width: 80px;" class="Label_Bold">Fecha verificacion
                </td>
                <td id="Vista_Fecha_Verificacion" style="width: 120px;"></td>
            </tr>
        </table>
        <table style="width: 500px; text-align: left; margin-left: 40px;">
            <tr>
                <td style="width: 180px;" class="Label_Bold">Observaciones Captura
                </td>
                <td id="Vista_ObsCaptura"></td>
            </tr>
            <tr>
                <td style="width: 180px;" class="Label_Bold">Observaciones Validación
                </td>
                <td id="Vista_ObsValida"></td>
            </tr>
            <tr>
                <td style="width: 180px;" class="Label_Bold">Indicativo foto
                </td>
                <td id="Vista_Indcativo"></td>
            </tr>
        </table>
        <table style="width: 800px; text-align: left; margin-left: 40px;">
            <tr>
                <td style="width: 200px;" class="Label_Bold">Fecha inicio vigencia
                </td>
                <td id="Vista_FechaIniVigen" style="width: 180px;"></td>
                <td style="width: 120px;" class="Label_Bold">Días vigencia
                </td>
                <td id="Vista_DiasVigen" style="width: 80px;"></td>
                <td style="width: 200px;" class="Label_Bold">Fecha vence vigencia
                </td>
                <td id="Vista_FechaVenceVigen" style="width: 180px;"></td>
            </tr>
            <tr>
                <td colspan="2" style="width: 180px;">
                    <p>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="10" style="width: 180px;">
                    <input id="BtnPadre" type="button" value="Ver Doc Padre" onclick="javascript: VerDocPadre();" />
                </td>
            </tr>
        </table>
        <div id="Footer_Det">
            <table style="width: 925px; text-align: left; margin-left: 40px;">
                <tr>
                    <td style="width: 180px;" colspan="2" class="Label_Bold">Usuario y Fecha de creación
                    </td>
                    <td style="width: 180px;" colspan="2" class="Label_Bold">Usuario y Fecha de Ultima Actualizacion
                    </td>
                </tr>
                <tr>
                    <td id="Vista_FechaCreacion" colspan="2" style="width: 180px;"></td>
                    <td id="Vista_FechaActualizacion" colspan="2" style="width: 180px;"></td>
                </tr>
            </table>
        </div>
    </div>
    <div id="Dialog_Ver_Anexos">
        <div id="container_TDoc_Anexos" style="margin-top: 10px; margin-bottom: 10px;">
        </div>
    </div>
    <div id="Dialog_Valida_Document">
        <table style="width: 700px; text-align: left;">
            <tr>
                <td style="width: 100px;" class="Label_Bold">Nit Empresa
                </td>
                <td style="width: 300px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_MultiEmpresa_3" maxlength="20" readonly="readonly" style="width: 300px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Persona
                </td>
                <td style="width: 500px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Persona_3" maxlength="20" readonly="readonly" style="width: 500px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Secuencia
                </td>
                <td>
                    <span style="width: 200px;" class="cssToolTip_Form">
                        <input type="text" id="Vis_Secuencia_3" maxlength="20" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="Tabla_A3" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 120px;" class="Label_Bold">Contrato
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Contrato_3" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Activos
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Activo_3" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="width: 110px;" class="Label_Bold">Facturas
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Factura_3" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 120px;" class="Label_Bold">Documento
                </td>
                <td style="width: 200px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Documento_3" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table style="width: 800px; text-align: left;">
            <tr>
                <td style="width: 300px;" class="Label_Bold">Resultado
                </td>
                <td style="width: 150px;">
                    <select id="Select_TVerificacion" class="C_Chosen">
                        <option value="-1">Seleccione...</option>
                        <option value="2">Verificado exitoso</option>
                        <option value="3">Verificado rechazado</option>
                    </select>
                </td>
                <td style="padding-bottom: 25px; width: 40px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
                <td style="width: 100px;" class="Label_Bold">Fecha de Validación
                </td>
                <td style="width: 80px;">
                    <span class="cssToolTip_Form">
                        <input id="TxtFVerificacion" type="text" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_AF"></span></span>
                </td>
                <td style="padding-bottom: 25px; width: 40px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 300px;" class="Label_Bold">Observación
                </td>
                <td style="width: 100px;" colspan="4">
                    <span class="cssToolTip_Form">
                        <textarea id="TxtA_Observacion" rows="1" cols="80"> </textarea>
                        <span class="Spam_ACI"></span></span>
                </td>
                <td style="padding-bottom: 25px; width: 50px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                            src="../../images/error.png" />
                        <span class="SpamEG"></span></span>
                </td>
            </tr>
        </table>
        <table style="width: 100%; height: 300px;">
            <tr>
                <td>
                    <iframe id="IF_Visor_View" src=""></iframe>
                </td>
            </tr>
        </table>
        <table id="Tabla_8" style="width: 700px; text-align: left;">
            <tr>
                <td style="width: 150px;" class="Label_Bold">Documento Verificación
                </td>
                <td>
                    <select id="Select_Doc_Verif" class="C_Chosen">
                    </select>
                </td>
                <td style="width: 200px; padding-bottom: 25px;"></td>
            </tr>
        </table>
        <table id="TFile" style="width: 100%;">
            <tr>
                <td class="Label_Bold" style="width: 200px;">
                    <input id="fileupload" type="file" name="files[]" />
                    <a id="lnkAttch" style="cursor: pointer" onclick="AddFileInput(F1)" visible="false"></a>
                </td>
                <td style="width: 300px;">
                    <input id="Btncharge_file" type="button" value="Adjuntar Documento de Respaldo" name="Add_files"
                        style="width: 300px;" onclick="UpLoad_Document('AutorizacionDocumentos', 'fileupload', '2'); HabilitarControl();" />
                </td>
            </tr>
        </table>
        <div id="container_TDoc_H" style="margin-top: 10px; margin-bottom: 10px;">
        </div>
        <div id="D_Controls" style="text-align: center; width: 100%;">
            <table id="Controls">
                <tr>
                    <td colspan="4" align="center" id="TD1">
                        <input id="BtnValidarDoc" type="button" value="Guardar" onclick="BtnIngresar();" />
                        <input id="BtnRegresar" type="button" value="Regresar" onclick="BtnRegresar();" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</asp:Content>

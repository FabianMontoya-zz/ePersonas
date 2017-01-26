<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Documento.aspx.vb" Inherits="PanelSeguridad.Documento" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Documento.js" type="text/javascript"></script>
    <script src="DocumentoTrasaccionsAjax.js" type="text/javascript"></script>
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
        <div id="Marco_btn_Form">
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnUpdate" type="button" value="Actualizar" onclick="HabilitarPanel('modificar');" />
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div id="Marco_trabajo_Form">
            <div id="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td id="TD1" style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td id="TD2" style="width: 65%;">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" style="width: 60%; margin-left: 10%;"/>
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td colspan="4" align="center" id="TD3" style="width: 20%;">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div id="container_TDocumento">
                            </div>
                        </td>
                    </tr>
                </table>
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
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="width: 900px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Documento
                            </td>
                            <td style="width: 110px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_ID" maxlength="10" class="Numeric_letter" style="width: 110px;" />
                                    <span class="Spam_ANL"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 191px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 102px;">Descripción
                            </td>
                            <td style="width: 250px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDescription" maxlength="50" style="width: 250px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 900px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Chequea Vigencia
                            </td>
                            <td style="width: 110px;">
                                <select id="Select_CheckVigencia" class="C_Chosen" style="width: 80px;">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                            <td style="width: 100px;" class="Label_Bold">Dias de Vigencia
                            </td>
                            <td style="width: 250px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDiaVigencia" maxlength="5" class="Numeric" style="width: 70px;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_4" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Tipo de Contenido
                            </td>
                            <td>
                                <select id="Select_TContenido" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="D">Digitalizado</option>
                                    <option value="M">Merche Con Modificación</option>
                                    <option value="S">Merche Sin Modificación</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Formato
                            </td>
                            <td>
                                <select id="Select_Formato" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Tipo de Versión
                            </td>
                            <td>
                                <select id="Select_TVersion" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="U">Unico Documento</option>
                                    <option value="H">Historico</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 300px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_5" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Ruta Documento
                            </td>
                            <td>
                                <select id="Select_RutaDocumento" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Ruta Plantilla
                            </td>
                            <td>
                                <select id="Select_RutaPlantilla" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 250px;"></td>
                        </tr>
                    </table>
                    <table id="Tabla_6" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Nombre Plantilla
                            </td>
                            <td style="width: 250px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtNamePlanilla" maxlength="50" style="width: 250px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Tabla_7" style="width: 900px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Requiere Verificación
                            </td>
                            <td style="width: 110px;">
                                <select id="Select_CheckVerificacion" class="C_Chosen" style="width: 80px;">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                            <td style="width: 100px;" class="Label_Bold">Indicativo Foto
                            </td>
                            <td style="width: 250px;">
                                <select id="Select_Foto" class="C_Chosen" style="width: 80px;">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center">
                                <p>
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" align="center">
                                <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="TablaDatos_D_Vista">
                    <table id="Table1" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">NIT Empresa
                            </td>
                            <td id="Con_EmpresaNit"></td>
                            <td style="padding-bottom: 25px; width: 250px;"></td>
                        </tr>
                    </table>
                    <table id="Table2" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 165px;" class="Label_Bold">Documento
                            </td>
                            <td id="Con_ID" style="width: 110px;"></td>
                            <td style="padding-bottom: 25px; width: 80px;"></td>
                            <td class="Label_Bold" style="width: 80px;">Descripción
                            </td>
                            <td id="Con_Description" style="width: 250px;"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Table3" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 115px;" class="Label_Bold">Chequea Vigencia
                            </td>
                            <td id="Con_CheckVigencia" style="width: 80px;"></td>
                            <td style="padding-bottom: 25px; width: 60px;"></td>
                            <td style="width: 100px;" class="Label_Bold">Dias de Vigencia
                            </td>
                            <td id="Con_DiaVigencia" style="width: 70px;"></td>
                            <td style="padding-bottom: 25px; width: 80px;"></td>
                        </tr>
                    </table>
                    <table id="Table4" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Tipo de Contenido
                            </td>
                            <td id="Con_TContenido"></td>
                            <td style="padding-bottom: 25px; width: 300px;"></td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Formato
                            </td>
                            <td id="Con_Formato"></td>
                            <td style="padding-bottom: 25px; width: 300px;"></td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Tipo de Versión
                            </td>
                            <td id="Con_TVersion"></td>
                            <td style="padding-bottom: 25px; width: 300px;"></td>
                        </tr>
                    </table>
                    <table id="Table5" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Ruta Documento
                            </td>
                            <td id="Con_RutaDocumento"></td>
                            <td style="padding-bottom: 25px; width: 250px;"></td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Ruta Plantilla
                            </td>
                            <td id="Con_RutaPlantilla"></td>
                            <td style="padding-bottom: 25px; width: 250px;"></td>
                        </tr>
                    </table>
                    <table id="Table6" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 150px;">Nombre Plantilla
                            </td>
                            <td id="Con_NamePlanilla" style="width: 250px;"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Table7" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 115px;" class="Label_Bold">Requiere Verificación
                            </td>
                            <td id="Con_CheckVerificacion" style="width: 80px;"></td>
                            <td style="padding-bottom: 25px; width: 60px;"></td>
                            <td style="width: 115px;" class="Label_Bold">Indicativo Foto
                            </td>
                            <td id="Con_Foto" style="width: 80px;"></td>
                            <td style="padding-bottom: 25px; width: 60px;"></td>
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
</asp:Content>

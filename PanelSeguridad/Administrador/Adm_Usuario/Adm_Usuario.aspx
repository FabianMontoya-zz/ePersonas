<%@ Page Title="Admon Usuarios - SASIF Personas" Language="vb" AutoEventWireup="false" MasterPageFile="~/Administrador/Sasif_menu.Master"
    CodeBehind="Adm_Usuario.aspx.vb" Inherits="PanelSeguridad.Adm_Usuario" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="Adm_Usuario.js" type="text/javascript"></script>
    <script src="Adm_UsuarioTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
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
    <div class="Container_title_Form">
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
    <div class="Marco_Container">

       <div class="Marco_btn_Form">
            <input id="BtnShearh" type="button" value="Consulta" onclick="HabilitarPanel('buscar');" />
            <input id="BtnCreate" type="button" value="Crear" onclick="HabilitarPanel('crear');" />
            <input id="BtnUpdate" type="button" value="Actualizar" onclick="HabilitarPanel('modificar');" />
        </div>

        <div class="Marco_trabajo_Form" style="height: 85%;">
            <div class="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td style="width: 65%;">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" style="width: 60%; margin-left: 10%;" />
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
                            <div id="container_TUser">
                            </div>
                        </td>
                    </tr>
                </table>
                <!-- Div que contiene todo el form de creación y actualización de usuario -->
                <div id="TablaDatos" style="width: 1080px;">
                    <table id="T_NIT" style="width: 100%;">
                        <tr>
                            <td id="TD_ID" style="width: 10.5%;" class="Label_Bold">NIT Empresa</td>
                            <td id="TD_TID" style="width: 40%; padding-left: 0.5em;">
                                <select style="width: 100%;" id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgNIT"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Usuario" style="width: 100%;" border="0">
                        <tr>
                            <td style="width: 10%;" class="Label_Bold">Usuario
                            </td>
                            <td style="width: 17%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_ID" maxlength="9" style="width: 100%;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 15%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 9.8%;" class="Label_Bold">Nombre
                            </td>
                            <td style="width: 27%;" id="TxtName"></td>
                            <td style="padding-bottom: 25px; width: 9%;"></td>
                        </tr>
                    </table>
                    <table id="T_Type_Document" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Tipo Documento
                            </td>
                            <td id="TD1" style="width: 40%; padding-left: 0.5em;">
                                <select id="Select_TypeDocument" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 10%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img_TypeDoc"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 10.5%;" class="Label_Bold">Documento
                            </td>
                            <td id="TD_Tdocument" style="width: 17%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDocument" maxlength="18" class="Numeric" style="width: 100%;" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 15%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgDoc"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_NIT_2" style="width: 100%;">
                        <tr>
                            <td style="width: 10.5%;" class="Label_Bold">NIT Rol</td>
                            <td style="width: 40%; padding-left: 0.5em;">
                                <select style="width: 100%;" id="Select_EmpresaNit_2" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgNIT_2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold" style="width: 11%;">Rol
                            </td>
                            <td id="TD_Trol" style="width: 40%;">
                                <select id="DDLRol" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 60%; padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgRol"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_AccesoInfo_PoliticSeguriGrupo" style="width: 100%;" border="0">
                        <tr>
                            <td class="Title_Bold" style="width: 10.5%;">POLITICAS
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 11%;" class="Label_Bold">Seguridad
                            </td>
                            <td style="width: 20%;">
                                <select id="Select_PoliticaSeguridad_U" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 80%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgPolSecurity"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Seguridad de Grupo
                            </td>
                            <td style="width: 34%;">
                                <select id="Select_PolSegurGrupo" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Empresa</option>
                                    <option value="1">1 - Área</option>
                                    <option value="2">2 - Cargo</option>
                                    <option value="3">3 - Persona</option>
                                    <option value="4">4 - Usuario</option>
                                    <option value="5">5 - Individual</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgPolSeguGrupo"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_PoliticaSeguridad" style="width: 100%;">
                        <tr>
                            <td class="Title_Bold" style="width: 150px;">ACCESOS
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">A Información
                            </td>
                            <td id="TD2" style="width: 20%; padding-left: 0.5em;">
                                <select id="Select_Acces_Information" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Toda</option>
                                    <option value="1">1 - Solo de Empresa</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 80%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgAccessInfo"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Acceso_Documents_InfoDocuments" style="width: 100%;" border="0">
                        <tr>
                            <td style="width: 11%;" class="Label_Bold">Información Documentos
                            </td>
                            <td style="width: 20%; padding-left: 0.2em;">
                                <select id="Select_AccesInfoDocument" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Toda</option>
                                    <option value="1">1 - Propia</option>
                                    <option value="2">2 - De la Empresa</option>
                                    <option value="3">3 - Empresa/Área</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 80%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgAccesInfoDocument"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">A Documentos
                            </td>
                            <td>
                                <select id="Select_AccessDocument" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Todos los Documentos</option>
                                    <option value="1">1 - Ningún Documento</option>
                                    <option value="2">2 - Permisos por Documentos (Solo parametrizados)</option>
                                    <option value="3">3 - Todos los Documentos (Excluyendo parametrizados)</option>
                                    <option value="4">4 - Grupo de Documentos</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgAccessDocuments"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_GrupoDocuments" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Grupo de Documentos
                            </td>
                            <td id="TD5" style="width: 40%; padding-left: 0.5em;">
                                <select id="Select_Grupo_Documentos_U" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgGroupDocuments"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Acceso_Reportes_InfoReportes" style="width: 100%;" border="0">
                        <tr>
                            <td style="width: 11%;" class="Label_Bold">Información Reportes
                            </td>
                            <td style="width: 20%; padding-left: 0.2em;">
                                <select id="SelectAccessInfoReports" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Toda</option>
                                    <option value="1">1 - Propia</option>
                                    <option value="2">2 - De la Empresa</option>
                                    <option value="3">3 - Empresa/Área</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 80%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgAccessInfoReports"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">A Reportes
                            </td>
                            <td>
                                <select id="Select_AccessReports" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Todos los Reportes</option>
                                    <option value="1">1 - Ningún Reporte</option>
                                    <option value="2">2 - Permisos por Reportes (Solo parametrizados)</option>
                                    <option value="3">3 - Todos los Reportes (Excluyendo parametrizados)</option>
                                    <option value="4">4 - Grupo de Reportes</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgAccessReports"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_GrupoReportes" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Grupo de Reportes
                            </td>
                            <td id="TD4" style="width: 40%; padding-left: 0.5em;">
                                <select id="Select_GroupReports" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 60%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgGroupReport"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_Token" style="width: 100%;">
                        <tr>
                            <td class="Label_Bold" style="width: 10.5%;">Número de Token
                            </td>
                            <td style="width: 30%; padding-left: 0.5em;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TXT_Token" class="Numeric_letter_Especial" maxlength="30" style="width: 100%;" />
                                    <span class="Spam_ANL"></span></span>
                            </td>
                            <td style="padding-bottom: 25px; width: 70%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgToken"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_TipoAcceso_Estado" style="width: 100%;" border="0">
                        <tr>
                            <td id="TD_TypeAcceso1" style="width: 10.5%;" class="Label_Bold">Tipo de Acceso
                            </td>
                            <td id="TD_TypeAcceso2" style="width: 18%; padding-left: 0.1em;">
                                <select id="Select_TypeAccess" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">1 - Todos</option>
                                    <option value="2">2 - Usuario y Contraseña</option>
                                    <option value="3">3 - Dactilar</option>
                                </select>
                            </td>
                            <td id="TD_TypeAcceso3" style="padding-bottom: 25px; width: 13%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgTypeAccess"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <!-- Solo se muestra cuando es Actualizar -->
                            <td id="TD_Estado1" class="Label_Bold" style="width: 6%;">Estado del Usuario
                            </td>
                            <td id="TD_Estado2" style="width: 20%;">
                                <select id="Select_EstadoUser" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="0">0 - Activo</option>
                                    <option value="1">1 - Inactivo</option>
                                    <option value="2">2 - Eliminado</option>
                                </select>
                            </td>
                            <td id="TD_Estado3" style="padding-bottom: 25px; width: 22%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgEstadoUser"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="T_BTNGuardar" style="width: 100%;" border="0">
                        <tr>
                            <td colspan="4" align="center">&nbsp;
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" align="center">
                                <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
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

    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%;">
            <div class="cssload-whirlpool"></div>
            <div>
                <img id="Sasif" class="Logo_3" src="../../images/SASIF_NEW_WHITE.png" alt="SASIF S.A.S." />
            </div>
        </div>
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
                    <img alt="Warning_2" id="ImgDelete" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input id="BtnElimin" type="button" value="Confirmar" onclick="Eliminar_Persona_Array();" />
                </td>
            </tr>
        </table>
    </div>
</asp:Content>

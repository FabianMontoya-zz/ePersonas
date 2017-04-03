<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Inf_Impuesto.aspx.vb" Inherits="PanelSeguridad.Inf_Impuesto" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Inf_Impuesto.js" type="text/javascript"></script>
    <script src="Inf_Impuesto_Cliente.js" type="text/javascript"></script>
    <script src="Inf_ImpuestoTrasaccionsAjax.js" type="text/javascript"></script>
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
    <%-- se crea ccs fijo por entar dentro de un dialog no se puede cambia de posicion --%>
    <style type="text/css">
        #DivCliente:hover .ImaClient {
            content: url("../../images/Cliente_Gray.png");
            cursor: pointer;
            cursor: hand; /*internet explorer*/
        }

        .ImaClient {
            content: url("../../images/Cliente_Red.png");
        }

         #DivPhone:hover .ImaPhone {
            content: url("../../images/Phone_Gray.png");
            cursor: pointer;
            cursor: hand; /*internet explorer*/
        }

        .ImaPhone{
            content: url("../../images/Phone_Red.png");
        }
    </style>
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
            <input id="BtnDelete" type="button" value="Eliminar" onclick="HabilitarPanel('eliminar');" />
        </div>
        <div class="Marco_trabajo_Form">
            <div class="Container_controls">
                <table id="TablaConsulta">
                    <tr>
                        <td id="TD1" style="width: 25%;">
                            <select id="DDLColumns" class="C_Chosen">
                            </select>
                        </td>
                        <td id="TD2" style="width: 65%;">
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
                            <div class="container_TGrid">
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="Dialog_Datos">
                    <table id="TablaPais" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 120px;">Pais
                            </td>
                            <td>
                                <select id="Select_Pais" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgID"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="TablaCiudad" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 120px;">Ciudad
                            </td>
                            <td>
                                <select id="Select_Ciudad" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="TablaImpuesto" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 120px;">Impuesto/Gasto
                            </td>
                            <td>
                                <select id="Select_Impuesto" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 300px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="TablaMuticliente" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Nit Empresa
                            </td>
                            <td>
                                <select id="Select_Cliente" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 160px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="TablaCliente" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Org. transito o Hacienda
                            </td>
                            <td>
                                <select id="Select_Cliente_H" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 120px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <div id="controls_X" style="width: 90%; text-align: center; margin: 20px;">
                        <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
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
    <div id="Dialog_Visualiza">
        <table id="D_Impuestos" style="width: 100%">
            <tr>
                <td class="Label_Bold">Pais
                </td>
                <td id="V_Pais"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Departamento
                </td>
                <td id="V_Ciudad"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Ciudad
                </td>
                <td id="V_Municipio"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Impuesto
                </td>
                <td id="V_Impuesto"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Nit Empresa
                </td>
                <td id="V_NitResponsable"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Org. transito o Hacienda
                </td>
                <td id="V_Cliente"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Tipo de Documento
                </td>
                <td id="V_TypeDocument"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Documento
                </td>
                <td id="V_Document"></td>
            </tr>
        </table>
        <table class="container_Grid_Flex">
            <tr>
                <td colspan="4" align="left">
                    <div id="DivCliente" onclick="javascript:ShearCliente('Nit','TD','D');">
                        <span class="cssToolTip_ver">
                            <img alt="Cliente" class="ImaClient" id="ImaClient" height="45px" width="45px" src="../../images/Cliente_Red.png" />
                            <span class="Spam_AT3"></span></span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_VisualizaCliente">
        <table id="D_Clientes_Z" style="width: 100%; padding-left: 20px;">
            <tr>
                <td class="Label_Bold" style="width: 130px;">Nit
                </td>
                <td id="V_Nit" style="width: 160px;"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Tipo de Documento
                </td>
                <td id="V_TDocumento"></td>
            </tr>
            <tr>
                <td class="Label_Bold">N° Documento
                </td>
                <td id="V_Documento"></td>
                <td class="Label_Bold" style="width: 60px;">Digito
                </td>
                <td id="V_Digito"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Empresa
                </td>
                <td id="V_Nombre" colspan="3"></td>
            </tr>
            <tr>
                <td class="Label_Bold">Ciudad
                </td>
                <td id="V_Municipio_2"></td>
            </tr>
        </table>
        <div id="Acordeon_Dat">
            <h3>Tipo Persona
            </h3>
            <div>
                <table>
                    <tr>
                        <td class="Label_Bold">Tipo Persona
                        </td>
                        <td id="V_TipoP" colspan="3"></td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">Regimen
                        </td>
                        <td id="V_Regimen"></td>
                    </tr>
                </table>
            </div>
            <h3>Relación
            </h3>
            <div>
                <table style="width: 100%; padding-left: 60px;">
                    <tr>
                        <td class="Label_Bold" style="width: 180px;">Cliente
                        </td>
                        <td id="V_Op_Cliente" style="width: 90px;"></td>
                        <td class="Label_Bold" style="width: 100px;">Avaluador
                        </td>
                        <td id="V_Op_Avaluador"></td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">Organismo de Transito
                        </td>
                        <td id="V_Op_Transito"></td>
                        <td class="Label_Bold">Hacienda
                        </td>
                        <td id="V_Op_Hacienda"></td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">Nit Multi-Empresa
                        </td>
                        <td id="V_Op_Empresa"></td>
                        <td class="Label_Bold">Empleado
                        </td>
                        <td id="V_Op_Empleado"></td>
                    </tr>
                    <tr>
                        <td class="Label_Bold">Asesor
                        </td>
                        <td id="V_Op_Asesor"></td>
                        <td class="Label_Bold">Otro
                        </td>
                        <td id="V_Op_Otro_1"></td>
                    </tr>
                </table>
            </div>
        </div>
        <table class="container_Grid_Flex">
            <tr>
                <td colspan="4" align="left">
                    <div id="DivPhone">
                        <span class="cssToolTip_ver"><a href="javascript:Direcciones('Read');">
                            <img alt="Direc" id="ImgPhone" class="ImaPhone" width="45px" height="45px" src="../../images/Phone_Red.png" /></a> <span class="Spam_AT1"></span></span>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Direcciones">
        <div id="Controls_direcciones" style="width: 100%; text-align: center; font: 12px/20px CenturyGothic,sans-serif;">
            <table style="width: 100%">
                <tr>
                    <td class="Label_Bold">Nit Empresa
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_Nit_V" maxlength="20" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                    <td class="Label_Bold">Tipo identificación
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_TypeIden_V" maxlength="20" readonly="readonly" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                    <td class="Label_Bold">Identificación
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_Ident_V" maxlength="20" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="container_direccion">
        </div>
    </div>
    <div id="Dialog_C_R_U_D">
        <table style="width: 100%; text-align: center; font: 12px/20px CenturyGothic,sans-serif;">
            <tr>
                <td class="Label_Bold">Nit Empresa
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_Nit_V_2" maxlength="20" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td class="Label_Bold">Tipo identificación
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_TypeIden_V_2" maxlength="20" readonly="readonly" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td class="Label_Bold">Identificación
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_Ident_V_2" maxlength="20" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="Tabla_Direccion">
            <tr>
                <td class="Label_Bold">Consecutivo
                </td>
                <td colspan="2">
                    <input type="text" id="TxtConsecutivo" maxlength="3" readonly="readonly" style="width: 30px;" />
                </td>
                <td class="Label_Bold" style="width: 180px;">Nombre de contacto
                </td>
                <td>
                    <input type="text" id="TxtContact" maxlength="50" />
                </td>
                <td style="width: 30px; padding-bottom: 25px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                            src="../../images/error.png" />
                        <span>Nombre de contacto Obligatorio</span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">Pagina Web
                </td>
                <td colspan="2">
                    <input type="text" id="TxtWeb" maxlength="70" />
                </td>
                <td class="Label_Bold">Dirección
                </td>
                <td>
                    <input type="text" id="TxtDireccion" maxlength="50" />
                </td>
                <td style="width: 30px; padding-bottom: 25px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img14"
                            src="../../images/error.png" />
                        <span>Dirección Obligatorio</span></span>
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">Telefono 1
                </td>
                <td colspan="2">
                    <input type="text" id="TxtTel1" maxlength="18" class="Numeric" />
                </td>
                <td class="Label_Bold">Telefono 2
                </td>
                <td>
                    <input type="text" id="TxtTel2" maxlength="18" class="Numeric" />
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">Telefono 3
                </td>
                <td colspan="2">
                    <input type="text" id="TxtTel3" maxlength="18" class="Numeric" />
                </td>
                <td class="Label_Bold">Telefono 4
                </td>
                <td>
                    <input type="text" id="TxtTel4" maxlength="18" class="Numeric" />
                </td>
            </tr>
            <tr>
                <td class="Label_Bold">Correo 1
                </td>
                <td>
                    <input type="text" id="TxtCorreo_1" maxlength="50" />
                </td>
                <td style="width: 30px; padding-bottom: 25px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img15"
                            src="../../images/error.png" />
                        <span>Correo_1 esta incorrecto revise si tiene @, y termina en una extencion con (.)</span></span>
                </td>
                <td class="Label_Bold">Correo 2
                </td>
                <td>
                    <input type="text" id="TxtCorreo_2" maxlength="50" />
                </td>
                <td style="width: 30px; padding-bottom: 25px;">
                    <span class="cssToolTip">
                        <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img16"
                            src="../../images/error.png" />
                        <span>Correo_" esta incorrecto revise si tiene @, y termina en una extencion con (.)</span></span>
                </td>
            </tr>
            <tr>
                <td colspan="6" align="center">&nbsp;
                </td>
            </tr>
        </table>
    </div>
</asp:Content>

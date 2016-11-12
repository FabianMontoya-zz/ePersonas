<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Fasecolda.aspx.vb" Inherits="PanelSeguridad.Fasecolda" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Fasecolda.js" type="text/javascript"></script>
    <script src="FasecoldaTrasaccionsAjax.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/charge.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Container_title_Form">
        <table id="Tabla_Title_form">
            <tr>
                <td id="Title_form">
                </td>
                <td id="image_exit">
                    <span class="cssToolTip_Form_L">
                        <input id="BtnExit" type="button" value="X" onclick="btnSalir();" /><span class="Spam_AEXIT_MOD"></span></span>
                </td>
            </tr>
        </table>
    </div>
    <div id="Marco_link">
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
                        <td id="TD1">
                            <select id="DDLColumns">
                            </select>
                        </td>
                        <td id="TD2">
                            <span class="cssToolTip_Form">
                                <input id="TxtRead" type="text" />
                                <span class="Spam_AST"></span></span>
                        </td>
                        <td colspan="4" align="center" id="TD3">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            &nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div id="container_TFasecolda">
                            </div>
                        </td>
                    </tr>
                </table>
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
                    <img alt="Warning" id="WE" src="../../images/alert.png" />
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
    <div id="Dialog_Fasecolda">
        <table id="TablaDatos">
            <tr>
                <td>
                    <table id="Tabla_1" style="width: 700px; margin-left: 100px;">
                        <tr style="height: 40px;">
                            <td class="Label_Bold" style="width: 100px;">
                                Codigo
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_ID" maxlength="5" class="Numeric" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img1"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 120px;">
                                Clase
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtDescripcion" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">
                                Marca
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtMarca" maxlength="50" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 70px;">
                                Linea
                            </td>
                            <td>
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtLinea" maxlength="200" />
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
                </td>
            </tr>
            <tr>
                <td>
                    <table id="Tabla_2" style="width: 700px; margin-left: 100px;">
                        <tr>
                            <td class="Label_Bold" style="width: 125px;">
                                Cilindraje
                            </td>
                            <td style="width: 100px;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtCilindraje" maxlength="6" class="Numeric" />
                                    <span class="Spam_AN"></span></span>
                            </td>
                            <td style="width: 40px; padding-bottom: 25px;">
                            </td>
                            <td class="Label_Bold" style="width: 180px;">
                                Borrado ó Modificado
                            </td>
                            <td align="center" style="width: 70px;">
                                <select id="Select_Estado" class="Select_tiny C_Chosen">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 225px">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <table id="Blo_Cuentas">
            <tr>
                <td colspan="25" align="center" class="Title_Bold">
                    Periodo
                </td>
            </tr>
            <tr>
                <td id="P_1" class="Label_Bold" align="center">
                </td>
                <td id="P_2" class="Label_Bold" align="center">
                </td>
                <td id="P_3" class="Label_Bold" align="center">
                </td>
                <td id="P_4" class="Label_Bold" align="center">
                </td>
                <td id="P_5" class="Label_Bold" align="center">
                </td>
                <td id="P_6" class="Label_Bold" align="center">
                </td>
                <td id="P_7" class="Label_Bold" align="center">
                </td>
                <td id="P_8" class="Label_Bold" align="center">
                </td>
                <td id="P_9" class="Label_Bold" align="center">
                </td>
            </tr>
            <tr>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_1" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_2" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_3" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_4" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_5" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_6" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_7" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_8" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_9" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
            </tr>
            <tr>
                <td id="P_10" class="Label_Bold" align="center">
                </td>
                <td id="P_11" class="Label_Bold" align="center">
                </td>
                <td id="P_12" class="Label_Bold" align="center">
                </td>
                <td id="P_13" class="Label_Bold" align="center">
                </td>
                <td id="P_14" class="Label_Bold" align="center">
                </td>
                <td id="P_15" class="Label_Bold" align="center">
                </td>
                <td id="P_16" class="Label_Bold" align="center">
                </td>
                <td id="P_17" class="Label_Bold" align="center">
                </td>
                <td id="P_18" class="Label_Bold" align="center">
                </td>
            </tr>
            <tr>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_10" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_11" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_12" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_13" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_14" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_15" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_16" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_17" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_18" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
            </tr>
            <tr>
                <td id="P_19" class="Label_Bold" align="center">
                </td>
                <td id="P_20" class="Label_Bold" align="center">
                </td>
                <td id="P_21" class="Label_Bold" align="center">
                </td>
                <td id="P_22" class="Label_Bold" align="center">
                </td>
                <td id="P_23" class="Label_Bold" align="center">
                </td>
                <td id="P_24" class="Label_Bold" align="center">
                </td>
                <td id="P_25" class="Label_Bold" align="center">
                </td>
            </tr>
            <tr>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_19" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_20" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_21" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_22" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_23" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_24" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="TxtYear_25" maxlength="12" style="width: 80px; text-align: center;"
                            onkeyup="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }"
                            onchange="var valida = dinner_format(this); if(valida == 1){ $('#dialog').dialog('option','title','Atencion!'); $('#Mensaje_alert').text('Solo se permiten numeros'); $('#dialog').dialog('open'); $('#DE').css('display','block'); }" />
                        <span class="Spam_AVal"></span></span>
                </td>
            </tr>
        </table>
        <div style="width: 100%; text-align: center; margin-top: 25px;">
            <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
        </div>
    </div>
    <div id="Dialog_Charge">
        <div class="cssload-circle">
            <div class="cssload-up">
                <div class="cssload-innera">
                </div>
            </div>
            <div class="cssload-down">
                <div class="cssload-innerb">
                </div>
            </div>
        </div>
        <h5 style="text-align: center;">
            Generando información espere un momento...</h5>
    </div>
</asp:Content>

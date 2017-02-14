<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Parametros/Sasif_menu.Master"
    CodeBehind="Cliente.aspx.vb" Inherits="PanelSeguridad.Cliente" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script src="../../SasifMaster.js" type="text/javascript"></script>
    <script src="../SasifMaster_Cosult.js" type="text/javascript"></script>
    <script src="Cliente.js" type="text/javascript"></script>
    <script src="ClienteTrasaccionsAjax.js" type="text/javascript"></script>
    <script src="Cliente_Validacion.js" type="text/javascript"></script>
    <script src="Cliente_Direccion.js" type="text/javascript"></script>
    <script src="Cliente_EntFinan.js" type="text/javascript"></script>
    <script src="Cliente_Documento.js" type="text/javascript"></script>
    <script src="Cliente_Matrix.js" type="text/javascript"></script>
    <link href="../../css/css_login.css" rel="stylesheet" type="text/css" />
    <link href="../../css/css_form.css" rel="stylesheet" type="text/css" />
    <link href="../../css/datatables/jquery.dataTables.css" rel="stylesheet" type="text/css" />
    <link href="../../css/Chosen/chosen.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/jquery.min.js" type="text/javascript"></script>
    <script src="../../Scripts/Chosen/chosen.jquery.js" type="text/javascript"></script>
    <link href="../../css/Dialog/jquery-ui-1.10.4.custom.css" rel="stylesheet" type="text/css" />
    <script src="../../Scripts/Dialog/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.dataTables.min.js" type="text/javascript"></script>
    <script src="../../Scripts/jquery.fileupload.js" type="text/javascript"></script>
    <link href="../../css/css_controles.css" rel="stylesheet" type="text/css" />
    <link href="../../css/custom/Control_Sasif.css" rel="stylesheet" type="text/css" />

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="main" runat="server">
    <div id="Dialog_Control" style="width: 100%; text-align: center;">
        <div class="cssload-container" style="margin-top: 25%">
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
            <div id="Admin_Anexos">
                <span id="T_option" class="T_options Label_Bold">Información Persona</span><a href="javascript:Complemento();">
                    <img alt="logo" title="" style="height: 38px; width: 38px; position: absolute; padding-left: 10px; padding-top: 15px; z-index: 90;"
                        id="Imglogo" src="../../images/logo.png" />
                </a>
                <div id="Container_Complementos">
                    <div id="DivA" class="Option_Cliente" onclick="javascript:BlockAnexos('Direcciones');">
                        <div class="C_Image">
                            <img alt="Direc" class="ImaAddress" id="Direccion" src="../../images/adress_book.png" height="35px"
                                width="35px" style="margin-top: 7px;" />
                        </div>
                        <div class="Spam_CT1 C_Text Label_Bold">
                        </div>
                    </div>
                    <div id="DivB" class="Option_Cliente" onclick="javascript:BlockAnexos('Banco');">
                        <div class="C_Image">
                            <img alt="Bank" class="ImaBank" id="Bancos" src="../../images/bank.png" height="40px" width="40px"
                                style="margin-top: 3px;" />
                        </div>
                        <div class="Spam_CT2 C_Text Label_Bold">
                        </div>
                    </div>
                    <div id="DivD" class="Option_Cliente" onclick="javascript:BlockAnexos('Documento');">
                        <div class="C_Image">
                            <img alt="Bank" class="ImaDoc" id="Documentos" src="../../images/documentos.png" height="35px" width="35px"
                                style="margin-top: 7px;" />
                        </div>
                        <div class="Spam_CT4 C_Text Label_Bold">
                        </div>
                    </div>
                </div>
            </div>
            <div id="Foto_Persona">
                <img alt="foto" title="" style="height: 120px; width: 100px; position: absolute; border-radius: 4px; border-color: #921919; border-width: 2px; border-style: outset;"
                    id="Imgfoto" src="../../images/avatar.png" />
            </div>
            <div id="Container_controls">
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
                        <td align="center" id="TD3" style="width: 20%;">
                            <input id="BtnRead" type="button" value="Buscar" onclick="BtnConsulta();" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">&nbsp;
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4">
                            <div id="container_TCliente">
                            </div>
                        </td>
                    </tr>
                </table>
                <div id="TablaDatos_D">
                    <table id="Tabla_1" style="width: 100%; text-align: left; margin-top: 5%">
                        <tr>
                            <td style="width: 15%;" class="Label_Bold">NIT Empresa
                            </td>
                            <td>
                                <select id="Select_EmpresaNit" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 50%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgMul"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_2" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 15%;" class="Label_Bold">Tipo identificación
                            </td>
                            <td>
                                <select id="Select_Documento" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 50%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img2"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_3" style="width: 100%; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 15%;">Pais
                            </td>
                            <td>
                                <select id="Select_Pais" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 30%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgPais"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Ciudad
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
                    <table id="Tabla_6" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 13.5%;" class="Label_Bold">Tipo Persona
                            </td>
                            <td align="center" style="width: 15%;">
                                <select id="Select_TPersona" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="1">Persona Natural</option>
                                    <option value="2">Persona Juridica</option>
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 5%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img9"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td style="width: 5%;" class="Label_Bold">Regimen
                            </td>
                            <td align="center" style="width: 25%;">
                                <select id="Select_Regimen" class="C_Chosen">
                                </select>
                            </td>
                            <td style="padding-bottom: 25px; width: 25%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img10"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_4" style="width: 100%; text-align: left;">
                        <tr>
                            <td id="TD_1" style="width: 13.5%;" class="Label_Bold">Identificación
                            </td>
                            <td id="TD_2" style="width: 10%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_Ident" maxlength="12" style="width: 110px;" class="Numeric" />
                                    <span class="Spam_A_NIT"></span></span>
                            </td>
                            <td id="TD_3" style="padding-bottom: 25px; width: 3%;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img3"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td id="TD_4" class="Label_Bold" style="width: 3%;">Digito
                            </td>
                            <td id="TD_5" style="width: 5%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtVerif" style="width: 50%;" maxlength="2" class="Numeric"
                                        readonly="readonly" />
                                    <span class="Spam_A_CC"></span></span>
                            </td>
                            <td id="TD_6" class="Label_Bold Desvanecer" style="width: 2%;">de
                            </td>
                            <td id="TD_7" class="Desvanecer" style="width: 35%;">
                                <select id="Select_Ciudad_Doc" class="C_Chosen" style="width: 80%;">
                                </select>
                            </td>
                            <td id="TD_8" style="padding-bottom: 25px; width: 15%;">
                                <span class="cssToolTip_L">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgC_Doc"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Table_5" style="width: 100%; text-align: left; margin-top: 1%;">
                        <tr id="TR_Nit">
                            <td id="TD4" class="Label_Bold " style="width: 17.7%;">Nombre
                            </td>
                            <td class="TD_2" style="width: 40%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtNombreNit" maxlength="50" style="width: 350px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 5%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img11"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td></td>
                            <td></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr class="Desvanecer TR_1">
                            <td class="Label_Bold TD_1" style="width: 15%;">Primer Nombre
                            </td>
                            <td class="TD_2" style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="TxtNombre" maxlength="50" style="width: 200px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 3%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img5"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold " style="width: 11%;">Segundo Nombre
                            </td>
                            <td>
                                <span class="cssToolTip_Form_L">
                                    <input type="text" id="TxtNombre_2" maxlength="50" style="width: 200px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 22%; padding-bottom: 25px;"></td>
                        </tr>
                        <tr class="Desvanecer TR_1">
                            <td class="Label_Bold" style="width: 15%;">Primer Apellido
                            </td>
                            <td style="width: 15%;">
                                <span class="cssToolTip_Form">
                                    <input type="text" id="Txt_Ape_1" maxlength="50" style="width: 200px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 3%; padding-bottom: 25px;"></td>
                            <td class="Label_Bold " style="width: 11%;">Segundo Apellido
                            </td>
                            <td>
                                <span class="cssToolTip_Form_L">
                                    <input type="text" id="Txt_Ape_2" maxlength="50" style="width: 200px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 22%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img19"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                        <tr class="Desvanecer TR_1">
                            <td class="Label_Bold" style="width: 15%">Fecha De Nacimiento
                            </td>
                            <td style="width: 15%">
                                <span class="cssToolTip_Form_L">
                                    <input type="text" id="Text_fechaNacimiento" maxlength="12" style="width: 150px;" />
                                    <span class="Spam_AST"></span></span>
                            </td>
                            <td style="width: 3%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img20"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                            <td class="Label_Bold" style="width: 11%">Sexo
                            </td>
                            <td>
                                <select id="Select_Sex" class="C_Chosen">
                                    <option value="-1">Seleccione...</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                    <option value="O">Otros</option>
                                </select>
                            </td>
                            <td style="width: 22%; padding-bottom: 25px;">
                                <span class="cssToolTip">
                                    <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img21"
                                        src="../../images/error.png" />
                                    <span class="SpamEG"></span></span>
                            </td>
                        </tr>
                    </table>
                    <table id="Tabla_8" style="width: 100%; text-align: left;">
                        <tr>
                            <td style="width: 15%" class="Label_Bold">Acceso al Sistema
                            </td>
                            <td style="width: 15%">
                                <select id="Select_Acceso" class="C_Chosen" style="width: 70px;">
                                    <option value="N">No</option>
                                    <option value="S">Si</option>
                                </select>
                            </td>
                            <td style="width: 3%;"></td>
                            <td style="width: 12%;" class="Label_Bold">Grupo Documentos
                            </td>
                            <td>
                                <select id="Select_GrpDocument" class="C_Chosen">
                                </select>
                            </td>
                            <td style="width: 20%;"></td>
                        </tr>
                    </table>
                    <table id="Tabla_9" style="width: 40%; text-align: center; margin-top: 2%; margin-left: 25%; border: solid 1px #921919; border-radius: 10px; padding-bottom: 1%; padding-top: 1%;">
                        <tr>
                            <td style="width: 50%;" class="Label_Bold">Tipo de Relación
                            </td>
                            <td style="width: 50%;">
                                <span class="cssToolTip_Form_L"><a href="javascript:BtnRelacion();">
                                    <img alt="error" title="" style="padding-left: 1em; height: 50px; width: 50px;" id="Imgrelations"
                                        src="../../images/Relations.gif" /></a> <span class="Spam_ARel"></span></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="TablaDatos_D_Vista" style="padding-top: 5%; padding-left: 10%;">
                    <table id="Table2" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Multi - Empresa
                            </td>
                            <td id="Con_EmpresaNit"></td>
                            <td style="padding-bottom: 25px; width: 180px;"></td>
                        </tr>
                    </table>
                    <table id="Table3" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Tipo identificación
                            </td>
                            <td id="Con_Documento"></td>
                            <td style="padding-bottom: 25px; width: 350px;"></td>
                        </tr>
                    </table>
                    <table id="Table4" style="width: 700px; text-align: left;">
                        <tr>
                            <td class="Label_Bold" style="width: 120px;">Pais
                            </td>
                            <td id="Con_Pais"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold">Ciudad
                            </td>
                            <td id="Con_Ciudad"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Table5" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Identificación
                            </td>
                            <td id="Con_Ident" style="width: 110px;"></td>
                            <td style="padding-bottom: 25px; width: 40px;"></td>
                            <td class="Label_Bold" style="width: 50px;">Digito
                            </td>
                            <td id="ConVerif"></td>
                            <td class="Label_Bold Desvanecer" style="width: 40px;">de
                            </td>
                            <td id="Con_Ciudad_Doc" class="Desvanecer" style="width: 200px;"></td>
                            <td style="padding-bottom: 25px; width: 40px;"></td>
                        </tr>
                    </table>
                    <table id="Table6" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Tipo Persona
                            </td>
                            <td id="Con_TPersona" align="center"></td>
                            <td style="padding-bottom: 25px; width: 400px;"></td>
                        </tr>
                    </table>
                    <table id="Table7" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Regimen
                            </td>
                            <td id="Con_Regimen" align="center"></td>
                            <td style="padding-bottom: 25px; width: 300px;"></td>
                        </tr>
                    </table>
                    <table id="Table8" style="width: 700px; text-align: left;">
                        <tr id="TR_Nit_C">
                            <td id="TD1" class="Label_Bold " style="width: 120px;">Nombre
                            </td>
                            <td id="ConNombreNit" class="TD_2" style="width: 150px;"></td>
                            <td style="width: 35px; padding-bottom: 25px;"></td>
                            <td></td>
                            <td></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr class="Desvanecer TR_1">
                            <td id="TD2" class="Label_Bold TD_1" style="width: 120px;">Primer Nombre
                            </td>
                            <td id="ConNombre" class="TD_2" style="width: 150px;"></td>
                            <td style="width: 35px; padding-bottom: 25px;"></td>
                            <td class="Label_Bold " style="width: 120px;">Segundo Nombre
                            </td>
                            <td id="ConNombre_2"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr class="Desvanecer TR_1">
                            <td class="Label_Bold" style="width: 120px;">Primer Apellido
                            </td>
                            <td id="Con_Ape_1" class="T120px"></td>
                            <td style="width: 35px; padding-bottom: 25px;"></td>
                            <td class="Label_Bold T120px" style="width: 120px;">Segundo Apellido
                            </td>
                            <td id="Con_Ape_2" class="T120px"></td>
                            <td style="padding-bottom: 25px;"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold" style="width: 15%">Fecha De Nacimiento
                            </td>
                            <td style="width: 15%" id="Con_fechaNacimiento"></td>
                            <td style="width: 3%; padding-bottom: 25px;"></td>
                            <td class="Label_Bold" style="width: 11%">Sexo
                            </td>
                            <td id="Con_Sex"></td>
                            <td style="width: 22%; padding-bottom: 25px;"></td>
                        </tr>
                    </table>
                    <table id="Table9" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Acceso al Sistema
                            </td>
                            <td id="Con_Acceso" style="width: 70px;"></td>
                            <td style="width: 122px;"></td>
                            <td style="width: 150px;" class="Label_Bold">Grupo de Documentos
                            </td>
                            <td id="Con_GrpDocument"></td>
                            <td style="width: 50px;"></td>
                        </tr>
                    </table>
                    <table id="C_MultiEmpresa" style="width: 100%">
                        <tr>
                            <td style="width: 200px;" class="Label_Bold">Codigo Unico Multi_Empresa
                            </td>
                            <td id="Con_Consecutivo"></td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                        </tr>
                    </table>
                    <table id="C_Banco_Vista" style="width: 100%">
                        <tr>
                            <td class="Label_Bold " style="width: 100px;">Codigo Banco
                            </td>
                            <td id="Con_CodBank"></td>
                            <td style="padding-bottom: 25px; width: 700px;"></td>
                        </tr>
                    </table>
                    <table id="C_Empleado_Vista" style="width: 100%">
                        <tr>
                            <td class="Label_Bold " style="width: 100px;">Área
                            </td>
                            <td id="Con_Area"></td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                        </tr>
                        <tr>
                            <td class="Label_Bold " style="width: 100px;">Cargo
                            </td>
                            <td id="Con_Cargo"></td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                        </tr>
                        <tr class="Empleado">
                            <td class="Label_Bold " style="width: 100px;">jefe Inmediato
                            </td>
                            <td id="Con_Jefe"></td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                        </tr>
                        <tr>
                            <td style="width: 150px;" class="Label_Bold">Politica de Seguridad
                            </td>
                            <td id="Con_Politica"></td>
                            <td style="padding-bottom: 25px; width: 200px;"></td>
                        </tr>
                    </table>
                    <table id="C_Socio_Vista" style="width: 100%">
                        <tr>
                            <td class="Label_Bold " style="width: 100px;">% Participación
                            </td>
                            <td id="Con_Por_Participacion"></td>
                            <td style="padding-bottom: 25px; width: 700px;"></td>
                        </tr>
                    </table>
                    <table id="Table10" style="width: 700px; text-align: left;">
                        <tr>
                            <td style="width: 120px;" class="Label_Bold">Tipo de Relación
                            </td>
                            <td style="width: 195px;">
                                <span class="cssToolTip_Form_L"><a href="javascript:BtnRelacion();">
                                    <img alt="error" title="" style="padding-left: 1em; height: 50px; width: 50px;" id="Img18"
                                        src="../../images/Relations.gif" /></a> <span class="Spam_ARel"></span></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <table id="Anexos">
                    <tr>
                        <td>
                            <table id="Tabla_TC" style="width: 100%">
                                <tr>
                                    <td align="center" class="Title_Bold" colspan="8">INFORMACIÓN ADICIONAL
                                    </td>
                                </tr>
                            </table>
                            <table id="C_Banco" style="width: 100%">
                                <tr>
                                    <td class="Label_Bold " style="width: 100px;">Codigo Banco
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="Txt_CodBank" style="width: 80px;" maxlength="3" class="Numeric" />
                                            <span class="Spam_AN"></span></span>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 700px;">
                                        <span class="cssToolTip">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img12"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                            </table>
                            <table id="C_Empleado" style="width: 100%">
                                <tr>
                                    <td class="Label_Bold " style="width: 100px;">Área
                                    </td>
                                    <td>
                                        <select id="Select_Area" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 200px;">
                                        <span class="cssToolTip">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img22"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="Label_Bold " style="width: 100px;">Cargo
                                    </td>
                                    <td>
                                        <select id="Select_Cargo" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 200px;">
                                        <span class="cssToolTip">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img23"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                                <tr class="Empleado">
                                    <td class="Label_Bold " style="width: 100px;">jefe Inmediato
                                    </td>
                                    <td>
                                        <select id="Select_Jefe" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 200px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 150px;" class="Label_Bold">Politica de Seguridad
                                    </td>
                                    <td>
                                        <select id="Select_Politica" class="C_Chosen">
                                        </select>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 200px;"></td>
                                </tr>
                            </table>
                            <table id="C_Socio" style="width: 100%">
                                <tr>
                                    <td class="Label_Bold " style="width: 100px;">% Participación
                                    </td>
                                    <td>
                                        <span class="cssToolTip_Form">
                                            <input type="text" id="TxtPor_Participacion" style="width: 50px;" maxlength="3" class="Numeric" />
                                            <span class="Spam_AN"></span></span>
                                    </td>
                                    <td style="padding-bottom: 25px; width: 700px;">
                                        <span class="cssToolTip">
                                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img24"
                                                src="../../images/error.png" />
                                            <span class="SpamEG"></span></span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table id="Controls">
                    <tr>
                        <td colspan="4" align="center" id="TD_Button">
                            <input id="Btnguardar" type="button" value="Guardar" onclick="BtnCrear();" />
                            <input id="BtnLimpiar" type="button" value="Limpiar" onclick="BtnLimpia();" />
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
    <div id="Dialog_Relation" title="Relaciones de la Persona">
        <table style="width: 100%; text-align: left; margin-top: 20px;">
            <tr>
                <td>
                    <input type="checkbox" id="Check_Cliente" value="CL" />
                </td>
                <td class="Label_Bold">Cliente
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Avaluador" value="AV" />
                </td>
                <td class="Label_Bold">Avaluador / Perito
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Transito" value="TR" />
                </td>
                <td class="Label_Bold">Organismos de Transito
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_Hacienda" value="HA" />
                </td>
                <td class="Label_Bold">Hacienda / Notaria / Entes Gubernamentales / Registro
                </td>
            </tr>
            <tr>
                <td>
                    <input type="checkbox" id="Check_MultiEmpresa" value="ME" />
                </td>
                <td class="Label_Bold">Multi - Empresa
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
    <div id="Dialog_Delete_Adress" title="Retirar Dirección?">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold">
                        Desea Retirar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="Img17" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <input id="BtnYes" type="button" value="Si" onclick="Confirm_Adress('Y');" />
                </td>
                <td align="center">
                    <input id="BtnNot" type="button" value="No" onclick="Confirm_Adress('N');" />
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Delete_Bank" title="Retirar Entidad Financiera?">
        <table style="width: 100%; text-align: center;">
            <tr>
                <td>
                    <p class="Label_Bold">
                        Desea Retirar el siguiente registro?
                    </p>
                </td>
                <td>
                    <img alt="Warning" id="ImgDB" src="../../images/alert.png" />
                </td>
            </tr>
            <tr>
                <td align="center">
                    <input id="BtnEntFinan_Y" type="button" value="Si" onclick="Confirm_Bank('Y');" />
                </td>
                <td align="center">
                    <input id="BtnEntFinan_N" type="button" value="No" onclick="Confirm_Bank('N');" />
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
        <div id="Div_Control_Save" style="width: 100%; text-align: center; margin-top: 25px; font: 12px/20px CenturyGothic,sans-serif;">
            <input id="BtnSave_Adress" type="button" value="Guardar" onclick="BtnSave_Adress_Client()" />
        </div>
    </div>
    <div id="Dialog_EntidadFinanciera">
        <div id="Div2" style="width: 100%; text-align: center; font: 12px/20px CenturyGothic,sans-serif;">
            <table style="width: 100%">
                <tr>
                    <td class="Label_Bold">Nit Empresa
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_Nit_B" maxlength="20" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                    <td class="Label_Bold">Tipo identificación
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_TypeIden_B" maxlength="20" readonly="readonly" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                    <td class="Label_Bold">Identificación
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="Txt_Ident_B" maxlength="20" readonly="readonly" style="width: 100px;" />
                            <span class="Spam_ACI"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div id="container_Bank">
        </div>
        <div id="Div4" style="width: 100%; text-align: center; margin-top: 25px; font: 12px/20px CenturyGothic,sans-serif;">
            <input id="BtnSave_Bank" type="button" value="Guardar" onclick="BtnSave_Bank_Client()" />
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
                    <span class="cssToolTip_Form_L">
                        <input type="text" id="Txt_Ident_V_2" maxlength="20" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <div id="Datos_Direc_D">
            <table id="Tabla_Info_Dic">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Consecutivo
                    </td>
                    <td colspan="2">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtConsecutivo" maxlength="3" readonly="readonly" style="width: 30px;" />
                            <span class="Spam_A_CC"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 200px;">Nombre de contacto
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtContact" maxlength="50" style="width: 200px;" />
                            <span class="Spam_AST"></span></span>
                    </td>
                    <td style="width: 30px; padding-bottom: 25px;">
                        <span class="cssToolTip_L   ">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img13"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_Ubic">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Pais
                    </td>
                    <td>
                        <select id="Select_Pais_D" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px;">
                        <span class="cssToolTip_L">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgPais_D"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
                <tr>
                    <td class="Label_Bold">Ciudad
                    </td>
                    <td>
                        <select id="Select_Ciudad_D" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px;">
                        <span class="cssToolTip_L">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="ImgCiudad"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_tipo" style="width: 100%; text-align: left; margin-top: 2%;">
                <tr>
                    <td style="width: 14%;" class="Label_Bold">Tipo Dirección
                    </td>
                    <td>
                        <select id="Select_TypeTel_1" class="C_Chosen" style="width: 80px;">
                            <option value="-1">Seleccione...</option>
                            <option value="C">Casa</option>
                            <option value="F">Oficina</option>
                            <option value="O">Otro</option>
                        </select>
                    </td>
                    <td style="width: 40%;"></td>
                </tr>
            </table>
            <table id="Tabla_Direccion">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Dirección
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtDireccion" style="width: 200px;" maxlength="50" readonly="readonly" />
                            <span class="Spam_A_Addres"></span></span>
                    </td>
                    <td style="width: 40px; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img14"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                    <td class="Label_Bold" style="width: 100px;">Pagina Web
                    </td>
                    <td colspan="2">
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtWeb" maxlength="70" style="width: 200px;" />
                            <span class="Spam_AST"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_Correo">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Correo 1
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtCorreo_1" maxlength="50" />
                            <span class="Spam_ACE_mail"></span></span>
                    </td>
                    <td style="width: 30px; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img15"
                                src="../../images/error.png" />
                            <span class="SpamEC"></span></span>
                    </td>
                    <td class="Label_Bold">Correo 2
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtCorreo_2" maxlength="50" />
                            <span class="Spam_ACE_mail"></span></span>
                    </td>
                    <td style="width: 30px; padding-bottom: 25px;">
                        <span class="cssToolTip_L">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img16"
                                src="../../images/error.png" />
                            <span class="SpamEC"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_Telefono" style="width: 100%; padding-left: 50px;">
                <tr align="left">
                    <td class="Label_Bold" style="width: 70px;"></td>
                    <td class="Label_Bold" style="width: 20px;">Ind.</td>
                    <td class="Label_Bold" style="width: 50px;">Tel. ó Cel</td>
                    <td class="Label_Bold" style="width: 0px;">Ext.</td>
                </tr>
                <tr>
                    <td class="Label_Bold" style="width: 50px;">Telefono 1
                    </td>

                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtInd1" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtTel1" maxlength="10" class="Numeric" style="width: 100px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtExt1" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                </tr>
                <tr>
                    <td class="Label_Bold" style="width: 50px;">Telefono 2
                    </td>

                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtInd2" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtTel2" maxlength="10" class="Numeric" style="width: 100px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form_L">
                            <input type="text" id="TxtExt2" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                </tr>
                <tr>
                    <td class="Label_Bold">Telefono 3
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtInd3" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtTel3" maxlength="10" class="Numeric" style="width: 100px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtExt3" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                </tr>
                <tr>
                    <td class="Label_Bold">Telefono 4
                    </td>

                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtInd4" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtTel4" maxlength="10" class="Numeric" style="width: 100px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                    <td>
                        <span class="cssToolTip_Form_L">
                            <input type="text" id="TxtExt4" maxlength="5" class="Numeric" style="width: 50px;" />
                            <span class="Spam_AN"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; text-align: center; margin-top: 20px;">
            <input id="BtnAdd" type="button" value="Agregar" onclick="BtnAdd()" />
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
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N1" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
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
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N2" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
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
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N3" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
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
                        <option value="Stand">Stand</option>
                    </select>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N4" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
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
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_N5" maxlength="4" class="Numeric" style="width: 40px" />
                        <span class="Spam_AN"></span></span>
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_Texto" maxlength="40" class="Letter" style="width: 200px" />
                        <span class="Spam_AWords"></span></span>
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
    <div id="Dialog_C_R_U_D_Bank">
        <table style="width: 100%; text-align: center; font: 12px/20px CenturyGothic,sans-serif;">
            <tr>
                <td class="Label_Bold">Nit Empresa
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_Nit_B_2" maxlength="20" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td class="Label_Bold">Tipo identificación
                </td>
                <td>
                    <span class="cssToolTip_Form">
                        <input type="text" id="Txt_TypeIden_B_2" maxlength="20" readonly="readonly" />
                        <span class="Spam_ACI"></span></span>
                </td>
                <td class="Label_Bold">Identificación
                </td>
                <td>
                    <span class="cssToolTip_Form_L">
                        <input type="text" id="Txt_Ident_B_2" maxlength="20" readonly="readonly" style="width: 100px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <div id="Datos_Bank_D">
            <table id="Tabla_1_Bank" style="width: 500px;">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Ent. Financiera
                    </td>
                    <td>
                        <select id="Select_EntFinanciera" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px;">
                        <span class="cssToolTip_L">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img6"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_2_Bank" style="width: 500px;">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">Tipo de Cuenta
                    </td>
                    <td>
                        <select id="Select_TipoCuenta" class="C_Chosen">
                        </select>
                    </td>
                    <td style="padding-bottom: 25px; width: 150px">
                        <span class="cssToolTip_L">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img7"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
            <table id="Tabla_3_Bank">
                <tr>
                    <td class="Label_Bold" style="width: 100px;">N° Cuenta
                    </td>
                    <td>
                        <span class="cssToolTip_Form">
                            <input type="text" id="TxtCuenta" style="width: 200px;" maxlength="20" class="Numeric_letter" />
                            <span class="Spam_ANL"></span></span>
                    </td>
                    <td style="width: 40px; padding-bottom: 25px;">
                        <span class="cssToolTip">
                            <img alt="error" title="" style="padding-left: 1em; height: 21px; width: 21px;" id="Img8"
                                src="../../images/error.png" />
                            <span class="SpamEG"></span></span>
                    </td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; text-align: center; margin-top: 20px;">
            <input id="BtnAddBank" type="button" value="Agregar" onclick="InsertAddBank()" />
        </div>
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
                    <input id="BtnPadre" type="button" value="Ver Doc Padre" onclick="VerDocPadre();" />
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
    <div id="Dialog_Documentos">
        <table style="width: 700px; text-align: left;">
            <tr>
                <td style="width: 100px;" class="Label_Bold">Nit Empresa
                </td>
                <td style="width: 300px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_MultiEmpresa" maxlength="20" readonly="readonly" style="width: 300px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Persona
                </td>
                <td style="width: 500px;">
                    <span class="cssToolTip_Form">
                        <input type="text" id="Vis_Persona" maxlength="20" readonly="readonly" style="width: 500px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
            <tr>
                <td style="width: 100px;" class="Label_Bold">Secuencia
                </td>
                <td>
                    <span style="width: 200px;" class="cssToolTip_Form">
                        <input type="text" id="Vis_Secuencia" maxlength="20" readonly="readonly" style="width: 200px;" />
                        <span class="Spam_ACI"></span></span>
                </td>
            </tr>
        </table>
        <table id="Tabla_s" style="width: 100%; text-align: left;">
            <tr>
                <td style="width: 120px;" class="Label_Bold">Contrato
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
        </table>
        <div id="container_Document">
        </div>
        <div id="Div6" style="width: 100%; text-align: center; margin-top: 25px; font: 12px/20px CenturyGothic,sans-serif;">
            <input id="BtnSave_Document" type="button" value="Guardar" onclick="BtnSave_Document_Client()" />
        </div>
    </div>
     <div id="Dialog_Visor">
        <table style="width: 100%; height: 100%;">
            <tr>
                <td>
                    <iframe id="IF_Visor" src=""></iframe>
                </td>
            </tr>
        </table>
    </div>
    <div id="Dialog_Ver_Anexos">
        <div id="container_TDoc_Anexos" style="margin-top: 10px; margin-bottom: 10px;">
        </div>
    </div>
    <div id="Dialog_Valida_Document"></div>
</asp:Content>

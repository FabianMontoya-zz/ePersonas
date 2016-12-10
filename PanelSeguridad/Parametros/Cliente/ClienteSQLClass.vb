Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class ClienteSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Cliente parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListCliente As New List(Of ClienteClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT CLI.CLI_Nit_ID, " & _
                        "       CLI.CLI_TypeDocument_ID, " & _
                        "       CLI.CLI_Document_ID, " & _
                        "       CLI.CLI_Digito_Verificacion, " & _
                        "       CLI.CLI_Nombre, " & _
                        "       CLI.CLI_Ciudad_ID, " & _
                        "       CLI.CLI_OP_Cliente, " & _
                        "       CLI.CLI_OP_Avaluador, " & _
                        "       CLI.CLI_OP_Transito, " & _
                        "       CLI.CLI_OP_Hacienda, " & _
                        "       CLI.CLI_OP_Empresa, " & _
                        "       CLI.CLI_OP_Empleado, " & _
                        "       CLI.CLI_OP_Asesor, " & _
                        "       CLI.CLI_Other_1, " & _
                        "       CLI.CLI_Other_2, " & _
                        "       CLI.CLI_FechaActualizacion, " & _
                        "       CLI.CLI_Usuario_Creacion, " & _
                        "       C.C_Descripcion, " & _
                        "       TD.TD_Descripcion, " & _
                        "       CLI.CLI_Pais_ID, " & _
                        "       P.P_Name, " & _
                        "       CLI.CLI_Nombre_2, " & _
                        "       CLI.CLI_Apellido_1, " & _
                        "       CLI.CLI_Apellido_2, " & _
                        "       CLI.CLI_Cod_Bank, " & _
                        "       CLI.CLI_DocCiudad, " & _
                        "       CLI.CLI_TipoPersona, " & _
                        "       CLI.CLI_Regimen, " & _
                        "       D1.DDLL_Descripcion AS DescripTPersona, " & _
                        "       D2.DDLL_Descripcion AS DescripRegimen, " & _
                        "       CLI.CLI_AccesoSistema, " & _
                        "       CLI.CLI_Area_ID, " & _
                        "       CLI.CLI_Cargo_ID, " & _
                        "       CLI.CLI_TypeDocument_ID_Jefe, " & _
                        "       CLI.CLI_Document_ID_Jefe, " & _
                        "       CLI.CLI_Politica_ID, " & _
                        "       CLI.CLI_FechaCreacion, " & _
                        "       CLI.CLI_Usuario_Actualizacion, " & _
                        "        A.A_Descripcion, " & _
                        "       CA.C_Descripcion, " & _
                        "        PO.PS_Descripcion, " & _
                        "       CLI.CLI_GrpDocumentos, " & _
                        "       CLI_2.CLI_Nombre, " & _
                        "       C2.C_Descripcion, " & _
                        "       CLI_3.CLI_Nombre + ' ' + CLI_3.CLI_Nombre_2 + ' ' + CLI_3.CLI_Apellido_1 + ' ' + CLI_3.CLI_Apellido_2, " & _
                        "      	GD.GD_Descripcion, " & _
                        "      	CLI.CLI_N_Consecutivo, " & _
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente,  " & _
                        "      	CLI.CLI_Sex, " & _
                        "      	CLI.CLI_FechaNacimiento, " & _
                        "       SEX.DDLL_Descripcion AS DescripSex, " & _
                         "      CLI.CLI_OP_Visitante, " & _
                        "       CLI.CLI_OP_Representante, " & _
                        "       CLI.CLI_OP_socio, " & _
                        "       CLI.CLI_Por_Participacion " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO SEX ON SEX.DDL_ID = CLI.CLI_Sex AND SEX.DDL_Tabla = 'SEXO' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = CLI.CLI_TypeDocument_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = CLI.CLI_TipoPersona AND D1.DDL_Tabla = 'TIPO_PERSONA' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = CLI.CLI_Regimen AND D2.DDL_Tabla = 'REGIMEN' " & _
                        " LEFT JOIN AREA A ON A.A_Area_ID = CLI.CLI_Area_ID AND  A.A_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN CARGO CA ON CA.C_Cargo_ID = CLI.CLI_Cargo_ID AND CA.C_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN " & BD_Admin & ".dbo.POLITICA_SEGURIDAD PO ON PO.PS_Politica_ID = CLI.CLI_Politica_ID " & _
                        " INNER JOIN CLIENTE CLI_2 ON CLI_2.CLI_Document_ID = SUBSTRING(CLI.CLI_Nit_ID,0,LEN(CLI.CLI_Nit_ID)) " & _
                        " LEFT JOIN CIUDADES C2 ON C2.C_Ciudad_ID = CLI.CLI_DocCiudad  " & _
                        " LEFT JOIN CLIENTE CLI_3 ON CLI_3.CLI_Document_ID = CLI.CLI_Document_ID_Jefe " & _
                        " LEFT JOIN " & BD_Documentos & ".dbo.GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = CLI.CLI_GrpDocumentos AND GD.GD_Nit_ID = CLI.CLI_Nit_ID ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT CLI.CLI_Nit_ID, " & _
                        "       CLI.CLI_TypeDocument_ID, " & _
                        "       CLI.CLI_Document_ID, " & _
                        "       CLI.CLI_Digito_Verificacion, " & _
                        "       CLI.CLI_Nombre, " & _
                        "       CLI.CLI_Ciudad_ID, " & _
                        "       CLI.CLI_OP_Cliente, " & _
                        "       CLI.CLI_OP_Avaluador, " & _
                        "       CLI.CLI_OP_Transito, " & _
                        "       CLI.CLI_OP_Hacienda, " & _
                        "       CLI.CLI_OP_Empresa, " & _
                        "       CLI.CLI_OP_Empleado, " & _
                        "       CLI.CLI_OP_Asesor, " & _
                        "       CLI.CLI_Other_1, " & _
                        "       CLI.CLI_Other_2, " & _
                        "       CLI.CLI_FechaActualizacion, " & _
                        "       CLI.CLI_Usuario_Creacion, " & _
                        "       C.C_Descripcion, " & _
                        "       TD.TD_Descripcion, " & _
                        "       CLI.CLI_Pais_ID, " & _
                        "       P.P_Name, " & _
                        "       CLI.CLI_Nombre_2, " & _
                        "       CLI.CLI_Apellido_1, " & _
                        "       CLI.CLI_Apellido_2, " & _
                        "       CLI.CLI_Cod_Bank, " & _
                        "       CLI.CLI_DocCiudad, " & _
                        "       CLI.CLI_TipoPersona, " & _
                        "       CLI.CLI_Regimen, " & _
                        "       D1.DDLL_Descripcion AS DescripTPersona, " & _
                        "       D2.DDLL_Descripcion AS DescripRegimen, " & _
                        "       CLI.CLI_AccesoSistema, " & _
                        "       CLI.CLI_Area_ID, " & _
                        "       CLI.CLI_Cargo_ID, " & _
                        "       CLI.CLI_TypeDocument_ID_Jefe, " & _
                        "       CLI.CLI_Document_ID_Jefe, " & _
                        "       CLI.CLI_Politica_ID, " & _
                        "       CLI.CLI_FechaCreacion, " & _
                        "       CLI.CLI_Usuario_Actualizacion, " & _
                        "        A.A_Descripcion, " & _
                        "       CA.C_Descripcion, " & _
                        "        PO.PS_Descripcion, " & _
                        "       CLI.CLI_GrpDocumentos, " & _
                        "       CLI_2.CLI_Nombre, " & _
                        "       C2.C_Descripcion, " & _
                        "       CLI_3.CLI_Nombre + ' ' + CLI_3.CLI_Nombre_2 + ' ' + CLI_3.CLI_Apellido_1 + ' ' + CLI_3.CLI_Apellido_2, " & _
                        "      	GD.GD_Descripcion, " & _
                        "      	CLI.CLI_N_Consecutivo, " & _
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente,  " & _
                        "      	CLI.CLI_Sex, " & _
                        "      	CLI.CLI_FechaNacimiento, " & _
                        "       SEX.DDLL_Descripcion AS DescripSex, " & _
                        "       CLI.CLI_OP_Visitante, " & _
                        "       CLI.CLI_OP_Representante, " & _
                        "       CLI.CLI_OP_socio, " & _
                        "       CLI.CLI_Por_Participacion " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO SEX ON SEX.DDL_ID = CLI.CLI_Sex AND SEX.DDL_Tabla = 'SEXO' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = CLI.CLI_TypeDocument_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = CLI.CLI_TipoPersona AND D1.DDL_Tabla = 'TIPO_PERSONA' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = CLI.CLI_Regimen AND D2.DDL_Tabla = 'REGIMEN' " & _
                        " LEFT JOIN AREA A ON A.A_Area_ID = CLI.CLI_Area_ID AND  A.A_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN CARGO CA ON CA.C_Cargo_ID = CLI.CLI_Cargo_ID AND CA.C_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN " & BD_Admin & ".dbo.POLITICA_SEGURIDAD PO ON PO.PS_Politica_ID = CLI.CLI_Politica_ID " & _
                        " INNER JOIN CLIENTE CLI_2 ON CLI_2.CLI_Document_ID = SUBSTRING(CLI.CLI_Nit_ID,0,LEN(CLI.CLI_Nit_ID)) " & _
                        " LEFT JOIN CIUDADES C2 ON C2.C_Ciudad_ID = CLI.CLI_DocCiudad  " & _
                        " LEFT JOIN CLIENTE CLI_3 ON CLI_3.CLI_Document_ID = CLI.CLI_Document_ID_Jefe " & _
                        " LEFT JOIN " & BD_Documentos & ".dbo.GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = CLI.CLI_GrpDocumentos  AND GD.GD_Nit_ID = CLI.CLI_Nit_ID ")
            Else
                sql.Append(" SELECT CLI.CLI_Nit_ID, " & _
                        "       CLI.CLI_TypeDocument_ID, " & _
                        "       CLI.CLI_Document_ID, " & _
                        "       CLI.CLI_Digito_Verificacion, " & _
                        "       CLI.CLI_Nombre, " & _
                        "       CLI.CLI_Ciudad_ID, " & _
                        "       CLI.CLI_OP_Cliente, " & _
                        "       CLI.CLI_OP_Avaluador, " & _
                        "       CLI.CLI_OP_Transito, " & _
                        "       CLI.CLI_OP_Hacienda, " & _
                        "       CLI.CLI_OP_Empresa, " & _
                        "       CLI.CLI_OP_Empleado, " & _
                        "       CLI.CLI_OP_Asesor, " & _
                        "       CLI.CLI_Other_1, " & _
                        "       CLI.CLI_Other_2, " & _
                        "       CLI.CLI_FechaActualizacion, " & _
                        "       CLI.CLI_Usuario_Creacion, " & _
                        "       C.C_Descripcion, " & _
                        "       TD.TD_Descripcion, " & _
                        "       CLI.CLI_Pais_ID, " & _
                        "       P.P_Name, " & _
                        "       CLI.CLI_Nombre_2, " & _
                        "       CLI.CLI_Apellido_1, " & _
                        "       CLI.CLI_Apellido_2, " & _
                        "       CLI.CLI_Cod_Bank, " & _
                        "       CLI.CLI_DocCiudad, " & _
                        "       CLI.CLI_TipoPersona, " & _
                        "       CLI.CLI_Regimen, " & _
                        "       D1.DDLL_Descripcion AS DescripTPersona, " & _
                        "       D2.DDLL_Descripcion AS DescripRegimen, " & _
                        "       CLI.CLI_AccesoSistema, " & _
                        "       CLI.CLI_Area_ID, " & _
                        "       CLI.CLI_Cargo_ID, " & _
                        "       CLI.CLI_TypeDocument_ID_Jefe, " & _
                        "       CLI.CLI_Document_ID_Jefe, " & _
                        "       CLI.CLI_Politica_ID, " & _
                        "       CLI.CLI_FechaCreacion, " & _
                        "       CLI.CLI_Usuario_Actualizacion, " & _
                        "        A.A_Descripcion, " & _
                        "       CA.C_Descripcion, " & _
                        "        PO.PS_Descripcion, " & _
                        "       CLI.CLI_GrpDocumentos, " & _
                        "       CLI_2.CLI_Nombre, " & _
                        "       C2.C_Descripcion, " & _
                        "       CLI_3.CLI_Nombre + ' ' + CLI_3.CLI_Nombre_2 + ' ' + CLI_3.CLI_Apellido_1 + ' ' + CLI_3.CLI_Apellido_2, " & _
                        "      	GD.GD_Descripcion, " & _
                        "      	CLI.CLI_N_Consecutivo, " & _
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente,  " & _
                        "      	CLI.CLI_Sex, " & _
                        "      	CLI.CLI_FechaNacimiento, " & _
                        "       SEX.DDLL_Descripcion AS DescripSex, " & _
                        "       CLI.CLI_OP_Visitante, " & _
                        "       CLI.CLI_OP_Representante, " & _
                        "       CLI.CLI_OP_socio, " & _
                        "       CLI.CLI_Por_Participacion " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO SEX ON SEX.DDL_ID = CLI.CLI_Sex AND SEX.DDL_Tabla = 'SEXO' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = CLI.CLI_TypeDocument_ID " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = CLI.CLI_TipoPersona AND D1.DDL_Tabla = 'TIPO_PERSONA' " & _
                        " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = CLI.CLI_Regimen AND D2.DDL_Tabla = 'REGIMEN' " & _
                        " LEFT JOIN AREA A ON A.A_Area_ID = CLI.CLI_Area_ID AND  A.A_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN CARGO CA ON CA.C_Cargo_ID = CLI.CLI_Cargo_ID AND CA.C_Nit_ID = CLI.CLI_Nit_ID" & _
                        " LEFT JOIN " & BD_Admin & ".dbo.POLITICA_SEGURIDAD PO ON PO.PS_Politica_ID = CLI.CLI_Politica_ID " & _
                        " LEFT JOIN CLIENTE CLI_2 ON CLI_2.CLI_Document_ID = SUBSTRING(CLI.CLI_Nit_ID,0,LEN(CLI.CLI_Nit_ID)) " & _
                        " LEFT JOIN CIUDADES C2 ON C2.C_Ciudad_ID = CLI.CLI_DocCiudad  " & _
                        " LEFT JOIN CLIENTE CLI_3 ON CLI_3.CLI_Document_ID = CLI.CLI_Document_ID_Jefe " & _
                        " LEFT JOIN " & BD_Documentos & ".dbo.GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = CLI.CLI_GrpDocumentos AND GD.GD_Nit_ID = CLI.CLI_Nit_ID " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListCliente = list(StrQuery, Conexion, "List")

        Return ObjListCliente

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo  Cliente (INSERT)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Insert(ByVal vp_O_Obj As ClienteClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        Dim Consecutivo As String = UpdateConsecutivoGenerico(vp_O_Obj.OP_Empresa)

        sql.AppendLine("INSERT CLIENTE (" & _
            " CLI_Nit_ID, " & _
            " CLI_TypeDocument_ID, " & _
            " CLI_Document_ID, " & _
            " CLI_Digito_Verificacion, " & _
            " CLI_Nombre, " & _
            " CLI_Nombre_2, " & _
            " CLI_Apellido_1, " & _
            " CLI_Apellido_2, " & _
            " CLI_Cod_Bank, " & _
            " CLI_DocCiudad, " & _
            " CLI_Pais_ID, " & _
            " CLI_Ciudad_ID, " & _
            " CLI_OP_Cliente, " & _
            " CLI_OP_Avaluador, " & _
            " CLI_OP_Transito, " & _
            " CLI_OP_Hacienda, " & _
            " CLI_OP_Empresa, " & _
            " CLI_OP_Empleado, " & _
            " CLI_OP_Asesor, " & _
            " CLI_Other_1, " & _
            " CLI_Other_2, " & _
            " CLI_TipoPersona, " & _
            " CLI_Regimen, " & _
            " CLI_AccesoSistema, " & _
            " CLI_Area_ID, " & _
            " CLI_Cargo_ID, " & _
            " CLI_TypeDocument_ID_Jefe, " & _
            " CLI_Document_ID_Jefe, " & _
            " CLI_Politica_ID, " & _
            " CLI_GrpDocumentos, " & _
            " CLI_N_Consecutivo, " & _
            " CLI_FechaNacimiento, " & _
            " CLI_Sex, " & _
            " CLI_OP_Visitante, " & _
            " CLI_OP_Representante, " & _
            " CLI_OP_socio, " & _
            " CLI_Por_Participacion, " & _
            " CLI_Usuario_Creacion, " & _
            " CLI_FechaCreacion, " & _
            " CLI_Usuario_Actualizacion, " & _
            " CLI_FechaActualizacion " & _
             ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_O_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Digito_Verificacion & "',")
        sql.AppendLine("'" & vp_O_Obj.Nombre & "',")
        sql.AppendLine("'" & vp_O_Obj.Nombre_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Apellido_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Apellido_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.Cod_Bank & "',")
        sql.AppendLine("'" & vp_O_Obj.DocCiudad & "',")
        sql.AppendLine("'" & vp_O_Obj.Pais_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Ciudad_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Cliente & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Avaluador & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Transito & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Hacienda & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Empresa & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Empleado & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Asesor & "',")
        sql.AppendLine("'" & vp_O_Obj.Other_1 & "',")
        sql.AppendLine("'" & vp_O_Obj.Other_2 & "',")
        sql.AppendLine("'" & vp_O_Obj.TipoPersona & "',")
        sql.AppendLine("'" & vp_O_Obj.Regimen & "',")
        sql.AppendLine("'" & vp_O_Obj.AccesoSistema & "',")
        sql.AppendLine("'" & vp_O_Obj.Area_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.Cargo_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.TypeDocument_ID_Jefe & "',")
        sql.AppendLine("'" & vp_O_Obj.Document_ID_Jefe & "',")
        sql.AppendLine("'" & vp_O_Obj.Politica_ID & "',")
        sql.AppendLine("'" & vp_O_Obj.GrpDocumentos & "',")
        sql.AppendLine("'" & Consecutivo & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaNacimiento & "',")
        sql.AppendLine("'" & vp_O_Obj.Sex & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Visitante & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Representante & "',")
        sql.AppendLine("'" & vp_O_Obj.OP_Socio & "',")
        sql.AppendLine("'" & vp_O_Obj.Por_Participacion & "',")
        sql.AppendLine("'" & vp_O_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_O_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_O_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Cliente (UPDATE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update(ByVal vp_O_Obj As ClienteClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine(" UPDATE CLIENTE SET " & _
                          " CLI_Nombre ='" & vp_O_Obj.Nombre & "', " & _
                          " CLI_Nombre_2 ='" & vp_O_Obj.Nombre_2 & "', " & _
                          " CLI_Apellido_1 ='" & vp_O_Obj.Apellido_1 & "', " & _
                          " CLI_Apellido_2 ='" & vp_O_Obj.Apellido_2 & "', " & _
                          " CLI_Cod_Bank ='" & vp_O_Obj.Cod_Bank & "', " & _
                          " CLI_DocCiudad ='" & vp_O_Obj.DocCiudad & "', " & _
                          " CLI_Pais_ID ='" & vp_O_Obj.Pais_ID & "', " & _
                          " CLI_Ciudad_ID ='" & vp_O_Obj.Ciudad_ID & "', " & _
                          " CLI_OP_Cliente ='" & vp_O_Obj.OP_Cliente & "', " & _
                          " CLI_OP_Avaluador ='" & vp_O_Obj.OP_Avaluador & "', " & _
                          " CLI_OP_Transito ='" & vp_O_Obj.OP_Transito & "', " & _
                          " CLI_OP_Hacienda ='" & vp_O_Obj.OP_Hacienda & "', " & _
                          " CLI_OP_Empresa ='" & vp_O_Obj.OP_Empresa & "', " & _
                          " CLI_OP_Empleado ='" & vp_O_Obj.OP_Empleado & "', " & _
                          " CLI_OP_Asesor ='" & vp_O_Obj.OP_Asesor & "', " & _
                          " CLI_Other_1 ='" & vp_O_Obj.Other_1 & "', " & _
                          " CLI_Other_2 ='" & vp_O_Obj.Other_2 & "', " & _
                          " CLI_TipoPersona ='" & vp_O_Obj.TipoPersona & "', " & _
                          " CLI_Regimen ='" & vp_O_Obj.Regimen & "', " & _
                          " CLI_AccesoSistema ='" & vp_O_Obj.AccesoSistema & "', " & _
                          " CLI_Area_ID ='" & vp_O_Obj.Area_ID & "', " & _
                          " CLI_Cargo_ID ='" & vp_O_Obj.Cargo_ID & "', " & _
                          " CLI_TypeDocument_ID_Jefe ='" & vp_O_Obj.TypeDocument_ID_Jefe & "', " & _
                          " CLI_Document_ID_Jefe ='" & vp_O_Obj.Document_ID_Jefe & "', " & _
                          " CLI_Politica_ID ='" & vp_O_Obj.Politica_ID & "', " & _
                          " CLI_GrpDocumentos ='" & vp_O_Obj.GrpDocumentos & "', " & _
                          " CLI_Sex ='" & vp_O_Obj.Sex & "', " & _
                          " CLI_FechaNacimiento ='" & vp_O_Obj.FechaNacimiento & "', " & _
                          " CLI_OP_Visitante ='" & vp_O_Obj.OP_Visitante & "', " & _
                          " CLI_OP_Representante ='" & vp_O_Obj.OP_Representante & "', " & _
                          " CLI_OP_socio ='" & vp_O_Obj.OP_Socio & "', " & _
                          " CLI_Por_Participacion ='" & vp_O_Obj.Por_Participacion & "', " & _
                          " CLI_Usuario_Actualizacion ='" & vp_O_Obj.UsuarioActualizacion & "', " & _
                          " CLI_FechaActualizacion ='" & vp_O_Obj.FechaActualizacion & "'" & _
                       " WHERE CLI_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CLI_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND CLI_Document_ID = '" & vp_O_Obj.Document_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Cliente (DELETE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Delete(ByVal vp_O_Obj As ClienteClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        Dim SQLDirecion As New DireccionesSQLClass
        Dim Objdireccion As New DireccionesClass
        Dim SQLBank As New Relaciones_FinancierasSQLClass
        Dim ObjBank As New Relaciones_FinancierasClass

        Objdireccion.Nit_ID = vp_O_Obj.Nit_ID
        ObjBank.Nit_ID = vp_O_Obj.Nit_ID

        Objdireccion.TypeDoc_ID = vp_O_Obj.TypeDocument_ID
        ObjBank.TypeDocument_ID = vp_O_Obj.TypeDocument_ID

        Objdireccion.Doc_ID = vp_O_Obj.Document_ID
        ObjBank.Document_ID = vp_O_Obj.Document_ID

        'Eliminamos las direcciones
        SQLDirecion.Delete_All(Objdireccion)

        'Eliminamos las Entidades Financieras
        SQLBank.Delete_All(ObjBank)

        sql.AppendLine(" DELETE CLIENTE " & _
                       " WHERE CLI_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CLI_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND CLI_Document_ID = '" & vp_O_Obj.Document_ID & "'")

        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListDocumento(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TD_ID_TDoc AS ID, CAST(TD_ID_TDoc AS NVARCHAR(15)) + ' - ' + TD_Descripcion AS Descripcion  FROM TC_TIPO_DOCUMENTO ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCliente(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT  CAST(CLI_Document_ID AS NVARCHAR(20)) + CAST(CLI_Digito_Verificacion AS NVARCHAR(3)) AS ID, CAST(CLI_Document_ID AS NVARCHAR(20)) + '_' + CAST(CLI_Digito_Verificacion AS NVARCHAR(3)) + ' - ' +  CLI_Nombre AS descripcion FROM CLIENTE WHERE CLI_OP_Empresa ='S' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListEntFinan(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT CLI_Document_ID AS ID, CAST(CLI_Document_ID AS NVARCHAR(20)) + ' - ' + CAST(CLI_TypeDocument_ID AS NVARCHAR(3)) + ' - ' +  CLI_Nombre AS descripcion FROM CLIENTE WHERE CLI_Other_2 = 'S' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTCuenta(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TC_ID AS ID,CAST(TC_ID AS NVARCHAR(15)) + ' - ' + TC_Descripcion AS DESCRIPCION FROM TIPOCUENTA ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListGrpDocumentos(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT GD_Grp_Documento_ID AS ID,CAST(GD_Grp_Documento_ID AS NVARCHAR(5)) + ' - ' + GD_Descripcion AS DESCRIPCION FROM GRUPO_DOCUMENTO " & _
                   " WHERE GD_Nit_ID ='" & vp_S_NitEmpresa & "'")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Cliente para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCliente As New List(Of ClienteClass)
        Dim ObjListDoc As New List(Of DocumentosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    If Not (IsDBNull(ReadConsulta.GetValue(0))) Then objCliente.Nit_ID = ReadConsulta.GetValue(0) Else objCliente.Nit_ID = ""
                    objCliente.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objCliente.Document_ID = ReadConsulta.GetValue(2)
                    objCliente.Digito_Verificacion = ReadConsulta.GetValue(3)
                    objCliente.Nombre = ReadConsulta.GetValue(4)
                    objCliente.Ciudad_ID = ReadConsulta.GetValue(5)
                    objCliente.OP_Cliente = ReadConsulta.GetValue(6)
                    objCliente.OP_Avaluador = ReadConsulta.GetValue(7)
                    objCliente.OP_Transito = ReadConsulta.GetValue(8)
                    objCliente.OP_Hacienda = ReadConsulta.GetValue(9)
                    objCliente.OP_Empresa = ReadConsulta.GetValue(10)
                    objCliente.OP_Empleado = ReadConsulta.GetValue(11)
                    objCliente.OP_Asesor = ReadConsulta.GetValue(12)

                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objCliente.Other_1 = ReadConsulta.GetValue(13) Else objCliente.Other_1 = "-1"
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objCliente.Other_2 = ReadConsulta.GetValue(14) Else objCliente.Other_2 = "-1"

                    objCliente.FechaActualizacion = ReadConsulta.GetValue(15)
                    objCliente.UsuarioCreacion = ReadConsulta.GetValue(16)
                    objCliente.DescripCiudad = ReadConsulta.GetValue(17)
                    objCliente.DescripTypeDocument = ReadConsulta.GetValue(18)

                    objCliente.Pais_ID = ReadConsulta.GetValue(19)
                    objCliente.DescripPais = ReadConsulta.GetValue(20)

                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objCliente.Nombre_2 = ReadConsulta.GetValue(21) Else objCliente.Nombre_2 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then objCliente.Apellido_1 = ReadConsulta.GetValue(22) Else objCliente.Apellido_1 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then objCliente.Apellido_2 = ReadConsulta.GetValue(23) Else objCliente.Apellido_2 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then objCliente.Cod_Bank = ReadConsulta.GetValue(24) Else objCliente.Cod_Bank = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then objCliente.DocCiudad = ReadConsulta.GetValue(25) Else objCliente.DocCiudad = 0

                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then objCliente.TipoPersona = ReadConsulta.GetValue(26) Else objCliente.TipoPersona = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then objCliente.Regimen = ReadConsulta.GetValue(27) Else objCliente.Regimen = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then objCliente.DescripTipoPersona = ReadConsulta.GetValue(28) Else objCliente.DescripTipoPersona = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then objCliente.DescripRegimen = ReadConsulta.GetValue(29) Else objCliente.DescripRegimen = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then objCliente.AccesoSistema = ReadConsulta.GetValue(30) Else objCliente.AccesoSistema = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then objCliente.Area_ID = ReadConsulta.GetValue(31) Else objCliente.Area_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(32))) Then objCliente.Cargo_ID = ReadConsulta.GetValue(32) Else objCliente.Cargo_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(33))) Then objCliente.TypeDocument_ID_Jefe = ReadConsulta.GetValue(33) Else objCliente.TypeDocument_ID_Jefe = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(34))) Then objCliente.Document_ID_Jefe = ReadConsulta.GetValue(34) Else objCliente.Document_ID_Jefe = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(35))) Then objCliente.Politica_ID = ReadConsulta.GetValue(35) Else objCliente.Politica_ID = 0

                    objCliente.FechaCreacion = ReadConsulta.GetValue(36)
                    objCliente.UsuarioActualizacion = ReadConsulta.GetValue(37)

                    If Not (IsDBNull(ReadConsulta.GetValue(38))) Then objCliente.DescripArea = ReadConsulta.GetValue(38) Else objCliente.DescripArea = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(39))) Then objCliente.DescripCargo = ReadConsulta.GetValue(39) Else objCliente.DescripCargo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(40))) Then objCliente.DescripSeguridad = ReadConsulta.GetValue(40) Else objCliente.DescripSeguridad = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(41))) Then objCliente.GrpDocumentos = ReadConsulta.GetValue(41) Else objCliente.GrpDocumentos = 0

                    If Not (IsDBNull(ReadConsulta.GetValue(42))) Then objCliente.DescripEmpresa = ReadConsulta.GetValue(42) Else objCliente.DescripEmpresa = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(43))) Then objCliente.DescripCiudadDoc = ReadConsulta.GetValue(43) Else objCliente.DescripCiudadDoc = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(44))) Then objCliente.DescripJefe = ReadConsulta.GetValue(44) Else objCliente.DescripJefe = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(45))) Then objCliente.DescripGrupoDocumentos = ReadConsulta.GetValue(45) Else objCliente.DescripGrupoDocumentos = ""

                    objCliente.Consecutivo = ReadConsulta.GetValue(46)
                    objCliente.Index = ReadConsulta.GetValue(47)

                    If Not (IsDBNull(ReadConsulta.GetValue(48))) Then objCliente.Sex = ReadConsulta.GetValue(48) Else objCliente.Sex = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(49))) Then objCliente.FechaNacimiento = ReadConsulta.GetValue(49) Else objCliente.FechaNacimiento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(50))) Then objCliente.DescripSexo = ReadConsulta.GetValue(50) Else objCliente.DescripSexo = ""

                    objCliente.OP_Visitante = ReadConsulta.GetValue(51)
                    objCliente.OP_Representante = ReadConsulta.GetValue(52)
                    objCliente.OP_Socio = ReadConsulta.GetValue(53)
                    If Not (IsDBNull(ReadConsulta.GetValue(54))) Then objCliente.Por_Participacion = ReadConsulta.GetValue(54) Else objCliente.Por_Participacion = 0

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "Matrix_Jefe"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    objCliente.Document_ID = ReadConsulta.GetValue(0)
                    objCliente.Nombre = ReadConsulta.GetValue(1)
                    objCliente.Nit_ID = ReadConsulta.GetValue(2)
                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "Matrix_GrpDoc"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentosClass
                    'cargamos datos sobre el objeto de login
                    obj.Document_ID = ReadConsulta.GetValue(0)
                    obj.namefile = ReadConsulta.GetValue(1)
                    obj.Nit_ID = ReadConsulta.GetValue(2)
                    'agregamos a la lista
                    ObjListDoc.Add(obj)

                End While

            Case "Matrix_Cliente_Dep"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    objCliente.Document_ID = ReadConsulta.GetValue(0)
                    objCliente.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objCliente.Nombre = ReadConsulta.GetValue(2)
                    objCliente.Nit_ID = ReadConsulta.GetValue(3)
                    objCliente.OP_Cliente = ReadConsulta.GetValue(4)
                    objCliente.OP_Avaluador = ReadConsulta.GetValue(5)
                    objCliente.OP_Transito = ReadConsulta.GetValue(6)
                    objCliente.OP_Hacienda = ReadConsulta.GetValue(7)
                    objCliente.OP_Empresa = ReadConsulta.GetValue(8)
                    objCliente.OP_Empleado = ReadConsulta.GetValue(9)
                    objCliente.OP_Asesor = ReadConsulta.GetValue(10)
                    objCliente.Other_1 = ReadConsulta.GetValue(11)
                    objCliente.Other_2 = ReadConsulta.GetValue(12)

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "DatosUsuario"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    objCliente.Nit_ID = ReadConsulta.GetValue(0)
                    objCliente.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objCliente.Document_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "Matrix_Pag_Acceso"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    objCliente.Nombre = ReadConsulta.GetValue(0)
                    objCliente.Area_ID = ReadConsulta.GetValue(1)
                    objCliente.Cargo_ID = ReadConsulta.GetValue(2)
                    objCliente.Nit_ID = ReadConsulta.GetValue(3)
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objCliente.DescripArea = ReadConsulta.GetValue(4) Else objCliente.DescripArea = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objCliente.DescripCargo = ReadConsulta.GetValue(5) Else objCliente.DescripCargo = ""
                    objCliente.DescripEmpresa = ReadConsulta.GetValue(6)
                    objCliente.TypeDocument_ID = ReadConsulta.GetValue(7)
                    objCliente.Document_ID = ReadConsulta.GetValue(8)
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objCliente.GrpDocumentos = ReadConsulta.GetValue(9) Else objCliente.GrpDocumentos = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objCliente.Tarjeta_ID = ReadConsulta.GetValue(10) Else objCliente.Tarjeta_ID = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objCliente.EstadoTarjeta = ReadConsulta.GetValue(11) Else objCliente.EstadoTarjeta = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objCliente.CheckVigencia_Tarjeta = ReadConsulta.GetValue(12) Else objCliente.CheckVigencia_Tarjeta = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objCliente.FechaVencimientoTarjeta = ReadConsulta.GetValue(13) Else objCliente.FechaVencimientoTarjeta = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objCliente.MotivoBloqueo = ReadConsulta.GetValue(14) Else objCliente.MotivoBloqueo = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objCliente.DescripMotivoBloqueo = ReadConsulta.GetValue(15) Else objCliente.DescripMotivoBloqueo = ""

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "Matrix_PersonasEmpleados"
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass
                    'cargamos datos sobre el objeto de login
                    objCliente.Nit_ID = ReadConsulta.GetValue(0)
                    objCliente.Nombre = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objCliente.Tipo_1 = ReadConsulta.GetValue(2) Else objCliente.Tipo_1 = ""
                    objCliente.Telefono_1 = ReadConsulta.GetValue(3)
                    objCliente.Telefono_2 = ReadConsulta.GetValue(4)
                    objCliente.Telefono_3 = ReadConsulta.GetValue(5)
                    objCliente.Telefono_4 = ReadConsulta.GetValue(6)
                    objCliente.Correo_1 = ReadConsulta.GetValue(7)
                    objCliente.Correo_2 = ReadConsulta.GetValue(8)

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

            Case "Matrix_Personas_Documentos"
                While ReadConsulta.Read
                    Dim obj As New DocumentosClass

                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.TypeDocument_ID = ReadConsulta.GetValue(1)
                    obj.Document_ID = ReadConsulta.GetValue(2)

                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.GrpDocumentos_ID = ReadConsulta.GetValue(3) Else obj.GrpDocumentos_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then obj.Documento_ID = ReadConsulta.GetValue(4) Else obj.Documento_ID = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then obj.Descripcion = ReadConsulta.GetValue(5) Else obj.Descripcion = 0

                    'agregamos a la lista
                    ObjListDoc.Add(obj)

                End While

            Case "Matrix_Personas_Direcciones"
                While ReadConsulta.Read

                    Dim objCliente As New ClienteClass

                    objCliente.Nit_ID = ReadConsulta.GetValue(0)
                    objCliente.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objCliente.Document_ID = ReadConsulta.GetValue(2)
                    objCliente.Digito_Verificacion = ReadConsulta.GetValue(3)

                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objCliente.Nombre = ReadConsulta.GetValue(4) Else objCliente.Nombre = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objCliente.Nombre_2 = ReadConsulta.GetValue(5) Else objCliente.Nombre_2 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objCliente.Apellido_1 = ReadConsulta.GetValue(6) Else objCliente.Apellido_1 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objCliente.Apellido_2 = ReadConsulta.GetValue(7) Else objCliente.Apellido_2 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objCliente.Ciudad_ID = ReadConsulta.GetValue(8) Else objCliente.Ciudad_ID = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objCliente.PaginaWeb = ReadConsulta.GetValue(9) Else objCliente.PaginaWeb = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objCliente.Direccion = ReadConsulta.GetValue(10) Else objCliente.Direccion = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objCliente.Telefono_1 = ReadConsulta.GetValue(11) Else objCliente.Telefono_1 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objCliente.Telefono_2 = ReadConsulta.GetValue(12) Else objCliente.Telefono_2 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objCliente.Telefono_3 = ReadConsulta.GetValue(13) Else objCliente.Telefono_3 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objCliente.Telefono_4 = ReadConsulta.GetValue(14) Else objCliente.Telefono_4 = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objCliente.Correo_1 = ReadConsulta.GetValue(15) Else objCliente.Correo_1 = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objCliente.Correo_2 = ReadConsulta.GetValue(16) Else objCliente.Correo_2 = ""

                    objCliente.Index_Direccion = ReadConsulta.GetValue(17)

                    'agregamos a la lista
                    ObjListCliente.Add(objCliente)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta

        Select Case vp_S_TypeList

            Case "Matrix_Personas_Documentos"
                Return ObjListDoc
            Case "Matrix_GrpDoc"
                Return ObjListDoc

            Case Else
                Return ObjListCliente
        End Select

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' CONSULTA EL CONSECUTIVO UNICO POR MULTIEMPRESA Y LO ACTUALIZA
    ''' </summary>
    ''' <param name="vp_S_Consecutivo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateConsecutivoGenerico(ByVal vp_S_Consecutivo As String)

        Dim StrQuery As String = ""

        Dim conex As New Conector

        Dim Consecutivo As Integer = 0
        Dim New_Consecutivo As Integer

        Dim sql As New StringBuilder

        If vp_S_Consecutivo = "S" Then
            'consultamos
            sql.AppendLine(" SELECT  CG_Consecutivo FROM CONSECUTIVOS_GENERAL WHERE CG_Consecutivo_ID = '1'")
            StrQuery = sql.ToString
            Consecutivo = conex.IDis(StrQuery, "3")

            New_Consecutivo = Consecutivo + 1

            sql = New StringBuilder()
            'actualizamos
            sql.AppendLine(" UPDATE CONSECUTIVOS_GENERAL SET CG_Consecutivo = '" & New_Consecutivo & "' WHERE CG_Consecutivo_ID = '1'")
            StrQuery = sql.ToString

            Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "3")

        End If
        Return Consecutivo

    End Function

    ''' <summary>
    ''' creala consulta para del Cliente seleccionado (READ)
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDocument"></param>
    ''' <param name="vp_S_Document"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Client(ByVal vp_S_Nit As String, ByVal vp_S_TypeDocument As String, ByVal vp_S_Document As String)

        Dim ObjListCliente As New List(Of ClienteClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT CLI_Nit_ID, " & _
                    " CLI_TypeDocument_ID, " & _
                    " CLI_Document_ID, " & _
                    " CLI_Digito_Verificacion, " & _
                    " CLI_Nombre, " & _
                    " CLI_Ciudad_ID, " & _
                    " CLI_OP_Cliente, " & _
                    " CLI_OP_Avaluador, " & _
                    " CLI_OP_Transito, " & _
                    " CLI_OP_Hacienda, " & _
                    " CLI_OP_Empresa, " & _
                    " CLI_OP_Empleado, " & _
                    " CLI_OP_Asesor, " & _
                    " CLI_Other_1, " & _
                    " CLI_Other_2, " & _
                    " CLI_FechaActualizacion, " & _
                    " CLI_Usuario_Creacion, " & _
                    " C.C_Descripcion, " & _
                    " TD.TD_Descripcion, " & _
                    " CLI_Pais_ID, " & _
                    " P.P_Name, " & _
                    " CLI_Nombre_2, " & _
                    " CLI_Apellido_1, " & _
                    " CLI_Apellido_2, " & _
                    " CLI_Cod_Bank, " & _
                    " CLI_DocCiudad " & _
                " FROM CLIENTE CLI " & _
                " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
                " INNER JOIN M_SEGURIDAD.dbo.TC_TIPO_DOCUMENTO TD ON TD.TD_ID_TDoc = CLI.CLI_TypeDocument_ID " & _
                " WHERE CLI_Nit_ID = '" & vp_S_Nit & "' " & _
                " AND CLI_TypeDocument_ID = '" & vp_S_TypeDocument & "'" & _
                " AND CLI_Document_ID = '" & vp_S_Document & "'")

        StrQuery = sql.ToString

        ObjListCliente = list(StrQuery, Conexion, "List")

        Return ObjListCliente

    End Function

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As ClienteClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CLIENTE " & _
                       " WHERE CLI_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CLI_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND CLI_Document_ID = '" & vp_O_Obj.Document_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Jefe
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Jefe()

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT CLI_Document_ID AS ID,CAST(CLI_TypeDocument_ID AS NVARCHAR(3)) + ' - ' +  CAST(CLI_Document_ID AS NVARCHAR(20)) + ' - ' +  CLI_Nombre + ' ' + CLI_Nombre_2 + ' ' + CLI_Apellido_1 + ' ' +  CLI_Apellido_2 AS Descripcion, CLI_Nit_ID FROM CLIENTE  " & _
                   " WHERE CLI_OP_Empleado = 'S' ORDER BY CLI_Document_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Jefe")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee la matriz de Grupo documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_GrpDocumentos()

        Dim ObjList As New List(Of DocumentosClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.Append("  SELECT GD_Grp_Documento_ID AS ID,CAST(GD_Grp_Documento_ID AS NVARCHAR(5)) + ' - ' + GD_Descripcion AS DESCRIPCION, GD_Nit_ID FROM GRUPO_DOCUMENTO  " & _
                                "  ORDER BY GD_Grp_Documento_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_GrpDoc")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee la matriz de cliente datos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_PersonasDep()

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append("  SELECT CLI_Document_ID,  " & _
                                "             CLI_TypeDocument_ID, " & _
                                "             CAST(CLI_Document_ID AS NVARCHAR(20)) + '  -  ' +  " & _
                                "             CAST(CLI_TypeDocument_ID AS NVARCHAR(2)) + '  -  ' + " & _
                                "             CLI_Nombre + ' ' +  " & _
                                "             CASE  WHEN  CLI_Nombre_2  IS NULL THEN ''  ELSE CLI_Nombre_2 END  + ' ' + " & _
                                "             CASE  WHEN  CLI_Apellido_1  IS NULL THEN ''  ELSE CLI_Apellido_1 END  + ' ' + " & _
                                "             CASE  WHEN  CLI_Apellido_2  IS NULL THEN ''  ELSE CLI_Apellido_2 END AS DESCRIPCION, " & _
                                "             CLI_Nit_ID,  " & _
                                "             CLI_OP_Cliente,  " & _
                                "             CLI_OP_Avaluador,  " & _
                                "             CLI_OP_Transito,  " & _
                                "             CLI_OP_Hacienda,  " & _
                                "             CLI_OP_Empresa,  " & _
                                "             CLI_OP_Empleado,  " & _
                                "             CLI_OP_Asesor,  " & _
                                "             CLI_Other_1,  " & _
                                "             CLI_Other_2  " & _
                                "  FROM CLIENTE  ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Cliente_Dep")

        Return ObjList

    End Function

    ''' <summary>
    ''' Consuta usuario cliente
    ''' </summary>
    ''' <param name="vp_S_Usuario"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InformacionUsuario(ByVal vp_S_Usuario As String)

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append("  SELECT CLI_Nit_ID,  " & _
                                "                 CLI_TypeDocument_ID, " & _
                                "                 CLI_Document_ID " & _
                                "  FROM CLIENTE C " & _
                                "  INNER JOIN " & BD_Admin & ".dbo.USUARIOS U ON U.U_Documento = C.CLI_Document_ID  " & _
                                "  WHERE  U.U_Usuario_ID = '" & vp_S_Usuario & "'")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "DatosUsuario")

        Return ObjList
    End Function

    ''' <summary>
    ''' lee matrix para pagina de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_DatosPagAcceso()

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append("  SELECT C.CLI_Nombre +' '+ C.CLI_Nombre_2 +' '+ C.CLI_Apellido_1 +' '+ C.CLI_Apellido_2 AS NOMBRE,  " & _
                               "                  C.CLI_Area_ID, " & _
                               "                  C.CLI_Cargo_ID, " & _
                               "                  C.CLI_Nit_ID, " & _
                               "                  A.A_Descripcion, " & _
                               "                  CAR.C_Descripcion, " & _
                               "                  C2.CLI_Nombre +' '+ C2.CLI_Nombre_2 +' '+ C2.CLI_Apellido_1 +' '+ C2.CLI_Apellido_2 AS EMPRESA, " & _
                               "                  C.CLI_TypeDocument_ID, " & _
                               "                  C.CLI_Document_ID, " & _
                               "                  C.CLI_GrpDocumentos, " & _
                               "                  IT.IT_Tarjeta_ID, " & _
                               "                  IT.IT_Estado, " & _
                               "                  IT.IT_ChequeaVigencias, " & _
                               "                  IT.IT_Fecha_Fin_Vigencia, " & _
                               "                  IT.IT_MotivoBloqueo, " & _
                               "                  DDL.DDLL_Descripcion " & _
                               "  FROM CLIENTE C " & _
                               "  LEFT JOIN AREA A  ON A.A_Area_ID = C.CLI_Area_ID " & _
                               "  LEFT JOIN CARGO CAR ON CAR.C_Cargo_ID = C.CLI_Cargo_ID " & _
                               "  LEFT JOIN  " & BD_Admin & ".dbo.INVENTARIO_TARJETAS IT ON IT.IT_TypeDocument_Asigna = C.CLI_TypeDocument_ID AND IT.IT_Document_ID_Asigna =C.CLI_Document_ID " & _
                               "  LEFT JOIN  " & BD_Admin & ".dbo.TC_DDL_TIPO DDL ON DDL.DDL_ID = IT.IT_MotivoBloqueo AND DDL.DDL_Tabla = 'BLOQUEO'  " & _
                               "  LEFT JOIN CLIENTE C2 ON C2.CLI_Document_ID = " & _
                               "                      CASE	 SUBSTRING(C.CLI_Nit_ID,0,LEN(C.CLI_Nit_ID)) " & _
                               "                                     WHEN '' THEN 0 " & _
                               "                                     ELSE SUBSTRING(C.CLI_Nit_ID,0,LEN(C.CLI_Nit_ID)) " & _
                               "                      END  ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Pag_Acceso")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee matrix para pagina de acceso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_DatosEmpleados(ByVal vp_S_NitEmpresa As String)

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT    CLI_Nit_ID, " & _
                                "                   CLI_Nombre + ' ' + " & _
                                "                   CASE  WHEN  CLI_Nombre_2  IS NULL THEN ''  ELSE CLI_Nombre_2 END  + ' ' +  " & _
                                "   				CASE  WHEN  CLI_Apellido_1  IS NULL THEN ''  ELSE CLI_Apellido_1 END  + ' ' +  " & _
                                "   				CASE  WHEN  CLI_Apellido_2  IS NULL THEN ''  ELSE CLI_Apellido_2 END AS DESCRIPCION, " & _
                                "                   D_Tipo_1, " & _
                                "                   D_Telefono_1, " & _
                                "                   D_Telefono_2, " & _
                                "                   D_Telefono_3, " & _
                                "                   D_Telefono_4, " & _
                                "                   D_Correo_1, " & _
                                "                   D_Correo_2 " & _
                                " FROM CLIENTE C   " & _
                                "   INNER JOIN DIRECCIONES D ON D.D_Nit_ID = C.CLI_Nit_ID AND D.D_Document_ID = C.CLI_Document_ID   " & _
                                "   WHERE C.CLI_OP_Empleado='S'  AND  " & _
                                "   CLI_Nit_ID = '" & vp_S_NitEmpresa & "'")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_PersonasEmpleados")

        Return ObjList

    End Function

    ''' <summary>
    ''' lee matrix para documentos personas empresas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Personas_Documentos()

        Dim ObjList As New List(Of DocumentosClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Doc As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString

        Dim sql As New StringBuilder

        sql.Append("SELECT  CLI_Nit_ID,  " & _
                              "                  CLI_TypeDocument_ID, " & _
                              "                  CLI_Document_ID, " & _
                              "                  CLI_GrpDocumentos, " & _
                              "                  RGRD.RGD_Documentos_ID, " & _
                              "                  D.DOC_Descripcion " & _
                              "  FROM CLIENTE C " & _
                              "     LEFT JOIN " & BD_Doc & ".dbo.GRUPO_DOCUMENTO GD ON GD.GD_Grp_Documento_ID = C.CLI_GrpDocumentos AND GD.GD_Nit_ID = C.CLI_Nit_ID " & _
                              "     LEFT JOIN " & BD_Doc & ".dbo.R_GRPDOC_DOCUMENTOS  RGRD ON RGRD.RGD_Grp_Documento_ID = GD.GD_Grp_Documento_ID " & _
                              "     LEFT JOIN  " & BD_Doc & ".dbo.DOCUMENTOS D ON D.DOC_Documentos_ID= RGRD.RGD_Documentos_ID " & _
                              "  ORDER BY CLI_Nit_ID ASC")

        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Personas_Documentos")

        Return ObjList
    End Function

    ''' <summary>
    ''' lee matrix para Direccion de las personas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Personas_Direcciones(ByVal vp_S_TDoc, ByVal vp_S_Doc)

        Dim ObjList As New List(Of ClienteClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append("SELECT  c.CLI_Nit_ID, " & _
                        " c.CLI_TypeDocument_ID, " & _
                        " c.CLI_Document_ID, " & _
                        " c.CLI_Digito_Verificacion, " & _
                        " c.CLI_Nombre, " & _
                        " c.CLI_Nombre_2, " & _
                        " c.CLI_Apellido_1, " & _
                        " c.CLI_Apellido_2, " & _
                        " c.CLI_Ciudad_ID, " & _
                        " d.D_PaginaWeb, " & _
                        " d.D_Direccion, " & _
                        " d.D_Telefono_1, " & _
                        " d.D_Telefono_2, " & _
                        " d.D_Telefono_3, " & _
                        " d.D_Telefono_4, " & _
                        " d.D_Correo_1, " & _
                        " d.D_Correo_2, " & _
                        " ROW_NUMBER() OVER(ORDER BY c.CLI_Nit_ID ASC) AS Index_Direcciones " & _
                        "  FROM CLIENTE c " & _
                        "  LEFT JOIN DIRECCIONES d " & _
                        "  ON d.D_Document_ID = c.CLI_Document_ID " & _
                        " WHERE CLI_TypeDocument_ID ='" & vp_S_TDoc & "'" & _
                                          " AND CLI_Document_ID = '" & vp_S_Doc & "'" & _
                        "  ORDER BY c.CLI_Nit_ID, c.CLI_Document_ID ASC")

        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Personas_Direcciones")

        Return ObjList
    End Function

    ''' <summary>
    ''' trae el nombre del cliente segun el filtro por tipo de documento, documento y nit empresa
    ''' </summary>
    ''' <param name="vp_S_Nit_ID"></param>
    ''' <param name="vp_S_TDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function SearchPeople_Exists(ByVal vp_S_Nit_ID As String, ByVal vp_S_TDoc As String, ByVal vp_S_Doc As String)

        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim StrQuery As String

        Dim sql_body As New StringBuilder
        Dim sql_Filter As New StringBuilder

        sql_body.Append(" SELECT CLI_Nombre + ' ' + " & _
                                          "             CASE  WHEN  CLI_Nombre_2  IS NULL THEN ''  ELSE CLI_Nombre_2 END  + ' ' + " & _
                                          "             CASE  WHEN  CLI_Apellido_1  IS NULL THEN ''  ELSE CLI_Apellido_1 END  + ' ' + " & _
                                          "             CASE  WHEN  CLI_Apellido_2  IS NULL THEN ''  ELSE CLI_Apellido_2 END AS DESCRIPCION" & _
                                          " FROM CLIENTE " & _
                                          " WHERE CLI_TypeDocument_ID ='" & vp_S_TDoc & "'" & _
                                          " AND CLI_Document_ID = '" & vp_S_Doc & "'")

        If vp_S_Nit_ID <> "" Then
            sql_Filter.Append(" AND CLI_Nit_ID  = '" & vp_S_Nit_ID & "'")
            StrQuery = sql_body.ToString & sql_Filter.ToString
        Else
            StrQuery = sql_body.ToString
        End If

        Dim People As String = conex.Shearch_Date_String(StrQuery, "2")

        Select Case People
            Case ""
                People = "NO"
                Return People

            Case Else
                Return People
        End Select

    End Function

#End Region

End Class

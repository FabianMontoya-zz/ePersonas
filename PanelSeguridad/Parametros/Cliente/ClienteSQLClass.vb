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
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente  " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
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
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente  " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
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
                        "      	ROW_NUMBER() OVER(ORDER BY CLI.CLI_Nit_ID DESC) AS Index_Cliente  " & _
                        " FROM CLIENTE CLI " & _
                        " INNER JOIN PAISES P ON P.P_Cod = CLI.CLI_Pais_ID " & _
                        " INNER JOIN CIUDADES C ON C.C_Ciudad_ID = CLI.CLI_Ciudad_ID " & _
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

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta

        If vp_S_TypeList = "Matrix_GrpDoc" Then
            Return ObjListDoc
        Else
            Return ObjListCliente
        End If
      
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
                                "  CLI_TypeDocument_ID, " & _
                                "  CAST(CLI_Document_ID AS NVARCHAR(20)) + '  -  ' +  " & _
                                "  CAST(CLI_TypeDocument_ID AS NVARCHAR(2)) + '  -  ' + " & _
                                "  CLI_Nombre + ' ' +  " & _
                                "  CASE  WHEN  CLI_Nombre_2  IS NULL THEN ''  ELSE CLI_Nombre_2 END  + ' ' + " & _
                                "  CASE  WHEN  CLI_Apellido_1  IS NULL THEN ''  ELSE CLI_Apellido_1 END  + ' ' + " & _
                                "  CASE  WHEN  CLI_Apellido_2  IS NULL THEN ''  ELSE CLI_Apellido_2 END AS DESCRIPCION, " & _
                                "  CLI_Nit_ID  " & _
                                "  FROM CLIENTE  ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix_Cliente_Dep")

        Return ObjList

    End Function

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
#End Region

End Class

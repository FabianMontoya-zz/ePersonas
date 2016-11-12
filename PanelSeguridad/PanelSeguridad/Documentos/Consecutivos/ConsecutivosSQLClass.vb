Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class ConsecutivosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla consecutivos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllConsecutivos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListRutaDocumentos As New List(Of ConsecutivosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT C_Nit_ID, " & _
                        "      C_Consecutivo_ID, " & _
                        "      C_Descripcion, " & _
                        "      C_Consecutivo, " & _
                        "      C_Usuario_Creacion, " & _
                        "      C_FechaCreacion, " & _
                        "      C_Usuario_Actualizacion, " & _
                        "      C_FechaActualizacion, " & _
                        "      CLI.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY C_Nit_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS C " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE CLI ON CLI.CLI_Document_ID =  " & _
                        " CASE	 SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID))  " & _
                        " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT C_Nit_ID, " & _
                        "      C_Consecutivo_ID, " & _
                        "      C_Descripcion, " & _
                        "      C_Consecutivo, " & _
                        "      C_Usuario_Creacion, " & _
                        "      C_FechaCreacion, " & _
                        "      C_Usuario_Actualizacion, " & _
                        "      C_FechaActualizacion, " & _
                        "      CLI.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY C_Nit_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS C " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE CLI ON CLI.CLI_Document_ID =  " & _
                        " CASE	 SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID))  " & _
                        " END ")
            Else
                sql.Append(" SELECT C_Nit_ID, " & _
                        "      C_Consecutivo_ID, " & _
                        "      C_Descripcion, " & _
                        "      C_Consecutivo, " & _
                        "      C_Usuario_Creacion, " & _
                        "      C_FechaCreacion, " & _
                        "      C_Usuario_Actualizacion, " & _
                        "      C_FechaActualizacion, " & _
                        "      CLI.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY C_Nit_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS C " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE CLI ON CLI.CLI_Document_ID =  " & _
                        " CASE	 SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID)) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING(C.C_Nit_ID,0,LEN(C.C_Nit_ID))  " & _
                        " END " & _
                        " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListRutaDocumentos = list(StrQuery, Conexion, "List")

        Return ObjListRutaDocumentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Consecutivos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertConsecutivos(ByVal vp_Obj As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CONSECUTIVOS (" & _
            " C_Nit_ID," & _
            " C_Consecutivo_ID," & _
            " C_Descripcion," & _
            " C_Consecutivo," & _
            " C_Usuario_Creacion," & _
            " C_FechaCreacion," & _
            " C_Usuario_Actualizacion," & _
            " C_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Consecutivo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.Consecutivo & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")
        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Consecutivos (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateConsecutivos(ByVal vp_Obj As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE CONSECUTIVOS SET " & _
                       " C_Descripcion ='" & vp_Obj.Descripcion & "', " & _
                       " C_Consecutivo ='" & vp_Obj.Consecutivo & "', " & _
                       " C_Usuario_Actualizacion ='" & vp_Obj.UsuarioActualizacion & "', " & _
                       " C_FechaActualizacion ='" & vp_Obj.FechaActualizacion & "' " & _
                       " WHERE  C_Nit_ID = '" & vp_Obj.Nit_ID & "' AND  C_Consecutivo_ID = '" & vp_Obj.Consecutivo_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Consecutivos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseConsecutivos(ByVal vp_Obj_Documento As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String

        sql.AppendLine(" DELETE CONSECUTIVOS WHERE C_Nit_ID = '" & vp_Obj_Documento.Nit_ID & "' AND C_Consecutivo_ID = '" & vp_Obj_Documento.Consecutivo_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region

#Region "CRUD_CONSECUTIVOS GENERALES"

    ''' <summary>
    ''' creala consulta para la tabla consecutivos Generales parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllConsecutivos_Generales(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListRutaDocumentos As New List(Of ConsecutivosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT CG_Consecutivo_ID, " & _
                        "      CG_Descripcion, " & _
                        "      CG_Consecutivo, " & _
                        "      CG_Usuario_Creacion, " & _
                        "      CG_FechaCreacion, " & _
                        "      CG_Usuario_Actualizacion, " & _
                        "      CG_FechaActualizacion, " & _
                        "      ROW_NUMBER() OVER(ORDER BY CG_Consecutivo_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS_GENERAL C ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT CG_Consecutivo_ID, " & _
                        "      CG_Descripcion, " & _
                        "      CG_Consecutivo, " & _
                        "      CG_Usuario_Creacion, " & _
                        "      CG_FechaCreacion, " & _
                        "      CG_Usuario_Actualizacion, " & _
                        "      CG_FechaActualizacion, " & _
                        "      ROW_NUMBER() OVER(ORDER BY CG_Consecutivo_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS_GENERAL C ")
            Else
                sql.Append(" SELECT CG_Consecutivo_ID, " & _
                        "      CG_Descripcion, " & _
                        "      CG_Consecutivo, " & _
                        "      CG_Usuario_Creacion, " & _
                        "      CG_FechaCreacion, " & _
                        "      CG_Usuario_Actualizacion, " & _
                        "      CG_FechaActualizacion, " & _
                        "      CLI.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY CG_Consecutivo_ID DESC) AS Index_RutaDocumentos " & _
                        " FROM CONSECUTIVOS_GENERAL C " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListRutaDocumentos = list(StrQuery, Conexion, "List_CG")

        Return ObjListRutaDocumentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Consecutivos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertConsecutivos_Generales(ByVal vp_Obj As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CONSECUTIVOS_GENERAL (" & _
            " CG_Consecutivo_ID," & _
            " CG_Descripcion," & _
            " CG_Consecutivo," & _
            " CG_Usuario_Creacion," & _
            " CG_FechaCreacion," & _
            " CG_Usuario_Actualizacion," & _
            " CG_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Consecutivo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.Consecutivo & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")
        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Consecutivos (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateConsecutivos_Generales(ByVal vp_Obj As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE CONSECUTIVOS_GENERAL SET " & _
                       " CG_Descripcion ='" & vp_Obj.Descripcion & "', " & _
                       " CG_Consecutivo ='" & vp_Obj.Consecutivo & "', " & _
                       " CG_Usuario_Actualizacion ='" & vp_Obj.UsuarioActualizacion & "', " & _
                       " CG_FechaActualizacion ='" & vp_Obj.FechaActualizacion & "' " & _
                       " WHERE  CG_Consecutivo_ID = '" & vp_Obj.Consecutivo_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Consecutivos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Documento"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseConsecutivos_Generales(ByVal vp_Obj_Documento As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String

        sql.AppendLine(" DELETE CONSECUTIVOS_GENERAL WHERE  CG_Consecutivo_ID = '" & vp_Obj_Documento.Consecutivo_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

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

#End Region


#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Releciones Financieras para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_TypeCosult As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of ConsecutivosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_TypeCosult

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New ConsecutivosClass
                    'cargamos datos sobre el objeto de login

                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Consecutivo_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.Consecutivo = ReadConsulta.GetValue(3) Else obj.Consecutivo = "0"

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While

            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New ConsecutivosClass
                    'cargamos datos sobre el objeto de login

                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Consecutivo_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.Consecutivo = ReadConsulta.GetValue(3) Else obj.Consecutivo = ""
                    obj.UsuarioCreacion = ReadConsulta.GetValue(4)
                    obj.FechaCreacion = ReadConsulta.GetValue(5)
                    obj.UsuarioActualizacion = ReadConsulta.GetValue(6)
                    obj.FechaActualizacion = ReadConsulta.GetValue(7)

                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then obj.DescripEmpresa = ReadConsulta.GetValue(8) Else obj.DescripEmpresa = ""
                    obj.Index = ReadConsulta.GetValue(9)

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While

            Case "List_CG"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New ConsecutivosClass
                    'cargamos datos sobre el objeto de login

                    obj.Consecutivo_ID = ReadConsulta.GetValue(0)
                    obj.Descripcion = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then obj.Consecutivo = ReadConsulta.GetValue(2) Else obj.Consecutivo = ""
                    obj.UsuarioCreacion = ReadConsulta.GetValue(3)
                    obj.FechaCreacion = ReadConsulta.GetValue(4)
                    obj.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    obj.FechaActualizacion = ReadConsulta.GetValue(6)
                    obj.Index = ReadConsulta.GetValue(7)

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As ConsecutivosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM dbo.CONSECUTIVOS " & _
                       " WHERE C_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND C_Consecutivo_ID = '" & vp_O_Obj.Consecutivo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido_General(ByVal vp_O_Obj As ConsecutivosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CONSECUTIVOS_GENERAL " & _
                       " WHERE  CG_Consecutivo_ID = '" & vp_O_Obj.Consecutivo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' creala consulta para la tabla documentos para averiguar si tiene foto
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixConcecutivo()

        Dim ObjList As New List(Of ConsecutivosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT C_Nit_ID, C_Consecutivo_ID, C_Descripcion, C_Consecutivo  FROM CONSECUTIVOS ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Consecutivo (UPDATE)
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateConsecutivo(ByVal vp_Obj_Conse As ConsecutivosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE CONSECUTIVOS SET " & _
                              " C_Consecutivo ='" & vp_Obj_Conse.Consecutivo_ID & "' " & _
                              " WHERE  C_Nit_ID = '" & vp_Obj_Conse.Nit_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region
End Class

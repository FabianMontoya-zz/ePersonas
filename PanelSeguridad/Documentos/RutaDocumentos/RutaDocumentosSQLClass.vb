Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class RutaDocumentosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla RutaDocumentos parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllRutaDocumentos(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT R_Nit_ID, " & _
                        "      R_Ruta_ID, " & _
                        "      R_Descripcion, " & _
                        "      R_Usuario_Creacion, " & _
                        "      R_FechaCreacion, " & _
                        "      R_Usuario_Actualizacion, " & _
                        "      R_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Ruta_ID ASC) AS Index_RutaDocumentos " & _
                        " FROM RUTA R " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID ))   " & _
                        " END ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT R_Nit_ID, " & _
                        "      R_Ruta_ID, " & _
                        "      R_Descripcion, " & _
                        "      R_Usuario_Creacion, " & _
                        "      R_FechaCreacion, " & _
                        "      R_Usuario_Actualizacion, " & _
                        "      R_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Ruta_ID ASC) AS Index_RutaDocumentos " & _
                        " FROM RUTA R " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                        " CASE	 SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID ))   " & _
                        " END ")
            Else
                sql.Append(" SELECT R_Nit_ID, " & _
                        "      R_Ruta_ID, " & _
                        "      R_Descripcion, " & _
                        "      R_Usuario_Creacion, " & _
                        "      R_FechaCreacion, " & _
                        "      R_Usuario_Actualizacion, " & _
                        "      R_FechaActualizacion, " & _
                        "      C.CLI_Nombre, " & _
                        "      ROW_NUMBER() OVER(ORDER BY R_Nit_ID, R_Ruta_ID ASC) AS Index_RutaDocumentos " & _
                        " FROM RUTA R " & _
                        " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = " & _
                       "  CASE	 SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID )) " & _
                        "                 WHEN '' THEN 0 " & _
                        "                ELSE SUBSTRING((R.R_Nit_ID),0,LEN(R.R_Nit_ID ))   " & _
                        " END " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  R_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY R_Nit_ID, R_Ruta_ID ASC")
            Else
                vl_sql_filtro.Append("AND  R_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY R_Nit_ID, R_Ruta_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY R_Nit_ID, R_Ruta_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString
        ObjListRutaDocumentos = listRutaDocumentos(StrQuery, Conexion, "List")

        Return ObjListRutaDocumentos

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo RutaDocumentos (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_RutaDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertRutaDocumentos(ByVal vp_Obj_RutaDocumentos As RutaDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT RUTA (" & _
            "R_Nit_ID," & _
            "R_Ruta_ID," & _
            "R_Descripcion," & _
            "R_Usuario_Creacion," & _
            "R_FechaCreacion," & _
            "R_Usuario_Actualizacion," & _
            "R_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.RutaDocumentos_ID & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.Ruta & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_RutaDocumentos.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del RutaDocumentos (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_RutaDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateRutaDocumentos(ByVal vp_Obj_RutaDocumentos As RutaDocumentosClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE RUTA SET " & _
                       " R_Descripcion ='" & vp_Obj_RutaDocumentos.Ruta & "', " & _
                       " R_Usuario_Actualizacion ='" & vp_Obj_RutaDocumentos.UsuarioActualizacion & "', " & _
                       " R_FechaActualizacion ='" & vp_Obj_RutaDocumentos.FechaActualizacion & "' " & _
                       " WHERE  R_Nit_ID = '" & vp_Obj_RutaDocumentos.Nit_ID & "' AND R_Ruta_ID = '" & vp_Obj_RutaDocumentos.RutaDocumentos_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del RutaDocumentos (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_RutaDocumentos"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseRutaDocumentos(ByVal vp_Obj_RutaDocumentos As RutaDocumentosClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE RUTA WHERE R_Nit_ID = '" & vp_Obj_RutaDocumentos.Nit_ID & "' AND R_Ruta_ID = '" & vp_Obj_RutaDocumentos.RutaDocumentos_ID & "'")
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

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListRutaDocumentosDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_RutaDocumentos_ID AS ID,CAST(A_RutaDocumentos_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM RutaDocumentos " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

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
    Public Function Charge_DropListSeguridad(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT PS_Politica_ID AS ID,CAST(PS_Politica_ID AS NVARCHAR(5)) + ' - ' + PS_Descripcion AS DESCRIPCION FROM POLITICA_SEGURIDAD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de RutaDocumentos para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listRutaDocumentos(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRutaDocumentos As New RutaDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objRutaDocumentos.Nit_ID = ReadConsulta.GetValue(0)
                    objRutaDocumentos.RutaDocumentos_ID = ReadConsulta.GetValue(1)
                    objRutaDocumentos.Ruta = ReadConsulta.GetValue(2)

                    objRutaDocumentos.UsuarioCreacion = ReadConsulta.GetValue(3)
                    objRutaDocumentos.FechaCreacion = ReadConsulta.GetValue(4)
                    objRutaDocumentos.UsuarioActualizacion = ReadConsulta.GetValue(5)
                    objRutaDocumentos.FechaActualizacion = ReadConsulta.GetValue(6)

                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objRutaDocumentos.DescripEmpresa = ReadConsulta.GetValue(7) Else objRutaDocumentos.DescripEmpresa = ""
                    objRutaDocumentos.Index = ReadConsulta.GetValue(8)

                    'agregamos a la lista
                    ObjListRutaDocumentos.Add(objRutaDocumentos)

                End While

            Case "Matrix"

                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objRutaDocumentos As New RutaDocumentosClass
                    'cargamos datos sobre el objeto de login
                    objRutaDocumentos.RutaDocumentos_ID = ReadConsulta.GetValue(0)
                    objRutaDocumentos.Ruta = ReadConsulta.GetValue(1)
                    objRutaDocumentos.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListRutaDocumentos.Add(objRutaDocumentos)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListRutaDocumentos

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As RutaDocumentosClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM RUTA " & _
                       " WHERE R_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND R_Ruta_ID = '" & vp_O_Obj.RutaDocumentos_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' creala consulta para la tabla RutaDocumentos parametrizada (READ)
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Ruta()

        Dim ObjListRutaDocumentos As New List(Of RutaDocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        sql.Append(" SELECT R_Ruta_ID, " & _
                   "      R_Descripcion, " & _
                   "      R_Nit_ID  " & _
                   " FROM RUTA R ")

        StrQuery = sql.ToString

        ObjListRutaDocumentos = listRutaDocumentos(StrQuery, Conexion, "Matrix")

        Return ObjListRutaDocumentos

    End Function

#End Region

End Class

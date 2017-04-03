Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class SucursalSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla roles parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllSucursal(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjList As New List(Of SucursalClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT SUC_Nit_ID,  " & _
                                  "              SUC_Surcursal_ID, " & _
                                  "              SUC_Descripcion, " & _
                                  "              SUC_Direccion_ID, " & _
                                  "              SUC_Calendario_ID, " & _
                                  "              SUC_Usuario_Creacion, " & _
                                  "              SUC_FechaCreacion, " & _
                                  "              SUC_Usuario_Actualizacion, " & _
                                  "              SUC_FechaActualizacion, " & _
                                  "              ROW_NUMBER() OVER(ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC) AS Index_Sucursal,  " & _
                                  "              D.D_Direccion,  " & _
                                  "              CA.CA_Descripcion  " & _
                                  " FROM SUCURSAL S " & _
                                  " LEFT JOIN DIRECCIONES D ON D.D_Nit_ID = S.SUC_Nit_ID " & _
                                  "                                                   AND D.D_Consecutivo = S.SUC_Direccion_ID " & _
                                  "                                                   AND D.D_Document_ID = " & _
                                  "                                                   CASE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                  "                                                   WHEN '' THEN '0' " & _
                                  "                                                   ELSE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                  "                                                   END " & _
                                  " LEFT JOIN CALENDARIOS CA ON CA.CA_Nit_ID = S.SUC_Nit_ID " & _
                                  "                                                   AND CA.CA_Calendario_ID = S.SUC_Calendario_ID ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT SUC_Nit_ID,  " & _
                                      "              SUC_Surcursal_ID, " & _
                                      "              SUC_Descripcion, " & _
                                      "              SUC_Direccion_ID, " & _
                                      "              SUC_Calendario_ID, " & _
                                      "              SUC_Usuario_Creacion, " & _
                                      "              SUC_FechaCreacion, " & _
                                      "              SUC_Usuario_Actualizacion, " & _
                                      "              SUC_FechaActualizacion, " & _
                                      "              ROW_NUMBER() OVER(ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC) AS Index_Sucursal,  " & _
                                      "              D.D_Direccion,  " & _
                                      "              CA.CA_Descripcion  " & _
                                      " FROM SUCURSAL S " & _
                                      " LEFT JOIN DIRECCIONES D ON D.D_Nit_ID = S.SUC_Nit_ID " & _
                                      "                                                   AND D.D_Consecutivo = S.SUC_Direccion_ID " & _
                                      "                                                   AND D.D_Document_ID = " & _
                                      "                                                   CASE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                      "                                                   WHEN '' THEN '0' " & _
                                      "                                                   ELSE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                      "                                                   END " & _
                                      " LEFT JOIN CALENDARIOS CA ON CA.CA_Nit_ID = S.SUC_Nit_ID " & _
                                      "                                                   AND CA.CA_Calendario_ID = S.SUC_Calendario_ID ")
            Else
                sql.Append(" SELECT SUC_Nit_ID,  " & _
                                      "              SUC_Surcursal_ID, " & _
                                      "              SUC_Descripcion, " & _
                                      "              SUC_Direccion_ID, " & _
                                      "              SUC_Calendario_ID, " & _
                                      "              SUC_Usuario_Creacion, " & _
                                      "              SUC_FechaCreacion, " & _
                                      "              SUC_Usuario_Actualizacion, " & _
                                      "              SUC_FechaActualizacion, " & _
                                      "              ROW_NUMBER() OVER(ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC) AS Index_Sucursal,  " & _
                                      "              D.D_Direccion,  " & _
                                      "              CA.CA_Descripcion  " & _
                                      " FROM SUCURSAL S " & _
                                      " LEFT JOIN DIRECCIONES D ON D.D_Nit_ID = S.SUC_Nit_ID " & _
                                      "                                                   AND D.D_Consecutivo = S.SUC_Direccion_ID " & _
                                      "                                                   AND D.D_Document_ID = " & _
                                      "                                                   CASE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                      "                                                   WHEN '' THEN '0' " & _
                                      "                                                   ELSE SUBSTRING(SUC_Nit_ID,0,LEN(SUC_Nit_ID)) " & _
                                      "                                                   END " & _
                                      " LEFT JOIN CALENDARIOS CA ON CA.CA_Nit_ID = S.SUC_Nit_ID " & _
                                      "                                                   AND CA.CA_Calendario_ID = S.SUC_Calendario_ID " & _
                                      " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  SUC_Nit_ID ='" & vp_S_Nit_User & "'  ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC")
            Else
                vl_sql_filtro.Append("AND  SUC_Nit_ID ='" & vp_S_Nit_User & "'  ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC")
            End If
        Else
            vl_sql_filtro.Append("  ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjList = list(StrQuery, Conexion, "List")

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para el estado del rol (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function DeleteSucursal(ByVal vp_Obj As SucursalClass)
        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""

        sql.AppendLine("DELETE SUCURSAL " & _
                       " WHERE SUC_Nit_ID = '" & vp_Obj.Nit_ID & "' AND SUC_Surcursal_ID = '" & vp_Obj.Sucursal_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del rol (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateSucursal(ByVal vp_Obj As SucursalClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE SUCURSAL SET " & _
                       " SUC_Descripcion ='" & vp_Obj.Descripcion & "', " & _
                       " SUC_Direccion_ID ='" & vp_Obj.Direcccion_ID & "', " & _
                       " SUC_Calendario_ID ='" & vp_Obj.Calendario_ID & "', " & _
                       " SUC_Usuario_Actualizacion ='" & vp_Obj.UsuarioActualizacion & "', " & _
                       " SUC_FechaActualizacion ='" & vp_Obj.FechaActualizacion & "' " & _
                       " WHERE SUC_Nit_ID = '" & vp_Obj.Nit_ID & "' AND SUC_Surcursal_ID = '" & vp_Obj.Sucursal_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo rol (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertSucursal(ByVal vp_Obj As SucursalClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT SUCURSAL (" & _
                       "SUC_Nit_ID," & _
                       "SUC_Surcursal_ID," & _
                       "SUC_Descripcion," & _
                       "SUC_Direccion_ID, " & _
                       "SUC_Calendario_ID, " & _
                       "SUC_Usuario_Creacion," & _
                       "SUC_FechaCreacion," & _
                       "SUC_Usuario_Actualizacion," & _
                       "SUC_FechaActualizacion" & _
                       ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Sucursal_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "', ")
        sql.AppendLine("'" & vp_Obj.Direcccion_ID & "', ")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "', ")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Sucursal para armar la tabla
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

        Dim ObjList As New List(Of SucursalClass)

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

                    Dim obj As New SucursalClass
                    'cargamos datos sobre el objeto
                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Sucursal_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.Direcccion_ID = ReadConsulta.GetValue(3) Else obj.Direcccion_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then obj.Calendario_ID = ReadConsulta.GetValue(4) Else obj.Calendario_ID = 0
                    obj.UsuarioCreacion = ReadConsulta.GetValue(5)
                    obj.FechaCreacion = ReadConsulta.GetValue(6)
                    obj.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    obj.FechaActualizacion = ReadConsulta.GetValue(8)
                    obj.Index = ReadConsulta.GetValue(9)
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then obj.DescripDireccion = ReadConsulta.GetValue(10) Else obj.DescripDireccion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then obj.DescripCalendario = ReadConsulta.GetValue(11) Else obj.DescripCalendario = ""
         
                    'agregamos a la lista
                    ObjList.Add(obj)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New SucursalClass
                    'cargamos datos sobre el objeto
                    obj.Nit_ID = ReadConsulta.GetValue(0)
                    obj.Sucursal_ID = ReadConsulta.GetValue(1)
                    obj.Descripcion = ReadConsulta.GetValue(2)
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
    Public Function Consulta_Repetido(ByVal vp_O_Obj As SucursalClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM SUCURSAL " & _
                       " WHERE SUC_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND SUC_Surcursal_ID = '" & vp_O_Obj.Sucursal_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Sucursales
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Sucursal()

        Dim ObjList As New List(Of SucursalClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append("  SELECT SUC_Nit_ID, SUC_Surcursal_ID,CAST(SUC_Surcursal_ID AS NVARCHAR(5)) + ' - ' + SUC_Descripcion AS DESCRIPCION FROM SUCURSAL  " & _
                                "  ORDER BY SUC_Surcursal_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class

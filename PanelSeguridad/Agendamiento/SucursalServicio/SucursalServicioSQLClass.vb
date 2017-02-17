Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class SucursalServicioSQLClass
#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla SucursalServicio parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllSucursalServicio(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListSucursalServicio As New List(Of SucursalServicioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("  SELECT SS_Nit_ID, " & _
                            "SS_Sucursal_ID, " & _
                            "SS_Servicio_ID, " & _
                            "SS_Moneda_ID, " & _
                            "SS_Costo, " & _
                            "SS_Capacidad, " & _
                            "SS_Calendario_ID, " & _
                            "SS_Usuario_Creacion, " & _
                            "SS_FechaCreacion, " & _
                            "SS_Usuario_Actualizacion, " & _
                            "SS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM SUCURSAL_SERVICIO TS " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.SS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.SS_Nit_ID,0,LEN(TS.SS_Nit_ID)) ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("  SELECT SS_Nit_ID, " & _
                            "SS_Sucursal_ID, " & _
                            "SS_Servicio_ID, " & _
                            "SS_Moneda_ID, " & _
                            "SS_Costo, " & _
                            "SS_Capacidad, " & _
                            "SS_Calendario_ID, " & _
                            "SS_Usuario_Creacion, " & _
                            "SS_FechaCreacion, " & _
                            "SS_Usuario_Actualizacion, " & _
                            "SS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM SUCURSAL_SERVICIO TS " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.SS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.SS_Nit_ID,0,LEN(TS.SS_Nit_ID)) ")
            Else
                sql.Append("    SELECT SS_Nit_ID, " & _
                            "SS_Sucursal_ID, " & _
                            "SS_Servicio_ID, " & _
                            "SS_Moneda_ID, " & _
                            "SS_Costo, " & _
                            "SS_Capacidad, " & _
                            "SS_Calendario_ID, " & _
                            "SS_Usuario_Creacion, " & _
                            "SS_FechaCreacion, " & _
                            "SS_Usuario_Actualizacion, " & _
                            "SS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM SUCURSAL_SERVICIO TS " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.SS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.SS_Nit_ID,0,LEN(TS.SS_Nit_ID)) " & _
                            "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  SS_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY SS_Nit_ID, SS_Sucursal_ID, SS_Servicio_ID ASC")
            Else
                vl_sql_filtro.Append("AND  SS_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY SS_Nit_ID, SS_Sucursal_ID, SS_Servicio_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY SS_Nit_ID, SS_Sucursal_ID, SS_Servicio_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListSucursalServicio = listSucursalServicio(StrQuery, Conexion, "List")

        Return ObjListSucursalServicio

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo SucursalServicio (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertSucursalServicio(ByVal vp_Obj As SucursalServicioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INTO SUCURSAL_SERVICIO( " & _
        "SS_Nit_ID, " & _
        "SS_Sucursal_ID, " & _
        "SS_Servicio_ID, " & _
        "SS_Moneda_ID, " & _
        "SS_Costo," & _
        "SS_Capacidad," & _
        "SS_Calendario_ID," & _
        "SS_Usuario_Creacion," & _
        "SS_FechaCreacion," & _
        "SS_Usuario_Actualizacion," & _
        "SS_FechaActualizacion)")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Codigo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Surcursal_ID & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda & "',")
        sql.AppendLine("'" & vp_Obj.Costo & "',")
        sql.AppendLine("'" & vp_Obj.Capacidad & "',")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del SucursalServicio (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateSucursalServicio(ByVal vp_Obj As SucursalServicioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE SUCURSAL_SERVICIO SET " & _
                          " SS_Moneda_ID ='" & vp_Obj.Cod_Moneda & "', " & _
                          " SS_Costo ='" & vp_Obj.Costo & "', " & _
                          " SS_Capacidad ='" & vp_Obj.Capacidad & "', " & _
                          " SS_Calendario_ID =" & vp_Obj.Calendario_ID & ", " & _
                          " WHERE  SS_Nit_ID  = '" & vp_Obj.Nit_ID & "' AND SS_Servicio_ID = '" & vp_Obj.Codigo_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del SucursalServicio (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseSucursalServicio(ByVal vp_Obj As SucursalServicioClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE SUCURSAL_SERVICIO WHERE SS_Nit_ID = '" & vp_Obj.Nit_ID & "' AND SS_Servicio_ID = '" & vp_Obj.Codigo_ID & "'")
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
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListSucursalServicioDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT SS_Nit_ID AS ID,CAST(SS_Nit_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM SUCURSAL_SERVICIO " & _
                   " WHERE  SS_Nit_ID = '" & vp_S_NitEmpresa & "'")

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
    ''' funcion que trae el listado de SucursalServicio para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listSucursalServicio(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of SucursalServicioClass)

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

                    Dim objSucursalServicio As New SucursalServicioClass
                    'cargamos datos sobre el objeto de login
                    objSucursalServicio.Nit_ID = ReadConsulta.GetValue(0)
                    objSucursalServicio.Codigo_ID = ReadConsulta.GetValue(1)
                    objSucursalServicio.Surcursal_ID = ReadConsulta.GetValue(2)

                    objSucursalServicio.Cod_Moneda = ReadConsulta.GetValue(3)
                    objSucursalServicio.Costo = ReadConsulta.GetValue(4)
                    objSucursalServicio.Capacidad = ReadConsulta.GetValue(5)
                    objSucursalServicio.Calendario_ID = ReadConsulta.GetValue(6)

                    objSucursalServicio.UsuarioCreacion = ReadConsulta.GetValue(7)
                    objSucursalServicio.FechaCreacion = ReadConsulta.GetValue(8)
                    objSucursalServicio.UsuarioActualizacion = ReadConsulta.GetValue(9)
                    objSucursalServicio.FechaActualizacion = ReadConsulta.GetValue(10)
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objSucursalServicio.DescripEmpresa = ReadConsulta.GetValue(11) Else objSucursalServicio.DescripEmpresa = ""
                    'agregamos a la lista
                    ObjList.Add(objSucursalServicio)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objSucursalServicio As New SucursalServicioClass
                    'cargamos datos sobre el objeto de login
                    objSucursalServicio.Codigo_ID = ReadConsulta.GetValue(0)
                    objSucursalServicio.Surcursal_ID = ReadConsulta.GetValue(1)
                    objSucursalServicio.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjList.Add(objSucursalServicio)

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
    Public Function Consulta_Repetido(ByVal vp_O_Obj As SucursalServicioClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM SUCURSAL_SERVICIO " & _
                       " WHERE SS_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND SS_Servicio_ID = '" & vp_O_Obj.Codigo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de SucursalServicios
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_SucursalServicio()

        Dim ObjList As New List(Of SucursalServicioClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT SS_Servicio_ID AS ID,CAST(SS_Servicio_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION, SS_Nit_ID FROM SUCURSAL_SERVICIO  " & _
                   " ORDER BY SS_Servicio_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listSucursalServicio(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class

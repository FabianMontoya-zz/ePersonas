Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class TipoServicioSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla TipoServicio parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllTipoServicio(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String, ByVal vp_S_Nit_User As String)

        Dim ObjListTipoServicio As New List(Of TipoServicioClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder
        Dim vl_sql_filtro As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("  SELECT TCS_Nit_ID, " & _
                            "TCS_Codigo_ID, " & _
                            "TCS_Nombre, " & _
                            "TCS_Tipo, " & _
                            "TCS_Referecia, " & _
                            "TCS_Cod_Moneda, " & _
                            "TCS_Costo, " & _
                            "TCS_Valor, " & _
                            "TCS_Detalle, " & _
                            "TCS_Calendario_ID, " & _
                            "TCS_Capacidad, " & _
                            "TCS_N_Pagos_Bloqueo, " & _
                            "TCS_Tipo_Calculo_Sesion, " & _
                            "TCS_Tiempo_Sesion, " & _
                            "TCS_Tiempo_Entre_Sesion, " & _
                            "TCS_Tiempo_Maximo_Agenda, " & _
                            "TCS_Imagen_asociada, " & _
                            "TCS_Usuario_Creacion, " & _
                            "TCS_FechaCreacion, " & _
                            "TCS_Usuario_Actualizacion, " & _
                            "TCS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM TIPO_SERVICIOS TS  " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.TCS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.TCS_Nit_ID,0,LEN(TS.TCS_Nit_ID)) ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("  SELECT TCS_Nit_ID, " & _
                            "TCS_Codigo_ID, " & _
                            "TCS_Nombre, " & _
                            "TCS_Tipo, " & _
                            "TCS_Referecia, " & _
                            "TCS_Cod_Moneda, " & _
                            "TCS_Costo, " & _
                            "TCS_Valor, " & _
                            "TCS_Detalle, " & _
                            "TCS_Calendario_ID, " & _
                            "TCS_Capacidad, " & _
                            "TCS_N_Pagos_Bloqueo, " & _
                            "TCS_Tipo_Calculo_Sesion, " & _
                            "TCS_Tiempo_Sesion, " & _
                            "TCS_Tiempo_Entre_Sesion, " & _
                            "TCS_Tiempo_Maximo_Agenda, " & _
                            "TCS_Imagen_asociada, " & _
                            "TCS_Usuario_Creacion, " & _
                            "TCS_FechaCreacion, " & _
                            "TCS_Usuario_Actualizacion, " & _
                            "TCS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM TIPO_SERVICIOS TS  " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.TCS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.TCS_Nit_ID,0,LEN(TS.TCS_Nit_ID)) ")
            Else
                sql.Append("  SELECT TCS_Nit_ID, " & _
                            "TCS_Codigo_ID, " & _
                            "TCS_Nombre, " & _
                            "TCS_Tipo, " & _
                            "TCS_Referecia, " & _
                            "TCS_Cod_Moneda, " & _
                            "TCS_Costo, " & _
                            "TCS_Valor, " & _
                            "TCS_Detalle, " & _
                            "TCS_Calendario_ID, " & _
                            "TCS_Capacidad, " & _
                            "TCS_N_Pagos_Bloqueo, " & _
                            "TCS_Tipo_Calculo_Sesion, " & _
                            "TCS_Tiempo_Sesion, " & _
                            "TCS_Tiempo_Entre_Sesion, " & _
                            "TCS_Tiempo_Maximo_Agenda, " & _
                            "TCS_Imagen_asociada, " & _
                            "TCS_Usuario_Creacion, " & _
                            "TCS_FechaCreacion, " & _
                            "TCS_Usuario_Actualizacion, " & _
                            "TCS_FechaActualizacion, " & _
                            "C.CLI_Nombre " & _
                            "FROM TIPO_SERVICIOS TS  " & _
                            "LEFT JOIN CLIENTE C ON C.CLI_Nit_ID = TS.TCS_Nit_ID AND C.CLI_Document_ID = SUBSTRING(TS.TCS_Nit_ID,0,LEN(TS.TCS_Nit_ID)) " & _
                            "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        If vp_S_Nit_User <> "N" Then
            If vp_S_Contenido = "ALL" Then
                vl_sql_filtro.Append("WHERE  TCS_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY TCS_Nit_ID, TCS_Codigo_ID ASC")
            Else
                vl_sql_filtro.Append("AND  TCS_Nit_ID ='" & vp_S_Nit_User & "' ORDER BY TCS_Nit_ID, TCS_Codigo_ID ASC")
            End If
        Else
            vl_sql_filtro.Append(" ORDER BY TCS_Nit_ID, TCS_Codigo_ID ASC")
        End If

        StrQuery = sql.ToString & vl_sql_filtro.ToString

        ObjListTipoServicio = listTipoServicio(StrQuery, Conexion, "List")

        Return ObjListTipoServicio

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo TipoServicio (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertTipoServicio(ByVal vp_Obj As TipoServicioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT INTO TIPO_SERVICIOS(  " & _
           "TCS_Nit_ID, " & _
           "TCS_Codigo_ID, " & _
           "TCS_Nombre, " & _
           "TCS_Tipo, " & _
           "TCS_Referecia, " & _
           "TCS_Cod_Moneda, " & _
           "TCS_Costo, " & _
           "TCS_Valor, " & _
           "TCS_Detalle, " & _
           "TCS_Calendario_ID, " & _
           "TCS_Capacidad, " & _
           "TCS_N_Pagos_Bloqueo, " & _
           "TCS_Tipo_Calculo_Sesion, " & _
           "TCS_Tiempo_Sesion, " & _
           "TCS_Tiempo_Entre_Sesion, " & _
           "TCS_Tiempo_Maximo_Agenda, " & _
           "TCS_Imagen_asociada, " & _
           "TCS_Usuario_Creacion, " & _
           "TCS_FechaCreacion, " & _
           "TCS_Usuario_Actualizacion, " & _
           "TCS_FechaActualizacion)")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Codigo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Nombre & "',")
        sql.AppendLine("'" & vp_Obj.Tipo & "',")
        sql.AppendLine("'" & vp_Obj.Referencia & "',")
        sql.AppendLine("'" & vp_Obj.Cod_Moneda & "',")
        sql.AppendLine("'" & vp_Obj.Costo & "',")
        sql.AppendLine("'" & vp_Obj.valor & "',")
        sql.AppendLine("'" & vp_Obj.Detalle & "',")
        sql.AppendLine("'" & vp_Obj.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj.Capacidad & "',")
        sql.AppendLine("'" & vp_Obj.N_Pagos_Bloqueos & "',")
        sql.AppendLine("'" & vp_Obj.Tipo_Calculo_Sesion & "',")
        sql.AppendLine("'" & vp_Obj.Tiempo_Sesion & "',")
        sql.AppendLine("'" & vp_Obj.Tiempo_Entre_Sesion & "',")
        sql.AppendLine("'" & vp_Obj.Tiempo_Maximo_Agenda & "',")
        sql.AppendLine("'" & vp_Obj.Imagen_asociada & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del TipoServicio (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateTipoServicio(ByVal vp_Obj As TipoServicioClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE TIPO_SERVICIOS SET " & _
                          " TCS_Nombre ='" & vp_Obj.Nombre & "', " & _
                          " TCS_Tipo ='" & vp_Obj.Tipo & "', " & _
                          " TCS_Referecia ='" & vp_Obj.Referencia & "', " & _
                          " TCS_Cod_Moneda =" & vp_Obj.Cod_Moneda & ", " & _
                          " TCS_Costo =" & vp_Obj.Costo & ", " & _
                          " TCS_Valor =" & vp_Obj.valor & ", " & _
                          " TCS_Detalle ='" & vp_Obj.Detalle & "', " & _
                          " TCS_Calendario_ID =" & vp_Obj.Calendario_ID & ", " & _
                          " TCS_Capacidad =" & vp_Obj.Capacidad & ", " & _
                          " TCS_N_Pagos_Bloqueo =" & vp_Obj.N_Pagos_Bloqueos & ", " & _
                          " TCS_Tipo_Calculo_Sesion ='" & vp_Obj.Tipo_Calculo_Sesion & "', " & _
                          " TCS_Tiempo_Sesion ='" & vp_Obj.Tiempo_Sesion & "', " & _
                          " TCS_Tiempo_Entre_Sesion ='" & vp_Obj.Tiempo_Entre_Sesion & "', " & _
                          " TCS_Tiempo_Maximo_Agenda ='" & vp_Obj.Tiempo_Maximo_Agenda & "', " & _
                          " TCS_Imagen_asociada ='" & vp_Obj.Imagen_asociada & "', " & _
                          " TCS_Usuario_Actualizacion ='" & vp_Obj.UsuarioActualizacion & "', " & _
                          " TCS_FechaActualizacion ='" & vp_Obj.FechaActualizacion & "' " & _
                          " WHERE  TCS_Nit_ID = '" & vp_Obj.Nit_ID & "' AND TCS_Codigo_ID = '" & vp_Obj.Codigo_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del TipoServicio (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseTipoServicio(ByVal vp_Obj As TipoServicioClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE TIPO_SERVICIOS WHERE TCS_Nit_ID = '" & vp_Obj.Nit_ID & "' AND TCS_Codigo_ID = '" & vp_Obj.Codigo_ID & "'")
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
    Public Function Charge_DropListTipoServicioDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TCS_Nit_ID AS ID,CAST(TCS_Nit_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM TIPO_SERVICIOS " & _
                   " WHERE  TCS_Nit_ID = '" & vp_S_NitEmpresa & "'")

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
    ''' funcion que trae el listado de TipoServicio para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listTipoServicio(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of TipoServicioClass)

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

                    Dim objTipoServicio As New TipoServicioClass
                    'cargamos datos sobre el objeto de login
                    objTipoServicio.Nit_ID = ReadConsulta.GetValue(0)
                    objTipoServicio.Codigo_ID = ReadConsulta.GetValue(1)

                    objTipoServicio.Nombre = ReadConsulta.GetValue(2)
                    objTipoServicio.Tipo = ReadConsulta.GetValue(3)
                    objTipoServicio.Referencia = ReadConsulta.GetValue(4)
                    objTipoServicio.Cod_Moneda = ReadConsulta.GetValue(5)
                    objTipoServicio.Costo = ReadConsulta.GetValue(6)
                    objTipoServicio.valor = ReadConsulta.GetValue(7)
                    objTipoServicio.Detalle = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objTipoServicio.Calendario_ID = ReadConsulta.GetValue(9) Else objTipoServicio.Calendario_ID = ""

                    objTipoServicio.Capacidad = ReadConsulta.GetValue(10)
                    objTipoServicio.N_Pagos_Bloqueos = ReadConsulta.GetValue(11)
                    objTipoServicio.Tipo_Calculo_Sesion = ReadConsulta.GetValue(12)

                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objTipoServicio.Tiempo_Sesion = ReadConsulta.GetValue(10) Else objTipoServicio.Tiempo_Sesion = ""

                    objTipoServicio.Tiempo_Entre_Sesion = ReadConsulta.GetValue(14)
                    objTipoServicio.Tiempo_Maximo_Agenda = ReadConsulta.GetValue(15)
                    objTipoServicio.Imagen_asociada = ReadConsulta.GetValue(16)

                    objTipoServicio.UsuarioCreacion = ReadConsulta.GetValue(17)
                    objTipoServicio.FechaCreacion = ReadConsulta.GetValue(18)
                    objTipoServicio.UsuarioActualizacion = ReadConsulta.GetValue(19)
                    objTipoServicio.FechaActualizacion = ReadConsulta.GetValue(20)
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objTipoServicio.DescripEmpresa = ReadConsulta.GetValue(21) Else objTipoServicio.DescripEmpresa = ""
                    'agregamos a la lista
                    ObjList.Add(objTipoServicio)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objTipoServicio As New TipoServicioClass
                    'cargamos datos sobre el objeto de login
                    objTipoServicio.Codigo_ID = ReadConsulta.GetValue(0)
                    objTipoServicio.Nombre = ReadConsulta.GetValue(1)
                    objTipoServicio.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjList.Add(objTipoServicio)

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
    Public Function Consulta_Repetido(ByVal vp_O_Obj As TipoServicioClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM TIPO_SERVICIOS " & _
                       " WHERE TCS_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND TCS_Codigo_ID = '" & vp_O_Obj.Codigo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de TipoServicios
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_TipoServicio()

        Dim ObjList As New List(Of TipoServicioClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT TCS_Codigo_ID AS ID,CAST(TCS_Codigo_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION, TCS_Nit_ID FROM TIPO_SERVICIOS  " & _
                   " ORDER BY TCS_Codigo_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listTipoServicio(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class

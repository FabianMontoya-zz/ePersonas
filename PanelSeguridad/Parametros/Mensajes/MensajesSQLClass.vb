Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class MensajesSQLClass


#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Mensajes parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllMensajes(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListMensajes As New List(Of MensajesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT M_Codigo_ID,M_Nombre,M_Descripcion,M_FechaActualizacion,M_Usuario FROM MENSAJES")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT M_Codigo_ID,M_Nombre,M_Descripcion,M_FechaActualizacion,M_Usuario FROM MENSAJES")
            Else
                sql.Append("SELECT M_Codigo_ID,M_Nombre,M_Descripcion,M_FechaActualizacion,M_Usuario FROM MENSAJES " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListMensajes = listMensajes(StrQuery, Conexion)

        Return ObjListMensajes

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Mensajes (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Mensajes"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertMensajes(ByVal vp_Obj_Mensajes As MensajesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT MENSAJES (" & _
            "M_Codigo_ID," & _
            "M_Nombre," & _
            "M_Descripcion," & _
            "M_FechaActualizacion," & _
            "M_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Mensajes.Mensajes_ID & "',")
        sql.AppendLine("'" & vp_Obj_Mensajes.Nombre & "',")
        sql.AppendLine("'" & vp_Obj_Mensajes.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Mensajes.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Mensajes.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Mensajes (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Mensajes"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateMensajes(ByVal vp_Obj_Mensajes As MensajesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE MENSAJES SET " & _
                       " M_Nombre ='" & vp_Obj_Mensajes.Nombre & "', " & _
                       " M_Descripcion ='" & vp_Obj_Mensajes.Descripcion & "', " & _
                       " M_FechaActualizacion ='" & vp_Obj_Mensajes.FechaActualizacion & "', " & _
                       " M_Usuario ='" & vp_Obj_Mensajes.Usuario & "' " & _
                       " WHERE M_Codigo_ID = '" & vp_Obj_Mensajes.Mensajes_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Mensajes (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Mensajes"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseMensajes(ByVal vp_Obj_Mensajes As MensajesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE MENSAJES WHERE M_Codigo_ID = '" & vp_Obj_Mensajes.Mensajes_ID & "'")
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

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Mensajes para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listMensajes(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListMensajes As New List(Of MensajesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objMensajes As New MensajesClass
            'cargamos datos sobre el objeto de login
            objMensajes.Mensajes_ID = ReadConsulta.GetValue(0)
            objMensajes.Nombre = ReadConsulta.GetValue(1)
            objMensajes.Descripcion = ReadConsulta.GetValue(2)
            objMensajes.FechaActualizacion = ReadConsulta.GetValue(3)
            objMensajes.Usuario = ReadConsulta.GetValue(4)

            'agregamos a la lista
            ObjListMensajes.Add(objMensajes)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListMensajes

    End Function

#End Region

End Class

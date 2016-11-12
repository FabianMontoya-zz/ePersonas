Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class TransaccionesSQLClass


#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Transacciones parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllTransacciones(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListTransacciones As New List(Of TransaccionesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT T_Nit_ID,T_ID,T_Descripcion,T_FechaActualizacion,T_Usuario FROM Transacciones")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT T_Nit_ID,T_ID,T_Descripcion,T_FechaActualizacion,T_Usuario FROM Transacciones")
            Else
                sql.Append("SELECT T_Nit_ID,T_ID,T_Descripcion,T_FechaActualizacion,T_Usuario FROM Transacciones " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListTransacciones = listTransacciones(StrQuery, Conexion)

        Return ObjListTransacciones

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Transacciones (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Transacciones"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertTransacciones(ByVal vp_Obj_Transacciones As TransaccionesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Transacciones (" & _
            "T_Nit_ID," & _
            "T_ID," & _
            "T_Descripcion," & _
            "T_FechaActualizacion," & _
            "T_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Transacciones.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Transacciones.Transacciones_ID & "',")
        sql.AppendLine("'" & vp_Obj_Transacciones.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Transacciones.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Transacciones.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Transacciones (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Transacciones"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateTransacciones(ByVal vp_Obj_Transacciones As TransaccionesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE Transacciones SET " & _
                      " T_Descripcion ='" & vp_Obj_Transacciones.Descripcion & "', " & _
                       " T_FechaActualizacion ='" & vp_Obj_Transacciones.FechaActualizacion & "', " & _
                       " T_Usuario ='" & vp_Obj_Transacciones.Usuario & "' " & _
                       " WHERE T_ID = '" & vp_Obj_Transacciones.Transacciones_ID & "' AND T_Nit_ID = '" & vp_Obj_Transacciones.Nit_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Transacciones (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Transacciones"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseTransacciones(ByVal vp_Obj_Transacciones As TransaccionesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Transacciones WHERE T_ID = '" & vp_Obj_Transacciones.Transacciones_ID & "' AND T_Nit_ID = '" & vp_Obj_Transacciones.Nit_ID & "'")
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
    ''' funcion que trae el listado de Transacciones para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listTransacciones(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListTransacciones As New List(Of TransaccionesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objTransacciones As New TransaccionesClass
            'cargamos datos sobre el objeto de login
            objTransacciones.Nit_ID = ReadConsulta.GetValue(0)
            objTransacciones.Transacciones_ID = ReadConsulta.GetValue(1)
            objTransacciones.Descripcion = ReadConsulta.GetValue(2)
            objTransacciones.FechaActualizacion = ReadConsulta.GetValue(3)
            objTransacciones.Usuario = ReadConsulta.GetValue(4)

            'agregamos a la lista
            ObjListTransacciones.Add(objTransacciones)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListTransacciones

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As TransaccionesClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM Transacciones " & _
                       " WHERE T_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND T_ID = '" & vp_O_Obj.Transacciones_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

#End Region

End Class

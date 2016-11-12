Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Impuesto_GastoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Impuesto_Gasto parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllImpuesto_Gasto(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT IM_Impuesto_Gasto_ID, IM_Descripcion, IM_FechaActualizacion, IM_Usuario FROM Impuesto_Gasto")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT IM_Impuesto_Gasto_ID, IM_Descripcion, IM_FechaActualizacion, IM_Usuario FROM Impuesto_Gasto")
            Else
                sql.Append("SELECT IM_Impuesto_Gasto_ID, IM_Descripcion, IM_FechaActualizacion, IM_Usuario FROM Impuesto_Gasto " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListImpuesto_Gasto = listImpuesto_Gasto(StrQuery, Conexion)

        Return ObjListImpuesto_Gasto

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Impuesto_Gasto (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Impuesto_Gasto"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertImpuesto_Gasto(ByVal vp_Obj_Impuesto_Gasto As Impuesto_GastoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Impuesto_Gasto (" & _
            "IM_Impuesto_Gasto_ID," & _
            "IM_Descripcion," & _
            "IM_FechaActualizacion," & _
            "IM_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Impuesto_Gasto.Impuesto_Gasto_ID & "',")
        sql.AppendLine("'" & vp_Obj_Impuesto_Gasto.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Impuesto_Gasto.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Impuesto_Gasto.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Impuesto_Gasto (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Impuesto_Gasto"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateImpuesto_Gasto(ByVal vp_Obj_Impuesto_Gasto As Impuesto_GastoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE Impuesto_Gasto SET " & _
                       " IM_Descripcion ='" & vp_Obj_Impuesto_Gasto.Descripcion & "', " & _
                       " IM_FechaActualizacion ='" & vp_Obj_Impuesto_Gasto.FechaActualizacion & "', " & _
                       " IM_Usuario ='" & vp_Obj_Impuesto_Gasto.Usuario & "' " & _
                       " WHERE IM_Impuesto_Gasto_ID = '" & vp_Obj_Impuesto_Gasto.Impuesto_Gasto_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Impuesto_Gasto (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Impuesto_Gasto"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseImpuesto_Gasto(ByVal vp_Obj_Impuesto_Gasto As Impuesto_GastoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Impuesto_Gasto WHERE IM_Impuesto_Gasto_ID = '" & vp_Obj_Impuesto_Gasto.Impuesto_Gasto_ID & "'")
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
    ''' funcion que trae el listado de Impuesto_Gasto para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listImpuesto_Gasto(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListImpuesto_Gasto As New List(Of Impuesto_GastoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objImpuesto_Gasto As New Impuesto_GastoClass
            'cargamos datos sobre el objeto de login
            objImpuesto_Gasto.Impuesto_Gasto_ID = ReadConsulta.GetValue(0)
            objImpuesto_Gasto.Descripcion = ReadConsulta.GetString(1)
            objImpuesto_Gasto.FechaActualizacion = ReadConsulta.GetString(2)
            objImpuesto_Gasto.Usuario = ReadConsulta.GetString(3)

            'agregamos a la lista
            ObjListImpuesto_Gasto.Add(objImpuesto_Gasto)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListImpuesto_Gasto

    End Function

#End Region


End Class

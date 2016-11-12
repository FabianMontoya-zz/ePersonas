Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class TipoActivoSQLClass


#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Activo parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllActivo(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListActivo As New List(Of TipoActivoClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT TA_ID,TA_Descripcion,TA_FechaActualizacion,TA_Usuario FROM TIPOACTIVO")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT TA_ID,TA_Descripcion,TA_FechaActualizacion,TA_Usuario FROM TIPOACTIVO")
            Else
                sql.Append("SELECT TA_ID,TA_Descripcion,TA_FechaActualizacion,TA_Usuario FROM TIPOACTIVO " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListActivo = listActivo(StrQuery, Conexion)

        Return ObjListActivo

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Activo (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Activo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertActivo(ByVal vp_Obj_Activo As TipoActivoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT TIPOACTIVO (" & _
            "TA_ID," & _
            "TA_Descripcion," & _
            "TA_FechaActualizacion," & _
            "TA_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Activo.Activo_ID & "',")
        sql.AppendLine("'" & vp_Obj_Activo.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Activo.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Activo.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Activo (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Activo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateActivo(ByVal vp_Obj_Activo As TipoActivoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE TIPOACTIVO SET " & _
                      " TA_Descripcion ='" & vp_Obj_Activo.Descripcion & "', " & _
                       " TA_FechaActualizacion ='" & vp_Obj_Activo.FechaActualizacion & "', " & _
                       " TA_Usuario ='" & vp_Obj_Activo.Usuario & "' " & _
                       " WHERE TA_ID = '" & vp_Obj_Activo.Activo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Activo (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Activo"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseActivo(ByVal vp_Obj_Activo As TipoActivoClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE TIPOACTIVO WHERE TA_ID = '" & vp_Obj_Activo.Activo_ID & "'")
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
    ''' funcion que trae el listado de Activo para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listActivo(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListActivo As New List(Of TipoActivoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objActivo As New TipoActivoClass
            'cargamos datos sobre el objeto de login
            objActivo.Activo_ID = ReadConsulta.GetValue(0)
            objActivo.Descripcion = ReadConsulta.GetValue(1)
            objActivo.FechaActualizacion = ReadConsulta.GetValue(2)
            objActivo.Usuario = ReadConsulta.GetValue(3)

            'agregamos a la lista
            ObjListActivo.Add(objActivo)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListActivo

    End Function

#End Region
End Class

Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class AyudasSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Ayudas parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllAyudas(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListAyudas As New List(Of AyudasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT AY_Codigo_ID,AY_Nombre,AY_Descripcion,AY_FechaActualizacion,AY_Usuario FROM AYUDAS")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT AY_Codigo_ID,AY_Nombre,AY_Descripcion,AY_FechaActualizacion,AY_Usuario FROM AYUDAS")
            Else
                sql.Append("SELECT AY_Codigo_ID,AY_Nombre,AY_Descripcion,AY_FechaActualizacion,AY_Usuario FROM AYUDAS " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListAyudas = listAyudas(StrQuery, Conexion)

        Return ObjListAyudas

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Ayudas (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Ayudas"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAyudas(ByVal vp_Obj_Ayudas As AyudasClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT AYUDAS (" & _
            "AY_Codigo_ID," & _
            "AY_Nombre," & _
            "AY_Descripcion," & _
            "AY_FechaActualizacion," & _
            "AY_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Ayudas.Ayudas_ID & "',")
        sql.AppendLine("'" & vp_Obj_Ayudas.Nombre & "',")
        sql.AppendLine("'" & vp_Obj_Ayudas.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Ayudas.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Ayudas.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Ayudas (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Ayudas"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateAyudas(ByVal vp_Obj_Ayudas As AyudasClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE AYUDAS SET " & _
                       " AY_Nombre ='" & vp_Obj_Ayudas.Nombre & "', " & _
                       " AY_Descripcion ='" & vp_Obj_Ayudas.Descripcion & "', " & _
                       " AY_FechaActualizacion ='" & vp_Obj_Ayudas.FechaActualizacion & "', " & _
                       " AY_Usuario ='" & vp_Obj_Ayudas.Usuario & "' " & _
                       " WHERE AY_Codigo_ID = '" & vp_Obj_Ayudas.Ayudas_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Ayudas (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Ayudas"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseAyudas(ByVal vp_Obj_Ayudas As AyudasClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE AYUDAS WHERE AY_Codigo_ID = '" & vp_Obj_Ayudas.Ayudas_ID & "'")
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
    ''' funcion que trae el listado de Ayudas para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listAyudas(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListAyudas As New List(Of AyudasClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objAyudas As New AyudasClass
            'cargamos datos sobre el objeto de login
            objAyudas.Ayudas_ID = ReadConsulta.GetValue(0)
            objAyudas.Nombre = ReadConsulta.GetValue(1)
            objAyudas.Descripcion = ReadConsulta.GetValue(2)
            objAyudas.FechaActualizacion = ReadConsulta.GetValue(3)
            objAyudas.Usuario = ReadConsulta.GetValue(4)

            'agregamos a la lista
            ObjListAyudas.Add(objAyudas)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListAyudas

    End Function

#End Region

End Class

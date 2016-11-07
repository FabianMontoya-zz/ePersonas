Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class MonedaCodSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla MonedaCod parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllMonedaCod(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListMonedaCod As New List(Of MonedaCodClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT CM_Cod_Moneda_ID,CM_Descripcion,CM_Sigla,CM_Usuario_Creacion,CM_FechaCreacion,CM_Usuario_Actualizacion,CM_FechaActualizacion FROM MONEDA_COD")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT CM_Cod_Moneda_ID,CM_Descripcion,CM_Sigla,CM_Usuario_Creacion,CM_FechaCreacion,CM_Usuario_Actualizacion,CM_FechaActualizacion FROM MONEDA_COD")
            Else
                sql.Append("SELECT CM_Cod_Moneda_ID,CM_Descripcion,CM_Sigla,CM_Usuario_Creacion,CM_FechaCreacion,CM_Usuario_Actualizacion,CM_FechaActualizacion FROM MONEDA_COD " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListMonedaCod = listMonedaCod(StrQuery, Conexion)

        Return ObjListMonedaCod

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo MonedaCod (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCod"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertMonedaCod(ByVal vp_Obj_MonedaCod As MonedaCodClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT MONEDA_COD (" & _
            "CM_Cod_Moneda_ID," & _
            "CM_Descripcion," & _
            "CM_Sigla," & _
            "CM_Usuario_Creacion," & _
            "CM_FechaCreacion," & _
            "CM_Usuario_Actualizacion," & _
            "CM_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_MonedaCod.MonedaCod_ID & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.Sigla & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCod.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del MonedaCod (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCod"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateMonedaCod(ByVal vp_Obj_MonedaCod As MonedaCodClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE MONEDA_COD SET " & _
                       " CM_Descripcion ='" & vp_Obj_MonedaCod.Descripcion & "', " & _
                       " CM_Sigla ='" & vp_Obj_MonedaCod.Sigla & "', " & _
                        " CM_Usuario_Actualizacion ='" & vp_Obj_MonedaCod.UsuarioActualizacion & "', " & _
                       " CM_FechaActualizacion ='" & vp_Obj_MonedaCod.FechaActualizacion & "' " & _
                       " WHERE CM_Cod_Moneda_ID = '" & vp_Obj_MonedaCod.MonedaCod_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del MonedaCod (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCod"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseMonedaCod(ByVal vp_Obj_MonedaCod As MonedaCodClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE MONEDA_COD WHERE CM_Cod_Moneda_ID = '" & vp_Obj_MonedaCod.MonedaCod_ID & "'")
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
    ''' funcion que trae el listado de MonedaCod para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listMonedaCod(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListMonedaCod As New List(Of MonedaCodClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objMonedaCod As New MonedaCodClass
            'cargamos datos sobre el objeto de login
            objMonedaCod.MonedaCod_ID = ReadConsulta.GetValue(0)
            objMonedaCod.Descripcion = ReadConsulta.GetValue(1)

            If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objMonedaCod.Sigla = ReadConsulta.GetValue(2) Else objMonedaCod.Sigla = ""
         
            objMonedaCod.UsuarioCreacion = ReadConsulta.GetValue(3)
            objMonedaCod.FechaCreacion = ReadConsulta.GetValue(4)
            objMonedaCod.UsuarioActualizacion = ReadConsulta.GetValue(5)
            objMonedaCod.FechaActualizacion = ReadConsulta.GetValue(6)

            'agregamos a la lista
            ObjListMonedaCod.Add(objMonedaCod)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListMonedaCod

    End Function

#End Region

End Class

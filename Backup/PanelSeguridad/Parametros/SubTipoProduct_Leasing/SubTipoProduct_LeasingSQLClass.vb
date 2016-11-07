Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class SubTipoProduct_LeasingSQLClass


#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla TP_Leasing parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllTP_Leasing(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListTP_Leasing As New List(Of SubTipoProduct_LeasingClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT STPL_ID,STPL_Descripcion,STPL_FechaActualizacion,STPL_Usuario FROM SUB_TIPOPRODUCTO_LEASING")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT STPL_ID,STPL_Descripcion,STPL_FechaActualizacion,STPL_Usuario FROM SUB_TIPOPRODUCTO_LEASING")
            Else
                sql.Append("SELECT STPL_ID,STPL_Descripcion,STPL_FechaActualizacion,STPL_Usuario FROM SUB_TIPOPRODUCTO_LEASING " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListTP_Leasing = listTP_Leasing(StrQuery, Conexion)

        Return ObjListTP_Leasing

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo TP_Leasing (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_TP_Leasing"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertTP_Leasing(ByVal vp_Obj_TP_Leasing As SubTipoProduct_LeasingClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT SUB_TIPOPRODUCTO_LEASING (" & _
            "STPL_ID," & _
            "STPL_Descripcion," & _
            "STPL_FechaActualizacion," & _
            "STPL_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.STP_Leasing_ID & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.Usuario & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del TP_Leasing (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_TP_Leasing"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateTP_Leasing(ByVal vp_Obj_TP_Leasing As SubTipoProduct_LeasingClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE SUB_TIPOPRODUCTO_LEASING SET " & _
                      " STPL_Descripcion ='" & vp_Obj_TP_Leasing.Descripcion & "', " & _
                       " STPL_FechaActualizacion ='" & vp_Obj_TP_Leasing.FechaActualizacion & "', " & _
                       " STPL_Usuario ='" & vp_Obj_TP_Leasing.Usuario & "' " & _
                       " WHERE STPL_ID = '" & vp_Obj_TP_Leasing.STP_Leasing_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del TP_Leasing (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_TP_Leasing"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseTP_Leasing(ByVal vp_Obj_TP_Leasing As SubTipoProduct_LeasingClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE SUB_TIPOPRODUCTO_LEASING WHERE STPL_ID = '" & vp_Obj_TP_Leasing.STP_Leasing_ID & "'")
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
    ''' funcion que trae el listado de TP_Leasing para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listTP_Leasing(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListTP_Leasing As New List(Of SubTipoProduct_LeasingClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objTP_Leasing As New SubTipoProduct_LeasingClass
            'cargamos datos sobre el objeto de login
            objTP_Leasing.STP_Leasing_ID = ReadConsulta.GetValue(0)
            objTP_Leasing.Descripcion = ReadConsulta.GetValue(1)
            objTP_Leasing.FechaActualizacion = ReadConsulta.GetValue(2)
            objTP_Leasing.Usuario = ReadConsulta.GetValue(3)

            'agregamos a la lista
            ObjListTP_Leasing.Add(objTP_Leasing)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListTP_Leasing

    End Function

#End Region
End Class

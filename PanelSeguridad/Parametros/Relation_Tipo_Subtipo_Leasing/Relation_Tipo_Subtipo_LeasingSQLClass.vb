Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Relation_Tipo_Subtipo_LeasingSQLClass


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

        Dim ObjListTP_Leasing As New List(Of Relation_Tipo_Subtipo_LeasingClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT RTS_Tipo_ID,RTS_Subtipo_ID,RTS_FechaActualizacion,RTS_Usuario,T.TPL_Descripcion,S.STPL_Descripcion FROM R_TIPO_SUBTIPO_LEASING R " & _
                       " INNER JOIN TIPOPRODUCTO_LEASING T ON T.TPL_ID = R.RTS_Tipo_ID " & _
                       " INNER JOIN SUB_TIPOPRODUCTO_LEASING S ON S.STPL_ID =R.RTS_Subtipo_ID ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT RTS_Tipo_ID,RTS_Subtipo_ID,RTS_FechaActualizacion,RTS_Usuario,T.TPL_Descripcion,S.STPL_Descripcion FROM R_TIPO_SUBTIPO_LEASING R " & _
                           " INNER JOIN TIPOPRODUCTO_LEASING T ON T.TPL_ID = R.RTS_Tipo_ID " & _
                           " INNER JOIN SUB_TIPOPRODUCTO_LEASING S ON S.STPL_ID =R.RTS_Subtipo_ID ")
            Else
                sql.Append(" SELECT RTS_Tipo_ID,RTS_Subtipo_ID,RTS_FechaActualizacion,RTS_Usuario,T.TPL_Descripcion,S.STPL_Descripcion FROM R_TIPO_SUBTIPO_LEASING R " & _
                           " INNER JOIN TIPOPRODUCTO_LEASING T ON T.TPL_ID = R.RTS_Tipo_ID " & _
                           " INNER JOIN SUB_TIPOPRODUCTO_LEASING S ON S.STPL_ID =R.RTS_Subtipo_ID " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
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
    Public Function InsertTP_Leasing(ByVal vp_Obj_TP_Leasing As Relation_Tipo_Subtipo_LeasingClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_TIPO_SUBTIPO_LEASING (" & _
            "RTS_Tipo_ID," & _
            "RTS_Subtipo_ID," & _
            "RTS_FechaActualizacion," & _
            "RTS_Usuario" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.Tipo_ID & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.SubTipo_ID & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_TP_Leasing.Usuario & "' ) ")

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
    Public Function EraseTP_Leasing(ByVal vp_Obj_TP_Leasing As Relation_Tipo_Subtipo_LeasingClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE R_TIPO_SUBTIPO_LEASING WHERE RTS_Tipo_ID = '" & vp_Obj_TP_Leasing.Tipo_ID & "' AND RTS_Subtipo_ID = '" & vp_Obj_TP_Leasing.SubTipo_ID & "'")
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
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTipo(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT TPL_ID AS ID, CAST(TPL_ID AS NVARCHAR(3))+ ' - '+  TPL_Descripcion AS Descripcion FROM TIPOPRODUCTO_LEASING ")
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
    Public Function Charge_DropListSubTipo(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT STPL_ID AS ID, CAST(STPL_ID AS NVARCHAR(3))+ ' - '+  STPL_Descripcion AS Descripcion FROM SUB_TIPOPRODUCTO_LEASING ")
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

        Dim ObjListTP_Leasing As New List(Of Relation_Tipo_Subtipo_LeasingClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objTP_Leasing As New Relation_Tipo_Subtipo_LeasingClass
            'cargamos datos sobre el objeto de login
            objTP_Leasing.Tipo_ID = ReadConsulta.GetValue(0)
            objTP_Leasing.SubTipo_ID = ReadConsulta.GetValue(1)
            objTP_Leasing.FechaActualizacion = ReadConsulta.GetValue(2)
            objTP_Leasing.Usuario = ReadConsulta.GetValue(3)

            objTP_Leasing.DescripTipo = ReadConsulta.GetValue(4)
            objTP_Leasing.DescripSubTipo = ReadConsulta.GetValue(5)

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

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' funcion que valida si esta repetido el registro a ingresar
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Relation_Tipo_Subtipo_LeasingClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_TIPO_SUBTIPO_LEASING " & _
                       " WHERE RTS_Tipo_ID = '" & vp_O_Obj.Tipo_ID & "'" & _
                       " AND RTS_Subtipo_ID = '" & vp_O_Obj.SubTipo_ID & "'")


        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region
End Class

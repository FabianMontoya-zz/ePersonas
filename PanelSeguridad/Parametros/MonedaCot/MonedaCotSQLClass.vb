Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class MonedaCotSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla MonedaCot parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllMonedaCot(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListMonedaCot As New List(Of MonedaCotClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT COTM_Cod_Moneda_ID,COTM_Fecha,COTM_ValorCotizacion,COTM_Usuario_Creacion,COTM_FechaCreacion,COTM_Usuario_Actualizacion,COTM_FechaActualizacion,CM_Descripcion FROM MONEDA_COTIZA MCOT " & _
                       " INNER JOIN MONEDA_COD MC ON MC.CM_Cod_Moneda_ID = MCOT.COTM_Cod_Moneda_ID ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT COTM_Cod_Moneda_ID,COTM_Fecha,COTM_ValorCotizacion,COTM_Usuario_Creacion,COTM_FechaCreacion,COTM_Usuario_Actualizacion,COTM_FechaActualizacion,CM_Descripcion FROM MONEDA_COTIZA MCOT " & _
                           " INNER JOIN MONEDA_COD MC ON MC.CM_Cod_Moneda_ID = MCOT.COTM_Cod_Moneda_ID ")
            Else
                sql.Append("SELECT COTM_Cod_Moneda_ID,COTM_Fecha,COTM_ValorCotizacion,COTM_Usuario_Creacion,COTM_FechaCreacion,COTM_Usuario_Actualizacion,COTM_FechaActualizacion,CM_Descripcion FROM MONEDA_COTIZA MCOT " & _
                           " INNER JOIN MONEDA_COD MC ON MC.CM_Cod_Moneda_ID = MCOT.COTM_Cod_Moneda_ID " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListMonedaCot = listMonedaCot(StrQuery, Conexion)

        Return ObjListMonedaCot

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo MonedaCot (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCot"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertMonedaCot(ByVal vp_Obj_MonedaCot As MonedaCotClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT MONEDA_COTIZA (" & _
            "COTM_Cod_Moneda_ID," & _
            "COTM_Fecha," & _
            "COTM_ValorCotizacion," & _
            "COTM_Usuario_Creacion," & _
            "COTM_FechaCreacion," & _
            "COTM_Usuario_Actualizacion," & _
            "COTM_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_MonedaCot.MonedaCot_ID & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCot.Fecha & "',")
        sql.AppendLine("'" & Replace(vp_Obj_MonedaCot.ValorCotizacion, ",", ".") & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCot.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCot.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCot.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_MonedaCot.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del MonedaCot (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCot"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateMonedaCot(ByVal vp_Obj_MonedaCot As MonedaCotClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE MONEDA_COTIZA SET " & _
                       " COTM_Fecha ='" & vp_Obj_MonedaCot.Fecha & "', " & _
                       " COTM_ValorCotizacion ='" & Replace(vp_Obj_MonedaCot.ValorCotizacion, ",", ".") & "', " & _
                       " COTM_Usuario_Actualizacion ='" & vp_Obj_MonedaCot.UsuarioActualizacion & "', " & _
                       " COTM_FechaActualizacion ='" & vp_Obj_MonedaCot.FechaActualizacion & "' " & _
                       " WHERE COTM_Cod_Moneda_ID = '" & vp_Obj_MonedaCot.MonedaCot_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del MonedaCot (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_MonedaCot"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseMonedaCot(ByVal vp_Obj_MonedaCot As MonedaCotClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE MONEDA_COTIZA WHERE COTM_Cod_Moneda_ID = '" & vp_Obj_MonedaCot.MonedaCot_ID & "'")
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
    Public Function Charge_DropListMoneda(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT CM_Cod_Moneda_ID AS ID,CAST(CM_Cod_Moneda_ID AS NVARCHAR(15)) + ' - ' + CM_Descripcion AS DESCRIPCION FROM MONEDA_COD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de MonedaCot para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listMonedaCot(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListMonedaCot As New List(Of MonedaCotClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objMonedaCot As New MonedaCotClass
            'cargamos datos sobre el objeto de login
            objMonedaCot.MonedaCot_ID = ReadConsulta.GetValue(0)
            objMonedaCot.Fecha = ReadConsulta.GetValue(1)
            objMonedaCot.ValorCotizacion = ReadConsulta.GetValue(2)
            objMonedaCot.UsuarioCreacion = ReadConsulta.GetValue(3)
            objMonedaCot.FechaCreacion = ReadConsulta.GetValue(4)
            objMonedaCot.UsuarioActualizacion = ReadConsulta.GetValue(5)
            objMonedaCot.FechaActualizacion = ReadConsulta.GetValue(6)
            objMonedaCot.DescripMoneda = ReadConsulta.GetValue(7)

            'agregamos a la lista
            ObjListMonedaCot.Add(objMonedaCot)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListMonedaCot

    End Function

#End Region

End Class

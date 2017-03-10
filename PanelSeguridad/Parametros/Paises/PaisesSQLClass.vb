Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class PaisesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Paises parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllPaises(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListPaises As New List(Of PaisesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim conexion As String = conex.typeConexion("2")
        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT P.P_Cod, " & _
                       " P.P_Name, " & _
                       " P.P_Moneda," & _
                       " M.CM_Descripcion,  " & _
                       " P.P_SWIFT, " & _
                       " P.P_Calendario_ID, " & _
                       " C.CA_Descripcion,  " & _
                       " P.P_UsuarioCreacion, " & _
                       " P.P_FechaCreacion, " & _
                       " P.P_UsuarioActualizacion, " & _
                       " P.P_FechaActualizacion " & _
                       " FROM PAISES P  " & _
                       " LEFT JOIN MONEDA_COD M ON M.CM_Cod_Moneda_ID = P.P_Moneda " & _
                       " LEFT JOIN CALENDARIOS C ON C.CA_Nit_ID = '0' AND C.CA_Calendario_ID = P.P_Calendario_ID " & _
                       " ORDER BY P.P_Cod ASC ")

        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT P.P_Cod, " & _
                       " P.P_Name, " & _
                       " P.P_Moneda," & _
                       " M.CM_Descripcion,  " & _
                       " P.P_SWIFT, " & _
                       " P.P_Calendario_ID, " & _
                       " C.CA_Descripcion,  " & _
                       " P.P_UsuarioCreacion, " & _
                       " P.P_FechaCreacion, " & _
                       " P.P_UsuarioActualizacion, " & _
                       " P.P_FechaActualizacion " & _
                       " FROM PAISES P  " & _
                       " LEFT JOIN MONEDA_COD M ON M.CM_Cod_Moneda_ID = P.P_Moneda " & _
                       " LEFT JOIN CALENDARIOS C ON C.CA_Nit_ID = '0' AND C.CA_Calendario_ID = P.P_Calendario_ID " & _
                       " ORDER BY P.P_Cod ASC ")
            Else
                sql.Append("  SELECT P.P_Cod, " & _
                       " P.P_Name, " & _
                       " P.P_Moneda," & _
                       " M.CM_Descripcion,  " & _
                       " P.P_SWIFT, " & _
                       " P.P_Calendario_ID, " & _
                       " C.CA_Descripcion,  " & _
                       " P.P_UsuarioCreacion, " & _
                       " P.P_FechaCreacion, " & _
                       " P.P_UsuarioActualizacion, " & _
                       " P.P_FechaActualizacion " & _
                       " FROM PAISES P  " & _
                       " LEFT JOIN MONEDA_COD M ON M.CM_Cod_Moneda_ID = P.P_Moneda " & _
                       " LEFT JOIN CALENDARIOS C ON C.CA_Nit_ID = '0' AND C.CA_Calendario_ID = P.P_Calendario_ID " & _
                       " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%' " & _
                       " ORDER BY P.P_Cod ASC ")
            End If
        End If

        StrQuery = sql.ToString

        ObjListPaises = listPaises(StrQuery, conexion, "List")

        Return ObjListPaises

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Paises (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertPaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector

        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT PAISES (" & _
            " P_Cod, " & _
            " P_Name, " & _
            " P_Moneda, " & _
            " P_SWIFT, " & _
            " P_Calendario_ID, " & _
            " P_UsuarioCreacion, " & _
            " P_FechaCreacion, " & _
            " P_FechaActualizacion, " & _
            " P_UsuarioActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Paises.Cod & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Name & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Moneda & "',")
        sql.AppendLine("'" & vp_Obj_Paises.SWIFT & "',")
        sql.AppendLine("'" & vp_Obj_Paises.Calendario_ID & "',")
        sql.AppendLine("'" & vp_Obj_Paises.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Paises.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Paises.FechaActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Paises.UsuarioActualizacion & "' ) ")

        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la ACTUALIZACION de nuevo Paises (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdatePaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine(" UPDATE PAISES SET " & _
                       " P_Name = '" & vp_Obj_Paises.Name & "'," & _
                       " P_Moneda = '" & vp_Obj_Paises.Moneda & "'," & _
                       " P_SWIFT = '" & vp_Obj_Paises.SWIFT & "'," & _
                       " P_Calendario_ID = '" & vp_Obj_Paises.Calendario_ID & "'," & _
                       " P_FechaActualizacion = '" & vp_Obj_Paises.FechaActualizacion & "'," & _
                       " P_UsuarioActualizacion = '" & vp_Obj_Paises.UsuarioActualizacion & "'" & _
                       " WHERE P_Cod = '" & vp_Obj_Paises.Cod & "'")

        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Paises (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Paises"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ErasePaises(ByVal vp_Obj_Paises As PaisesClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE PAISES WHERE P_Cod = " & vp_Obj_Paises.Cod)
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

        sql.Append(" SELECT CM_Cod_Moneda_ID AS ID, CAST(CM_Cod_Moneda_ID  AS NVARCHAR(5)) + ' - ' + CM_Descripcion AS descripcion FROM MONEDA_COD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Paises para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listPaises(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListPaises As New List(Of PaisesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()


        Select Case vp_S_Type

            Case "Matrix"
                While ReadConsulta.Read

                    Dim objPaises As New PaisesClass

                    objPaises.Cod = ReadConsulta.GetValue(0)
                    objPaises.Name = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objPaises.Calendario_ID = ReadConsulta.GetValue(2) Else objPaises.Calendario_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objPaises.UsuarioCreacion = ReadConsulta.GetValue(3) Else objPaises.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objPaises.FechaCreacion = ReadConsulta.GetValue(4) Else objPaises.FechaCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objPaises.UsuarioActualizacion = ReadConsulta.GetValue(5) Else objPaises.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objPaises.FechaActualizacion = ReadConsulta.GetValue(6) Else objPaises.FechaActualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objPaises.Moneda = ReadConsulta.GetValue(7) Else objPaises.Moneda = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objPaises.SWIFT = ReadConsulta.GetValue(8) Else objPaises.SWIFT = ""
                    'agregamos a la lista
                    ObjListPaises.Add(objPaises)

                End While
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objPaises As New PaisesClass
                    'cargamos datos sobre el objeto de login
                    objPaises.Cod = ReadConsulta.GetValue(0)
                    objPaises.Name = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objPaises.Moneda = ReadConsulta.GetValue(2) Else objPaises.Moneda = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objPaises.Moneda_Descripcion = ReadConsulta.GetValue(3) Else objPaises.Moneda_Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objPaises.SWIFT = ReadConsulta.GetValue(4) Else objPaises.SWIFT = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then objPaises.Calendario_ID = ReadConsulta.GetValue(5) Else objPaises.Calendario_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objPaises.Calendario_Descripcion = ReadConsulta.GetValue(6) Else objPaises.Calendario_Descripcion = ""

                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objPaises.UsuarioCreacion = ReadConsulta.GetValue(7) Else objPaises.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objPaises.FechaCreacion = ReadConsulta.GetValue(8) Else objPaises.FechaCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objPaises.UsuarioActualizacion = ReadConsulta.GetValue(9) Else objPaises.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objPaises.FechaActualizacion = ReadConsulta.GetValue(10) Else objPaises.FechaActualizacion = ""

                    'agregamos a la lista
                    ObjListPaises.Add(objPaises)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListPaises

    End Function

#End Region

#Region "OTRAS FUNCIONES"


#End Region
End Class

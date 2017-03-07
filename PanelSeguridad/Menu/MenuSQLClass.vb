Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class MenuSQLClass

    ''' <summary>
    ''' crea la consulta para el menu
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllOptionsMenu(ByVal vp_S_User As String, ByVal vp_S_Nit As String, ByVal vp_S_Rol_User As String, ByVal vp_S_Encriptado As String)

        Dim ObjListMenu As New List(Of MenuClass)
        Dim StrQuery As String = ""
        Dim StrQueryRol As String = ""

        Dim conex As New Conector
        Dim CONEXION As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.Append(" EXEC MENU_ADMIN_TEMPORAL '" & vp_S_User & "','" & vp_S_Nit & "','" & vp_S_Encriptado & "','" & vp_S_Rol_User & "'")
        StrQuery = sql.ToString
        conex.StrInsert_and_Update_All(StrQuery, "1")

        StrQuery = ""
        sql = New StringBuilder

        sql.Append("  SELECT Nombre," & _
                    "       EstadoUsuario," & _
                    "       IDRol," & _
                    "       DescripcionRol," & _
                    "       Sigla," & _
                    "       IDOpcionRol," & _
                    "       Consecutivo," & _
                    "       Tipo," & _
                    "       Sub_Rol," & _
                    "       IDlink," & _
                    "       DescripcionLink," & _
                    "       Parametro_1," & _
                    "       Parametro_2," & _
                    "       Ruta ," & _
                    "       Usuario, " & _
                    "       NIT, " & _
                    "       DescripcionSubRol " & _
                     " FROM T_TEMPORAL " & _
                    " ORDER BY Tipo, IDOpcionRol asc, CAST(Consecutivo AS BIGINT )")

        StrQuery = sql.ToString

        ObjListMenu = listMenu(StrQuery, CONEXION)

        Return ObjListMenu

    End Function

    ''' <summary>
    ''' funcion que trae el listado para armar el menu
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listMenu(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListMenu As New List(Of MenuClass)
        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()
        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objMenu As New MenuClass
            'cargamos datos sobre el objeto de login
            If Not (IsDBNull(ReadConsulta.GetValue(0))) Then objMenu.Nombre = ReadConsulta.GetValue(0) Else objMenu.Nombre = ""
            If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objMenu.EstadoUsuario = ReadConsulta.GetValue(1) Else objMenu.EstadoUsuario = ""
            If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objMenu.IDRol = ReadConsulta.GetValue(2) Else objMenu.IDRol = ""
            If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objMenu.DescripcionRol = ReadConsulta.GetValue(3) Else objMenu.DescripcionRol = ""
            If Not (IsDBNull(ReadConsulta.GetValue(4))) Then objMenu.Sigla = ReadConsulta.GetValue(4) Else objMenu.Sigla = ""
            objMenu.IDOpcionRol = ReadConsulta.GetValue(5)
            objMenu.Consecutivo = ReadConsulta.GetValue(6)
            objMenu.Tipo = ReadConsulta.GetValue(7)
            objMenu.Sub_Rol = ReadConsulta.GetValue(8)
            If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objMenu.IDlink = ReadConsulta.GetValue(9) Else objMenu.IDlink = ""
            If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objMenu.DescripcionLink = ReadConsulta.GetValue(10) Else objMenu.DescripcionLink = ""
            If Not (IsDBNull(ReadConsulta.GetValue(11))) Then objMenu.Parametro_1 = ReadConsulta.GetValue(11) Else objMenu.Parametro_1 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(12))) Then objMenu.Parametro_2 = ReadConsulta.GetValue(12) Else objMenu.Parametro_2 = ""
            If Not (IsDBNull(ReadConsulta.GetValue(13))) Then objMenu.Ruta = ReadConsulta.GetValue(13) Else objMenu.Ruta = ""
            If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objMenu.Usuario = ReadConsulta.GetValue(14) Else objMenu.Usuario = ""
            If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objMenu.Nit = ReadConsulta.GetValue(15) Else objMenu.Nit = ""
            If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objMenu.DescripcionSubRol = ReadConsulta.GetValue(16) Else objMenu.DescripcionSubRol = ""
         
            'agregamos a la lista
            ObjListMenu.Add(objMenu)

        End While

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListMenu

    End Function

End Class

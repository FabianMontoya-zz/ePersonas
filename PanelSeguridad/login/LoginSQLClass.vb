Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class LoginSQLClass

    ''' <summary>
    ''' funcion query para la actualizacion de la contrazeña desde el login
    ''' </summary>
    ''' <param name="pl_S_User"></param>
    ''' <param name="pl_S_Password"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_ChagePassword(ByVal pl_S_User As String, ByVal pl_S_Password As String)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" UPDATE Usuarios SET " & _
                   " U_password = '" & pl_S_Password & _
                   "' WHERE  U_Usuario_ID = '" & UCase(pl_S_User) & "'")

        StrQuery = sql.ToString

        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion query para la actualizacion de la contraseña desde el panel administrativo
    ''' </summary>
    ''' <param name="pl_obj_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_PasswordADM(ByVal pl_obj_User As LoginClass)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" UPDATE Usuarios SET " & _
                   " U_password = '" & pl_obj_User.Password & "'," & _
                   " U_Estado = '" & pl_obj_User.Estado & "', " & _
                   " U_Intentos_Fallidos = '0' " & _
                   " WHERE  U_Nit_ID = '" & pl_obj_User.Nit_ID & "'" & _
                   " AND  U_Usuario_ID = '" & UCase(pl_obj_User.Name) & "'")

        StrQuery = sql.ToString

        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion query para la consulta tabla Usuarios para ingreso a la aplicacion
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllUserLogin()

        Dim objUser As New LoginClass
        Dim ObjListLogin As New List(Of LoginClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append("SELECT U_Usuario_ID, U_password, U_Estado FROM USUARIOS") '[ARREGLAR PUES NO SE PUEDE CONSULTAR TODOS LOS USUARIOS Y LUEGO REVISAR]
        'sql.Append("SELECT U_Nit_ID, U_Usuario_ID, U_password, U_Estado FROM USUARIOS")
        StrQuery = sql.ToString

        ObjListLogin = ListLogin(StrQuery, Conexion)

        Return ObjListLogin

    End Function

    ''' <summary>
    ''' funcion query para la consulta tabla Usuarios para ingreso a la aplicacion
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ConsultarExiste(ByVal vp_S_StrQuery As LoginClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.AppendLine("SELECT COUNT(1) FROM USUARIOS " & _
                       " WHERE U_Nit_ID = '" & vp_S_StrQuery.Nit_ID & "' " & _
                       " AND U_Usuario_ID = '" & vp_S_StrQuery.Name & "'")
        StrQuery = sql.ToString

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' trae el listado solicitado por login
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListLogin(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListLogin As New List(Of LoginClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()
        'recorremos la consulta por la cantidad de datos en la BD
        While ReadConsulta.Read

            Dim objUser As New LoginClass
            'cargamos datos sobre el objeto de login
            objUser.Name = ReadConsulta.GetString(0)
            objUser.Password = ReadConsulta.GetString(1)
            objUser.Estado = ReadConsulta.GetString(2)
            'agregamos a la lista
            ObjListLogin.Add(objUser)

        End While
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListLogin
    End Function

End Class

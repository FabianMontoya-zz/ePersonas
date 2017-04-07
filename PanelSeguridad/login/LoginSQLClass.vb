Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class LoginSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion query para la actualizacion de la contrazeña desde el login
    ''' </summary>
    ''' <param name="pl_S_User"></param>
    ''' <param name="pl_S_Password"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_ChagePassword(ByVal pl_S_Nit_ID As String, ByVal pl_S_User As String, ByVal pl_S_Password As String)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder
        sql.Append(" UPDATE Usuarios SET " & _
                   " U_password = '" & pl_S_Password & "'" & _
                   " WHERE  U_Nit_ID = '" & pl_S_Nit_ID & "'" & _
                   " AND  U_Usuario_ID = '" & UCase(pl_S_User) & "'")

        StrQuery = sql.ToString

        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion query para la actualizacion de la contraseña desde el panel administrativo
    ''' </summary>
    ''' <param name="vp_obj_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Update_PasswordADM(ByVal vp_obj_User As LoginClass)

        Dim vl_S_processUpdate As String
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        Select Case vp_obj_User.Estado
            Case "3" 'reseteo de contraseña
                sql.Append(" UPDATE Usuarios SET " & _
                                     " U_password = '" & vp_obj_User.Password & "'," & _
                                     " U_Intentos_Fallidos = '0' " & _
                                     " WHERE  U_Nit_ID = '" & vp_obj_User.Nit_ID & "' AND  U_Usuario_ID = '" & UCase(vp_obj_User.Usuario_ID) & "'")

            Case "2" 'usuario eliminado
                sql.Append(" UPDATE Usuarios SET " & _
                                      " U_Estado = '" & vp_obj_User.Estado & "', " & _
                                      " U_Intentos_Fallidos = '0' " & _
                                      " WHERE  U_Nit_ID = '" & vp_obj_User.Nit_ID & "' AND  U_Usuario_ID = '" & UCase(vp_obj_User.Usuario_ID) & "'")

            Case "1" 'usuario inactivo
                sql.Append(" UPDATE Usuarios SET " & _
                                       " U_Estado = '" & vp_obj_User.Estado & "', " & _
                                       " U_Intentos_Fallidos = '0' " & _
                                       " WHERE  U_Nit_ID = '" & vp_obj_User.Nit_ID & "' AND  U_Usuario_ID = '" & UCase(vp_obj_User.Usuario_ID) & "'")

            Case "0" 'usuario activo
                sql.Append(" UPDATE Usuarios SET " & _
                                      " U_Estado = '" & vp_obj_User.Estado & "', " & _
                                      " U_password = '" & vp_obj_User.Password & "'," & _
                                      " U_Intentos_Fallidos = '0' " & _
                                       " WHERE  U_Nit_ID = '" & vp_obj_User.Nit_ID & "' AND  U_Usuario_ID = '" & UCase(vp_obj_User.Usuario_ID) & "'")

        End Select

        StrQuery = sql.ToString
        vl_S_processUpdate = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return vl_S_processUpdate

    End Function

#End Region


#Region "CARGAR LISTAS"

    ''' <summary>
    ''' trae el listado solicitado por login
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ListLogin(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

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

        Select Case vp_S_Type

            Case "Verificar"

                While ReadConsulta.Read

                    Dim objUser As New LoginClass
                    'cargamos datos sobre el objeto de login
                    objUser.Estado = ReadConsulta.GetString(0)
                    objUser.Password = ReadConsulta.GetString(1)
                    'agregamos a la lista
                    ObjListLogin.Add(objUser)

                End While

            Case "AllInformation"

                While ReadConsulta.Read

                    Dim objUser As New LoginClass
                    'cargamos datos sobre el objeto de login
                    objUser.Nit_ID = ReadConsulta.GetValue(0)
                    objUser.Usuario_ID = ReadConsulta.GetValue(1)
                    objUser.TypeDocument = ReadConsulta.GetValue(2)
                    objUser.Documento = ReadConsulta.GetValue(3)
                    objUser.Nombre = ReadConsulta.GetValue(4)
                    objUser.Rol_Nit_ID = ReadConsulta.GetValue(5)
                    objUser.Rol_ID = ReadConsulta.GetValue(6)
                    objUser.Estado = ReadConsulta.GetValue(7)
                    objUser.Acceso_Informacion = ReadConsulta.GetValue(8)
                    objUser.Nivel_Politica_Seguridad_Grupo = ReadConsulta.GetValue(9)
                    objUser.Politica_Seguridad = ReadConsulta.GetValue(10)
                    objUser.Acceso_Documentos = ReadConsulta.GetValue(11)
                    objUser.Grupo_Documentos_Nit_ID = ReadConsulta.GetValue(12)
                    objUser.Grupo_Documentos = ReadConsulta.GetValue(13)
                    objUser.Acceso_Informacion_Documentos = ReadConsulta.GetValue(14)
                    objUser.Acceso_Reportes = ReadConsulta.GetValue(15)
                    objUser.Grupo_Reportes_Nit_ID = ReadConsulta.GetValue(16)
                    objUser.Grupo_Reportes = ReadConsulta.GetValue(17)
                    objUser.Acceso_Informacion_Reportes = ReadConsulta.GetValue(18)
                    objUser.Token = ReadConsulta.GetValue(19)
                    'agregamos a la lista
                    ObjListLogin.Add(objUser)

                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListLogin
    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Función que se encarga de consultar todos los parametros asignados a un usuario
    ''' </summary>
    ''' <param name="vp_S_User"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InformacionUser(ByVal vp_S_User As LoginClass)

        Dim objUser As New LoginClass
        Dim ObjListLogin As New List(Of LoginClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append("SELECT " & _
                   "U_Nit_ID, " & _
                   "U_Usuario_ID, " & _
                   "U_Type_Document, " & _
                   "U_Documento, " & _
                   "U_Nombre, " & _
                   "U_Rol_Nit_ID, " & _
                   "U_Rol_ID, " & _
                   "U_Estado, " & _
                   "U_Acceso_Informacion, " & _
                   "U_Nivel_Politica_Seguridad_Grupo, " & _
                   "U_Politica_Seguridad, " & _
                   "U_Acceso_Documentos, " & _
                   "U_Grupo_Documentos_Nit_ID, " & _
                   "U_Grupo_Documentos, " & _
                   "U_Acceso_Informacion_Documentos, " & _
                   "U_Acceso_Reportes, " & _
                   "U_Grupo_Reportes_Nit_ID, " & _
                   "U_Grupo_Reportes, " & _
                   "U_Acceso_Informacion_Reportes, " & _
                   "U_Token " & _
                   "FROM USUARIOS " & _
                   "WHERE U_Nit_ID = '" & vp_S_User.Nit_ID & "' AND U_Usuario_ID = '" & vp_S_User.Usuario_ID & "'")
        StrQuery = sql.ToString

        ObjListLogin = ListLogin(StrQuery, Conexion, "AllInformation")

        Return ObjListLogin
    End Function

    ''' <summary>
    ''' Función que trae el estado y contraseña del usuario para hacer la validación en Login
    ''' </summary>
    ''' <param name="vp_S_NitID"></param>
    ''' <param name="vp_S_UserID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Verify_User(ByVal vp_S_NitID As String, ByVal vp_S_UserID As String)

        Dim objUser As New LoginClass
        Dim ObjListLogin As New List(Of LoginClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.Append("SELECT U_Estado, U_password FROM USUARIOS " & _
                   "WHERE U_Nit_ID = '" & vp_S_NitID & "' AND U_Usuario_ID = '" & vp_S_UserID & "'")
        StrQuery = sql.ToString

        ObjListLogin = ListLogin(StrQuery, Conexion, "Verificar")

        Return ObjListLogin

    End Function

    ''' <summary>
    ''' Función encargada de buscar si existe un usuario con los datos registrado
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
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
                       " AND U_Usuario_ID = '" & vp_S_StrQuery.Usuario_ID & "'")
        StrQuery = sql.ToString

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result

    End Function

    ''' <summary>
    ''' Función encargada de buscar si existe un usuario con los datos registrado
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ConsultarEstado(ByVal vp_S_StrQuery As LoginClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder
        sql.AppendLine(" SELECT U_Estado FROM USUARIOS " & _
                       " WHERE U_Nit_ID = '" & vp_S_StrQuery.Nit_ID & "' " & _
                       " AND U_Usuario_ID = '" & vp_S_StrQuery.Usuario_ID & "'")
        StrQuery = sql.ToString

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result

    End Function

#End Region

End Class

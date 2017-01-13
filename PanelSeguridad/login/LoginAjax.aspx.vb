Imports Newtonsoft.Json

Public Class LoginAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Ingresar"
                    ingresar()

                Case "Cliente"
                    CargarCliente()

                Case "Loggear"
                    AllInformationUser()

            End Select

        End If
    End Sub

    ''' <summary>
    ''' Función que valida Si el usuario existe o si es para cambio de Contraseña, Si no, lo envia a validar User y Password
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ingresar()

        Dim ResultUsuarios As String
        Dim vl_I_Resultado As Integer

        Dim LoginClass As New LoginClass
        Dim SQL_Login As New LoginSQLClass


        LoginClass.Usuario_ID = Request.Form("user")
        LoginClass.Nit_ID = Request.Form("NIT")

        ResultUsuarios = SQL_Login.ConsultarExiste(LoginClass)

        'Verificamos que el usuario exista
        If ResultUsuarios > 0 Then
            vl_I_Resultado = VerificarDatosLogin(Request.Form("NIT"), Request.Form("user"), Request.Form("password"))
        Else
            vl_I_Resultado = 2 'no existe usuario
        End If

        Response.Write(vl_I_Resultado)

    End Sub

    ''' <summary>
    ''' Función que hace la consulta de todos los parametros asociados al usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub AllInformationUser()

        Dim LoginClass As New LoginClass
        Dim ObjListInfoUser As New List(Of LoginClass)
        Dim SQL_Login As New LoginSQLClass


        LoginClass.Usuario_ID = Request.Form("Usuario")
        LoginClass.Nit_ID = Request.Form("NIT")

        ObjListInfoUser = SQL_Login.InformacionUser(LoginClass)

        Response.Write(JsonConvert.SerializeObject(ObjListInfoUser.ToArray()))

    End Sub

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCliente()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListCliente(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"
    ''' <summary>
    ''' Función que valida si el usuario y contraseña Existe
    ''' </summary>
    ''' <param name="vp_S_NIT_ID"></param>
    ''' <param name="vp_S_User_ID"></param>
    ''' <param name="vp_S_Password"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function VerificarDatosLogin(ByVal vp_S_NIT_ID As String, ByVal vp_S_User_ID As String, ByVal vp_S_Password As String)

        Dim vl_I_Resultado As String = ""
        Dim vl_S_password_Encript, vl_S_User_Encript As String
        Dim Encrip As New EncriptarClass
        Dim LoginClass As New LoginClass
        Dim SQL_Login As New LoginSQLClass

        Dim ObjListLogin As New List(Of LoginClass)

        'llamamos al procedimiento de encripcion
        vl_S_password_Encript = Encrip.Encriptacion_MD5(vp_S_Password)
        vl_S_User_Encript = Encrip.Encriptacion_MD5(vp_S_User_ID)
        'llamamos modulo de consultas SQL(todos los usuarios) 
        ObjListLogin = SQL_Login.Verify_User(vp_S_NIT_ID, vp_S_User_ID)
        'recorremos la lista de la consulta

        'verificamos el estado del usuario
        For Each Usuario In ObjListLogin
            'Verificamos si es usuario para cambiar contraseña o si ya la cambió y va a hacer ingreso normal
            If Usuario.Password = vl_S_User_Encript Then
                vl_I_Resultado = 3 'cambio de password
            Else
                If Usuario.Estado = "1" Then
                    vl_I_Resultado = 4 'Usuario deshabilitado
                    Exit For
                ElseIf Usuario.Estado = "2" Then
                    vl_I_Resultado = 5 'Usuario eliminado
                    Exit For
                ElseIf Usuario.Estado = "0" Then
                    'Como el Usuario está habilitado para ingreso verificamos que el password sea correcto
                    If Usuario.Password = vl_S_password_Encript Then
                        vl_I_Resultado = 0 'Todo Correcto, se autoriza Ingreso
                    Else
                        vl_I_Resultado = 1 'Contraseña incorrecta
                    End If
                End If
            End If

        Next

        Return vl_I_Resultado
    End Function

#End Region

End Class
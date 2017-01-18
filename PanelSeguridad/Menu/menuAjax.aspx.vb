Imports Newtonsoft.Json

Public Class menuAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "consulta"
                    Consulta_menu()

                Case "Date_User"
                    InformationUser()

            End Select

        End If
    End Sub

    ''' <summary>
    ''' traemos todos los datos para construir el menu
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_menu()

        Dim SQL_Menu As New MenuSQLClass
        Dim ObjListMenu As New List(Of MenuClass)
        Dim Encrip As New EncriptarClass

        Dim vl_S_User = Request.Form("user")
        Dim vl_S_Encriptado = Request.Form("Encrip")
        Dim vl_S_Nit = Encrip.desencriptaDato(vl_S_Encriptado)

        ObjListMenu = SQL_Menu.Read_AllOptionsMenu(vl_S_User, vl_S_Nit, vl_S_Encriptado)
        'serializamos el objeto
        Response.Write(JsonConvert.SerializeObject(ObjListMenu.ToArray()))

    End Sub

    ''' <summary>
    ''' Función que hace la consulta de todos los parametros asociados al usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InformationUser()

        Dim LoginClass As New LoginClass
        Dim ObjListInfoUser As New List(Of LoginClass)
        Dim SQL_Login As New LoginSQLClass

        Dim Encrip As New EncriptarClass


        LoginClass.Usuario_ID = Request.Form("Usuario")
        LoginClass.Password = Request.Form("NIT")
        LoginClass.Nit_ID = Encrip.desencriptaDato(LoginClass.Password)

        ObjListInfoUser = SQL_Login.InformacionUser(LoginClass)

        Response.Write(JsonConvert.SerializeObject(ObjListInfoUser.ToArray()))

    End Sub
End Class
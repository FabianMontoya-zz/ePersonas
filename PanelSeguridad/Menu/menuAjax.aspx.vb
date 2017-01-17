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

        ObjListMenu = SQL_Menu.Read_AllOptionsMenu(vl_S_User, vl_S_Nit)
        'serializamos el objeto
        Response.Write(JsonConvert.SerializeObject(ObjListMenu.ToArray()))

    End Sub

End Class
Imports Newtonsoft.Json

Public Class Adm_ResetUserAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "reset"
                    ResetUser()

                Case "Cliente"
                    CargarCliente()

            End Select

        End If
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
    ''' funcion para cambiar estado o resetear el usuario
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ResetUser()
        Dim objReset As New LoginClass
        Dim ObjListReset As New List(Of LoginClass)
        Dim Encriptar As New EncriptarClass
        Dim SQL_Reset As New LoginSQLClass
        Dim vl_s_IDxiste, vl_s_Estado As String
        Dim result As String = ""

        objReset.Nit_ID = Request.Form("NIT")
        objReset.Usuario_ID = Request.Form("ID")
        objReset.Estado = Request.Form("estado")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Reset.ConsultarExiste(objReset)

        If vl_s_IDxiste = 1 Then

            'VALIDAMOS EL ESTADO DEL USUARIO ACTUALMENTE
            vl_s_Estado = SQL_Reset.ConsultarEstado(objReset)

            If objReset.Estado = "3" Or objReset.Estado = "0" Then

                Select Case vl_s_Estado

                    Case 3 'RESETEO
                        objReset.Password = Encriptar.Encriptacion_MD5(UCase(objReset.Usuario_ID))
                        ' se valida si sa resetea la contraseña
                        ObjListReset.Add(objReset)
                        result = SQL_Reset.Update_PasswordADM(objReset)

                    Case 2  'ELIMINADO
                        result = "ELIMINADO"

                    Case 1 'INACTIVO
                        objReset.Password = Encriptar.Encriptacion_MD5(UCase(objReset.Usuario_ID))
                        ' se valida si sa resetea la contraseña
                        ObjListReset.Add(objReset)
                        result = SQL_Reset.Update_PasswordADM(objReset)

                    Case 0 'NORMAL

                        If objReset.Estado = "3" Then
                            objReset.Password = Encriptar.Encriptacion_MD5(UCase(objReset.Usuario_ID))
                            ' se valida si sa resetea la contraseña
                            ObjListReset.Add(objReset)
                            result = SQL_Reset.Update_PasswordADM(objReset)
                        Else
                            result = "ACTIVO"
                        End If


                End Select

            Else
                ' se valida si sa resetea la contraseña
                ObjListReset.Add(objReset)
                result = SQL_Reset.Update_PasswordADM(objReset)
            End If
        Else
            result = "NO_EXISTE"
        End If

        Response.Write(result)
    End Sub

#End Region

End Class
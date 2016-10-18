Imports Newtonsoft.Json

Public Class InvPuertaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Cliente"
                    CargarCliente()

                Case "crear"
                    InsertInvPuerta()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla InvPuerta (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertInvPuerta()

        Dim objInvPuerta As New InvPuertaClass
        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListInvPuerta As New List(Of InvPuertaClass)
        Dim objListPersona As New List(Of ClienteClass)
        Dim SQL_Persona As New ClienteSQLClass

        Dim result As String = ""
        Dim vl_s_IDxiste As String

        objInvPuerta.Nit_ID = Request.Form("Nit_ID")
        objInvPuerta.Tarjeta_ID = Request.Form("ID_Tarjeta")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_InvPuerta.Consulta_Repetido(objInvPuerta)

        Select Case vl_s_IDxiste
            Case "Asignada"
                result = "Asignada"

            Case "Existe"
                result = "Existe"

            Case "Nuevo"
                objInvPuerta.Estado = 0
                objInvPuerta.MotivoBloqueo = 0
                objInvPuerta.ChequeaVigencias = Request.Form("Vigencia")
                objInvPuerta.Fecha_Inicio_Vigencia = Request.Form("FechaInicial")
                objInvPuerta.Fecha_Final_Vigencia = Request.Form("FechaFinal")

                objInvPuerta.UsuarioCreacion = Request.Form("user")
                objInvPuerta.FechaCreacion = Date.Now
                objInvPuerta.UsuarioActualizacion = Request.Form("user")
                objInvPuerta.FechaActualizacion = Date.Now

                Dim user_log As Integer = 0
                objListPersona = SQL_Persona.InformacionUsuario(objInvPuerta.UsuarioCreacion)

                For Each item_list As ClienteClass In objListPersona
                    user_log = 1
                    objInvPuerta.Nit_ID_Custodia = item_list.Nit_ID
                    objInvPuerta.TypeDocument_ID_Custodia = item_list.TypeDocument_ID
                    objInvPuerta.Document_ID_Custodia = item_list.Document_ID
                Next

                If user_log = 1 Then
                    ObjListInvPuerta.Add(objInvPuerta)
                    result = SQL_InvPuerta.InsertInvPuerta(objInvPuerta)
                Else
                    result = "NO_USER"
                End If
              
        End Select

        Response.Write(result)

    End Sub

#End Region

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

#End Region

End Class
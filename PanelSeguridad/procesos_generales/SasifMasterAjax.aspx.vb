Imports Newtonsoft.Json

Public Class SasifMasterAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "encabezado"
                    ListEncabezado()

                Case "Men"
                    ListMensajes()

                Case "Ayu"
                    ListAyudas()

                Case "EraseDocument"
                    EraseDocument()

            End Select
        End If

    End Sub

    ''' <summary>
    ''' funcion que trae los datos del aplicativo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ListEncabezado()

        Dim SQLGeneral As New GeneralSQLClass
        Dim ObjListGeneral As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListGeneral = SQLGeneral.ChargeEncabezado(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListGeneral.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que trae los mensajes de error del aplicativo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ListMensajes()

        Dim SQLGeneral As New GeneralSQLClass
        Dim ObjList As New List(Of MensajesClass)
      
        ObjList = SQLGeneral.ChargeMensajes()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que trae las Ayudas del aplicativo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ListAyudas()

        Dim SQLGeneral As New GeneralSQLClass
        Dim ObjList As New List(Of AyudasClass)

        ObjList = SQLGeneral.ChargeAyudas()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' borra documentos de la ruta relativa 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseDocument()

        Dim Doc As New DocumentoClass
        Dim ListDocument As New List(Of DocumentoClass)
        Dim vl_S_ListDocument As String = Request.Form("ListDocument")

        ListDocument = Doc.InsertList_Documentos(vl_S_ListDocument)

        If ListDocument.Count > 0 Then

            For Each objDocument As DocumentoClass In ListDocument
                Dim result = Doc.Delete_Document_Folder_View(objDocument.RutaDocumentoVisualizacion, objDocument.Nombre_Save & "." & objDocument.DescripFormato)
            Next

        End If

    End Sub

End Class
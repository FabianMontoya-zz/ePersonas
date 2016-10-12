Imports Newtonsoft.Json

Public Class InvPuertaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_InvPuerta()

                Case "crear"
                    InsertInvPuerta()

                Case "modificar"
                    UpdateInvPuerta()

                Case "elimina"
                    EraseInvPuerta()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla InvPuerta (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_InvPuerta()

        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListInvPuerta As New List(Of InvPuertaClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListInvPuerta = SQL_InvPuerta.Read_AllInvPuerta(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListInvPuerta Is Nothing Then

            Dim objInvPuerta As New InvPuertaClass
            ObjListInvPuerta = New List(Of InvPuertaClass)

            objInvPuerta.Descripcion = ""
            objInvPuerta.FechaActualizacion = ""
            objInvPuerta.UsuarioCreacion = ""

            ObjListInvPuerta.Add(objInvPuerta)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListInvPuerta.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla InvPuerta (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertInvPuerta()

        Dim objInvPuerta As New InvPuertaClass
        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objInvPuerta.Nit_ID = Request.Form("Nit_ID")
        objInvPuerta.InvPuerta_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_InvPuerta.Consulta_Repetido(objInvPuerta)

        If vl_s_IDxiste = 0 Then

            objInvPuerta.Descripcion = Request.Form("descripcion")
            objInvPuerta.Cod_Numeric = Request.Form("CNumeric")
            objInvPuerta.Cod_AlfaNumeric = Request.Form("CAlfaNumeric")

            objInvPuerta.UsuarioCreacion = Request.Form("user")
            objInvPuerta.FechaCreacion = Date.Now
            objInvPuerta.UsuarioActualizacion = Request.Form("user")
            objInvPuerta.FechaActualizacion = Date.Now

            ObjListInvPuerta.Add(objInvPuerta)

            result = SQL_InvPuerta.InsertInvPuerta(objInvPuerta)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla InvPuerta (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateInvPuerta()

        Dim objInvPuerta As New InvPuertaClass
        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

        Dim result As String

        objInvPuerta.Nit_ID = Request.Form("Nit_ID")
        objInvPuerta.InvPuerta_ID = Request.Form("ID")
        objInvPuerta.Descripcion = Request.Form("descripcion")
        objInvPuerta.Cod_Numeric = Request.Form("CNumeric")
        objInvPuerta.Cod_AlfaNumeric = Request.Form("CAlfaNumeric")

        objInvPuerta.UsuarioActualizacion = Request.Form("user")
        objInvPuerta.FechaActualizacion = Date.Now

        ObjListInvPuerta.Add(objInvPuerta)

        result = SQL_InvPuerta.UpdateInvPuerta(objInvPuerta)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla InvPuerta (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseInvPuerta()

        Dim objInvPuerta As New InvPuertaClass
        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListInvPuerta As New List(Of InvPuertaClass)

        Dim result As String

        objInvPuerta.Nit_ID = Request.Form("Nit_ID")
        objInvPuerta.InvPuerta_ID = Request.Form("ID")
        ObjListInvPuerta.Add(objInvPuerta)

        result = SQL_InvPuerta.EraseInvPuerta(objInvPuerta)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_InvPuerta As New InvPuertaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_InvPuerta.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

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
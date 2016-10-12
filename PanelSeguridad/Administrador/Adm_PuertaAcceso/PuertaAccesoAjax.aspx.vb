Imports Newtonsoft.Json

Public Class PuertaAccesoAjax
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
                    Consulta_PuertaAcceso()

                Case "crear"
                    InsertPuertaAcceso()

                Case "modificar"
                    UpdatePuertaAcceso()

                Case "elimina"
                    ErasePuertaAcceso()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla PuertaAcceso (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_PuertaAcceso()

        Dim SQL_PuertaAcceso As New PuertaAccesoSQLClass
        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListPuertaAcceso = SQL_PuertaAcceso.Read_AllPuertaAcceso(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListPuertaAcceso Is Nothing Then

            Dim objPuertaAcceso As New PuertaAccesoClass
            ObjListPuertaAcceso = New List(Of PuertaAccesoClass)

            objPuertaAcceso.Descripcion = ""
            objPuertaAcceso.FechaActualizacion = ""
            objPuertaAcceso.UsuarioCreacion = ""

            ObjListPuertaAcceso.Add(objPuertaAcceso)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListPuertaAcceso.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla PuertaAcceso (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertPuertaAcceso()

        Dim objPuertaAcceso As New PuertaAccesoClass
        Dim SQL_PuertaAcceso As New PuertaAccesoSQLClass
        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objPuertaAcceso.Nit_ID = Request.Form("Nit_ID")
        objPuertaAcceso.PuertaAcceso_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_PuertaAcceso.Consulta_Repetido(objPuertaAcceso)

        If vl_s_IDxiste = 0 Then

            objPuertaAcceso.Descripcion = Request.Form("descripcion")
            objPuertaAcceso.Cod_Numeric = Request.Form("CNumeric")
            objPuertaAcceso.Cod_AlfaNumeric = Request.Form("CAlfaNumeric")

            objPuertaAcceso.UsuarioCreacion = Request.Form("user")
            objPuertaAcceso.FechaCreacion = Date.Now
            objPuertaAcceso.UsuarioActualizacion = Request.Form("user")
            objPuertaAcceso.FechaActualizacion = Date.Now

            ObjListPuertaAcceso.Add(objPuertaAcceso)

            result = SQL_PuertaAcceso.InsertPuertaAcceso(objPuertaAcceso)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla PuertaAcceso (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdatePuertaAcceso()

        Dim objPuertaAcceso As New PuertaAccesoClass
        Dim SQL_PuertaAcceso As New PuertaAccesoSQLClass
        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)

        Dim result As String

        objPuertaAcceso.Nit_ID = Request.Form("Nit_ID")
        objPuertaAcceso.PuertaAcceso_ID = Request.Form("ID")
        objPuertaAcceso.Descripcion = Request.Form("descripcion")
        objPuertaAcceso.Cod_Numeric = Request.Form("CNumeric")
        objPuertaAcceso.Cod_AlfaNumeric = Request.Form("CAlfaNumeric")

        objPuertaAcceso.UsuarioActualizacion = Request.Form("user")
        objPuertaAcceso.FechaActualizacion = Date.Now

        ObjListPuertaAcceso.Add(objPuertaAcceso)

        result = SQL_PuertaAcceso.UpdatePuertaAcceso(objPuertaAcceso)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla PuertaAcceso (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ErasePuertaAcceso()

        Dim objPuertaAcceso As New PuertaAccesoClass
        Dim SQL_PuertaAcceso As New PuertaAccesoSQLClass
        Dim ObjListPuertaAcceso As New List(Of PuertaAccesoClass)

        Dim result As String

        objPuertaAcceso.Nit_ID = Request.Form("Nit_ID")
        objPuertaAcceso.PuertaAcceso_ID = Request.Form("ID")
        ObjListPuertaAcceso.Add(objPuertaAcceso)

        result = SQL_PuertaAcceso.ErasePuertaAcceso(objPuertaAcceso)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_PuertaAcceso As New PuertaAccesoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_PuertaAcceso.ReadCharge_DropList(vl_S_Tabla)
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
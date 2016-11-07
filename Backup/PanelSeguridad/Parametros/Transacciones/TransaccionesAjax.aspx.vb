Imports Newtonsoft.Json

Public Class TransaccionesAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Cliente"
                    CargarCliente()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Transacciones()

                Case "crear"
                    InsertTransacciones()

                Case "modificar"
                    UpdateTransacciones()

                Case "elimina"
                    EraseTransacciones()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Transacciones (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Transacciones()

        Dim SQL_Transacciones As New TransaccionesSQLClass
        Dim ObjListTransacciones As New List(Of TransaccionesClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListTransacciones = SQL_Transacciones.Read_AllTransacciones(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListTransacciones Is Nothing Then

            Dim objTransacciones As New TransaccionesClass
            ObjListTransacciones = New List(Of TransaccionesClass)

            objTransacciones.Descripcion = ""
            objTransacciones.FechaActualizacion = ""
            objTransacciones.Usuario = ""

            ObjListTransacciones.Add(objTransacciones)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListTransacciones.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Transacciones (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertTransacciones()

        Dim objTransacciones As New TransaccionesClass
        Dim SQL_Transacciones As New TransaccionesSQLClass
        Dim ObjListTransacciones As New List(Of TransaccionesClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objTransacciones.Nit_ID = Request.Form("Nit_ID")
        objTransacciones.Transacciones_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Transacciones.Consulta_Repetido(objTransacciones)

        If vl_s_IDxiste = 0 Then

            objTransacciones.Descripcion = Request.Form("descripcion")
            objTransacciones.FechaActualizacion = Date.Now
            objTransacciones.Usuario = Request.Form("user")

            ObjListTransacciones.Add(objTransacciones)

            result = SQL_Transacciones.InsertTransacciones(objTransacciones)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Transacciones (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateTransacciones()

        Dim objTransacciones As New TransaccionesClass
        Dim SQL_Transacciones As New TransaccionesSQLClass
        Dim ObjListTransacciones As New List(Of TransaccionesClass)

        Dim result As String

        objTransacciones.Nit_ID = Request.Form("Nit_ID")
        objTransacciones.Transacciones_ID = Request.Form("ID")
        objTransacciones.Descripcion = Request.Form("descripcion")
        objTransacciones.FechaActualizacion = Date.Now
        objTransacciones.Usuario = Request.Form("user")

        ObjListTransacciones.Add(objTransacciones)

        result = SQL_Transacciones.UpdateTransacciones(objTransacciones)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Transacciones (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseTransacciones()

        Dim objTransacciones As New TransaccionesClass
        Dim SQL_Transacciones As New TransaccionesSQLClass
        Dim ObjListTransacciones As New List(Of TransaccionesClass)

        Dim result As String

        objTransacciones.Nit_ID = Request.Form("Nit_ID")
        objTransacciones.Transacciones_ID = Request.Form("ID")
        ObjListTransacciones.Add(objTransacciones)

        result = SQL_Transacciones.EraseTransacciones(objTransacciones)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Transacciones As New TransaccionesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Transacciones.ReadCharge_DropList(vl_S_Tabla)
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
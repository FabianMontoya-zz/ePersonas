Imports Newtonsoft.Json

Public Class Inf_ImpuestoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Pais"
                    CargarPais()

                Case "Ciudad"
                    CargarCiudad()

                Case "Impuesto"
                    CargarImpuesto()

                Case "Cliente"
                    CargarCliente()

                Case "Cliente_H"
                    CargarCliente_H()

                Case "crear"
                    Insert()

                Case "consulta"
                    Consulta()

                Case "elimina"
                    Delete()

                Case "Read_Cliente"
                    Read_Cliente()

                Case "R_ead_Adress"
                    R_ead_Adress()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Inf_Impuesto (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta()

        Dim SQL_Inf_Impuesto As New Inf_ImpuestoSQLClass
        Dim ObjListInf_Impuesto As New List(Of Inf_ImpuestoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListInf_Impuesto = SQL_Inf_Impuesto.Read_All(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListInf_Impuesto Is Nothing Then

            Dim objInf_Impuesto As New Inf_ImpuestoClass
            ObjListInf_Impuesto = New List(Of Inf_ImpuestoClass)

            objInf_Impuesto.Cod_ID = ""
            objInf_Impuesto.FechaActualizacion = ""
            objInf_Impuesto.Usuario = ""

            ObjListInf_Impuesto.Add(objInf_Impuesto)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListInf_Impuesto.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Inf_Impuesto (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Insert()

        Dim objInf_Impuesto As New Inf_ImpuestoClass
        Dim SQL_Inf_Impuesto As New Inf_ImpuestoSQLClass
        Dim ObjListInf_Impuesto As New List(Of Inf_ImpuestoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objInf_Impuesto.Cod_ID = Request.Form("Pais_ID")
        objInf_Impuesto.Ciudad_ID = Request.Form("Ciudad_ID")
        objInf_Impuesto.Impuesto_Gasto_ID = Request.Form("Impuesto_ID")
        objInf_Impuesto.Nit_ID = Request.Form("Cliente_ID")
        objInf_Impuesto.TypeDocument_ID = Request.Form("TipoDocumento_ID")
        objInf_Impuesto.Document_ID = Request.Form("Documento_ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Inf_Impuesto.Consulta_Repetido(objInf_Impuesto)

        If vl_s_IDxiste = 0 Then

            objInf_Impuesto.FechaActualizacion = Date.Now
            objInf_Impuesto.Usuario = Request.Form("user")

            ObjListInf_Impuesto.Add(objInf_Impuesto)

            result = SQL_Inf_Impuesto.Insert(objInf_Impuesto)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Inf_Impuesto (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Delete()

        Dim objInf_Impuesto As New Inf_ImpuestoClass
        Dim SQL_Inf_Impuesto As New Inf_ImpuestoSQLClass
        Dim ObjListInf_Impuesto As New List(Of Inf_ImpuestoClass)

        Dim result As String

        objInf_Impuesto.Cod_ID = Request.Form("Pais_ID")
        objInf_Impuesto.Ciudad_ID = Request.Form("Ciudad_ID")
        objInf_Impuesto.Impuesto_Gasto_ID = Request.Form("Impuesto_ID")
        objInf_Impuesto.Nit_ID = Request.Form("Cliente_ID")
        objInf_Impuesto.TypeDocument_ID = Request.Form("TipoDocumento_ID")
        objInf_Impuesto.Document_ID = Request.Form("Documento_ID")
        ObjListInf_Impuesto.Add(objInf_Impuesto)

        result = SQL_Inf_Impuesto.Delete(objInf_Impuesto)
        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarPais()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListPais(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCiudad()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Index As String = Request.Form("Index")

        ObjListDroplist = SQL.Charge_DropListCiudad(vl_S_Index)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarImpuesto()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListImpuesto(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCliente()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListCliente(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCliente_H()

        Dim SQL As New Inf_ImpuestoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListDroplist = SQL.Charge_DropListCliente_H(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "CLIENTE"

    ''' <summary>
    ''' traemos todos los datos para cliente (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Read_Cliente()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)


        Dim vl_S_Nit As String = Request.Form("Nit")
        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")

        ObjList = SQL.Read_Client(vl_S_Nit, vl_S_TD, vl_S_D)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' traemos todos los datos para tabla DIRECCIONES DEL CLIENTE SELECCIONADO (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub R_ead_Adress()

        Dim SQL As New DireccionesSQLClass
        Dim ObjList As New List(Of DireccionesClass)

        Dim vl_S_Nit As String = Request.Form("Nit")
        Dim vl_S_TypeDoc As String = Request.Form("TypeDoc")
        Dim vl_S_Doc As String = Request.Form("Doc")

        ObjList = SQL.Read_All(vl_S_Nit, vl_S_TypeDoc, vl_S_Doc)

        If ObjList Is Nothing Then

            Dim obj As New DireccionesClass
            ObjList = New List(Of DireccionesClass)

            obj.Nit_ID = ""
            obj.FechaActualizacion = ""
            obj.Usuario = ""

            ObjList.Add(obj)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

#End Region

End Class
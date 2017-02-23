Imports Newtonsoft.Json

Public Class SucursarServicioAjax
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

                Case "Moneda"
                    Carga_Moneda()

                Case "consulta"
                    Consulta_SucursalServicio()

                Case "crear"
                    InsertSucursalServicio()

                Case "modificar"
                    UpdateSucursalServicio()

                Case "elimina"
                    EraseSucursalServicio()

                Case "MatrixCalendarios"
                    CargarCalendarios()

                Case "MatrixSucursal"
                    Carga_MSucursal()
            End Select

        End If
    End Sub
#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla SucursalServicio (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_SucursalServicio()

        Dim SQL_SucursalServicio As New SucursalServicioSQLClass
        Dim ObjListSucursalServicio As New List(Of SucursalServicioClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")

        ObjListSucursalServicio = SQL_SucursalServicio.Read_AllSucursalServicio(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)

        If ObjListSucursalServicio Is Nothing Then

            Dim objSucursalServicio As New SucursalServicioClass
            ObjListSucursalServicio = New List(Of SucursalServicioClass)

            objSucursalServicio.Nit_ID = ""
            objSucursalServicio.FechaActualizacion = ""
            objSucursalServicio.UsuarioCreacion = ""

            ObjListSucursalServicio.Add(objSucursalServicio)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListSucursalServicio.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla SucursalServicio (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertSucursalServicio()

        Dim objSucursalServicio As New SucursalServicioClass
        Dim SQL_SucursalServicio As New SucursalServicioSQLClass
        Dim ObjListSucursalServicio As New List(Of SucursalServicioClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objSucursalServicio.Nit_ID = Request.Form("Nit_ID")
        objSucursalServicio.Codigo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_SucursalServicio.Consulta_Repetido(objSucursalServicio)

        If vl_s_IDxiste = 0 Then

            objSucursalServicio.Surcursal_ID = Request.Form("Suc")
            objSucursalServicio.Cod_Moneda = Request.Form("Mon")
            objSucursalServicio.Costo = Request.Form("Cos")
            objSucursalServicio.Capacidad = Request.Form("Cap")
            objSucursalServicio.Calendario_ID = Request.Form("calendario")

            objSucursalServicio.UsuarioCreacion = Request.Form("user")
            objSucursalServicio.FechaCreacion = Date.Now
            objSucursalServicio.UsuarioActualizacion = Request.Form("user")
            objSucursalServicio.FechaActualizacion = Date.Now

            ObjListSucursalServicio.Add(objSucursalServicio)

            result = SQL_SucursalServicio.InsertSucursalServicio(objSucursalServicio)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla SucursalServicio (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateSucursalServicio()

        Dim objSucursalServicio As New SucursalServicioClass
        Dim SQL_SucursalServicio As New SucursalServicioSQLClass
        Dim ObjListSucursalServicio As New List(Of SucursalServicioClass)

        Dim result As String

        objSucursalServicio.Nit_ID = Request.Form("Nit_ID")
        objSucursalServicio.Codigo_ID = Request.Form("ID")

        objSucursalServicio.Surcursal_ID = Request.Form("Suc")
        objSucursalServicio.Cod_Moneda = Request.Form("Mon")
        objSucursalServicio.Costo = Request.Form("Cos")
        objSucursalServicio.Capacidad = Request.Form("Cap")
        objSucursalServicio.Calendario_ID = Request.Form("calendario")

        objSucursalServicio.UsuarioActualizacion = Request.Form("user")
        objSucursalServicio.FechaActualizacion = Date.Now

        ObjListSucursalServicio.Add(objSucursalServicio)

        result = SQL_SucursalServicio.UpdateSucursalServicio(objSucursalServicio)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla SucursalServicio (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseSucursalServicio()

        Dim objSucursalServicio As New SucursalServicioClass
        Dim SQL_SucursalServicio As New SucursalServicioSQLClass
        Dim ObjListSucursalServicio As New List(Of SucursalServicioClass)

        Dim result As String

        objSucursalServicio.Nit_ID = Request.Form("Nit_ID")
        objSucursalServicio.Codigo_ID = Request.Form("ID")
        ObjListSucursalServicio.Add(objSucursalServicio)

        result = SQL_SucursalServicio.EraseSucursalServicio(objSucursalServicio)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_SucursalServicio As New SucursalServicioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_SucursalServicio.ReadCharge_DropList(vl_S_Tabla)
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

    ''' <summary>
    ''' funcion que carga La matrix Moneda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Moneda()

        Dim SQL As New MonedaCodSQLClass
        Dim ObjList As New List(Of MonedaCodClass)

        ObjList = SQL.Matrix_Moneda()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub


    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSeguridad()

        Dim SQL As New Adm_Politicas_SeguridadSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Nit As String = Request.Form("Nit")

        ObjListDroplist = SQL.Charge_DropListSeguridad(vl_S_Nit)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarCalendarios()

        Dim SQL As New CalendarioSQLClass
        Dim ObjListDroplist As New List(Of CalendarioClass)
        Dim obj As New ClienteClass
        obj.Nit_ID = Request.Form("Nit")
        obj.TipoSQL = "Calendar"

        ObjListDroplist = SQL.Read_Matrix_Calendarios_Temp(obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MSucursal()

        Dim SQL As New SucursalSQLClass
        Dim ObjList_Matrix As New List(Of SucursalClass)

        ObjList_Matrix = SQL.Matrix_Sucursal()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub
#End Region

#Region "FUNCIONES"

#End Region
End Class
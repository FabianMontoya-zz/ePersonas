Imports Newtonsoft.Json

Public Class TipoServicioAjax
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
                    Consulta_TipoServicio()

                Case "crear"
                    InsertTipoServicio()

                Case "modificar"
                    UpdateTipoServicio()

                Case "elimina"
                    EraseTipoServicio()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla TipoServicio (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_TipoServicio()

        Dim SQL_TipoServicio As New TipoServicioSQLClass
        Dim ObjListTipoServicio As New List(Of TipoServicioClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")
        Dim vl_S_Nit_User As String = Request.Form("Nit_User")

        ObjListTipoServicio = SQL_TipoServicio.Read_AllTipoServicio(vl_S_filtro, vl_S_opcion, vl_S_contenido, vl_S_Nit_User)

        If ObjListTipoServicio Is Nothing Then

            Dim objTipoServicio As New TipoServicioClass
            ObjListTipoServicio = New List(Of TipoServicioClass)

            objTipoServicio.Nombre = ""
            objTipoServicio.FechaActualizacion = ""
            objTipoServicio.UsuarioCreacion = ""

            ObjListTipoServicio.Add(objTipoServicio)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListTipoServicio.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla TipoServicio (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertTipoServicio()

        Dim objTipoServicio As New TipoServicioClass
        Dim SQL_TipoServicio As New TipoServicioSQLClass
        Dim ObjListTipoServicio As New List(Of TipoServicioClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objTipoServicio.Nit_ID = Request.Form("Nit_ID")
        objTipoServicio.Codigo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_TipoServicio.Consulta_Repetido(objTipoServicio)

        If vl_s_IDxiste = 0 Then

            objTipoServicio.Nombre = Request.Form("nombre")
            objTipoServicio.Tipo = Request.Form("Tipo")
            objTipoServicio.Referencia = Request.Form("Refe")
            objTipoServicio.Cod_Moneda = Request.Form("Mon")
            objTipoServicio.Costo = Request.Form("Cos")
            objTipoServicio.valor = Request.Form("Val")
            objTipoServicio.Detalle = Request.Form("Det")
            objTipoServicio.Calendario_ID = "0"
            objTipoServicio.Capacidad = Request.Form("Cap")
            objTipoServicio.N_Pagos_Bloqueos = Request.Form("Blo")
            objTipoServicio.Tipo_Calculo_Sesion = Request.Form("Cal")
            objTipoServicio.Tiempo_Sesion = Request.Form("TimSes")
            objTipoServicio.Tiempo_Entre_Sesion = Request.Form("TiemEn")
            objTipoServicio.Tiempo_Maximo_Agenda = Request.Form("MaxA")
            objTipoServicio.Imagen_asociada = "../../images/" & Request.Form("Ima")

            objTipoServicio.UsuarioCreacion = Request.Form("user")
            objTipoServicio.FechaCreacion = Date.Now
            objTipoServicio.UsuarioActualizacion = Request.Form("user")
            objTipoServicio.FechaActualizacion = Date.Now

            ObjListTipoServicio.Add(objTipoServicio)

            result = SQL_TipoServicio.InsertTipoServicio(objTipoServicio)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla TipoServicio (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateTipoServicio()

        Dim objTipoServicio As New TipoServicioClass
        Dim SQL_TipoServicio As New TipoServicioSQLClass
        Dim ObjListTipoServicio As New List(Of TipoServicioClass)

        Dim result As String

        objTipoServicio.Nit_ID = Request.Form("Nit_ID")
        objTipoServicio.Codigo_ID = Request.Form("ID")

        objTipoServicio.Nombre = Request.Form("nombre")
        objTipoServicio.Tipo = Request.Form("Tipo")
        objTipoServicio.Referencia = Request.Form("Refe")
        objTipoServicio.Cod_Moneda = Request.Form("Mon")
        objTipoServicio.Costo = Request.Form("Cos")
        objTipoServicio.valor = Request.Form("Val")
        objTipoServicio.Detalle = Request.Form("Det")
        objTipoServicio.Calendario_ID = "0"
        objTipoServicio.Capacidad = Request.Form("Cap")
        objTipoServicio.N_Pagos_Bloqueos = Request.Form("Blo")
        objTipoServicio.Tipo_Calculo_Sesion = Request.Form("Cal")
        objTipoServicio.Tiempo_Sesion = Request.Form("TimSes")
        objTipoServicio.Tiempo_Entre_Sesion = Request.Form("TiemEn")
        objTipoServicio.Tiempo_Maximo_Agenda = Request.Form("MaxA")
        objTipoServicio.Imagen_asociada = "../../images/" & Request.Form("Ima")

        objTipoServicio.UsuarioActualizacion = Request.Form("user")
        objTipoServicio.FechaActualizacion = Date.Now

        ObjListTipoServicio.Add(objTipoServicio)

        result = SQL_TipoServicio.UpdateTipoServicio(objTipoServicio)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla TipoServicio (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseTipoServicio()

        Dim objTipoServicio As New TipoServicioClass
        Dim SQL_TipoServicio As New TipoServicioSQLClass
        Dim ObjListTipoServicio As New List(Of TipoServicioClass)

        Dim result As String

        objTipoServicio.Nit_ID = Request.Form("Nit_ID")
        objTipoServicio.Codigo_ID = Request.Form("ID")
        ObjListTipoServicio.Add(objTipoServicio)

        result = SQL_TipoServicio.EraseTipoServicio(objTipoServicio)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_TipoServicio As New TipoServicioSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_TipoServicio.ReadCharge_DropList(vl_S_Tabla)
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

#End Region

#Region "FUNCIONES"

#End Region
End Class
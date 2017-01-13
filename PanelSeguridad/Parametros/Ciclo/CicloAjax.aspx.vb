Imports Newtonsoft.Json

Public Class CicloAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "consulta"
                    Consulta_Ciclo()

                Case "crear"
                    InsertCiclo()

                Case "modificar"
                    UpdateLCiclo()

                Case "elimina"
                    DeleteCiclo()
            End Select

        End If
    End Sub


#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla ROLES (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Ciclo()

        Dim SQL_Ciclo As New CicloSQLClass
        Dim ObjList As New List(Of CicloClass)

        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjList = SQL_Ciclo.Read_AllCiclo(vl_S_filtro, vl_S_opcion, vl_S_contenido)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Ciclo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCiclo()

        Dim obj As New CicloClass
        Dim SQL_Ciclo As New CicloSQLClass

        Dim ObjList As New List(Of CicloClass)
        Dim result As String
        Dim vl_s_IDxiste As String

        obj.ID_Ciclo = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Ciclo.Consulta_Repetido(obj)

        If vl_s_IDxiste = 0 Then

            obj.Descripcion = Request.Form("descripcion")
            obj.Fecha_Corte = Request.Form("fechaCorte")
            obj.Fecha_Pago = Request.Form("fechaPago")
            obj.UsuarioCreacion = Request.Form("user")
            obj.FechaCreacion = Date.Now
            obj.UsuarioActualizacion = Request.Form("user")
            obj.FechaActualizacion = Date.Now

            ObjList.Add(obj)

            result = SQL_Ciclo.InsertCiclo(obj)
            If result = "Exito" Then
                result = SQL_Ciclo.InsertCicloDetalle(obj)
            Else
                result = "Error"
            End If
           
        Else
            result = "Existe"
        End If

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que cambia el estado a inhabilitado en la tabla ROLES (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub DeleteCiclo()

        Dim obj As New CicloClass
        Dim SQL_Ciclo As New CicloSQLClass
        Dim ObjList As New List(Of CicloClass)
        Dim result As String

        obj.ID_Ciclo = Request.Form("ID")
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL_Ciclo.DeleteCicloDetalle(obj)
        If result = "Exito" Then
            result = SQL_Ciclo.DeleteCiclo(obj)
        Else
            result = "Error"
        End If

        Response.Write(result)
    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla ROLES (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateLCiclo()

        Dim obj_Ciclo As New CicloClass
        Dim SQL_Ciclo As New CicloSQLClass
        Dim ObjList As New List(Of CicloClass)
        Dim result As String

        obj_Ciclo.ID_Ciclo = Request.Form("ID")
        obj_Ciclo.Descripcion = Request.Form("descripcion")
        obj_Ciclo.Fecha_Corte = Request.Form("fechaCorte")
        obj_Ciclo.Fecha_Pago = Request.Form("fechaPago")
        obj_Ciclo.UsuarioActualizacion = Request.Form("user")
        obj_Ciclo.FechaActualizacion = Date.Now

        ObjList.Add(obj_Ciclo)

        result = SQL_Ciclo.UpdateCiclo(obj_Ciclo)
        If result = "Exito" Then
            result = SQL_Ciclo.UpdateCicloDetalle(obj_Ciclo)
        Else
            result = "Error"
        End If

        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_links As New Adm_LinksSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_links.ReadCharge_DropList(vl_S_Tabla)
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

End Class
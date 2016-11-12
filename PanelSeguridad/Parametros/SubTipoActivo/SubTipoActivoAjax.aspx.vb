Imports Newtonsoft.Json

Public Class SubTipoActivoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Activo()

                Case "crear"
                    InsertActivo()

                Case "modificar"
                    UpdateActivo()

                Case "elimina"
                    EraseActivo()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Activo (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Activo()

        Dim SQL_Activo As New SubTipoActivoSQLClass
        Dim ObjListActivo As New List(Of SubTipoActivoClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListActivo = SQL_Activo.Read_AllActivo(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListActivo Is Nothing Then

            Dim objActivo As New SubTipoActivoClass
            ObjListActivo = New List(Of SubTipoActivoClass)

            objActivo.Descripcion = ""
            objActivo.FechaActualizacion = ""
            objActivo.Usuario = ""

            ObjListActivo.Add(objActivo)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListActivo.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Activo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertActivo()

        Dim obj As New SubTipoActivoClass
        Dim SQL_Activo As New SubTipoActivoSQLClass
        Dim ObjListActivo As New List(Of SubTipoActivoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        obj.STActivo_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(obj.STActivo_ID)

        If vl_s_IDxiste = 0 Then

            obj.Descripcion = Request.Form("descripcion")
            obj.FechaActualizacion = Date.Now
            obj.Usuario = Request.Form("user")

            ObjListActivo.Add(obj)

            result = SQL_Activo.InsertActivo(obj)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Activo (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateActivo()

        Dim objActivo As New SubTipoActivoClass
        Dim SQL_Activo As New SubTipoActivoSQLClass
        Dim ObjListActivo As New List(Of SubTipoActivoClass)

        Dim result As String

        objActivo.STActivo_ID = Request.Form("ID")
        objActivo.Descripcion = Request.Form("descripcion")
        objActivo.FechaActualizacion = Date.Now
        objActivo.Usuario = Request.Form("user")

        ObjListActivo.Add(objActivo)

        result = SQL_Activo.UpdateActivo(objActivo)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Activo (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseActivo()

        Dim objActivo As New SubTipoActivoClass
        Dim SQL_Activo As New SubTipoActivoSQLClass
        Dim ObjListActivo As New List(Of SubTipoActivoClass)

        Dim result As String

        objActivo.STActivo_ID = Request.Form("ID")
        ObjListActivo.Add(objActivo)

        result = SQL_Activo.EraseActivo(objActivo)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Activo As New SubTipoActivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Activo.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' funcion que valida si el id esta en la BD
    ''' </summary>
    ''' <param name="vp_S_ID"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Protected Function Consulta_Repetido(ByVal vp_S_ID As String)

        Dim SQL_General As New GeneralSQLClass
        Dim result As String

        result = SQL_General.ReadExist("SUB_TIPOACTIVO", vp_S_ID, "STA_ID", "", "2")
        Return result

    End Function

#End Region

End Class
Imports Newtonsoft.Json

Public Class CiudadesAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Pais"
                    CargarPaises()

                Case "consulta"
                    Consulta_Ciudades()

                Case "crear"
                    InsertCiudades()

                Case "modificar"
                    UpdateCiudades()

                Case "elimina"
                    EraseCiudades()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Ciudades (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Ciudades()

        Dim SQL_Ciudades As New CiudadesSQLClass
        Dim ObjListCiudades As New List(Of CiudadesClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListCiudades = SQL_Ciudades.Read_AllCiudades(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListCiudades Is Nothing Then

            Dim objCiudades As New CiudadesClass
            ObjListCiudades = New List(Of CiudadesClass)

            objCiudades.Descripcion = ""
            objCiudades.FechaActualizacion = ""
            objCiudades.Usuario = ""

            ObjListCiudades.Add(objCiudades)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListCiudades.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Ciudades (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCiudades()

        Dim objCiudades As New CiudadesClass
        Dim SQL_Ciudades As New CiudadesSQLClass
        Dim ObjListCiudades As New List(Of CiudadesClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objCiudades.Pais_ID = Request.Form("Pais_ID")
        objCiudades.Ciudades_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Ciudades.Consulta_Repetido(objCiudades)

        If vl_s_IDxiste = 0 Then

            objCiudades.Descripcion = Request.Form("descripcion")
            objCiudades.FechaActualizacion = Date.Now
            objCiudades.Usuario = Request.Form("user")

            ObjListCiudades.Add(objCiudades)

            result = SQL_Ciudades.InsertCiudades(objCiudades)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Ciudades (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateCiudades()

        Dim objCiudades As New CiudadesClass
        Dim SQL_Ciudades As New CiudadesSQLClass
        Dim ObjListCiudades As New List(Of CiudadesClass)

        Dim result As String

        objCiudades.Pais_ID = Request.Form("Pais_ID")
        objCiudades.Ciudades_ID = Request.Form("ID")
        objCiudades.Descripcion = Request.Form("descripcion")
        objCiudades.FechaActualizacion = Date.Now
        objCiudades.Usuario = Request.Form("user")

        ObjListCiudades.Add(objCiudades)

        result = SQL_Ciudades.UpdateCiudades(objCiudades)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Ciudades (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseCiudades()

        Dim objCiudades As New CiudadesClass
        Dim SQL_Ciudades As New CiudadesSQLClass
        Dim ObjListCiudades As New List(Of CiudadesClass)

        Dim result As String

        objCiudades.Pais_ID = Request.Form("Pais_ID")
        objCiudades.Ciudades_ID = Request.Form("ID")
        ObjListCiudades.Add(objCiudades)

        result = SQL_Ciudades.EraseCiudades(objCiudades)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Ciudades As New CiudadesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Ciudades.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarPaises()

        Dim SQL As New CiudadesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListPais(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region


End Class
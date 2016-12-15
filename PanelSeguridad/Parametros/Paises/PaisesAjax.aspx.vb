Imports Newtonsoft.Json

Public Class PaisesAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        'trae el jquery para hacer todo por debajo del servidor
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Moneda"
                    CargarMoneda()

                Case "consulta"
                    Consulta_Paises()

                Case "crear"
                    InsertPaises()

                Case "modificar"
                    UpdatePaises()

                Case "elimina"
                    ErasePaises()

            End Select

        End If
    End Sub


#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Paises (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Paises()

        Dim SQL_Paises As New PaisesSQLClass
        Dim ObjListPaises As New List(Of PaisesClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListPaises = SQL_Paises.Read_AllPaises(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListPaises Is Nothing Then

            Dim objPaises As New PaisesClass
            ObjListPaises = New List(Of PaisesClass)

            objPaises.Cod = 0
            objPaises.Name = ""

            ObjListPaises.Add(objPaises)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListPaises.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Paises (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertPaises()

        Dim objPaises As New PaisesClass
        Dim SQL_Paises As New PaisesSQLClass
        Dim ObjListPaises As New List(Of PaisesClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objPaises.Cod = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = Consulta_Repetido(objPaises.Cod)

        If vl_s_IDxiste = 0 Then

            objPaises.Name = Request.Form("Pais")
            objPaises.Moneda = Request.Form("Moneda")
            objPaises.SWIFT = Request.Form("SWIFT")
            objPaises.Calendario_ID = Request.Form("Calendario_ID")
            objPaises.UsuarioCreacion = Request.Form("user")
            objPaises.FechaCreacion = Date.Now
            objPaises.FechaActualizacion = Date.Now
            objPaises.UsuarioActualizacion = Request.Form("user")

            ObjListPaises.Add(objPaises)

            result = SQL_Paises.InsertPaises(objPaises)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Paises (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdatePaises()

        Dim objPaises As New PaisesClass
        Dim SQL_Paises As New PaisesSQLClass
        Dim ObjListPaises As New List(Of PaisesClass)

        Dim result As String = ""

        objPaises.Cod = Request.Form("ID")
        objPaises.Name = Request.Form("Pais")

        objPaises.Moneda = Request.Form("Moneda")
        objPaises.SWIFT = Request.Form("SWIFT")
        objPaises.Calendario_ID = Request.Form("Calendario_ID")

        objPaises.FechaActualizacion = Date.Now
        objPaises.UsuarioActualizacion = Request.Form("user")

        ObjListPaises.Add(objPaises)

        result = SQL_Paises.UpdatePaises(objPaises)

        Response.Write(result)
    End Sub


    ''' <summary>
    ''' funcion que elimina en la tabla Paises (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ErasePaises()

        Dim objPaises As New PaisesClass
        Dim SQL_Paises As New PaisesSQLClass
        Dim ObjListPaises As New List(Of PaisesClass)

        Dim result As String

        objPaises.Cod = Request.Form("ID")
        objPaises.Name = Request.Form("Pais")

        ObjListPaises.Add(objPaises)

        result = SQL_Paises.ErasePaises(objPaises)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Paises As New PaisesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Paises.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMoneda()

        Dim SQL As New PaisesSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListMoneda(vl_S_Tabla)
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

        result = SQL_General.ReadExist("PAISES", vp_S_ID, "P_Cod", "", "2")


        Return result

    End Function

#End Region

End Class
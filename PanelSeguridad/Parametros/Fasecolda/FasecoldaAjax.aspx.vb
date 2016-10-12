Imports Newtonsoft.Json

Public Class FasecoldaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Fasecolda()

                Case "modificar"
                    Update()

                Case "crear"
                    InsertFasecolda()

                Case "elimina"
                    EraseFasecolda()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Fasecolda (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Fasecolda()

        Dim SQL_Fasecolda As New FasecoldaSQLClass
        Dim ObjListFasecolda As New List(Of FasecoldaClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListFasecolda = SQL_Fasecolda.Read_AllFasecolda(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListFasecolda Is Nothing Then

            Dim objFasecolda As New FasecoldaClass
            ObjListFasecolda = New List(Of FasecoldaClass)

            objFasecolda.FechaActualizacion = ""
            objFasecolda.Usuario = ""

            ObjListFasecolda.Add(objFasecolda)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListFasecolda.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Fasecolda (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertFasecolda()

        Dim objFasecolda As New FasecoldaClass
        Dim SQL_Fasecolda As New FasecoldaSQLClass
        Dim ObjListFasecolda As New List(Of FasecoldaClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objFasecolda.Fasecolda_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Fasecolda.Consulta_Repetido(objFasecolda)

        If vl_s_IDxiste = 0 Then

            objFasecolda.Clase = Request.Form("Clase")
            objFasecolda.Marca = Request.Form("Marca")
            objFasecolda.Linea = Request.Form("Linea")
            objFasecolda.Cilindraje = Request.Form("Cilindraje")

            objFasecolda.Year_1 = Request.Form("Year_1")
            objFasecolda.Year_2 = Request.Form("Year_2")
            objFasecolda.Year_3 = Request.Form("Year_3")
            objFasecolda.Year_4 = Request.Form("Year_4")
            objFasecolda.Year_5 = Request.Form("Year_5")
            objFasecolda.Year_6 = Request.Form("Year_6")
            objFasecolda.Year_7 = Request.Form("Year_7")
            objFasecolda.Year_8 = Request.Form("Year_8")
            objFasecolda.Year_9 = Request.Form("Year_9")
            objFasecolda.Year_10 = Request.Form("Year_10")

            objFasecolda.Year_11 = Request.Form("Year_11")
            objFasecolda.Year_12 = Request.Form("Year_12")
            objFasecolda.Year_13 = Request.Form("Year_13")
            objFasecolda.Year_14 = Request.Form("Year_14")
            objFasecolda.Year_15 = Request.Form("Year_15")
            objFasecolda.Year_16 = Request.Form("Year_16")
            objFasecolda.Year_17 = Request.Form("Year_17")
            objFasecolda.Year_18 = Request.Form("Year_18")
            objFasecolda.Year_19 = Request.Form("Year_19")
            objFasecolda.Year_20 = Request.Form("Year_20")

            objFasecolda.Year_21 = Request.Form("Year_21")
            objFasecolda.Year_22 = Request.Form("Year_22")
            objFasecolda.Year_23 = Request.Form("Year_23")
            objFasecolda.Year_24 = Request.Form("Year_24")
            objFasecolda.Year_25 = Request.Form("Year_25")
          
            objFasecolda.Estado = Request.Form("Estado")

            objFasecolda.FechaActualizacion = Date.Now
            objFasecolda.Usuario = Request.Form("user")

            ObjListFasecolda.Add(objFasecolda)

            result = SQL_Fasecolda.InsertFasecolda(objFasecolda)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Cliente (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Update()

        Dim objFasecolda As New FasecoldaClass
        Dim SQL_Fasecolda As New FasecoldaSQLClass
        Dim ObjListFasecolda As New List(Of FasecoldaClass)

        Dim result As String

        objFasecolda.Fasecolda_ID = Request.Form("ID")
        objFasecolda.Clase = Request.Form("Clase")
        objFasecolda.Marca = Request.Form("Marca")
        objFasecolda.Linea = Request.Form("Linea")
        objFasecolda.Cilindraje = Request.Form("Cilindraje")

        objFasecolda.Year_1 = Request.Form("Year_1")
        objFasecolda.Year_2 = Request.Form("Year_2")
        objFasecolda.Year_3 = Request.Form("Year_3")
        objFasecolda.Year_4 = Request.Form("Year_4")
        objFasecolda.Year_5 = Request.Form("Year_5")
        objFasecolda.Year_6 = Request.Form("Year_6")
        objFasecolda.Year_7 = Request.Form("Year_7")
        objFasecolda.Year_8 = Request.Form("Year_8")
        objFasecolda.Year_9 = Request.Form("Year_9")
        objFasecolda.Year_10 = Request.Form("Year_10")

        objFasecolda.Year_11 = Request.Form("Year_11")
        objFasecolda.Year_12 = Request.Form("Year_12")
        objFasecolda.Year_13 = Request.Form("Year_13")
        objFasecolda.Year_14 = Request.Form("Year_14")
        objFasecolda.Year_15 = Request.Form("Year_15")
        objFasecolda.Year_16 = Request.Form("Year_16")
        objFasecolda.Year_17 = Request.Form("Year_17")
        objFasecolda.Year_18 = Request.Form("Year_18")
        objFasecolda.Year_19 = Request.Form("Year_19")
        objFasecolda.Year_20 = Request.Form("Year_20")

        objFasecolda.Year_21 = Request.Form("Year_21")
        objFasecolda.Year_22 = Request.Form("Year_22")
        objFasecolda.Year_23 = Request.Form("Year_23")
        objFasecolda.Year_24 = Request.Form("Year_24")
        objFasecolda.Year_25 = Request.Form("Year_25")
        objFasecolda.Estado = Request.Form("Estado")

        objFasecolda.FechaActualizacion = Date.Now
        objFasecolda.Usuario = Request.Form("user")

        ObjListFasecolda.Add(objFasecolda)

        result = SQL_Fasecolda.Update(objFasecolda)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Fasecolda (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseFasecolda()

        Dim objFasecolda As New FasecoldaClass
        Dim SQL_Fasecolda As New FasecoldaSQLClass
        Dim ObjListFasecolda As New List(Of FasecoldaClass)

        Dim result As String

        objFasecolda.Fasecolda_ID = Request.Form("ID")
        ObjListFasecolda.Add(objFasecolda)

        result = SQL_Fasecolda.EraseFasecolda(objFasecolda)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Fasecolda As New FasecoldaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Fasecolda.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

#End Region

End Class
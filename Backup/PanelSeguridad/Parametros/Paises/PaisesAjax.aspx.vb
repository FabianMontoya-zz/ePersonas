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
            objPaises.Usuario = ""

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

            objPaises.Est_LUN = Request.Form("Est_LUN")
            objPaises.Est_MAR = Request.Form("Est_MAR")
            objPaises.Est_MIE = Request.Form("Est_MIE")
            objPaises.Est_JUE = Request.Form("Est_JUE")
            objPaises.Est_VIE = Request.Form("Est_VIE")
            objPaises.Est_SAB = Request.Form("Est_SAB")
            objPaises.Est_DOM = Request.Form("Est_DOM")
            objPaises.HoF1_LUN = Request.Form("HoF1_LUN")
            objPaises.HoI1_LUN = Request.Form("HoI1_LUN")
            objPaises.HoI2_LUN = Request.Form("HoI2_LUN")
            objPaises.HoF2_LUN = Request.Form("HoF2_LUN")
            objPaises.HoI3_LUN = Request.Form("HoI3_LUN")
            objPaises.HoF3_LUN = Request.Form("HoF3_LUN")
            objPaises.HoI4_LUN = Request.Form("HoI4_LUN")
            objPaises.HoF4_LUN = Request.Form("HoF4_LUN")
            objPaises.HoI1_MAR = Request.Form("HoI1_MAR")
            objPaises.HoF1_MAR = Request.Form("HoF1_MAR")
            objPaises.HoI2_MAR = Request.Form("HoI2_MAR")
            objPaises.HoF2_MAR = Request.Form("HoF2_MAR")
            objPaises.HoI3_MAR = Request.Form("HoI3_MAR")
            objPaises.HoF3_MAR = Request.Form("HoF3_MAR")
            objPaises.HoI4_MAR = Request.Form("HoI4_MAR")
            objPaises.HoF4_MAR = Request.Form("HoF4_MAR")
            objPaises.HoI1_MIE = Request.Form("HoI1_MIE")
            objPaises.HoF1_MIE = Request.Form("HoF1_MIE")
            objPaises.HoI2_MIE = Request.Form("HoI2_MIE")
            objPaises.HoF2_MIE = Request.Form("HoF2_MIE")
            objPaises.HoI3_MIE = Request.Form("HoI3_MIE")
            objPaises.HoF3_MIE = Request.Form("HoF3_MIE")
            objPaises.HoI4_MIE = Request.Form("HoI4_MIE")
            objPaises.HoF4_MIE = Request.Form("HoF4_MIE")
            objPaises.HoI1_JUE = Request.Form("HoI1_JUE")
            objPaises.HoF1_JUE = Request.Form("HoF1_JUE")
            objPaises.HoI2_JUE = Request.Form("HoI2_JUE")
            objPaises.HoF2_JUE = Request.Form("HoF2_JUE")
            objPaises.HoI3_JUE = Request.Form("HoI3_JUE")
            objPaises.HoF3_JUE = Request.Form("HoF3_JUE")
            objPaises.HoI4_JUE = Request.Form("HoI4_JUE")
            objPaises.HoF4_JUE = Request.Form("HoF4_JUE")
            objPaises.HoI1_VIE = Request.Form("HoI1_VIE")
            objPaises.HoF1_VIE = Request.Form("HoF1_VIE")
            objPaises.HoI2_VIE = Request.Form("HoI2_VIE")
            objPaises.HoF2_VIE = Request.Form("HoF2_VIE")
            objPaises.HoI3_VIE = Request.Form("HoI3_VIE")
            objPaises.HoF3_VIE = Request.Form("HoF3_VIE")
            objPaises.HoI4_VIE = Request.Form("HoI4_VIE")
            objPaises.HoF4_VIE = Request.Form("HoF4_VIE")
            objPaises.HoI1_SAB = Request.Form("HoI1_SAB")
            objPaises.HoF1_SAB = Request.Form("HoF1_SAB")
            objPaises.HoI2_SAB = Request.Form("HoI2_SAB")
            objPaises.HoF2_SAB = Request.Form("HoF2_SAB")
            objPaises.HoI3_SAB = Request.Form("HoI3_SAB")
            objPaises.HoF3_SAB = Request.Form("HoF3_SAB")
            objPaises.HoI4_SAB = Request.Form("HoI4_SAB")
            objPaises.HoF4_SAB = Request.Form("HoF4_SAB")
            objPaises.HoI1_DOM = Request.Form("HoI1_DOM")
            objPaises.HoF1_DOM = Request.Form("HoF1_DOM")
            objPaises.HoI2_DOM = Request.Form("HoI2_DOM")
            objPaises.HoF2_DOM = Request.Form("HoF2_DOM")
            objPaises.HoI3_DOM = Request.Form("HoI3_DOM")
            objPaises.HoF3_DOM = Request.Form("HoF3_DOM")
            objPaises.HoI4_DOM = Request.Form("HoI4_DOM")
            objPaises.HoF4_DOM = Request.Form("HoF4_DOM")

            objPaises.FechaActualizacion = Date.Now
            objPaises.Usuario = Request.Form("user")

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

        objPaises.Est_LUN = Request.Form("Est_LUN")
        objPaises.Est_MAR = Request.Form("Est_MAR")
        objPaises.Est_MIE = Request.Form("Est_MIE")
        objPaises.Est_JUE = Request.Form("Est_JUE")
        objPaises.Est_VIE = Request.Form("Est_VIE")
        objPaises.Est_SAB = Request.Form("Est_SAB")
        objPaises.Est_DOM = Request.Form("Est_DOM")
        objPaises.HoF1_LUN = Request.Form("HoF1_LUN")
        objPaises.HoI1_LUN = Request.Form("HoI1_LUN")
        objPaises.HoI2_LUN = Request.Form("HoI2_LUN")
        objPaises.HoF2_LUN = Request.Form("HoF2_LUN")
        objPaises.HoI3_LUN = Request.Form("HoI3_LUN")
        objPaises.HoF3_LUN = Request.Form("HoF3_LUN")
        objPaises.HoI4_LUN = Request.Form("HoI4_LUN")
        objPaises.HoF4_LUN = Request.Form("HoF4_LUN")
        objPaises.HoI1_MAR = Request.Form("HoI1_MAR")
        objPaises.HoF1_MAR = Request.Form("HoF1_MAR")
        objPaises.HoI2_MAR = Request.Form("HoI2_MAR")
        objPaises.HoF2_MAR = Request.Form("HoF2_MAR")
        objPaises.HoI3_MAR = Request.Form("HoI3_MAR")
        objPaises.HoF3_MAR = Request.Form("HoF3_MAR")
        objPaises.HoI4_MAR = Request.Form("HoI4_MAR")
        objPaises.HoF4_MAR = Request.Form("HoF4_MAR")
        objPaises.HoI1_MIE = Request.Form("HoI1_MIE")
        objPaises.HoF1_MIE = Request.Form("HoF1_MIE")
        objPaises.HoI2_MIE = Request.Form("HoI2_MIE")
        objPaises.HoF2_MIE = Request.Form("HoF2_MIE")
        objPaises.HoI3_MIE = Request.Form("HoI3_MIE")
        objPaises.HoF3_MIE = Request.Form("HoF3_MIE")
        objPaises.HoI4_MIE = Request.Form("HoI4_MIE")
        objPaises.HoF4_MIE = Request.Form("HoF4_MIE")
        objPaises.HoI1_JUE = Request.Form("HoI1_JUE")
        objPaises.HoF1_JUE = Request.Form("HoF1_JUE")
        objPaises.HoI2_JUE = Request.Form("HoI2_JUE")
        objPaises.HoF2_JUE = Request.Form("HoF2_JUE")
        objPaises.HoI3_JUE = Request.Form("HoI3_JUE")
        objPaises.HoF3_JUE = Request.Form("HoF3_JUE")
        objPaises.HoI4_JUE = Request.Form("HoI4_JUE")
        objPaises.HoF4_JUE = Request.Form("HoF4_JUE")
        objPaises.HoI1_VIE = Request.Form("HoI1_VIE")
        objPaises.HoF1_VIE = Request.Form("HoF1_VIE")
        objPaises.HoI2_VIE = Request.Form("HoI2_VIE")
        objPaises.HoF2_VIE = Request.Form("HoF2_VIE")
        objPaises.HoI3_VIE = Request.Form("HoI3_VIE")
        objPaises.HoF3_VIE = Request.Form("HoF3_VIE")
        objPaises.HoI4_VIE = Request.Form("HoI4_VIE")
        objPaises.HoF4_VIE = Request.Form("HoF4_VIE")
        objPaises.HoI1_SAB = Request.Form("HoI1_SAB")
        objPaises.HoF1_SAB = Request.Form("HoF1_SAB")
        objPaises.HoI2_SAB = Request.Form("HoI2_SAB")
        objPaises.HoF2_SAB = Request.Form("HoF2_SAB")
        objPaises.HoI3_SAB = Request.Form("HoI3_SAB")
        objPaises.HoF3_SAB = Request.Form("HoF3_SAB")
        objPaises.HoI4_SAB = Request.Form("HoI4_SAB")
        objPaises.HoF4_SAB = Request.Form("HoF4_SAB")
        objPaises.HoI1_DOM = Request.Form("HoI1_DOM")
        objPaises.HoF1_DOM = Request.Form("HoF1_DOM")
        objPaises.HoI2_DOM = Request.Form("HoI2_DOM")
        objPaises.HoF2_DOM = Request.Form("HoF2_DOM")
        objPaises.HoI3_DOM = Request.Form("HoI3_DOM")
        objPaises.HoF3_DOM = Request.Form("HoF3_DOM")
        objPaises.HoI4_DOM = Request.Form("HoI4_DOM")
        objPaises.HoF4_DOM = Request.Form("HoF4_DOM")

        objPaises.FechaActualizacion = Date.Now
        objPaises.Usuario = Request.Form("user")

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
        objPaises.Name = Request.Form("mes_dia")

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
Imports Newtonsoft.Json

Public Class Porcen_DescuentosAjax
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

                Case "crear"
                    Insert()

                Case "consulta"
                    Consulta()

                Case "modificar"
                    Update()

                Case "elimina"
                    Delete()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Porcen_Descuentos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta()

        Dim SQL_Porcen_Descuentos As New Porcen_DescuentosSQLClass
        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListPorcen_Descuentos = SQL_Porcen_Descuentos.Read_All(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListPorcen_Descuentos Is Nothing Then

            Dim objPorcen_Descuentos As New Porcen_DescuentosClass
            ObjListPorcen_Descuentos = New List(Of Porcen_DescuentosClass)

            objPorcen_Descuentos.Cod_ID = ""
            objPorcen_Descuentos.FechaActualizacion = ""
            objPorcen_Descuentos.Usuario = ""

            ObjListPorcen_Descuentos.Add(objPorcen_Descuentos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListPorcen_Descuentos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Porcen_Descuentos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Insert()

        Dim objPorcen_Descuentos As New Porcen_DescuentosClass
        Dim SQL As New Porcen_DescuentosSQLClass
        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objPorcen_Descuentos.Cod_ID = Request.Form("Pais_ID")
        objPorcen_Descuentos.Ciudad_ID = Request.Form("Ciudad_ID")
        objPorcen_Descuentos.Impuesto_Gasto_ID = Request.Form("Impuesto_ID")
        objPorcen_Descuentos.RangoInicial_ID = Request.Form("RInicial")
        objPorcen_Descuentos.RangoFinal_ID = Request.Form("RFinal")
        objPorcen_Descuentos.Type_Limit = Request.Form("TipoL")
        objPorcen_Descuentos.Limit_Min = Request.Form("L_Inf")
        objPorcen_Descuentos.Limit_Max = Request.Form("L_Sup")

        'validamos si la llave existe
        vl_s_IDxiste = SQL.Consulta_Repetido(objPorcen_Descuentos)

        If vl_s_IDxiste = 0 Then

            objPorcen_Descuentos.MesDia_1 = Request.Form("Fecha_1")
            objPorcen_Descuentos.MesDia_2 = Request.Form("Fecha_2")
            objPorcen_Descuentos.MesDia_3 = Request.Form("Fecha_3")
            objPorcen_Descuentos.MesDia_4 = Request.Form("Fecha_4")

            objPorcen_Descuentos.Porcentaje_1 = Request.Form("Porcen_1")
            objPorcen_Descuentos.Porcentaje_2 = Request.Form("Porcen_2")
            objPorcen_Descuentos.Porcentaje_3 = Request.Form("Porcen_3")
            objPorcen_Descuentos.Porcentaje_4 = Request.Form("Porcen_4")

            objPorcen_Descuentos.Valor_Vencimiento_1 = Request.Form("Val_1")
            objPorcen_Descuentos.Valor_Vencimiento_2 = Request.Form("Val_2")
            objPorcen_Descuentos.Valor_Vencimiento_3 = Request.Form("Val_3")
            objPorcen_Descuentos.Valor_Vencimiento_4 = Request.Form("Val_4")

            objPorcen_Descuentos.FechaActualizacion = Date.Now
            objPorcen_Descuentos.Usuario = UCase(Request.Form("user"))

            ObjListPorcen_Descuentos.Add(objPorcen_Descuentos)

            result = SQL.Insert(objPorcen_Descuentos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Porcen_Descuentos (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Update()

        Dim objPorcen_Descuentos As New Porcen_DescuentosClass
        Dim SQL As New Porcen_DescuentosSQLClass
        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)

        Dim result As String

        objPorcen_Descuentos.Cod_ID = Request.Form("Pais_ID")
        objPorcen_Descuentos.Ciudad_ID = Request.Form("Ciudad_ID")
        objPorcen_Descuentos.Impuesto_Gasto_ID = Request.Form("Impuesto_ID")
        objPorcen_Descuentos.RangoInicial_ID = Request.Form("RInicial")
        objPorcen_Descuentos.RangoFinal_ID = Request.Form("RFinal")
        objPorcen_Descuentos.Type_Limit = Request.Form("TipoL")
        objPorcen_Descuentos.Limit_Min = Request.Form("L_Inf")
        objPorcen_Descuentos.Limit_Max = Request.Form("L_Sup")

        objPorcen_Descuentos.MesDia_1 = Request.Form("Fecha_1")
        objPorcen_Descuentos.MesDia_2 = Request.Form("Fecha_2")
        objPorcen_Descuentos.MesDia_3 = Request.Form("Fecha_3")
        objPorcen_Descuentos.MesDia_4 = Request.Form("Fecha_4")

        objPorcen_Descuentos.Porcentaje_1 = Request.Form("Porcen_1")
        objPorcen_Descuentos.Porcentaje_2 = Request.Form("Porcen_2")
        objPorcen_Descuentos.Porcentaje_3 = Request.Form("Porcen_3")
        objPorcen_Descuentos.Porcentaje_4 = Request.Form("Porcen_4")

        objPorcen_Descuentos.Valor_Vencimiento_1 = Request.Form("Val_1")
        objPorcen_Descuentos.Valor_Vencimiento_2 = Request.Form("Val_2")
        objPorcen_Descuentos.Valor_Vencimiento_3 = Request.Form("Val_3")
        objPorcen_Descuentos.Valor_Vencimiento_4 = Request.Form("Val_4")

        objPorcen_Descuentos.FechaActualizacion = Date.Now
        objPorcen_Descuentos.Usuario = UCase(Request.Form("user"))


        ObjListPorcen_Descuentos.Add(objPorcen_Descuentos)

        result = SQL.Update(objPorcen_Descuentos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Porcen_Descuentos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Delete()

        Dim objPorcen_Descuentos As New Porcen_DescuentosClass
        Dim SQL As New Porcen_DescuentosSQLClass
        Dim ObjListPorcen_Descuentos As New List(Of Porcen_DescuentosClass)

        Dim result As String

        objPorcen_Descuentos.Cod_ID = Request.Form("Pais_ID")
        objPorcen_Descuentos.Ciudad_ID = Request.Form("Ciudad_ID")
        objPorcen_Descuentos.Impuesto_Gasto_ID = Request.Form("Impuesto_ID")
        objPorcen_Descuentos.RangoInicial_ID = Request.Form("RInicial")
        objPorcen_Descuentos.RangoFinal_ID = Request.Form("RFinal")
        objPorcen_Descuentos.Type_Limit = Request.Form("TipoL")
        objPorcen_Descuentos.Limit_Min = Request.Form("L_Inf")
        objPorcen_Descuentos.Limit_Max = Request.Form("L_Sup")

        ObjListPorcen_Descuentos.Add(objPorcen_Descuentos)

        result = SQL.Delete(objPorcen_Descuentos)
        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL As New Porcen_DescuentosSQLClass
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

        Dim SQL As New Porcen_DescuentosSQLClass
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

        Dim SQL As New Porcen_DescuentosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListImpuesto(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region


End Class
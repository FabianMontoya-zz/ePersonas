Imports Newtonsoft.Json

Public Class ProductosAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Cliente"
                    CargarCliente()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "consulta"
                    Consulta_Productos()

                Case "modificar"
                    Update()

                Case "crear"
                    InsertProductos()

                Case "elimina"
                    EraseProductos()

                Case "Tipo_Pro"
                    CargarTipo_Pro()

                Case "SubTipo_Pro"
                    CargarSubTipo_Pro()

                Case "Tipo_Act"
                    CargarTipo_Act()

                Case "SubTipo_Act"
                    CargarSubTipo_Act()

                Case "Transaccion"
                    CargarTransaccion()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Productos (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Productos()

        Dim SQL_Productos As New ProductosSQLClass
        Dim ObjListProductos As New List(Of ProductosClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListProductos = SQL_Productos.Read_AllProductos(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListProductos Is Nothing Then

            Dim objProductos As New ProductosClass
            ObjListProductos = New List(Of ProductosClass)

            objProductos.FechaActualizacion = ""
            objProductos.Usuario = ""

            ObjListProductos.Add(objProductos)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListProductos.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Productos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertProductos()

        Dim objProductos As New ProductosClass
        Dim SQL_Productos As New ProductosSQLClass
        Dim ObjListProductos As New List(Of ProductosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objProductos.Nit_ID = Request.Form("Nit_ID")
        objProductos.Producto_ID = Request.Form("ID")
       
        'validamos si la llave existe
        vl_s_IDxiste = SQL_Productos.Consulta_Repetido(objProductos)

        If vl_s_IDxiste = 0 Then

            objProductos.Descripcion = Request.Form("Descripcion")

            objProductos.TP_ID = Request.Form("TipoP_ID")
            objProductos.TA_ID = Request.Form("TipoA_ID")
            objProductos.STP_ID = Request.Form("SubTipoP_ID")
            objProductos.STA_ID = Request.Form("SubTipoA_ID")
            objProductos.Tran_ID_1 = Request.Form("Crea_ID")
            objProductos.Tran_ID_2 = Request.Form("Mod_ID")
            objProductos.Tran_ID_3 = Request.Form("Ret_ID")

            objProductos.Cuenta_1 = Request.Form("Cuenta_1")
            objProductos.Cuenta_2 = Request.Form("Cuenta_2")
            objProductos.Cuenta_3 = Request.Form("Cuenta_3")
            objProductos.Cuenta_4 = Request.Form("Cuenta_4")
            objProductos.Cuenta_5 = Request.Form("Cuenta_5")
            objProductos.Cuenta_6 = Request.Form("Cuenta_6")
            objProductos.Cuenta_7 = Request.Form("Cuenta_7")
            objProductos.Cuenta_8 = Request.Form("Cuenta_8")
            objProductos.Cuenta_9 = Request.Form("Cuenta_9")
            objProductos.Cuenta_10 = Request.Form("Cuenta_10")

            objProductos.Cuenta_11 = Request.Form("Cuenta_11")
            objProductos.Cuenta_12 = Request.Form("Cuenta_12")
            objProductos.Cuenta_13 = Request.Form("Cuenta_13")
            objProductos.Cuenta_14 = Request.Form("Cuenta_14")
            objProductos.Cuenta_15 = Request.Form("Cuenta_15")
            objProductos.Cuenta_16 = Request.Form("Cuenta_16")
            objProductos.Cuenta_17 = Request.Form("Cuenta_17")
            objProductos.Cuenta_18 = Request.Form("Cuenta_18")
            objProductos.Cuenta_19 = Request.Form("Cuenta_19")
            objProductos.Cuenta_20 = Request.Form("Cuenta_20")

            objProductos.Cuenta_21 = Request.Form("Cuenta_21")
            objProductos.Cuenta_22 = Request.Form("Cuenta_22")
            objProductos.Cuenta_23 = Request.Form("Cuenta_23")
            objProductos.Cuenta_24 = Request.Form("Cuenta_24")
            objProductos.Cuenta_25 = Request.Form("Cuenta_25")
            objProductos.Cuenta_26 = Request.Form("Cuenta_26")
            objProductos.Cuenta_27 = Request.Form("Cuenta_27")
            objProductos.Cuenta_28 = Request.Form("Cuenta_28")
            objProductos.Cuenta_29 = Request.Form("Cuenta_29")
            objProductos.Cuenta_30 = Request.Form("Cuenta_30")

            objProductos.Cuenta_31 = Request.Form("Cuenta_31")
            objProductos.Cuenta_32 = Request.Form("Cuenta_32")
            objProductos.Cuenta_33 = Request.Form("Cuenta_33")
            objProductos.Cuenta_34 = Request.Form("Cuenta_34")
            objProductos.Cuenta_35 = Request.Form("Cuenta_35")
            objProductos.Cuenta_36 = Request.Form("Cuenta_36")
            objProductos.Cuenta_37 = Request.Form("Cuenta_37")
            objProductos.Cuenta_38 = Request.Form("Cuenta_38")
            objProductos.Cuenta_39 = Request.Form("Cuenta_39")
            objProductos.Cuenta_40 = Request.Form("Cuenta_40")

            objProductos.Cuenta_41 = Request.Form("Cuenta_41")
            objProductos.Cuenta_42 = Request.Form("Cuenta_42")
            objProductos.Cuenta_43 = Request.Form("Cuenta_43")
            objProductos.Cuenta_44 = Request.Form("Cuenta_44")
            objProductos.Cuenta_45 = Request.Form("Cuenta_45")
            objProductos.Cuenta_46 = Request.Form("Cuenta_46")
            objProductos.Cuenta_47 = Request.Form("Cuenta_47")
            objProductos.Cuenta_48 = Request.Form("Cuenta_48")
            objProductos.Cuenta_49 = Request.Form("Cuenta_49")
            objProductos.Cuenta_50 = Request.Form("Cuenta_50")

            objProductos.FechaActualizacion = Date.Now
            objProductos.Usuario = Request.Form("user")

            ObjListProductos.Add(objProductos)

            result = SQL_Productos.InsertProductos(objProductos)

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

        Dim objProductos As New ProductosClass
        Dim SQL_Productos As New ProductosSQLClass
        Dim ObjListProductos As New List(Of ProductosClass)

        Dim result As String

        objProductos.Nit_ID = Request.Form("Nit_ID")
        objProductos.Producto_ID = Request.Form("ID")
        objProductos.Descripcion = Request.Form("Descripcion")

        objProductos.TP_ID = Request.Form("TipoP_ID")
        objProductos.TA_ID = Request.Form("TipoA_ID")
        objProductos.STP_ID = Request.Form("SubTipoP_ID")
        objProductos.STA_ID = Request.Form("SubTipoA_ID")
        objProductos.Tran_ID_1 = Request.Form("Crea_ID")
        objProductos.Tran_ID_2 = Request.Form("Mod_ID")
        objProductos.Tran_ID_3 = Request.Form("Ret_ID")

        objProductos.Cuenta_1 = Request.Form("Cuenta_1")
        objProductos.Cuenta_2 = Request.Form("Cuenta_2")
        objProductos.Cuenta_3 = Request.Form("Cuenta_3")
        objProductos.Cuenta_4 = Request.Form("Cuenta_4")
        objProductos.Cuenta_5 = Request.Form("Cuenta_5")
        objProductos.Cuenta_6 = Request.Form("Cuenta_6")
        objProductos.Cuenta_7 = Request.Form("Cuenta_7")
        objProductos.Cuenta_8 = Request.Form("Cuenta_8")
        objProductos.Cuenta_9 = Request.Form("Cuenta_9")
        objProductos.Cuenta_10 = Request.Form("Cuenta_10")

        objProductos.Cuenta_11 = Request.Form("Cuenta_11")
        objProductos.Cuenta_12 = Request.Form("Cuenta_12")
        objProductos.Cuenta_13 = Request.Form("Cuenta_13")
        objProductos.Cuenta_14 = Request.Form("Cuenta_14")
        objProductos.Cuenta_15 = Request.Form("Cuenta_15")
        objProductos.Cuenta_16 = Request.Form("Cuenta_16")
        objProductos.Cuenta_17 = Request.Form("Cuenta_17")
        objProductos.Cuenta_18 = Request.Form("Cuenta_18")
        objProductos.Cuenta_19 = Request.Form("Cuenta_19")
        objProductos.Cuenta_20 = Request.Form("Cuenta_20")

        objProductos.Cuenta_21 = Request.Form("Cuenta_21")
        objProductos.Cuenta_22 = Request.Form("Cuenta_22")
        objProductos.Cuenta_23 = Request.Form("Cuenta_23")
        objProductos.Cuenta_24 = Request.Form("Cuenta_24")
        objProductos.Cuenta_25 = Request.Form("Cuenta_25")
        objProductos.Cuenta_26 = Request.Form("Cuenta_26")
        objProductos.Cuenta_27 = Request.Form("Cuenta_27")
        objProductos.Cuenta_28 = Request.Form("Cuenta_28")
        objProductos.Cuenta_29 = Request.Form("Cuenta_29")
        objProductos.Cuenta_30 = Request.Form("Cuenta_30")

        objProductos.Cuenta_31 = Request.Form("Cuenta_31")
        objProductos.Cuenta_32 = Request.Form("Cuenta_32")
        objProductos.Cuenta_33 = Request.Form("Cuenta_33")
        objProductos.Cuenta_34 = Request.Form("Cuenta_34")
        objProductos.Cuenta_35 = Request.Form("Cuenta_35")
        objProductos.Cuenta_36 = Request.Form("Cuenta_36")
        objProductos.Cuenta_37 = Request.Form("Cuenta_37")
        objProductos.Cuenta_38 = Request.Form("Cuenta_38")
        objProductos.Cuenta_39 = Request.Form("Cuenta_39")
        objProductos.Cuenta_40 = Request.Form("Cuenta_40")

        objProductos.Cuenta_41 = Request.Form("Cuenta_41")
        objProductos.Cuenta_42 = Request.Form("Cuenta_42")
        objProductos.Cuenta_43 = Request.Form("Cuenta_43")
        objProductos.Cuenta_44 = Request.Form("Cuenta_44")
        objProductos.Cuenta_45 = Request.Form("Cuenta_45")
        objProductos.Cuenta_46 = Request.Form("Cuenta_46")
        objProductos.Cuenta_47 = Request.Form("Cuenta_47")
        objProductos.Cuenta_48 = Request.Form("Cuenta_48")
        objProductos.Cuenta_49 = Request.Form("Cuenta_49")
        objProductos.Cuenta_50 = Request.Form("Cuenta_50")

        objProductos.FechaActualizacion = Date.Now
        objProductos.Usuario = Request.Form("user")

        ObjListProductos.Add(objProductos)

        result = SQL_Productos.Update(objProductos)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Productos (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseProductos()

        Dim objProductos As New ProductosClass
        Dim SQL_Productos As New ProductosSQLClass
        Dim ObjListProductos As New List(Of ProductosClass)

        Dim result As String

        objProductos.Nit_ID = Request.Form("Nit_ID")
        objProductos.Producto_ID = Request.Form("Prod_ID")
        ObjListProductos.Add(objProductos)

        result = SQL_Productos.EraseProductos(objProductos)
        Response.Write(result)
    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Productos As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Productos.ReadCharge_DropList(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTipo_Pro()

        Dim SQL As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTipo_P(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSubTipo_Pro()

        Dim SQL As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListDroplist = SQL.Charge_DropListSubTipo_P(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTipo_Act()

        Dim SQL As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTipo_A(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarSubTipo_Act()

        Dim SQL As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_ID As String = Request.Form("ID")

        ObjListDroplist = SQL.Charge_DropListSubTipo_A(vl_S_ID)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTransaccion()

        Dim SQL As New ProductosSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTransaccion(vl_S_Tabla)
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

#Region "FUNCIONES"

#End Region

End Class
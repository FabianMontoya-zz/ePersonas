Imports Newtonsoft.Json

Public Class C_ActivosAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_RTSTA"
                    Matrix_RTSTA()

                Case "MATRIX_PAIS_CIUDAD"
                    Carga_Matriz_PaisCiudad()

                Case "MATRIX_PERSONAS"
                    Carga_MPersonas()

                Case "MATRIX_SUCURSAL"
                    Carga_MSucursal()

                Case "MATRIX_MONEDA"
                    Carga_MMoneda()

                Case "LIST_MARCA_F"
                    Carga_ListMarca_Fasecolda()

                Case "LIST_CLASE_F"
                    Carga_Lista_Clase_Fasecolda()

                Case "MATRIX_LINEA_F"
                    Carga_M_Fasecolda_Flitrada()

                Case "MATRIX_LINEA_F_ID"
                    Carga_M_Fasecolda_Flitrada_ID()

                Case "Documento"
                    CargarDocumento()

                Case "Colores"
                    CargarColor()

                Case "Buscar_Persona"
                    Search_People()

                Case "Tipo"
                    CargarTipo()

                Case "Cliente"
                    CargarCliente()

                Case "crear"
                    InsertC_Activos()

                Case "crear_vehiculo"
                    Insert_Vehiculo()

                Case "ConsultarFactura"
                    ConsultFactura()

                Case "crear_Factura"
                    Insert_Factura()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla C_Activos (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Activos()

        Dim objC_Activos As New C_ActivosClass
        Dim SQL_C_Activos As New C_ActivosSQLClass
        Dim ObjListC_Activos As New List(Of C_ActivosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Activos.Nit_ID = Request.Form("Nit_ID")
        objC_Activos.Ref_1 = Request.Form("Ref_1")
        objC_Activos.Ref_2 = Request.Form("Ref_2")
        objC_Activos.Ref_3 = Request.Form("Ref_3")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_Activos.Consulta_Repetido(objC_Activos)

        If vl_s_IDxiste = 0 Then

            objC_Activos.Descripcion = Request.Form("Descripcion")
            objC_Activos.TA_ID = Request.Form("TActivo")
            objC_Activos.STA_ID = Request.Form("STActivo")
            objC_Activos.Cod_Pais_U = Request.Form("Pais_U")
            objC_Activos.Ciudad_ID_U = Request.Form("Ciudad_U")
            objC_Activos.Direccion_U = Request.Form("Direccion_U")
            objC_Activos.Cod_Pais_R = Request.Form("Pais_R")
            objC_Activos.Ciudad_ID_R = Request.Form("Ciudad_R")
            objC_Activos.TypeDocument_ID_R = Request.Form("TDoc_R")
            objC_Activos.Document_ID_R = Request.Form("Doc_R")
            objC_Activos.Surcursal_ID = Request.Form("Sucursal")
            objC_Activos.Cod_Moneda_ID = Request.Form("Moneda")
            objC_Activos.Valor_Bien = Request.Form("Valor_Bien")
            objC_Activos.Val_Op_Compra = Request.Form("Val_Op_Compra")
            objC_Activos.CompraBien = Request.Form("CompraBien")
            objC_Activos.Asegurado = Request.Form("Asegurado")
            objC_Activos.EstadoActivo = Request.Form("EstadoActivo")
            objC_Activos.TipoAdministracion = Request.Form("TipoAdministracion")
            objC_Activos.TipoEscritura = Request.Form("TipoEscritura")
            objC_Activos.N_Escritura = Request.Form("NunImobiliaria")
            objC_Activos.FechaConta_Recibo = Request.Form("FechaC_Recibo")
            objC_Activos.FechaConta_Retiro = Request.Form("FechaC_Retiro")
            objC_Activos.TypeDocument_ID_Not = Request.Form("TDoc_Not")
            objC_Activos.Document_ID_Not = Request.Form("Doc_Not")

            objC_Activos.Num_Poliza = Request.Form("Num_Poliza")

            objC_Activos.TypeDocument_ID_T = Request.Form("TDoc_T")
            objC_Activos.Document_ID_T = Request.Form("Doc_T")

            objC_Activos.UsuarioCreacion = Request.Form("user")
            objC_Activos.FechaCreacion = Date.Now
            objC_Activos.UsuarioActualizacion = Request.Form("user")
            objC_Activos.FechaActualizacion = Date.Now

            ObjListC_Activos.Add(objC_Activos)

            result = SQL_C_Activos.InsertC_Activos(objC_Activos)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla vehiculo (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Insert_Vehiculo()

        Dim objC_Vehiculo As New VehiculosClass
        Dim SQL As New VehiculosSQLClass
        Dim ObjListC_Vehiculo As New List(Of VehiculosClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Vehiculo.Nit_ID = Request.Form("Nit_ID")
        objC_Vehiculo.Ref_1 = Request.Form("Ref_1")
        objC_Vehiculo.Ref_2 = Request.Form("Ref_2")
        objC_Vehiculo.Ref_3 = Request.Form("Ref_3")

        'validamos si la llave existe
        vl_s_IDxiste = SQL.Consulta_Repetido(objC_Vehiculo)

        If vl_s_IDxiste = 0 Then

            objC_Vehiculo.Fasecolda_ID = Request.Form("Facecolda_ID")
            objC_Vehiculo.Modelo = Request.Form("Modelo")
            objC_Vehiculo.Clase = Request.Form("Clase")
            objC_Vehiculo.Marca = Request.Form("Marca")
            objC_Vehiculo.Linea = Request.Form("Linea")
            objC_Vehiculo.ValorComer = Request.Form("ValorComercial")
            objC_Vehiculo.Cilindraje = Request.Form("Cilindraje")
            objC_Vehiculo.N_Motor = Request.Form("Motor")
            objC_Vehiculo.N_Chasis = Request.Form("Chasis")
            objC_Vehiculo.ValorChasis = Request.Form("ValorChasis")
            objC_Vehiculo.N_Serie = Request.Form("Serie")
            objC_Vehiculo.N_VIN = Request.Form("VIN")
            objC_Vehiculo.Modalidad_Servicio = Request.Form("M_Servicio")
            objC_Vehiculo.N_Pasajeros = Request.Form("Pasajeros")
            objC_Vehiculo.TipoServicio = Request.Form("TipoServicio")
            objC_Vehiculo.Combustible = Request.Form("Combustible")
            objC_Vehiculo.Colores_ID = Request.Form("Color")
            objC_Vehiculo.Capacidad = Request.Form("Capacidad")
            objC_Vehiculo.Potencia = Request.Form("Potencia")
            objC_Vehiculo.Carroceria = Request.Form("Carroceria")
            objC_Vehiculo.TipoCarroceria = Request.Form("TipoCarroceria")
            objC_Vehiculo.Blindaje = Request.Form("Blindaje")
            objC_Vehiculo.N_TypeDocument_ID_Blind = Request.Form("TDoc_Blin")
            objC_Vehiculo.N_Document_ID_Blind = Request.Form("Doc_Blin")
            objC_Vehiculo.NivelBlindaje = Request.Form("Nivel_Blin")
            objC_Vehiculo.N_GPS = Request.Form("GPS")

            objC_Vehiculo.UsuarioCreacion = Request.Form("user")
            objC_Vehiculo.FechaCreacion = Date.Now
            objC_Vehiculo.UsuarioActualizacion = Request.Form("user")
            objC_Vehiculo.FechaActualizacion = Date.Now

            ObjListC_Vehiculo.Add(objC_Vehiculo)

            result = SQL.InsertVehiculos(objC_Vehiculo)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub


#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarTipo()

        Dim SQL As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListTipo(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Matrix_RTSTA()

        Dim SQL As New Relation_Tipo_Subtipo_ActivoSQLClass
        Dim ObjList As New List(Of Relation_Tipo_Subtipo_ActivoClass)

        ObjList = SQL.Matrix_RTSTA()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Matriz_PaisCiudad()

        Dim SQLC As New CiudadesSQLClass

        Dim ObjList_MatrixCiudad As New List(Of CiudadesClass)
        ObjList_MatrixCiudad = SQLC.Read_Matrix_Ciudad()

        Response.Write(JsonConvert.SerializeObject(ObjList_MatrixCiudad.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MPersonas()

        Dim SQL As New ClienteSQLClass

        Dim ObjList_Matrix As New List(Of ClienteClass)
        ObjList_Matrix = SQL.Matrix_PersonasDep()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarColor()

        Dim SQL As New ColoresSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)

        ObjListDroplist = SQL.List_Colors()
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

    ''' <summary>
    ''' funcion que carga La matrix
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MMoneda()

        Dim SQL As New MonedaCodSQLClass
        Dim ObjList As New List(Of MonedaCodClass)

        ObjList = SQL.Matrix_Moneda()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga matrix de marca clases fasecolda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_ListMarca_Fasecolda()

        Dim SQL As New FasecoldaSQLClass

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.List_Marca_Fasecolda()

        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La lista de clases SEGUN LA MARCA ESCOGIDA
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_Lista_Clase_Fasecolda()

        Dim SQL As New FasecoldaSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim obj As New FasecoldaClass
        obj.Marca = Request.Form("index")

        ObjListDroplist = SQL.List_Clases_Fasecolda(obj)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga LISTA de lineas marca clases fasecolda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_M_Fasecolda_Flitrada()

        Dim SQL As New FasecoldaSQLClass
        Dim ObjList As New List(Of FasecoldaClass)
        Dim obj As New FasecoldaClass
        obj.Clase = Request.Form("index")
        obj.Marca = Request.Form("Marca")
        obj.tipo_SQL = "M"

        ObjList = SQL.Matrix_Fasecolda_Filtrada(obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga LISTA de lineas marca clases fasecolda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_M_Fasecolda_Flitrada_ID()

        Dim SQL As New FasecoldaSQLClass
        Dim ObjList As New List(Of FasecoldaClass)
        Dim obj As New FasecoldaClass
        obj.Fasecolda_ID = Request.Form("index")
        obj.tipo_SQL = "ID"

        ObjList = SQL.Matrix_Fasecolda_Filtrada(obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub




    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDocumento()

        Dim SQL As New ClienteSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListDocumento(vl_S_Tabla)
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

    ''' <summary>
    ''' consulta si existe la persona digitada 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_People()

        Dim SQL As New ClienteSQLClass
        Dim vl_S_Nit As String = Request.Form("NIT")
        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")

        Dim Str_People As String = SQL.SearchPeople_Exists(vl_S_Nit, vl_S_TD, vl_S_D)
        Response.Write(Str_People)

    End Sub

#End Region

#Region "CRUD FACTURA"

    Protected Sub Insert_Factura()

        Dim SQL_C_Fact As New FacturaSQLClass
        Dim ObjListC_Activo As New List(Of FacturaClass)

        Dim Result_list As String = "Exito"
        Dim S_list As String = Request.Form("ListFacturas").ToString

        Dim ListFact As New List(Of FacturaClass)
        ListFact = SQL_C_Fact.Create_List_Factura(S_list)

        For Each item_list As FacturaClass In ListFact
            Dim Result As String = SQL_C_Fact.InsertC_Factura(item_list)

            If Result = "Exito" Then
                Result_list = "Exito"
            Else
                Result_list = "Error_Factura"
                Exit For
            End If
        Next

        Response.Write(Result_list)
    End Sub

#End Region

#Region "FUNCIONES FACTURA"
    ''' <summary>
    ''' funcion que carga consulta el activo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ConsultFactura()
        Dim result As String = ""

        Select Case Request.Form("tabla")
            Case "FACT_ORD_COMPRA"
                Dim SQL As New FacturaSQLClass
                Dim Obj As New FacturaClass

                Obj.Nit_ID = Request.Form("NIT")
                Obj.Ref_1 = Request.Form("Ref1")
                Obj.Ref_2 = Request.Form("Ref2")
                Obj.Ref_3 = Request.Form("Ref3")
                Obj.Fact_Oct_ID = Request.Form("Factura_ID")

                result = SQL.Consulta_Repetido(Obj)

        End Select

        Response.Write(result)

    End Sub
#End Region

End Class
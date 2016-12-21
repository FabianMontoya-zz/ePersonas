Imports Newtonsoft.Json

Public Class C_ContratoAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_SUCURSAL"
                    Carga_MSucursal()

                Case "MATRIX_MONEDA"
                    Carga_MMoneda()

                Case "Documento"
                    CargarDocumento()

                Case "Buscar_Persona"
                    Search_People()

                Case "MATRIX_PRODUCTOS"
                    Carga_MProductos()

                Case "MATRIX_FINANCIACION"
                    Carga_MFinanciacion()

                Case "MATRIX_CICLO"
                    Carga_MCiclo()

                Case "MATRIX_DIRECCIONES"
                    Carga_MDirecciones()

                Case "MATRIX_TASAS"
                    Carga_MTasas()

                Case "Cliente"
                    CargarCliente()

                Case "crear"
                    InsertC_Contrato()

                Case "CrearTercero"
                    InsertC_Terceros()

                    'PROCESO DE ACTIVOS
                Case "MATRIX_RTSTA"
                    Matrix_RTSTA()

                Case "MATRIX_PAIS_CIUDAD"
                    Carga_Matriz_PaisCiudad()

                Case "MATRIX_PERSONAS"
                    Carga_MPersonas()

                Case "LIST_MARCA_F"
                    Carga_ListMarca_Fasecolda()

                Case "LIST_CLASE_F"
                    Carga_Lista_Clase_Fasecolda()

                Case "MATRIX_LINEA_F"
                    Carga_M_Fasecolda_Flitrada()

                Case "MATRIX_LINEA_F_ID"
                    Carga_M_Fasecolda_Flitrada_ID()

                Case "Colores"
                    CargarColor()

                Case "Tipo"
                    CargarTipo()

                Case "ConsultarActivo"
                    ConsultActivo()

                Case "CrearActivo"
                    InsertC_Activos()

                Case "CrearVehiculo"
                    InsertC_Vehiculos()

                Case "ConsultarFactura"
                    ConsultFactura()

                Case "crear_Factura"
                    Insert_Factura()


            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla C_Contrato (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Contrato()

        Dim objC_Contrato As New C_ContratoClass
        Dim SQL_C_Contrato As New C_ContratoSQLClass
        Dim ObjListC_Contrato As New List(Of C_ContratoClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objC_Contrato.Nit_ID = Request.Form("Nit_ID")
        objC_Contrato.Sucursal_ID = Request.Form("Sucursal")
        objC_Contrato.Colocacion_ID = Request.Form("Colocacion")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_C_Contrato.Consulta_Repetido(objC_Contrato)
        If vl_s_IDxiste = 0 Then

            objC_Contrato.Descripcion = Request.Form("Descripcion")
            objC_Contrato.TypeDocument_ID = Request.Form("TypeDocument")
            objC_Contrato.Document_ID = Request.Form("Document")
            objC_Contrato.Moneda_ID = Request.Form("Moneda")
            objC_Contrato.Producto_ID = Request.Form("Producto")

            objC_Contrato.Condi_Financiacion_ID = Request.Form("CondicionFinanciacion")
            objC_Contrato.Unidad_Tiempo_ID = Request.Form("UnidadTiempo")
            objC_Contrato.Fecha_Apertura = Request.Form("FechaApertura")
            objC_Contrato.Plazo = Request.Form("Plazo")
            objC_Contrato.Ciclo_ID = Request.Form("Ciclo")

            objC_Contrato.Base_Calculo_ID = Request.Form("BaseCalculo")
            objC_Contrato.Direccion_Correspondiente = Request.Form("Direccion")
            objC_Contrato.Valor_Total = Request.Form("Total")
            objC_Contrato.Valor_Financiado = Request.Form("Financiado")
            objC_Contrato.Valor_Opc_Compra = Request.Form("OpcionCompra")

            objC_Contrato.UsuarioCreacion = Request.Form("user")
            objC_Contrato.FechaCreacion = Date.Now
            objC_Contrato.UsuarioActualizacion = Request.Form("user")
            objC_Contrato.FechaActualizacion = Date.Now

            ObjListC_Contrato.Add(objC_Contrato)

            result = SQL_C_Contrato.InsertC_Contrato(objC_Contrato)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Relacion_Actores (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Terceros()

        Dim objC_Terceros As New Relacion_ActoresClass
        Dim SQL_C_Terceros As New Relacion_ActoresSQLClass
        Dim Result_list As String = "Exito"

        Dim ListTerceros As New List(Of Relacion_ActoresClass)
        ListTerceros = Create_List_terceros()

        For Each item_list As Relacion_ActoresClass In ListTerceros
            Dim Result As String = SQL_C_Terceros.InsertActores(item_list)

            If Result = "Exito" Then
                Result_list = "Exito"
            Else
                Result_list = "Error_Tercero"
                Exit For
            End If
        Next

        Response.Write(Result_list)


    End Sub

#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga La matrix Sucursal
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MSucursal()

        Dim SQL As New SucursalSQLClass

        Dim ObjList_Matrix As New List(Of SucursalClass)
        ObjList_Matrix = SQL.Matrix_Sucursal()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Moneda
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MMoneda()

        Dim SQL As New MonedaCodSQLClass
        Dim ObjList As New List(Of MonedaCodClass)

        ObjList = SQL.Matrix_Moneda()
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
    ''' funcion que carga La matrix Productos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MProductos()

        Dim SQL As New ProductosSQLClass

        Dim ObjList_Matrix As New List(Of ProductosClass)
        ObjList_Matrix = SQL.Matrix_Productos()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Financiacion
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MFinanciacion()

        Dim SQL As New FinanciacionSQLClass

        Dim ObjList_Matrix As New List(Of FinanciacionClass)
        ObjList_Matrix = SQL.Matrix_Financiacion()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

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
    ''' funcion que carga La matrix Ciclo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MCiclo()

        Dim SQL As New CicloSQLClass

        Dim ObjList_Matrix As New List(Of CicloClass)
        ObjList_Matrix = SQL.Matrix_Ciclo()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Direcciones
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MDirecciones()

        Dim SQL As New ClienteSQLClass

        Dim vl_S_TD As String = Request.Form("TD")
        Dim vl_S_D As String = Request.Form("D")
        Dim vl_S_NIT As String = Request.Form("NIT")

        Dim ObjList_Matrix As New List(Of ClienteClass)
        ObjList_Matrix = SQL.Matrix_Personas_Direcciones(vl_S_TD, vl_S_D, vl_S_NIT)

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga La matrix Tasas
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Carga_MTasas()

        Dim SQL As New TasasSQLClass

        Dim ObjList_Matrix As New List(Of TasasClass)
        ObjList_Matrix = SQL.Matrix_Tasas()

        Response.Write(JsonConvert.SerializeObject(ObjList_Matrix.ToArray()))

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

    ''' <summary>
    ''' Hace conversión de List de Terceros a una lista que se pueda insertar en BD
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List_terceros()

        Dim vl_S_Nit As String = Request.Form("Nit_ID")
        Dim vl_S_Contrato As String = Request.Form("Contrato_ID")
        Dim vl_S_User As String = Request.Form("user")

        Dim S_list As String = Request.Form("listTerceros").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of Relacion_ActoresClass))(S_list)

        Dim ObjlistTercero As New List(Of Relacion_ActoresClass)

        For Each item As Relacion_ActoresClass In NewList

            Dim Obj As New Relacion_ActoresClass

            Obj.Nit_ID = vl_S_Nit
            Obj.Contrato_ID = vl_S_Contrato
            Obj.TypeDocument_ID = item.TypeDocument_ID
            Obj.Document_ID = item.Document_ID
            Obj.TypeRelation = item.TypeRelation
            Obj.UsuarioCreacion = vl_S_User
            Obj.UsuarioActualizacion = vl_S_User
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjlistTercero.Add(Obj)

        Next

        Return ObjlistTercero
    End Function
#End Region

#Region "CRUD ACTIVOS"

    ''' <summary>
    ''' Insert de Activos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Activos()

        Dim SQL_C_Act As New C_ActivosSQLClass
        Dim ObjListC_Activo As New List(Of C_ActivosClass)

        Dim Result_list As String

        Dim ListActivos As New List(Of C_ActivosClass)
        ListActivos = Create_List_Activos()

        For Each item_list As C_ActivosClass In ListActivos
            Dim Result As String = SQL_C_Act.InsertC_Activos(item_list)

            If Result = "Exito" Then
                Result_list = "Exito"
            Else
                Result_list = "Error_Activo"
                Exit For
            End If
        Next

    End Sub

    ''' <summary>
    ''' Insert de Vehículos
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertC_Vehiculos()

        Dim SQL_C_Veh As New VehiculosSQLClass
        Dim ObjListC_Vehiculo As New List(Of VehiculosClass)

        Dim Result_list As String

        Dim ListVehiculos As New List(Of VehiculosClass)
        ListVehiculos = Create_List_Vehiculos()

        For Each item_list As VehiculosClass In ListVehiculos
            Dim Result As String = SQL_C_Veh.InsertVehiculos(item_list)

            If Result = "Exito" Then
                Result_list = "Exito"
            Else
                Result_list = "Error_Vehiculo"
                Exit For
            End If
        Next

    End Sub

#End Region

#Region "DROP LIST ACTIVOS"
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


#End Region

#Region "OTRAS CONSULTAS ACTIVOS"

    ''' <summary>
    ''' funcion que carga consulta el activo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub ConsultActivo()
        Dim result As String = ""

        Dim tipo As Integer = Request.Form("Tipo")
        Dim SQL As New C_ActivosSQLClass
        Dim ObjA As New C_ActivosClass

        If tipo = 2 Then

            ObjA.Nit_ID = Request.Form("NIT")
            ObjA.Ref_1 = Request.Form("Ref_other")
            ObjA.Ref_2 = Request.Form("Ref2")
            ObjA.Ref_3 = Request.Form("Ref3")

            result = SQL.Consulta_Repetido(ObjA)

        Else
            ObjA.Nit_ID = Request.Form("NIT")
            ObjA.Ref_1 = Request.Form("Ref1")
            ObjA.Ref_2 = Request.Form("Ref2")
            ObjA.Ref_3 = Request.Form("Ref3")

            result = SQL.Consulta_Repetido(ObjA)

        End If

        Response.Write(result)

    End Sub

#End Region

#Region "FUNCIONES ACTIVOS"

    ''' <summary>
    ''' Hace conversión de List de Activos a una lista que se pueda insertar en BD
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List_Activos()

        Dim vl_S_Nit As String = Request.Form("Nit_ID")
        Dim vl_S_User As String = Request.Form("user")

        Dim S_list As String = Request.Form("ListActivos").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of C_ActivosClass))(S_list)

        Dim ObjlistActivos As New List(Of C_ActivosClass)

        For Each item As C_ActivosClass In NewList

            Dim Obj As New C_ActivosClass

            Obj.Nit_ID = vl_S_Nit

            Obj.Ref_1 = item.Ref_1
            Obj.Ref_2 = item.Ref_2
            Obj.Ref_3 = item.Ref_3
            Obj.Descripcion = item.Descripcion
            Obj.TA_ID = item.TA_ID
            Obj.STA_ID = item.STA_ID
            Obj.Cod_Pais_U = item.Cod_Pais_U
            Obj.Ciudad_ID_U = item.Ciudad_ID_U
            Obj.Direccion_U = item.Direccion_U
            Obj.Cod_Pais_R = item.Cod_Pais_R
            Obj.Ciudad_ID_R = item.Ciudad_ID_R
            Obj.TypeDocument_ID_R = item.TypeDocument_ID_R
            Obj.Document_ID_R = item.Document_ID_R
            Obj.Surcursal_ID = item.Surcursal_ID
            Obj.Cod_Moneda_ID = item.Cod_Moneda_ID
            Obj.Valor_Bien = item.Valor_Bien
            Obj.Val_Op_Compra = item.Val_Op_Compra
            Obj.CompraBien = item.CompraBien
            Obj.Asegurado = item.Asegurado
            Obj.EstadoActivo = item.EstadoActivo
            Obj.TipoAdministracion = item.TipoAdministracion
            Obj.TipoEscritura = item.TipoEscritura
            Obj.N_Escritura = item.N_Escritura
            Obj.FechaConta_Recibo = item.FechaConta_Recibo
            Obj.FechaConta_Retiro = item.FechaConta_Retiro
            Obj.TypeDocument_ID_T = item.TypeDocument_ID_T
            Obj.Document_ID_T = item.Document_ID_T
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioCreacion = vl_S_User
            Obj.UsuarioActualizacion = vl_S_User
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjlistActivos.Add(Obj)

        Next

        Return ObjlistActivos
    End Function

    ''' <summary>
    ''' Hace conversión de List de Vehiculos a una lista que se pueda insertar en BD
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List_Vehiculos()

        Dim vl_S_Nit As String = Request.Form("Nit_ID")
        Dim vl_S_User As String = Request.Form("user")

        Dim S_list As String = Request.Form("ListVehiculos").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of VehiculosClass))(S_list)

        Dim ObjlistVehiculos As New List(Of VehiculosClass)

        For Each item As VehiculosClass In NewList

            Dim Obj As New VehiculosClass

            Obj.Nit_ID = vl_S_Nit

            Obj.Ref_1 = item.Ref_1
            Obj.Ref_2 = item.Ref_2
            Obj.Ref_3 = item.Ref_3
            Obj.Fasecolda_ID = item.Fasecolda_ID
            Obj.Modelo = item.Modelo
            Obj.Clase = item.Clase
            Obj.Marca = item.Marca
            Obj.Linea = item.Linea
            Obj.ValorComer = item.ValorComer
            Obj.Cilindraje = item.Cilindraje
            Obj.N_Motor = item.N_Motor
            Obj.N_Chasis = item.N_Chasis
            Obj.ValorChasis = item.ValorChasis
            Obj.N_Serie = item.N_Serie
            Obj.N_VIN = item.N_VIN
            Obj.Modalidad_Servicio = item.Modalidad_Servicio
            Obj.N_Pasajeros = item.N_Pasajeros
            Obj.TipoServicio = item.TipoServicio
            Obj.Combustible = item.Combustible
            Obj.Colores_ID = item.Colores_ID
            Obj.Capacidad = item.Capacidad
            Obj.Potencia = item.Potencia
            Obj.Carroceria = item.Carroceria
            Obj.TipoCarroceria = item.TipoCarroceria
            Obj.Blindaje = item.Blindaje
            Obj.N_TypeDocument_ID_Blind = item.N_TypeDocument_ID_Blind
            Obj.N_Document_ID_Blind = item.N_Document_ID_Blind
            Obj.N_GPS = item.N_GPS
            Obj.UsuarioCreacion = item.UsuarioCreacion
            Obj.UsuarioCreacion = vl_S_User
            Obj.UsuarioActualizacion = vl_S_User
            Obj.FechaCreacion = Date.Now
            Obj.FechaActualizacion = Date.Now

            ObjlistVehiculos.Add(Obj)

        Next

        Return ObjlistVehiculos
    End Function

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
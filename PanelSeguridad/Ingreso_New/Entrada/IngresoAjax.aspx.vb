Imports Newtonsoft.Json

Public Class IngresoAjax
    Inherits System.Web.UI.Page


    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "Documento"
                    CargarDocumento()

                Case "Search_People_Access"
                    Search_People_Access()

                Case "Buscar_Foto"
                    Search_Document_Foto()

                Case "Buscar_Doc_Persona"
                    List_Personas_Doc()

                Case "Buscar_Doc_Empresa"
                    List_Empresa_Doc()

                Case "Traer_Doc_Persona"
                    List_Doc_Persona()

                Case "Traer_Doc_Empresa"
                    List_Doc_Empresa()

                Case "Lista_Puerta_Acceso"
                    List_Puerta_Acceso()

                Case "Lista_Puerta_Acceso_Area"
                    List_PuertaAccesos_Area()

                Case "Lista_Accesos_Predeterminados"
                    List_Access_Predeterminado()

                Case "Empleados_Encargados"
                    List_Search_People_Bussiness()

                Case "Buscar_extencion"
                    List_Empleados()

                Case "Save_Log_Ingreso"
                    Save_Log_Ingreso()

                Case "Revisa_Ingreso"
                    People_Ingress()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla Acceso (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Save_Log_Ingreso()

        Dim objAcceso As New ControlAccesoClass
        Dim SQL_Acceso As New ControlAccesoSQLClass
        Dim ObjListAcceso As New List(Of ControlAccesoClass)

        Dim result As String = ""

        Dim List As New List(Of ControlAccesoClass)
        List = Create_List_ControlAcceso()

        For Each item_list As ControlAccesoClass In List
            result = SQL_Acceso.InsertControlAcceso(item_list)
            If result <> "Exito" Then
                result = "Error"
                Response.Write(result)
                Stop
            End If
        Next
        Response.Write(result)

    End Sub

#End Region

#Region "DROP LIST"

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

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' consulta si existe la persona digitada 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_People_Access()

        Dim SQL As New ClienteSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of ClienteClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")
        Obj.Tarjeta_ID = Request.Form("Tarjeta_ID")

        ObjList = SQL.SearchPeople_Access(Obj)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' trae la foto del personaje a consultar
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Search_Document_Foto()

        Dim SQL As New DocumentoSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentoClass)

        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")
        Obj.TipoSQL = "Pagina"

        ObjList = SQL.SearchDocument_People(Obj)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))
    End Sub

    ''' <summary>
    ''' cara la matriz de documento para trabajo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Personas_Doc()

        Dim SQL As New ClienteSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentoClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")
        Obj.TipoSQL = Request.Form("TipoSQL")

        ObjList = SQL.List_Personas_Documentos(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' cara la matriz de documento para trabajo
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Empresa_Doc()

        Dim SQL As New ClienteSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentoClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TipoSQL = Request.Form("TipoSQL")

        ObjList = SQL.List_Personas_Documentos(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' carga la lista de documentos de la persona
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Doc_Persona()

        Dim SQL As New DocumentoSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentoClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")
        Obj.TipoSQL = Request.Form("TipoSQL")

        ObjList = SQL.List_Document_Work(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' carga la lista de documentos de la empresa
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Doc_Empresa()

        Dim SQL As New DocumentoSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentoClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TipoSQL = Request.Form("TipoSQL")

        ObjList = SQL.List_Document_Work(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' trea la lista puertas de acceso area 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Puerta_Acceso()

        Dim SQL As New PuertaAccesoSQLClass
        Dim ObjList As New List(Of PuertaAccesoClass)

        Dim vl_S_Nit_ID As String = Request.Form("NIT")

        ObjList = SQL.List_PuertaAcceso(vl_S_Nit_ID)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' trea la lista puertas de acceso area 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_PuertaAccesos_Area()

        Dim SQL As New R_PuertaAcc_AreaSQLClass
        Dim ObjList As New List(Of R_PuertaAcc_AreaClass)

        Dim vl_S_Nit_ID As String = Request.Form("NIT")

        ObjList = SQL.List_R_PuertaAcceso_Area(vl_S_Nit_ID)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' carga la lista de accesos predeterminados
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Access_Predeterminado()

        Dim SQL As New C_AccesoPreSQLClass
        Dim ObjList As New List(Of C_AccesoPreClass)

        Dim vl_S_Nit_Bussines_Visit As String = Request.Form("NIT")

        ObjList = SQL.List_Access_Predeterminado(vl_S_Nit_Bussines_Visit)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' carga la lista de accesos predeterminados
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Search_People_Bussiness()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)

        Dim vl_S_Nit_Bussines_Visit As String = Request.Form("NIT")
        Dim vl_S_Search_Argument As String = Request.Form("Argumento")

        ObjList = SQL.SearchPeople_Bussines(vl_S_Nit_Bussines_Visit, vl_S_Search_Argument)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' carga la matriz de datos de los empleados
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Empleados()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)
        Dim Obj As New ClienteClass

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TDoc")
        Obj.Document_ID = Request.Form("Doc")

        ObjList = SQL.List_ExtencionesEmpleados(Obj)
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' crea lista clase de control de acesso
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Create_List_ControlAcceso()
        Dim S_list As String = Request.Form("ListIngresoLog").ToString
        Dim NewList = JsonConvert.DeserializeObject(Of List(Of ControlAccesoClass))(S_list)

        Dim ObjList As New List(Of ControlAccesoClass)

        For Each item As ControlAccesoClass In NewList
            Dim Obj As New ControlAccesoClass

            Obj.Nit_ID = item.Nit_ID
            Obj.TypeDocument_ID = item.TypeDocument_ID
            Obj.Document_ID = item.Document_ID
            Obj.Tarjeta_ID = item.Tarjeta_ID
            Obj.Nit_ID_EmpVisita = item.Nit_ID_EmpVisita
            Obj.PuertaAcceso_ID = item.PuertaAcceso_ID
            Obj.Area_ID = item.Area_ID
            Obj.TypeDocument_ID_Per_Encargada = item.TypeDocument_ID_Per_Encargada
            Obj.Document_ID_Per_Encargada = item.Document_ID_Per_Encargada
            Obj.FechaEntrada = item.FechaEntrada
            Obj.HoraEntrada = item.HoraEntrada
            Obj.Tiempo_PlanVisita = item.Tiempo_PlanVisita
            Obj.Fecha_PlanSalida = item.Fecha_PlanSalida
            Obj.Hora_PlanSalida = item.Hora_PlanSalida
            Obj.Fecha_RealSalida = item.Fecha_RealSalida
            Obj.Hora_RealSalida = item.Hora_RealSalida
            Obj.Estado = item.Estado
            Obj.IngAutomatico_Porteria = item.IngAutomatico_Porteria
            Obj.TipoPersona = item.TipoPersona
            Obj.Num_UnicoVisita = item.Num_UnicoVisita
            Obj.Usuario_Ingreso = item.Usuario_Ingreso
            Obj.FechaIngreso = item.FechaIngreso
            Obj.Usuario_Salida = item.Usuario_Salida
            Obj.FechaSalida = item.FechaSalida

            ObjList.Add(Obj)
        Next

        Return ObjList
    End Function

    ''' <summary>
    ''' validamos si la persona ya esta en la planta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub People_Ingress()

        Dim SQL As New ControlAccesoSQLClass
        Dim Obj As New ControlAccesoClass

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")

        Dim Ingreso As String = SQL.Consulta_Ingreso(Obj)

        Response.Write(Ingreso)

    End Sub

#End Region

End Class
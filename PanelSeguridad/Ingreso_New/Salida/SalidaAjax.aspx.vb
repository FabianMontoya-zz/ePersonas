Imports Newtonsoft.Json

Public Class SalidaAjax
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

                Case "Traer_LogIngreso"
                    List_Registro_Ingreso()

                Case "Update_Log_Salida"
                    Update_Log_Salida()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que ACTUALIZA en la tabla Acceso (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Update_Log_Salida()

        Dim objAcceso As New ControlAccesoClass
        Dim SQL_Acceso As New ControlAccesoSQLClass
        Dim ObjListAcceso As New List(Of ControlAccesoClass)

        Dim Obj As New ControlAccesoClass

        Obj.Nit_ID = Request.Form("Nit")
        Obj.TypeDocument_ID = Request.Form("TDoc")
        Obj.Document_ID = Request.Form("Doc")
         Obj.Usuario_Salida = Request.Form("user")
        Obj.Fecha_RealSalida = Date.Now

        Dim result As String = SQL_Acceso.UpdateControlAcceso(Obj)

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

        Dim SQL As New DocumentosSQLClass
        Dim Obj As New ClienteClass
        Dim ObjList As New List(Of DocumentosClass)

        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")

        ObjList = SQL.SearchDocument_People(Obj)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))
    End Sub

    ''' <summary>
    ''' TRAE TODOS LOS REGISTROS DE INGRESO DE LA PERSONA CONSULTADA
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub List_Registro_Ingreso()

        Dim SQL As New ControlAccesoSQLClass
        Dim Obj As New ControlAccesoClass
        Dim ObjList As New List(Of ControlAccesoClass)

        Obj.Nit_ID = Request.Form("NIT")
        Obj.TypeDocument_ID = Request.Form("TD")
        Obj.Document_ID = Request.Form("D")

        ObjList = SQL.List_Registros_Ingreso(Obj)

        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

#End Region

End Class
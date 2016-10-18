Imports Newtonsoft.Json

Public Class R_Persona_TarjetaAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "MATRIX_TARJETA"
                    Cargar_MatrixTarjeta()

                Case "MATRIX_PERSONA"
                    CargarMPersonaDep()

                Case "Cliente"
                    CargarCliente()

                Case "crear"
                    InsertR_Persona_Tarjeta()

            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' funcion que inserta en la tabla R_Persona_Tarjeta (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertR_Persona_Tarjeta()

        Dim objR_Persona_Tarjeta As New R_Persona_TarjetaClass
        Dim SQL_R_Persona_Tarjeta As New R_Persona_TarjetaSQLClass
        Dim ObjListR_Persona_Tarjeta As New List(Of R_Persona_TarjetaClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objR_Persona_Tarjeta.Nit_ID = Request.Form("Nit_ID_Asig")
        objR_Persona_Tarjeta.TypeDocument_ID = Request.Form("TDoc")
        objR_Persona_Tarjeta.Document_ID = Request.Form("Doc")
        objR_Persona_Tarjeta.Tarjeta_ID = Request.Form("Tarjeta")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_R_Persona_Tarjeta.Consulta_Repetido(objR_Persona_Tarjeta)

        If vl_s_IDxiste = 0 Then

            objR_Persona_Tarjeta.UsuarioCreacion = Request.Form("user")
            objR_Persona_Tarjeta.FechaCreacion = Date.Now
            objR_Persona_Tarjeta.UsuarioActualizacion = Request.Form("user")
            objR_Persona_Tarjeta.FechaActualizacion = Date.Now

            ObjListR_Persona_Tarjeta.Add(objR_Persona_Tarjeta)

            result = SQL_R_Persona_Tarjeta.InsertR_Persona_Tarjeta(objR_Persona_Tarjeta)

            'ACTUALIZAMOS NIVENTARIO DE TARJETA
            Dim SQLInvPuerta As New InvPuertaSQLClass
            Dim ObjListInvPuerta As New List(Of InvPuertaClass)
            Dim ObjInvPuerta As New InvPuertaClass

            ObjInvPuerta.Nit_ID = Request.Form("Nit_ID")
            ObjInvPuerta.Tarjeta_ID = Request.Form("Tarjeta")
            ObjInvPuerta.Estado = 1

            ObjInvPuerta.Nit_ID_Asigna = Request.Form("Nit_ID_Asig")
            ObjInvPuerta.TypeDocument_ID_Asigna = Request.Form("TDoc")
            ObjInvPuerta.Document_ID_Asigna = Request.Form("Doc")
            ObjInvPuerta.FechaAsignacion = Date.Now

            ObjInvPuerta.UsuarioActualizacion = Request.Form("user")
            ObjInvPuerta.FechaActualizacion = Date.Now

            ObjListInvPuerta.Add(ObjInvPuerta)

            result = SQLInvPuerta.UpdateAsignacionTarjeta(ObjInvPuerta)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub


#End Region

#Region "DROP LIST"

    ''' <summary>
    ''' funcion que carga  Matrix PERSONAS 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMPersonaDep()

        Dim SQL As New ClienteSQLClass
        Dim ObjList As New List(Of ClienteClass)

        ObjList = SQL.Matrix_PersonasDep()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Cargar_MatrixTarjeta()

        Dim SQL As New InvPuertaSQLClass
        Dim ObjList As New List(Of InvPuertaClass)

        ObjList = SQL.MatrixTarjeta()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

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
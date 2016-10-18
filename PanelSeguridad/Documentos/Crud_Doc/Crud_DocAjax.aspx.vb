Imports Newtonsoft.Json
Imports System.Data
Imports System.Data.SqlClient
Imports System.Web.Script.Serialization
Imports System.IO


Public Class Crud_DocAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

        Dim Doc As New DocumentosClass
        If Request.Files.Count() > 0 Then
            Dim vl_S_RutaTemporal As String = Request.Form("RutaTemporal")
            Dim vl_S_NombreDoc As String = Request.Form("NameTemporal")
            Dim NameDocument As String = Doc.UpLoad_Document(Request.Files, vl_S_RutaTemporal, vl_S_NombreDoc)

            If NameDocument <> "" Then

                Dim AFileDoc = Split(NameDocument, "|")
                Dim ADoc = Split(AFileDoc(0), ".")
                Dim vl_S_NameFormat As String = ADoc(0).Replace(" ", "")
                vl_S_NameFormat = vl_S_NameFormat.Replace("_", "")
                Dim NewNameDoc = AFileDoc(1).Replace("TEMP", UCase(vl_S_NameFormat))

                Doc.Rename_doc(vl_S_RutaTemporal, NewNameDoc, vl_S_NombreDoc)
                Response.Write(NewNameDoc)
            End If

            Exit Sub
        End If

        If Request.Form("action") <> Nothing Then
            'aterrizamos las opciones del proceso
            Dim vl_S_option_login As String = Request.Form("action")

            Select Case vl_S_option_login

                Case "RUTAS_OPERACION"
                    CargarRutasOp()

                Case "Copiar_Doc"
                    CopiaDoc_Origen()

                Case "Update_Consecutivo"
                    UpdateConsecutivo()

                Case "MATRIX_CONSECUTIVOS"
                    CargarMConsecutivos()

                Case "MATRIX_CLIENTE_DEP"
                    CargarMPersonaDep()

                Case "MATRIX_CONTRATO"
                    CargarMContrato()

                Case "MATRIX_SECUENCIA"
                    CargarMSecuencia()

                Case "MATRIX_DOCUMENTO"
                    CargarMDocumento()

                Case "cargar_droplist_busqueda"
                    CargarDroplist()

                Case "Cliente"
                    CargarCliente()

                Case "Formato"
                    CargarFormato()

                Case "consulta"
                    Consulta_Crud_Doc()

               Case "Create_DocExist"
                    InsertDocExits()

                Case "Create_DocAsociados"
                    InsertDocAsociados()

                Case "modificar"
                    UpdateCrud_Doc()

                Case "elimina"
                    EraseCrud_Doc()
            End Select

        End If
    End Sub

#Region "CRUD"

    ''' <summary>
    ''' traemos todos los datos para tabla Crud_Doc (READ)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub Consulta_Crud_Doc()

        Dim SQL_Crud_Doc As New Crud_DocSQLClass
        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)


        Dim vl_S_filtro As String = Request.Form("filtro")
        Dim vl_S_opcion As String = Request.Form("opcion")
        Dim vl_S_contenido As String = Request.Form("contenido")

        ObjListCrud_Doc = SQL_Crud_Doc.Read_AllCrud_Doc(vl_S_filtro, vl_S_opcion, vl_S_contenido)

        If ObjListCrud_Doc Is Nothing Then

            Dim objCrud_Doc As New Crud_DocClass
            ObjListCrud_Doc = New List(Of Crud_DocClass)

            objCrud_Doc.Descripcion = ""
            objCrud_Doc.FechaActualizacion = ""
            objCrud_Doc.UsuarioCreacion = ""

            ObjListCrud_Doc.Add(objCrud_Doc)
        End If

        Response.Write(JsonConvert.SerializeObject(ObjListCrud_Doc.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla DocumentosExistentes (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertDocExits()

        Dim obj As New DocumentosExistentesClass
        Dim SQL As New DocumentosExistentesSQLClass
        Dim ObjList As New List(Of DocumentosExistentesClass)

        Dim result As String

        obj.Nit_ID = Request.Form("Nit_ID")
        obj.Secuencia_ID = Request.Form("Secuencia")
        obj.Documento_ID = Request.Form("Documento_ID")
         Dim ANombreSave = Split(Request.Form("Nombre_Save"), ".")
        obj.Nombre_Save = ANombreSave(0)
        obj.RutaDocumento = Request.Form("Ruta")
        obj.Formato = Request.Form("Formato")
        obj.Indicativo = Request.Form("IndicativoFoto")
        obj.Verificado = Request.Form("RequiereVerif")
        obj.Observaciones_Captura = Request.Form("ObserCaptura")
        obj.Fecha_Inicio_Vigencia = Request.Form("FechaVigencia")
        obj.Fecha_Vencimiento = Request.Form("FechaVencimiento")
        obj.Dias_Vigencia = Request.Form("DiasVigencia")
        obj.UsuarioCreacion = Request.Form("user")
        obj.FechaCreacion = Date.Now
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL.InsertDocumentosExistentes(obj)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla DocumentosExistentes (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertDocAsociados()

        Dim obj As New AsociacionDocumentosClass
        Dim SQL As New AsociacionDocumentosSQLClass
        Dim ObjList As New List(Of AsociacionDocumentosClass)

        Dim result As String

        obj.Nit_ID = Request.Form("Nit_ID")
        obj.TypeDocument_ID = Request.Form("TDoc")
        obj.Document_ID = Request.Form("Doc")
        obj.Secuencia_Doc = Request.Form("Secuencia_doc")
        obj.Secuencia_ID = Request.Form("Secuencia_ID")
        obj.Contrato_ID = Request.Form("Contrato")
        obj.Ref_1 = Request.Form("Activos")
        obj.Factura_ID = Request.Form("Facturas")
        obj.UsuarioCreacion = Request.Form("user")
        obj.FechaCreacion = Date.Now
        obj.UsuarioActualizacion = Request.Form("user")
        obj.FechaActualizacion = Date.Now

        ObjList.Add(obj)

        result = SQL.InsertDocumentosAsociados(obj)

        Response.Write(result)



    End Sub

    ''' <summary>
    ''' funcion que inserta en la tabla Crud_Doc (INSERT)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub InsertCrud_Doc()

        Dim objCrud_Doc As New Crud_DocClass
        Dim SQL_Crud_Doc As New Crud_DocSQLClass
        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)

        Dim result As String
        Dim vl_s_IDxiste As String

        objCrud_Doc.Nit_ID = Request.Form("Nit_ID")
        objCrud_Doc.Crud_Doc_ID = Request.Form("ID")

        'validamos si la llave existe
        vl_s_IDxiste = SQL_Crud_Doc.Consulta_Repetido(objCrud_Doc)

        If vl_s_IDxiste = 0 Then

            objCrud_Doc.Descripcion = Request.Form("descripcion")

            objCrud_Doc.ChequeaVigencias = Request.Form("C_Vigencia")
            objCrud_Doc.DiasVigencia = Request.Form("D_Vigencia")
            objCrud_Doc.TipoContenido = Request.Form("TContenido")
            objCrud_Doc.Formato_ID = Request.Form("Formato")
            objCrud_Doc.TipoVersion = Request.Form("TVersion")
            objCrud_Doc.Ruta_ID = Request.Form("RutaCrud_Doc")
            objCrud_Doc.Ruta_ID_Plantilla = Request.Form("RutaPlantilla")
            objCrud_Doc.NombrePlantilla = Request.Form("NamePlanilla")
            objCrud_Doc.RequiereVerificacion = Request.Form("CheckVerificacion")
            objCrud_Doc.IndicativoFoto = Request.Form("Foto")

            objCrud_Doc.UsuarioCreacion = Request.Form("user")
            objCrud_Doc.FechaCreacion = Date.Now
            objCrud_Doc.UsuarioActualizacion = Request.Form("user")
            objCrud_Doc.FechaActualizacion = Date.Now

            ObjListCrud_Doc.Add(objCrud_Doc)

            result = SQL_Crud_Doc.InsertCrud_Doc(objCrud_Doc)

            Response.Write(result)
        Else
            result = "Existe"
            Response.Write(result)
        End If

    End Sub

    ''' <summary>
    ''' funcion que actualiza en la tabla Crud_Doc (UPDATE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateCrud_Doc()

        Dim objCrud_Doc As New Crud_DocClass
        Dim SQL_Crud_Doc As New Crud_DocSQLClass
        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)

        Dim result As String

        objCrud_Doc.Nit_ID = Request.Form("Nit_ID")
        objCrud_Doc.Crud_Doc_ID = Request.Form("ID")
        objCrud_Doc.Descripcion = Request.Form("descripcion")

        objCrud_Doc.ChequeaVigencias = Request.Form("C_Vigencia")
        objCrud_Doc.DiasVigencia = Request.Form("D_Vigencia")
        objCrud_Doc.TipoContenido = Request.Form("TContenido")
        objCrud_Doc.Formato_ID = Request.Form("Formato")
        objCrud_Doc.TipoVersion = Request.Form("TVersion")
        objCrud_Doc.Ruta_ID = Request.Form("RutaCrud_Doc")
        objCrud_Doc.Ruta_ID_Plantilla = Request.Form("RutaPlantilla")
        objCrud_Doc.NombrePlantilla = Request.Form("NamePlanilla")
        objCrud_Doc.RequiereVerificacion = Request.Form("CheckVerificacion")
        objCrud_Doc.IndicativoFoto = Request.Form("Foto")

        objCrud_Doc.UsuarioActualizacion = Request.Form("user")
        objCrud_Doc.FechaActualizacion = Date.Now

        ObjListCrud_Doc.Add(objCrud_Doc)

        result = SQL_Crud_Doc.UpdateCrud_Doc(objCrud_Doc)

        Response.Write(result)

    End Sub

    ''' <summary>
    ''' funcion que elimina en la tabla Crud_Doc (DELETE)
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub EraseCrud_Doc()

        Dim objCrud_Doc As New Crud_DocClass
        Dim SQL_Crud_Doc As New Crud_DocSQLClass
        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)

        Dim result As String

        objCrud_Doc.Nit_ID = Request.Form("Nit_ID")
        objCrud_Doc.Crud_Doc_ID = Request.Form("ID")
        ObjListCrud_Doc.Add(objCrud_Doc)

        result = SQL_Crud_Doc.EraseCrud_Doc(objCrud_Doc)
        Response.Write(result)
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
    ''' funcion que carga  rutas operacion
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarRutasOp()
        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.RutasOpe()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  Matrix consecutivos 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMConsecutivos()

        Dim SQL As New ConsecutivosSQLClass
        Dim ObjList As New List(Of ConsecutivosClass)

        ObjList = SQL.MatrixConcecutivo()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  Matrix secuencia 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMSecuencia()

        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.Matrix_SecuenciaPadre()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  Matrix contrato
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMContrato()

        Dim SQL As New C_ContratoSQLClass
        Dim ObjList As New List(Of C_ContratoClass)

        ObjList = SQL.Matrix_Contratos()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga  Matrix contrato
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarMDocumento()

        Dim SQL As New DocumentoSQLClass
        Dim ObjList As New List(Of DocumentoClass)

        ObjList = SQL.Matrix_Documento()
        Response.Write(JsonConvert.SerializeObject(ObjList.ToArray()))

    End Sub

    ''' <summary>
    ''' funcion que carga el objeto DDL Links
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarDroplist()

        Dim SQL_Crud_Doc As New Crud_DocSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL_Crud_Doc.ReadCharge_DropList(vl_S_Tabla)
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

    ''' <summary>
    ''' funcion que carga el objeto DDL consulta
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CargarFormato()

        Dim SQL As New Crud_DocSQLClass
        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim vl_S_Tabla As String = Request.Form("tabla")

        ObjListDroplist = SQL.Charge_DropListFormato(vl_S_Tabla)
        Response.Write(JsonConvert.SerializeObject(ObjListDroplist.ToArray()))

    End Sub

#End Region

#Region "FUNCIONES"

    ''' <summary>
    ''' copia de carpeta temporal a carpeta de origen
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub CopiaDoc_Origen()

        Dim Doc As New DocumentosClass

        Dim vl_S_RutaDestino As String = Request.Form("RutaDestino")
        Dim vl_S_RutaOrigen As String = Request.Form("RutaTemporal")
        Dim vl_S_Doc_Name As String = Request.Form("Doc_name")
        Dim vl_S_Doc_Name_Final As String = Request.Form("NameDoc_Final")

        Dim Copia As Integer = Doc.Copy_Document_Folder_View(vl_S_RutaOrigen, vl_S_RutaDestino, vl_S_Doc_Name, vl_S_Doc_Name_Final, "CREATE")

        Response.Write(Copia)

    End Sub

    ''' <summary>
    ''' ACTUALIZA EL CONSECUTIVO DEL LA EMPRESA 
    ''' </summary>
    ''' <remarks></remarks>
    Protected Sub UpdateConsecutivo()

        Dim Conse As New ConsecutivosSQLClass
        Dim Obj As New ConsecutivosClass

        Obj.Consecutivo_ID = Request.Form("Consecutivo")
        Obj.Nit_ID = Request.Form("Nit_ID")

        Dim result As String = Conse.UpdateConsecutivo(Obj)

        Response.Write(result)

    End Sub

#End Region

End Class
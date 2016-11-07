Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class DocumentosSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Releciones Financieras parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_All(ByVal vp_S_Nit As String, ByVal vp_S_TypeDoc As String, ByVal vp_S_Doc As String)

        Dim ObjList As New List(Of DocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT CD_Nit_ID," & _
                   "       CD_TypeDocument_ID, " & _
                   "       CD_Document_ID, " & _
                   "       CD_Secuencia_ID, " & _
                   "       DE_Documento_ID, " & _
                   "       DE_RutaDocumento, " & _
                   "       DE_Formato, " & _
                   "       DE_Trama, " & _
                   "       DE_Usuario_Creacion, " & _
                   "       DE_FechaCreacion, " & _
                   "       DE_Usuario_Actualizacion, " & _
                   "       DE_FechaActualizacion, " & _
                   "       D.DOC_Descripcion, " & _
                   "       D1.DDLL_Descripcion  " & _
                   " FROM DOCUMENTOS_CLIENTE DC" & _
                   " INNER JOIN " & BD_Documentos & ".dbo.DOCUMENTOS_EXISTENTES DE ON DE.DE_Secuencia_ID = DC.CD_Secuencia_ID " & _
                   " INNER JOIN " & BD_Documentos & ".dbo.DOCUMENTOS D ON D.DOC_Documentos_ID =DE.DE_Documento_ID " & _
                   " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                  " WHERE CD_Nit_ID = '" & vp_S_Nit & "' " & _
                   " AND CD_TypeDocument_ID = '" & vp_S_TypeDoc & "' " & _
                   " AND CD_Document_ID = '" & vp_S_Doc & "' ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion, "R")

        Return ObjList

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Releciones Financieras para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_TypeCosult As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of DocumentosClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_TypeCosult

            Case "R"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentosClass
                    'cargamos datos sobre el objeto de login
              
                End While

            Case "F"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentosClass
                    'cargamos datos sobre el objeto de login
                  
                    obj.RutaDocumento = ReadConsulta.GetValue(0)
                    obj.Formato = ReadConsulta.GetValue(1)
                    obj.Nombre_Save = ReadConsulta.GetValue(2)
                    obj.DescripFormato = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While

            Case "MatrixDocWork"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim obj As New DocumentosClass
                    'cargamos datos sobre el objeto de login

                    If Not (IsDBNull(ReadConsulta.GetValue(0))) Then obj.Secuencia_ID = ReadConsulta.GetValue(0) Else obj.Secuencia_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then obj.Documento_ID = ReadConsulta.GetValue(1) Else obj.Documento_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then obj.Nombre_Save = ReadConsulta.GetValue(2) Else obj.Nombre_Save = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then obj.RutaDocumento = ReadConsulta.GetValue(3) Else obj.RutaDocumento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(4))) Then obj.Formato = ReadConsulta.GetValue(4) Else obj.Formato = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(5))) Then obj.Trama = ReadConsulta.GetValue(5) Else obj.Trama = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then obj.Indicativo = ReadConsulta.GetValue(6) Else obj.Indicativo = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then obj.Verificado = ReadConsulta.GetValue(7) Else obj.Verificado = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then obj.Usuario_Verifico = ReadConsulta.GetValue(8) Else obj.Usuario_Verifico = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then obj.Fecha_Verifico = ReadConsulta.GetValue(9) Else obj.Fecha_Vencimiento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then obj.Observaciones_Captura = ReadConsulta.GetValue(10) Else obj.Observaciones_Captura = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(11))) Then obj.Observaciones_Validacion = ReadConsulta.GetValue(11) Else obj.Observaciones_Validacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(12))) Then obj.Fecha_Vencimiento = ReadConsulta.GetValue(12) Else obj.Fecha_Vencimiento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(13))) Then obj.Fecha_Inicio_Vigencia = ReadConsulta.GetValue(13) Else obj.Fecha_Inicio_Vigencia = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then obj.Dias_Vigencia = ReadConsulta.GetValue(14) Else obj.Dias_Vigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then obj.Nit_ID = ReadConsulta.GetValue(15) Else obj.Nit_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then obj.TypeDocument_ID = ReadConsulta.GetValue(16) Else obj.TypeDocument_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then obj.Document_ID = ReadConsulta.GetValue(17) Else obj.Document_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then obj.Contrato_ID = ReadConsulta.GetValue(18) Else obj.Contrato_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then obj.Ref_1 = ReadConsulta.GetValue(19) Else obj.Ref_1 = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then obj.Factura_ID = ReadConsulta.GetValue(20) Else obj.Factura_ID = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then obj.Descripcion = ReadConsulta.GetValue(21) Else obj.Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(22))) Then obj.TipoContenido = ReadConsulta.GetValue(22) Else obj.TipoContenido = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(23))) Then obj.TipoVersion = ReadConsulta.GetValue(23) Else obj.TipoVersion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(24))) Then obj.Ruta_ID_Plantilla = ReadConsulta.GetValue(24) Else obj.Ruta_ID_Plantilla = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(25))) Then obj.NombrePlantilla = ReadConsulta.GetValue(25) Else obj.NombrePlantilla = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(26))) Then obj.ChequeaVigencias = ReadConsulta.GetValue(26) Else obj.ChequeaVigencias = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(27))) Then obj.Dias_Vigencia = ReadConsulta.GetValue(27) Else obj.Dias_Vigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(28))) Then obj.RequiereVerificacion = ReadConsulta.GetValue(28) Else obj.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(29))) Then obj.DescripFormato = ReadConsulta.GetValue(29) Else obj.DescripFormato = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(30))) Then obj.DescripContenido = ReadConsulta.GetValue(30) Else obj.DescripContenido = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(31))) Then obj.DescripVersion = ReadConsulta.GetValue(31) Else obj.DescripVersion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(32))) Then obj.UsuarioCreacion = ReadConsulta.GetValue(32) Else obj.UsuarioCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(33))) Then obj.FechaCreacion = ReadConsulta.GetValue(33) Else obj.FechaCreacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(34))) Then obj.UsuarioActualizacion = ReadConsulta.GetValue(34) Else obj.UsuarioActualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(35))) Then obj.FechaActualizacion = ReadConsulta.GetValue(35) Else obj.FechaActualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(36))) Then obj.RutaRelativaDocumento = ReadConsulta.GetValue(36) Else obj.RutaRelativaDocumento = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(37))) Then obj.RutaDocumentoTemporal = ReadConsulta.GetValue(37) Else obj.RutaDocumentoTemporal = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(38))) Then obj.RutaDocumentoVisualizacion = ReadConsulta.GetValue(38) Else obj.RutaDocumentoVisualizacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(39))) Then obj.DescripVerificacion = ReadConsulta.GetValue(39) Else obj.DescripVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(40))) Then obj.DescripEmpresa = ReadConsulta.GetValue(40) Else obj.DescripEmpresa = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(41))) Then obj.Consecutivo = ReadConsulta.GetValue(41) Else obj.Consecutivo = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(42))) Then obj.Secuencia_Doc = ReadConsulta.GetValue(42) Else obj.Secuencia_Doc = 0
                    'if Not (IsDBNull(ReadConsulta.GetValue(43))) Then obj.DescripEmpresa = ReadConsulta.GetValue(43) Else obj.DescripEmpresa = ""

                    Dim StrArchivo As String = obj.Nombre_Save & "." & obj.DescripFormato

                    obj.Copy_Document_Folder_View(obj.RutaDocumento, obj.RutaDocumentoVisualizacion, StrArchivo, "", "READ")

                    'agregamos a la lista
                    ObjList.Add(obj)
                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' creala consulta para la tabla documentos para averiguar si tiene foto
    ''' </summary>
    ''' <param name="vp_S_Nit"></param>
    ''' <param name="vp_S_TypeDoc"></param>
    ''' <param name="vp_S_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ExistFoto(ByVal vp_S_Nit As String, ByVal vp_S_TypeDoc As String, ByVal vp_S_Doc As String)

        Dim ObjList As New List(Of DocumentosClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Documentos As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append(" SELECT DE_RutaDocumento," & _
                                   "       DE_Formato, " & _
                                   "       DE.DE_Nombre_Save, " & _
                                   "       D1.DDLL_Descripcion   " & _
                                   " FROM DOCUMENTOS_EXISTENTES DE " & _
                                   " INNER JOIN ASOCIACION_DOCUMENTOS AD ON AD.A_Secuencia_ID = DE.DE_Secuencia_ID  AND DE.DE_Nit_ID =AD.A_Nit_ID " & _
                                   " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                                  " WHERE A_Nit_ID = '" & vp_S_Nit & "' " & _
                                   " AND A_TypeDocument_ID = '" & vp_S_TypeDoc & "' " & _
                                   " AND A_Document_ID = '" & vp_S_Doc & "' AND DE_IndicativoFoto = 'S' ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion, "F")

        Return ObjList

    End Function

    ''' <summary>
    ''' carga matrix de trabajo documentos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixDocumentWork()

        Dim ObjList As New List(Of DocumentosClass)
        Dim sql As New StringBuilder()
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")
        Dim StrQuery As String = ""

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        sql.Append(" SELECT DE_Secuencia_ID, " & _
                                                " DE_Documento_ID, " & _
                                                " DE_Nombre_Save, " & _
                                                " DE_RutaDocumento, " & _
                                                " DE_Formato, " & _
                                                " DE_Trama, " & _
                                                " DE_IndicativoFoto, " & _
                                                " DE_Verificado, " & _
                                                " DE_Usuario_Verifico, " & _
                                                " DE_Fecha_Verifico," & _
                                                " DE_Observaciones_Captura, " & _
                                                " DE_Observaciones_Validacion, " & _
                                                " DE_Fecha_Vencimiento, " & _
                                                " DE_Fecha_Inicio_Vigencia," & _
                                                " DE_Dias_Vigencia, " & _
                                                " A_Nit_ID, " & _
                                                " A_TypeDocument_ID, " & _
                                                " A_Document_ID, " & _
                                                " A_Contrato_ID, " & _
                                                " A_Ref_1, " & _
                                                " A_Factura_ID, " & _
                                                " DOC_Descripcion, " & _
                                                " DOC_TipoContenido, " & _
                                                " DOC_TipoVersion, " & _
                                                " DOC_Ruta_ID_Plantilla, " & _
                                                " DOC_NombrePlantilla, " & _
                                                " DOC_ChequeaVigencias, " & _
                                                " DOC_DiasVigencia, " & _
                                                " DOC_RequiereVerificacion, " & _
                                                " D1.DDLL_Descripcion, " & _
                                                " D2.DDLL_Descripcion, " & _
                                                " D3.DDLL_Descripcion, " & _
                                                " DE_Usuario_Creacion, " & _
                                                " DE_FechaCreacion, " & _
                                                " DE_Usuario_Actualizacion, " & _
                                                " DE_FechaActualizacion, " & _
                                                " R.TR_Ruta_Relativa," & _
                                                " R.TR_Ruta_Temporal, " & _
                                               "  R.TR_Ruta_Visualizacion, " & _
                                                " D4.DDLL_Descripcion, " & _
                                                " C.CLI_Nombre + ' ' + C.CLI_Nombre_2  + ' ' +C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2 AS Nombre, " & _
                                                " C.CLI_N_Consecutivo, " & _
                                                " A_Secuencia_Doc " & _
                                 " FROM DOCUMENTOS_EXISTENTES DE " & _
                                " INNER JOIN ASOCIACION_DOCUMENTOS AD ON AD.A_Secuencia_ID = DE.DE_Secuencia_ID AND DE.DE_Nit_ID =AD.A_Nit_ID " & _
                                " LEFT JOIN DOCUMENTOS D ON D.DOC_Documentos_ID = DE.DE_Documento_ID " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D1 ON D1.DDL_ID = DE.DE_Formato AND D1.DDL_Tabla = 'DOCUMENTOS' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D2 ON D2.DDL_ID = D.DOC_TipoContenido AND D2.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D3 ON D3.DDL_ID = D.DOC_TipoVersion AND D3.DDL_Tabla = 'TIPO_VERSION' " & _
                                " LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO D4 ON D4.DDL_ID = DE.DE_Verificado AND D4.DDL_Tabla = 'VERIFICACION' " & _
                                " LEFT JOIN RUTAS_OPERACION R ON R.TR_Ruta_Temporal <> DE.DE_RutaDocumento " & _
                                " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = AD.A_Document_ID AND DE.DE_Nit_ID = C.CLI_Nit_ID " & _
                                " ORDER BY DE_Secuencia_ID ASC  ")

        StrQuery = sql.ToString

        ObjList = list(StrQuery, Conexion, "MatrixDocWork")

        Return ObjList
    End Function

#End Region

End Class

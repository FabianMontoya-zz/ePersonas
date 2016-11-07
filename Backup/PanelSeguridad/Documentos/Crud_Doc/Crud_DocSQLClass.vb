Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Crud_DocSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Crud_Doc parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllCrud_Doc(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Crud_Docs_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Crud_Docs_ID ASC) AS Index_Crud_Doc " & _
                        "  FROM Crud_DocS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'Crud_DocS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Crud_Docs_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Crud_Docs_ID ASC) AS Index_Crud_Doc " & _
                        "  FROM Crud_DocS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'Crud_DocS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID))")
            Else
                sql.Append(" SELECT DOC_Nit_ID, " & _
                        "       DOC_Crud_Docs_ID, " & _
                        "       DOC_Descripcion, " & _
                        "       DOC_TipoContenido, " & _
                        "       DOC_Formato, " & _
                        "       DOC_TipoVersion, " & _
                        "       DOC_Ruta_ID, " & _
                        "       DOC_IndicativoFoto, " & _
                        "       DOC_Ruta_ID_Plantilla, " & _
                        "       DOC_NombrePlantilla, " & _
                        "       DOC_Usuario_Creacion, " & _
                        "       DOC_FechaCreacion, " & _
                        "       DOC_Usuario_Actualizacion, " & _
                        "       DOC_FechaActualizacion, " & _
                        "       DOC_ChequeaVigencias, " & _
                        "       DOC_DiasVigencia, " & _
                        "       DOC_RequiereVerificacion, " & _
                        "       TC.DDLL_Descripcion, " & _
                        "       F.DDLL_Descripcion, " & _
                        "       TV.DDLL_Descripcion, " & _
                        "       R.R_Descripcion, " & _
                        "       RP.R_Descripcion, " & _
                        "       C.CLI_Nombre ," & _
                        "       ROW_NUMBER() OVER(ORDER BY DOC_Crud_Docs_ID ASC) AS Index_Crud_Doc " & _
                        "  FROM Crud_DocS D " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TC ON TC.DDL_ID = D.DOC_TipoContenido AND TC.DDL_Tabla = 'TIPO_CONTENIDO' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO F ON F.DDL_ID = D.DOC_Formato AND F.DDL_Tabla = 'Crud_DocS' " & _
                        "  LEFT JOIN " & BD_Admin & ".dbo.TC_DDL_TIPO TV ON TV.DDL_ID = D.DOC_TipoVersion AND TV.DDL_Tabla = 'TIPO_VERSION' " & _
                        "  INNER JOIN RUTA R ON R.R_Ruta_ID =D.DOC_Ruta_ID AND R.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  LEFT JOIN RUTA RP ON RP.R_Ruta_ID =D.DOC_Ruta_ID_Plantilla AND RP.R_Nit_ID = D.DOC_Nit_ID " & _
                        "  INNER JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Document_ID = SUBSTRING(D.DOC_Nit_ID,0,LEN(D.DOC_Nit_ID)) " & _
                           " WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListCrud_Doc = listCrud_Doc(StrQuery, Conexion, "List")

        Return ObjListCrud_Doc

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Crud_Doc (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Crud_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertCrud_Doc(ByVal vp_Obj_Crud_Doc As Crud_DocClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT Crud_DocS (" & _
            "DOC_Nit_ID," & _
            "DOC_Crud_Docs_ID," & _
            "DOC_Descripcion," & _
            "DOC_TipoContenido," & _
            "DOC_Formato," & _
            "DOC_TipoVersion," & _
            "DOC_Ruta_ID," & _
            "DOC_IndicativoFoto," & _
            "DOC_Ruta_ID_Plantilla," & _
            "DOC_NombrePlantilla," & _
            "DOC_ChequeaVigencias," & _
            "DOC_DiasVigencia," & _
            "DOC_RequiereVerificacion," & _
            "DOC_Usuario_Creacion," & _
            "DOC_FechaCreacion," & _
            "DOC_Usuario_Actualizacion," & _
            "DOC_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Crud_Doc_ID & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.TipoContenido & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Formato_ID & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.TipoVersion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Ruta_ID & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.IndicativoFoto & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.Ruta_ID_Plantilla & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.NombrePlantilla & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.ChequeaVigencias & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.DiasVigencia & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.RequiereVerificacion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Crud_Doc.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Crud_Doc (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Crud_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateCrud_Doc(ByVal vp_Obj_Crud_Doc As Crud_DocClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE Crud_DocS SET " & _
                       " DOC_Descripcion ='" & vp_Obj_Crud_Doc.Descripcion & "', " & _
                       " DOC_TipoContenido ='" & vp_Obj_Crud_Doc.TipoContenido & "', " & _
                       " DOC_Formato ='" & vp_Obj_Crud_Doc.Formato_ID & "', " & _
                       " DOC_TipoVersion ='" & vp_Obj_Crud_Doc.TipoVersion & "', " & _
                       " DOC_Ruta_ID ='" & vp_Obj_Crud_Doc.Ruta_ID & "', " & _
                       " DOC_IndicativoFoto ='" & vp_Obj_Crud_Doc.IndicativoFoto & "', " & _
                       " DOC_Ruta_ID_Plantilla ='" & vp_Obj_Crud_Doc.Ruta_ID_Plantilla & "', " & _
                       " DOC_NombrePlantilla ='" & vp_Obj_Crud_Doc.NombrePlantilla & "', " & _
                       " DOC_ChequeaVigencias ='" & vp_Obj_Crud_Doc.ChequeaVigencias & "', " & _
                       " DOC_DiasVigencia ='" & vp_Obj_Crud_Doc.DiasVigencia & "', " & _
                       " DOC_RequiereVerificacion ='" & vp_Obj_Crud_Doc.RequiereVerificacion & "', " & _
                       " DOC_Usuario_Actualizacion ='" & vp_Obj_Crud_Doc.UsuarioActualizacion & "', " & _
                       " DOC_FechaActualizacion ='" & vp_Obj_Crud_Doc.FechaActualizacion & "' " & _
                       " WHERE  DOC_Nit_ID = '" & vp_Obj_Crud_Doc.Nit_ID & "' AND DOC_Crud_Docs_ID = '" & vp_Obj_Crud_Doc.Crud_Doc_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Crud_Doc (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Crud_Doc"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseCrud_Doc(ByVal vp_Obj_Crud_Doc As Crud_DocClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE Crud_DocS WHERE DOC_Nit_ID = '" & vp_Obj_Crud_Doc.Nit_ID & "' AND DOC_Crud_Docs_ID = '" & vp_Obj_Crud_Doc.Crud_Doc_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "3")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListCrud_DocDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Crud_Doc_ID AS ID,CAST(A_Crud_Doc_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM Crud_Doc " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListFormato(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'Crud_DocS' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Crud_Doc para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCrud_Doc(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCrud_Doc As New Crud_DocClass
                    'cargamos datos sobre el objeto de login
                    objCrud_Doc.Nit_ID = ReadConsulta.GetValue(0)
                    objCrud_Doc.Crud_Doc_ID = ReadConsulta.GetValue(1)
                    objCrud_Doc.Descripcion = ReadConsulta.GetValue(2)

                    objCrud_Doc.TipoContenido = ReadConsulta.GetValue(3)
                    objCrud_Doc.Formato_ID = ReadConsulta.GetValue(4)
                    objCrud_Doc.TipoVersion = ReadConsulta.GetValue(5)
                    objCrud_Doc.Ruta_ID = ReadConsulta.GetValue(6)
                    objCrud_Doc.IndicativoFoto = ReadConsulta.GetValue(7)
                    objCrud_Doc.Ruta_ID_Plantilla = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objCrud_Doc.NombrePlantilla = ReadConsulta.GetValue(9) Else objCrud_Doc.NombrePlantilla = ""

                    objCrud_Doc.UsuarioCreacion = ReadConsulta.GetValue(10)
                    objCrud_Doc.FechaCreacion = ReadConsulta.GetValue(11)
                    objCrud_Doc.UsuarioActualizacion = ReadConsulta.GetValue(12)
                    objCrud_Doc.FechaActualizacion = ReadConsulta.GetValue(13)

                    If Not (IsDBNull(ReadConsulta.GetValue(14))) Then objCrud_Doc.ChequeaVigencias = ReadConsulta.GetValue(14) Else objCrud_Doc.ChequeaVigencias = "N"
                    If Not (IsDBNull(ReadConsulta.GetValue(15))) Then objCrud_Doc.DiasVigencia = ReadConsulta.GetValue(15) Else objCrud_Doc.DiasVigencia = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(16))) Then objCrud_Doc.RequiereVerificacion = ReadConsulta.GetValue(16) Else objCrud_Doc.RequiereVerificacion = "N"

                    If Not (IsDBNull(ReadConsulta.GetValue(17))) Then objCrud_Doc.DescripContenido = ReadConsulta.GetValue(17) Else objCrud_Doc.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(18))) Then objCrud_Doc.DescripFormato = ReadConsulta.GetValue(18) Else objCrud_Doc.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(19))) Then objCrud_Doc.DescripVersion = ReadConsulta.GetValue(19) Else objCrud_Doc.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(20))) Then objCrud_Doc.DescripRuta = ReadConsulta.GetValue(20) Else objCrud_Doc.RequiereVerificacion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(21))) Then objCrud_Doc.DescripRutaPlantilla = ReadConsulta.GetValue(21) Else objCrud_Doc.RequiereVerificacion = ""

                    objCrud_Doc.DescripEmpresa = ReadConsulta.GetValue(22)
                    objCrud_Doc.Index = ReadConsulta.GetValue(23)

                    'agregamos a la lista
                    ObjListCrud_Doc.Add(objCrud_Doc)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objCrud_Doc As New Crud_DocClass
                    'cargamos datos sobre el objeto de login
                    objCrud_Doc.Crud_Doc_ID = ReadConsulta.GetValue(0)
                    objCrud_Doc.Descripcion = ReadConsulta.GetValue(1)
                    objCrud_Doc.Nit_ID = ReadConsulta.GetValue(2)

                    'agregamos a la lista
                    ObjListCrud_Doc.Add(objCrud_Doc)

                End While

        End Select


        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCrud_Doc

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Crud_DocClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM Crud_DocS " & _
                       " WHERE DOC_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND DOC_Crud_Docs_ID = '" & vp_O_Obj.Crud_Doc_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "3")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de Crud_Docs
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Crud_Doc()

        Dim ObjListCrud_Doc As New List(Of Crud_DocClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("3")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT DOC_Crud_Docs_ID AS ID, CAST(DOC_Crud_Docs_ID AS NVARCHAR(10)) + ' - ' + DOC_Descripcion AS Descripcion, DOC_Nit_ID  FROM Crud_DocS ")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listCrud_Doc(StrQuery, Conexion, "Matrix")

        Return ObjListCrud_Doc

    End Function

#End Region

End Class

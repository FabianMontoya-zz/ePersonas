Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Adm_Grupo_ReportesSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo GRUPO_REPORTES (INSERT [**Completar**])
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertAdm_Grupo_Reportes(ByVal vp_Obj As Adm_Grupo_ReportesClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        'sql.AppendLine("INSERT CONTRATOS (" & _
        '    "CO_Nit_ID," & _
        '    "CO_Sucursal_ID, " & _
        '    "CO_Colocacion_ID, " & _
        '    "CO_Descripcion, " & _
        '    "CO_TypeDocument_ID, " & _
        '    "CO_Document_ID, " & _        
        '    "CO_Usuario_Creacion, " & _
        '    "CO_Fecha_Creacion, " & _
        '    "CO_UsuarioActualizacion, " & _
        '    "CO_Fecha_Actualizacion " & _
        '    ")")
        'sql.AppendLine("VALUES (")
        'sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Sucursal_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Colocacion_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        'sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        'sql.AppendLine("'" & vp_Obj.Moneda_ID & "',")        
        'sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        'sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        'sql.AppendLine("'" & vp_Obj.FechaActualizacion & "') ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"
    ''' <summary>
    ''' funcion que trae el listado de Grupo de Reportes para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listGrupoReportes(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListGrupoReportes As New List(Of Adm_Grupo_ReportesClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type

            Case "MatrixAll"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read
                    Dim objGrupoReportes As New Adm_Grupo_ReportesClass
                    'cargamos datos sobre el objeto de Politicas

                    objGrupoReportes.Nit_ID = ReadConsulta.GetValue(0)
                    objGrupoReportes.Grupo_ID = ReadConsulta.GetValue(1)
                    objGrupoReportes.Descripcion = ReadConsulta.GetValue(2)
                    objGrupoReportes.Index = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListGrupoReportes.Add(objGrupoReportes)
                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()

        'retornamos la consulta
        Return ObjListGrupoReportes

    End Function
#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As Adm_Grupo_ReportesClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM GRUPO_REPORTES " & _
                       " WHERE GR_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND GR_Grupo_ID = '" & vp_O_Obj.Grupo_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function

    ''' <summary>
    ''' Carga matrix de Grupo de Reportes Genéricas y De la empresa
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function MatrixAll_GrupoReportes(ByVal Nit_ID As String)
        Dim ObjListGrupoReportes As New List(Of Adm_Grupo_ReportesClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  GR_Nit_ID,  " & _
                               " GR_Grupo_ID, " & _
                               " GR_Descripcion, " & _
                               " ROW_NUMBER() OVER(ORDER BY GR_Nit_ID, GR_Grupo_ID ASC) AS Index_GrupoReportes " & _
                               " FROM GRUPO_REPORTES " & _
                               " WHERE GR_Nit_ID = '0' " & _
                               " OR GR_Nit_ID = '" & Nit_ID & "' " & _
                               " ORDER BY GR_Nit_ID, GR_Grupo_ID ASC") 'Trae los grupos genericos (Con cero) y los de la empresa seleccionada

        StrQuery = sql.ToString

        ObjListGrupoReportes = listGrupoReportes(StrQuery, Conexion, "MatrixAll")

        Return ObjListGrupoReportes

    End Function

#End Region

End Class

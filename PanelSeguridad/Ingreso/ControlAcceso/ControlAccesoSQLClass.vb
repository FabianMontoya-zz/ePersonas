Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class ControlAccesoSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Control de acceso (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertControlAcceso(ByVal vp_Obj As ControlAccesoClass)
        ' definiendo los objetos
        Dim conex As New Conector
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT LOG_CONTROL_ACCESO (" & _
           "LCA_Nit_ID," & _
           "LCA_TypeDocument_ID," & _
           "LCA_Document_ID," & _
           "LCA_Tarjeta_ID," & _
           "LCA_Nit_ID_EmpVisita," & _
           "LCA_PuertaAcceso_ID," & _
           "LCA_Area_ID," & _
           "LCA_TypeDocument_ID_Per_Encargada," & _
           "LCA_Document_ID_Per_Encargada," & _
           "LCA_FechaEntrada," & _
           "LCA_HoraEntrada," & _
           "LCA_Tiempo_PlanVisita," & _
           "LCA_Fecha_PlanSalida," & _
           "LCA_Hora_PlanSalida," & _
           "LCA_Fecha_RealSalida," & _
           "LCA_Hora_RealSalida," & _
           "LCA_Estado," & _
           "LCA_IngAutomatico_Porteria," & _
           "LCA_TipoPersona," & _
           "LCA_Num_UnicoVisita," & _
           "LCA_Usuario_Ingreso," & _
           "LCA_FechaIngreso" & _
           ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj.Nit_ID_EmpVisita & "',")
        sql.AppendLine("'" & vp_Obj.PuertaAcceso_ID & "',")
        sql.AppendLine("'" & vp_Obj.Area_ID & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID_Per_Encargada & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID_Per_Encargada & "',")
        sql.AppendLine("'" & vp_Obj.FechaEntrada & "',")
        sql.AppendLine("'" & vp_Obj.HoraEntrada & "',")
        sql.AppendLine("'" & vp_Obj.Tiempo_PlanVisita & "',")
        sql.AppendLine("'" & vp_Obj.Fecha_PlanSalida & "',")
        sql.AppendLine("'" & vp_Obj.Hora_PlanSalida & "',")
        sql.AppendLine("'" & vp_Obj.Fecha_RealSalida & "',")
        sql.AppendLine("'" & vp_Obj.Hora_RealSalida & "',")
        sql.AppendLine("'" & vp_Obj.Estado & "',")
        sql.AppendLine("'" & vp_Obj.IngAutomatico_Porteria & "',")
        sql.AppendLine("'" & vp_Obj.TipoPersona & "',")
        sql.AppendLine("'" & vp_Obj.Num_UnicoVisita & "',")
        sql.AppendLine("'" & vp_Obj.Usuario_Ingreso & "',")
        sql.AppendLine("'" & vp_Obj.FechaIngreso & "' ) ")

        StrQuery = sql.ToString

        Dim Result As String = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result
    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Ingreso(ByVal vp_O_Obj As ControlAccesoClass)

        Dim conex As New Conector
        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  COUNT(1) AS INGRESO FROM LOG_CONTROL_ACCESO " & _
                                         " WHERE LCA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                                         " AND LCA_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                                         " AND LCA_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                                         " AND LCA_Fecha_RealSalida = ''")

        Dim StrQuery As String = sql.ToString
        Dim Result As String = conex.IDis(StrQuery, "1")

        Return Result

    End Function

#End Region
End Class

Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_ContratoSQLClass

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_Contrato (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_Contrato(ByVal vp_Obj As C_ContratoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CONTRATOS (" & _
            "CON_Nit_ID," & _
            "CON_Sucursal_ID, " & _
            "CON_Colocacion_ID, " & _
            "CON_Descripcion, " & _
            "CON_TypeDocument_ID, " & _
            "CON_Document_ID, " & _
            "CON_Moneda_ID, " & _
            "CON_Producto_ID, " & _
            "CON_Condi_Financiacion_ID, " & _
            "CON_Unidad_Tiempo_ID, " & _
            "CON_Fecha_Apertura, " & _
            "CON_Plazo, " & _
            "CON_Ciclo_ID, " & _
            "CON_Base_Calculo_ID, " & _
            "CON_Direccion_Correspondiente" & _
            "CON_Valor_Total, " & _
            "CON_Valor_Financiado, " & _
            "CON_Valor_Opc_Compra, " & _
            "CON_Usuario_Creacion, " & _
            "CON_Fecha_Creacion, " & _
            "CON_Usuario_Actualizacion, " & _
            "CON_Fecha_Actualizacion, " & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj.Sucursal_ID & "',")
        sql.AppendLine("'" & vp_Obj.Colocacion_ID & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj.Moneda_ID & "',")
        sql.AppendLine("'" & vp_Obj.Producto_ID & "',")
        sql.AppendLine("'" & vp_Obj.Condi_Financiacion_ID & "',")
        sql.AppendLine("'" & vp_Obj.Unidad_Tiempo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Fecha_Apertura & "',")
        sql.AppendLine("'" & vp_Obj.Plazo & "',")
        sql.AppendLine("'" & vp_Obj.Ciclo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Base_Calculo_ID & "',")
        sql.AppendLine("'" & vp_Obj.Direccion_Correspondiente & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Total & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Financiado & "',")
        sql.AppendLine("'" & vp_Obj.Valor_Opc_Compra & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "') ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#Region "CONSULTAS DROP LIST"

#End Region

#Region "CARGAR LISTAS"

#End Region

#Region "OTRAS CONSULTAS"
    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_ContratoClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CONTRATOS " & _
                       " WHERE CO_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND CO_Sucursal_ID = '" & vp_O_Obj.Sucursal_ID & "'" & _
                       " AND CO_Colocacion_ID = '" & vp_O_Obj.Colocacion_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function
#End Region

End Class

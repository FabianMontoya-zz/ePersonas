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
            "CO_Nit_ID," & _
            "CO_Sucursal_ID, " & _
            "CO_Colocacion_ID, " & _
            "CO_Descripcion, " & _
            "CO_TypeDocument_ID, " & _
            "CO_Document_ID, " & _
            "CO_Moneda_ID, " & _
            "CO_Producto_ID, " & _
            "CO_Condi_Financiacion_ID, " & _
            "CO_Unidad_Tiempo_ID, " & _
            "CO_Fecha_Apertura, " & _
            "CO_Plazo, " & _
            "CO_Ciclo_ID, " & _
            "CO_Base_Calculo_ID, " & _
            "CO_Direccion_Correspondiente, " & _
            "CO_Valor_Total, " & _
            "CO_Valor_Financiado, " & _
            "CO_Valor_Opc_Compra, " & _
            "CO_Usuario_Creacion, " & _
            "CO_Fecha_Creacion, " & _
            "CO_UsuarioActualizacion, " & _
            "CO_Fecha_Actualizacion " & _
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

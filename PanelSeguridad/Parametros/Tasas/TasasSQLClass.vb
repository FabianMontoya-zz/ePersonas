Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class TasasSQLClass
#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Financiacion para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listFinanciacion(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListFinanciacion As New List(Of FinanciacionClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List"

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read
                    Dim objFinanciacion As New FinanciacionClass
                    'cargamos datos sobre el objeto de login
                    objFinanciacion.Nit_ID = ReadConsulta.GetValue(0)
                    objFinanciacion.Financiacion_ID = ReadConsulta.GetValue(1)
                    objFinanciacion.Descripcion = ReadConsulta.GetValue(2)
                    objFinanciacion.Unidad_Tiempo = ReadConsulta.GetValue(3)
                    objFinanciacion.Calculo = ReadConsulta.GetValue(4)

                    objFinanciacion.Calculo_Cuota_Final = ReadConsulta.GetValue(5)
                    objFinanciacion.Modalidad_Pago = ReadConsulta.GetValue(6)
                    objFinanciacion.Periodo_Pago = ReadConsulta.GetValue(7)
                    objFinanciacion.Tipo_Cuota = ReadConsulta.GetValue(8)
                    objFinanciacion.Formula_FK = ReadConsulta.GetValue(9)

                    objFinanciacion.Base_Calculo = ReadConsulta.GetValue(10)
                    objFinanciacion.Tasa_FK = ReadConsulta.GetValue(11)
                    objFinanciacion.Tipo_Tasa = ReadConsulta.GetValue(12)
                    objFinanciacion.Puntos_Adicionales = ReadConsulta.GetValue(13)
                    objFinanciacion.Tasa_Mora_FK = ReadConsulta.GetValue(14)

                    objFinanciacion.Tasa_Usura_FK = ReadConsulta.GetValue(15)
                    objFinanciacion.Ciclo_Cobro_FK = ReadConsulta.GetValue(16)
                    objFinanciacion.Index = ReadConsulta.GetValue(17)
                    'agregamos a la lista
                    ObjListFinanciacion.Add(objFinanciacion)
                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListFinanciacion

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Carga matrix de Tasas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Tasas()
        Dim ObjListTasas As New List(Of TasasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT TA_Nit_ID, " & _
                              " TA_Codigo_ID, " & _
                              " TA_Descripcion, " & _
                              " TA_Tipo, " & _
                              " TA_Periodo, " & _
                              " ROW_NUMBER() OVER(ORDER BY TA_Nit_ID, TA_Codigo_ID ASC) AS Index_Tasas " & _
                              " FROM TASAS " & _
                              " ORDER BY TA_Nit_ID, TA_Codigo_ID ASC")

        StrQuery = sql.ToString

        ObjListTasas = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjListTasas

    End Function

    ''' <summary>
    ''' Carga matrix de Detalles_Tasas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Detalles_Tasas()
        Dim ObjListDetallesTasas As New List(Of TasasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT DTA_Nit_ID, " & _
                              " DTA_Codigo_ID, " & _
                              " DTA_Fecha_Efectiva, " & _
                              " DTA_Tasa_Base, " & _
                              " DTA_Puntos_Adicionales, " & _
                              " DTA_Nominal_Anual, " & _
                              " DTA_Equivalencia_Efectiva, " & _
                              " DTA_Factor, " & _
                              " ROW_NUMBER() OVER(ORDER BY DTA_Nit_ID, DTA_Codigo_ID ASC) AS Index_Detalles_Tasas " & _
                              " FROM DETALLES_TASAS " & _
                              " ORDER BY DTA_Nit_ID, DTA_Codigo_ID ASC")

        StrQuery = sql.ToString

        ObjListDetallesTasas = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjListDetallesTasas

    End Function

    ''' <summary>
    ''' Carga matrix de Tasas junto con sus detalles
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Tasa_Detalle()
        Dim ObjListDetallesTasas As New List(Of TasasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  " & _
                              " DTA_Factor, " & _
                              " ROW_NUMBER() OVER(ORDER BY DTA_Nit_ID, DTA_Codigo_ID ASC) AS Index_Detalles_Tasas " & _
                              " FROM DETALLES_TASAS " & _
                              " ORDER BY DTA_Nit_ID, DTA_Codigo_ID ASC")

        StrQuery = sql.ToString

        ObjListDetallesTasas = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjListDetallesTasas

    End Function

#End Region
End Class

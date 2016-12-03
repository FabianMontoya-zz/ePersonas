Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class FinanciacionSQLClass
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
    ''' Carga matrix de Financiacions
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Financiacion()
        Dim ObjListFinanciacion As New List(Of FinanciacionClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT	FIN_Nit_ID, " & _
                                         " FIN_Financiacion_ID, " & _
                                         " FIN_Descripcion, " & _
                                         " FIN_Unidad_Tiempo, " & _
                                         " FIN_Calculo, " & _
                                         " FIN_Calculo_Cuota_Final, " & _
                                         " FIN_Modalidad_Pago, " & _
                                         " FIN_Periodo_Pago, " & _
                                         " FIN_Tipo_Cuota, " & _
                                         " FIN_Formula_FK, " & _
                                         " FIN_Base_Calculo, " & _
                                         " FIN_Tasa_FK, " & _
                                         " FIN_Tipo_Tasa, " & _
                                         " FIN_Puntos_Adicionales, " & _
                                         " FIN_Tasa_Mora_FK, " & _
                                         " FIN_Tasa_Usura_FK, " & _
                                         " FIN_Ciclo_Cobro_FK, " & _
                                         " ROW_NUMBER() OVER(ORDER BY FIN_Financiacion_ID ASC) AS Index_Financiacion " & _
                                         " FROM Financiacion " & _
                                         " ORDER BY FIN_Nit_ID, FIN_Financiacion_ID ASC")

        StrQuery = sql.ToString

        ObjListFinanciacion = listFinanciacion(StrQuery, Conexion, "Matrix")

        Return ObjListFinanciacion

    End Function

#End Region
End Class

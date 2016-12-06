Imports System.Data.SqlClient
Imports System.Data.OleDb
Public Class TasasSQLClass
#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Tasas para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listTasas(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListTasas As New List(Of TasasClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_Type
            Case "List_Tasas"

            Case "Matrix_Tasas" 'Matriz que contiene todas las TASAS junto con sus DETALLES
                While ReadConsulta.Read
                    Dim objTasas As New TasasClass
                    'cargamos datos sobre el objeto de login
                    objTasas.Nit_ID = ReadConsulta.GetValue(0)
                    objTasas.Codigo_ID = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objTasas.Descripcion = ReadConsulta.GetValue(2) Else objTasas.Descripcion = ""
                    objTasas.Tipo = ReadConsulta.GetValue(3)
                    objTasas.Periodo = ReadConsulta.GetValue(4)
                    objTasas.Fecha_Efectiva = ReadConsulta.GetValue(5)
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then objTasas.Tasa_Base = ReadConsulta.GetValue(6) Else objTasas.Tasa_Base = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then objTasas.Puntos_Adicionales = ReadConsulta.GetValue(7) Else objTasas.Puntos_Adicionales = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(8))) Then objTasas.Nominal_Anual = ReadConsulta.GetValue(8) Else objTasas.Nominal_Anual = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objTasas.Equivalencia_Efectiva = ReadConsulta.GetValue(9) Else objTasas.Equivalencia_Efectiva = 0
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objTasas.Factor = ReadConsulta.GetValue(10) Else objTasas.Factor = 0
                    objTasas.Index = ReadConsulta.GetValue(11)
                    'agregamos a la lista
                    ObjListTasas.Add(objTasas)
                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListTasas

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Carga matrix de todas las Tasas junto con sus Detalles
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Tasas()
        Dim ObjListTasas As New List(Of TasasClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT t.TA_Nit_ID, " & _
                              " t.TA_Codigo_ID, " & _
                              " t.TA_Descripcion, " & _
                              " t.TA_Tipo, " & _
                              " t.TA_Periodo, " & _
                              " dt.DTA_Fecha_Efectiva, " & _
                              " dt.DTA_Tasa_Base, " & _
                              " dt.DTA_Puntos_Adicionales, " & _
                              " dt.DTA_Nominal_Anual, " & _
                              " dt.DTA_Equivalencia_Efectiva, " & _
                              " dt.DTA_Factor, " & _
                              " ROW_NUMBER() OVER(ORDER BY t.TA_Nit_ID, t.TA_Codigo_ID ASC) AS Index_Tasas_Detalles " & _
                              " FROM TASAS t " & _
                              " INNER JOIN DETALLES_TASAS dt " & _
                              " ON (dt.DTA_Nit_ID = t.TA_Nit_ID AND dt.DTA_Codigo_ID = t.TA_Codigo_ID) " & _
                              " ORDER BY t.TA_Nit_ID, t.TA_Codigo_ID ASC")

        StrQuery = sql.ToString

        ObjListTasas = listTasas(StrQuery, Conexion, "Matrix_Tasas")

        Return ObjListTasas

    End Function

#End Region
End Class

Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CicloSQLClass
#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Ciclo para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listCiclo(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListCiclo As New List(Of CicloClass)

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
                    Dim objCiclo As New CicloClass
                    'cargamos datos sobre el objeto de login
                    objCiclo.ID_Ciclo = ReadConsulta.GetValue(0)
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objCiclo.Fecha_Corte = ReadConsulta.GetValue(1) Else objCiclo.Fecha_Corte = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objCiclo.Fecha_Pago = ReadConsulta.GetValue(2) Else objCiclo.Fecha_Pago = ""
                    objCiclo.Index = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListCiclo.Add(objCiclo)
                End While

        End Select
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListCiclo

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Carga matrix de Ciclos
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_Ciclo()
        Dim ObjListCiclo As New List(Of CicloClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  CIC_ID_Ciclo, " & _
                                                     " CIC_Fecha_Corte, " & _
                                                     " CIC_Fecha_Pago, " & _
                                                     " ROW_NUMBER() OVER(ORDER BY CIC_ID_Ciclo ASC) AS Index_Ciclo " & _
                                    " FROM CICLO " & _
                                    " ORDER BY CIC_ID_Ciclo ASC")

        StrQuery = sql.ToString

        ObjListCiclo = listCiclo(StrQuery, Conexion, "Matrix")

        Return ObjListCiclo

    End Function
#End Region
End Class

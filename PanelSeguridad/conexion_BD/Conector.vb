Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class Conector
#Region "variables globales"

    Dim vg_S_Servidor_SQL_express As String = System.Web.Configuration.WebConfigurationManager.AppSettings("Ser").ToString
    Dim vg_S_TypeBD As String = System.Web.Configuration.WebConfigurationManager.AppSettings("Type").ToString
    Dim vg_S_Ruta_SLQCOMPACT As String = System.Web.Configuration.WebConfigurationManager.AppSettings("RutaSerCompact").ToString
    Dim vg_S_Pass_SLQCOMPACT As String = System.Web.Configuration.WebConfigurationManager.AppSettings("PDWCGACompact").ToString
    Dim vg_S_PWD_SQL_express As String = System.Web.Configuration.WebConfigurationManager.AppSettings("PDW").ToString
    Dim vg_S_User_SQL_express As String = System.Web.Configuration.WebConfigurationManager.AppSettings("USER").ToString
    Dim vg_S_BD_SQL_express As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString
    Dim vg_S_BD_SQL_express_2 As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString
    Dim vg_S_BD_SQL_express_3 As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDDocument").ToString

    Dim vg_S_StrConexion As String = typeConexion("1")
    Dim vg_S_StrConexion_2 As String = typeConexion("2")
    Dim vg_S_StrConexion_3 As String = typeConexion("3")

#End Region

    ''' <summary>
    ''' funcion generica para la insercion, actualizacion o eliminar de datos en la BD
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function StrInsert_and_Update_All(ByVal vp_S_StrQuery As String, ByVal vp_S_TypeConex As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        Dim vl_S_processUpdate As String

        Dim Select_BD As String
        Select Case vp_S_TypeConex

            Case 1
                Select_BD = vg_S_StrConexion
            Case 2
                Select_BD = vg_S_StrConexion_2
            Case 3
                Select_BD = vg_S_StrConexion_3
            Case Else
                Select_BD = vg_S_StrConexion

        End Select

        Try
            objConexBD = New OleDbConnection(Select_BD)
            objConexBD.ConnectionString = Select_BD

            'abrimos conexion
            objConexBD.Open()
            'cargamos la carga y la conexion
            objcmd = New OleDbCommand(vp_S_StrQuery, objConexBD)
            'ejecutamos la carga
            objcmd.ExecuteNonQuery()
            'cerramos conexiones
            objConexBD.Close()

            vl_S_processUpdate = "Exito"

        Catch ex As Exception

            vl_S_processUpdate = "Error"
        End Try
        Return vl_S_processUpdate

    End Function

    ''' <summary>
    ''' funcion generica para consultas de un solo resultado tipo integer
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function IDis(ByVal vp_S_StrQuery As String, ByVal vp_S_TypeConex As String)

        Dim Select_BD As String
        Select Case vp_S_TypeConex

            Case 1
                Select_BD = vg_S_StrConexion
            Case 2
                Select_BD = vg_S_StrConexion_2
            Case 3
                Select_BD = vg_S_StrConexion_3
            Case Else
                Select_BD = vg_S_StrConexion

        End Select

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(Select_BD)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand
        Dim resultQuery As String = ""

        objConexBD.Open()
        objcmd.CommandText = vp_S_StrQuery

        ReadConsulta = objcmd.ExecuteReader()

        While ReadConsulta.Read
            resultQuery = ReadConsulta.GetValue(0)
        End While

        ReadConsulta.Close()
        objConexBD.Close()

        Return resultQuery

    End Function

    ''' <summary>
    ''' funcion de swicheo de conexion a BD por medio de vlores del web config
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function typeConexion(ByVal vp_S_TypeConex As String)

        Dim conection As String = ""
        '----------------------------------------------------------------------------------------------------------------------------------------------'
        '                                                                conexiones a la BD                                                            '
        '----------------------------------------------------------------------------------------------------------------------------------------------'

        'Conexion SQL Compact
        Dim vg_S_StrConexion_Compact As String = "Provider=Microsoft.SQLSERVER.CE.OLEDB.3.5;Data Source=" & vg_S_Ruta_SLQCOMPACT & _
                                                 ";SSCE:Database Password=" & vg_S_Pass_SLQCOMPACT & ";"

        Dim Select_BD As String

        Select Case vp_S_TypeConex

            Case 1
                Select_BD = vg_S_BD_SQL_express
            Case 2
                Select_BD = vg_S_BD_SQL_express_2
            Case 3
                Select_BD = vg_S_BD_SQL_express_3
            Case Else
                Select_BD = vg_S_BD_SQL_express

        End Select


        'Conexion SQL SERVER Express con usuario
        Dim vg_S_StrConexion_SQLSERVER_USER As String = "provider=SQLOLEDB;Data source=" & vg_S_Servidor_SQL_express & _
                                                        ";database=" & Select_BD & _
                                                        ";User ID=" & vg_S_User_SQL_express & _
                                                        ";password=" & vg_S_PWD_SQL_express & ";"

        'Conexion SQL SERVER Express con Windows Autentication
        Dim vg_S_StrConexion_SQLSERVER_WA As String = "Provider=SQLOLEDB;Server=" & vg_S_Servidor_SQL_express & _
                                                      ";Database=" & vg_S_BD_SQL_express & _
                                                      ";Trusted_Connection=yes;"


        'Conexion SQL SERVER Express con usuario
        Dim vg_S_StrConexion_SQLSERVER_USER_IP As String = "Provider=SQLOLEDB;Data source=" & vg_S_Servidor_SQL_express & _
                                                           ";Network Library=DBMSSOCN;Initial Catalog=" & Select_BD & _
                                                           ";User ID=" & vg_S_User_SQL_express & _
                                                           ";password=" & vg_S_PWD_SQL_express & ";"


        Select Case vg_S_TypeBD

            Case "Compact"
                conection = vg_S_StrConexion_Compact
            Case "SQL_User"
                conection = vg_S_StrConexion_SQLSERVER_USER
            Case "SQL_WA"
                conection = vg_S_StrConexion_SQLSERVER_WA
            Case "SQL_User_IP"
                conection = vg_S_StrConexion_SQLSERVER_USER_IP

        End Select

        Return conection

    End Function

End Class

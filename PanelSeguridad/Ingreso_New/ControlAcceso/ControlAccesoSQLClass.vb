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


    ''' <summary>
    ''' funcion que crea el query para la modificacion del Cliente (UPDATE)
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateControlAcceso(ByVal vp_O_Obj As ControlAccesoClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine(" UPDATE LOG_CONTROL_ACCESO SET " & _
                          " LCA_Usuario_Salida ='" & vp_O_Obj.Usuario_Salida & "', " & _
                          " LCA_FechaSalida ='" & vp_O_Obj.Fecha_RealSalida & "' " & _
                          " WHERE LCA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                          " AND LCA_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                          " AND LCA_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                          " AND LCA_FechaSalida IS NULL")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function


#End Region


#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Cliente para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function list(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjList As New List(Of ControlAccesoClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList

            Case "Matrix"
                While ReadConsulta.Read

                    Dim obj As New ControlAccesoClass
                    'cargamos datos sobre el objeto de login
                    obj.PuertaAcceso_ID = ReadConsulta.GetValue(0)
                    obj.Area_ID = ReadConsulta.GetValue(1)
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then obj.DescripPuertaAcceso = ReadConsulta.GetValue(2) Else obj.DescripPuertaAcceso = ""
                    obj.Tiempo_PlanVisita = ReadConsulta.GetValue(3)
                    obj.FechaEntrada = ReadConsulta.GetValue(4)
                    obj.HoraEntrada = ReadConsulta.GetValue(5)
                    If Not (IsDBNull(ReadConsulta.GetValue(6))) Then obj.DescripAreaAcceso = ReadConsulta.GetValue(6) Else obj.DescripAreaAcceso = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(7))) Then obj.DescripPersona_Enc = ReadConsulta.GetValue(7) Else obj.DescripPersona_Enc = ""

                    'agregamos a la lista
                    ObjList.Add(obj)

                End While

        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjList

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' trae los registros asociados al usuario
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function List_Registros_Ingreso(ByVal vp_O_Obj As ControlAccesoClass)

        Dim ObjList As New List(Of ControlAccesoClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim BD_Param As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDParam").ToString

        Dim sql As New StringBuilder


        sql.Append(" SELECT LCA_PuertaAcceso_ID, " & _
                              "              LCA_Area_ID, " & _
                              "              PA.PA_Descripcion, " & _
                              "              LCA_Tiempo_PlanVisita, " & _
                              "              LCA_FechaEntrada, " & _
                              "              LCA_HoraEntrada,  " & _
                              "              A.A_Descripcion, " & _
                              "              C.CLI_Nombre + ' ' + C.CLI_Nombre_2 + ' ' +  C.CLI_Apellido_1 + ' ' + C.CLI_Apellido_2 as P_Enc " & _
                              " FROM LOG_CONTROL_ACCESO LCA " & _
                              " LEFT JOIN PUERTAS_ACCESO PA ON PA.PA_PuertaAcceso_ID = LCA.LCA_PuertaAcceso_ID " & _
                              "                                                                  AND PA.PA_Nit_ID = LCA.LCA_Nit_ID " & _
                              " LEFT JOIN " & BD_Param & ".dbo.AREA A ON A.A_Area_ID = LCA.LCA_Area_ID " & _
                              "                                                                                 AND A.A_Nit_ID = LCA.LCA_Nit_ID " & _
                              " LEFT JOIN " & BD_Param & ".dbo.CLIENTE C ON C.CLI_Nit_ID = LCA.LCA_Nit_ID " & _
                              "                                                                                      AND C.CLI_TypeDocument_ID = LCA.LCA_TypeDocument_ID_Per_Encargada " & _
                              "                                                                                      AND C.CLI_Document_ID = LCA.LCA_Document_ID_Per_Encargada " & _
                              " WHERE LCA_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                              "     AND LCA_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                              "     AND LCA_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                              "     AND LCA_FechaSalida IS NULL ")

        Dim StrQuery As String = sql.ToString

        ObjList = list(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

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
                                         " AND LCA_FechaSalida IS NULL")

        Dim StrQuery As String = sql.ToString
        Dim Result As String = conex.IDis(StrQuery, "1")

        Return Result

    End Function

#End Region

End Class

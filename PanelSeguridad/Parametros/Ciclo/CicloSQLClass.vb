Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class CicloSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla roles parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllSucursal(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjList As New List(Of CicloClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector

        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append("SELECT CIC_ID_Ciclo, CIC_Descripcion, " & _
                       "CIC_Usuario_Creacion, CIC_FechaCreacion, CIC_Usuario_Actualizacion, CIC_FechaActualizacion, " & _
                       "ROW_NUMBER() OVER(ORDER BY CIC_ID_Ciclo ASC) AS Index_Ciclo " & _
                       "FROM SUCURSAL ORDER BY CIC_ID_Ciclo ASC")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append("SELECT SUC_Nit_ID, SUC_Surcursal_ID, SUC_Descripcion, " & _
                       "SUC_Usuario_Creacion, SUC_FechaCreacion, SUC_Usuario_Actualizacion, SUC_FechaActualizacion, " & _
                       "ROW_NUMBER() OVER(ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC) AS Index_Sucursal " & _
                       "FROM SUCURSAL ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC")
            Else
                sql.Append("SELECT SUC_Nit_ID, SUC_Surcursal_ID, SUC_Descripcion, " & _
                       "SUC_Usuario_Creacion, SUC_FechaCreacion, SUC_Usuario_Actualizacion, SUC_FechaActualizacion, " & _
                       "ROW_NUMBER() OVER(ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC) AS Index_Sucursal " & _
                       "FROM SUCURSAL " & _
                       "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'" & _
                       " ORDER BY SUC_Nit_ID, SUC_Surcursal_ID ASC")
            End If
        End If

        StrQuery = sql.ToString

        ObjList = listCiclo(StrQuery, Conexion, "List")

        Return ObjList

    End Function

    ''' <summary>
    ''' funcion que crea el query para el estado del rol (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function DeleteSucursal(ByVal vp_Obj As SucursalClass)
        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder

        Dim StrQuery As String = ""

        sql.AppendLine("DELETE SUCURSAL " & _
                       " WHERE SUC_Nit_ID = '" & vp_Obj.Nit_ID & "' AND SUC_Surcursal_ID = '" & vp_Obj.Sucursal_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del rol (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateSucursal(ByVal vp_Obj As SucursalClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE SUCURSAL SET " & _
                       " SUC_Descripcion ='" & vp_Obj.Descripcion & "', " & _
                       " SUC_Usuario_Actualizacion ='" & vp_Obj.UsuarioActualizacion & "', " & _
                       " SUC_FechaActualizacion ='" & vp_Obj.FechaActualizacion & "' " & _
                       " WHERE SUC_Nit_ID = '" & vp_Obj.Nit_ID & "' AND SUC_Surcursal_ID = '" & vp_Obj.Sucursal_ID & "'")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo rol (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertSucursal(ByVal vp_Obj As CicloClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT CICLO (" & _
                       "CIC_ID_Ciclo," & _
                       "CIC_Descripcion," & _
                       "CIC_Usuario_Creacion," & _
                       "CIC_FechaCreacion," & _
                       "CIC_Usuario_Actualizacion," & _
                       "CIC_FechaActualizacion" & _
                       ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj.ID_Ciclo & "',")
        sql.AppendLine("'" & vp_Obj.Descripcion & "', ")
        sql.AppendLine("'" & vp_Obj.UsuarioCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaCreacion & "', ")
        sql.AppendLine("'" & vp_Obj.UsuarioActualizacion & "', ")
        sql.AppendLine("'" & vp_Obj.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

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
                    If Not (IsDBNull(ReadConsulta.GetValue(1))) Then objCiclo.Descripcion = ReadConsulta.GetValue(1) Else objCiclo.Descripcion = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(2))) Then objCiclo.Fecha_Corte = ReadConsulta.GetValue(2) Else objCiclo.Fecha_Corte = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(3))) Then objCiclo.Fecha_Pago = ReadConsulta.GetValue(3) Else objCiclo.Fecha_Pago = ""
                    objCiclo.Index = ReadConsulta.GetValue(4)

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
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As CicloClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM CICLO " & _
                       " WHERE CIC_ID_Ciclo = '" & vp_O_Obj.ID_Ciclo & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

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

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  c.CIC_ID_Ciclo, " & _
                               " c.CIC_Descripcion, " & _
                               " dc.DCI_Fecha_Corte, " & _
                               " dc.DCI_Fecha_Pago, " & _
                               " ROW_NUMBER() OVER(ORDER BY c.CIC_ID_Ciclo ASC) AS Index_Ciclo " & _
                               " FROM CICLO c " & _
                               " LEFT JOIN DETALLES_CICLO dc " & _
                               " ON c.CIC_ID_Ciclo = dc.DCI_ID_Ciclo " & _
                               " ORDER BY c.CIC_ID_Ciclo ASC")

        StrQuery = sql.ToString

        ObjListCiclo = listCiclo(StrQuery, Conexion, "Matrix")

        Return ObjListCiclo

    End Function
#End Region
End Class

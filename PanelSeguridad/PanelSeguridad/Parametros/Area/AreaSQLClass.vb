Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class AreaSQLClass

#Region "CRUD"

    ''' <summary>
    ''' creala consulta para la tabla Area parametrizada (READ)
    ''' </summary>
    ''' <param name="vp_S_Filtro"></param>
    ''' <param name="vp_S_Opcion"></param>
    ''' <param name="vp_S_Contenido"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_AllArea(ByVal vp_S_Filtro As String, ByVal vp_S_Opcion As String, ByVal vp_S_Contenido As String)

        Dim ObjListArea As New List(Of AreaClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim BD_Admin As String = System.Web.Configuration.WebConfigurationManager.AppSettings("BDAdmin").ToString

        Dim sql As New StringBuilder

        sql.Append("DROP TABLE T_AREA_CARGO")
        StrQuery = sql.ToString
        conex.StrInsert_and_Update_All(StrQuery, "2")

        sql = New StringBuilder()

        sql.Append("EXEC CONSULT_T_AREA_CARGO 'AREA'")
        StrQuery = sql.ToString
        conex.StrInsert_and_Update_All(StrQuery, "2")

        sql = New StringBuilder()

        If vp_S_Filtro = "N" And vp_S_Opcion = "ALL" Then
            sql.Append(" SELECT Nit_ID, " & _
                             " AREA_CARGO_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO ")
        Else

            If vp_S_Contenido = "ALL" Then
                sql.Append(" SELECT Nit_ID, " & _
                             " AREA_CARGO_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO ")
            Else
                sql.Append(" SELECT Nit_ID, " & _
                             " AREA_CARGO_ID, " & _
                             " Descripcion, " & _
                             " Area_Cargo_Dependencia, " & _
                             " Politica_ID, " & _
                             " Usuario_Creacion, " & _
                             " FechaCreacion, " & _
                             " Usuario_Actualizacion, " & _
                             " FechaActualizacion, " & _
                             " DescripDependecia, " & _
                             " DescripSeguridad, " & _
                             " DescripEmpresa " & _
                       " FROM T_AREA_CARGO " & _
                      "WHERE " & vp_S_Opcion & " like '%" & vp_S_Contenido & "%'")
            End If
        End If

        StrQuery = sql.ToString

        ObjListArea = listArea(StrQuery, Conexion, "List")

        Return ObjListArea

    End Function

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo Area (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_Area"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertArea(ByVal vp_Obj_Area As AreaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT AREA (" & _
            "A_Nit_ID," & _
            "A_Area_ID," & _
            "A_Descripcion," & _
            "A_AreaDependencia," & _
            "A_Politica_ID," & _
            "A_Usuario_Creacion," & _
            "A_FechaCreacion," & _
            "A_Usuario_Actualizacion," & _
            "A_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_Area.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_Area.Area_ID & "',")
        sql.AppendLine("'" & vp_Obj_Area.Descripcion & "',")
        sql.AppendLine("'" & vp_Obj_Area.AreaDependencia & "',")
        sql.AppendLine("'" & vp_Obj_Area.Politica_ID & "',")
        sql.AppendLine("'" & vp_Obj_Area.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Area.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_Area.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_Area.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la modificacion del Area (UPDATE)
    ''' </summary>
    ''' <param name="vp_Obj_Area"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function UpdateArea(ByVal vp_Obj_Area As AreaClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String = ""
        sql.AppendLine("UPDATE AREA SET " & _
                       " A_Descripcion ='" & vp_Obj_Area.Descripcion & "', " & _
                       " A_AreaDependencia ='" & vp_Obj_Area.AreaDependencia & "', " & _
                       " A_Politica_ID ='" & vp_Obj_Area.Politica_ID & "', " & _
                       " A_Usuario_Actualizacion ='" & vp_Obj_Area.UsuarioActualizacion & "', " & _
                       " A_FechaActualizacion ='" & vp_Obj_Area.FechaActualizacion & "' " & _
                       " WHERE  A_Nit_ID = '" & vp_Obj_Area.Nit_ID & "' AND A_Area_ID = '" & vp_Obj_Area.Area_ID & "'")
        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

    ''' <summary>
    ''' funcion que crea el query para la eliminacion del Area (DELETE)
    ''' </summary>
    ''' <param name="vp_Obj_Area"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function EraseArea(ByVal vp_Obj_Area As AreaClass)

        Dim conex As New Conector
        Dim Result As String = ""
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQuery As String
        Dim SQL_general As New GeneralSQLClass

        sql.AppendLine("DELETE AREA WHERE A_Nit_ID = '" & vp_Obj_Area.Nit_ID & "' AND A_Area_ID = '" & vp_Obj_Area.Area_ID & "'")
        StrQuery = sql.ToString
        Result = conex.StrInsert_and_Update_All(StrQuery, "2")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function ReadCharge_DropList(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT T_IndexColumna As ID, T_Traductor As descripcion FROM TC_TABLAS " & _
                   " WHERE T_Tabla = '" & vp_S_Table & "' AND T_Param = '1' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist


    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_NitEmpresa"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListAreaDepend(ByVal vp_S_NitEmpresa As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Area_ID AS ID,CAST(A_Area_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION FROM AREA " & _
                   " WHERE  A_Nit_ID = '" & vp_S_NitEmpresa & "'")

        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

    ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <param name="vp_S_Table"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListSeguridad(ByVal vp_S_Table As String)

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT PS_Politica_ID AS ID,CAST(PS_Politica_ID AS NVARCHAR(5)) + ' - ' + PS_Descripcion AS DESCRIPCION FROM POLITICA_SEGURIDAD ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de Area para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listArea(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vp_S_TypeList As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListArea As New List(Of AreaClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vp_S_TypeList
            Case "List"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objArea As New AreaClass
                    'cargamos datos sobre el objeto de login
                    objArea.Nit_ID = ReadConsulta.GetValue(0)
                    objArea.Area_ID = ReadConsulta.GetValue(1)
                    objArea.Descripcion = ReadConsulta.GetValue(2)
                    objArea.AreaDependencia = ReadConsulta.GetValue(3)
                    objArea.Politica_ID = ReadConsulta.GetValue(4)

                    objArea.UsuarioCreacion = ReadConsulta.GetValue(5)
                    objArea.FechaCreacion = ReadConsulta.GetValue(6)
                    objArea.UsuarioActualizacion = ReadConsulta.GetValue(7)
                    objArea.FechaActualizacion = ReadConsulta.GetValue(8)

                    If Not (IsDBNull(ReadConsulta.GetValue(9))) Then objArea.DescripAreaDepen = ReadConsulta.GetValue(9) Else objArea.DescripAreaDepen = ""
                    If Not (IsDBNull(ReadConsulta.GetValue(10))) Then objArea.DescripPolitica = ReadConsulta.GetValue(10) Else objArea.DescripPolitica = ""
                    objArea.DescripEmpresa = ReadConsulta.GetValue(11)

                    'agregamos a la lista
                    ObjListArea.Add(objArea)

                End While

            Case "Matrix"
                'recorremos la consulta por la cantidad de datos en la BD
                While ReadConsulta.Read

                    Dim objArea As New AreaClass
                    'cargamos datos sobre el objeto de login
                    objArea.Area_ID = ReadConsulta.GetValue(0)
                    objArea.Descripcion = ReadConsulta.GetValue(1)
                    objArea.Nit_ID = ReadConsulta.GetValue(2)
                    
                    'agregamos a la lista
                    ObjListArea.Add(objArea)

                End While

        End Select



        
        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListArea

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As AreaClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM AREA " & _
                       " WHERE A_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND A_Area_ID = '" & vp_O_Obj.Area_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "2")

        Return Result
    End Function

    ''' <summary>
    ''' lee la matriz de Areas
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Read_Matrix_Area()

        Dim ObjList As New List(Of AreaClass)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")

        Dim sql As New StringBuilder

        sql.Append(" SELECT A_Area_ID AS ID,CAST(A_Area_ID AS NVARCHAR(5)) + ' - ' + A_Descripcion AS DESCRIPCION, A_Nit_ID FROM AREA  " & _
                   " ORDER BY A_Area_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = listArea(StrQuery, Conexion, "Matrix")

        Return ObjList

    End Function

#End Region

End Class

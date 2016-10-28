Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class C_AccesoPreSQLClass

#Region "CRUD"

    ''' <summary>
    ''' funcion que crea el query para la insercion de nuevo C_AccesoPre (INSERT)
    ''' </summary>
    ''' <param name="vp_Obj_C_AccesoPre"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function InsertC_AccesoPre(ByVal vp_Obj_C_AccesoPre As C_AccesoPreClass)

        Dim conex As New Conector
        Dim Result As String
        ' definiendo los objetos
        Dim sql As New StringBuilder
        Dim StrQueryID As String = ""
        Dim StrQuery As String = ""

        sql.AppendLine("INSERT R_TARJETA_PERSONA (" & _
            "RTP_Nit_ID," & _
            "RTP_TypeDocument_ID," & _
            "RTP_Document_ID," & _
            "RTP_Tarjeta_ID," & _
            "RTP_Usuario_Creacion," & _
            "RTP_FechaCreacion," & _
            "RTP_Usuario_Actualizacion," & _
            "RTP_FechaActualizacion" & _
            ")")
        sql.AppendLine("VALUES (")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Nit_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.TypeDocument_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Document_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.Tarjeta_ID & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.UsuarioCreacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaCreacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.UsuarioActualizacion & "',")
        sql.AppendLine("'" & vp_Obj_C_AccesoPre.FechaActualizacion & "' ) ")

        StrQuery = sql.ToString

        Result = conex.StrInsert_and_Update_All(StrQuery, "1")

        Return Result

    End Function

#End Region

#Region "CONSULTAS DROP LIST"

     ''' <summary>
    ''' crea la consulta para cargar el combo
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Charge_DropListTipo_Ingreso()

        Dim ObjListDroplist As New List(Of Droplist_Class)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim SQLGeneral As New GeneralSQLClass
        Dim sql As New StringBuilder

        sql.Append(" SELECT DDL_ID AS ID , DDL_ID + ' - ' + DDLL_Descripcion AS Descripcion  from TC_DDL_TIPO WHERE DDL_Tabla = 'TIPO_INGRESO' ")
        StrQuery = sql.ToString

        ObjListDroplist = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjListDroplist

    End Function

#End Region

#Region "CARGAR LISTAS"

    ''' <summary>
    ''' funcion que trae el listado de C_AccesoPre para armar la tabla
    ''' </summary>
    ''' <param name="vp_S_StrQuery"></param>
    ''' <param name="vg_S_StrConexion"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function listC_AccesoPre(ByVal vp_S_StrQuery As String, ByVal vg_S_StrConexion As String, ByVal vg_S_Type As String)

        'inicializamos conexiones a la BD
        Dim objcmd As OleDbCommand = Nothing
        Dim objConexBD As OleDbConnection = Nothing
        objConexBD = New OleDbConnection(vg_S_StrConexion)
        Dim ReadConsulta As OleDbDataReader = Nothing

        objcmd = objConexBD.CreateCommand

        Dim ObjListC_AccesoPre As New List(Of C_AccesoPreClass)

        'abrimos conexion
        objConexBD.Open()
        'cargamos consulta
        objcmd.CommandText = vp_S_StrQuery
        'ejecutamos consulta
        ReadConsulta = objcmd.ExecuteReader()

        Select Case vg_S_Type

            Case "List"


            Case "Matrix_RTP"
                While ReadConsulta.Read

                    Dim objC_AccesoPre As New C_AccesoPreClass
                    'cargamos datos sobre el objeto de login
                    objC_AccesoPre.Nit_ID = ReadConsulta.GetValue(0)
                    objC_AccesoPre.TypeDocument_ID = ReadConsulta.GetValue(1)
                    objC_AccesoPre.Document_ID = ReadConsulta.GetValue(2)
                    objC_AccesoPre.Tarjeta_ID = ReadConsulta.GetValue(3)

                    'agregamos a la lista
                    ObjListC_AccesoPre.Add(objC_AccesoPre)
                End While


        End Select

        'cerramos conexiones
        ReadConsulta.Close()
        objConexBD.Close()
        'retornamos la consulta
        Return ObjListC_AccesoPre

    End Function

#End Region

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' averigua si esta repetido
    ''' </summary>
    ''' <param name="vp_O_Obj"></param>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Consulta_Repetido(ByVal vp_O_Obj As C_AccesoPreClass)

        Dim StrQuery As String = ""
        Dim Result As String = ""
        Dim conex As New Conector

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT COUNT(1) FROM R_TARJETA_PERSONA " & _
                       " WHERE RTP_Nit_ID = '" & vp_O_Obj.Nit_ID & "'" & _
                       " AND RTP_TypeDocument_ID = '" & vp_O_Obj.TypeDocument_ID & "'" & _
                       " AND RTP_Document_ID = '" & vp_O_Obj.Document_ID & "'" & _
                       " AND RTP_Tarjeta_ID = '" & vp_O_Obj.Tarjeta_ID & "'")

        StrQuery = sql.ToString

        Result = conex.IDis(StrQuery, "1")

        Return Result
    End Function


    ''' <summary>
    ''' consulta que trae los datos de asignar tarjeta
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function Matrix_RTP()

        Dim ObjListCrud_Doc As New List(Of C_AccesoPreClass)
        Dim StrQuery As String = ""
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("1")

        Dim sql As New StringBuilder

        sql.AppendLine(" SELECT  RTP_Nit_ID, RTP_TypeDocument_ID, RTP_Document_ID, RTP_Tarjeta_ID  FROM  R_TARJETA_PERSONA")
        StrQuery = sql.ToString

        ObjListCrud_Doc = listC_AccesoPre(StrQuery, Conexion, "Matrix_RTP")

        Return ObjListCrud_Doc

    End Function

#End Region

End Class

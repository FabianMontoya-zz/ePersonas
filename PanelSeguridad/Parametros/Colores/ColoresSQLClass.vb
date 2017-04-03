Imports System.Data.SqlClient
Imports System.Data.OleDb

Public Class ColoresSQLClass

#Region "OTRAS CONSULTAS"

    ''' <summary>
    ''' Carga lista de colores
    ''' </summary>
    ''' <returns></returns>
    ''' <remarks></remarks>
    Public Function List_Colors()

        Dim ObjList As New List(Of Droplist_Class)
        Dim conex As New Conector
        Dim Conexion As String = conex.typeConexion("2")
        Dim SQLGeneral As New GeneralSQLClass

        Dim sql As New StringBuilder

        sql.Append(" SELECT CO_Color_ID AS ID,CAST(CO_Color_ID AS NVARCHAR(2)) + ' - ' + CO_Descripcion AS DESCRIPCION FROM dbo.TC_COLORES  " & _
                   " ORDER BY CO_Color_ID ASC ")
        Dim StrQuery As String = sql.ToString

        ObjList = SQLGeneral.listdrop(StrQuery, Conexion)

        Return ObjList

    End Function

#End Region

End Class

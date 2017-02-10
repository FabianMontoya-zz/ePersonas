Set fso = CreateObject("Scripting.FileSystemObject")
Archivo = "C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe"
If fso.FileExists(Archivo) Then
	anno = Year(Date)

	Titulo = "Autorizaci�n de Acceso"

	Mensaje = "AUTORIZACI�N DE ACCESO A ARCHIVOS DEL EQUIPO"+ vbCrLf + vbCrLf +""

	Mensaje = Mensaje + "�Autoriza que este archivo ejecute �nica y exclusivamente el programa encargado de realizar el proceso de captura de su huella?"+ vbCrLf +  vbCrLf +""

	Mensaje = Mensaje + "Luego de responder, este archivo se eliminar� autom�ticamente sin importar la opci�n elegida."+ vbCrLf + vbCrLf + ""

	Mensaje = Mensaje + "� SASIF S.A.S. " & anno

	Acepta = Msgbox(Mensaje, vbYesNo+vbQuestion+vbSystemModal, Titulo)

	Set WshShell = CreateObject("WScript.Shell")

	if Acepta = vbYes then
		Set WshShell = CreateObject("WScript.Shell")
		Return = WshShell.Run("cmd /c start """" ""C:\Program Files\SASIF FingerPrint\Enroller\EnrollermentApp.exe""", 0, false)
	else
		Msgbox "Se cancel� la ejecuci�n autom�tica.", vbOKOnly+64+vbSystemModal, "Ejecuci�n Autom�tica Cancelada"
	end if
Else
    MsgBox "Programa no se encuentra en equipo"
End If

Set PV4 = CreateObject("Scripting.FileSystemObject")
PV4.deletefile Wscript.ScriptFullName
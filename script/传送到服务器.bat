@echo off

if exist dist (
	ren dist vuepress
) else (
	if not exist vuepress (		
		echo -------------------------- �ϴ�ʧ�� --------------------------
		echo ����ִ�д���������ɾ�̬�ļ� --- ˫�� ���.bat
		pause
		exit
	)
)


.\WinSCP\WinSCP.com /script=sendFile.bat

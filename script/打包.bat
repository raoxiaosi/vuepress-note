@echo off

if exist vuepress (
	
	echo --------------------------------------
	echo ���ھɵľ�̬�ļ���ɾ���ɵľ�̬�ļ�

	cd vuepress

	for /f "delims=" %%a in ('dir/ad/b') do rd /s /q "%%~a"
	del /f/q/s *

	cd ..
	rd vuepress
	echo ɾ���ɹ�
	echo --------------------------------------
)

vuepress build ../docs

pause
@echo off

if exist vuepress (
	
	echo --------------------------------------
	echo 存在旧的静态文件，删除旧的静态文件

	cd vuepress

	for /f "delims=" %%a in ('dir/ad/b') do rd /s /q "%%~a"
	del /f/q/s *

	cd ..
	rd vuepress
	echo 删除成功
	echo --------------------------------------
)

vuepress build ../docs

pause
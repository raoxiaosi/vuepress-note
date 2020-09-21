@echo off

if exist dist (
	ren dist vuepress
) else (
	if not exist vuepress (		
		echo -------------------------- 上传失败 --------------------------
		echo 请先执行打包程序，生成静态文件 --- 双击 打包.bat
		pause
		exit
	)
)


.\WinSCP\WinSCP.com /script=sendFile.bat

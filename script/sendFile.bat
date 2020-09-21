
option echo on

option batch on  

option confirm off

open root:pwd@192.168.1.11

cd /usr/local/nginx/html

put vuepress

option transfer binary  

option synchdelete off       #是否同步删除    

remote  

close  

exit  
pause
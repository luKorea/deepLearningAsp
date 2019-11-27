### npm安装Electron解决方案

Electron使用npm安装时，因为是国外的镜像源，所以速度会非常慢。而使用cnpm如下命令进行安装时，又会出现安装失败的问题：

```shell
npm install electron -g
execute post install 1 scripts...
[1/1] scripts.postinstall electron@6.0.3 run "node install.js", root: "C:\\Users\\94012\\AppData\\Roaming\\npm\\node_modules\\electron"
Downloading tmp-1428-0-electron-v6.0.3-win32-x64.zip
Error: GET https://cdn.npm.taobao.org/dist/electron/6.0.3/electron-v6.0.3-win32-x64.zip returned 404
C:\Users\94012\AppData\Roaming\npm\node_modules\electron\install.js:49
  throw err
  ^
  ......
Error: Failed to find Electron v6.0.3 for win32-x64 at https://cdn.npm.taobao.org/dist/electron/6.0.3/electron-v6.0.3-win32-x64.zip
    at Request.<anonymous> 
  
[npminstall:runscript:error] electron@6.0.3 scripts.postinstall run "node install.js" error: RunScriptError: Run "C:\Windows\system32\cmd.exe /d /s /c node install.js" error, exit code 1
Install fail! RunScriptError: post install error, please remove node_modules before retry!
Run "C:\Windows\system32\cmd.exe /d /s /c node install.js" error, exit code 1
RunScriptError: post install error, please remove node_modules before retry!
Run "C:\Windows\system32\cmd.exe /d /s /c node install.js" error, exit code 1
    at ChildProcess.proc.on.code 
 ......
```

从报错原因上，发现是找不到这个版本的electron，然后返回404了。

```shell
Downloading tmp-1428-0-electron-v6.0.3-win32-x64.zip
Error: GET https://cdn.npm.taobao.org/dist/electron/6.0.3/electron-v6.0.3-win32-x64.zip returned 404
```

所以找到原因就好说了，那就指定之前的版本安装即可，如：

```shell
cnpm install electron@^6.0.1 -g
```


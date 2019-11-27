# 常⻅**Web**攻击 

1. XSS
2. CSRF
3. SQL 注入
4. 点击劫持 clickjacking
5. DDOS 分布式拒绝访问攻击
6. 请求劫持 
7. OS命令

# 攻击简介

1. #### XSS

   ```
   Cross Site Scripting 跨站脚本攻击 XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本 攻击是指通过存在安全漏洞的Web⽹站注册⽤户的浏览器内运⾏⾮法的HTML标签或JavaScript 进⾏的⼀种攻击;
   1. 跨站脚本攻击有可能造成以下影响: 
       利⽤虚假输⼊表单骗取⽤户个⼈信息。 
       利⽤脚本窃取⽤户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。 
       显示伪造的⽂章或图⽚。 
   2. XSS攻击分类 
       反射型 - url参数直接注⼊ 
       // 普通 
       http://localhost:3000/?from=china 
       // alert尝试 
       http://localhost:3000/?from= 
       存储型 - 存储到DB后读取时注⼊ 
   3. XSS攻击的危害 Scripting 能⼲啥就能⼲啥 
       获取⻚⾯数据 
       获取Cookies
       劫持前端逻辑 
       发送请求 
       偷取⽹站的任意数据 
       偷取⽤户的资料 
       偷取⽤户的秘密和登录态 
       欺骗⽤户 
   4. 防范⼿段 
       ejs转义⼩知识 
       HEAD 
       0 禁⽌XSS过滤。 
       // 获取Cookie 
       http://localhost:3000/?from= 
       // 短域名伪造 https://dwz.cn/ 
       // 伪造cookie⼊侵 chrome 
       document.cookie="kaikeba:sess=eyJ1c2VybmFtZSI6Imxhb3dhbmciLCJfZXhwaXJlIjox 
       NTUzNTY1MDAxODYxLCJfbWF4QWdlIjo4NjQwMDAwMH0=" 
       // 评论 
       // 跨站脚本注⼊ 
       <% code %>⽤于执⾏其中javascript代码； 
       <%= code %>会对code进⾏html转义； 
       <%- code %>将不会进⾏转义 
       ctx.set('X-XSS-Protection', 0) // 禁⽌XSS过滤 
       // http://localhost:3000/?from= 可以拦截 但伪装⼀下就 
       启⽤XSS过滤（通常浏览器是默认的）。 如果检测到跨站脚本攻击，浏览器将清除⻚⾯（删除 
       不安全的部分）。 
       1;mode=block 启⽤XSS过滤。 如果检测到攻击，浏览器将不会清除⻚⾯，⽽是阻⽌⻚⾯加载。 
       1; report= (Chromium only) 
       启⽤XSS过滤。 如果检测到跨站脚本攻击，浏览器将清除⻚⾯并使⽤CSP report-uri 指令的 
       功能发送违规报告。 
   	CSP 
           内容安全策略 (CSP, Content Security Policy) 是⼀个附加的安全层，⽤于帮助检测和缓解 
           某些类型的攻击，包括跨站脚本 (XSS) 和数据注⼊等攻击。 这些攻击可⽤于实现从数据窃 
           取到⽹站破坏或作为恶意软件分发版本等⽤途。 
           CSP 本质上就是建⽴⽩名单，开发者明确告诉浏览器哪些外部资源可以加载和执⾏。我们 
           只需要配置规则，如何拦截是由浏览器⾃⼰实现的。我们可以通过这种⽅式来尽量减少 
           XSS 攻击。 
   	转义字符 
   	⿊名单 
           ⽤户的输⼊永远不可信任的，最普遍的做法就是转义输⼊输出的内容，对于引号、尖括号、斜 
           杠进⾏转义 
           富⽂本来说，显然不能通过上⾯的办法来转义所有字符，因为这样会把需要的格式也过滤掉。 
           对于这种情况，通常采⽤⽩名单过滤的办法，当然也可以通过⿊名单过滤，但是考虑到需要过 
           滤的标签和标签属性实在太多，更加推荐使⽤⽩名单的⽅式。 
   	⽩名单 
           HttpOnly Cookie 
           这是预防XSS攻击窃取⽤户cookie最有效的防御⼿段。Web应 ⽤程序在设置cookie时，将 
           其属性设为HttpOnl=y，就可以避免该⽹⻚的cookie被客户端恶意JavaScript窃取，保护⽤ 
           户cookie信息。 
   ```

2. #### CSRF

   ```
   	CSRF(Cross Site Request Forgery)，即跨站请求伪造，是⼀种常⻅的Web攻击，它利⽤⽤户已 登录的身份，在⽤户毫不知情的情况下，以⽤户的名义完成⾮法操作。 ⽤户已经登录了站点 A，并在本地记录了 cookie,在⽤户没有登出站点 A 的情况下（也就是 cookie ⽣效的情况下），访问了恶意攻击者提供的引 诱危险站点 B (B 站点要求访问站点A)。 站点 A 没有做任何 CSRF 防御 response.addHeader("Set-Cookie", "uid=112; Path=/; HttpOnly") 登录 http://localhost:4000/csrf.html;
   	
   CSRF攻击危害 
       利⽤⽤户登录态 
       ⽤户不知情 
       完成业务请求 
       盗取⽤户资⾦（转账，消费） 
       冒充⽤户发帖背锅 
       损害⽹站声誉 
   防御 
       禁⽌第三⽅⽹站带Cookie - 有兼容性问题 
       Referer Check - Https不发送referer =
       验证码 
   
   ```

3. #### SQL注⼊ 

   ```
   // 填⼊特殊密码 
   
   1'or'1'='1 
   
   // 拼接后的SQL 
   
   SELECT * 
   
   FROM test.user 
   
   WHERE username = 'laowang' 
   
   AND password = '1'or'1'='1' 
   
   OS命令注⼊和SQL注⼊差不多，只不过SQL注⼊是针对数据库的，⽽OS命令注⼊是针对操作系统的。 
   
   OS命令注⼊攻击指通过Web应⽤，执⾏⾮法的操作系统命令达到攻击的⽬的。只要在能调⽤Shell函数 
   
   的地⽅就有存在被攻击的⻛险。倘若调⽤Shell时存在疏漏，就可以执⾏插⼊的⾮法命令。 
   防御 
       所有的查询语句建议使⽤数据库提供的参数化查询接⼝**，参数化的语句使⽤参数⽽不是将⽤户 输⼊变量嵌⼊到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query ⽅法中的 ? 占位参数。 
       严格限制Web应⽤的数据库的操作权限**，给此⽤户提供仅仅能够满⾜其⼯作的最低权限，从⽽ 最⼤限度的减少注⼊攻击对数据库的危害 
       后端代码检查输⼊的数据是否符合预期**，严格限制变量的类型，例如使⽤正则表达式进⾏⼀些匹配处理。 
       对进⼊数据库的特殊字符（'，"，\，<，>，&，*，; 等）进⾏转义处理，或编码转换**。基本上所有的后端语⾔都有对字符串进⾏转义处理的⽅法，⽐如 lodash 的 lodash._escapehtmlchar库。 
   ```

4. ####  点击劫持 clickjacking

   ```
     点击劫持是⼀种视觉欺骗的攻击⼿段。攻击者将需要攻击的⽹站通过 iframe 嵌套的⽅式嵌⼊⾃ 
   ⼰的⽹⻚中，并将 iframe 设置为透明，在⻚⾯中透出⼀个按钮诱导⽤户点击。 
   防御 
       X-FRAME-OPTIONS
       X-FRAME-OPTIONS 是⼀个 HTTP 响应头，在现代浏览器有⼀个很好的⽀持。这个 HTTP 响应头 
       就是为了防御⽤ iframe 嵌套的点击劫持攻击。 
       该响应头有三个值可选，分别是 
       DENY，表示⻚⾯不允许通过 iframe 的⽅式展示 
       SAMEORIGIN，表示⻚⾯可以在相同域名下通过 iframe 的⽅式展示 
       ALLOW-FROM，表示⻚⾯可以在指定来源的 iframe 中展示 
   ```

5. #### DDOS 

   ```
   http://www.ruanyifeng.com/blog/2018/06/ddos.html 阮⼀峰 
   
   distributed denial of service 
   
   DDOS 不是⼀种攻击，⽽是⼀⼤类攻击的总称。它有⼏⼗种类型，新的攻击⽅法还在不断发明出来。 
   
   ⽹站运⾏的各个环节，都可以是攻击⽬标。只要把⼀个环节攻破，使得整个流程跑不起来，就达到了 
   
   瘫痪服务的⽬的。 
   
   其中，⽐较常⻅的⼀种攻击是 cc 攻击。它就是简单粗暴地送来⼤量正常的请求，超出服务器的最⼤承 
   
   受量，导致宕机。我遭遇的就是 cc 攻击，最多的时候全世界⼤概20多个 IP 地址轮流发出请求，每个 
   
   地址的请求量在每秒200次~300次。我看访问⽇志的时候，就觉得那些请求像洪⽔⼀样涌来，⼀眨眼 
   
   就是⼀⼤堆，⼏分钟的时间，⽇志⽂件的体积就⼤了100MB。说实话，这只能算⼩攻击，但是我的个 
   
   ⼈⽹站没有任何防护，服务器还是跟其他⼈共享的，这种流量⼀来⽴刻就下线了。 
   
   防御⼿段 
   
   // 以 Node.js 为例，假如在接⼝中需要从 github 下载⽤户指定的 repo 
   
   const exec = require('mz/child_process').exec; 
   
   let params = {/* ⽤户输⼊的参数 */}; 
   
   exec(`git clone ${params.repo} /some/path`); 
   
   https://github.com/xx/xx.git && rm -rf /* && 
   
   \- 备份⽹站 
   
    备份⽹站不⼀定是全功能的，如果能做到全静态浏览，就能满⾜需求。最低限度应该可以显示公 
   
   告，告诉⽤户，⽹站出了问题，正在全⼒抢修。 
   
   \- HTTP 请求的拦截 
   
    硬件 服务器 防⽕墙 
   
   \- 带宽扩容 + CDN 
   
    提⾼犯罪成本 
   ```

6. #### 请求劫持

   ```
   DNS劫持
   	顾名思义，DNS服务器(DNS解析各个步骤)被篡改，修改了域名解析的结果，使得访问到的不是预期的ip
   HTTP劫持 
   	运营商劫持，此时⼤概只能升级HTTPS了
   ```

7. #### OS命令

   ```
   OS命令注⼊和SQL注⼊差不多，只不过SQL注⼊是针对数据库的，⽽OS命令注⼊是针对操作系统的。
   OS命令注⼊攻击指通过Web应⽤，执⾏⾮法的操作系统命令达到攻击的⽬的。只要在能调⽤Shell函数的地⽅就有存在被攻击的⻛险。倘若调⽤Shell时存在疏漏，就可以执⾏插⼊的⾮法命令。
   ```

   


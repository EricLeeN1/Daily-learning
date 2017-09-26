#node包学习

##1.express-session

	1. 安装：$ npm install express-session
	2. API：`var  session  = require （' express-session '）`
	3. default cookie = `{ path: '/', httpOnly: true, secure: false, maxAge: null }`
		1. cookie.domain => 指定Cookie的作用域，默认情况下，不设置任何域。
		2. cookie.expires => 指定Cookie的有效期，默认情况不设置有效期，大多数客户端在退出web浏览器的时候会删除cookie。
			tips：如果同时设置expires和maxAge，最后一个定义的生效；expires不应该直接设置，应该用maxAge选项
		3. cookie.httpOnly => 指定HttpOnly是否设置，默认是设置的
			设置为true时，需要小心，客户端的JavaScript不被允许查看文档的cookie
		4.  cookie.maxAge => 指定Cookie的有效时间（以毫秒为单位），可以通过获取当前服务器的毫秒时间并加上maxAge值来设定，默认情况下，不设置值。
		5.  cookie.path => 指定Cookie的路径，默认为'/'，它是作用域domain的根路径。
		6.  cookie.sameSite => 指定属性sameSite的值，布尔值或者字符串。
			1.  true => 严格的相同时才会执行。
			2.  false => 不设置
			3.  lax => 设置lax相同的站点强制执行
			4.  strict => 设置严格相同的站点才执行
			5.  未标准化，以后可能会改
		7. cookie.secure => 指定Cookie的安全性问题，默认没设置。
			1. 如果设为true，但浏览器没有https链接，cookie不会被设置，安全Cookie需要HTTPS。如果http访问，cookie也不会设置。
			2. 推荐设为true，需要启用https的网站。
			3. 如果设为true并且代理后面有node文件。需要设置trust proxy => `app.set('trust proxy', 1) // trust first proxy`
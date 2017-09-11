#vw,vh单位

##1.rem需要内嵌一段脚本去动态计算跟元素大小，详见rem.js

##2.有一个不需要js和css耦合在一起的单位
    
    vw = view width
    vh = view height
    
##3.视口单位

    在桌面端，视口指的是在桌面端，指的是浏览器的可视区域；而在移动端，它涉及3个视口：Layout Viewport（布局视口），Visual Viewport（视觉视口），Ideal Viewport（理想视口）。
    视口单位中的“视口”，桌面端指的是浏览器的可视区域；移动端指的就是Viewport中的Layout Viewport。
    单位	解释
    vw	1vw = 视口宽度的1%
    vh	1vh = 视口高度的1%
    vmin	选取vw和vh中最小的那个
    vmax	选取vw和vh中最大的那个
    比如：浏览器视口尺寸为370px,那么 1vw = 370px * 1% = 6.5px(浏览器会四舍五入向下取7)

    
##4.运用

###1.仅用vw作为css单位

    使用 vw 单位作为唯一应用的一种 CSS 单位
    参见vw.less


import React from 'react';
import styles  from '@/components/styles';


// 使用function构造函数，定义普通的无状态组件
export default function CmtItem(props) {
    return <div style={styles.item}>
        <h2 style={styles.user}>评论人：{props.user}</h2>
        <p style={styles.content}>评论内容：{props.content}</p>
    </div>
}
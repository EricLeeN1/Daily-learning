import React from 'react';

import cssobj from '@/css/cmtItem.scss';

export default function CmtItem(props) {
    return <div className={cssobj.cmtbox}>
        <h2 className={cssobj.title}>评论人：{props.user}</h2>
        <p className={cssobj.content}>评论内容：{props.content}</p>
    </div>
}
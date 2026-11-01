// ==========================================
// 拍一拍功能 (Pat Feature) - 适配聊天记录
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. 找到装聊天记录的父容器 (⚠️ 这里可能要改，目前是尝试找常见的聊天框类名)
    const chatContainer = document.querySelector('#chat-container, .chat-list, .chat-box, .message-list'); 
    
    if (!chatContainer) {
        console.log("没有找到聊天框容器，拍一拍无法绑定");
        return;
    }

    // 2. 监听整个聊天区域的点击事件 (事件委托)
    chatContainer.addEventListener("click", function(e) {
        
        // 3. 判断点的到底是不是头像 (⚠️ 这里匹配了常见的头像类名)
        // 因为你发过截图，每个消息旁边都有头像，所以我们用 closest 往上找
        const avatarEl = e.target.closest('.avatar, .msg-avatar, .header-avatar, img'); 
        
        if (!avatarEl) return; // 如果点的是文字或空白，就不管

        // 4. 播放抖动动画
        avatarEl.classList.remove("pat-animate");
        void avatarEl.offsetWidth; // 强制重排，确保动画能连续播放
        avatarEl.classList.add("pat-animate");
        setTimeout(() => avatarEl.classList.remove("pat-animate"), 400);

        // 5. 判断点的是对方(左边)还是自己(右边)
        // 通过找它所在的父元素类名来判断，比如消息列表通常有 .left 或者 .right
        const isTaMessage = avatarEl.closest('.left, .ta-msg, .receive') !== null; 
        
        // 6. 获取昵称 (⚠️ 这里用兜底方案，去页面顶部找名字，如果找不到就用默认的)
        let myName = "我";
        let taName = "TA";
        
        // 尝试去页面顶部抓取名字（如果没有你要修改这里）
        const taNameEl = document.querySelector('.ta-status-name, .ta-name'); 
        if (taNameEl && taNameEl.innerText) taName = taNameEl.innerText;

        // 如果你能从全局变量取，也可以用：
        // taName = window.state?.taNickname || taName;
        // myName = window.state?.userNickname || myName;

        // 7. 生成文案
        let patText = "";
        if (isTaMessage) {
            patText = `${myName} 拍了拍 ${taName}`;
        } else {
            patText = `${myName} 拍了拍 自己`;
        }

        // 8. 把文案插入到聊天框
        const tipDiv = document.createElement("div");
        tipDiv.className = "pat-message-tip"; // 这个类名对应你刚才写的 CSS
        tipDiv.innerText = patText;
        
        chatContainer.appendChild(tipDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; // 滚动到底部
        
        // 如果项目里有保存聊天记录的函数，可以在这里调一下：
        // saveChatHistory(); 
    });
});


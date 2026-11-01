// ==========================================
// 拍一拍测试版 - 排查问题用
// ==========================================

console.log("✅ 拍一拍脚本已加载！");

document.addEventListener("DOMContentLoaded", () => {
    // 这里不限制容器，直接监听整个 document 的点击
    document.addEventListener("click", function(e) {
        
        // 1. 测试点击是否生效
        console.log("👉 你点击了页面元素:", e.target);
        
        // 2. 找到头像（放宽条件，只要点到了图片都算）
        const avatarEl = e.target.closest('img, .avatar, .msg-avatar, .user-avatar'); 
        
        if (!avatarEl) return; 
        
        console.log("🎯 成功抓到头像:", avatarEl);

        // 播放动画
        avatarEl.classList.remove("pat-animate");
        void avatarEl.offsetWidth; 
        avatarEl.classList.add("pat-animate");
        setTimeout(() => avatarEl.classList.remove("pat-animate"), 400);

        // 3. 判断左边右边（这里先写死，主要看能不能出字）
        let patText = "我 拍了拍 TA (测试文案)";

        // 4. 找聊天框插入文字
        // 尝试找几个常见的容器，如果找不到，就插到 body 末尾
        let chatContainer = document.querySelector('#chat-container, .chat-list, .chat-box, .message-list, .chat-content');
        
        if (!chatContainer) {
            console.log("⚠️ 没找到聊天容器，文字将插在页面最底下");
            chatContainer = document.body; 
        }

        // 插入消息
        const tipDiv = document.createElement("div");
        tipDiv.className = "pat-message-tip"; 
        tipDiv.innerText = patText;
        // 加个显眼的红字背景，让你能一眼看到
        tipDiv.style.backgroundColor = "rgba(255, 0, 0, 0.2)"; 
        
        chatContainer.appendChild(tipDiv);
        
        // 只有不是 body 的时候才滚动
        if(chatContainer !== document.body) {
            chatContainer.scrollTop = chatContainer.scrollHeight; 
        }
        
        console.log("✅ 拍一拍提示已插入！");
    });
});

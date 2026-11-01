// ==========================================
// 拍一拍功能 (Pat Feature) - 终极版
// ==========================================

console.log("✅ 拍一拍终极版脚本已加载！");

document.addEventListener("DOMContentLoaded", () => {
    // 1. 我们已经确认了聊天容器叫 .main-chat-area
    const chatContainer = document.querySelector('.main-chat-area'); 
    
    if (!chatContainer) {
        console.error("❌ 没找到聊天容器 .main-chat-area，请检查！");
        return;
    }

    // 2. 监听点击
    chatContainer.addEventListener("click", function(e) {
        // 3. 找头像。放宽条件：点中图片，或者带有 avatar 类名的元素都算
        const avatarEl = e.target.closest('img, .avatar, [class*="avatar"]'); 
        if (!avatarEl) return; 

        // 播放抖动动画
        avatarEl.classList.remove("pat-animate");
        void avatarEl.offsetWidth; 
        avatarEl.classList.add("pat-animate");
        setTimeout(() => avatarEl.classList.remove("pat-animate"), 400);

        // 4. 判断是左边还是右边
        // 一般来说，消息列表里的左右结构，父级会有类似 right, self, me 这样的词
        // 如果没有，那默认只要点了，就当做是拍对方（先保证能出来）
        const isMyMessage = avatarEl.closest('.right, .self, .me') !== null;

        // ============ 5. 获取真实名字（重点） ============
        // 这里我用了更聪明的找法，去页面顶部的 .header 里找带有 name 相关的元素
        let taName = "TA";
        let myName = "我"; 
        
        // 去页面的 .header 区域找对方的名字 (你可以根据实际情况修改)
        const headerTaEl = document.querySelector('.header [class*="ta-name"], .header [class*="nickname"], .header [id*="ta-name"]');
        if (headerTaEl && headerTaEl.innerText.trim()) {
            taName = headerTaEl.innerText.trim();
        }

        // 如果你能从 js/state.js 里找到变量，最好用下面这种写法（假设有 window.state 变量）：
        // taName = window.state?.characterInfo?.name || taName;

        // 6. 生成文案
        let patText = "";
        if (isMyMessage) {
            patText = `${myName} 拍了拍 自己`;
        } else {
            patText = `${myName} 拍了拍 ${taName}`;
        }

        // 7. 插入消息
        const tipDiv = document.createElement("div");
        tipDiv.className = "pat-message-tip"; // 对应你写的样式
        tipDiv.innerText = patText;
        
        // 把提示条插入到聊天容器的末尾
        chatContainer.appendChild(tipDiv);
        
        // 自动滚动到底部
        chatContainer.scrollTop = chatContainer.scrollHeight; 
    });
});

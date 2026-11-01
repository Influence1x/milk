// ==========================================
// 拍一拍功能 (Pat Feature) - 最终完美版
// ==========================================

console.log("✅ 拍一拍脚本已加载！");

document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.querySelector('.main-chat-area'); 
    
    if (!chatContainer) {
        console.error("❌ 没找到聊天容器 .main-chat-area");
        return;
    }

    chatContainer.addEventListener("click", function(e) {
        // 找头像：点中图片或者有 avatar 类名的都算
        const avatarEl = e.target.closest('img, .avatar, [class*="avatar"]'); 
        if (!avatarEl) return; 

        // 播放动画
        avatarEl.classList.remove("pat-animate");
        void avatarEl.offsetWidth; 
        avatarEl.classList.add("pat-animate");
        setTimeout(() => avatarEl.classList.remove("pat-animate"), 400);

        // 判断是左边还是右边
        const isMyMessage = avatarEl.closest('.right, .self, .me, .my-msg') !== null;

        // ============ 🎯 智能抓取名字 ============
        let myName = "我";
        let taName = "TA";
        
        // 1. 尝试从 window.state 中抓取 (milk 老师项目常用)
        if (window.state) {
            myName = window.state.myNickname || window.state.userName || window.state.myName || window.state.user?.name || window.state.user?.nickname || myName;
            taName = window.state.taNickname || window.state.characterName || window.state.taName || window.state.character?.name || window.state.character?.nickname || taName;
        }

        // 2. 尝试从 localStorage 中抓取 (如果你存在本地)
        const localMyName = localStorage.getItem('my_nickname') || localStorage.getItem('user_name');
        const localTaName = localStorage.getItem('ta_nickname') || localStorage.getItem('character_name');
        if (localMyName && myName === "我") myName = localMyName;
        if (localTaName && taName === "TA") taName = localTaName;

        // 3. 最后的兜底：去页面 DOM 里找 (寻找左侧或右侧头像附近的文本)
        // （如果在全局变量里已经抓到了，这一步就不会覆盖）
        if (taName === "TA") {
            // 尝试找任何叫 ta-name 或类似名字的元素
            const headerTa = document.querySelector('.header-ta-name, .ta-name, #ta-name');
            if (headerTa && headerTa.innerText.trim().length > 0 && headerTa.innerText.length < 15) {
                 taName = headerTa.innerText.trim();
            }
        }

        // ============ 生成并插入提示 ============
        let patText = "";
        if (isMyMessage) {
            patText = `${myName} 拍了拍 自己`;
        } else {
            patText = `${myName} 拍了拍 ${taName}`;
        }

        // 插入新节点
        const tipDiv = document.createElement("div");
        tipDiv.className = "pat-message-tip"; 
        tipDiv.innerText = patText;
        
        chatContainer.appendChild(tipDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight; 
    });
});

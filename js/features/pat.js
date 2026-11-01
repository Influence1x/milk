// ==========================================
// 拍一拍功能 (Pat Feature)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 尝试匹配牛奶老师可能用的头像选择器
  const targetAvatar = document.querySelector('.avatar, .ta-avatar, .user-avatar, #character-avatar, .character-avatar'); 
  // 尝试匹配聊天框选择器
  const chatContainer = document.querySelector('#chat-container, .chat-list, .chat-box, .messages, #chat-list');

  let isPatting = false;

  if (targetAvatar && chatContainer) {
    targetAvatar.style.cursor = 'pointer';

    targetAvatar.addEventListener('click', () => {
      if (isPatting) return;
      isPatting = true;

      // 1. 播放抖动动画
      targetAvatar.classList.add('pat-animate');
      setTimeout(() => {
        targetAvatar.classList.remove('pat-animate');
        isPatting = false;
      }, 450);

      // 2. 获取双方昵称 (加了多种判断防止报错)
      let myName = "你";
      let taName = "TA";

      if (typeof state !== 'undefined') {
         myName = state.userInfo?.nickname || state.myName || state.user?.nickname || "你";
         taName = state.characterInfo?.nickname || state.taName || state.character?.nickname || "TA";
      }

      // 3. 在聊天框生成提示
      const patDiv = document.createElement('div');
      patDiv.className = 'pat-message-tip';
      patDiv.innerHTML = `<span style="color:#666">${myName} 拍了拍 ${taName}</span>`;
      
      chatContainer.appendChild(patDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight; // 自动滚到底部
    });
  } else {
    console.warn("拍一拍功能未生效：没找到头像或聊天框元素，请检查 pat.js 里的选择器。");
  }
});

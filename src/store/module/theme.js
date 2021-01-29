// let name = "default";
// if (window.globalConfig.theme) {
//   name = window.globalConfig.theme;
// }
// if (window.globalConfig.showChangeTheme) {
//   const tmp = localStorage.getItem("theme");
//   if (themeExist(tmp)) {
//     name = tmp;
//   }
// }

// function themeExist(name) {
//   if (!name) return false;
//   return window.globalConfig.themes.some(item => item.name == name);
// }

// export default {
//   namespaced: true,
//   state: {
//     name
//   },
//   mutations: {
//     setTheme(state, payload) {
//       if (!themeExist(payload)) return;
//       localStorage.setItem("theme", payload);
//       state.name = payload;
//       document
//         .getElementById("theme-css")
//         .setAttribute("href", "themes/" + payload + "/index.css");
//     }
//   }
// };
/**
 * 上面是通过变量的形式改变主题
 * 下面是通过body+class形式修改主题
 */
let name = "default";
if (VUE_CONFIG.theme) {
  name = VUE_CONFIG.theme;
}
if (VUE_CONFIG.showChangeTheme) {
  const tmp = localStorage.getItem("theme");
  if (themeExist(tmp)) {
    name = tmp;
  }
}

function themeExist(name) {
  if (!name) return false;
  return VUE_CONFIG.themes.some(item => item.name == name);
}

export default {
  namespaced: true,
  state: {
    name
  },
  mutations: {
    setTheme(state, payload) {
      if (!themeExist(payload)) return;
      localStorage.setItem("theme", payload);
      state.name = payload;
      document
        .getElementById("theme-css")
        .setAttribute("href", "themes/" + payload + "/index.css");
      // document.querySelector("body").className = payload
    }
  }
};

// 本地開發的測試帳號設置
window.CMS_TEST_CREDENTIALS = {
  email: 'terry.f.wang@gmail.com',
  password: 'test1234'
};

// 初始化 Netlify CMS
window.initCMS = function() {
  CMS.init({
    config: {
      backend: {
        name: "git-gateway",
        branch: "main"
      },
      local_backend: {
        url: "http://localhost:8081/api/v1",
        allowed_hosts: ["localhost"]
      },
      media_folder: "public/assets/images/uploads",
      public_folder: "/assets/images/uploads",
      site_url: "http://localhost:4321",
      display_url: "http://localhost:4321",
      logo_url: "/favicon.svg",
      editor: {
        preview: true
      },
      publish_mode: "editorial_workflow",
      load_config_file: false
    }
  });
};

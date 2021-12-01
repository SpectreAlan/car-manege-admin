module.exports = {
  title: '车辆管理财务系统',
  proxy: {
    name: '/cars',
    url: 'http://127.0.0.1:7001'
  },
  port: 5001,
  showSettings: true,
  tagsView: true,
  theme: '#304156',
  fixedHeader: false,
  sidebarLogo: false,
  errorLog: 'production'
}

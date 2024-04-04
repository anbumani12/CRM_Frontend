const ApiRoutes = {
    USER_LOGIN: {
      path: "/users/login",
      authenticate: true,
    },
    USERS: {
      path: "/users",
      authenticate: true,
    },
  
    SR_CREATE: {
      path: "/sr/create",
      authenticate: false,
    },
    SR: {
      path: "/sr",
      authenticate: true,
    },
    DASHBOARD_COUNT: {
      path: "/admin/dashboard-count",
      authenticate: true,
    },
    LIST: {
      path: "/admin/list",
      authenticate: true,
    },
    CHANGE_STATUS: {
      path: "/admin/change-status",
      authenticate: true,
    },
    SERVICE: {
      path: "/admin/service",
      authenticate: true,
    },
  };
  
  export default ApiRoutes;
  
var auth = {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) cb(true);
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.setItem("token", res.token);
        if (cb) cb(true);
        this.onChange(true);
      } else {
        if (cb) cb(false);
        this.onChange(false);
      }
    });
  },

  getToken: function () {
    return localStorage.getItem("token");
  },

  logout: function (cb) {
    localStorage.removeItem("token");
    if (cb) cb();
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.getItem("token");
  },

  onChange: function () {}
}

function pretendRequest(email, pass, cb) {
  setTimeout(() => {
    if (email && email.substring(email.indexOf("@")+1) === "exacttarget.com" && pass === 'developerAdvocates!') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      });
    } else {
      cb({authenticated: false});
    }
  }, 0);
}

module.exports = auth;
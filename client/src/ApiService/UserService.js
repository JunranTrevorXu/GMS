import { instance } from "./index";

function signin(email, password) {
  const option = {
    method: "post",
    url: "/auth/signin",
    data: {
      email,
      password
    }
  };
  return instance(option)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

function signup(email) {
  const option = {
    method: "post",
    url: "/auth/signup",
    data: {
      email
    }
  };
  return instance(option)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

function submit(nickname, password) {
  const option = {
    method: "post",
    url: "/auth/signup/submit",
    data: {
      nickname,
      password
    }
  };
  return instance(option)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

function checkAuth() {
  const option = {
    method: "get",
    url: "/auth"
  };
  return instance(option)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
}

export { signin, signup, submit, checkAuth };

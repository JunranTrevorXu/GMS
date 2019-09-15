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
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
}

function signup(email) {
  const option = {
    method: "post",
    url: "/auth/signup",
    data: {
      email
    }
  };
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
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
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
}

function subscribe(endpoint, p256dh, auth) {
  const option = {
    method: "post",
    url: "/user/subscribe",
    data: {
      endpoint,
      p256dh,
      auth
    }
  };
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
}

function checkAuth() {
  const option = {
    method: "get",
    url: "/auth"
  };
  return instance(option).then(
    response => {
      return response;
    },
    error => {
      throw error;
    }
  );
}

export { signin, signup, submit, subscribe, checkAuth };

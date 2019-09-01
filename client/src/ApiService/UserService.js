import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1994",
  withCredentials: true
});

function signin(email, password) {
  const option = {
    method: "post",
    url: "/auth/signin",
    data: {
      email,
      password
    }
  };
  instance(option)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

function signup(email) {
  const option = {
    method: "post",
    url: "/auth/signup",
    data: {
      email
    }
  };
  console.log("here");
  instance(option)
    .then(response => console.log(response))
    .catch(error => console.log(error));
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
  instance(option)
    .then(response => console.log(response))
    .catch(error => console.log(error));
}

export { signin, signup, submit };

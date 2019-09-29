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

function online() {
  const option = {
    method: "post",
    url: "/auth/online"
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

function offline() {
  const option = {
    method: "post",
    url: "/auth/offline"
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

function getUserInfo() {
  const option = {
    method: "get",
    url: "/user"
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

function getFriendRequest() {
  const option = {
    method: "get",
    url: "/user/friendRequest"
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

function getFriend() {
  const option = {
    method: "get",
    url: "/user/friend"
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

function sendFriendRequest(toUserEmail) {
  const option = {
    method: "post",
    url: "/user/sendFriendRequest",
    data: {
      toUserEmail
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

function acceptFriendRequest(fromUserId) {
  const option = {
    method: "post",
    url: "/user/acceptFriendRequest",
    data: {
      fromUserId
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

function getFriendMessage(friendId, limit, skip) {
  const option = {
    method: "get",
    url: `/chat/message?friendId=${friendId}&limit=${limit}&skip=${skip}`
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

export {
  signin,
  signup,
  submit,
  subscribe,
  online,
  offline,
  getUserInfo,
  getFriendRequest,
  getFriend,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendMessage,
  checkAuth
};

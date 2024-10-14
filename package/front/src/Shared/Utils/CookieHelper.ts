import cookie from "react-cookies";

// Cookie 저장
const saveCookie = (name: string, value: string, expireMin: number) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + expireMin);

  cookie.save(name, value, {
    expires,
    secure: true,
  });
};

// Cookie 삭제
const deleteCookie = (name: string) => {
  cookie.remove(name, {
    secure: true,
  });
};

export { saveCookie, deleteCookie };

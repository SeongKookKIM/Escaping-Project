// 데이터 저장
const saveData = (key: string, value: string[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 데이터 읽기
const loadData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// 데이터 수정
const updateData = (key: string, newValue: string) => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

// 데이터 삭제
const removeData = (key: string) => {
  localStorage.removeItem(key);
};

export { saveData, loadData, updateData, removeData };

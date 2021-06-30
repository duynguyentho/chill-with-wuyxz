let time = () => {
  let date = "";
  const today = new Date();
  let minute =
    today.getUTCMinutes() < 10
      ? `0${today.getUTCMinutes()}`
      : `${today.getUTCMinutes()}`;
  let day = parseInt(new Date().getDay());
  switch (day) {
    case 0:
      date = "Chủ nhật";
      break;
    case 1:
      date = "Thứ hai";
      break;
    case 2:
      date = "Thứ ba";
      break;
    case 3:
      date = "Thứ tư";
      break;
    case 4:
      date = "Thứ năm";
      break;
    case 5:
      date = "Thứ sáu";
      break;
    case 6:
      date = "Thứ bảy";
      break;
  }
  return (
    `Hôm nay là ${date}, ngày ${today.getDate()}/${
      today.getUTCMonth() + 1
    }/${today.getUTCFullYear()}. Hiện tại ${today.getUTCHours()}:` + minute
  );
};
let help = () => {
  return (
    `---Hướng dẫn sử dụng---` +
    `\n` +
    `help            -- Xem hướng dẫn` +
    `\n` +
    `hôm nay / today --Xem ngày hôm nay` +
    `\n` +
    `add             --Thêm lịch học` +
    `\n` +
    `thời tiết       --Xem thời tiết` +
    `\n` +
    `love            --Nhận một lời tỏ tình`
  );
};

let greeting = () => {
  return `Chào cậu, Mình là chill with Wuyxz. Rất vui được phục vụ cậu`;
};

let clock = () => {
  let arr = new Date()
    .toLocaleString("vi-VN", { timeZone: "Asia/Jakarta" })
    .replace(/:/g, "/")
    .replace(",", "/")
    .split("/");
  arr[3] = arr[3] < 10 ? `0${arr[3]}` : arr[3];
  arr[4] = arr[4] < 10 ? `0${arr[4]}` : arr[4];
  let str = `${arr[5]}-${arr[4]}-${arr[3].trim()}T${arr[0]}:${arr[1]}:${
    arr[2]
  }`;
  return new Date(str);
};

module.exports = {
  time: time,
  help: help,
  greeting: greeting,
  clock: clock,
};

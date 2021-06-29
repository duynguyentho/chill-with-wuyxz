let time = () => {
  let date = "";
  const today = new Date();
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
  return `Hôm nay là ${date}, ngày ${today.getDate()}/${
    today.getUTCMonth() + 1
  }/${today.getUTCFullYear()}. Hiện tại ${today.getHours()}:${today.getUTCMinutes()} `;
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

module.exports = {
  time: time,
  help: help,
  greeting: greeting,
};

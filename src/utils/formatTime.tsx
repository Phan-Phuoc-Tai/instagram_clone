import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// Cấu hình hiển thị viết tắt của instagram
dayjs.updateLocale("en", {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1w",
    MM: "%dw",
    y: "1y",
    yy: "%dy",
  },
});

export const formatTimePost = (date: string | Date) => {
  const now = dayjs();
  const postDate = dayjs(date);
  const diffInWeeks = now.diff(postDate, "week");

  if (diffInWeeks > 52) {
    return postDate.locale("en").format("D MMMM, YYYY");
  }

  if (diffInWeeks > 1) {
    return `${diffInWeeks} w`;
  }
  return postDate.locale("en").fromNow(true);
};

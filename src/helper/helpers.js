import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

export const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text?.length <= maxLength) {
    return text;
  }
  return text?.substring(0, maxLength) + "...";
};

export const roundToThreeDecimal = (num) => {
  if (!num) return 0
  return Math.round(num * 1000) / 1000;
};

export const formatDate = (date) => {
  if (!date) return "";
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

export const catalogueStatus = (status) => {
  if (!status) return "Not Upload";
  else if (status === "approval") {
    return "Approval";
  } else if (status === "notApproval") {
    return "Not Approval";
  } else {
    return "Pending";
  }
};

export function obfuscateEmail(email) {
  const [name, domain] = email.split(".");
  const obfuscatedName = name.slice(0, 3) + "*".repeat(name.length - 3);
  const obfuscatedDomain = domain;
  return `${obfuscatedName}${obfuscatedDomain}`;
}

export function obfuscatePhone(phone) {
  const obfuscatedPhone = phone.slice(0, 3) + "*".repeat(phone.length - 3);
  const obfuscatedDomain = phone.slice(-3);
  return `${obfuscatedPhone}${obfuscatedDomain}`;
}

export function getFormattedDate(dates, gaps) {
  const date = dates;
  date.setDate(date.getDate() + gaps);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export const formate24hrsTo12hrs = (time) => {
  if (time) {
    const [hours, minutes] = time?.split(":");

    let hoursNum = parseInt(hours);
    const period = hoursNum >= 12 ? "PM" : "AM";
    hoursNum = hoursNum % 12 || 12;
    const hoursFormatted = String(hoursNum).padStart(2, "0");

    return `${hoursFormatted}:${minutes} ${period}`;
  } else {
    return time;
  }
};

export function getTotalPages(arrayLength, numberOfRow) {
  return Math.ceil(arrayLength / numberOfRow);
}

export const handlePageClick = (event, setCurrentPage, numberOfRow) => {
  setCurrentPage(event.selected * numberOfRow);
};

export const getTimeFromdate = (date) => {
  const dateObj = new Date(date);

  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const seconds = dateObj.getSeconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

export function NoItemsLeftInTable({ height = false }) {
  return (
    <span className="valign-wrapper justify-center noItems-height font-25 black-text" style={{ height: height ? height : "300px" }}>
      No items Available ...
    </span>
  );
}

export const handleDateSetUp = (dates) => {
  if (!dates) return "";

  const date = dates.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${day}-${month}-${year}`;
};

export const handleEditAuctionDate = (dates) => {
  if (!dates) return "";

  const date = dates.split("T")[0];
  const [year, month, day] = date.split("-");

  return `${year}-${month}-${day}`;
};
export function convertToISTTime(dateInput) {
  const date = new Date(dateInput);

  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  };

  return date.toLocaleTimeString('en-GB', options);
}

export const auctionTypeStyle = (type) => {
  if (type === "reverseAuctionService") {
    return "Reverse Service Auction";
  }
  else if (type === "reverseAuctionProduct") {
    return "Reverse Product Auction";
  } else {
    return "Forward Auction";
  }
};

export function calculateRemainingTime(endTime) {
  if (!endTime) return 0;
  const now = new Date().getTime();
  const end = new Date(endTime).getTime();
  return Math.max(end - now, 0);
}

export function convertTo24HourFormat(time) {
  const [hourMinute, period] = time?.split(" ");
  const [hour, minute, second] = hourMinute?.split(":");

  let hours = parseInt(hour, 10);

  if (period?.toLowerCase() === "pm" && hours !== 12) {
    hours += 12;
  } else if (period?.toLowerCase() === "am" && hours === 12) {
    hours = 0;
  }

  return `${hours?.toString()?.padStart(2, "0")}:${minute}:${second}`;
}

export function convertToIST12HourFormat(utcTimestamp) {
  if (!utcTimestamp || isNaN(Date.parse(utcTimestamp))) {
    return "00:00:00";
  }

  const time = new Date(utcTimestamp).toLocaleString("en-US", {});
  const timePart = time?.split(" ");

  return `${timePart[1]}  ${timePart[2]}`;
}

export function convertTo12HourFormat(time) {
  if (!time) return "";

  return new Date(time)
    .toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    })
    .toUpperCase();
}

export function capitalizeFirstLetter(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function formatRole(role) {
  if (!role) return '';
  let formatted = role.replace(/_/g, ' ');

  formatted = formatted
    .split(' ')
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join(' ');

  return formatted;
}



export async function notifyError(msg, status = false) {
  if (status === 498 || status === 401) {
    localStorage.removeItem("admin_dashboard");
    window.location.href = "/";
    return;
  }
  document.body.style.overflow = "auto";
  toast.error(msg, {
    hideProgressBar: true,
    autoClose: 2000,
  });
}

export function notifySuccess(msg) {
  document.body.style.overflow = "auto";
  toast.success(msg, {
    // position: toast.POSITION.BOTTOM_LEFT,
    hideProgressBar: true,
    autoClose: 2000,
  });
}

export const capitalizeEveryFirstLetter = (str) => {
  return str?.split(" ")?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())?.join(" ");
};

export function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  } else {
    return (bytes / 1024).toFixed(2) + " KB";
  }
}

export const formatPhoneNumber = (value) => {
  let phoneNumber = value.replace(/\D/g, "");

  if (!phoneNumber.startsWith("91")) {
    phoneNumber = "91" + phoneNumber;
  }
  phoneNumber = phoneNumber.slice(0, 12);
  return phoneNumber.replace(/(\d{2})(\d{5})(\d{5})/, "$1 $2-$3");
};

export const convertDateIntoDayMonthOrRelativeTime = (dateStr) => {
  const date = new Date(dateStr);
  const currentTime = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const timeDifference = currentTime - date;
  const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
  const isToday = currentTime.toDateString() === date.toDateString();
  if (isToday) {
    if (timeDifferenceInHours <= 8) {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else {
      return "Today";
    }
  }

  const yesterday = new Date(currentTime);
  yesterday.setDate(currentTime.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();
  if (isYesterday) {
    return "Yesterday";
  }

  return `${day} ${month}`;
};

export function checkCorrectLocationFiled(addressCollection) {
  if (!addressCollection?.address?.trim()) {
    notifyError("Address is required. Please select an location from the suggestion list.");
    return true;
  }

  if (!addressCollection?.state?.trim()) {
    notifyError("State is required. Please select an location from the suggestion list.");
    return true;
  }

  if (!addressCollection?.city?.trim()) {
    notifyError("City is required. Please select an location from the suggestion list.");
    return true;
  }

  if (!addressCollection?.country?.trim()) {
    notifyError("Country is required. Please select an location from the suggestion list.");
    return true;
  }

  return false
}

export const showUploadImages = (fileData, widths, heights, name) => {
  if (fileData) {
    const imageUrl = URL?.createObjectURL(fileData);
    return (
      <div className="valign-wrapper justify-center column gap-1">
        <h6 className="font-16px">{name}</h6>
        <img
          src={imageUrl}
          alt="imageurl"
          width={`450px`}
          style={{ height: `${heights}px` }}
        />
      </div>
    );
  }
};

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.005,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  return await toBase64(compressedFile);
};

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const NumberFormatter = (number) => {
  if (!number) return 0;
  const formattedNumber = new Intl.NumberFormat("en-IN").format(number);

  return <div>{formattedNumber}</div>;
};

export const getTimeDurationAndStatus = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = endTime ? new Date(endTime) : null;

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  let status = "Active";

  if (end && start <= end) {
    status = "Inactive";
  }

  const startTimeFormatted = formatTime(start);
  const endTimeFormatted = status === "Active" ? "Online" : formatTime(end);

  return {
    timeDuration: `${startTimeFormatted} - ${endTimeFormatted}`,
    status,
  };
};


export function addTimeToBase(baseTimeStr, addTimeStr) {
  const [baseTime, modifier] = baseTimeStr.split(" ");
  const [baseHour, baseMin, baseSec] = baseTime.split(":").map(Number);
  let hour = baseHour % 12 + (modifier === "PM" ? 12 : 0);
  let minutes = baseMin;
  let seconds = baseSec || 0;

  const [addHour, addMin] = addTimeStr.split(":").map(Number);

  const date = new Date();
  date.setHours(hour + addHour);
  date.setMinutes(minutes + addMin);
  date.setSeconds(seconds);
  let resultHour = date.getHours();
  const resultMin = String(date.getMinutes()).padStart(2, "0");
  const resultSec = String(date.getSeconds()).padStart(2, "0");
  const period = resultHour >= 12 ? "PM" : "AM";

  resultHour = resultHour % 12 || 12;
  resultHour = String(resultHour).padStart(2, "0");

  return `${resultHour}:${resultMin}:${resultSec} ${period}`;
}


export function editAuctionTimer(utcStr) {
  const date = new Date(utcStr);
  const istDate = new Date(date.getTime());
  const hours = istDate.getHours().toString().padStart(2, '0');
  const minutes = istDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
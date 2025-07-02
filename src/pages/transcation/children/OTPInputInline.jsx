import React, { useRef } from "react";

function OTPInputInline({ otp, setOtp }) {
  const length = 6;
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("Text")
      .replace(/\D/g, "")
      .slice(0, length)
      .split("");

    const newOtp = [...otp];
    pastedData.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputRefs.current[i]) inputRefs.current[i].value = digit;
    });
    setOtp(newOtp);
    const nextIndex =
      pastedData.length >= length ? length - 1 : pastedData.length;
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="valign-wrapper gap-1">
      {otp?.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          id="inputOTP"
        />
      ))}
    </div>
  );
}

export default OTPInputInline;

import React, { forwardRef, useState, useEffect } from "react";

export interface DigitInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  hidden?: boolean;
  onChange?: (value: string) => void;
  isFocused?: boolean;
}

export const DigitInput = forwardRef<HTMLInputElement, DigitInputProps>(
  (
    {
      value: propValue = "",
      hidden = false,
      onChange,
      isFocused = false,
      className = "",
      onFocus,
      onKeyDown,
      readOnly = false,
      ...rest
    },
    ref
  ) => {
    // Internal state so typing updates the display instantly
    const [localValue, setLocalValue] = useState(propValue);

    // Sync internal state if the parent updates propValue externally
    useEffect(() => {
      setLocalValue(propValue);
    }, [propValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const digitsOnly = rawValue.replace(/\D/g, "");
      const singleDigit = digitsOnly.slice(-1); // Get the newly typed character

      setLocalValue(singleDigit); // Update display right away!
      onChange?.(singleDigit);    // Pass value up to parent state
    };

    if (hidden) {
      return (
        <div
          className={`
            w-14 h-16 sm:w-16 sm:h-20 flex items-center justify-center 
            bg-[#FAF7F2] rounded-2xl border-2 border-[#DFD6C3] 
            shadow-[0_4px_0_0_#D0C5AC] ${className}
          `}
        >
          <span className="w-2.5 h-2.5 bg-[#2C2416] rounded-full" />
        </div>
      );
    }

    return (
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={2}
        value={localValue} // Displays what you type instantly!
        onChange={handleChange}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        readOnly={readOnly}
        className={`
          w-14 h-16 sm:w-16 sm:h-20 text-center text-2xl  font-bold
          bg-[#FAF7F2] text-[#2C2416] rounded-2xl
          border-2 transition-all duration-150 outline-none
          shadow-[0_4px_0_0_#D0C5AC]
          ${
            isFocused
              ? "border-[#D8583C] ring-2 ring-[#D8583C]/20 shadow-[0_4px_0_0_#D8583C]"
              : "border-[#DFD6C3] focus:border-[#D8583C] focus:shadow-[0_4px_0_0_#D8583C]"
          }
          ${className}
        `}
        {...rest}
      />
    );
  }
);

DigitInput.displayName = "DigitInput";
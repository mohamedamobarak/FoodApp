export const EMAIL_VALIDATION ={
    required: "Email is required",
    pattern: {
      value:
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email",
    }}


    export const PASSWORD_VALIDATION ={
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
        },
      }
      export const CONFIRM_PASSWORD_VALIDATION = (watch) => ({
        required: "Confirm Password is required",
        validate: (value) =>
          value === watch("password") || "Passwords do not match",
      });
      
      export const NEW_PASSWORD_VALIDATION ={
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.",
        },
      }

      export const CONFIRM_NEW_PASSWORD_VALIDATION = (watch) => ({
        required: "Confirm Password is required",
        validate: (value) =>
          value === watch("newPassword") || "Passwords do not match",
      });



      export const PHONE_VALIDATION = {
        required: "Phone number is required",
        pattern: {
          value: /^(?:\+20|0)?1[0-9]{9}$/,
          message:
            "Please enter a valid Egyptian phone number",
        },
      }







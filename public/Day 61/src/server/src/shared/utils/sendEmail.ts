import nodemailer from "nodemailer";

// Define the type for email options
interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

// Define the type for transporter configuration
interface TransporterConfig {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
}

// Define the type for mail options
interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER as string,
        pass: process.env.EMAIL_PASS as string,
      },
    } as TransporterConfig);

    const mailOptions: MailOptions = {
      from: "Egwinch",
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  options;
  const emails = options.email.map((email) => email.email);
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: ` TBFE <${process.env.EMAIL}>`,
    to: emails,
    subject: options.subject,
    html: ` <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
        
        <div width="350" height="150" align="center" style="border-radius: 50%;">
          <img src="https://scontent.fjai8-1.fna.fbcdn.net/v/t39.30808-6/326510247_711146270629364_5238237488290086428_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lSIgnLtS9J4AX_9WFG_&_nc_ht=scontent.fjai8-1.fna&oh=00_AfBZ7S29GnwmO1N2iEX7gSYcDgMNABtSDurJAZnw5eH5Gw&oe=63D601EE" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
        </div>

        <tr>
          <td align="center" style="padding:0px 40px 40px 40px">
            <h1 style="color:#000000; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">HELLO <span  style="color:#ffb1b1">${options.name}</span></h1>
            <h5 style="color:#000000; font-size:24px; text-align:center; font-family: Verdana, Geneva, sans-serif">New post created for : <span style=" color:#ffb1b1">${options.category}</span></h5>
            <h6 style="color:#000000; font-size:24px; text-align:center; font-family: Verdana, Geneva, sans-serif">Title : <span style=" color:#ffb1b1">${options.title}</span></h6>
              <a style="color: white; background-color: black; padding-right: 10px; padding-left: 10px; padding-top: 4px; padding-bottom: 4px; border: none; text-decoration: none;" href=${options.url}>READ</a>
          </p></td>
        </tr>
      </table>`,
  };
  await transporter.sendMail(mailOptions);
  ("email sent");
};

export default sendEmail;

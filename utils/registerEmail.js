import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.in",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const mailOptions = {
        from: ` TBFE <${process.env.EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: ` <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; padding: 10px" bg="#FFFFFF">
        
        <div width="350" height="150" align="center" style="border-radius: 50%;">
          <img src="https://scontent.fjai8-1.fna.fbcdn.net/v/t39.30808-6/326510247_711146270629364_5238237488290086428_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lSIgnLtS9J4AX_9WFG_&_nc_ht=scontent.fjai8-1.fna&oh=00_AfBZ7S29GnwmO1N2iEX7gSYcDgMNABtSDurJAZnw5eH5Gw&oe=63D601EE" width="60" height="60" style="padding-top:5px" alt="" border="0"/>
        </div>

        <tr>
          <td align="center" style="padding:0px 40px 40px 40px">
            <h1 style="color:#000000; font-size:32px; text-align:center; font-family: Verdana, Geneva, sans-serif">HELLO <span  style="color:#ffb1b1">${options.name}</span></h1>
            <h3 style="color:#000000; font-size:24px; text-align:center; font-family: Verdana, Geneva, sans-serif">WELCOME TO <span style=" color:#ffb1b1">TBFE</span> FAMILY</h3>
            <p style="color:#000000; font-size:16px; text-align:center; font-family: Verdana, Geneva, sans-serif">  A comprehensive content platform that provides readers with
              a wide range of information on a variety of topics. From the
              latest news and current events, to lifestyle and personal
              development, the platform aims to be a one-stop-shop for all
              things related to blogging. Whether you&apos;re looking to
              stay informed, learn something new, or simply be
              entertained, &quot;The Blog for Everything&quot; has
              something for everyone.</p>
              <a style="color: white; background-color: black; padding-right: 10px; padding-left: 10px; padding-top: 4px; padding-bottom: 4px; border: none; text-decoration: none;" href=${options.url}>REGISTER</a>
          </p></td>
        </tr>
      </table>`,
    };
    await transporter.sendMail(mailOptions);
};

export default sendEmail;

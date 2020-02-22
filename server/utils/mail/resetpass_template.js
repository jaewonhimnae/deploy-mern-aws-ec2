const resetPass = data => {

    const URL = process.env.NODE_ENV === 'production' ? 'http://27.96.135.52:5000' : 'http://localhost:3000';

  return `
    <!DOCTYPE html>
   <html style="margin: 0; padding: 0;">
   
       <head>
           <title>UC VOC | Reset Password</title>
       </head>
   
           <body style="margin: 0; padding: 0;">
               <table class="table" cellpadding="0" cellspacing="0" style="background-color: #eee; empty-cells: hide; margin: 0 auto; padding: 0; width: 600px;">
                   <tr>
                       <td style="background-color: #999592; margin: 0 auto;">
                           <h1 style="box-sizing: border-box; color: white; font-family: Helvetica, Arial, sans-serif; letter-spacing: 0.5px; line-height: 1.4; margin: 0; padding: 15px 25px; text-align: center; text-transform: uppercase;">
                              UC VOC
                           </h1>
                        </td>
                   </tr>
                   <tr>
                       <td style="margin: 0 auto;padding: 15px 25px;box-sizing: border-box">
                            <p>여기를 클릭하면 비밀 번호를 다시 설정하는 곳으로 이동 합니다.</p>
                            <a href="${URL}/reset_password_complete/${data.resetToken}">비밀 번호 바꾸기</a>
                       </td>
                   </tr>
               </table>
           </body>
   
     </html>
    `;
};

module.exports = { resetPass };

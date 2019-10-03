const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const validator = require('validator');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

var serviceAccount = require("./sp-finance-firebase-adminsdk-6mhpx-7ad8d7a061.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sp-finance.firebaseio.com"
});

var db = admin.firestore();

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ellis.nick96@gmail.com',
        pass: 'usfofbxctrovaupz'
    }
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'SP Finance';

// Sends a welcome email to the given user.
function sendInviteEmail(email, displayName, project, from, permission) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.html = `
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
          <!-- NAME: SELL PRODUCTS -->
          <!--[if gte mso 15]>
          <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          
      <style type="text/css">
      p{
        margin:10px 0;
        padding:0;
      }
      table{
        border-collapse:collapse;
      }
      h1,h2,h3,h4,h5,h6{
        display:block;
        margin:0;
        padding:0;
      }
      img,a img{
        border:0;
        height:auto;
        outline:none;
        text-decoration:none;
      }
      body,#bodyTable,#bodyCell{
        height:100%;
        margin:0;
        padding:0;
        width:100%;
      }
      .mcnPreviewText{
        display:none !important;
      }
      #outlook a{
        padding:0;
      }
      img{
        -ms-interpolation-mode:bicubic;
      }
      table{
        mso-table-lspace:0pt;
        mso-table-rspace:0pt;
      }
      .ReadMsgBody{
        width:100%;
      }
      .ExternalClass{
        width:100%;
      }
      p,a,li,td,blockquote{
        mso-line-height-rule:exactly;
      }
      a[href^=tel],a[href^=sms]{
        color:inherit;
        cursor:default;
        text-decoration:none;
      }
      p,a,li,td,body,table,blockquote{
        -ms-text-size-adjust:100%;
        -webkit-text-size-adjust:100%;
      }
      .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
        line-height:100%;
      }
      a[x-apple-data-detectors]{
        color:inherit !important;
        text-decoration:none !important;
        font-size:inherit !important;
        font-family:inherit !important;
        font-weight:inherit !important;
        line-height:inherit !important;
      }
      .templateContainer{
        max-width:600px !important;
      }
      a.mcnButton{
        display:block;
      }
      .mcnImage,.mcnRetinaImage{
        vertical-align:bottom;
      }
      .mcnTextContent{
        word-break:break-word;
      }
      .mcnTextContent img{
        height:auto !important;
      }
      .mcnDividerBlock{
        table-layout:fixed !important;
      }
      h1{
        color:#222222;
        font-family:Helvetica;
        font-size:40px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:center;
      }
      h2{
        color:#222222;
        font-family:Helvetica;
        font-size:34px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:left;
      }
      h3{
        color:#444444;
        font-family:Helvetica;
        font-size:22px;
        font-style:normal;
        font-weight:bold;
        line-height:150%;
        letter-spacing:normal;
        text-align:left;
      }
      h4{
        color:#949494;
        font-family:Georgia;
        font-size:20px;
        font-style:italic;
        font-weight:normal;
        line-height:125%;
        letter-spacing:normal;
        text-align:left;
      }
      #templateHeader{
        background-color:#F7F7F7;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:45px;
        padding-bottom:45px;
      }
      .headerContainer{
        background-color:transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
        color:#757575;
        font-family:Helvetica;
        font-size:16px;
        line-height:150%;
        text-align:left;
      }
      .headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{
        color:#007C89;
        font-weight:normal;
        text-decoration:underline;
      }
      #templateBody{
        background-color:#FFFFFF;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:36px;
        padding-bottom:45px;
      }
      .bodyContainer{
        background-color:transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
        color:#757575;
        font-family:Helvetica;
        font-size:16px;
        line-height:150%;
        text-align:left;
      }
      .bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{
        color:#007C89;
        font-weight:normal;
        text-decoration:underline;
      }
      #templateFooter{
        background-color:#333333;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0px;
        padding-bottom:0px;
      }
      .footerContainer{
        background-color:transparent;
        background-image:none;
        background-repeat:no-repeat;
        background-position:center;
        background-size:cover;
        border-top:0;
        border-bottom:0;
        padding-top:0;
        padding-bottom:0;
      }
      .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
        color:#FFFFFF;
        font-family:Helvetica;
        font-size:12px;
        line-height:150%;
        text-align:center;
      }
      .footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{
        color:#FFFFFF;
        font-weight:normal;
        text-decoration:underline;
      }
    @media only screen and (min-width:768px){
      .templateContainer{
        width:600px !important;
      }

    }  @media only screen and (max-width: 480px){
        body,table,td,p,a,li,blockquote{
          -webkit-text-size-adjust:none !important;
        }

    }  @media only screen and (max-width: 480px){
        body{
          width:100% !important;
          min-width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnRetinaImage{
          max-width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImage{
          width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{
          max-width:100% !important;
          width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnBoxedTextContentContainer{
          min-width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageGroupContent{
          padding:9px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
          padding-top:9px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
          padding-top:18px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageCardBottomImageContent{
          padding-bottom:9px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageGroupBlockInner{
          padding-top:0 !important;
          padding-bottom:0 !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageGroupBlockOuter{
          padding-top:9px !important;
          padding-bottom:9px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnTextContent,.mcnBoxedTextContentColumn{
          padding-right:18px !important;
          padding-left:18px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
          padding-right:18px !important;
          padding-bottom:0 !important;
          padding-left:18px !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcpreview-image-uploader{
          display:none !important;
          width:100% !important;
        }

    }  @media only screen and (max-width: 480px){
        h1{
          font-size:30px !important;
          line-height:125% !important;
        }

    }  @media only screen and (max-width: 480px){
        h2{
          font-size:26px !important;
          line-height:125% !important;
        }

    }  @media only screen and (max-width: 480px){
        h3{
          font-size:20px !important;
          line-height:150% !important;
        }

    }  @media only screen and (max-width: 480px){
        h4{
          font-size:18px !important;
          line-height:150% !important;
        }

    }  @media only screen and (max-width: 480px){
        .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
          font-size:14px !important;
          line-height:150% !important;
        }

    }  @media only screen and (max-width: 480px){
        .headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{
          font-size:16px !important;
          line-height:150% !important;
        }

    }  @media only screen and (max-width: 480px){
        .bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{
          font-size:16px !important;
          line-height:150% !important;
        }

    }  @media only screen and (max-width: 480px){
        .footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{
          font-size:14px !important;
          line-height:150% !important;
        }

    }</style></head>
        <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
            <!---->
            <center>
                <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
                    <tbody><tr>
                        <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;">
                            <!-- BEGIN TEMPLATE // -->
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tbody><tr>
                                    <td align="center" valign="top" id="templateHeader" data-template-container="" style="background:#F7F7F7 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #F7F7F7;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 45px;padding-bottom: 45px;">
                                        <!--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                        <tr>
                                        <td align="center" valign="top" width="600" style="width:600px;">
                                        <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                            <tbody><tr>
                                                <td valign="top" class="headerContainer" style="background:transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <tbody class="mcnImageBlockOuter">
                <tr>
                    <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                        <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                            <tbody><tr>
                                <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                    
                                        
                                            <img align="center" alt="" src="" width="196" style="max-width: 196px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                        
                                    
                                </td>
                            </tr>
                        </tbody></table>
                    </td>
                </tr>
        </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <tbody class="mcnTextBlockOuter">
            <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <!--[if mso]>
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
            <tr>
            <![endif]-->
              
            <!--[if mso]>
            <td valign="top" width="600" style="width:600px;">
            <![endif]-->
                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody><tr>
                            
                            <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #757575;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;">
                            
                                <h1 style="display: block;margin: 0;padding: 0;color: #222222;font-family: Helvetica;font-size: 40px;font-style: normal;font-weight: bold;line-height: 150%;letter-spacing: normal;text-align: center;">You have been invited to SP Finance</h1>

                            </td>
                        </tr>
                    </tbody></table>
            <!--[if mso]>
            </td>
            <![endif]-->
                    
            <!--[if mso]>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
        </tbody>
    </table></td>
                                            </tr>
                                        </tbody></table>
                                        <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                        </tr>
                                        </table>
                                        <![endif]-->
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateBody" data-template-container="" style="background:#FFFFFF none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 36px;padding-bottom: 45px;">
                                        <!--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                        <tr>
                                        <td align="center" valign="top" width="600" style="width:600px;">
                                        <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                            <tbody><tr>
                                                <td valign="top" class="bodyContainer" style="background:transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <tbody class="mcnTextBlockOuter">
            <tr>
                <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <!--[if mso]>
            <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
            <tr>
            <![endif]-->
              
            <!--[if mso]>
            <td valign="top" width="600" style="width:600px;">
            <![endif]-->
                    <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                        <tbody><tr>
                            
                            <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #757575;font-family: Helvetica;font-size: 16px;line-height: 150%;text-align: left;">
                            
                                <h3 style="text-align: center;display: block;margin: 0;padding: 0;color: #444444;font-family: Helvetica;font-size: 22px;font-style: normal;font-weight: bold;line-height: 150%;letter-spacing: normal;">${from} has invited you to contribute to the ${project} project on SP Finance</h3>

                            </td>
                        </tr>
                    </tbody></table>
            <!--[if mso]>
            </td>
            <![endif]-->
                    
            <!--[if mso]>
            </tr>
            </table>
            <![endif]-->
                </td>
            </tr>
        </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
        <tbody class="mcnButtonBlockOuter">
            <tr>
                <td style="padding-top: 0;padding-right: 18px;padding-bottom: 18px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" valign="top" align="center" class="mcnButtonBlockInner">
                    <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 3px;background-color: #009FC7;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <tbody>
                            <tr>
                                <td align="center" valign="middle" class="mcnButtonContent" style="font-family: Helvetica;font-size: 18px;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                    <a class="mcnButton " title="Get Started" href="https://sp-finance.web.app" target="_blank" style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;display: block;">Get Started</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;table-layout: fixed !important;">
        <tbody class="mcnDividerBlockOuter">
            <tr>
                <td class="mcnDividerBlockInner" style="min-width: 100%;padding: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                    <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                        <tbody><tr>
                            <td style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <span></span>
                            </td>
                        </tr>
                    </tbody></table>
    <!--            
                    <td class="mcnDividerBlockInner" style="padding: 18px;">
                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
    -->
                </td>
            </tr>
        </tbody>
    </table></td>
                                            </tr>
                                        </tbody></table>
                                        <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                        </tr>
                                        </table>
                                        <![endif]-->
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top" id="templateFooter" data-template-container="" style="background:#333333 none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #333333;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0px;padding-bottom: 0px;">
                                        <!--[if (gte mso 9)|(IE)]>
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
                                        <tr>
                                        <td align="center" valign="top" width="600" style="width:600px;">
                                        <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;max-width: 600px !important;">
                                            <tbody><tr>
                                                <td valign="top" class="footerContainer" style="background:transparent none no-repeat center/cover;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: transparent;background-image: none;background-repeat: no-repeat;background-position: center;background-size: cover;border-top: 0;border-bottom: 0;padding-top: 0;padding-bottom: 0;"></td>
                                            </tr>
                                        </tbody></table>
                                        <!--[if (gte mso 9)|(IE)]>
                                        </td>
                                        </tr>
                                        </table>
                                        <![endif]-->
                                    </td>
                                </tr>
                            </tbody></table>
                            <!-- // END TEMPLATE -->
                        </td>
                    </tr>
                </tbody></table>
            </center>

    </body></html>` // email content in HTML
  return mailTransport.sendMail(mailOptions).then(res=>{
    console.log('New invite email sent to:', email);
    return true;
  }).catch(err=>{console.log(err)})
}

function deleteCollection(db, collectionPath, batchSize) {
  var collectionRef = db.collection(collectionPath);
  var query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        return 0;
      }

      // Delete documents in a batch
      var batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
        return

      });

      return batch.commit().then(() => {
        return snapshot.size;
      });
    }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
      return
    })
    .catch(reject);
}

exports.sendInvite = functions.firestore.document("/projects/{projectId}/invites/{email}")
.onCreate((snap, context) => {      
  var snapData = snap.data()

  // check the email is lower case or it won't be found when the user logs in
  if (snapData.email !== snapData.email.toLowerCase()) { // email is not lower case, force email to lower case
    console.log("emails are different")
    //make email lower case
    snapData.email = snapData.email.toLowerCase()
    //create new document
    var newInvite = db.doc(`/projects/${context.params.projectId}/invites/${context.params.email.toLowerCase()}`)
    //create new batch operation
    var batch = db.batch()
    //delete the old document
    batch.delete(snap.ref)
    //update new doc with email lower case
    batch.set(newInvite, snapData)
    // commit the batch and exit, the new doc will call this function again
    return batch.commit().then(res=>{
      return true
    }).catch(err=>{console.log(err)})
  }
  //[function ends here if email isn't lower case]

  //check if the email has been sent and send it if not
  if (!snapData.sent) { //email not sent
    //get the values to populate the email template
    const project = snapData.projectName
    const email = snapData.email; // The email of the user.
    const displayName = snapData.name; // The display name of the user.
    const from = snapData.fromName;
    const permission = snapData.permission
    //send the email
    sendInviteEmail(email, displayName, project, from, permission);
    //mark the email as sent
    snapData.sent = true
  }

  // check if the user exist (has logged in before), if yes add the project to their dashboard if not await login
  return db.collection('/users').where('email', '==', snapData.email).get()
    .then(snap =>{
      if(!snap.empty) { //user exists
        //get the user's uid
        for(var key in snap.docs)
        {
          let uid = snap.docs[key].id
          var batch = db.batch()
          let userData = snap.docs[key].data()
          batch.set(db.doc(`/projects/${context.params.projectId}/contributors/${uid}`), {
            uid,
            name: userData.name,
            email: userData.email,
            photoURL: userData.photURL,
            permission: snapData.permission,
            budgets: (snapData.budgets.isArray() || snapData.budgets === 'all') ? snapData.budgets : [snapData.budgets]
          })
          batch.delete(snap.ref)
          return batch.commit().then(res=>{
            return true
          }).catch(err=>{console.log(err)})
        }
      }
    }).catch(err=>{console.log(err)})
})

//Used in 2.0
// exports.createproject = functions.https.onCall((data, context) => {
//   // console.log(context.auth)
//   var newproject = {
//     "name": "Untitled project",
//     "style": {"backgroundColor":"#ffffff"}
//   }

//   // Get a new write batch
//   var batch = db.batch();

//   //create the project document
//   var projectDoc = db.collection(`/projects`).doc()
//   batch.set(projectDoc, newproject)

//   // var treeDoc = projectDoc.collection('/trees').doc('/tree')
//   // batch.set(treeDoc, {root:[],'No Parent':[]})

//   var contributorDoc = db.doc(`/projects/${projectDoc.id}/contributors/${context.auth.uid}`)
//   batch.set(contributorDoc, {
//     name:context.auth.token.name,
//     email:context.auth.token.email,
//     permission:'admin',
//     accepted:true,
//     uid: context.auth.token.uid
//   })

//     return batch.commit().then(()=>{
//         console.log(newproject,projectDoc.id)
//         // resolve()
//         return {
//           projectId: projectDoc.id,
//           success: true
//         }
//     }).catch((err)=>{console.error(err)});
// });

// //Used in 2.0
// exports.copyproject = functions.https.onCall((data, context) => {
//   // console.log(data)
//   let projectRef = db.doc(`/projects/${data.projectId}`)
//   let newprojectRef = db.collection(`/projects`).doc()
//   let newcontributorRef = newprojectRef.collection(`/contributors`).doc(`${context.auth.uid}`)
//   let stylesRef = projectRef.collection('/styles')
//   let newStylesRef = newprojectRef.collection('/styles')
//   return db.runTransaction((transaction) => {
//     // This code may get re-run multiple times if there are conflicts.
//     return transaction.get(projectRef).then((projectDoc) => {
//       if (!projectDoc.exists) {
//         return false
//       }
//       return transaction.get(stylesRef).then((stylesSnap) => {
//         let projectData = projectDoc.data();
//         transaction.set(newprojectRef, { 
//           name: 'Copy of '+projectData.name,
//           style: projectData.style
//         });

//         transaction.set(newcontributorRef, {
//           name:context.auth.token.name,
//           email:context.auth.token.email,
//           permission:'admin',
//           accepted:true,
//           uid:context.auth.token.uid
//         })
//         for (var doc in stylesSnap.docs) {
//           newStylesRef.doc(stylesSnap.docs[doc].id).set(stylesSnap.docs[doc].data())
//         }
//         return true
//       }).then(() => {
//         console.log("Transaction successfully committed!");
//         console.log(newprojectRef.id)
//         return true
//       }).catch((error) => {
//         console.log("Transaction failed: ", error);
//       });
//     }).catch((error) => {
//       console.log("Transaction failed: ", error);
//     });
//   }).catch((error) => {
//     console.log("Transaction failed: ", error);
//   });
// })

// Listen for user sign in
exports.onUserFirstSignIn = functions.auth.user().onCreate((user) => {
  console.log(user.uid)
  //sanitise user
  var userSanitized = {}
  userSanitized.name = user.displayName
  userSanitized.email = user.email
  userSanitized.photoURL = user.photoURL
  // userSanitized.projects = []

  // create a doc for the user
  var docRef = db.collection('/users').doc(user.uid)
  return docRef.get().then(doc => {
    //create a batch operation
    var batch = db.batch()
    //check the user doesn't exist
    if (!doc.exists) {
      console.log('Creating User Doc');
      //add the user data to the user doc
      batch.set(db.collection('/users').doc(user.uid), userSanitized)
      return db.collectionGroup('invites').where('email', '==', userSanitized.email).get()
        .then(invitesSnap => {
          invitesSnap.forEach(inviteSnap => {
            console.log(inviteSnap.data())
            //add the user to the projects they have been invited too
            batch.set(inviteSnap.ref.parent.parent.collection('/contributors').doc(`/${user.uid}`), {
              uid: user.uid,
              email: userSanitized.email,
              name: userSanitized.name,
              permission: inviteSnap.data().permission,
              budgets: inviteSnap.data().budgets,
            })
            //delete the old invites
            batch.delete(inviteSnap.ref)
          })
          // commit the batch and exit
          return batch.commit().then(res=>{
            return true
          }).catch(err=>{console.log(err)})
        })      
    }
  })
});

exports.userUpdated = functions.firestore.document("/users/{uid}")
.onUpdate((change, context) => {
  console.log(context)

  var beforeData = change.before.data()
  var afterData = change.after.data()

  if((beforeData.name !== afterData.name)||(beforeData.email !== afterData.email)||(beforeData.photoURL !== afterData.photoURL))
  {
    for(var key in afterData.projects)
    {
      db.doc(`/projects/${afterData.projects[key].id}/contributors/${context.params.uid}`).update({name:afterData.name,email:afterData.email,photoURL:afterData.photoURL})
    }
    // userSnap.ref.update({name:beforeData.displayName,email:beforeData.email,photoURL:beforeData.photoURL})
  }
  return true
})

// Listen for updates to any `user` document.
// exports.projectChange = functions.firestore.document('/projects/{projectId}')
// .onUpdate((change, context) => {

  
//     return true
// });

exports.onUserStatusChanged = functions.database.ref('/status/{uid}').onUpdate((change, context) => {
      // Get the data written to Realtime Database
      const eventStatus = change.after.val();

      // Then use other event data to create a reference to the
      // corresponding Firestore document.
      const userStatusFirestoreRef = db.doc(`/status/${context.params.uid}`);

      // It is likely that the Realtime Database change that triggered
      // this event has already been overwritten by a fast change in
      // online / offline status, so we'll re-read the current data
      // and compare the timestamps.
      change.after.ref.once('value').then(statusSnapshot=>{
        const status = statusSnapshot.val();
        console.log(status, eventStatus);
        // If the current timestamp for this data is newer than
        // the data that triggered this event, we exit this function.
        if (status.last_changed > eventStatus.last_changed) {
          return null;
        }

        // Otherwise, we convert the last_changed field to a Date
        eventStatus.last_changed = new Date(eventStatus.last_changed);

        // ... and write it to Firestore.
        // console.log(eventStatus)
        userStatusFirestoreRef.update(eventStatus);
        return true
      }).catch(err=>{console.log(err)})
      return true
  });
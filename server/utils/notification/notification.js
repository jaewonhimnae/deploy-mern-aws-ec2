const { Notification } = require("../../models/Notification");

const insertNotification = (postId, userToId ,userFromId, userFromName, type) => {

    let message = "";
    let link = "";

    if (type === "subscribe"){
        link = `/user/dashboard/${postId}`
    } else {
        link = `/posts/post/${postId}`
    }

    switch (type) {
        case "like_post":
            message = `${userFromName} liked your post`
            break;
        case "post_comment":
            message = `${userFromName}가 당신의 글에 답변을 달았습니다.`
            break;
        case "subscribe":
            message = `${userFromName} subscribe you`
            break;    
        default:
            message;
            break;
    }

    const notification = new Notification({
        userTo: mongoose.Types.ObjectId(userToId),
        userFrom:  mongoose.Types.ObjectId(userFromId),
        message: message,
        link: link
      });
      notification.save();
}

module.exports = { insertNotification }
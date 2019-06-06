const socket = io('http://localhost:3000');

const userEmail = "rahul12@gmail.com"


let NotificationSocket = () => {

    socket.emit("sendMyNotification",userEmail);


    socket.on("YourNotifications",(notificationData)=>{
        console.log('Notification Data is',notificationData)
    })
}

NotificationSocket();
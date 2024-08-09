
// const github_api = "https://api.github.com/users/Arka-2001";

// const user= fetch(github_api);

// console.log(user);

// user.then(function(data){
//     console.log(data.json());
// })

const cart = ["shoes", "pants", "kurta"];

const promise = createOrder(cart);

promise
    .then(function (orderId) {
        console.log(orderId);
        return orderId;
    })
    .then(function (orderId) {
        return proceesToPayment(orderId);
    })
    .then(function (paymentInfo) {
        // Correctly destructuring paymentInfo object
        console.log(paymentInfo.message, `of amount:`, paymentInfo.amt);
        return showOrderSummary(paymentInfo);
    })
    .then(function (summaryInfo) {
        console.log(summaryInfo.message);
        console.log(`Your wallet has been debited by:`, summaryInfo.amt);
    })
    .catch(function (err) {
        console.log(err.message);
    })
    .then(function () {
        console.log("No matter what happened, I will be called");
    });

function createOrder(cart) {
    const pr = new Promise(function (resolve, reject) {
        if (!validateCart(cart)) {
            const err = new Error("Cart is not valid");
            reject(err);
        }
        const orderId = "12345";
        if (orderId) {
            setTimeout(function () {
                resolve(orderId);
            }, 3000);
        }
    });
    return pr;
}

function proceesToPayment(orderId) {
    return new Promise(function (resolve) {
        resolve({ message: `Payment successful for orderId: ${orderId}`, amt: 2600 });
    });
}

function showOrderSummary(paymentInfo) {
    return new Promise(function (resolve, reject) {
        if (paymentInfo.amt >= 2500) {
            resolve({ message: `You have ordered items that cost ${paymentInfo.amt} Rs`, amt: paymentInfo.amt });
        } else {
            reject(new Error("Please buy more to get a discount"));
        }
    });
}

function validateCart(cart) {
    return true;
}

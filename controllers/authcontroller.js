const config = require("../config/dbsecret")
const Customer = require("../models/customer")
const Logistic = require("../models/logistics")
const OrderType = require("../models/ordertype")
const LogisticOwner = require("../models/logisticsowner")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

signupCustomer = (req, res) => {
    if (req.body.customerPassword != req.body.cust_confirm) {
        res.render("./home/signup.ejs", { err: "Password must match" })
        return
    }
    const customer = new Customer({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerAddress: req.body.customerAddress,
        customerNumber: req.body.customerNumber,
        customerGender: req.body.customerGender,
        customerPassword: bcrypt.hashSync(req.body.customerPassword, 8)
    });
    customer.save((err) => {
        if (err) {
            res.render("./home/custsignup.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
            return
        }
        res.redirect('/login')
    })
}

login = (req, res) => {
    Logistic.findOne({
        logisticsEmail: req.body.Mail
    }).exec((err, logistic) => {
        if (err) {
            return res.render("./home/login.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
        }
        if (logistic === null) {
            Customer.findOne({
                customerEmail: req.body.Mail
            }).exec((err, customer) => {
                if (err) {
                    return res.render("./home/login.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
                }
                if (!customer) {
                    return res.render("./home/login.ejs", { err: "User not Found" })
                }
                if (customer) {
                    var passwordIsValid = bcrypt.compareSync(
                        req.body.Pass,
                        customer.customerPassword
                    );
                    if (!passwordIsValid) {
                        return res.render("./home/login.ejs", { err: "incorrect password" })
                    }
                    var token = jwt.sign({ email: customer.customerEmail }, config.secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    res.cookie('token', token, { maxAge: 86400000 });
                    res.redirect('/welcome');
                }
            });
        }

        if (logistic) {
            var passwordIsValid = bcrypt.compareSync(
                req.body.Pass,
                logistic.logisticsPassword
            );
            if (!passwordIsValid) {
                return res.render("./home/login.ejs", { err: "incorrect password" })
            }
            var token = jwt.sign({ email: req.body.Mail }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            res.cookie('token', token, { maxAge: 86400000 });
            res.redirect('/welcome');
        }
    })
}

signupLogistic = (req, res) => {
    if (req.body.customerPassword != req.body.cust_confirm) {
        res.render("./home/logsignup.ejs", { err: "Password must match" })
        return
    }
    const ordertype = new OrderType({
        OrderBasePrice: req.body.Hrateperkg,
        OrderAdditionalPrice1Kg: req.body.Haddrateperkg,
        OrderAdditionalPrice1Kg: req.body.Haddrateperkm,
        OrderState: req.body.Hstate,
        OrderDistrict: req.body.Hdistrict,
        Pincode: req.body.Pincode.split(",")
    })
    ordertype.save((err, ordtyp) => {
        if (err) {
            res.render("./home/logsignup.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
            return
        }
        let orderid = ordtyp._id;
        const logisticowner = new LogisticOwner({
            logisticsOwnerName: req.body.Oname + req.body.Olname,
            logisticsOwnerEmail: req.body.Oemail,
            logisticsOwnerContact: req.body.Ocontact,
            logisticsOwnerAddress: req.body.Oaddress,
            logisticsOwnerState: req.body.Ostate,
            logisticsOwnerDistrict: req.body.Odistrict,
            logisticsOwnerAadhar: req.body.Oaadharimg,
            logisticsOwnerUpiId: req.body.Oupi
        })
        logisticowner.save((err, owner) => {
            if (err) {
                res.render("./home/logsignup.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
                return
            }
            let ownerid = owner._id
            const logistics = new Logistic({
                logisticsName: req.body.Btitle,
                logisticsEmail: req.body.Bmail,
                logisticsContact: req.body.Bcontact,
                logisticsAddress: req.body.Baddress,
                logisticsState: req.body.Bstate,
                logisticsDistrict: req.body.Bdistrict,
                logisticsPassword: bcrypt.hashSync(req.body.Bpass, 8),
                owner: ownerid,
                orderType: orderid
            });
            logistics.save((err, logistic) => {
                if (err) {
                    res.render("./home/logsignup.ejs", { err: err.message.slice(err.message.lastIndexOf(":") + 2, err.message.indexOf(".", err.message.lastIndexOf(":") + 2)) })
                    return
                }
                res.redirect("../login")
            })
        })
    })
}

forgetPassword = (req, res) => {
    Customer.findOne({
        customerEmail: req.body.Mail
    }).exec((err, customer) => {
        if (err) {
            return res.render("./home/forget_password", { err: err.message })
        }
        if (!customer) {
            Logistic.findOne({
                logisticsEmail: req.body.Mail
            }).exec((err, logistic) => {
                if (!logistic) {
                    return res.render("./home/forget_password", { err: "No such mail registered" })
                }
                if (logistic) {
                    var token = jwt.sign({ id: logistic._id, pass: logistic.logisticsPassword }, config.reset_secret, {
                        expiresIn: 86400 // 24 hours
                    });
                    res.redirect("./password-reset/:" + token);
                }
            });
        }
        if (customer) {
            var token = jwt.sign({ id: customer._id, pass: customer.customerPassword }, config.reset_secret, {
                expiresIn: 86400 // 24 hours
            });
            res.redirect("./password-reset/:" + token);
        }
    });
}

password_reset = (res, req, token) => {
    if (req.body.password!=req.body.cpassword) {
        console.log(req.body.password,req.body.cpassword);
        return res.render('./home/password_reset', { token: token,err:"Password must match" })
    }
    jwt.verify(token, config.reset_secret, (err, decoded) => {
        if (err) {
            return res.render('./home/password_reset', { token: token,err:err.message })
        }
        Customer.findOne({ _id: decoded.id })
            .exec((err, customer) => {
                if (!customer) {
                    Logistic.findOne({ _id: decoded.id })
                        .exec((err, logistic) => {
                            if (logistic) {
                                logistic.logisticsPassword = bcrypt.hashSync(req.body.password, 8);
                                logistic.save(function (err) {
                                    if (err) return err;
                                });
                                return res.redirect("/login")
                            }
                        })
                }
                if (customer) {
                    customer.customerPassword = bcrypt.hashSync(req.body.password, 8);
                    customer.save(function (err) {
                        if (err) return err;
                    });
                    return res.redirect("/login")
                }
            })
    });
}

module.exports = { signupCustomer, signupLogistic, login, forgetPassword, password_reset }
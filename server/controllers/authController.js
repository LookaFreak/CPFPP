const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UploadFile } = require("../Utils/Uploader")
const sendMail = require("../Utils/mailer")
const UniqueCodeGen = require("../Utils/uniqueStringGenrator")

exports.LoginController = async (req, res) => {
  // Handle login
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User dose not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Email or Password! please try again",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .send({ success: true, message: "Login Successfully", token, user });
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: `Login failed ${error.message}` });
  }
};

exports.VerifyEmail = async (req, res) => {
  // Handle registration
  try {
    if (!req.body.email || !req.body.code) return res.status(400).send({ success: false, message: `Email or Code is Required ` });
    let FindUser = await userModel.findOne({ email: req.body.email })
    if (!FindUser) return res.status(400).send({ success: false, message: `User Not found ` });
    if (req.body.code == FindUser.emailVerificationCode) {
      FindUser.status == "approved"
      await FindUser.save()
    } else {
      return res.status(400).send({ success: false, message: `Invalid Code` });
    }
    res
      .status(200)
      .send({ message: "Verified Successfully", success: true });
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: `Register Failed ${error.message}` });
  }
};
exports.RegisterController = async (req, res) => {
  // Handle registration
  if (req.body.password == req.body.Cpassword) {
    try {
      if (!req.file) return res.status(400).send({ success: false, message: `Avatar is Required ` });

      const existUser = await userModel.findOne({ email: req.body.email });
      if (existUser) {
        res.status(201).send({ message: "User Already exist", success: false });
      }

      req.body.avatar = await UploadFile(req.file)

      const password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      req.body.password = hashPassword;
      const newUser = new userModel(req.body);
      // await newUser.save();

      let verificationCode = UniqueCodeGen(6)
      newUser.emailVerificationCode = verificationCode
      await newUser.save()

      const mailOptions = {
        from: `${process.env?.MAIL_FROM_NAME}`,
        to: newUser.email,
        subject: 'Email Verification Code',
      };
      const replacements = {
        // logoUrl: "https://ibb.co/P6PyHvp",
        User: newUser.name,
        verifyLink: verificationCode
      };
      sendMail(mailOptions, replacements);
      res
        .status(200)
        .send({ message: "Registered Successfully", success: true });
    } catch (error) {
      console.log("++++++++++++++++", error)
      res
        .status(401)
        .send({ success: false, message: `Register Failed ${error.message}` });
    }
  } else {
    res
      .status(201)
      .send({ message: "Password Dose not match", success: false });
  }
};

exports.AuthController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    // console.log(user);
    user.password = undefined;
    if (!user) {
      return res.status(401).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(201).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};

exports.EditUserProfile = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User dose not find! please try again",
      });
    }


    let { password, ...Payload } = req.body;

    if (req.file) {
      Payload.avatar = await UploadFile(req.file)
    }
    if (password && password.length >= 5) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      Payload.password = hashPassword;
    }

    let UpdateUser = await userModel.findOneAndUpdate({ email: req.body.email }, { "$set": Payload })

    res.status(200).send({
      success: true,
      message: "User Update successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: `Something went wrong ${error}`,
      success: false,
      error,
    });
  }
};
exports.getUserController = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User dose not find! please try again",
      });
    }
    res.status(200).send({
      success: true,
      message: "User find successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: `Something went wrong ${error}`,
      success: false,
      error,
    });
  }
};

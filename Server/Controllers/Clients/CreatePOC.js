const pocModel = require("../../Models/POCModel");
const bcrypt = require("bcrypt");
const express = require("express");
const mailer = require("nodemailer");
const app = express();

const createPOC = async (req, res, next) => {
  // -> Extracting input values
  const { poc_name, location, email, poc_contact_number,client_id } = req.body;

  // -> Checking if values are empty
  if ( !location || !email || !poc_name || !poc_contact_number || !client_id) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // -> Checking is Email @ is valid or not
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  function isEmailValid(email) {
    if (email.length > 254) return false;

    var valid = emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }
  const EmailValid = isEmailValid(email);
  if (EmailValid == false) {
    return res
      .status(400)
      .json({ error: "Enter email @ in proper format abc@domain.com" });
  }

  // -> Checking is password length is in range or not
  function phoneNumberLengthChecker(poc_contact_number) {
    if (poc_contact_number.length < 10 || poc_contact_number.length > 10) {
      return false;
    }
    return true;
  }
  const phoneNumberCheck = phoneNumberLengthChecker(poc_contact_number);
  if (phoneNumberCheck == false) {
    return res
      .status(400)
      .json({ error: "Contact Number  length should be 10" });
  }
  // -> Checking if email OR username is not already token
  const existingUser = await pocModel.findOne({
    $or: [{ poc_name }, { email }],
  });
  if (existingUser) {
    // console.log('user alreay exists in system');
    return res.status(409).json({ error: "Client Name or email already taken." });

  }
  // -> Saving user data in database
  const poc = await new pocModel({
    location: location,
    email: email,
    poc_name: poc_name,
    poc_contact_number: poc_contact_number,
    client_id: client_id,
  });
  try {

    await poc.save();
    //await sendVerifyEmail(poc_name, email, user._id)
  } catch (error) {
    // -> Handling error
    console.log("An error occured:>  " + error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the user." });
  }
  // -> Returning success message

  return res.status(200).json({ message: "Client Registered Sucessfully!" });
}

module.exports = createPOC;

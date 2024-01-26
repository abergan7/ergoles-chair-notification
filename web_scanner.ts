import axios from "axios";
import * as cheerio from "cheerio";
import * as nodemailer from "nodemailer";
require("dotenv").config();

async function isItemAvailable(url: string): Promise<boolean> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  // Adjust the following line based on the HTML structure of the webpage
  const availabilityText = $("#AddToCart-product-template").text().trim();
  const availabilityButton = $("#AddToCart-product-template").prop("disabled");
  return availabilityText.toLowerCase() !== "Razprodano" && !availabilityButton;
}

async function sendEmail(subject: string, body: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: subject,
    text: body,
  };

  await transporter.sendMail(mailOptions);
}

async function main() {
  const url =
    "https://www.ergoles.si/collections/pisarniski-stoli/products/pisarniski-stol-dynamic-evolution";
  if (await isItemAvailable(url)) {
    const subject = "Ergoles stol je koncno na voljo!";
    const body = `Koncno si lahko narocis ergoles stol https://www.ergoles.si/collections/pisarniski-stoli/products/pisarniski-stol-dynamic-evolution
      LP :)`;
    try {
      await sendEmail(subject, body);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Se kr razprodano...........");
  }
}

main();

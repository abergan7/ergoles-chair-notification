# Why

This small-scale project originated from the absence of a notification feature in [Ergoles.si](https://www.ergoles.si/) to alert users when their items become available again. Consequently, I developed a dummy notification scheduler task to address this limitation.

## Setup Instructions

1. **Install Node.js:**
   Ensure that Node.js is installed on your system. You can download it [here](https://nodejs.org/).

2. **Clone the Repository:**
   Clone this repository to your local machine.

3. **Create Environment Variables:**
   Create a `.env` file in the project directory with the following variables for Hotmail/Outlook (modify accordingly):

   ```plaintext
   EMAIL_USER=your_hotmail_email@example.com
   EMAIL_PASSWORD=your_hotmail_password
   EMAIL_TO=recipient_email@example.com
   ```

4. **Configure code:**

- In the `sendEmail` function select service for your email provider (in my example it is Hotmail/Outlook).For more information check [nodemailer](https://nodemailer.com/).
- In the `main` function of the code, locate the URL section for selecting a chair you are waiting for.
- Adjust the URL and customize the email subject and body as needed.

5. **Create Task Scheduler:**

- For Windows users, open Task Scheduler.
- Click "Create Task" in the general tab, provide a name and description.
- Configure for Windows 10.
- In the Triggers tab, create a new trigger (e.g., repeat every hour, duration set to infinite).
- In the Actions tab, create a new action:
  - Program/Script: `node.exe` (ensure Node.js is in your system's PATH).
  - Arguments: Enter the path to web_scanner.js in double quotes (e.g., `"C:/path/to/web_scanner.js"`).
  - Start in: Specify the directory path (e.g., `C:/path/to/`).
- In the Settings tab, uncheck "Stop the task if it runs longer than" and set it to 3 days.
- Click OK to save the task.

6. **Start the Task:**
   Start the task in Task Scheduler. You're all set!

> Note: When you order your chair, remember to manually stop and delete the task to avoid unnecessary scans.

<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $contact = $_POST['contact'];
    $message = $_POST['message'];

    // Set up email recipient (your email address)
    $to = 'kimjunmyeon0719@gmail.com';

    // Set email subject
    $subject = 'New Contact Form Submission';

    // Compose email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Contact Number: $contact\n\n";
    $email_content .= "Message:\n$message\n";

    // Set headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $email_content, $headers)) {
        // Email sent successfully
        echo json_encode(array('status' => 'success', 'message' => 'Email sent successfully.'));
    } else {
        // Email sending failed
        echo json_encode(array('status' => 'error', 'message' => 'Failed to send email.'));
    }
} else {
    // Redirect back to form page if accessed directly
    header("Location: index.html");
    exit();
}
?>

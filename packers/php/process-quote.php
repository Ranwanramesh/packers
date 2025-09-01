<?php
/**
 * Form Processing Script for Swastik Packers & Movers
 * Handles quote requests, contact forms, and quick quotes
 */

// Define constant to allow config inclusion
define('QUOTE_PROCESSOR', true);

// Include configuration
require_once 'config.php';

// Set content type for JSON responses
header('Content-Type: application/json');

// Enable error reporting in debug mode
if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// CSRF Protection and Security Headers
session_start();
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Rate limiting check
if (!checkRateLimit()) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => ERROR_MESSAGES['rate_limit']]);
    exit;
}

try {
    // Get form type
    $formType = sanitizeInput($_POST['form_type'] ?? '');
    
    switch ($formType) {
        case 'quote':
            handleQuoteForm();
            break;
        case 'contact':
            handleContactForm();
            break;
        case 'quick_quote':
            handleQuickQuoteForm();
            break;
        default:
            throw new Exception('Invalid form type');
    }
    
} catch (Exception $e) {
    logError('Form processing error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => ERROR_MESSAGES['server_error']]);
}

/**
 * Handle main quote form submission
 */
function handleQuoteForm() {
    // Validate and sanitize input
    $data = [
        'fullName' => sanitizeInput($_POST['fullName'] ?? ''),
        'email' => sanitizeInput($_POST['email'] ?? ''),
        'phone' => sanitizeInput($_POST['phone'] ?? ''),
        'movingDate' => sanitizeInput($_POST['movingDate'] ?? ''),
        'movingFrom' => sanitizeInput($_POST['movingFrom'] ?? ''),
        'movingTo' => sanitizeInput($_POST['movingTo'] ?? ''),
        'propertyType' => sanitizeInput($_POST['propertyType'] ?? '')
    ];
    
    // Validate required fields
    $errors = validateQuoteData($data);
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
        return;
    }
    
    // Send email notifications
    if (sendQuoteEmail($data) && sendQuoteConfirmation($data)) {
        echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGES['quote']]);
    } else {
        throw new Exception('Failed to send email');
    }
}

/**
 * Handle contact form submission
 */
function handleContactForm() {
    $data = [
        'fullName' => sanitizeInput($_POST['fullName'] ?? ''),
        'email' => sanitizeInput($_POST['email'] ?? ''),
        'phone' => sanitizeInput($_POST['phone'] ?? ''),
        'subject' => sanitizeInput($_POST['subject'] ?? ''),
        'message' => sanitizeInput($_POST['message'] ?? '')
    ];
    
    $errors = validateContactData($data);
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
        return;
    }
    
    if (sendContactEmail($data) && sendContactConfirmation($data)) {
        echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGES['contact']]);
    } else {
        throw new Exception('Failed to send email');
    }
}

/**
 * Handle quick quote form submission
 */
function handleQuickQuoteForm() {
    $data = [
        'fullName' => sanitizeInput($_POST['fullName'] ?? ''),
        'phone' => sanitizeInput($_POST['phone'] ?? ''),
        'movingFrom' => sanitizeInput($_POST['movingFrom'] ?? ''),
        'movingTo' => sanitizeInput($_POST['movingTo'] ?? '')
    ];
    
    $errors = validateQuickQuoteData($data);
    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
        return;
    }
    
    if (sendQuickQuoteEmail($data)) {
        echo json_encode(['success' => true, 'message' => SUCCESS_MESSAGES['quick_quote']]);
    } else {
        throw new Exception('Failed to send email');
    }
}

/**
 * Sanitize input data
 */
function sanitizeInput($input) {
    $input = trim($input);
    $input = stripslashes($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

/**
 * Validate quote form data
 */
function validateQuoteData($data) {
    $errors = [];
    
    // Name validation
    if (empty($data['fullName'])) {
        $errors[] = 'Full name is required.';
    } elseif (strlen($data['fullName']) < MIN_NAME_LENGTH || strlen($data['fullName']) > MAX_NAME_LENGTH) {
        $errors[] = ERROR_MESSAGES['name_length'];
    }
    
    // Email validation
    if (empty($data['email'])) {
        $errors[] = 'Email address is required.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = ERROR_MESSAGES['email'];
    }
    
    // Phone validation (Indian numbers)
    if (empty($data['phone'])) {
        $errors[] = 'Phone number is required.';
    } else {
        $cleanPhone = preg_replace('/[\s\-\(\)\+]/', '', $data['phone']);
        // Indian mobile: 10 digits starting with 6-9, or with 91 prefix
        if (!preg_match('/^(91)?[6-9]\d{9}$/', $cleanPhone)) {
            $errors[] = 'Please enter a valid Indian mobile number (10 digits starting with 6-9).';
        }
    }
    
    // Date validation
    if (empty($data['movingDate'])) {
        $errors[] = 'Moving date is required.';
    } else {
        $movingDate = strtotime($data['movingDate']);
        $today = strtotime('today');
        if ($movingDate < $today) {
            $errors[] = ERROR_MESSAGES['invalid_date'];
        }
    }
    
    // Location validation
    if (empty($data['movingFrom'])) {
        $errors[] = 'Moving from location is required.';
    }
    
    if (empty($data['movingTo'])) {
        $errors[] = 'Moving to location is required.';
    }
    
    // Property type validation
    if (empty($data['propertyType'])) {
        $errors[] = 'Property type is required.';
    } elseif (!array_key_exists($data['propertyType'], PROPERTY_TYPES)) {
        $errors[] = ERROR_MESSAGES['invalid_property'];
    }
    
    return $errors;
}

/**
 * Validate contact form data
 */
function validateContactData($data) {
    $errors = [];
    
    // Name validation
    if (empty($data['fullName'])) {
        $errors[] = 'Full name is required.';
    } elseif (strlen($data['fullName']) < MIN_NAME_LENGTH || strlen($data['fullName']) > MAX_NAME_LENGTH) {
        $errors[] = ERROR_MESSAGES['name_length'];
    }
    
    // Email validation
    if (empty($data['email'])) {
        $errors[] = 'Email address is required.';
    } elseif (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors[] = ERROR_MESSAGES['email'];
    }
    
    // Phone validation
    if (empty($data['phone'])) {
        $errors[] = 'Phone number is required.';
    }
    
    // Subject validation
    if (empty($data['subject'])) {
        $errors[] = 'Subject is required.';
    } elseif (!array_key_exists($data['subject'], CONTACT_SUBJECTS)) {
        $errors[] = ERROR_MESSAGES['invalid_subject'];
    }
    
    // Message validation
    if (empty($data['message'])) {
        $errors[] = 'Message is required.';
    } elseif (strlen($data['message']) > MAX_MESSAGE_LENGTH) {
        $errors[] = ERROR_MESSAGES['message_length'];
    }
    
    return $errors;
}

/**
 * Validate quick quote form data
 */
function validateQuickQuoteData($data) {
    $errors = [];
    
    if (empty($data['fullName'])) {
        $errors[] = 'Full name is required.';
    }
    
    if (empty($data['phone'])) {
        $errors[] = 'Phone number is required.';
    }
    
    if (empty($data['movingFrom'])) {
        $errors[] = 'Moving from location is required.';
    }
    
    if (empty($data['movingTo'])) {
        $errors[] = 'Moving to location is required.';
    }
    
    return $errors;
}

/**
 * Send quote email to business
 */
function sendQuoteEmail($data) {
    $subject = 'New Moving Quote Request - ' . $data['fullName'];
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #2563eb; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>New Moving Quote Request</h2>
        </div>
        <div class='content'>
            <h3>Customer Details:</h3>
            <div class='detail'><span class='label'>Name:</span> {$data['fullName']}</div>
            <div class='detail'><span class='label'>Email:</span> {$data['email']}</div>
            <div class='detail'><span class='label'>Phone:</span> {$data['phone']}</div>
            <div class='detail'><span class='label'>Moving Date:</span> {$data['movingDate']}</div>
            <div class='detail'><span class='label'>Moving From:</span> {$data['movingFrom']}</div>
            <div class='detail'><span class='label'>Moving To:</span> {$data['movingTo']}</div>
            <div class='detail'><span class='label'>Property Type:</span> " . PROPERTY_TYPES[$data['propertyType']] . "</div>
            <div class='detail'><span class='label'>Submission Time:</span> " . date('Y-m-d H:i:s') . "</div>
        </div>
        <div class='footer'>
            <p>This quote request was submitted through the Swastik Packers & Movers website.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM_ADDRESS . '>',
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail(BUSINESS_EMAIL, $subject, $message, implode("\r\n", $headers));
}

/**
 * Send quote confirmation to customer
 */
function sendQuoteConfirmation($data) {
    $subject = 'Quote Request Received - Swastik Packers & Movers';
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .highlight { background: #f0f8ff; padding: 15px; border-left: 4px solid #2563eb; margin: 15px 0; }
            .contact-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>Thank You for Choosing Swastik Packers & Movers!</h2>
        </div>
        <div class='content'>
            <p>Dear {$data['fullName']},</p>
            
            <p>Thank you for your moving quote request. We have received your information and our team will contact you within 2 hours with a detailed estimate.</p>
            
            <div class='highlight'>
                <h3>Your Request Summary:</h3>
                <p><strong>Moving From:</strong> {$data['movingFrom']}</p>
                <p><strong>Moving To:</strong> {$data['movingTo']}</p>
                <p><strong>Moving Date:</strong> {$data['movingDate']}</p>
                <p><strong>Property Type:</strong> " . PROPERTY_TYPES[$data['propertyType']] . "</p>
            </div>
            
            <h3>What Happens Next?</h3>
            <ul>
                <li>Our expert will call you within 2 hours</li>
                <li>We'll discuss your specific requirements</li>
                <li>Schedule a free pre-move survey if needed</li>
                <li>Provide you with a detailed, transparent quote</li>
            </ul>
            
            <div class='contact-info'>
                <h3>Need Immediate Assistance?</h3>
                <p><strong>Phone:</strong> " . BUSINESS_PHONE . " (Available 24/7)</p>
                <p><strong>Email:</strong> " . BUSINESS_EMAIL . "</p>
                <p><strong>Address:</strong> " . BUSINESS_ADDRESS . "</p>
            </div>
            
            <p>We look forward to making your move stress-free and smooth!</p>
            
            <p>Best regards,<br>
            Team Swastik Packers & Movers</p>
        </div>
        <div class='footer'>
            <p>&copy; 2025 Swastik Packers & Movers. All rights reserved.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM_ADDRESS . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail($data['email'], $subject, $message, implode("\r\n", $headers));
}

/**
 * Send contact form email to business
 */
function sendContactEmail($data) {
    $subject = 'New Contact Message: ' . $data['subject'] . ' - ' . $data['fullName'];
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #2563eb; }
            .message-content { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>New Contact Message</h2>
        </div>
        <div class='content'>
            <h3>Contact Details:</h3>
            <div class='detail'><span class='label'>Name:</span> {$data['fullName']}</div>
            <div class='detail'><span class='label'>Email:</span> {$data['email']}</div>
            <div class='detail'><span class='label'>Phone:</span> {$data['phone']}</div>
            <div class='detail'><span class='label'>Subject:</span> {$data['subject']}</div>
            <div class='detail'><span class='label'>Submission Time:</span> " . date('Y-m-d H:i:s') . "</div>
            
            <h3>Message:</h3>
            <div class='message-content'>
                " . nl2br(htmlspecialchars($data['message'])) . "
            </div>
        </div>
        <div class='footer'>
            <p>This message was submitted through the Swastik Packers & Movers contact form.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM_ADDRESS . '>',
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail(BUSINESS_EMAIL, $subject, $message, implode("\r\n", $headers));
}

/**
 * Send contact form confirmation to customer
 */
function sendContactConfirmation($data) {
    $subject = 'Message Received - Swastik Packers & Movers';
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .contact-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>Thank You for Contacting Us!</h2>
        </div>
        <div class='content'>
            <p>Dear {$data['fullName']},</p>
            
            <p>Thank you for reaching out to Swastik Packers & Movers. We have received your message regarding: <strong>{$data['subject']}</strong></p>
            
            <p>Our customer service team will review your message and respond within 24 hours. For urgent matters, please feel free to call us directly.</p>
            
            <div class='contact-info'>
                <h3>Contact Information:</h3>
                <p><strong>Phone:</strong> " . BUSINESS_PHONE . " (Available 24/7)</p>
                <p><strong>Email:</strong> " . BUSINESS_EMAIL . "</p>
                <p><strong>Address:</strong> " . BUSINESS_ADDRESS . "</p>
            </div>
            
            <p>We appreciate your interest in our services and look forward to assisting you.</p>
            
            <p>Best regards,<br>
            Customer Service Team<br>
            Swastik Packers & Movers</p>
        </div>
        <div class='footer'>
            <p>&copy; 2025 Swastik Packers & Movers. All rights reserved.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM_ADDRESS . '>',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail($data['email'], $subject, $message, implode("\r\n", $headers));
}

/**
 * Send quick quote email to business
 */
function sendQuickQuoteEmail($data) {
    $subject = 'Quick Quote Request - ' . $data['fullName'];
    
    $message = "
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .detail { margin: 10px 0; }
            .label { font-weight: bold; color: #f59e0b; }
            .urgent { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>⚡ URGENT: Quick Quote Request</h2>
        </div>
        <div class='content'>
            <div class='urgent'>
                <h3>🔥 Quick Response Required!</h3>
                <p>Customer expects callback within 30 minutes.</p>
            </div>
            
            <h3>Customer Details:</h3>
            <div class='detail'><span class='label'>Name:</span> {$data['fullName']}</div>
            <div class='detail'><span class='label'>Phone:</span> {$data['phone']}</div>
            <div class='detail'><span class='label'>Moving From:</span> {$data['movingFrom']}</div>
            <div class='detail'><span class='label'>Moving To:</span> {$data['movingTo']}</div>
            <div class='detail'><span class='label'>Submission Time:</span> " . date('Y-m-d H:i:s') . "</div>
        </div>
        <div class='footer'>
            <p>This is a quick quote request submitted through the Swastik Packers & Movers website.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . EMAIL_FROM_NAME . ' <' . EMAIL_FROM_ADDRESS . '>',
        'X-Priority: 1',
        'X-MSMail-Priority: High',
        'Importance: high',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail(BUSINESS_EMAIL, $subject, $message, implode("\r\n", $headers));
}

/**
 * Simple rate limiting function
 */
function checkRateLimit() {
    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $currentTime = time();
    $hourAgo = $currentTime - 3600;
    
    // Read existing rate limits
    $rateLimits = [];
    if (file_exists(RATE_LIMIT_FILE)) {
        $content = file_get_contents(RATE_LIMIT_FILE);
        $rateLimits = json_decode($content, true) ?: [];
    }
    
    // Clean old entries
    $rateLimits = array_filter($rateLimits, function($timestamp) use ($hourAgo) {
        return $timestamp > $hourAgo;
    });
    
    // Count submissions from this IP in the last hour
    $ipSubmissions = array_filter($rateLimits, function($timestamp, $ip) use ($clientIP) {
        return $ip === $clientIP;
    }, ARRAY_FILTER_USE_BOTH);
    
    if (count($ipSubmissions) >= MAX_SUBMISSIONS_PER_HOUR) {
        return false;
    }
    
    // Add current submission
    $rateLimits[$clientIP . '_' . $currentTime] = $currentTime;
    
    // Save rate limits
    file_put_contents(RATE_LIMIT_FILE, json_encode($rateLimits));
    
    return true;
}

/**
 * Log errors for debugging
 */
function logError($message) {
    if (LOG_ERRORS || DEBUG_MODE) {
        $logMessage = date('Y-m-d H:i:s') . ' - ' . $message . "\n";
        error_log($logMessage, 3, __DIR__ . '/error.log');
    }
}

?>

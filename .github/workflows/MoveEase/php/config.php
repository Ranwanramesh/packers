<?php
/**
 * Configuration file for Swastik Packers & Movers
 * Contains email settings and other configuration options
 */

// Prevent direct access
if (!defined('QUOTE_PROCESSOR')) {
    die('Direct access not permitted');
}

// Email Configuration
define('BUSINESS_EMAIL', 'quotes@swastik');
define('BUSINESS_NAME', 'Swastik Packers & Movers');
define('BUSINESS_PHONE', '+91-9992318883');
define('BUSINESS_ADDRESS', '123 Business Center, Commercial Street, Mumbai - 400001');

// Backup email (fallback)
define('BACKUP_EMAIL', 'quotes@swastik');

// Email Settings
define('EMAIL_FROM_NAME', 'Swastik Packers & Movers');
define('EMAIL_FROM_ADDRESS', 'noreply@swastikpackersandmovers.com');

// Form Settings
define('MAX_MESSAGE_LENGTH', 2000);
define('MIN_NAME_LENGTH', 2);
define('MAX_NAME_LENGTH', 100);

// Rate Limiting (simple file-based)
define('MAX_SUBMISSIONS_PER_HOUR', 5);
define('RATE_LIMIT_FILE', __DIR__ . '/rate_limits.json');

// Security Settings
define('ALLOWED_ORIGINS', [
    'http://localhost:5000',
    'https://swastikpackersandmovers.com',
    'http://swastikpackersandmovers.com'
]);

// Property Types
define('PROPERTY_TYPES', [
    '1BHK' => '1 BHK',
    '2BHK' => '2 BHK', 
    '3BHK' => '3 BHK',
    '4BHK' => '4 BHK',
    'Penthouse' => 'Penthouse',
    'Villa' => 'Villa'
]);

// Contact Subjects
define('CONTACT_SUBJECTS', [
    'General Inquiry' => 'General Inquiry',
    'Moving Quote' => 'Moving Quote Request',
    'Service Question' => 'Service Question',
    'Complaint' => 'Complaint',
    'Feedback' => 'Feedback',
    'Other' => 'Other'
]);

// Email Templates Directory
define('TEMPLATE_DIR', __DIR__ . '/templates');

// Error Messages
define('ERROR_MESSAGES', [
    'required' => 'This field is required.',
    'email' => 'Please enter a valid email address.',
    'phone' => 'Please enter a valid phone number.',
    'name_length' => 'Name must be between 2 and 100 characters.',
    'message_length' => 'Message is too long. Maximum 2000 characters allowed.',
    'invalid_date' => 'Moving date cannot be in the past.',
    'invalid_property' => 'Please select a valid property type.',
    'invalid_subject' => 'Please select a valid subject.',
    'rate_limit' => 'Too many submissions. Please try again later.',
    'email_failed' => 'Failed to send email. Please try again or contact us directly.',
    'server_error' => 'A server error occurred. Please try again later.'
]);

// Success Messages
define('SUCCESS_MESSAGES', [
    'quote' => 'Thank you for your quote request! We will contact you within 2 hours with a detailed estimate.',
    'contact' => 'Thank you for your message! We will respond to your inquiry within 24 hours.',
    'quick_quote' => 'Thank you! We will call you back within 30 minutes with a quick estimate.'
]);

// Environment specific settings
$environment = getenv('ENVIRONMENT') ?: 'production';

if ($environment === 'development') {
    // Development settings
    define('DEBUG_MODE', true);
    define('LOG_ERRORS', true);
} else {
    // Production settings
    define('DEBUG_MODE', false);
    define('LOG_ERRORS', false);
}

?>

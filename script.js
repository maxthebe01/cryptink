const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);
const loadingIndicator = document.getElementById('loading');

function payWithPaystack(e) {
    e.preventDefault();
    
    // Show loading indicator and disable the button
    payButton.disabled = true;
    loadingIndicator.style.display = 'block';

    let handler = PaystackPop.setup({
        key: 'pk_test_5975642a2e844677a780afd0dd877f6b81ee2577', // Replace with your Paystack public key
        email: document.getElementById('email').value,
        amount: 80 * 100, // Amount in kobo
        currency: 'ZAR',
        ref: '' + Math.floor(Math.random() * 1000000000 + 1), // Generates a random transaction reference
        callback: function(response) {
            alert('Payment successful. Transaction ref is ' + response.reference);

            // Hide loading indicator and enable the button
            loadingIndicator.style.display = 'none';
            payButton.disabled = false;
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');

            loadingIndicator.style.display = 'none';
            payButton.disabled = false;
        }
    });
    handler.openIframe();

    loadingIndicator.style.display = 'block'; // Show the loading indicator

    // Simulate form submission delay (e.g., process payment)
    setTimeout(function () {
        // Here you would typically submit the form data using AJAX or proceed with your payment processing logic.
        paymentForm.submit(); // Submit the form (or handle it via AJAX)
    }, 2000); // Simulate a 2-second delay
}

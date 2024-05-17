const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

function payWithPaystack(e) {
    e.preventDefault();
    const email = document.getElementById("email-address").value;
    alert(email);
    let handler = PaystackPop.setup({
        key: 'pk_test_5975642a2e844677a780afd0dd877f6b81ee2577', // Replace with your public key
        email: document.getElementById("email-address").value,
        amount: 80 * 100,
        currency: 'ZAR',
        ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function(){
          alert('Window closed.');
    },
    callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
    }
  });

    handler.openIframe();
}

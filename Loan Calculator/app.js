document.getElementById('loan-form').addEventListener('submit', function(e) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(Calculate, 2000);

    e.preventDefault();
});

function Calculate() {
    const amt = document.getElementById('amount');
    const inst = document.getElementById('interest');
    const yrs = document.getElementById('years');
    const mp = document.getElementById('monthly-payment');
    const tp = document.getElementById('total-payment');
    const ti = document.getElementById('total-interest');

    const amount = parseFloat(amt.value);
    const interest = parseFloat(inst.value) / 100 / 12;
    const payment = parseFloat(yrs.value) * 12;

    const x = Math.pow(1 + interest, payment);
    const monthly = (amount * x * interest) / (x - 1);

    if(isFinite(monthly)) {
        mp.value = monthly.toFixed(2);
        tp.value = (monthly * payment).toFixed(2);
        ti.value = ((monthly * payment) - amount).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } 
    else {
        showError('Please check your numbers');
    }

}

function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
    
    const errDiv = document.createElement('div');
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    card.insertBefore(errDiv, heading);
    setTimeout(deleteError, 3000);
}

function deleteError() {
    document.querySelector('.alert').remove();
}
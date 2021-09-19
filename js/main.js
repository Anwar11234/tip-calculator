const form = document.querySelector('[data-form]');
const bill = document.querySelector('[data-bill]');
const tips = [...document.querySelectorAll('[data-tip]')];
const customTip = document.querySelector('[data-custom-tip]');

const totalAmountforPerson = document.querySelector('[data-total-amount]');
const tipAmountForPerson = document.querySelector('[data-tip-amount]');
const numberOfPeople = document.querySelector('[data-number]');
const reset = document.querySelector('[data-reset]');

tips.forEach(tip => { 
    tip.addEventListener('click' , () => {
        const selected = document.querySelector('.selected');
        if(selected) selected.classList.remove('selected');
        tip.classList.add('selected')
    });
});

const getData = event => { 
    event.preventDefault();
    const selectedTip =  customTip.value || form.querySelector('.selected').textContent;
    return { 
        bill: Number(bill.value),
        tip: parseFloat(selectedTip),
        number: Number(numberOfPeople.value)
    }
}

const calcTip = (bill , tipAmount , number ) => { 
    const tipPerPerson = Number(((bill * (tipAmount / 100)) / number).toFixed(2));
    const totalPerPerson = ((bill / number) + tipPerPerson);
    return { tipPerPerson , totalPerPerson };
};

const resetResults = () => { 
    form.reset();
    totalAmountforPerson.textContent = '$0.00';
    tipAmountForPerson.textContent = '$0.00';
    form.querySelector('.selected').classList.remove('selected');
}

form.addEventListener('submit' , event => { 
    const data =  getData(event);
    const results = calcTip(data.bill , data.tip , data.number);
    totalAmountforPerson.textContent = `$${results.totalPerPerson}`;
    tipAmountForPerson.textContent = `$${results.tipPerPerson}`;
} );

reset.addEventListener('click' , resetResults);
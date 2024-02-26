"use strict";

let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");

let DB = data.finesData;

    buttonSubmit.addEventListener('click', payFine);   

    function payFine(){
        let fineNumberValue = fineNumber.value;
        let passportValue = passport.value;
        let creditCardNumberValue = creditCardNumber.value;
        let cvvValue = cvv.value;
        let amountValue = parseFloat(amount.value);


        // 1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
        // alert "Номер не співпадає" або "Сума не співпадає"

        // Знаходимо штраф за вказаним номером
        let fine = DB.find(item => item.номер === fineNumberValue);

        // Перевірка чи існує штраф з вказаним номером
        if (!fine) {
            alert("Номер не співпадає");
            return;
        }

        // Перевірка чи співпадає сума зі сумою штрафу
        if (fine.сума !== amountValue) {
            alert("Сума не співпадає");
            return;
        }

        // 2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
        // Якщо не співпадає то видавати alert "Не вірний паспортний номер"

        let passportRegex  = /^[А-ЩЬЮЯЇІЄҐ]{2}\d{6}$/;
        if (!passportRegex .test(passportValue)) {
            alert("Не вірний паспортний номер");
            return;
        }

        // 3. Номер кредитної карки 16 цифр -
        // якщо не співпадає то видавати alert "Не вірна кредитна картка"

        let creditCardRegex  = /^\d{16}$/;
            if (!creditCardRegex .test(creditCardNumberValue)) {
            alert("Не вірна кредитна картка");
            return;
        }

        // 4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

        let cvvRegex  = /^\d{3}$/;
            if (!cvvRegex .test(cvvValue)) {
            alert("Не вірний CVV");
            return;
        }

        // Якщо валідація проходить успішно, то виконати оплату,
        //  тобто вам потрібно видалити обєкт з DB
        let index = DB.indexOf(fine);
            if (index !== -1) {
            DB.splice(index, 1);
            alert("Оплата штрафу пройшла успішно!");
        }

    }
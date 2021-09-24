'use strict'
class Account {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
class BusinessAccount extends Account {

    constructor(name, phone, BusinessName, BusinessType, StreetAddress, Suite, Zip, State) {
        super(name)
        this.phone = phone;
        this.BusinessName = BusinessName;
        this.BusinessType = BusinessType
        this.StreetAddress = StreetAddress
        this.Suite = Suite
        this.Zip = Zip
        this.State = State
    }
}
let Accs = JSON.parse(localStorage.getItem('Accounts'));
let Passvalid, Progress_level = 0;
let MyDom =
{
    StartForm: document.querySelector('form.Start_Your_business'),
    EmailStart: document.querySelector('#email-start'),
    PopInfo: document.querySelector('.showPop'),
    Info: document.querySelector('.popup'),
    email: document.querySelector('#Newemail'),
    name: document.querySelector('#Newname'),
    BusinessForm: document.querySelector('.Business-acc'),
    PasswordStateBar: document.querySelector('.PassContainer-state'),
    PasswordTextState: document.querySelector('.text-pass'),
    password: document.querySelector('#pass'),
    re_pass: document.querySelector('#re-password'),
    RepassText: document.querySelector('.valText'),
    OTP: document.querySelector('#OTP'),
    Prog: document.querySelectorAll(".Prog_list li"),
    OTP_form: document.querySelector('.OTP-form'),
    Form_fin: document.querySelector('.Account_fin'),
    fullName: document.querySelector('#fullname'),
    Business_phone: document.querySelector('#phoneNumber'),
    Business_name: document.querySelector('#Business-name'),
    Business_type: document.querySelectorAll('[type=radio]'),
    Street_address: document.querySelector('#Street-address'),
    Suite: document.querySelector('#Suite'),
    ZIP_code: document.querySelector('#ZIP'),
    State: document.querySelector('#st')
}

////addeventListeners

MyDom.StartForm.addEventListener('submit', EnterYourBus);
MyDom.BusinessForm.addEventListener('submit', CreateBusiness)
MyDom.OTP_form.addEventListener('submit', GetOtp)
MyDom.Form_fin.addEventListener('submit', AccountReady)
MyDom.OTP_form.addEventListener('mouseover', Otpgen)
MyDom.EmailStart.addEventListener('input', YourEmail)
MyDom.PopInfo.addEventListener('click', ShowInfo);
MyDom.password.addEventListener('input', CheckPass);

////progress level 1 / 2 /3
window.setInterval(() => {
    MyDom.Prog.forEach((el, i) => {
        if (i === Progress_level) {
            el.firstElementChild.classList.add('done')
        }
        else {
            el.firstElementChild.classList.remove('done')
        }
    })
}, 1000)


////functions 

/// enter your Email to start your business profile
function EnterYourBus(e) {
    e.preventDefault()
    if (!Emailval(MyDom.EmailStart.value)) {
        ResetInputs(MyDom.EmailStart)
        EmptyInputs('Please enter your Email', MyDom.EmailStart)
    }
    else Progress(this)
}

/////choise your Email 

function YourEmail() {
    let MyAccount;
    if (Accs?.some(el => el.email === this.value)) {
        MyAccount = Accs.find(el => el.email === this.value);
        ResetInputs(this)
        MyDom.email.value = MyAccount.email;
        MyDom.name.value = MyAccount.name;
        this.setAttribute('placeholder', 'Do you want to use your regular Account Email');
        setTimeout(() => MyDom.EmailStart.value = MyAccount.email, 2000)
    }

}

////when it's entered and valid progress

function Progress(curElm) {
    if (curElm.closest('.progress').nextElementSibling) {
        curElm.closest('.progress').classList.add('hide')
        curElm.closest('.progress').nextElementSibling.classList.remove('hide')
    }
    else {
        curElm.closest('.step-1').classList.add('hide');
        curElm.closest('.step-1').nextElementSibling.classList.remove('hide');
    }
}
////create your account 
let Busi, otp = '', BussinessAccountReady, Baccs = [];
function CreateBusiness(e) {
    e.preventDefault()
    if (Emailval(MyDom.email.value) && Namevali(MyDom.name.value) && Passvalid) {
        Busi = new Account(MyDom.name.value, MyDom.email.value, MyDom.password.value)
        MyDom.fullName.value = Busi.name;
        Progress_level++;
        Progress(this)
    }
}

///otp form
function GetOtp(e) {
    e.preventDefault()
    EmptyInputs();
    Progress(this)
    Progress_level++;
}
let i = 0;
function Otpgen(e) {
    setTimeout(() => MyDom.OTP.value = otp), 500
}



////show info
function ShowInfo(e) {
    e.preventDefault()
    MyDom.Info.classList.toggle('hide')
}



////function reset input
function ResetInputs(...inputs) {
    inputs.forEach(input => input.value = '');
}
///
function EmptyInputs(Message, ...inputs) {
    inputs.forEach(input => {
        if (input.value === '') {
            input.style.background = '#ff575766';
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('placeholder', `${Message}`)
            //////
            window.setTimeout(() => {
                input.style.background = 'none'
                input.removeAttribute('readonly', 'readonly');
                input.removeAttribute('placeholder', `${Message}`)
            }, 2000);

        }
    })
}


















//// validate email
function Emailval(input) {
    let emRE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (input.match(emRE)) return true
    return false;
}

/////validate name 
function Namevali(input) {
    let nameInput = /[.A-Z]/gi
    if (input.length > 5 && input.length < 22) {
        if (input.match(nameInput)) return true
    }
    return false
}
////password valid
function CheckPass(e) {

    let PassWidth = (MyDom.password.value.length * 100) / 20;
    if (PassWidth > 100) {
        PassWidth = 100;
    }
    MyDom.PasswordStateBar.style.width = `${PassWidth}%`

    if (PassWidth <= 25) {
        MyDom.PasswordStateBar.style.background = '#ff0023'
        MyDom.PasswordTextState.textContent = 'Password weak'
        MyDom.PasswordTextState.style.color = '#ff0023'
        Passvalid = false;
    }
    if (PassWidth > 25 && PassWidth <= 50) {
        MyDom.PasswordStateBar.style.background = '#ffb42b'
        MyDom.PasswordTextState.style.color = '#ffb42b'

    }
    if (PassWidth > 50) {
        MyDom.PasswordStateBar.style.background = '#16d216';
        MyDom.PasswordTextState.textContent = 'Password strong'
        MyDom.PasswordTextState.style.color = '#16d216'
        MyDom.re_pass.addEventListener('input', CheckPassReEnter)
        Passvalid = true;

    }

}
///
function CheckPassReEnter() {
    if (this.value === MyDom.password.value) MyDom.RepassText.textContent = '';
    else MyDom.RepassText.textContent = 'Password do not match';
}




//Gen random number



let Random = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
for (let x of Random) {
    let Base = Math.floor(Math.random() * 10);
    otp += Random[Base]
    if (otp.length === 6) break;
}





















////account finsh up 
function AccountReady(e) {

    let Type;
    MyDom.Business_type.forEach(type => {
        if (type.checked) Type = type.getAttribute('id')
    })

    e.preventDefault()
    BussinessAccountReady = new BusinessAccount(
        MyDom.fullName.value,
        MyDom.Business_phone.value,
        MyDom.Business_name.value,
        Type,
        MyDom.Street_address.value,
        MyDom.Suite.value,
        MyDom.ZIP_code.value,
        MyDom.State.value
    )
    Baccs.push(BussinessAccountReady)
    localStorage.setItem('BussinessAccount', JSON.stringify(Baccs));
    setTimeout(() => window.location.href = 'http://127.0.0.1:5500/content/index.html', 2000)








    //// if imput is empty
    EmptyInputs('Please check your Data', MyDom.fullName,
        MyDom.ZIP_code, MyDom.Business_phone, MyDom.Business_name, MyDom.Street_address, MyDom.Suite, MyDom.State);
}







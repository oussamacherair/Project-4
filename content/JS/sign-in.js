
///class for New Account 
class Account {
    /* #Password;
    #email; */
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

//////////////

let account, Name, Password, E_mail, accounts = [];
///
const MyDom =
{
    Sign_up_container: document.querySelector('.sign-up'),
    Sign_in_form: document.querySelector('.sign-up form'),
    Sign_up_form: document.querySelector('.sign-in form'),
    Sign_up_email: document.querySelector('#Sign-email'),
    Name: document.querySelector('#name'),
    Password: document.querySelector('#pass'),
    re_pass: document.querySelector('#re-password'),
    PasswordTextState: document.querySelector('.text-pass'),
    PasswordStateBar: document.querySelector('.PassContainer-state'),
    RepassText: document.querySelector('.text-re-pass'),
    Account_Email: document.querySelector('#email'),
    Account_Password: document.querySelector('#Password'),
    Account_details: document.querySelector('#Enter_details'),
    Account_done: document.querySelector('.Sign-btn'),
    Account__valid_text: document.querySelector('.Acc_valid'),
    btn_to_singUp_panel: document.querySelector('.Sign-in-new'),
    YourAccountIsReady: document.querySelector('.signed-complete-panel'),
    helpBtn: document.querySelector('.btn'),
    help: document.querySelector('.help'),
    UserName: document.querySelector('.User-name')
}
///form values element

///addEvent

MyDom.Sign_in_form.addEventListener('submit', CrAccount);
MyDom.Password.addEventListener('input', CheckPass);
MyDom.Password.addEventListener('blur', RemoveFocus);
MyDom.Sign_up_form.addEventListener('submit', CheckAccountExist);
MyDom.Account_done.addEventListener('click', GoToSingIn);
MyDom.btn_to_singUp_panel.addEventListener('click', GoToSingIn)
MyDom.Sign_up_email.addEventListener('input', Used)
MyDom.Name.addEventListener('input', Used)
MyDom.Account_Email.addEventListener('input', Sign_in_data)
MyDom.Account_Password.addEventListener('input', Sign_in_data)
MyDom.helpBtn.addEventListener('click', ShowHelp)
let Passvalid, AccountExi;


////load pre Accounts
let PAccounts;
PAccounts = JSON.parse(localStorage.getItem('Accounts'));
accounts.push(PAccounts.flat())
/// mouse leave password input removing the bar and the text
function RemoveFocus(e) {
    MyDom.PasswordStateBar.style.width = '0%';
    MyDom.PasswordTextState.textContent = '';
}

///Check re-password if it's the same

function CheckPassReEnter() {
    if (this.value === MyDom.Password.value) MyDom.RepassText.textContent = '';
    else MyDom.RepassText.textContent = 'Password do not match';
}

//  submit function for sign up 
function CrAccount(e) {
    e.preventDefault()
    AccountCreate()
}


/// create Acccount
function AccountCreate() {


    if (Passvalid && Namevali(MyDom.Name.value) && Emailval(MyDom.Sign_up_email.value)) {

        account = new Account(MyDom.Name.value, MyDom.Sign_up_email.value, MyDom.Password.value)
        accounts.push(account);
        window.localStorage.setItem('Accounts', JSON.stringify(accounts));
        CompleteSing(MyDom.Sign_in_form)
    }
    else if (!Namevali(MyDom.Name.value) || !Emailval(MyDom.Sign_up_email.value)) {
        EmptyInputs('Please check you Data', MyDom.Name, MyDom.Sign_up_email, MyDom.Password)
    }
    ResetInputs(MyDom.Name, MyDom.Sign_up_email, MyDom.Password)
}

/// function for empty inputs
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

/// validation functions

function Namevali(input) {
    let nameInput = /[.A-Z]/gi
    if (input.length > 5 && input.length < 22) {
        if (input.match(nameInput)) return true
    }
    return false
}

function Emailval(input) {
    let emRE = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (input.match(emRE)) return true
    return false;
}
///password validation
function CheckPass(e) {
    let PassWidth = (MyDom.Password.value.length * 100) / 20;
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
/// rest input
 function ResetInputs(...inputs) {
    inputs.forEach(input => input.value = '');
}


////// go to sign in 
function GoToSingIn() {
    let Form = this.closest('.panel');
    Form.style.transform = 'translateX(-100%)';
    Form.style.visibility = "hidden";
    if (Form.nextElementSibling) {
        Form.style.transform = 'translateX(-100%)';
        Form.style.visibility = "hidden";
        Form.nextElementSibling.style.transform = 'translateX(-100%)';
        Form.nextElementSibling.style.visibility = "visible";
    }
    else {
        Form.style.transform = 'translateX(0%)';
        Form.style.visibility = "hidden";
        Form.previousElementSibling.style.transform = 'translateX(0%)';
        Form.previousElementSibling.style.visibility = "visible";
        MyDom.Account_Email.parentElement.style.transform = 'translateX(0%)';
        MyDom.Account_Email.parentElement.nextElementSibling.style.transform = 'translateX(120%)'
    }
    ResetInputs(MyDom.Account_Email, MyDom.Account_Password, MyDom.Name, MyDom.Sign_up_email, MyDom.Password)
}
///// after completing sign up
function CompleteSing(curElm) {
    let Form = curElm.closest('.panel');
    Form.style.transform = 'translateX(-100%)';
    Form.style.visibility = "hidden";
    Form.nextElementSibling.style.transform = 'translateX(-100%)';
    Form.nextElementSibling.style.visibility = "visible";
}


///Account sign in 
function CheckAccountExist(e) {
    e.preventDefault()

    if (AccountExi) {
        MyDom.YourAccountIsReady.style.top = '0%'
        this.closest('.panel').style.visibility = 'hidden'
        window.setTimeout(() => document.querySelector('.fin').style.transform = 'scale(1)', 500)
        window.setTimeout(() => window.location.href = 'http://127.0.0.1:5500/content/index.html', 1000)
    }
    EmptyInputs('Please enter you email / password', MyDom.Account_Email, MyDom.Account_Password);
    ResetInputs(MyDom.Account_Email, MyDom.Account_Password)
}


///function for used email and name
function Used() {
    let data = this.getAttribute('name')
    let accs = accounts.flat();
    if (accs.some(el => el[data].toLowerCase() === this.value.toLowerCase())) {
        ResetInputs(MyDom.Sign_up_email, MyDom.Name)
        this.setAttribute('Placeholder', `This ${data} is already used`);
    }
}

///// functon  for your account (email/password) if it's exist in the accounts data 
function Sign_in_data() {
    let data = this.getAttribute('type');
    let accs = accounts.flat();
    let acc = accs.find((el, i) => el.email === this.value);
    if (accs?.some(el => el[data] === this.value)) {
        if (data === 'email') {
            this.closest('.email').style.transform = 'translateX(-120%)';
            this.closest('.email').nextElementSibling.style.transform = 'translateX(0%)'
            MyDom.Account__valid_text.textContent = ''
        }
        else {
            return AccountExi = true;
        }
        MyDom.UserName.textContent = acc.name;
    }
    else {
        MyDom.Account__valid_text.textContent = 'Please check your email/password'
    }
}


////function show help 
function ShowHelp() {
    this.firstElementChild.removeAttribute('class');
    this.firstElementChild.setAttribute('class', 'fas fa-caret-down')
    MyDom.help.style.display = 'block'
    window.setTimeout(() => {
        this.firstElementChild.removeAttribute('class');
        this.firstElementChild.setAttribute('class', 'fas fa-caret-right')
        MyDom.help.style.display = 'none'
    }, 5000)
}


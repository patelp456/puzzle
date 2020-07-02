// get password length
function get_pass_length(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generate random digit
function gen_num() {
    return Math.floor(Math.random() * 9);
}

// generate random lowercase letter
function gen_lowercase() {
    ref_list = 'abcdefghijklmnopqrstuvwxyz';
    idx = Math.floor(Math.random() * ref_list.length);
    return ref_list[idx];
}

// generate random upper-case letter
function gen_uppercase() {
    return gen_lowercase().toUpperCase();
}

// generate random special character
function gen_special_char() {
    ref_list = '`~!#$%^*()_-+=[{]{|:;"<,>./?';
    idx = Math.floor(Math.random() * ref_list.length);
    return ref_list[idx];
}

// suffle generated string
function suffle(arr) {
    arr = arr.split("");
    var index, counter, temp;
    counter = arr.length;

    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter -= 1;
        temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }
    return arr.join("");
}

// generate random password
function gen_random_pass() {
    length = get_pass_length(6, 14) - 4;

    password = gen_num();
    password += gen_lowercase();
    password += gen_uppercase();
    password += gen_special_char();

    for (let i = 0; i < length; i++) {
        idx = Math.floor(Math.random() * 4);
        if (idx == 0) {
            password += gen_num();
        } else if (idx == 1) {
            password += gen_lowercase();
        } else if (idx == 2) {
            password += gen_uppercase();
        } else if (idx == 3) {
            password += gen_special_char();
        }
    }

    password = suffle(password);
    document.getElementById('passwd').innerText = password;
}
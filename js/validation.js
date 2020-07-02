function phone_validator(mob_num) {
    mob_num = String(mob_num);
    feedback = 'valid mobile number';

    if (mob_num.length != 10) {
        feedback = "Mobile number should contains 10 digits only";
        return {
            status: false,
            feedback: feedback,
        };
    }

    if (mob_num.match(/^[0-9]+$/) === null) {
        feedback = "Mobile number has invalid characters, should have only digits";
        return {
            status: false,
            feedback: feedback,
        };
    }

    return {
        status: true,
        feedback: feedback,
    };

}

function email_validator(email) {
    email = String(email);
    feedback = 'valid email';

    if (email.match(/^[a-z0-9_.]+@[a-z0-9.]+\.[a-z]{2,3}$/) === null) {
        feedback = 'invalid email, valid email format: abc@def.com';
        return {
            status: false,
            feedback: feedback,
        };
    }

    return {
        status: true,
        feedback: feedback,
    };
}

function url_validator(web_url) {
    web_url = String(web_url);
    feedback = 'valid url';

    if (web_url.match(/^(ftp|http|https):\/\/[^ "']+\.[a-z]{2,3}/) === null) {
        feedback = 'invalid url';
        return {
            status: false,
            feedback: feedback,
        };
    }

    return {
        status: true,
        feedback: feedback,
    };
}

function dob_validator(dob) {
    dob = String(dob);
    feedback = 'valid date of birth';

    if (dob.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}/) === null) {
        feedback = 'invalid date format, use yyyy/mm/dd';
        return {
            status: false,
            feedback: feedback,
        };
    }

    dob = new Date(dob);
    if (dob == 'Invalid Date') {
        feedback = 'invalid date format, use yyyy/mm/dd';
        return {
            status: false,
            feedback: feedback,
        };
    } else {
        ref_date = new Date('1970/01/01');
        if (dob.getTime() < ref_date.getTime()) {
            feedback = 'dob should not be earlier than January 1, 1970';
            return {
                status: false,
                feedback: feedback,
            };
        }
    }

    return {
        status: true,
        feedback: feedback,
    };
}

function add_feedback(result, id) {
    div = document.getElementById(id);
    div.innerText = result.feedback;
    if (result.status === true) {
        div.className = 'valid-feedback';
    } else {
        div.className = 'invalid-feedback';
    }
}

function form_validate() {
    mob_num = document.getElementById('mobile').value;
    email = document.getElementById('email').value;
    web_url = document.getElementById('web-url').value;
    dob = document.getElementById('dob').value;

    v1 = phone_validator(mob_num);
    v2 = email_validator(email);
    v3 = url_validator(web_url);
    v4 = dob_validator(dob);

    // add feedback
    add_feedback(v1, 'v-mobile');
    add_feedback(v2, 'v-email');
    add_feedback(v3, 'v-web-url');
    add_feedback(v4, 'v-dob');

    form = document.getElementById('form1');
    form.classlist.add('was-validated');

    if (v1.status && v2.status && v3.status && v4.status) {
        console.log('return true');
        return true;
    } else {
        console.log('return false');
        return false;
    }
}

(function() {
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form_validate() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
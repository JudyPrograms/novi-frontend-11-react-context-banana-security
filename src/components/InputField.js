import React from 'react';

function InputField({children, register, name, errors, required}) {
    return (
        <div>
            <label>
                {children}
                <input type="text" {...register(name, {required: required})}/>
            </label>
            {/*DIT WERKT NIET:*/}
            {errors.name && <p className="error-text">invullen vereist</p>}
        </div>
    );
}

export default InputField;
import styles from './InputComponent.module.scss';

function InputComponent({ value, inputType, inputName, inputLabel, inputId, validationRules, register, errors }) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    value={value}
                    type={inputType}
                    id={inputId}
                    {...register(inputName, validationRules)}
                />
            </label>
            {errors[inputName] && <p>{errors[inputName].message}</p>}
        </>
    );
}

export default InputComponent;
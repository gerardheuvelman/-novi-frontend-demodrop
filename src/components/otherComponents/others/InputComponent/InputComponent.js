import styles from './InputComponent.module.css';

function InputComponent({ value, inputType, inputName, inputLabel, inputId, validationRules, fileAccept, register, errors }) {

    if (inputType === 'file') {
        if (fileAccept) {
            return (
                <>
                    <label htmlFor={inputId}>
                        {inputLabel}
                        <input
                            value={value}
                            type={inputType}
                            accept={fileAccept}
                            id={inputId}
                            {...register(inputName, validationRules)}
                        />
                    </label>
                    {errors[inputName] && <p>{errors[inputName].message}</p>}
                </>
            );
        }
    } else return (
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
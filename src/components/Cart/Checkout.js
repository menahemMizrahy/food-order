import classes from "./Checkout.module.css";

import useInput from "../../hooks/useInput";
import Input from "../UI/Input";

const Checkout = (props) => {
  const {
    enteredData: enteredName,
    changeHandler: nameChangeHandler,
    blurHandler: nameBlurHandler,
    enteredDataIsValid: enteredNameIsValid,
    enteredDataIsInValid: enteredNameIsInValid,
    reset: nameReset,
  } = useInput((name) => {
    return name.trim().length > 0;
  });
  const {
    enteredData: enteredCity,
    changeHandler: cityChangeHandler,
    blurHandler: cityBlurHandler,
    enteredDataIsValid: enteredCityIsValid,
    enteredDataIsInValid: enteredCityIsInValid,
    reset: cityReset,
  } = useInput((city) => {
    return city.trim().length > 0;
  });
  const {
    enteredData: enteredPostalCode,
    changeHandler: postalCodeChangeHandler,
    blurHandler: postalCodeBlurHandler,
    enteredDataIsValid: enteredPostalCodeIsValid,
    enteredDataIsInValid: enteredPostalCodeIsInValid,
    reset: postalCodeReset,
  } = useInput((postalCode) => {
    return postalCode.trim().length === 5;
  });
  const {
    enteredData: enteredStreet,
    changeHandler: streetChangeHandler,
    blurHandler: streetBlurHandler,
    enteredDataIsValid: enteredStreetIsValid,
    enteredDataIsInValid: enteredStreetIsInValid,
    reset: streetReset,
  } = useInput((street) => {
    return street.trim().length > 0;
  });

  const formIsValid =
    enteredNameIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid &&
    enteredStreetIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      nameBlurHandler();
      cityBlurHandler();
      postalCodeBlurHandler();
      streetBlurHandler();
      return;
    }
    props.onConfirm({
      name: enteredName,
      city: enteredCity,
      street: enteredCity,
      postalCode: enteredPostalCode,
    });
    nameReset();
    cityReset();
    postalCodeReset();
    streetReset();
  };

  const nameClasses = `${classes.control} ${
    enteredNameIsInValid && classes.invalid
  }`;

  const cityClasses = `${classes.control} ${
    enteredCityIsInValid && classes.invalid
  }`;

  const postalCodeClasses = `${classes.control} ${
    enteredPostalCodeIsInValid && classes.invalid
  }`;

  const streetClasses = `${classes.control} ${
    enteredStreetIsInValid && classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        class={nameClasses}
        label={"Name:"}
        input={{
          type: "text",
          value: enteredName,
          id: "name",
          onChange: nameChangeHandler,
          onBlur: nameBlurHandler,
        }}
      />
      <Input
        class={cityClasses}
        label={"City:"}
        input={{
          type: "text",
          value: enteredCity,
          id: "city",
          onChange: cityChangeHandler,
          onBlur: cityBlurHandler,
        }}
      />
      <Input
        class={postalCodeClasses}
        label={"PostalCode:"}
        input={{
          type: "text",
          value: enteredPostalCode,
          id: "postalCode",
          onChange: postalCodeChangeHandler,
          onBlur: postalCodeBlurHandler,
        }}
      />
      <Input
        class={streetClasses}
        label={"Street:"}
        input={{
          type: "text",
          value: enteredStreet,
          id: "street",
          onChange: streetChangeHandler,
          onBlur: streetBlurHandler,
        }}
      />

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

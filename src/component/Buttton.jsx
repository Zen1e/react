const Button = (props) => {
  const { value, classname, onclick } = props;
  return (
    <input
      type="button"
      value={value}
      className={classname}
      onClick={onclick}
    />
  );
};

export default Button;
